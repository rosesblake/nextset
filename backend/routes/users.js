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
const { ensureLoggedIn } = require("../middleware/auth");
const { createRefreshToken } = require("../helpers/createRefreshToken");

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
      const refreshToken = createRefreshToken(user);

      // tokens as cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 15 * 60 * 1000,
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        user,
      });
    } catch (e) {
      return next(e);
    }
  }
);

router.patch("/update", hashPassword, async function (req, res, next) {
  try {
    const { currUserEmail, data } = req.body;

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

    //pull password_hash from body after hashpassword runs
    const password_hash = req.body.password_hash;

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
    const refreshToken = createRefreshToken(updatedUser);

    //new cookie use replacement
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ updatedUser });
  } catch (e) {
    return next(e);
  }
});

//updated delete with more validation.
router.delete("/delete/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const userId = parseInt(req.params.id);

    // Validate ID
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Ensure the logged-in user matches the user being deleted
    if (res.locals.user.id !== userId && !res.locals.user.admin) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this user" });
    }

    // Delete related artists first
    const artists = await prisma.artists.deleteMany({
      where: { created_by: userId },
    });

    // Delete the user
    const user = await prisma.users.delete({
      where: { id: userId },
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
