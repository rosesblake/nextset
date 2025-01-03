import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/Register";
import { useUser } from "./UserContext";
import { Navbar } from "./NavBar";
import { Login } from "../pages/Login";
import { NotFound } from "./NotFound";
import { useNavigate } from "react-router-dom";
import { MainLanding } from "../pages/MainLanding";

function App() {
  const { currUser } = useUser();
  const navigate = useNavigate();

  //make sure that the user has finished setting up their artist or venue registration
  useEffect(() => {
    if (currUser && !currUser.artist_id && !currUser.venue_id) {
      navigate(`/register/${currUser.account_type}`);
    }
  }, [currUser, navigate]);

  return (
    <div className="App">
      <Navbar />
      <div className="mt-[64px]">
        <Routes>
          <Route path="/" element={<MainLanding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/:accountType" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
