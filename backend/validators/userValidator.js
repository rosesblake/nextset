const { body } = require("express-validator");

// Validator for user registration
const userValidator = [
  body("full_name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters"),

  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ max: 255 })
    .withMessage("Email cannot exceed 255 characters")
    .normalizeEmail(),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*]/)
    .withMessage(
      "Password must contain at least one special character (!@#$%^&*)"
    ),

  body("account_type")
    .isString()
    .withMessage("Account type must be a string")
    .notEmpty()
    .withMessage("Account type is required")
    .isIn(["artist", "venue"])
    .withMessage('Account type must be either "artist" or "venue"'),
];

module.exports = { userValidator };
