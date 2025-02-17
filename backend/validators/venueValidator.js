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
];

module.exports = { venueValidator };
