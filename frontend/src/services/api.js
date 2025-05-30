import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "";

axios.defaults.withCredentials = true; // Set globally

class NextSetApi {
  // Create Axios instance with interceptors
  static axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, //send cookies
  });

  static initializeInterceptors(logout) {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Let backend handle token refreshing automatically
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          (error.response?.data?.error?.message === "Token has expired" ||
            error.response?.data?.error?.message === "Invalid or missing token")
        ) {
          originalRequest._retry = true;

          // Just retry the original request
          try {
            return this.axiosInstance(originalRequest);
          } catch (err) {
            logout?.();
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

  static async uploadArtistFile(artistId, fileType, formData) {
    try {
      const response = await this.axiosInstance.post(
        `/artists/${artistId}/upload/${fileType}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async deleteArtistFile(artistId, fileType) {
    return await this.request(
      `artists/files/${artistId}`,
      { fileType },
      "delete"
    );
  }

  static async registerUser(user) {
    let res = await this.request(`users/register`, user, "post");
    return res;
  }

  static async registerArtist(artist) {
    return await this.request(`artists/register`, artist, "post");
  }

  static async getArtist(artist_id) {
    return await this.request(`artists/${artist_id}`);
  }

  static async allArtists() {
    return await this.request(`artists`);
  }

  static async updateArtist(artist, data) {
    return await this.request(`artists/${artist.id}`, data, "patch");
  }

  static async registerVenue(venue) {
    return await this.request(`venues/register`, venue, "post");
  }

  static async updateVenue(venue, data) {
    return await this.request(`venues/${venue.id}`, data, "patch");
  }

  static async allVenues() {
    try {
      return await this.request(`venues`);
    } catch (e) {
      throw e;
    }
  }

  static async getVenue(venue_id) {
    return await this.request(`venues/${venue_id}`);
  }
  static async getVenueBookings(venue_id) {
    return await this.request(`venues/${venue_id}/bookings`);
  }

  static async addVenueAmenity(venue_id, data) {
    return await this.request(`venues/amenities`, { venue_id, data }, "post");
  }

  static async deleteVenueAmenity(venueId, amenityId) {
    const res = await this.request(
      `venues/amenities/${venueId}/${amenityId}/delete`,
      {},
      "delete"
    );
    return res.message;
  }

  static async sendPitch(data) {
    return await this.request(`pitches`, data, "post");
  }

  static async updatePitchRequiredDocs(data) {
    return await this.request(`pitches/requirements`, data, "post");
  }

  static async getVenuePitches(venue_id) {
    return await this.request(`venues/${venue_id}/pitches`);
  }

  static async getArtistPitches(artist_id) {
    return await this.request(`pitches/${artist_id}`);
  }

  static async updatePitchStatus(pitch_id, status) {
    return await this.request(`pitches/${pitch_id}/update`, status, "patch");
  }

  static async confirmPitch(pitch_id, data) {
    return await this.request(`pitches/${pitch_id}/confirm`, data, "patch");
  }

  // static async deleteVenueBooking(venueId, pitchDate) {
  //   return await this.request(
  //     `bookings/${venueId}/delete`,
  //     pitchDate,
  //     "delete"
  //   );
  // }

  static async loginUser(user) {
    let res = await this.request(`auth/login`, user, "post");
    return res;
  }

  static async updateUser(currUserEmail, data) {
    return await this.request(`users/update`, { currUserEmail, data }, "patch");
  }

  static async deleteUser(user_id) {
    return await this.request(`users/delete/${user_id}`, {}, "delete");
  }

  // Search for artist on Spotify
  static searchSpotifyArtist = async (query) => {
    return await this.request(`spotify/search?query=${query}`);
  };

  static async getLocationDetails(hometown) {
    const response = await this.request(
      `locations/details?hometown=${encodeURIComponent(hometown)}`
    );
    return response;
  }
}

NextSetApi.initializeInterceptors();

export { NextSetApi };
