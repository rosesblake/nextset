"use strict";

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { UnauthorizedError } = require("../expressError");
const { authenticateJWT, ensureLoggedIn } = require("../middleware/auth");
const { artistValidator } = require("../validators/artistValidator");
const { validate } = require("../middleware/validate");

router.post(
  "/register",
  artistValidator,
  validate,
  authenticateJWT, // Verifies JWT and populates res.locals.user
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      // Retrieve the user_id from the decoded JWT (already in res.locals.user)
      const user_id = res.locals.user.id;

      // Ensure the user_id is present and the request is valid
      if (!user_id) {
        return next(new UnauthorizedError("User is not authenticated"));
      }

      // Create the artist record in the database
      const artist = await prisma.artists.create({
        data: { ...req.body, created_by: user_id },
      });

      res.locals.user.artist = artist;

      // Update the user's artist_id to associate with the newly created artist
      await prisma.users.update({
        where: { id: user_id },
        data: { artist_id: artist.id },
      });

      // Add the user to the artist_users table to link the user and artist
      await prisma.artist_users.create({
        data: {
          user_id: user_id,
          artist_id: artist.id,
          role: "creator", // The user is the creator of this artist
        },
      });

      return res.status(201).json({ artist });
    } catch (e) {
      return next(e);
    }
  }
);

//retrieve artist
router.get(
  "/:id",
  authenticateJWT,
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      //fetch the artist and their pitches
      const artist = await prisma.artists.findUnique({
        where: {
          id: parseInt(req.params.id, 10),
        },
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
      });
      return res.json(artist);
    } catch (e) {
      return next(e);
    }
  }
);

// Update artist details
router.patch(
  "/:id",
  authenticateJWT,
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      const artistId = parseInt(req.params.id, 10);

      // Update the artist in the database with the provided fields
      const updatedArtist = await prisma.artists.update({
        where: { id: artistId },
        data: req.body,
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
      });

      return res.status(200).json(updatedArtist);
    } catch (e) {
      console.error("Error updating artist:", e.message);
      return next(e);
    }
  }
);

module.exports = router;
