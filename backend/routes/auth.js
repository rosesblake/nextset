"use strict";

const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/createTokens");
const { createRefreshToken } = require("../helpers/createRefreshToken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { UnauthorizedError } = require("../expressError");
const { loginValidator } = require("../validators/loginValidator");
const { validate } = require("../middleware/validate");
const jwt = require("jsonwebtoken");
const { ensureLoggedIn, authenticateJWT } = require("../middleware/auth");

router.post(
  "/login",
  loginValidator,
  validate,
  async function (req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new UnauthorizedError("All fields must be filled out"));
      }

      // Fetch user along with related artist or venue information
      const user = await prisma.users.findUnique({
        where: { email: email.toLowerCase() },
        include: {
          artist_users: {
            include: {
              artist: {
                include: {
                  artist_pitches: {
                    include: {
                      pitches: {
                        include: {
                          venues: {
                            select: {
                              name: true,
                              city: true,
                              state: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          venue_users: {
            include: {
              venue: {
                include: {
                  venue_amenities: {
                    include: { amenities: true },
                  },
                },
              },
            },
          },
        },
      });

      if (!user) {
        return next(new UnauthorizedError("Invalid username or password"));
      }

      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return next(new UnauthorizedError("Invalid username or password"));
      }

      const artist = user.artist_users[0]?.artist || null;
      const venue = user.venue_users[0]?.venue || null;

      delete user.password_hash;
      delete user.artist_users;
      delete user.venue_users;

      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        artist, // Add artist info to the token
        venue,
      };

      // Generate token
      const token = createToken(tokenPayload);
      const refreshToken = createRefreshToken(tokenPayload);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      console.log("Set cookies:", req.cookies); // Logs cookies from request

      return res.status(200).json({
        user: {
          ...user,
          artist,
          venue,
        },
      });
    } catch (err) {
      return next(err);
    }
  }
);

//added logout route to clear cookies
router.post("/logout", function (req, res) {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  return res.status(200).json({ message: "Logged out" });
});

router.get("/me", authenticateJWT, ensureLoggedIn, async (req, res, next) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: res.locals.user.id },
      include: {
        artist_users: {
          include: {
            artist: {
              include: {
                artist_pitches: {
                  include: {
                    pitches: {
                      include: {
                        venues: {
                          select: {
                            name: true,
                            city: true,
                            state: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        venue_users: {
          include: {
            venue: {
              include: {
                venue_amenities: {
                  include: { amenities: true },
                },
              },
            },
          },
        },
      },
    });

    if (!user) {
      res.clearCookie("token");
      res.clearCookie("refreshToken");
      return res.status(404).json({ error: "User not found" });
    }

    const artist = user.artist_users[0]?.artist || null;
    const venue = user.venue_users[0]?.venue || null;

    delete user.password_hash;
    delete user.artist_users;
    delete user.venue_users;

    return res.json({ user: { ...user, artist, venue } });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
