import React, { useState } from "react";

function RightSidebar({ isCollapsed, toggleSidebars }) {
  const [activeTab, setActiveTab] = useState("sent"); // Default tab is "sent"

  return (
    <div
      className={`fixed right-0 top-0 h-full ${
        isCollapsed ? "w-16" : "w-80"
      } bg-nextsetPrimary shadow-md p-4 z-10 transition-width duration-300 text-center`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebars}
        className="absolute top-4 left-2 text-nextsetAccent z-20 text-2xl font-bold"
      >
        {isCollapsed ? "←" : "→"}
      </button>

      {!isCollapsed && (
        <div>
          {/* Title */}
          <div className="text-nextsetAccent text-3xl font-extrabold tracking-wide mb-8">
            Pitching Portal
          </div>

          {/* Tabs */}
          <div className="flex justify-between border-b border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab("sent")}
              className={`w-1/2 py-3 text-lg font-semibold transition-all ${
                activeTab === "sent"
                  ? "bg-nextsetAccent text-white rounded-t-lg shadow-md"
                  : "text-nextsetAccent hover:bg-gray-800 hover:text-white"
              }`}
            >
              Sent
            </button>
            <button
              onClick={() => setActiveTab("approvedDenied")}
              className={`w-1/2 py-3 text-lg font-semibold transition-all ${
                activeTab === "approvedDenied"
                  ? "bg-nextsetAccent text-white rounded-t-lg shadow-md"
                  : "text-nextsetAccent hover:bg-gray-800 hover:text-white"
              }`}
            >
              Results
            </button>
          </div>

          {/* Content */}
          <div>
            {activeTab === "sent" && (
              <div>
                <h3 className="text-xl font-bold text-nextsetAccent mb-4">
                  Sent Pitches
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                    <h4 className="text-lg text-nextsetAccent font-semibold">
                      Venue Name
                    </h4>
                    <p className="text-sm text-gray-300">City, State</p>
                    <p className="text-sm text-yellow-400">
                      Status: Waiting for Review
                    </p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                    <h4 className="text-lg text-nextsetAccent font-semibold">
                      Venue Name
                    </h4>
                    <p className="text-sm text-gray-300">City, State</p>
                    <p className="text-sm text-yellow-400">
                      Status: Waiting for Review
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "approvedDenied" && (
              <div>
                <h3 className="text-xl font-bold text-nextsetAccent mb-4">
                  Approved/Denied Pitches
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                    <h4 className="text-lg text-nextsetAccent font-semibold">
                      Venue Name
                    </h4>
                    <p className="text-sm text-gray-300">City, State</p>
                    <p className="text-sm text-green-400">Approved</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                    <h4 className="text-lg text-nextsetAccent font-semibold">
                      Venue Name
                    </h4>
                    <p className="text-sm text-gray-300">City, State</p>
                    <p className="text-sm text-red-400">Denied</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { RightSidebar };
