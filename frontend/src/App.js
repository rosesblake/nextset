import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Register } from "./features/auth/pages/Register";
import { useUser } from "./contexts/UserContext";
import { Navbar } from "./layouts/NavBar";
import { Login } from "./features/auth/pages/Login";
import { NotFound } from "./pages/NotFound";
import { useNavigate } from "react-router-dom";
import { MainLanding } from "./pages/MainLanding";
import { ArtistHome } from "./features/artist/pages/ArtistHome";
import { VenueHome } from "./features/venue/pages/VenueHome";
import { VenueList } from "./features/artist/pages/VenueList";
import { LeftSidebar } from "./layouts/LeftSideBar";
import { RightSidebar } from "./layouts/RightSideBar";
import { ArtistProfile } from "./features/artist/pages/ArtistProfile";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";
import { ArtistVenueView } from "./features/artist/pages/ArtistVenueView";
import { NextSetApi } from "./services/api";
import { ArtistMessage } from "./features/artist/pages/ArtistMessage";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currUser, logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    NextSetApi.initializeInterceptors(logout);
  }, [logout]);

  useEffect(() => {
    // Ensure the user completes their artist or venue registration
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
          path="/artist/messages"
          element={
            <ProtectedRoute>
              <ArtistMessage />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/venue/dashboard"
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
        <Route
          path="/venue/:id"
          element={
            <ProtectedRoute>
              <ArtistVenueView />
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
