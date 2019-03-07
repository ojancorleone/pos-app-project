require("dotenv").config();

/** Initialization Application  Configuration */
const http              = require("http");
const express           = require("express");
const bodyParser        = require("body-parser");
const {Client}          = require("pg");
const path              = require("path");
const passport          = require("passport");
const socketio          = require("socket.io");
const session           = require("express-session");
const passportInit      = require("./helper/passport");
const Constants         = require("./helper/constants");
//const cors              = require("cors");

/** Initialization Controller */
const User              = require("./controller/user/user");
const Product           = require("./controller/product/product");
const Category          = require("./controller/product/category");
const Cart              = require("./controller/cart/cart");

/** Initialization Helper */
const HelperResponse    = require("./helper/response");

/** Start Application Running */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS")
      return res.status(200).end();
    next();
  });


const mainDb  = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl : process.env.SSL === "true" ? true : false
});
  
mainDb.connect();
  
// Setup for passport and to accept JSON objects
app.use(express.json());
app.use(passport.initialize());
passportInit();
  
// saveUninitialized: true allows us to attach the socket id to the session
// before we have athenticated the user
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

server          = http.createServer(app);
const io        = socketio(server);
app.set("io", io);
app.get("/wake-up", (req, res) => res.send("Good !"));

const googleAuth = passport.authenticate("google", { scope: ["profile"] });

app.get("/google/callback", googleAuth, (req, res) => {
  //const io = req.app.get("io");
  // console.log(req.user);
  const user = {
    name: req.user.displayName,
    photo: req.user.photos[0].value.replace(/sz=50/gi, "sz=250")
  };
  // console.log(user);
  io.in(req.session.socketId).emit("google", user);
  res.end();
});

app.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

const user      = User(mainDb);
const product   = Product(mainDb);
const category  = Category(mainDb);
const cart      = Cart(mainDb);

app.get("/google", googleAuth);

//Service User
app.get("/users/:page/:items_per_page", user.getUsers);
app.get("/user/:id", user.getUser);
app.post("/user", user.postUser);
app.patch("/user/:id", user.patchUser);
app.delete("/user/:id", user.deleteUser);

//Service Product
app.get("/products/:page/:items_per_page", product.getProducts);
app.get("/product/:id", product.getProduct);
app.post("/product", product.postProduct);
app.patch("/product/:id", product.patchProduct);
app.delete("/product/:id", product.deleteProduct);

//Service Category Product
app.get("/categories/:page/:items_per_page", category.getCategories);
app.get("/category/:id", category.getCategory);
app.post("/category", category.postCategory);
app.patch("/category/:id", category.patchCategory);
app.delete("/category/:id", category.deleteCategory);

//Service Cart Product
app.get("/carts/:page/:items_per_page", cart.getCarts);
app.get("/cart/:id", cart.getCart);
app.post("/cart/add", cart.postProductToCart);
app.post("/cart/quantity", cart.patchQuantityProductToCart);
app.delete("/cart", cart.deleteCart);

const reply = HelperResponse();
app.all("*", (req, res) => {
  return reply.notFound(req, res, "invalid route");
});

process.env.PORT = process.env.PORT || 8080;
const port = process.env.PORT;
module.exports = server.listen(port, () => {
    console.log(Constants.GREETING_MESSAGE);
});