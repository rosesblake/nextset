import axios from "axios";

const BASE_URL = "http://localhost:3001";

class NextSetApi {
  static token;

  // Create Axios instance with interceptors
  static axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Set up interceptors
  static initializeInterceptors(logout) {
    // Attach token to every request
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = NextSetApi.token || localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Handle token expiration
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const errorMessage = error.response?.data?.error?.message;
          if (
            errorMessage === "Token has expired" ||
            errorMessage === "Invalid or missing token"
          ) {
            console.warn("Token expired, logging out.");
            logout();
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Centralized request method
  static async request(endpoint, data = {}, method = "get") {
    try {
      const response = await this.axiosInstance({
        url: endpoint,
        method,
        ...(method === "get" ? { params: data } : { data }),
      });
      return response.data;
    } catch (error) {
      // Extract error message
      const errorMessage =
        error.response?.data?.error?.message || "Unknown error occurred.";
      const errors = error.response?.data?.error?.errors;

      // Create a new error instance
      const newError = new Error(errorMessage);
      // Attach additional data if desired
      newError.errors = errors;

      // Throw the actual error object
      throw newError;
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

  static async getArtist(artist_id) {
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
    try {
      let res = await this.request(`venues`);
      return res;
    } catch (e) {
      throw e;
    }
  }

  static async getVenue(venue_id) {
    let res = await this.request(`venues/${venue_id}`);
    return res;
  }

  static async sendPitch(data) {
    try {
      let res = await this.request(`pitches`, data, "post");
      return res;
    } catch (e) {
      throw e;
    }
  }

  static async getArtistPitches(artist_id) {
    let res = await this.request(`pitches/${artist_id}`);
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

NextSetApi.initializeInterceptors();

export { NextSetApi };
