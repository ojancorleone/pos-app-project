const ModelCart         = require("./../../model/cart/cart");
const ModelCartProducts = require("./../../model/cart/carts_products");
const HelperResponse    = require("./../../helper/response");
const HelperValidation  = require("./../../helper/validation");

module.exports = client => {

    let module                  = {};

    const reply                 = HelperResponse();
    const validate              = HelperValidation();
    const modelCart             = ModelCart(client);
    const modelCartProducts     = ModelCartProducts(client);

    module.mandatoryFields      = ["product_id", "user_id", "quantity"];

    // getCarts
    module.getCarts = async (req, res) => {
        if (req.params.items_per_page < 0 || req.params.items_per_page <= 0)
            return reply.badRequest(req,res,"invalid parameter items_per_page or page");

        try {
            const carts = await modelCart.selectCarts(req.params.items_per_page,req.params.page);
            return reply.success(req, res, carts);
        } catch (e) {
            return reply.error(req, res, e);
        }
    };

    // getCart
    module.getCart = async (req, res) => {
        if (req.params.id <= 0)
            return reply.badRequest(req, res, "invalid parameter id");

        try {
            const cart = await modelCart.selectCart("id", req.params.id);
            if (cart === undefined)
                return reply.notFound(req, res, "cart not found in db");
            else return reply.success(req, res, cart);
        } catch (e) {
            return reply.error(req, res, e);
        }
    };

    //addProductToCart
    module.postProductToCart = async (req, res) => {

        if (!validate.allMandatoryFieldsExists(req.body, module.mandatoryFields))
            return reply.badRequest(req, res, "incomplete req.body fields");

        try {
            await client.query("BEGIN");
            let existingCart    = await modelCart.checkCartExists(req.body.user_id);
            let existingProduct = await modelCartProducts.checkProductCartExists(existingCart.id, req.body.product_id);

            if(existingProduct.length > 0)
                return reply.badRequest(req, res, "product already exist in cart");

            if (existingCart === undefined)
                existingCart = await modelCart.insertCart(req.body.user_id);

            const cart = await modelCartProducts.insertProductToCart(
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
        let cart;

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
        if (!validate.allMandatoryFieldsExists(req.body, ["user_id"]))
            return reply.badRequest(req, res, "incomplete req.body fields");
        try {
            await client.query("BEGIN");
            const existingCart  = await modelCart.checkCartExists(req.body.user_id);
            const cart          = await modelCartProducts.emptyProductsFromCart(existingCart.id);
            await client.query("COMMIT");
            return reply.created(req, res, cart);
        } catch (e) {
            await client.query("ROLLBACK");
            return reply.error(req, res, e);
        }
    };
    return module;
};