const bcrypt = require("bcrypt");

async function hashPassword(req, res, next) {
  if (req.body.password || req.body.data?.newPassword) {
    const passwordToHash = req.body.password || req.body.data.newPassword;
    try {
      const hashedPassword = await bcrypt.hash(passwordToHash, 10);
      req.body.password_hash = hashedPassword;
      if (req.body.password) delete req.body.password;
      if (req.body.data?.newPassword) delete req.body.data.newPassword;
      next();
    } catch (e) {
      return next(e);
    }
  } else {
    next();
  }
}

module.exports = hashPassword;
