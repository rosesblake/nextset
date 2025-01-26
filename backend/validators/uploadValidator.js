const { param } = require("express-validator");

// Validator for file uploads
const uploadValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Artist ID must be a valid integer"),

  // Validate that `fileType` is one of the allowed types
  param("fileType")
    .isString()
    .withMessage("File type must be a string")
    .isIn(["epk", "w9", "rider", "stage_plot"])
    .withMessage(
      "File type must be one of the following: 'epk', 'w9', 'rider', 'stage_plot'"
    ),
];

module.exports = { uploadValidator };
