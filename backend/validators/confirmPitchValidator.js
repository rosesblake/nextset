const { body } = require("express-validator");

const confirmPitchValidator = [
  // W9: Optional, must be a valid URL
  body("w9").optional().isURL().withMessage("W9 must be a valid URL"),

  // Rider: Optional, must be a valid URL
  body("rider").optional().isURL().withMessage("Rider must be a valid URL"),

  // Stage Plot: Optional, must be a valid URL
  body("stage_plot")
    .optional()
    .isURL()
    .withMessage("Stage Plot must be a valid URL"),

  // EPK: Optional, must be a valid URL
  body("epk").optional().isURL().withMessage("EPK must be a valid URL"),

  // Status: Required and must be "confirmed"
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isString()
    .withMessage("Status must be a string")
    .equals("confirmed")
    .withMessage("Status must be 'confirmed'"),
];

module.exports = { confirmPitchValidator };
