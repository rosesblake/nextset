const { body } = require("express-validator");

// Validator for venue creation
const venueValidator = [
  body("name")
    .isString()
    .withMessage("Venue name must be a string")
    .notEmpty()
    .withMessage("Venue name is required")
    .isLength({ max: 50 })
    .withMessage("Venue name cannot exceed 50 characters"),

  body("capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be a positive integer")
    .notEmpty()
    .withMessage("Capacity is required"),

  body("full_address")
    .isString()
    .withMessage("Full address must be a string")
    .notEmpty()
    .withMessage("Full address is required"),

  body("street")
    .isString()
    .withMessage("Street must be a string")
    .notEmpty()
    .withMessage("Street is required"),

  body("city")
    .isString()
    .withMessage("City must be a string")
    .notEmpty()
    .withMessage("City is required"),

  body("state")
    .isString()
    .withMessage("State must be a string")
    .notEmpty()
    .withMessage("State is required"),

  body("zip_code")
    .isString()
    .withMessage("Zip code must be a string")
    .notEmpty()
    .withMessage("Zip code is required")
    .isPostalCode("US")
    .withMessage("Invalid zip code format"),

  body("lat")
    .isFloat()
    .withMessage("Latitude must be a valid number")
    .notEmpty()
    .withMessage("Latitude is required"),

  body("lng")
    .isFloat()
    .withMessage("Longitude must be a valid number")
    .notEmpty()
    .withMessage("Longitude is required"),

  body("created_by")
    .isInt()
    .withMessage("Created by must be a valid user ID")
    .notEmpty()
    .withMessage("Created by is required"),
];

module.exports = { venueValidator };
