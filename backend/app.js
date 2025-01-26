"use strict";

const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");

const { NotFoundError, BadRequestError } = require("./expressError");

// const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const artistsRoutes = require("./routes/artists");
const venuesRoutes = require("./routes/venues");
const pitchesRoutes = require("./routes/pitches");
const spotifyRoutes = require("./routes/spotify");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authenticateJWT);
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//custom routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/artists", artistsRoutes);
app.use("/venues", venuesRoutes);
app.use("/pitches", pitchesRoutes);
app.use("/spotify", spotifyRoutes);

//handle 404 errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

//generic error handler
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;
  const errors = err.errors;
  // Handle BadRequestError specifically (like validation errors)
  if (err instanceof BadRequestError) {
    return res.status(status).json({
      error: {
        message: err.message,
        status: err.status,
        errors: errors || [],
      },
    });
  }

  return res.status(status).json({
    error: { message, errors, status },
  });
});

module.exports = app;
