"use strict";

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { authenticateJWT, ensureLoggedIn } = require("../middleware/auth");
const { pitchValidator } = require("../validators/pitchValidator");
const { validate } = require("../middleware/validate");
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

router.post(
  "/requirements",
  authenticateJWT,
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      const requiredDocs = await prisma.pitch_required_docs.create({
        data: req.body,
      });

      return res.status(201).json({ requiredDocs });
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
              pitch_required_docs: true,
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
      const { status, venue_id, date } = req.body;

      // Validate status
      if (!["accepted", "declined", "removed", "canceled"].includes(status)) {
        throw new BadRequestError("Invalid Status, Please Try Again.");
      }

      // Handle Declined, Removed, or Canceled Statuses
      const updatedPitch = await prisma.pitches.update({
        where: { id: pitch_id },
        data: { status },
      });

      // Remove the blocked date if canceled
      if (status === "canceled" && date) {
        await prisma.venue_blocked_dates.deleteMany({
          where: { venue_id, blocked_date: date },
        });
      }

      return res.status(200).json({ updatedPitch });
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
      const { venueId, date, status } = data;

      // Basic validation
      if (!venueId || !date || !status) {
        throw new BadRequestError("Venue ID, date, and status are required.");
      }

      // Check if the date is already blocked
      const blockedDate = await prisma.venue_blocked_dates.findFirst({
        where: { venue_id: venueId, blocked_date: date },
      });

      if (blockedDate) {
        throw new BadRequestError("Date already booked.");
      }

      // Update the pitch status
      const updatedPitch = await prisma.pitches.update({
        where: { id: pitch_id },
        data: { status },
      });

      // Block the date only if the status indicates confirmation
      if (status === "confirmed") {
        await prisma.venue_blocked_dates.create({
          data: { venue_id: venueId, blocked_date: date },
        });
      }

      return res.status(200).json(updatedPitch);
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
