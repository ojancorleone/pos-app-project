
const ModelUser         = require("./../model/user");

const HelperResponse    = require("./../helper/response");
const HelperValudation  = require("./../helper/validation");
const HelperPermission  = require("./../helper/permission");

module.exports = client => {

    let module = {}

    module.mandatoryFields = [
        "username",
        "firstname",
        "lastname",
        "email",
        "role"
    ];
    
    const modelUser     = ModelUser(client);
    const reply         = HelperResponse();
    const validate      = HelperValudation();
    const permission    = HelperPermission();

    //getUsers
    module.getUsers = async (req, res) => {
        if(!permission.validateHandShake(req.headers.keyword, "getUsers"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        if(req.query.items_per_page <= 0)
            return reply.badRequest(req, res, "Invalid Parameter item_per_page or page");
        try {
            const users = await modelUser.selectUsers(
                req.query.items_per_page,
                req.query.page
            );
            return reply.success(req,res, users);
        }catch(e){
            return reply.error(req,res,e);
        };  
    };

    //getUser
    module.getUser = async (req, res) =>{
        if(!permission.validateHandShake(req.headers.keyword, "getUser"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        if(req.params.id <= 0)
            return reply.badRequest(req, res, "Invalid Parameter id");
        try{
            const user = await modelUser.selectUser(
                "id",
                req.params.id
            );
            if (user === undefined)
                return reply.notFound(req, res, "User not found");
            else
                return reply.success(req, res, user);
        }catch(e){
            return reply.error(req.res,e);
        };
    };

    //postUser
    module.postUser = async (req, res) => {
        if(!permission.validateHandShake(req.headers.keyword, "postUser"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        if(!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
            return reply.badRequest(req, res, "Incomplete req.body fields");
        try{
            const user = await modelUser.insertUser(req.body);
            return reply.created(req, res, user);
        }catch(e){
            return reply.error(req.res,e);
        };
    };

    //patchUser
    module.patchUser = async (req, res) => {
        if(!permission.validateHandShake(req.headers.keyword, "patchUser"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        if(req.params.id <= 0)
            return reply.badRequest(req, res, "Invalid parameter id");
        try{
            const user = await modelUser.updateUser(req.params.id, req.body);
            if (user === undefined)
                return reply.notFound(req, res, "User not found");
            else
                return reply.created(req, res, user);
        }catch(e){
            return reply.error(req, res, e);
        };
    };

    //deleteUser
    module.deleteUser = async (req, res) =>{
        if(!permission.validateHandShake(req.headers.keyword, "deleteUser"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        if(req.params.id <= 0){
            return reply.badRequest(req, res, "Invalid parameter id");
        };
        try{
            const user = await modelUser.deleteUser(req.params.id);
            if (user === undefined)
                return reply.notFound(req, res, "User not found");
            else
                return reply.created(req, res, user);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    return module;
}