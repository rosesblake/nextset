import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

axios.defaults.withCredentials = true;

type HTTPMethod = "get" | "post" | "patch" | "delete";

type GenericObject = Record<string, any>;

interface ApiError extends Error {
  errors?: any;
}

class NextSetApi {
  private static axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  static initializeInterceptors(logout?: () => void) {
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: any) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          (error.response?.data?.error?.message === "Token has expired" ||
            error.response?.data?.error?.message === "Invalid or missing token")
        ) {
          originalRequest._retry = true;
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

  private static async request(
    endpoint: string,
    data: GenericObject = {},
    method: HTTPMethod = "get"
  ): Promise<any> {
    try {
      const config: AxiosRequestConfig = {
        url: endpoint,
        method,
        ...(method === "get" ? { params: data } : { data }),
      };

      const response = await this.axiosInstance(config);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message || "Unknown error occurred.";
      const errors = error.response?.data?.error?.errors;

      const newError: ApiError = new Error(errorMessage);
      newError.errors = errors;

      throw newError;
    }
  }

  static async uploadArtistFile(
    artistId: string | number,
    fileType: string,
    formData: FormData
  ): Promise<any> {
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
  }

  static async deleteArtistFile(
    artistId: string | number,
    fileType: string
  ): Promise<any> {
    return this.request(`artists/files/${artistId}`, { fileType }, "delete");
  }

  static async registerUser(user: GenericObject) {
    return this.request(`users/register`, user, "post");
  }

  static async loginUser(user: GenericObject) {
    return this.request(`auth/login`, user, "post");
  }

  static async logoutUser() {
    return this.request(`auth/logout`, {}, "post");
  }

  static async updateUser(currUserEmail: string, data: GenericObject) {
    return this.request(`users/update`, { currUserEmail, data }, "patch");
  }

  static async deleteUser(user_id: string | number) {
    return this.request(`users/delete/${user_id}`, {}, "delete");
  }

  static async getCurrentUser() {
    return this.request("auth/me");
  }

  static async registerArtist(artist: GenericObject) {
    return this.request(`artists/register`, artist, "post");
  }

  static async updateArtist(
    artist: { id: string | number },
    data: GenericObject
  ) {
    return this.request(`artists/${artist.id}`, data, "patch");
  }

  static async getArtist(artist_id: string | number) {
    return this.request(`artists/${artist_id}`);
  }

  static async allArtists() {
    return this.request(`artists`);
  }

  static async registerVenue(venue: GenericObject) {
    return this.request(`venues/register`, venue, "post");
  }

  static async updateVenue(
    venue: { id: string | number },
    data: GenericObject
  ) {
    return this.request(`venues/${venue.id}`, data, "patch");
  }

  static async allVenues() {
    return this.request(`venues`);
  }

  static async getVenue(venue_id: string | number) {
    return this.request(`venues/${venue_id}`);
  }

  static async getVenueBookings(venue_id: string | number) {
    return this.request(`venues/${venue_id}/bookings`);
  }

  static async addVenueAmenity(venue_id: string | number, data: GenericObject) {
    return this.request(`venues/amenities`, { venue_id, data }, "post");
  }

  static async deleteVenueAmenity(
    venueId: string | number,
    amenityId: string | number
  ) {
    const res = await this.request(
      `venues/amenities/${venueId}/${amenityId}/delete`,
      {},
      "delete"
    );
    return res.message;
  }

  static async sendPitch(data: GenericObject) {
    return this.request(`pitches`, data, "post");
  }

  static async updatePitchRequiredDocs(data: GenericObject) {
    return this.request(`pitches/requirements`, data, "post");
  }

  static async getVenuePitches(venue_id: string | number) {
    return this.request(`venues/${venue_id}/pitches`);
  }

  static async getArtistPitches(artist_id: string | number) {
    return this.request(`pitches/${artist_id}`);
  }

  static async updatePitchStatus(
    pitch_id: string | number,
    status: GenericObject
  ) {
    return this.request(`pitches/${pitch_id}/update`, status, "patch");
  }

  static async confirmPitch(pitch_id: string | number, data: GenericObject) {
    return this.request(`pitches/${pitch_id}/confirm`, data, "patch");
  }

  static async searchSpotifyArtist(query: string) {
    return this.request(`spotify/search?query=${query}`);
  }

  static async getLocationDetails(hometown: string) {
    return this.request(
      `locations/details?hometown=${encodeURIComponent(hometown)}`
    );
  }
}

NextSetApi.initializeInterceptors();

export { NextSetApi };
