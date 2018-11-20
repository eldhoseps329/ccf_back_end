/**
 * @author [Eldhose P S]
 * @create date 2018-07-20 11:27:59
 * @modify date 2018-07-20 11:27:59
*/

//
// ──────────────────────────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: M O N G O D B   R E A L T E D   C O N F I G   F I L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────────────
//


const appConfig=require('./appConfig');
let dbConfig={
    host:'localhost:27017',
    password:'abc123',
    user:'myUserAdmin'
}

// ─── PRODUCTION DATABASE CONFIG ─────────────────────────────────────────────────
if(appConfig.production){
    dbConfig.host='localhost:27017';
    dbConfig.password='abc123';
    dbConfig.user='myUserAdmin';
}
module.exports = {
    dbString: 'mongodb://'+dbConfig.user+':'+dbConfig.password+'@'+dbConfig.host+'/customerComplaintForum?authMechanism=DEFAULT&authSource=admin',
    useNewUrlParser: true 
};