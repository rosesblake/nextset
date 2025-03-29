import { render } from "@testing-library/react";
import { MainLanding } from "../pages/MainLanding";
import { MemoryRouter } from "react-router-dom";
import { LoadingProvider } from "../contexts/LoadingContext";

test("MainLanding renders without crashing", () => {
  render(
    <MemoryRouter>
      <LoadingProvider>
        <MainLanding />
      </LoadingProvider>
    </MemoryRouter>
  );
});
