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
      let message = e.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
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
}

export { NextSetApi };
