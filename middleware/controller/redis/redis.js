const HelperResponse    = require("./../../helper/response");

module.exports = (client, redis) => {

    let module  = {};
    const reply = HelperResponse();
    //getCache
    module.getCache = async (req, res) => {
        client.on('connect', function() {
            console.log('Redis client connected');
        });
        client.on('error', function (err) {
            console.log('Something went wrong ' + err);
        });
        await client.get(req.params.id, function (error, result) {
            if (error) {
                console.log(error);
                reply.error(req, res, error);
                throw error;
            }
            console.log('GET result ->' + result);
            reply.success(req, res, {"user_id" : req.params.id, "token_id" : result});
        });
    };

    //postCache
    module.postCache = async (req, res) => {
        
        const userId    = req.body.user_id;
        const tokenId   = req.params.token_id;
        
        console.log(`USERID  : ${userId}`);
        console.log(`TOKENID : ${tokenId}`);

        client.on('connect', function() {
            console.log('Redis client connected');
        });
        client.on('error', function (err) {
            console.log('Something went wrong ' + err);
        });
        await client.set(userId, tokenId, redis.print);
        reply.created(req, res, "Success Created");
    };

    return module;
}