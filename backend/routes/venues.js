"use strict";

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { UnauthorizedError } = require("../expressError");
const { authenticateJWT, ensureLoggedIn } = require("../middleware/auth");
const { venueValidator } = require("../validators/venueValidator");
const { validate } = require("../middleware/validate");

//register a new venue
router.post(
  "/register",
  venueValidator,
  validate,
  authenticateJWT,
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      // Retrieve the user_id from JWT
      const user_id = res.locals.user.id;

      if (!user_id) {
        return next(new UnauthorizedError("User is not authenticated"));
      }

      // Add venue to DB and associate it with the user_id
      const venue = await prisma.venues.create({
        data: {
          ...req.body, // venue data (name, location, etc.)
          created_by: user_id, // Associate venue with the user (creator)
        },
      });

      res.locals.user.venue = venue;

      // Update user's venue_id
      await prisma.users.update({
        where: { id: user_id },
        data: { venue_id: venue.id },
      });

      // Add entry to venue_users to associate the user with the venue
      await prisma.venue_users.create({
        data: {
          user_id: user_id,
          venue_id: venue.id,
          role: "creator",
        },
      });

      // Return the venue as a JSON response
      return res.status(201).json({ venue });
    } catch (e) {
      return next(e);
    }
  }
);

router.get("/", authenticateJWT, ensureLoggedIn, async (req, res, next) => {
  try {
    const venues = await prisma.venues.findMany();
    return res.status(200).json({ venues });
  } catch (e) {
    return next(e);
  }
});

router.get("/:id", authenticateJWT, ensureLoggedIn, async (req, res, next) => {
  try {
    const venue_id = parseInt(req.params.id);
    const venue = await prisma.venues.findFirst({
      where: { id: venue_id },
    });
    //add on blocked dates call to venue
    const blockedDates = await prisma.venue_blocked_dates.findMany({
      where: { venue_id: venue_id },
      select: { blocked_date: true },
    });

    const updatedVenue = {
      ...venue,
      blocked_dates: blockedDates.map((date) => date.blocked_date),
    };

    return res.json(updatedVenue);
  } catch (e) {
    return next(e);
  }
});

router.get(
  "/:id/bookings",
  authenticateJWT,
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      const venueId = parseInt(req.params.id, 10);

      const bookings = await prisma.events.findMany({
        where: { venue_id: venueId },
        include: {
          event_artists: {
            include: {
              artists: true,
            },
          },
        },
      });

      res.status(200).json(bookings);
    } catch (err) {
      return next(err);
    }
  }
);

router.patch(
  "/:id",
  authenticateJWT,
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      const venueId = parseInt(req.params.id, 10);

      if (isNaN(venueId)) {
        throw new BadRequestError("Invalid venue ID");
      }

      // Validate that req.body is not empty
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new BadRequestError("No data provided for update");
      }

      // Perform the update
      const updatedVenue = await prisma.venues.update({
        where: { id: venueId },
        data: req.body,
      });

      res.status(200).json(updatedVenue);
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
