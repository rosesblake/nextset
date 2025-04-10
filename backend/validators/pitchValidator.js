const { body } = require("express-validator");

const pitchValidator = [
  // Venue ID: Must be an integer and not empty
  body("venue_id")
    .isInt()
    .withMessage("Venue ID must be an integer")
    .notEmpty()
    .withMessage("Venue ID is required"),

  // Support Acts: Must be an array (if provided)
  body("support_acts")
    .optional()
    .isArray()
    .withMessage("Support acts must be an array"),
  body("support_acts.*.name")
    .optional()
    .isString()
    .withMessage("Each support act must have a valid name"),
  body("support_acts.*.spotify_id")
    .optional()
    .isString()
    .withMessage("Each support act must have a valid Spotify ID"),
  body("support_acts.*.spotify_url")
    .optional()
    .isURL()
    .withMessage("Each support act must have a valid Spotify URL"),

  // Start Date: Required, must be ISO 8601
  body("start_date")
    .isISO8601()
    .withMessage("Start date must be a valid ISO 8601 date")
    .notEmpty()
    .withMessage("Start date is required"),

  // End Date: Required, must be ISO 8601
  body("end_date")
    .isISO8601()
    .withMessage("End date must be a valid ISO 8601 date")
    .notEmpty()
    .withMessage("End date is required"),

  // Content: Must be a non-empty string
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content is required"),

  // Role: Must be "Headliner" or "Support"
  body("role")
    .isIn(["Headliner", "Support"])
    .withMessage("Role must be either 'Headliner' or 'Support'"),
];

module.exports = { pitchValidator };
