require("dotenv").config();

/** Initialization Application  Configuration */
const http              = require("http");
const express           = require("express");
const bodyParser        = require("body-parser");
const {Client}          = require("pg");

const Constants         = require("./helper/constants");

/** Initialization Helper */
const HelperResponse    = require("./helper/response");
const HelperRouter      = require("./helper/router");
const reply             = HelperResponse();

/** Start Application Running */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const mainDb  = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl : process.env.SSL === "true" ? true : false
});
mainDb.connect();
  
app.use(express.json());

// app.all('*', (req, res, next) => {
//     console.log(req.url);
  
//     next();
// });

app.use('/v1', HelperRouter(express, mainDb));

const server    = http.createServer(app);

app.all("*", (req, res) => {
    return reply.notFound(req, res, "invalid route");
});

process.env.PORT  = process.env.PORT || 8080;
const port        = process.env.PORT;

module.exports = server.listen(port, () => {
    console.log(Constants.GREETING_MESSAGE);
});