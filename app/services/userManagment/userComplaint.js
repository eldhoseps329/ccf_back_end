//
// ──────────────────────────────────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: U S E R   C O M P L A I N T   R E L A T E D   F U N C T I O N S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────
//
const utils = require('../../commonUtils/utils');
const mongoSrv = require('../commonServices/mongodb/queryService');

let addNewComplaint = async (req, res, next) => {
    if ((!req.body.complaint) || (!req.body.description)) utils.sendResponse(res, utils.resMessages().requiredParamsNotExist, false, 400);
    else {
        let doc = {
            complaint: req.body.complaint,
            description: req.body.description,
            user_details: {
                user_id: req.decoded._id,
                user_name: req.decoded.user_name
            },
            status: 1,
            complaint_status: "pending",
            created_date: new Date(),
            updated_date: new Date()
        };
        let result = await mongoSrv.insertOne(doc, "user_compiants");
        utils.sendResponse(res, utils.resMessages().success, true, 200,(result.ops.length)?result.ops[0]:null);
    }
}
let getComplaints = async (req, res, next) => {
    let result = await mongoSrv.find({status:1,"user_details.user_id":req.decoded._id}, null, "user_compiants");
    utils.sendResponse(res, utils.resMessages().success, true, 200, result);

}

module.exports = {
    addNewComplaint,
    getComplaints
}