const ModelCart         = require("./../model/cart");
const ModelCartProducts = require("./../model/carts_products");

const HelperResponse    = require("./../helper/response");
const HelperValidation  = require("./../helper/validation");
const HelperPermission  = require("./../helper/permission");
const HelperCommon      = require("./../helper/common");

module.exports = client => {

    let module                  = {};

    const reply                 = HelperResponse();
    const validate              = HelperValidation();
    const permission            = HelperPermission();
    const common                = HelperCommon();

    const modelCart             = ModelCart(client);
    const modelCartProducts     = ModelCartProducts(client);

    module.mandatoryFields      = ["product_id", "user_id", "quantity"];

    // getCarts
    module.getCarts = async (req, res) => {
        if(!permission.validateHandShake(req.headers.keyword, "getCarts"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        if (req.params.items_per_page < 0 || req.params.items_per_page <= 0)
            return reply.badRequest(req,res,"invalid parameter items_per_page or page");
        try {
            const carts = await modelCart.selectCarts(req.params.items_per_page, req.params.page, req.params.status);
            return reply.success(req, res, carts);
        } catch (e) {
            return reply.error(req, res, e);
        }
    };

    // getCart
    module.getCart = async (req, res) => {
        if(!permission.validateHandShake(req.headers.keyword, "getCart"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        if (req.params.id <= 0)
            return reply.badRequest(req, res, "invalid parameter id");

        try {
            let cart = await modelCart.selectCart("id", req.params.id);
            if (cart === undefined){
                return reply.notFound(req, res, "cart not found in db");
            } 
            else{
                const cart_products     = await modelCartProducts.getProductsFromCart(cart.id);
                cart["total_amount"]    = common.getTotalAmount(cart_products,0);
                cart["products"]        = cart_products;
                return reply.success(req, res, cart);
            }  
        } catch (e) {
            return reply.error(req, res, e);
        }
    };

    //addProductToCart
    module.postProductToCart = async (req, res) => {
        if(!permission.validateHandShake(req.headers.keyword, "postProductToCart"))
            return reply.unauthorized(req, res, "Invalid Keywords");

        if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
            return reply.badRequest(req, res, "incomplete req.body fields");

        try {
            await client.query("BEGIN");

            let existingCart    = await modelCart.checkCartExists(req.body.user_id)

            if (existingCart === undefined)
                existingCart    = await modelCart.insertNewCart(req.body.user_id);

            let existingProduct = await modelCartProducts.checkProductCartExists(existingCart.id, req.body.product_id);
            if(existingProduct > 0)
                return reply.badRequest(req, res, "product already exist in cart");

            const cart = await modelCartProducts.insertNewProductToCart(
                existingCart.id,
                req.body.product_id,
                req.body.quantity
            );
            await client.query("COMMIT");
            return reply.created(req, res, cart);
        } catch (e) {
            await client.query("ROLLBACK");
            return reply.error(req, res, e);
        }
    };

    // updateQuantityProductToCart
    module.patchQuantityProductToCart = async (req, res) => {
        let cart = null;

        if(!permission.validateHandShake(req.headers.keyword, "patchQuantityProductToCart"))
            return reply.unauthorized(req, res, "Invalid Keywords");

        if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
            return reply.badRequest(req, res, "incomplete req.body fields");

        try {
            await client.query("BEGIN");
            const existingCart = await modelCart.checkCartExists(req.body.user_id);

        if (req.body.quantity == "0")
            cart = await modelCartProducts.deleteProductFromCart(existingCart.id,req.body.product_id);
        else 
            cart = await modelCartProducts.updateQuantityProductFromCart(
                existingCart.id,
                req.body.product_id,
                req.body.quantity
            );
            await client.query("COMMIT");
            return reply.created(req, res, cart);
        } catch (e) {
            await client.query("ROLLBACK");
            return reply.error(req, res, e);
        }
    };

    module.deleteCart = async (req, res) => {
        if(!permission.validateHandShake(req.headers.keyword, "deleteCart"))
            return reply.unauthorized(req, res, "Invalid Keywords");
        if (req.params.id <= 0)
            return reply.badRequest(req, res, "invalid parameter id");
        try {
            let cart = null;
            await client.query("BEGIN");
            const existingCart  = await modelCart.checkCartExists(req.body.user_id);
            if(existingCart == undefined){
                await client.query("ROLLBACK");
                return reply.notFound(req, res, "Cart doesnt exist");
            }else{
                cart = await modelCartProducts.emptyProductsFromCart(existingCart.id);
                await client.query("COMMIT");
                return reply.created(req, res, cart);
            }
        } catch (e) {
            await client.query("ROLLBACK");
            return reply.error(req, res, e);
        }
    };
    return module;
};