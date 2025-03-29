import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Register } from "../features/auth/pages/Register";
import React from "react";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios", () => require("axios/dist/node/axios.cjs"));

const mockSetCurrUser = jest.fn();
const mockNavigate = jest.fn();
const mockShowMessage = jest.fn();
const mockRegisterUser = jest.fn();
const mockRegisterArtist = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ accountType: "artist" }),
  useNavigate: () => mockNavigate,
}));

jest.mock("../contexts/UserContext", () => ({
  useUser: () => ({ setCurrUser: mockSetCurrUser }),
}));

jest.mock("../contexts/MessageContext", () => ({
  useMessage: () => ({ showMessage: mockShowMessage }),
}));

jest.mock("../features/google/MapLoader", () => ({
  MapLoader: ({ children }) => <div data-testid="mock-map">{children}</div>,
}));

jest.mock("../shared/forms/ErrorDisplay", () => ({
  ErrorDisplay: () => <div data-testid="mock-errors">Mock Errors</div>,
}));

jest.mock("../features/auth/components/ArtistForm", () => ({
  ArtistForm: ({ onSubmit }) => {
    return (
      <button
        onClick={() =>
          onSubmit({
            full_name: "Artist Name",
            email: "artist@example.com",
            password: "password123",
            name: "My Band",
            spotify_id: "spotify123",
            spotify_photo: "photo.jpg",
            spotify_url: "https://spotify.com/band",
            spotify_popularity: 85,
            spotify_followers: 12345,
            pendingLocationData: {
              city: "LA",
              state: "CA",
              country: "USA",
              lat: 34.05,
              lng: -118.25,
            },
          })
        }
      >
        Submit Form
      </button>
    );
  },
}));

jest.mock("../services/api", () => ({
  NextSetApi: {
    registerUser: (...args) => mockRegisterUser(...args),
    registerArtist: (...args) => mockRegisterArtist(...args),
    deleteUser: jest.fn(),
  },
}));

test("submits artist registration and navigates on success", async () => {
  const fakeUser = { id: 1, full_name: "Artist Name" };
  const fakeArtist = { id: 999, name: "My Band" };

  mockRegisterUser.mockResolvedValue({ user: fakeUser });
  mockRegisterArtist.mockResolvedValue({ artist: fakeArtist });

  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const submitButton = screen.getByText("Submit Form");
  await userEvent.click(submitButton);

  await waitFor(() => {
    expect(mockRegisterUser).toHaveBeenCalledWith({
      full_name: "Artist Name",
      email: "artist@example.com",
      password: "password123",
      account_type: "artist",
    });

    expect(mockRegisterArtist).toHaveBeenCalledWith(
      {
        name: "My Band",
        hometown_city: "LA",
        hometown_state: "CA",
        hometown_country: "USA",
        hometown_lat: 34.05,
        hometown_lng: -118.25,
        spotify_id: "spotify123",
        spotify_photo: "photo.jpg",
        spotify_url: "https://spotify.com/band",
        spotify_popularity: 85,
        spotify_followers: 12345,
        created_by: 1,
      },
      fakeUser
    );

    expect(mockSetCurrUser).toHaveBeenCalledWith({
      ...fakeUser,
      artist_id: fakeArtist.id,
      artist: fakeArtist,
    });

    expect(mockNavigate).toHaveBeenCalledWith("/artist/dashboard");
    expect(mockShowMessage).toHaveBeenCalledWith(
      "Registration successful",
      "success"
    );
  });
});
