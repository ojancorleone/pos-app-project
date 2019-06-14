/** Initialization Controller */
const User              = require("./../controller/user");
const Product           = require("./../controller/product");
const Category          = require("./../controller/category");
const Cart              = require("./../controller/cart");

module.exports = (express, mainDb) => {

    const user      = User(mainDb);
    const product   = Product(mainDb);
    const category  = Category(mainDb);
    const cart      = Cart(mainDb);

    let api         = express.Router();

    //Service User
    api.get("/users", user.getUsers);
    api.get("/users/:id", user.getUser);
    api.post("/users", user.postUser);
    api.patch("/users/:id", user.patchUser);
    api.delete("/users/:id", user.deleteUser);

    //Service Product
    api.get("/products", product.getProducts);
    api.get("/products/:id", product.getProduct);
    api.post("/products", product.postProduct);
    api.patch("/products/:id", product.patchProduct);
    api.delete("/products/:id", product.deleteProduct);

    //Service Category Product
    api.get("/categories", category.getCategories);
    api.get("/categories/:id", category.getCategory);
    api.post("/categories", category.postCategory);
    api.patch("/categories/:id", category.patchCategory);
    api.delete("/categories/:id", category.deleteCategory);

    //Service Cart Product
    api.get("/carts", cart.getCarts);
    api.get("/carts/:id", cart.getCart);
    api.post("/carts/add", cart.postProductToCart);
    api.post("/carts/quantity", cart.patchQuantityProductToCart);
    api.delete("/carts", cart.deleteCart);

    return api;
};
