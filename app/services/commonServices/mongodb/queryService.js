/**
 * @author [Eldhose P S]
 * @create date 2018-07-20 10:26:10
 * @modify date 2018-07-20 10:26:10
*/


//
// ────────────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: M O N G O D B   C O M M O N   Q U E R Y S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────────────────
//


const db = require('./connectionService').getDb();

// ─── FUNCTION TO PROCESS BATCH INSERT ───────────────────────────────────────────

let batchInsert = (doc, collection) => {
    let col = db.collection(collection);
    return col.insertMany(doc);
}

// ─── FUNCTION TO UPDATE RECORDS BASED ON _id(SHOULD BE ARRAY) ──────────────────────
    
let updateMany = (updateFields, updateBy, collection) => {
    let col = db.collection(collection);
    return col.updateMany({
            _id: {
                $in: updateBy
            }
    },{$set:updateFields});

}

// ─── FUNCTION TO INSERT ONE RECORD ──────────────────────────────────────────────

let insertOne=(doc,collection)=>{
   
    return  db.collection(collection).insertOne(doc);
}

// ─── FIND DATA FROM COLLECTION LIMIT WILL BE 1 ──────────────────────────────────/
let findOne=(fetchCriteria,project,collection)=>{
    return db.collection(collection).findOne(fetchCriteria,project);
}

// ─── FIND DATA FROM COLLECTION ──────────────────────────────────/
let find=(fetchCriteria,project,collection)=>{
    return db.collection(collection).find(fetchCriteria,project).toArray();
}
module.exports = {
    batchInsert,
    updateMany,
    insertOne,
    findOne,
    find
}