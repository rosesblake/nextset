import React, { useEffect, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { ArtistLeftSidebar } from "./components/ArtistLeftSidebar";
import { ArtistRightSidebar } from "./components/ArtistRightSidebar";
import { ArtistMobileRightSidebar } from "./components/ArtistMobileRightSidebar";
import { ArtistMobileNav } from "./components/ArtistMobileNav";

// Debounce function to optimize resize events
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

function ArtistLayout({ isCollapsed, toggleSidebars, setIsMobile, isMobile }) {
  const handleResize = useCallback(
    debounce(() => setIsMobile(window.innerWidth < 1000), 150),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <div className="artist-layout">
      {isMobile ? (
        <div className="">
          <ArtistMobileNav>
            <Outlet />
          </ArtistMobileNav>
          <ArtistMobileRightSidebar />
        </div>
      ) : (
        <div className="desktop-layout">
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
      )}
    </div>
  );
}

export { ArtistLayout };
