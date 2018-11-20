//
// ────────────────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: A P P L I C A T I O N   S T A R T S   H E R E : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────────
//
const express = require('express');
const app = express();
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const errorHandler = require('./app/commonUtils/errorHandler');
const cors = require("cors");
const jwtSrv=require('./app/services/commonServices/jwtService');
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(cookieParser());
app.use(
    session({
        secret: "keyboard cat",
        proxy: true,
        resave: true,
        saveUninitialized: true,
        key: "sid"
    })
);
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "public")));
const originsWhitelist = [
"http://localhost:4200"
];
const corsOptions = {
    origin: function (origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));
const mongoConnection = require('./app/services/commonServices//mongodb/connectionService');
mongoConnection.connectToServer(err => {
    if (err) throw err;
    else {
        console.log("Connection established with mongoDB...")
        const server = app.listen(process.env.PORT || 8089, function () {
            let port = server.address().port;
            console.log("App now running on http://localhost:" + port);
            require('./app/routes/router').doRoute(app);
            app.use(errorHandler.sendError)
            app.use(jwtSrv.Authenticate)
            require('./app/routes/router').authRoots(app);
        });
    }
});
