const crypto            = require('crypto');

module.exports = () => {

    let module = {}

    module.generateToken = (userId) =>{
        const token = crypto.pbkdf2Sync(`${userId}|${Date.now()}`, 'salt', 10, 16, 'sha512');
        return token.toString('hex');
    }

    module.generateHandShake = (type) => {
        const keyword = crypto.pbkdf2Sync(`${process.env.KEYWORD}|${type}`, 'salt', 10, 16, 'sha512');
        return keyword.toString('hex');
    }

    return module;
}