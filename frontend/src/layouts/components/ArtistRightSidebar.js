import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";
import { PitchConfirmationModal } from "../../features/pitch/PitchConfirmationModal";
import { NextSetApi } from "../../services/api";
import { BellRing } from "lucide-react";

function ArtistRightSidebar({ isCollapsed, toggleSidebars }) {
  const [activeTab, setActiveTab] = useState("sent");
  const { currUser } = useUser();
  const { openModal, closeModal } = useModal();
  const [pitches, setPitches] = useState(
    currUser?.artist?.artist_pitches ?? []
  );
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  useEffect(() => {
    async function fetchPitches() {
      try {
        const artistPitches = await NextSetApi.getArtistPitches(
          currUser.artist.id
        );
        setPitches(artistPitches);

        const hasAcceptedPitches = artistPitches.some(
          (pitch) => pitch.pitches.status === "accepted"
        );

        setAwaitingConfirmation(hasAcceptedPitches);
      } catch (error) {
        console.error("Error fetching artist pitches:", error.message);
      }
    }

    fetchPitches();
  }, [currUser]);

  const handleOpenModal = (pitch) => {
    openModal(<PitchConfirmationModal pitch={pitch} closeModal={closeModal} />);
    setAwaitingConfirmation(false);
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const sentPitches = useMemo(
    () => pitches.filter((pitch) => pitch.pitches.status === "pending"),
    [pitches]
  );

  const resultPitches = useMemo(
    () =>
      pitches.filter(
        (pitch) =>
          pitch.pitches.status === "accepted" ||
          pitch.pitches.status === "declined"
      ),
    [pitches]
  );

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
              onClick={() => handleTabSwitch("sent")}
              className={`w-1/2 py-3 text-lg font-semibold transition-all ${
                activeTab === "sent"
                  ? "bg-nextsetAccent text-white rounded-t-lg shadow-md"
                  : "text-nextsetAccent hover:bg-gray-800 hover:text-white"
              }`}
            >
              Sent
            </button>

            <div className="relative w-1/2">
              <button
                onClick={() => handleTabSwitch("results")}
                className={`w-full py-3 text-lg font-semibold transition-all ${
                  activeTab === "results"
                    ? "bg-nextsetAccent text-white rounded-t-lg shadow-md"
                    : "text-nextsetAccent hover:bg-gray-800 hover:text-white"
                }`}
              >
                Results
              </button>

              {awaitingConfirmation && (
                <BellRing
                  size={20}
                  className="absolute top-1 right-1 text-red-500 animate-pulse fill-current"
                />
              )}
            </div>
          </div>
          {/* Content */}
          {activeTab === "sent" && (
            <div>
              <h3 className="text-xl font-bold text-nextsetAccent mb-4">
                Sent Pitches
              </h3>
              <div className="space-y-3">
                {sentPitches?.map((pitch) => (
                  <Link
                    key={pitch.pitch_id}
                    to={`/artist/venue/${pitch.pitches.venue_id}`}
                    className="block"
                  >
                    <div className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition duration-300">
                      <h4 className="text-lg text-nextsetAccent font-semibold">
                        {pitch.pitches.venues?.name || "Unknown Venue"}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {pitch.pitches.venues?.city || "Unknown City"},{" "}
                        {pitch.pitches.venues?.state || "Unknown State"}
                      </p>
                      <p className="text-xs text-gray-300">
                        {new Date(pitch.pitches.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-sm text-yellow-400">
                        Status: {pitch.pitches.status}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {activeTab === "results" && (
            <div>
              <h3 className="text-xl font-bold text-nextsetAccent mb-4">
                Accepted/Declined Pitches
              </h3>
              <div className="space-y-3">
                {resultPitches?.map((pitch) => (
                  <div
                    key={pitch.pitch_id}
                    className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
                  >
                    <h4 className="text-lg text-nextsetAccent font-semibold">
                      {pitch.pitches.venues?.name || "Unknown Venue"}
                    </h4>
                    <p className="text-sm text-gray-300">
                      {pitch.pitches.venues?.city || "Unknown City"},{" "}
                      {pitch.pitches.venues?.state || "Unknown State"}
                    </p>
                    <p
                      className={`text-sm ${
                        pitch.pitches.status === "accepted"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {pitch.pitches.status}
                    </p>
                    <button
                      onClick={() => handleOpenModal(pitch)}
                      className="px-4 py-2 mt-4 bg-nextsetButton hover:bg-nextsetAccent text-white rounded-md"
                    >
                      Finalize Booking
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { ArtistRightSidebar };
