//not in use

const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { authenticateJWT, ensureLoggedIn } = require("../middleware/auth");

router.delete(
  "/:venueId/delete",
  authenticateJWT,
  ensureLoggedIn,
  async function (req, res, next) {
    try {
      const { pitch } = req.body;
      const venueId = parseInt(req.params.venueId, 10);
    } catch (e) {
      return next(e);
    }
  }
);

module.exports = router;
