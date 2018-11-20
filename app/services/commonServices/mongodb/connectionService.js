/**
 * @author [Eldhose P S]
 * @create date 2018-07-20 02:32:42
 * @modify date 2018-07-20 02:32:42
*/

//
// ────────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: M O N G O D B   C O N N E C T I O N S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────
//


const Promise = require('bluebird');
const mongoConfig = require('../../../config/mongoConfig');
const mongoDB = require('mongodb')
Promise.promisifyAll(mongoDB);
const MongoClient = mongoDB.MongoClient;
let _db = "";


// ─── FUNCTION TO CONNECT WITH MONGODB ───────────────────────────────────────────
  
let connectToServer = (callback) => {
    MongoClient.connect(mongoConfig.dbString, {
        useNewUrlParser: mongoConfig.useNewUrlParser
    }, (err, db) => {
        _db = db;
        return callback(err);
    });
};


// ─── FUNCTION TO GET DB VARIABLE ────────────────────────────────────────────────

let getDb = () => {
    return _db.db();
}
module.exports = {
    connectToServer,
    getDb
}