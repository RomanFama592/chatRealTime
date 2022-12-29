const path = require("path");
const session = require("express-session");
const morgan = require("morgan");
const returnRqUser = require("./returnRqUser");
const express = require("express");
const app = express();

const routesGET = require("../routes/get");
const routesPOST = require("../routes/post");


//set configs
app.set("port", process.env.PORT);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

//middleware
//app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(returnRqUser);

//routes

app.use(routesPOST);
app.use(routesGET);

module.exports = app;
