//
// ──────────────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: J S O N   W E B   T O K E N   S E R V I C E : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────
//
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwtConfig');
const utils=require('../../commonUtils/utils')
let jwtSrv = {};
jwtSrv.signIn = (signInDetails) => {
    let token = jwt.sign(signInDetails, jwtConfig.appSecret, {
        expiresIn: jwtConfig.tokenTimeOut
    });
    return token;
}

jwtSrv.Authenticate = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if (token) {
        jwt.verify(token, jwtConfig.appSecret, function (err, decoded) {
            if (err) {
                utils.sendResponse(res,utils.resMessages().noAccess,false,401);
            }
            else{
                req.decoded = decoded;
                next();
            }
        });
    } else {
        utils.sendResponse(res,utils.resMessages().noToken,false,403);
    }
}
module.exports = jwtSrv;