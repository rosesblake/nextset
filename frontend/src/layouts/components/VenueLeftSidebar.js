import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { ArrowLeft, ArrowRight, Settings } from "lucide-react";
import { NextSetApi } from "../../services/api";
import { useLoading } from "../../contexts/LoadingContext";

function VenueLeftSidebar({ isCollapsed, toggleSidebars }) {
  const { currUser, logout } = useUser();
  const { setIsLoading } = useLoading();
  const [pitches, setPitches] = useState();
  const [animation, setAnimation] = useState("animate-pulse");

  useEffect(() => {
    const fetchVenuePitches = async () => {
      try {
        setIsLoading(true);
        setAnimation("animate-pulse");
        const res = await NextSetApi.getVenuePitches(currUser?.venue?.id);
        setPitches(res);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVenuePitches();
  }, [currUser.venue.id, setIsLoading]);

  const pendingPitches = pitches?.filter(
    (pitch) =>
      !["confirmed", "removed", "canceled", "accepted"].includes(pitch.status)
  );

  const toggleAnimation = (a) => {
    if (animation === a) return;
    setAnimation(a);
    if (a === "animate-ping") {
      setTimeout(() => {
        setAnimation("hidden");
      }, 500);
    }
  };
  console.log("currUser in VenueLeftSidebar", currUser);

  return (
    <div
      className={`fixed left-0 top-0 h-full ${
        isCollapsed ? "w-16" : "w-80"
      } bg-nextsetPrimary shadow-md p-4 z-10 transition-width duration-300`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebars}
        className="absolute top-4 right-2 text-nextsetAccent z-20 text-2xl font-bold"
      >
        {isCollapsed ? <ArrowRight size={30} /> : <ArrowLeft size={30} />}
      </button>

      {/* Sidebar Content */}
      {!isCollapsed && (
        <div>
          {/* App Name */}
          <div className="text-nextsetAccent text-3xl font-extrabold tracking-wide mb-12">
            NextSet
          </div>

          {/* Venue Info with Settings Icon */}
          {currUser && currUser.venue && (
            <div className="block text-nextsetAccent mb-6 hover:bg-nextsetButton hover:text-white transition duration-200 rounded-lg">
              <div className="flex items-center justify-between p-3 hover:bg-nextsetButton hover:shadow-lg rounded-lg transition duration-300">
                <Link
                  to="/venue/profile"
                  onClick={() => toggleAnimation("animate-pulse")}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <span className="text-xl font-semibold">
                        {currUser.venue.name}
                      </span>
                      <span className="text-sm text-gray-300 hover:text-gray-100">
                        Manage Venue
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Settings Icon */}
                <Link
                  to="/venue/settings"
                  onClick={() => toggleAnimation("animate-pulse")}
                  className="hover:text-nextsetAccent transition"
                >
                  <Settings size={28} />
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <ul className="space-y-6">
            <li>
              <Link
                to="/venue/dashboard"
                onClick={() => toggleAnimation("animate-ping")}
                className="flex items-center justify-between text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200 relative"
              >
                <span>Dashboard</span>

                {/* Notification Badge */}
                {pendingPitches?.length > 0 && (
                  <span
                    className={`ml-2 bg-red-500 text-white text-xs font-bold h-7 min-w-7 flex items-center justify-center rounded-full ${animation} object-contain`}
                  >
                    {pendingPitches?.length}
                  </span>
                )}
              </Link>
            </li>

            <li>
              <Link
                to="/venue/bookings"
                onClick={() => toggleAnimation("animate-pulse")}
                className="flex items-center text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
              >
                <span>Bookings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/venue/calendar"
                onClick={() => toggleAnimation("animate-pulse")}
                className="flex items-center text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
              >
                <span>Calendar</span>
              </Link>
            </li>
            <li>
              <Link
                to="/venue/explore"
                onClick={() => toggleAnimation("animate-pulse")}
                className="flex items-center text-nextsetAccent text-lg font-semibold hover:text-white hover:bg-nextsetButton p-3 rounded-lg transition duration-200"
              >
                <span>Explore</span>
              </Link>
            </li>

            <li>
              <button
                onClick={logout}
                className="flex items-center justify-center text-nextsetPrimary text-lg font-semibold bg-nextsetAccent hover:bg-nextsetButton p-3 rounded-lg transition duration-200 w-full"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export { VenueLeftSidebar };
