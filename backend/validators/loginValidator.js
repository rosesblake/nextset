const { body } = require("express-validator");

// Validator for user login
const loginValidator = [
  body("email")
    .isEmail()
    .withMessage("Must be a valid email")
    .notEmpty()
    .withMessage("Email is required"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required"),
];

module.exports = { loginValidator };
