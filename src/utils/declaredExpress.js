const path = require("path");
const express = require("express");
const app = express();

const routesGET = require("../routes/get");

//set configs
app.set("port", process.env.PORT);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

//set static files
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

//routes
app.use(routesGET);

module.exports = app;
