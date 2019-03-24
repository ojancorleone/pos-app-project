const ModelProduct      = require("./../../model/product/product");
const HelperResponse    = require("./../../helper/response");
const HelperValidation  = require("./../../helper/validation");
const HelperPermission  = require("./../../helper/permission");

module.exports = client => {
    
    let module = {};
   
    module.mandatoryFields = [
        "name",
        "description",
        "category_id",
        "stock",
        "price",
        "image_url"
    ];

    const modelProduct  = ModelProduct(client);
    const reply         = HelperResponse();
    const validate      = HelperValidation();
    const permission    = HelperPermission();

    //getProducts
    module.getProducts = async (req, res) => {
        if(!permission.validateHandShake(req.body.keyword, "getProducts"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        try{
            const products = await modelProduct.selectProducts(
                req.params.items_per_page,
                req.params.page
            );
            return reply.success(req, res, products);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //getProduct
    module.getProduct = async (req, res) => {
        if(!permission.validateHandShake(req.body.keyword, "getProduct"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        try{
            const product = await modelProduct.selectProduct("id",req.params.id);
            if(product == undefined)
                return reply.notFound(req, res, "Product not Found");
            else
                return reply.success(req, res, product);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //postProduct
    module.postProduct = async (req, res) => {
        if(!permission.validateHandShake(req.body.keyword, "postProduct"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        if(!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
            return reply.badRequest(req, res, "Invalid parameter request");
        try{
            const product = await modelProduct.insertProduct(req.body);
            return reply.created(req, res, product);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //patchProduct
    module.patchProduct = async (req, res) => {
        if(!permission.validateHandShake(req.body.keyword, "patchProduct"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        try{
            const product = await modelProduct.updateProduct(req.params.id, req.body);
            return reply.created(req, res, product);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //deleteProduct
    module.deleteProduct = async (req, res) => {
        if(!permission.validateHandShake(req.body.keyword, "deleteProduct"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        try{
            const product = await modelProduct.deleteProduct(req.params.id);
            return reply.created(req, res, product);
        }catch(e){
            return reply.error(req, res, e);
        }   
    }
    
    return module;
}