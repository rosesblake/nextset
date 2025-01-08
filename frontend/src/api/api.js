import axios from "axios";

const BASE_URL = "http://localhost:3001";

class NextSetApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const token = NextSetApi.token || localStorage.getItem("token");

    const config = {
      url,
      method,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      ...(method === "get" ? { params: data } : { data }),
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (e) {
      console.error("API Error:", e.response?.data || e.message);
      const errorMessages = e.response?.data?.error?.errors || [e.message];
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

  static async findArtist(artist_id) {
    let res = await this.request(`artists/${artist_id}`);
    return res;
  }

  static async updateArtist(artist, data) {
    let res = await this.request(`artists/${artist.id}`, data, "patch");
    return res;
  }

  static async registerVenue(venue, currUser) {
    const newVenue = { ...venue, created_by: currUser.id };
    let res = await this.request(`venues/register`, newVenue, "post");
    return res;
  }

  static async allVenues() {
    let res = await this.request(`venues`);
    return res;
  }

  static async getVenue(venue_id) {
    let res = await this.request(`venues/${venue_id}`);
    return res;
  }

  static async sendPitch(data) {
    let res = await this.request(`pitches`, data, "post");
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
    return res;
  };
}

export { NextSetApi };
