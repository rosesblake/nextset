"use strict";

const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/createTokens");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { UnauthorizedError } = require("../expressError");
const { loginValidator } = require("../validators/loginValidator");
const { validate } = require("../middleware/validate");

router.post(
  "/login",
  loginValidator,
  validate,
  async function (req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(UnauthorizedError("All fields must be filled out"));
      }

      // Fetch the user from DB
      const user = await prisma.users.findUnique({
        where: { email },
      });

      if (!user) {
        return next(new UnauthorizedError("Invalid username or password"));
      }

      // Compare the provided password with the hashed password in the DB
      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return next(new UnauthorizedError("Invalid username or password"));
      }

      // Generate JWT for the logged-in user
      const token = createToken(user);

      // Send token in response
      return res.json({ token, user });
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
