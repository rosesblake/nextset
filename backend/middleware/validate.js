const { validationResult } = require("express-validator");
const { BadRequestError } = require("../expressError");

// Middleware to check validation errors
function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Map errors to a simpler structure for response
    const mappedErrors = errors.array().map((error) => ({
      msg: error.msg,
    }));
    console.log(mappedErrors); // Check in the console for errors

    // Pass the mapped errors to the BadRequestError
    return next(new BadRequestError("Validation failed", mappedErrors));
  }
  next();
}

module.exports = { validate };
