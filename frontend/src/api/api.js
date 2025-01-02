import axios from "axios";

const BASE_URL = "http://localhost:3001";

class NextSetApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${NextSetApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (e) {
      console.error("API Error:", e.message);
      // If the error is from the response, extract the message(s)
      let errorMessages = e.response?.data?.error?.errors || [e.message];

      // If errorMessages is an array, throw it, else wrap in an array
      throw Array.isArray(errorMessages) ? errorMessages : [errorMessages];
    }
  }

  static async registerUser(user) {
    let res = await this.request(`users/register`, user, "post");
    NextSetApi.token = res.token;
    return res;
  }

  static async registerArtist(artist, currUser) {
    const newArtist = { ...artist, created_by: currUser.id };
    let res = await this.request(`artists/register`, newArtist, "post");
    return res;
  }

  static async findArtist(artist) {
    // Check if token is available in static property or localStorage
    const token = NextSetApi.token || localStorage.getItem("token");

    // Log the token to see if it's correctly retrieved
    console.log("Current token:", token);

    if (!token) {
      throw new Error("Missing token. Please log in.");
    }

    // Proceed with the API request
    let res = await this.request(`artists/${artist.name}`, "get");
    return res;
  }

  static async registerVenue(venue, currUser) {
    const newVenue = { ...venue, created_by: currUser.id };
    let res = await this.request(`venues/register`, newVenue, "post");
    return res;
  }

  static async loginUser(user) {
    let res = await this.request(`auth/login`, user, "post");
    NextSetApi.token = res.token;
    return res;
  }

  // Search for artist on Spotify
  static searchSpotifyArtist = async (query) => {
    let res = await this.request(`spotify/search?query=${query}`);
    console.log(res);
    return res;
  };
}

export { NextSetApi };
