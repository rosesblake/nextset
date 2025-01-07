import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "./Register/Register";
import { useUser } from "./UserContext";
import { Navbar } from "./NavBar";
import { Login } from "../pages/Login";
import { NotFound } from "./NotFound";
import { useNavigate } from "react-router-dom";
import { MainLanding } from "../pages/MainLanding";
import { ArtistHome } from "../pages/ArtistHome";
import { VenueHome } from "../pages/VenueHome";
import { VenueList } from "../pages/VenueList";
import { LeftSidebar } from "./LeftSideBar";
import { RightSidebar } from "./RightSideBar";
import { ArtistProfile } from "../pages/ArtistProfile";
import { ProtectedRoute } from "../Routes/ProtectedRoute";
import { PublicRoute } from "../Routes/PublicRoute";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currUser } = useUser();
  const navigate = useNavigate();

  //make sure that the user has finished setting up their artist or venue registration
  useEffect(() => {
    if (currUser && !currUser.artist_id && !currUser.venue_id) {
      navigate(`/register/${currUser.account_type}`);
    }
  }, [currUser, navigate]);

  const toggleSidebars = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="App">
      {!currUser ? (
        <Navbar />
      ) : (
        <>
          <LeftSidebar
            isCollapsed={isCollapsed}
            toggleSidebars={toggleSidebars}
          />
          <RightSidebar
            isCollapsed={isCollapsed}
            toggleSidebars={toggleSidebars}
          />
        </>
      )}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <MainLanding />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/register/:accountType"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/artist/dashboard"
          element={
            <ProtectedRoute>
              <ArtistHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artist/profile"
          element={
            <ProtectedRoute>
              <ArtistProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/venue/home"
          element={
            <ProtectedRoute>
              <VenueHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/venue/list"
          element={
            <ProtectedRoute>
              <VenueList />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
