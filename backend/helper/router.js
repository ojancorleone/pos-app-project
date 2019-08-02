/** Initialization Controller */
const User              = require("./../controller/user");
const Product           = require("./../controller/product");
const Category          = require("./../controller/category");
const Cart              = require("./../controller/cart");

const FormUser          = require("./../form/user");
const FormProduct       = require("./../form/product");
const FormCategory      = require("./../form/category");

const HelperValidation  = require('./../helper/validation');

module.exports = (express, mainDb) => {

    const user          = User(mainDb);
    const product       = Product(mainDb);
    const category      = Category(mainDb);
    const cart          = Cart(mainDb);

    const formUser      = FormUser();
    const formProduct   = FormProduct();
    const formCategory  = FormCategory();

    const validation    = HelperValidation().global;

    let api             = express.Router();

    /* :: Service user :: */ 
    api.get("/users", formUser.fieldsGetUsers, validation, user.getUsers);
    api.get("/user/:id", formUser.fieldsGetUser,validation, user.getUser);
    api.post("/user", formUser.fieldsPostUser, validation, user.postUser);
    api.patch("/user/:id", formUser.fieldsPatchUser, validation, user.patchUser);
    api.delete("/user/:id", formUser.fieldsDeleteUser, validation, user.deleteUser);

    /* :: Service Product :: */ 
    api.get("/products", formProduct.fieldsGetProducts, validation, product.getProducts);
    api.get("/product/:id", formProduct.fieldsGetProduct,validation, product.getProduct);
    api.post("/product", formProduct.fieldsPostProduct, validation, product.postProduct);
    api.patch("/product/:id", formProduct.fieldsPatchProduct, validation, product.patchProduct);
    api.delete("/product/:id", formProduct.fieldsDeleteProduct, validation, product.deleteProduct);

    /* :: Service Category of Product :: */ 
    api.get("/categories", formCategory.fieldsGetCategories, validation, category.getCategories);
    api.get("/category/:id", formCategory.fieldsGetCategory, validation, category.getCategory);
    api.post("/category", formCategory.fieldsPostCategory, validation, category.postCategory);
    api.patch("/category/:id", formCategory.fieldsPatchCategory, validation, category.patchCategory);
    api.delete("/category/:id", formCategory.fieldsDeleteCategory, validation, category.deleteCategory);

    /* :: Service Cart :: */ 
    api.get("/carts", cart.getCarts);
    api.get("/cart/:id", cart.getCart);
    api.post("/cart/product", cart.postProductToCart);
    api.post("/cart/quantity", cart.patchQuantityProductToCart);
    api.delete("/cart/:id", cart.deleteCart);


    return api;
};
