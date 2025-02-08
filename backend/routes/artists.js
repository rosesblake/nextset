"use strict";

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { UnauthorizedError, BadRequestError } = require("../expressError");
const { authenticateJWT, ensureLoggedIn } = require("../middleware/auth");
const { artistValidator } = require("../validators/artistValidator");
const { uploadValidator } = require("../validators/uploadValidator");
const { validate } = require("../middleware/validate");
const { upload } = require("../middleware/upload");
const fs = require("fs");
const path = require("path");

router.post(
  "/register",
  artistValidator,
  validate,
  authenticateJWT,
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      // Retrieve the user_id from the decoded JWT (already in res.locals.user)
      const user_id = res.locals.user.id;
      // Ensure the user_id is present and the request is valid
      if (!user_id) {
        return next(new UnauthorizedError("User is not authenticated"));
      }

      //check for duplicate artists
      const duplicate_check = await prisma.artists.findFirst({
        where: { spotify_id: req.body.spotify_id },
      });

      if (duplicate_check) {
        return next(new BadRequestError("Artist already exists"));
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

router.post(
  "/:id/upload/:fileType",
  uploadValidator,
  validate,
  authenticateJWT,
  ensureLoggedIn,
  upload.single("file"),
  async function (req, res, next) {
    try {
      const { id, fileType } = req.params;

      // Fetch the artist from the database
      const artist = await prisma.artists.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }

      // Check and delete the old file asynchronously
      const oldFileUrl = artist[fileType];
      if (oldFileUrl) {
        const oldFilePath = path.join(
          __dirname,
          "../uploads/artists",
          path.basename(oldFileUrl)
        );

        // Use fs.promises for asynchronous deletion
        fs.promises.unlink(oldFilePath).catch((err) => {
          console.error(`Error deleting old file: ${err.message}`);
        });
      }

      // Generate the new file URL
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/artists/${
        req.file.filename
      }`;

      // Update the artist record with the new file URL
      const updatedArtist = await prisma.artists.update({
        where: { id: parseInt(id, 10) },
        data: {
          [fileType]: fileUrl, // Dynamically update the correct field (e.g., epk, w9, etc.)
        },
      });

      return res.status(200).json({
        message: `${fileType} uploaded successfully.`,
        url: fileUrl,
        artist: updatedArtist,
      });
    } catch (e) {
      console.error("Error uploading file:", e);
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

//get all artists for list
router.get(
  "/",
  authenticateJWT,
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      const artistList = await prisma.artists.findMany();
      return res.status(200).json(artistList);
    } catch (e) {
      next(e);
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

router.delete(
  "/files/:artistId",
  authenticateJWT,
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      const artistId = parseInt(req.params.artistId, 10);
      const { fileType } = req.body;

      await prisma.artists.update({
        where: { id: artistId },
        data: {
          [fileType]: null,
        },
      });

      return res.status(200).json({
        message: `${fileType.toUpperCase()} file deleted successfully.`,
      });
    } catch (e) {
      console.error("Error:", e);
      return next(e);
    }
  }
);

module.exports = router;
