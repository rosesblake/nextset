("use strict");

const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authenticate user via cookie-based JWT.
 *
 * If a token cookie is provided, verify it, and, if valid,
 * store the token payload on res.locals.user.
 */
function authenticateJWT(req, res, next) {
  const token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken; // Get refreshToken from cookies

  if (token) {
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      res.locals.user = user;
      return next();
    } catch (err) {
      if (err.name !== "TokenExpiredError") {
        return next(new UnauthorizedError("Invalid token"));
      }
    }
  }

  if (!refreshToken) {
    return next(new UnauthorizedError("Authorization token is missing"));
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

    const { id, email, full_name, account_type, role } = payload;
    const newAccessToken = jwt.sign(
      { id, email, full_name, account_type, role },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    res.locals.user = { id, email, full_name, account_type, role };
    return next();
  } catch (err) {
    console.error("Refresh token verification failed:", err.message);
    return next(new UnauthorizedError("Invalid refresh token"));
  }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError("Must be logged in");
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Middleware to use when they be logged in as an admin user.
 *
 *  If not, raises Unauthorized.
 */

function ensureArtist(req, res, next) {
  try {
    if (!res.locals.user.artist)
      throw new UnauthorizedError("Must be an artist");
    return next();
  } catch (err) {
    return next(err);
  }
}

function ensureAdmin(req, res, next) {
  try {
    if (!res.locals.user || res.locals.user.role !== "ADMIN") {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureArtist,
};
