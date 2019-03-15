const crypto            = require('crypto');

module.exports = () => {

    let module = {}

    module.generateToken = (userId) =>{
        const token = crypto.pbkdf2Sync(`${userId}|${Math.floor(Date.now())}`, 'salt', 10, 64, 'sha512');
        return token.toString('hex');
    }

    return module;
}