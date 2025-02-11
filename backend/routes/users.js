"use strict";

const express = require("express");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const hashPassword = require("../middleware/hashPassword");
const { BadRequestError, UnauthorizedError } = require("../expressError");
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
          email: req.body.email,
        },
      });

      if (existingUser) {
        throw new BadRequestError("Email already in use");
      }

      // Create the user
      const user = await prisma.users.create({ data: req.body });
      delete user.password_hash;
      // Generate JWT for the newly created user
      const token = createToken(user);
      // Return the token, and let frontend handle the redirect using the user.id from the token
      return res.status(201).json({
        token,
        user,
      });
    } catch (e) {
      return next(e);
    }
  }
);

router.patch("/update", hashPassword, async function (req, res, next) {
  try {
    const { currUserEmail, data, password_hash } = req.body;

    const user = await prisma.users.findFirst({
      where: { email: currUserEmail },
    });

    if (!user) {
      return next(new UnauthorizedError("You are not authorized."));
    }

    if (data.currentPassword) {
      const validPassword = await bcrypt.compare(
        data.currentPassword,
        user.password_hash
      );
      if (!validPassword) {
        return next(new UnauthorizedError("Invalid Password Provided"));
      }
    }
    //update user
    const updatedUser = await prisma.users.update({
      where: { email: currUserEmail },
      data: {
        ...(data.email && { email: data.email }),
        ...(password_hash && { password_hash }),
      },
    });

    delete updatedUser.password_hash;
    // find connected artist details
    const newToken = createToken(updatedUser);

    return res.status(200).json({ updatedUser, token: newToken });
  } catch (e) {
    return next(e);
  }
});

router.delete("/delete/:id", async function (req, res, next) {
  try {
    const artists = await prisma.artists.deleteMany({
      where: { created_by: parseInt(req.params.id) },
    });
    const user = await prisma.users.delete({
      where: { id: parseInt(req.params.id) },
    });
    return res.status(200).json({ user, artists });
  } catch (e) {
    if (e.code === "P2025") {
      return res.status(404).json({ error: "User not found" });
    }
    return next(e);
  }
});

module.exports = router;
