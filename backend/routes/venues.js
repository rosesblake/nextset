"use strict";

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { UnauthorizedError, BadRequestError } = require("../expressError");
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

router.post(
  "/amenities",
  authenticateJWT,
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      const { venue_id, data } = req.body;

      if (!venue_id) {
        throw next(new BadRequestError("Invalid venue identification."));
      }

      // Check if the amenity already exists globally
      const duplicateAmenity = await prisma.amenities.findFirst({
        where: { name: data.amenity },
      });

      let newAmenity;
      if (!duplicateAmenity) {
        newAmenity = await prisma.amenities.create({
          data: { name: data.amenity },
        });
      }

      const amenityId = duplicateAmenity ? duplicateAmenity.id : newAmenity.id;

      // Check if the amenity is already linked to the venue
      const existingVenueAmenity = await prisma.venue_amenities.findUnique({
        where: {
          venue_id_amenity_id: {
            venue_id,
            amenity_id: amenityId,
          },
        },
      });

      if (existingVenueAmenity) {
        return res.status(200).json(existingVenueAmenity);
      }

      // Create new venue-amenity link if it doesn't exist
      const amenity = await prisma.venue_amenities.create({
        data: {
          amenity_id: amenityId,
          venue_id,
        },
        include: {
          amenities: true,
        },
      });

      return res.status(200).json(amenity);
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
      include: {
        venue_amenities: {
          include: { amenities: true },
        },
      },
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

    return res.status(200).json(updatedVenue);
  } catch (e) {
    return next(e);
  }
});
router.get(
  "/:id/pitches",
  authenticateJWT,
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      const venue_id = parseInt(req.params.id);

      const pitches = await prisma.pitches.findMany({
        where: { venue_id: venue_id },
        include: {
          artist_pitches: {
            include: {
              artists: {
                select: {
                  name: true,
                  bio: true,
                  website: true,
                  genre: true,
                  instagram_handle: true,
                  x_handle: true,
                  facebook_url: true,
                  spotify_url: true,
                  apple_music_url: true,
                  soundcloud: true,
                  tiktok: true,
                  spotify_photo: true,
                  live_show_url: true,
                  hometown_city: true,
                  hometown_state: true,
                },
              },
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      });

      return res.status(200).json(pitches);
    } catch (e) {}
  }
);

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

router.delete(
  "/amenities/:venueId/:amenityId/delete",
  authenticateJWT,
  ensureLoggedIn,
  async (req, res, next) => {
    try {
      const venueId = parseInt(req.params.venueId, 10);
      const amenityId = parseInt(req.params.amenityId, 10);

      if (isNaN(venueId) || isNaN(amenityId)) {
        throw new BadRequestError("Invalid venue or amenity ID.");
      }

      // Delete the association in the venue_amenities table
      const deletedAssociation = await prisma.venue_amenities.deleteMany({
        where: {
          venue_id: venueId,
          amenity_id: amenityId,
        },
      });

      if (deletedAssociation.count === 0) {
        return res
          .status(404)
          .json({ message: "Amenity association not found for this venue." });
      }

      return res
        .status(200)
        .json({ message: "Amenity association deleted successfully." });
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
