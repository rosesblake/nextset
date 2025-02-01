const { body } = require("express-validator");

// Validator for venue creation
const venueValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Venue name is required")
    .isLength({ max: 50 })
    .withMessage("Venue name cannot exceed 50 characters"),

  body("city")
    .isString()
    .withMessage("City must be a string")
    .notEmpty()
    .withMessage("City is required")
    .isLength({ max: 50 })
    .withMessage("City cannot exceed 50 characters"),

  body("state")
    .isString()
    .withMessage("State must be a string")
    .notEmpty()
    .withMessage("State is required")
    .isLength({ min: 2, max: 20 })
    .withMessage("State must be at least 2 characters, max 20"),

  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string")
    .isLength({ max: 50 })
    .withMessage("Address cannot exceed 50 characters"),

  body("zip_code")
    .optional()
    .isInt()
    .withMessage("Zip code must be a number")
    .isLength({ max: 10 })
    .withMessage("Zip code cannot exceed 10 characters"),
];

module.exports = { venueValidator };
