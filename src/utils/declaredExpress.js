const path = require("path");
const express = require("express");
const routesGET = require("../routes/get")
const app = express();

//set configs
app.set("port", process.env.PORT || 5500);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

//set static files
app.use(express.static(path.join(__dirname, "..", "public")));

//routes
app.use(routesGET);

module.exports = app;
