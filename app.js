require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const cors = require("cors");
const { connection } = require("./connection/database");

// Routes
const {
  UserRouters,
  FoodRoutes,
  RestaurantRoutes,
  MenuRoutes,
  AuthRoutes,
} = require("./routes");

// connection();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Endpoints
app.use("/api/v1/users", UserRouters);
app.use("/api/v1/food", FoodRoutes);
app.use("/api/v1/restaurant", RestaurantRoutes);
app.use("/api/v1/menu", MenuRoutes);
app.use("/api/v1/auth", AuthRoutes);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
