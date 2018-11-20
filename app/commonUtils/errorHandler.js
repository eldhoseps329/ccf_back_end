//
// ──────────────────────────────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: C O M M O N   E R R O R   H A N D L E R   F U N C T I O N S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────────
//

let errorHandler = {}
errorHandler.catchError = fn => {
    return (req, res, next) => {
        (fn(req, res, next)).catch(next)
    }
}
errorHandler.sendError = (err, req, res, next) => {
    console.log(err)
    res.status(500).json({ status: false })
}

module.exports = errorHandler;