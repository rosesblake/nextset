import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./contexts/UserContext";
import { MessageProvider } from "./contexts/MessageContext";
import { ModalProvider } from "./contexts/ModalContext";
import { HashRouter } from "react-router-dom";
import { LoadingProvider } from "./contexts/LoadingContext";
import { LoadScript } from "@react-google-maps/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <LoadingProvider>
          <MessageProvider>
            <UserProvider>
              <ModalProvider>
                <App />
              </ModalProvider>
            </UserProvider>
          </MessageProvider>
        </LoadingProvider>
      </LoadScript>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
