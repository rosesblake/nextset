// config.js

require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const PORT = process.env.PORT || 3001;

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("NextSet Config:".green);
console.log("PORT:".yellow, PORT.toString());
console.log("---");

module.exports = {
  SECRET_KEY,
  REFRESH_SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  DATABASE_URL: process.env.DATABASE_URL,
};
