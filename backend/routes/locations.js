const express = require("express");
const router = express.Router();
const { getLocationFromGoogleAPI } = require("../helpers/locationService");

router.get("/details", async (req, res) => {
  const { hometown } = req.query;

  if (!hometown) {
    return res.status(400).json({ error: "Hometown is required" });
  }

  try {
    const locationDetails = await getLocationFromGoogleAPI(hometown);
    res.json(locationDetails);
  } catch (error) {
    console.error("Failed to fetch location details:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch location details" });
  }
});

module.exports = router;
