import { render } from "@testing-library/react";
import { Login } from "../features/auth/pages/Login";
import React from "react";
import { MemoryRouter } from "react-router-dom";

jest.mock("axios", () => require("axios/dist/node/axios.cjs"));

// Mock hooks and context
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

jest.mock("../contexts/UserContext", () => ({
  useUser: () => ({ setCurrUser: jest.fn() }),
}));

jest.mock("../contexts/MessageContext", () => ({
  useMessage: () => ({ showMessage: jest.fn() }),
}));

jest.mock("../shared/forms/ErrorDisplay", () => ({
  ErrorDisplay: () => <div data-testid="mock-errors">Mock Errors</div>,
}));

test("Login renders without crashing", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
});
