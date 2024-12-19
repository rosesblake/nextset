"use strict";

// const jsonschema = require("jsonschema");

const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");

router.post("/token", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
  } catch (e) {
    return next(e);
  }
});
