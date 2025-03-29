import { render } from "@testing-library/react";
import { ArtistDashboard } from "../features/artist/pages/ArtistDashboard";
import React from "react";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios", () => require("axios/dist/node/axios.cjs"));

jest.mock("../contexts/UserContext", () => ({
  useUser: () => ({
    currUser: {
      artist: { id: 1, hometown_city: "Austin" },
    },
  }),
}));

jest.mock("../contexts/LoadingContext", () => ({
  useLoading: () => ({
    isLoading: false,
    setIsLoading: jest.fn(),
  }),
}));

jest.mock("../contexts/ModalContext", () => ({
  useModal: () => ({
    openModal: jest.fn(),
  }),
}));

jest.mock("../shared/components/Spinner", () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

jest.mock("../features/artist/components/VenueReccomendModal", () => ({
  VenueReccomendModal: () => (
    <div data-testid="mock-modal">VenueReccomendModal</div>
  ),
}));

jest.mock("../features/google/components/VenueMap", () => ({
  VenueMap: ({ venues }) => (
    <div data-testid="mock-map">VenueMap with {venues?.length} venues</div>
  ),
}));

test("ArtistDashboard renders without crashing", async () => {
  render(
    <MemoryRouter>
      <ArtistDashboard />
    </MemoryRouter>
  );
});
