import React from "react";
import { Outlet } from "react-router-dom";
import { ArtistLeftSidebar } from "./components/ArtistLeftSidebar";
import { ArtistRightSidebar } from "./components/ArtistRightSidebar";

function ArtistLayout({ isCollapsed, toggleSidebars }) {
  return (
    <div className="artist-layout">
      <ArtistLeftSidebar
        isCollapsed={isCollapsed}
        toggleSidebars={toggleSidebars}
      />
      <div className="main-content">
        <Outlet />
      </div>
      <ArtistRightSidebar
        isCollapsed={isCollapsed}
        toggleSidebars={toggleSidebars}
      />
    </div>
  );
}

export { ArtistLayout };
