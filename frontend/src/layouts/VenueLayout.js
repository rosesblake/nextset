import React from "react";
import { Outlet } from "react-router-dom";
import { VenueLeftSidebar } from "./components/VenueLeftSidebar";

function VenueLayout({ isCollapsed, toggleSidebars }) {
  return (
    <div className="venue-layout">
      <VenueLeftSidebar
        isCollapsed={isCollapsed}
        toggleSidebars={toggleSidebars}
      />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export { VenueLayout };
