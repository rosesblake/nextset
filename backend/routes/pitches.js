"use strict";

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { authenticateJWT, ensureLoggedIn } = require("../middleware/auth");
const { pitchValidator } = require("../validators/pitchValidator");
const {
  confirmPitchValidator,
} = require("../validators/confirmPitchValidator");
const { validate } = require("../middleware/validate");
const { validationResult } = require("express-validator");
const { BadRequestError } = require("../expressError");

router.post(
  "/",
  pitchValidator,
  validate,
  authenticateJWT,
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      // Ensure the date is available
      const venue = await prisma.venues.findUnique({
        where: { id: req.body.venue_id },
        select: { blocked_dates: true },
      });
      if (venue.blocked_dates?.includes(req.body.date)) {
        throw new BadRequestError("Date unavailable for this venue.");
      }

      // Duplicate check
      const duplicate = await prisma.pitches.findFirst({
        where: {
          venue_id: req.body.venue_id,
          date: req.body.date,
          artist_pitches: {
            some: {
              artist_id: req.body.artist_id,
            },
          },
        },
      });

      if (duplicate) {
        throw new BadRequestError(
          "Duplicate pitch: You have already pitched to this venue on this date."
        );
      }

      // Create the pitch
      const pitch = await prisma.pitches.create({
        data: {
          venue_id: req.body.venue_id,
          date: req.body.date,
          content: req.body.content,
          support_acts: req.body.support_acts, // Ensure this is valid JSON
          status: "pending",
          role: req.body.role,
        },
      });

      // Link artist and pitch
      await prisma.artist_pitches.create({
        data: {
          pitch_id: pitch.id,
          artist_id: req.body.artist_id,
        },
      });

      return res.status(201).json({ pitch });
    } catch (e) {
      return next(e);
    }
  }
);

router.get(
  "/:artist_id",
  authenticateJWT,
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      const artist_id = parseInt(req.params.artist_id);

      const artistPitches = await prisma.artist_pitches.findMany({
        where: { artist_id: artist_id },
        include: {
          pitches: {
            include: {
              venues: true,
            },
          },
        },
      });

      return res.status(200).json(artistPitches);
    } catch (e) {
      return next(e);
    }
  }
);

router.patch(
  "/:id/update",
  authenticateJWT,
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      const pitch_id = parseInt(req.params.id, 10);
      const { status } = req.body;

      if (!["accepted", "declined"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
      }

      const updatedPitch = await prisma.pitches.update({
        where: { id: pitch_id },
        data: { status },
      });

      return res.status(200).json(updatedPitch);
    } catch (e) {
      return next(e);
    }
  }
);

router.patch(
  "/:id/confirm",
  authenticateJWT,
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      const pitch_id = parseInt(req.params.id, 10);
      const { data } = req.body;

      if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError("Please submit all required documents");
      }

      const confirmedPitch = await prisma.pitches.update({
        where: { id: pitch_id },
        data,
      });

      return res.status(200).json(confirmedPitch);
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
