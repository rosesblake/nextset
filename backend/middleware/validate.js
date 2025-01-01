const { validationResult } = require("express-validator");
const { BadRequestError } = require("../expressError");

// Middleware to check validation errors
function validate(req, res, next) {
  const fields = req.body;

  // Loop through the fields and check if any are empty strings
  for (let key in fields) {
    if (!fields[key]) {
      // If any field is an empty string, return a BadRequestError
      return next(
        new BadRequestError("yeehaw", { msg: "All fields must be filled out" })
      );
    }
  }

  //send mapped errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const mappedErrors = errors
      .array()
      .map((error) => ({ msg: error.msg, param: error.param }));
    return next(new BadRequestError("Validation failed", mappedErrors));
  }
  next();
}

module.exports = { validate };
