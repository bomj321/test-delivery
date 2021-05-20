"use strict";

//Requires
let express = require("express");
let bodyParser = require("body-parser");
let app = express();

//Execute express

//////// Mysql
const mysql = require("mysql");
const myconn = require("express-myconnection");
const dotenv = require("dotenv");
dotenv.config();

const { HOST, PORT, USER, PASSWORD, DATABASE } = process.env;

const dbOptions = {
  host: `${HOST}`,
  port: `${PORT}`,
  user: `${USER}`,
  database: `${DATABASE}`,
};

//Load route's files
let products_routes = require("./routes/products");
let router = express.Router();

//Middlewares
app.use(myconn(mysql, dbOptions, "single"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Rewrite Routes
app.use("/api", products_routes);

// will redirect all the non-api routes to react frontend
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
});

//Export Module
module.exports = app;
