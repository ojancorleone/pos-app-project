require("dotenv").config();

/** Initialization Application  Configuration */
const http              = require("http");
const express           = require("express");
const bodyParser        = require("body-parser");
const {Client}          = require("pg");
const path              = require("path");
const Constants         = require("./helper/constants");
//const cors              = require("cors");


/** Initialization Controller */
const User              = require("./controller/user/user");

/** Initialization Helper */
const HelperResponse    = require("./helper/response");

/** Start Application Running */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use(function(req, res, next) {
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



server          = http.createServer(app);

const mainDb    = new Client({
    connectionString: process.env.DATABASE_URL,
  })
mainDb.connect()


const user = User(mainDb);

app.get("/users/:page/:items_per_page", user.getUsers);
app.get("/user/:id", user.getUser);
app.post("/user", user.postUser);
app.patch("/user/:id", user.patchUser);
app.delete("/user/:id", user.deleteUser);

const reply = HelperResponse();
app.all("*", (req, res) => {
  return reply.notFound(req, res, "invalid route");
});

process.env.PORT = process.env.PORT || 8080;
const port = process.env.PORT;
module.exports = server.listen(port, () => {
    console.log(Constants.GREETING_MESSAGE);
});