const { body } = require("express-validator");

// Validator for user login
const loginValidator = [
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .notEmpty()
    .withMessage("Username is required"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required"),
];

module.exports = { loginValidator };
