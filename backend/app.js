// Express.js app configuration
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const axios = require("axios");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var apiRouter = require("./routes/api");

var app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

// Environment variable validation
["CLIENT_ID", "CLIENT_SECRET", "AUTH_URL"].forEach((key) => {
  if (!process.env[key]) {
    console.error(`Environment variable ${key} is not set.`);
    process.exit(1);
  }
});

// Add security headers
const helmet = require("helmet");
app.use(helmet());

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);

// Add a route to serve the landing page
app.get("/landing", (req, res) => {
  res.render("landing", { appName: "IMExpress" });
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("404 error handler : " + req.originalUrl);
  next(createError(404));
});

module.exports = app;
