const SpotifyWebApi = require("spotify-web-api-node");
const { BadRequestError } = require("../expressError");

// Configure Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Retrieve access token
async function getSpotifyToken() {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body["access_token"]);
    return data.body["access_token"];
  } catch (error) {
    console.error("Error retrieving Spotify access token:", error);
    throw new BadRequestError("Failed to authenticate Spotify API");
  }
}

module.exports = { spotifyApi, getSpotifyToken };
