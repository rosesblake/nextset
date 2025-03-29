import React from "react";
import { render } from "@testing-library/react";

jest.mock("lucide-react", () => ({
  Trash2: () => <div data-testid="trash-icon" />,
}));

import { PitchModal } from "../features/pitch/PitchModal";

// Axios mock to avoid ESM issues
jest.mock("axios", () => require("axios/dist/node/axios.cjs"));

// Mock required contexts and hooks
jest.mock("../contexts/UserContext", () => ({
  useUser: () => ({
    currUser: {
      artist: {
        id: 1,
        name: "Test Artist",
        bio: "bio",
        genre: "genre",
      },
    },
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

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock("../hooks/useForm", () => ({
  useForm: (initialState, callback) => ({
    formData: initialState,
    handleChange: jest.fn(),
    handleSubmit: jest.fn(),
  }),
}));

jest.mock("../hooks/useHandleSubmitPitch", () => ({
  useHandleSubmitPitch: () => jest.fn(),
}));

jest.mock("../features/auth/components/SpotifyDropdown", () => ({
  SpotifyDropdown: () => <div data-testid="dropdown">SpotifyDropdown</div>,
}));

test("PitchModal renders without crashing", () => {
  const dummyVenue = {
    id: 1,
    name: "Test Venue",
    city: "Austin",
    state: "TX",
    blocked_dates: [],
  };

  render(<PitchModal venue={dummyVenue} />);
});
