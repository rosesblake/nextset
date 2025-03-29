import { render } from "@testing-library/react";
import { ArtistProfile } from "../features/artist/pages/ArtistProfile";
import React from "react";
import { MemoryRouter } from "react-router-dom";

// Mock dependencies
jest.mock("axios", () => require("axios/dist/node/axios.cjs"));

jest.mock("../contexts/UserContext", () => ({
  useUser: () => ({
    currUser: {
      email: "artist@example.com",
      artist: {
        id: 1,
        name: "Test Artist",
        hometown_city: "Austin",
        hometown_state: "TX",
        genre: "Rock",
        bio: "Test bio",
        manager: "Test Manager",
        record_label: "Test Label",
        tour_booking_agent: "Test Agent",
        phone: "123-456-7890",
        email: "artist@example.com",
        website: "https://example.com",
        instagram_handle: "artist_insta",
        tiktok: "artist_tiktok",
        x_handle: "artist_x",
        facebook_url: "https://facebook.com/artist",
        spotify_url: "https://spotify.com/artist",
        apple_music_url: "https://apple.com/artist",
        live_show_url: "https://youtube.com/artist",
        soundcloud: "https://soundcloud.com/artist",
        spotify_photo: "https://example.com/photo.jpg",
      },
    },
    setCurrUser: jest.fn(),
  }),
}));

jest.mock("../contexts/LoadingContext", () => ({
  useLoading: () => ({
    isLoading: false,
    setIsLoading: jest.fn(),
  }),
}));

jest.mock("../contexts/MessageContext", () => ({
  useMessage: () => ({
    showMessage: jest.fn(),
  }),
}));

jest.mock("../shared/components/EditableField", () => ({
  EditableField: ({ label, value }) => (
    <div data-testid={`field-${label}`}>
      {label}: {value}
    </div>
  ),
}));

jest.mock("../shared/components/FileUploadField", () => ({
  FileUploadField: ({ label }) => (
    <div data-testid={`upload-${label}`}>{label} Upload</div>
  ),
}));

jest.mock("../shared/components/Spinner", () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

test("ArtistProfile renders without crashing", async () => {
  render(
    <MemoryRouter>
      <ArtistProfile />
    </MemoryRouter>
  );
});
