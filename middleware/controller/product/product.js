const ModelProduct      = require("./../../model/product/product");
const HelperResponse    = require("./../../helper/response");
const HelperValidation  = require("./../../helper/validation");
const HelperPermission  = require("./../../helper/permission");

module.exports = () => {
    
    let module = {};
   
    module.mandatoryFields = [
        "name",
        "description",
        "category_id",
        "stock",
        "price",
        "image_url"
    ];

    const modelProduct  = ModelProduct();
    const reply         = HelperResponse();
    const validate      = HelperValidation();
    const permission    = HelperPermission();

    //getProducts
    module.getProducts = async (req, res) => {
        if(req.params.items_per_page <= 0 || req.params.page < 0)
            return reply.badRequest(req, res, "Invalid parameter item_per_page or page");
        try{
            const products = await modelProduct.selectProducts(
                req.params.items_per_page,
                req.params.page
            );
            return reply.success(req, res, JSON.parse(JSON.stringify(products.data.data)));
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //getProduct
    module.getProduct = async (req, res) => {
        if(req.params.id <= 0)
            return reply.badRequest(req, res, "Invalid parameter id");
        try{
            const product = await modelProduct.selectProduct("id",req.params.id);
            if(product == undefined)
                return reply.notFound(req, res, "Product not Found");
            else
                console.log(products);
                return reply.success(req, res, JSON.parse(JSON.stringify(products.data.data)));
        }catch(e){
            return reply.error(req, res, e);
        }
    };
    
    return module;
}