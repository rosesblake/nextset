const { body } = require("express-validator");

// Validator for artist creation
const artistValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Artist name is required")
    .isLength({ max: 50 })
    .withMessage("Artist name cannot exceed 50 characters"),

  body("genre")
    .optional()
    .isString()
    .withMessage("Genre must be a string")
    .isLength({ max: 50 })
    .withMessage("Genre cannot exceed 50 characters"),

  body("instagram_handle")
    .optional()
    .isString()
    .withMessage("Instagram handle must be a string")
    .isLength({ max: 50 })
    .withMessage("Instagram handle cannot exceed 50 characters"),

  body("spotify_monthly_listeners")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Spotify monthly listeners must be a valid number"),

  body("phone")
    .optional()
    .isString()
    .withMessage("Phone number must be a string")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 digits"),
];

module.exports = { artistValidator };
