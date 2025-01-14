const { validationResult } = require("express-validator");
const { BadRequestError } = require("../expressError");

function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Extract validation errors
    const errorMessages = errors.array().map((error) => ({
      msg: error.msg,
      param: error.param,
    }));
    // Throw a BadRequestError with the extracted errors
    throw new BadRequestError("Validation failed", errorMessages);
  }

  next();
}

module.exports = { validate };
