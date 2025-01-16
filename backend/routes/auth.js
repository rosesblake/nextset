"use strict";

const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/createTokens");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { UnauthorizedError } = require("../expressError");
const { loginValidator } = require("../validators/loginValidator");
const { validate } = require("../middleware/validate");

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

      // Fetch user along with related artist information
      const user = await prisma.users.findUnique({
        where: { email },
        include: {
          artist_users: {
            include: {
              artist: {
                include: {
                  // Include pitches if you want all pitch details here
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
        },
      });

      if (!user) {
        return next(new UnauthorizedError("Invalid username or password"));
      }

      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return next(new UnauthorizedError("Invalid username or password"));
      }

      const artist = user.artist_users[0]?.artist;

      delete user.password_hash;
      delete user.artist_users;

      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        artist, // Add artist info to the token
      };

      // Generate token
      const token = createToken(tokenPayload);
      return res.json({
        token,
        user: {
          ...user,
          artist,
        },
      });
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
