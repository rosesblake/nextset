import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "../pages/Register";
import { UserProvider } from "./UserContext"; // Import UserProvider
import { ArtistHome } from "../pages/ArtistHome";
import { Navbar } from "./NavBar";
import { Login } from "../pages/Login";
import { NotFound } from "./NotFound";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="mt-[64px]">
            <Routes>
              <Route path="/" element={<ArtistHome />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register/:accountType" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
