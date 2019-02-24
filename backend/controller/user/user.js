
const ModelUser         = require("./../../model/user/user");

const HelperResponse    = require("./../../helper/response");
const HelperValudation  = require("./../../helper/validation");

module.exports = client => {

    let module = {}

    module.mandatoryFields = [
        "username",
        "firstname",
        "lastname",
        "email",
        "role"
    ];
    
    const modelUser = ModelUser(client);
    const reply     = HelperResponse();
    const validate  = HelperValudation();

    //getUsers
    module.getUsers = async (req, res) => {
        req.query.item_per_page = parseInt(req.query.item_per_page);
        req.query.page          = parseInt(req.query.page);
        if(req.params.item_per_page <= 0)
            return reply.badRequest(req, res, "Invalid Parameter item_per_page or page");
        try {
            const users = await modelUser.selectUsers(
                req.params.items_per_page,
                req.params.page
            );
            return reply.success(req,res, users);
        }catch(e){
            return reply.error(req,res,e);
        };  
    };

    //getUser
    module.getUser = async (req, res) =>{
        req.query.id = parseInt(req.query.id);
        if(req.params.id <= 0)
            return reply.badRequest(req, res, "Invalid Parameter id");
        try{
            const user = await modelUser.selectUser(
                "id",
                req.params.id
            );
            if (user === undefined)
                return reply.notFound(req, res, "User not found in db");
            else
                 return reply.success(req, res, user);
        }catch(e){
            return reply.error(req.res,e);
        };
    };

    //postUser
    module.postUser = async (req, res) => {
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
        req.query.id = parseInt(req.query.id);
        if(req.params.id <= 0)
            return reply.badRequest(req, res, "Invalid parameter id");
        try{
            const user = await modelUser.updateUser(req.params.id, req.body);
            return reply.created(req, res, user);
        }catch(e){
            return reply.error(req, res, e);
        };
    };

    //deleteUser
    module.deleteUser = async (req, res) =>{
        req.query.id = parseInt(req.query.id);
        if(req.params.id <= 0){
            return reply.badRequest(req, res, "Invalid parameter id");
        };
        try{
            const user = await modelUser.deleteUser(req.params.id);
            return reply.created(req, res, user);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    return module;
}