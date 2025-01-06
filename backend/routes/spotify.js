const express = require("express");
const { spotifyApi, getSpotifyToken } = require("../helpers/spotify");
const { ensureLoggedIn } = require("../middleware/auth");
const router = express.Router();

// Search Spotify API for artists
router.get("/search", async (req, res) => {
  const { query } = req.query;
  if (!query)
    return res.status(400).json({ error: "Query parameter is required" });
  try {
    await getSpotifyToken(); // Ensure token is set
    const data = await spotifyApi.searchArtists(query);
    if (data.body.artists.items.length === 0) {
      return res.status(404).json({ error: "No artists found" });
    }
    const artists = data.body.artists.items.map((artist) => ({
      id: artist.id,
      name: artist.name,
      photo: artist.images.length > 0 ? artist.images[0].url : null,
      spotify_url: artist.external_urls.spotify || null,
      followers: artist.followers.total,
      popularity: artist.popularity,
    }));
    res.json({ artists });
  } catch (error) {
    console.error("Error searching Spotify API:", error);
    res.status(500).json({ error: "Failed to search Spotify API" });
  }
});

module.exports = router;
