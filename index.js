//modules & variables

const  express = require("express");
const  urlencoded  = require("express");
const sequelize = require("sequelize");
//var session = require("express-session");
const cors = require("cors");
const dotenv = require('dotenv')

dotenv.config()

var PORT = process.env.PORT;

//files
const pages = require("./routes.js");
var db = require("./models");

// app init
var app = express();

//use json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//startic
app.use(express.static("public"));

//session

//routes
app.use("/api", pages);

// run sequels

//run app
app.listen(PORT, async function () {
  console.log("server started on port " + PORT);
  await db.sequelize.authenticate();
  console.log("Database connected!");
});
