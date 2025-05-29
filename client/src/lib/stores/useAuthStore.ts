import { create } from "zustand";
import { NextSetApi } from "@/lib/api";

type User = {
  id: string;
  full_name: string;
  email: string;
  account_type: "artist" | "venue";
  artist?: any;
  venue?: any;
  [key: string]: any;
};

type AuthStore = {
  currUser: User | null;
  artistData: any | null;
  venueData: any | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  currUser: null,
  artistData: null,
  venueData: null,
  isLoading: true,

  setUser: (user) => {
    set({
      currUser: user,
      artistData: user.account_type === "artist" ? user.artist ?? null : null,
      venueData: user.account_type === "venue" ? user.venue ?? null : null,
    });
  },

  logout: async () => {
    try {
      await NextSetApi.logoutUser();
    } catch (err: any) {
      console.warn("Logout failed", err.message);
    }

    set({
      currUser: null,
      artistData: null,
      venueData: null,
    });
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "/login";
  },

  loadUser: async () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      set({ isLoading: false });
      return;
    }

    try {
      const res = await NextSetApi.getCurrentUser();
      const user = res.user;

      set({
        currUser: user,
        artistData: user.account_type === "artist" ? user.artist ?? null : null,
        venueData: user.account_type === "venue" ? user.venue ?? null : null,
      });
    } catch (err: any) {
      console.warn("Failed to load user from cookies", err.message);
      set({
        currUser: null,
        artistData: null,
        venueData: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
