//
// ──────────────────────────────────────────────────────────────────────────────────────── V ──────────
//   :::::: H A S H I N G   R E L A T E D   F U N T I O N S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
//
const crypto = require('crypto');
const appConfig = require('../../../config/appConfig');
const cryptoConfig = require('../../../config/cryptoConfig');
class hash {
    constructor() {

    }
    getHash(hashString, salt, hash) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(hashString, salt, cryptoConfig.iterationCount, cryptoConfig.keyLength, hash, (err, derivedKey) => {
                if (err) reject(err);
                else resolve(derivedKey.toString('hex'));
            })
        })
    }
    generateHash(hashString, hashType){
        let hashMethod = hashType || cryptoConfig.defaultHashType;
        let salt = crypto.randomBytes(cryptoConfig.saltLength).toString('base64');
        return new Promise((resolve, reject) => {
            if (hashString) {
                this.getHash(hashString, salt, hashMethod).then((result) => {
                    resolve({salt:salt,hash:result});
                }).catch((err) => {
                    reject(err)
                });
            } else reject("hashString required");
        })
    }
}
module.exports = new hash;

