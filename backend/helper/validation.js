require("dotenv").config();
const basicAuth             = require('basic-auth');
const { validationResult }  = require('express-validator');
const HelperResponse        = require("./../helper/response");
const HelperPermission      = require("./../helper/permission");

module.exports = () => {
    
    let module          = {};
    const reply         = HelperResponse();
    const permission    = HelperPermission();

    module.global = async (req, res, next) =>{
        const errors = validationResult(req);
        let auth     = basicAuth(req);
        if (!errors.isEmpty())
            return reply.badRequest(req, res, errors.array());
        if (!auth || !auth.name || !auth.pass)
            reply.unauthorized(req, res, "Authorization required");
        if(!permission.validateAuthorization(auth, req.url))
            return reply.unauthorized(req, res, "Invalid Authorization");
        next();
    };

    return module;
}