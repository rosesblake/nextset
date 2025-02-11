import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import { Navbar } from "./layouts/NavBar";
import { PublicRoute } from "./routes/PublicRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { MainLanding } from "./pages/MainLanding";
import { Register } from "./features/auth/pages/Register";
import { Login } from "./features/auth/pages/Login";
import { NotFound } from "./pages/NotFound";
import { NextSetApi } from "./services/api";
import { ArtistLayout } from "./layouts/ArtistLayout";
import { VenueLayout } from "./layouts/VenueLayout";
import { ArtistDashboard } from "./features/artist/pages/ArtistDashboard";
import { VenueDashboard } from "./features/venue/pages/VenueDashboard";
import { ArtistProfile } from "./features/artist/pages/ArtistProfile";
import { GigDetails } from "./features/artist/pages/GigDetails";
import { VenueList } from "./features/artist/pages/VenueList";
import { ArtistVenueView } from "./features/artist/pages/ArtistVenueView";
import { VenueProfile } from "./features/venue/pages/VenueProfile";
import { ArtistList } from "./features/venue/pages/ArtistList";
import { VenueBookings } from "./features/venue/pages/VenueBookings";
import { CalendarView } from "./shared/components/CalendarView";
import { SettingsPage } from "./shared/components/SettingsPage";

function App() {
  const { currUser, logout } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const toggleSidebars = () => setIsCollapsed((prev) => !prev);

  useEffect(() => {
    NextSetApi.initializeInterceptors(logout);
  }, [logout]);

  const getSidebarClasses = () => {
    if (!currUser) return "";

    if (currUser.account_type === "artist" && !isMobile) {
      return isCollapsed ? "ml-16 mr-16" : "ml-80 mr-80";
    } else if (currUser.account_type === "venue" && !isMobile) {
      return isCollapsed ? "ml-16" : "ml-80";
    }

    return "";
  };

  return (
    <div className={`App ${getSidebarClasses()}`}>
      {!currUser && <Navbar />}
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

        {/* Artist Routes */}
        <Route
          path="/artist"
          element={
            <ProtectedRoute accountType="artist">
              <ArtistLayout
                isCollapsed={isCollapsed}
                toggleSidebars={toggleSidebars}
                setIsMobile={setIsMobile}
                isMobile={isMobile}
              />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ArtistDashboard />} />
          <Route path="profile" element={<ArtistProfile />} />
          <Route path="bookings" element={<GigDetails />} />
          <Route path="venue/list" element={<VenueList />} />
          <Route path="venue/:id" element={<ArtistVenueView />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Venue Routes */}
        <Route
          path="/venue"
          element={
            <ProtectedRoute accountType="venue">
              <VenueLayout
                isCollapsed={isCollapsed}
                toggleSidebars={toggleSidebars}
              />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<VenueDashboard />} />
          <Route path="profile" element={<VenueProfile />} />
          <Route path="bookings" element={<VenueBookings />} />
          <Route path="explore" element={<ArtistList />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
