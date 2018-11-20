//
// ────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: C O M M O N   R O U T E   F I L E : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────
//
const userAuth = require('../services/userManagment/userAuth');
const errorHandler = require('../commonUtils/errorHandler')
const userComplaint = require('../services/userManagment/userComplaint');
class router {
    doRoute(app) {
        app.route('/signup').post(errorHandler.catchError(userAuth.addUser))
        app.route('/login').post(errorHandler.catchError(userAuth.authenticateUser))
        app.route('/token').post(userAuth.reLogin)

    }
    authRoots(app) {
        app.route('/newComplaint').post(errorHandler.catchError(userComplaint.addNewComplaint))
            .get(errorHandler.catchError(userComplaint.getComplaints))
    }
}

module.exports = new router;