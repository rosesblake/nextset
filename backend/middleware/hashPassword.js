const bcrypt = require("bcrypt");

async function hashPassword(req, res, next) {
  if (req.body.password) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      req.body.password_hash = hashedPassword;
      delete req.body.password;
      next();
    } catch (e) {
      return next(e);
    }
  } else {
    next();
  }
}

module.exports = hashPassword;
