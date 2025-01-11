const { body } = require("express-validator");

const pitchValidator = [
  // Venue ID: Must be an integer and not empty
  body("venue_id")
    .isInt()
    .withMessage("Venue ID must be an integer")
    .notEmpty()
    .withMessage("Venue ID is required"),

  // Average Ticket Sales: Optional, must be a positive integer
  body("avg_ticket_sales")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Average ticket sales must be a positive integer"),

  // Support Acts: Optional, must be a string and up to 30 characters
  body("support_acts")
    .optional()
    .isString()
    .withMessage("Support acts must be a string")
    .isLength({ max: 30 })
    .withMessage("Support acts cannot exceed 30 characters"),

  // Date: Must be a valid ISO 8601 date and not empty
  body("date")
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 date")
    .notEmpty()
    .withMessage("Date is required"),

  // Content: Must be a non-empty string
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .notEmpty()
    .withMessage("Content is required"),
];

module.exports = { pitchValidator };
