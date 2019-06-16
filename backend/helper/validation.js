const { validationResult }  = require('express-validator/check');
const HelperResponse        = require("./../helper/response");
const HelperPermission      = require("./../helper/permission");


module.exports = () => {
    
    let module          = {};
    const reply         = HelperResponse();
    const permission    = HelperPermission();

    module.global = async (req, res, next) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return reply.badRequest(req, res, errors.array());
        if(!permission.validateHandShake(req.headers.keyword, req.url))
            return reply.unauthorized(req, res, "Invalid Keywords");
        next();
    };

    return module;
}