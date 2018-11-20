//
// ──────────────────────────────────────────────────────────────────── V ──────────
//   :::::: S I G N U P   S E R V I C E : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────
//
const utils = require('../../commonUtils/utils');
const hashSrv = require('../commonServices/crypto/hashingService');
const appConfig = require('../../config/appConfig');
const jwtService = require('../commonServices//jwtService');
const cryptoConfig = require('../../config/cryptoConfig');
const mongoSrv = require('../commonServices/mongodb/queryService');
const objectId = require('mongodb').ObjectID;
const refreshTokens = {};
class userAuth {
    async addUser(req, res, next) {
        if (req.body.userName && req.body.name && req.body.password) {
            let user = await mongoSrv.findOne({
                user_name: req.body.userName
            },null,"users");
            if (user && user.user_name) utils.sendResponse(res, utils.resMessages().userExist, false, 400);
            else {
                let hashResult = await hashSrv.generateHash(req.body.password);
                if (hashResult.hash && hashResult.salt) {
                    let doc = {
                        name: req.body.name,
                        user_name: req.body.userName,
                        password: hashResult.hash,
                        status: 1,
                        user_type: "user",
                        created_date: new Date(),
                        updated_date: new Date()
                    };
                    let result = await mongoSrv.insertOne(doc, "users");
                    if (result.insertedId) {
                        let doc = {
                            check_sum: hashResult.salt,
                            user_id: result.insertedId
                        }
                        await mongoSrv.insertOne(doc, "user_checksum");
                        utils.sendResponse(res, utils.resMessages().success, true, 200);

                    } else utils.sendResponse(res, utils.resMessages().operationFailed, false, 400);

                } else utils.sendResponse(res, utils.resMessages().operationFailed, false, 400);
            }
        } else utils.sendResponse(res, utils.resMessages().requiredParamsNotExist, false, 400);

    }
    async authenticateUser(req, res, next) {
        if (req.body.userName && req.body.password) {
            let query = {
                user_name: req.body.userName,
                status: 1
            }
            let result = await mongoSrv.findOne(query, null, "users");
            if (result && result.user_name) {
                let checkSum = await mongoSrv.findOne({
                    user_id: result._id
                }, null, "user_checksum");
                if (checkSum && checkSum.check_sum) {
                    let hash = await hashSrv.getHash(req.body.password, checkSum.check_sum, cryptoConfig.defaultHashType);
                    if (hash === result.password) {
                        let userDetails = result;
                        delete userDetails.password;
                        delete userDetails.checksum;
                        let token = jwtService.signIn(userDetails)
                        if (token) {
                            let refreshToken = utils.getUUID()
                            refreshTokens[refreshToken] = userDetails;
                            userDetails.token = token;
                            userDetails.refreshToken = refreshToken;
                            utils.sendResponse(res, utils.resMessages().success, true, 200, userDetails);
                        } else utils.sendResponse(res, utils.resMessages().operationFailed, false, 400);

                    } else utils.sendResponse(res, utils.resMessages().invalidPassword, false, 400);
                } else utils.sendResponse(res, utils.resMessages().invalidUser, false, 400);

            } else utils.sendResponse(res, utils.resMessages().invalidUser, false, 400);

        } else utils.sendResponse(res, utils.resMessages().requiredParamsNotExist, false, 400);
    }
    async reLogin(req, res, next) {
        if (req.body.refreshToken && req.body.userName) {
            if (req.body.refreshToken in refreshTokens && refreshTokens[req.body.refreshToken].user_name === req.body.userName) {
                let token = jwtService.signIn(refreshTokens[req.body.refreshToken]);
                if (token) {
                    utils.sendResponse(res, utils.resMessages().success, true, 200, {
                        token: token
                    });
                } else utils.sendResponse(res, utils.resMessages().operationFailed, false, 400);

            } else utils.sendResponse(res, utils.resMessages().noAccess, false, 400);

        } else utils.sendResponse(res, utils.resMessages().requiredParamsNotExist, false, 400);
    }
}

module.exports = new userAuth;