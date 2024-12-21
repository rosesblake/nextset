"use strict";

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

// const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());
// app.use(authenticateJWT);

//custom routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

//handle 404 errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

//generic error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
