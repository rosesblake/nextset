import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { VenueLeftSidebar } from "./components/VenueLeftSidebar";
import { VenueMobileNav } from "./components/VenueMobileNav";

// outside your component
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

function VenueLayout({ isCollapsed, toggleSidebars, isMobile, setIsMobile }) {
  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < 1000);
    }, 150);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);

  return (
    <div className="venue-layout">
      {isMobile ? (
        <VenueMobileNav>
          <Outlet />
        </VenueMobileNav>
      ) : (
        <>
          <VenueLeftSidebar
            isCollapsed={isCollapsed}
            toggleSidebars={toggleSidebars}
          />
          <main className="main-content">
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
}

export { VenueLayout };
