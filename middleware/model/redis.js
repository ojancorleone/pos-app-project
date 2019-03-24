const HelperToken       = require("../helper/token");
const HelperGlobal      = require("../helper/global");

module.exports = (client) => {

    let module      = {};
    
    const global    = HelperGlobal();
    //selectCache
    module.selectRedisStore = async (tokenId, callback) => {
        return await client.hgetall(tokenId, (error,result) => {callback(error, result)}); 
    };

    //updateCache
    module.updateRedisStore = async (tokenId) => {
        return await client.expire(tokenId, process.env.TOKEN_EXPIRED_TIME); 
    };

    module.setRedisStore = async (tokenId, userId) => {
        return await client.hmset(
            tokenId, 
            "userId", userId, 
            "accessibility","admin", 
            "loginDate", global.generateCurrentDateTime()
        );
    }

    return module;
}