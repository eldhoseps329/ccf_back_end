//
// ──────────────────────────────────────────────────────────────── V ──────────
//   :::::: C O M M O N   U T I L S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────
//
const uuidv1 = require('uuid/v1');
let utils = {};
utils.resMessages = () => {
    return {
        requiredParamsNotExist: "Required parameters does not exist",
        operationFailed: "Requested operation failed",
        success: "Success",
        invalidUser: "Invalid username please try again",
        invalidPassword: "Invalid password please try again",
        noAccess: "Unauthorized access",
        noToken:"No token provided",
        userExist:"User already exist."

    }
}
utils.getUUID = () => {
    return uuidv1();;
}
utils.sendResponse = (res,message, status, statusCode,data) => {
    let response={
        status: status,
        message: message
    }
    if(data) response.data=data;
    return res.status((statusCode ? statusCode : 200)).json(response);
}
module.exports = utils;