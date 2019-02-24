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
const Products          = require("./controller/product/product");

/** Initialization Helper */
const HelperResponse    = require("./helper/response");

/** Start Application Running */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,PUT,POST,PATCH,DELETE,OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });


const mainDb    = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl : process.env.DATABASE_SSL || false
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
  console.log(req.user);
  const user = {
    name: req.user.displayName,
    photo: req.user.photos[0].value.replace(/sz=50/gi, "sz=250")
  };
  console.log(user);
  io.in(req.session.socketId).emit("google", user);
  res.end();
});

app.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});

const user = User(mainDb);

app.get("/google", googleAuth);

//Service User
app.get("/users/:page/:items_per_page", user.getUsers);
app.get("/user/:id", user.getUser);
app.post("/user", user.postUser);
app.patch("/user/:id", user.patchUser);
app.delete("/user/:id", user.deleteUser);

//Service Product
app.get("/products/:page/:items_per_page", user.getProducts);
app.get("/product/:id", user.getProduct);
app.post("/product", user.postProduct);
app.patch("/product/:id", user.patchProduct);
app.delete("/product/:id", user.deleteProduct);

const reply = HelperResponse();
app.all("*", (req, res) => {
  return reply.notFound(req, res, "invalid route");
});

process.env.PORT = process.env.PORT || 8080;
const port = process.env.PORT;
module.exports = server.listen(port, () => {
    console.log(Constants.GREETING_MESSAGE);
});