const HelperResponse    = require("../../helper/response");
const HelperValidation  = require("../../helper/validation");
const HelperToken       = require("../../helper/token");
const ModelRedis        = require("../../model/redis");

module.exports = (client, redis) => {

    let module          = {};

    const reply         = HelperResponse();
    const validate      = HelperValidation();
    const token         = HelperToken();
    const modelRedis    = ModelRedis(client, redis);
    
    module.mandatoryFields = ["user_id"];

    //getAuth
    module.getAuth = async (req, res) => {

        const tokenId    = req.params.tokenId;

        if(tokenId.length < 20)
            return reply.badRequest(req, res, "Invalid parameter request");

        try{
            await modelRedis.selectRedisStore(tokenId, (error, result) => {
                if(result)
                    return reply.success(req, res, {"token" : tokenId, "user" : result});
                else if(result == null)
                    return reply.unauthorized(req, res, "Token Expired");
                else
                    throw error;
            });

        }catch(error){
            return reply.error(req, res, error);
        }

    };

    //createAuth
    module.createAuth = async (req, res) => {

        const userId    = req.body.user_id;
        const tokenId   = token.generateToken(userId);

        if(!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
            return reply.badRequest(req, res, "Invalid parameter request");
        
        try{
            const created = await modelRedis.setRedisStore(tokenId, userId);
            if(created){
                const setExpired = await modelRedis.updateRedisStore(tokenId)
                if(setExpired)
                    await modelRedis.selectRedisStore(tokenId, (error, result) => {
                        if(result)
                            return reply.success(req, res, {"token" : tokenId, "user" : result});
                        else if(result == null)
                            return reply.unauthorized(req, res, "Token Expired");
                        else
                            throw error;
                    });
                else
                    throw "[Redis] Failed to Update Token Expired";
            }else{
                throw "[Redis] Failed to Create Token";
            }
        }catch(error){
            return reply.error(req, res, error);
        }
    };

    return module;
}