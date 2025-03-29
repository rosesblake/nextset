const jwt = require("jsonwebtoken");

function createRefreshToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    account_type: user.account_type,
    role: user.role,
  };

  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  return refreshToken;
}

module.exports = { createRefreshToken };
