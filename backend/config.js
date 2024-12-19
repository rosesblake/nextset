"use strict";

// shared config for the application
//using dotenv to share sensitive dev info
require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

//using this in db.js to see if i am trying to run a "test" database otherwise, just connect to the main nextset db
function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "nextset_test"
    : process.env.DATABASE_URL;
}

//setting the work factor for the password hashing algorithm
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("NextSet Config:".green);
console.log("PORT:".yellow, PORT.toString());
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
