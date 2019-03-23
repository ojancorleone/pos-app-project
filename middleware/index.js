require("dotenv").config();
/** Initialization Application  Configuration */
const http              = require("http");
const express           = require("express");
const session           = require("express-session");
const bodyParser        = require("body-parser");
const Redis             = require('redis');


/** Initialization Helper */
const HelperResponse    = require("./helper/response");
const Constant          = require("./helper/constants");

/** Initialization Controller */
const CacheRedis        = require("./controller/cacheRedis/cacheRedis");
const Product           = require("./controller/product/product");

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

const client = Redis.createClient(process.env.REDIS_PORT, process.env.REDIS_URL);

app.use(express.json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
);

server        = http.createServer(app);
const redis   = CacheRedis(client, Redis);
const product = Product();

//Service Redis
app.get("/redis/:id", redis.getCache);
app.post("/redis", redis.postCache);

//Service Product
app.get("/products/:page/:items_per_page", product.getProducts);
app.get("/product/:id", product.getProduct);

const reply = HelperResponse();
app.all("*", (req, res) => {
  return reply.notFound(req, res, "invalid route");
});

const port = process.env.PORT || 8080;
module.exports = server.listen(port, () => {
    console.log(Constant.GREETING_MESSAGE);
    console.log(`::::: opened port ${port} :::::`);
});