"use strict";

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { authenticateJWT, ensureLoggedIn } = require("../middleware/auth");
const { venueValidator } = require("../validators/venueValidator");
const { validate } = require("../middleware/validate");

router.post(
  "/",
  validate,
  authenticateJWT,
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      //Create the pitch
      const pitch = await prisma.pitches.create({
        data: {
          venue_id: req.body.venue_id,
          date: req.body.date,
          content: req.body.content,
          avg_ticket_sales: parseInt(req.body.avg_ticket_sales),
          support_acts: req.body.support_acts,
          status: "PENDING",
        },
      });
      //link artist and pitch
      const artistId = req.body.artist_id;
      await prisma.artist_pitches.create({
        data: {
          pitch_id: pitch.id,
          artist_id: artistId,
        },
      });

      return res.json({ pitch });
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
