const ModelCart         = require("./../model/cart");
const ModelCartProducts = require("./../model/carts_products");

const HelperResponse    = require("./../helper/response");
const HelperCommon      = require("./../helper/common");

module.exports = client => {

    let module                  = {};

    const reply                 = HelperResponse();
    const common                = HelperCommon();

    const modelCart             = ModelCart(client);
    const modelCartProducts     = ModelCartProducts(client);

    // getCarts
    module.getCarts = async (req, res) => {
        try {
            const carts = await modelCart.selectCarts(req.params.items_per_page, req.params.page, req.params.status);
            return reply.success(req, res, carts);
        } catch (e) {
            return reply.error(req, res, e);
        }
    };

    // getCart
    module.getCart = async (req, res) => {
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
        try {
            await client.query("BEGIN");

            let existingCart    = await modelCart.checkCartExists(req.body.user_id)

            if (existingCart === undefined)
                existingCart    = await modelCart.insertNewCart(req.body.user_id);

            let existingProduct = await modelCartProducts.checkProductCartExists(existingCart.id, req.body.product_id);
            if(existingProduct > 0){
                await client.query("COMMIT");
                return reply.badRequest(req, res, "product already exist in cart");
            }
            const cart = await modelCartProducts.insertNewProductToCart(
                existingCart.id,
                req.body.product_id,
                req.body.quantity
            );
            await client.query("COMMIT");
            return reply.created(req, res, cart);
        } catch (e) {
            client.query("ROLLBACK");
            return reply.error(req, res, e);
        }
    };

    // updateQuantityProductToCart
    module.patchQuantityProductToCart = async (req, res) => {
        try {
            let cart = null;
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