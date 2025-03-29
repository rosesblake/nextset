const jwt = require("jsonwebtoken");

function createToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    account_type: user.account_type,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "15m" });

  return token;
}

module.exports = { createToken };
