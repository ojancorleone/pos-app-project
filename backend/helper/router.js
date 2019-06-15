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

    /* :: Service User :: */ 
    api.get("/users", formUser.fieldsGetUsers, validate.global, user.getUsers);
    api.get("/users/:id", formUser.fieldsGetUser, validate.global, user.getUser);
    api.post("/users", formUser.fieldsPostUser, validate.global, user.postUser);
    api.patch("/users/:id", formUser.fieldsPatchUser, validate.global, user.patchUser);
    api.delete("/users/:id", formUser.fieldsDeleteUser, validate.global, user.deleteUser);

    /* :: Service Product :: */ 
    api.get("/products", formProduct.fieldsGetProducts, validate.global, product.getProducts);
    api.get("/products/:id", formProduct.fieldsGetProduct, validate.global, product.getProduct);
    api.post("/products", formProduct.fieldsPostProduct, validate.global, product.postProduct);
    api.patch("/products/:id", formProduct.fieldsPatchProduct, validate.global, product.patchProduct);
    api.delete("/products/:id", formProduct.fieldsDeleteProduct, validate.global, product.deleteProduct);

    /* :: Service Category of Product :: */ 
    api.get("/categories", formCategory.fieldsGetCategories, validate.global, category.getCategories);
    api.get("/categories/:id", formCategory.fieldsGetCategory, validate.global, category.getCategory);
    api.post("/categories", formCategory.fieldsPostCategory, validate.global, category.postCategory);
    api.patch("/categories/:id", formCategory.fieldsPatchCategory, validate.global, category.patchCategory);
    api.delete("/categories/:id", formCategory.fieldsDeleteCategory, validate.global, category.deleteCategory);

    /* :: Service Cart :: */ 
    api.get("/carts", cart.getCarts);
    api.get("/carts/:id", cart.getCart);
    api.post("/carts/add", cart.postProductToCart);
    api.post("/carts/quantity", cart.patchQuantityProductToCart);
    api.delete("/carts", cart.deleteCart);

    return api;
};
