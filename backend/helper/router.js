/** Initialization Controller */
const User              = require("./../controller/user");
const Product           = require("./../controller/product");
const Category          = require("./../controller/category");
const Cart              = require("./../controller/cart");

const FormUser          = require("./../validation/user");
const FormProduct       = require("./../validation/product");
const FormCategory      = require("./../validation/category");

const GlobalValidation  = require("./../helper/validation");

module.exports = (express, mainDb) => {

    const user          = User(mainDb);
    const product       = Product(mainDb);
    const category      = Category(mainDb);
    const cart          = Cart(mainDb);

    const formUser      = FormUser();
    const formProduct   = FormProduct();
    const formCategory  = FormCategory();
    
    const validate      = GlobalValidation();

    let api             = express.Router();

    api.get("/users", formUser.fieldsGetUsers, validate.global, user.getUsers);
    api.get("/user/:id", formUser.fieldsGetUser, validate.global, user.getUser);
    api.post("/user", formUser.fieldsPostUser, validate.global, user.postUser);
    api.patch("/user/:id", formUser.fieldsPatchUser, validate.global, user.patchUser);
    api.delete("/user/:id", formUser.fieldsDeleteUser, validate.global, user.deleteUser);

    /* :: Service Product :: */ 
    api.get("/products", formProduct.fieldsGetProducts,product.getProducts);
    api.get("/product/:id", formProduct.fieldsGetProduct, product.getProduct);
    api.post("/product", formProduct.fieldsPostProduct, product.postProduct);
    api.patch("/product/:id", formProduct.fieldsPatchProduct, product.patchProduct);
    api.delete("/product/:id", formProduct.fieldsDeleteProduct, product.deleteProduct);

    /* :: Service Category of Product :: */ 
    api.get("/categories", formCategory.fieldsGetCategories, validate.global, category.getCategories);
    api.get("/category/:id", formCategory.fieldsGetCategory, validate.global, category.getCategory);
    api.post("/category", formCategory.fieldsPostCategory, validate.global, category.postCategory);
    api.patch("/category/:id", formCategory.fieldsPatchCategory, validate.global, category.patchCategory);
    api.delete("/category/:id", formCategory.fieldsDeleteCategory, validate.global, category.deleteCategory);

    /* :: Service Cart :: */ 
    api.get("/carts", cart.getCarts);
    api.get("/cart/:id", cart.getCart);
    api.post("/cart/product", cart.postProductToCart);
    api.post("/cart/quantity", cart.patchQuantityProductToCart);
    api.delete("/cart/:id", cart.deleteCart);

    return api;
};
