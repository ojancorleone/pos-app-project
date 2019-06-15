const ModelProduct      = require("./../model/product");
const HelperResponse    = require("./../helper/response");

module.exports = client => {
    
    let module = {};

    const modelProduct  = ModelProduct(client);
    const reply         = HelperResponse();

    //getProducts
    module.getProducts = async (req, res) => {
        try{
            const products = await modelProduct.selectProducts(
                req.query.items_per_page,
                req.query.page
            );
            return reply.success(req, res, products);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    // :: getProduct ::
    module.getProduct = async (req, res) => {
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
        try{
            const product = await modelProduct.insertProduct(req.body);
            return reply.created(req, res, product);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //patchProduct
    module.patchProduct = async (req, res) => {
        try{
            const product = await modelProduct.updateProduct(req.params.id, req.body);
            if(product == undefined)
                return reply.notFound(req, res, "Product not Found");
            else
                return reply.created(req, res, product);
        }catch(e){
            return reply.error(req, res, e);
        }
    };

    //deleteProduct
    module.deleteProduct = async (req, res) => {
        try{
            const product = await modelProduct.deleteProduct(req.params.id);
            if(product == undefined)
                return reply.notFound(req, res, "Product not Found");
            else
                return reply.created(req, res, product);
        }catch(e){
            return reply.error(req, res, e);
        }   
    }
    
    return module;
}