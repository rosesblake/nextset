const jwt = require("jsonwebtoken");

function createToken(user) {
  // You can choose what to store in the payload (e.g., user id, username, etc.)
  const payload = {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    account_type: user.account_type,
    role: user.role,
  };

  // Secret key should be stored in an environment variable
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "12h" });

  return token;
}

module.exports = { createToken };
