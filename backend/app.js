"use strict";

const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser"); // added

const { NotFoundError, BadRequestError } = require("./expressError");

const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const artistsRoutes = require("./routes/artists");
const venuesRoutes = require("./routes/venues");
const pitchesRoutes = require("./routes/pitches");
const spotifyRoutes = require("./routes/spotify");
const locationsRoutes = require("./routes/locations");

const morgan = require("morgan");

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://nextset-demo.onrender.com",
  "https://nextset.onrender.com",
  "https://nextset-u3js.onrender.com",
  "https://next-set.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//allow cookies
app.use(express.json());
app.use(cookieParser()); //added
app.use(morgan("tiny"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//custom routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/artists", artistsRoutes);
app.use("/venues", venuesRoutes);
app.use("/pitches", pitchesRoutes);
app.use("/spotify", spotifyRoutes);
app.use("/locations", locationsRoutes);

// Serve React frontend (after all API routes)
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; object-src 'none';"
  );
  next();
});

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
