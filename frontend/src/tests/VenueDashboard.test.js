import { render } from "@testing-library/react";
import { VenueDashboard } from "../features/venue/pages/VenueDashboard";
import React from "react";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios", () => require("axios/dist/node/axios.cjs"));

jest.mock("../contexts/UserContext", () => ({
  useUser: () => ({
    currUser: {
      venue: { id: 1 },
      account_type: "venue",
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
    closeModal: jest.fn(),
  }),
}));

jest.mock("../contexts/MessageContext", () => ({
  useMessage: () => ({
    showMessage: jest.fn(),
  }),
}));

jest.mock("../shared/components/Spinner", () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

jest.mock("../features/venue/components/ArtistPitchCard", () => ({
  ArtistPitchCard: () => <li data-testid="mock-card">Mock Pitch Card</li>,
}));

jest.mock("../features/venue/components/RequiredDocs", () => ({
  RequiredDocs: () => <div data-testid="mock-docs">Mock Required Docs</div>,
}));

test("VenueDashboard renders without crashing", async () => {
  render(
    <MemoryRouter>
      <VenueDashboard />
    </MemoryRouter>
  );
});
