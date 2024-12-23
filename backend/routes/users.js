"use strict";

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const hashPassword = require("../middleware/hashPassword");
const { BadRequestError } = require("../expressError");
const { userValidator } = require("../validators/userValidator");
const { validate } = require("../middleware/validate");
const { createToken } = require("../helpers/createTokens");
const router = express.Router();

//basic user registration
router.post(
  "/register",
  userValidator, // Validation checks for each field
  validate, // Validation error handling middleware
  hashPassword, // Hash the password
  async function (req, res, next) {
    try {
      // Check for existing username/email
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [{ username: req.body.username }, { email: req.body.email }],
        },
      });

      if (existingUser) {
        throw new BadRequestError("Username or email already in use");
      }

      // Create the user
      const user = await prisma.users.create({ data: req.body });

      // Generate JWT for the newly created user
      const token = createToken(user);

      // Return the token, and let frontend handle the redirect using the user.id from the token
      return res.status(201).json({
        token,
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
