
const ModelUser         = require("./../model/user");
const HelperResponse    = require("./../helper/response");

module.exports = client => {

    let module          = {}
    
    const modelUser     = ModelUser(client);
    const reply         = HelperResponse();



    //getUsers
    module.getUsers = async (req, res) => {
        try {
            const users = await modelUser.selectUsers(req.query.items_per_page,req.query.page);
            return reply.success(req,res, users);
        }catch(e){
            return reply.error(req,res,e);
        };  
    };

    //getUser
    module.getUser = async (req, res) =>{
        try{
            const user = await modelUser.selectUser("id", req.params.id);
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
        try{
            const user = await modelUser.insertUser(req.body);
            return reply.created(req, res, user);
        }catch(e){
            return reply.error(req.res,e);
        };
    };

    //patchUser
    module.patchUser = async (req, res) => {
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