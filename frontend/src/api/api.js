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
}

export { NextSetApi };
