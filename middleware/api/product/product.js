const HelperRequest     = require("../../helper/request");
const HelperResponse    = require("./../../helper/response");
const HelperValidation  = require("./../../helper/validation");

const HelperPermission  = require("./../../helper/permission");

module.exports = () => {
    
    let module = {};

    const reply         = HelperResponse();
    const permission    = HelperPermission();
    const request       = HelperRequest();

    //getProducts
    module.getProducts = async (req, res) => {
        if(req.params.items_per_page <= 0 || req.params.page < 0)
            return reply.badRequest(req, res, "Invalid parameter item_per_page or page");
        try{
            const response = await request.httpGetRequest(`/products/${req.params.page}/${req.params.items_per_page}`, "getProducts");
            return reply.success(req, res, response.data);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //getProduct
    module.getProduct = async (req, res) => {
        if(req.params.id <= 0)
            return reply.badRequest(req, res, "Invalid parameter id");
        try{
            const response = await request.httpGetRequest(`/product/${req.params.id}`, "getProduct");
            if(response == undefined)
                return reply.notFound(req, res, "Product not Found");
            else
                return reply.success(req, res, response.data);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //postProduct
    module.postProduct = async (req, res) => {
        try{
            const response =  await request.httpPostRequest(`/product`, "postProduct", req.body);
            return reply.created(req, res, response.data);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //patchProduct
    module.patchProduct = async (req, res) => {
        if(req.params.id <= 0)
            return reply.badRequest(req, res, "Invalid Parameter id");
        try{
            const response =  await request.httpPatchRequest(`/product/${req.params.id}`, "patchProduct", req.body);
            return reply.created(req, res, response.data);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //deleteProduct
    module.patchProduct = async (req, res) => {
        if(req.params.id <= 0)
            return reply.badRequest(req, res, "Invalid Parameter id");
        try{
            const response =  await request.httpDeleteRequest(`/product/${req.params.id}`, "deleteProduct");
            return reply.created(req, res, response.data);
        }catch(e){
            return reply.error(req, res, e);
        }
    };
    
    return module;
}