const HelperResponse    = require("../../helper/response");
const HelperValidation  = require("../../helper/validation");
const HelperToken       = require("../../helper/token");

module.exports = (client, redis) => {

    let module      = {};
    const reply     = HelperResponse();
    const validate  = HelperValidation();
    const token     = HelperToken();
    
    module.mandatoryFields = ["user_id"];

    //getCache
    module.getCache = async (req, res) => {

        const userId    = req.params.id;

        if(!(parseInt(userId) > 0))
            return reply.badRequest(req, res, "Invalid parameter request");
        
        const response  = await client.get(userId, (error,result) => {
            if(result)
                reply.success(req, res, {"user_id" : userId, "token_id" : result});
            else if(result == null)
                reply.notFound(req, res, "Token not Found");
            else
                reply.error(req, res, error);
        });
        return response;
    };

    //postCache
    module.postCache = async (req, res) => {

        const userId    = req.body.user_id;
        const tokenId   = token.generateToken(userId);

        if(!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
            return reply.badRequest(req, res, "Invalid parameter request");

        return reply.created(req, res,  await client.set(userId, tokenId, redis.print));
    };

    return module;
}