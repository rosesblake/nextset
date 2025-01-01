const { body } = require("express-validator");

// Validator for artist creation
const artistValidator = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Artist name is required")
    .isLength({ max: 50 })
    .withMessage("Artist name cannot exceed 50 characters"),

  body("genre")
    .optional()
    .isString()
    .withMessage("Genre must be a string")
    .isLength({ max: 20 })
    .withMessage("Genre cannot exceed 20 characters"),

  body("instagram_handle")
    .optional()
    .isString()
    .withMessage("Instagram handle must be a string")
    .isLength({ max: 50 })
    .withMessage("Instagram handle cannot exceed 50 characters"),

  body("x_handle")
    .optional()
    .isString()
    .withMessage("X handle must be a string")
    .isLength({ max: 50 })
    .withMessage("X handle cannot exceed 50 characters"),

  body("facebook_url")
    .optional()
    .isURL()
    .withMessage("Facebook URL must be a valid URL")
    .isLength({ max: 255 })
    .withMessage("Facebook URL cannot exceed 255 characters"),

  body("spotify_url")
    .optional()
    .isURL()
    .withMessage("Spotify URL must be a valid URL")
    .isLength({ max: 255 })
    .withMessage("Spotify URL cannot exceed 255 characters"),

  body("spotify_monthly_listeners")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Spotify monthly listeners must be a valid number"),

  body("spotify_popular_cities")
    .optional()
    .isJSON()
    .withMessage("Spotify popular cities must be a valid JSON object"),

  body("spotify_most_plays")
    .optional()
    .isString()
    .withMessage("Spotify most plays must be a string")
    .isLength({ max: 50 })
    .withMessage("Spotify most plays cannot exceed 50 characters"),

  body("rating_streams")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Rating streams must be a valid number"),

  body("w9")
    .optional()
    .isString()
    .withMessage("W9 must be a string")
    .isLength({ max: 255 })
    .withMessage("W9 cannot exceed 255 characters"),

  body("rider")
    .optional()
    .isString()
    .withMessage("Rider must be a string")
    .isLength({ max: 255 })
    .withMessage("Rider cannot exceed 255 characters"),

  body("manager")
    .optional()
    .isString()
    .withMessage("Manager must be a string")
    .isLength({ max: 50 })
    .withMessage("Manager cannot exceed 50 characters"),

  body("record_label")
    .optional()
    .isString()
    .withMessage("Record label must be a string")
    .isLength({ max: 50 })
    .withMessage("Record label cannot exceed 50 characters"),

  body("tour_booking_agent")
    .optional()
    .isString()
    .withMessage("Tour booking agent must be a string")
    .isLength({ max: 50 })
    .withMessage("Tour booking agent cannot exceed 50 characters"),

  body("tour_manager")
    .optional()
    .isString()
    .withMessage("Tour manager must be a string")
    .isLength({ max: 50 })
    .withMessage("Tour manager cannot exceed 50 characters"),

  body("phone")
    .optional()
    .isString()
    .withMessage("Phone number must be a string")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number must be between 10 and 15 digits"),

  body("home_city")
    .optional()
    .isString()
    .withMessage("Home city must be a string")
    .isLength({ max: 50 })
    .withMessage("Home city cannot exceed 50 characters"),

  body("home_state")
    .optional()
    .isString()
    .withMessage("Home state must be a string")
    .isLength({ max: 2 })
    .withMessage("Home state cannot exceed 2 characters"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Email must be a valid email address"),

  body("created_by")
    .isInt({ min: 1 })
    .withMessage("Created by must be a valid user ID"),

  body("created_at")
    .optional()
    .isISO8601()
    .withMessage("Created at must be a valid ISO 8601 date"),

  body("event_artists")
    .optional()
    .isArray()
    .withMessage("Event artists must be an array"),

  body("members").optional().isArray().withMessage("Members must be an array"),

  body("pitch_artists")
    .optional()
    .isArray()
    .withMessage("Pitch artists must be an array"),

  body("tokens").optional().isArray().withMessage("Tokens must be an array"),

  body("creator")
    .optional()
    .isInt()
    .withMessage("Creator must be a valid user ID"),
];

module.exports = { artistValidator };
