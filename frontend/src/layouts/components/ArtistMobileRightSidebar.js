import React, { useEffect, useState, useMemo } from "react";
import { BellRing, ListMusic, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";
import { PitchConfirmationModal } from "../../features/pitch/PitchConfirmationModal";
import { NextSetApi } from "../../services/api";

function ArtistMobileRightSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sent");
  const { currUser, setCurrUser } = useUser();
  const { openModal, closeModal } = useModal();
  const [pitches, setPitches] = useState(
    currUser?.artist?.artist_pitches ?? []
  );

  useEffect(() => {
    async function fetchPitches() {
      try {
        const artistPitches = await NextSetApi.getArtistPitches(
          currUser.artist.id
        );
        setPitches(artistPitches);
      } catch (error) {
        console.error("Error fetching artist pitches:", error.message);
      }
    }

    fetchPitches();
  }, [currUser]);

  const handleOpenModal = (pitch) => {
    openModal(<PitchConfirmationModal pitch={pitch} closeModal={closeModal} />);
  };

  const handleRemovePitch = async (pitch) => {
    try {
      await NextSetApi.updatePitchStatus(pitch.pitch_id, { status: "removed" });

      setCurrUser((prevUser) => ({
        ...prevUser,
        artist: {
          ...prevUser.artist,
          artist_pitches: prevUser.artist.artist_pitches?.map((p) =>
            p.pitch_id === pitch.pitch_id
              ? { ...p, pitches: { ...p.pitches, status: "removed" } }
              : p
          ),
        },
      }));
    } catch (e) {
      console.error(e.message);
    }
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

  const togglePanel = () => setIsOpen(!isOpen);
  const handleTabSwitch = (tab) => setActiveTab(tab);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        className="fixed top-4 right-4 z-30 text-nextsetAccent bg-nextsetPrimary p-2 rounded-md shadow-md"
      >
        {isOpen ? <X size={28} /> : <ListMusic size={28} />}
      </button>

      {/* Sliding Right Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-nextsetPrimary shadow-lg p-4 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="text-nextsetAccent text-2xl font-bold mb-4">
          Pitching Portal
        </div>

        {/* Tabs */}
        <div className="flex justify-between border-b border-gray-700 mb-4">
          <button
            onClick={() => handleTabSwitch("sent")}
            className={`w-1/2 py-2 text-sm font-semibold transition-all ${
              activeTab === "sent"
                ? "bg-nextsetAccent text-white rounded-t-md shadow"
                : "text-nextsetAccent hover:bg-gray-800 hover:text-white"
            }`}
          >
            Sent
          </button>
          <button
            onClick={() => handleTabSwitch("results")}
            className={`w-1/2 py-2 text-sm font-semibold transition-all relative ${
              activeTab === "results"
                ? "bg-nextsetAccent text-white rounded-t-md shadow"
                : "text-nextsetAccent hover:bg-gray-800 hover:text-white"
            }`}
          >
            Results
            {resultPitches?.length > 0 && (
              <BellRing
                size={16}
                className="absolute top-1 right-2 text-red-500 animate-pulse"
              />
            )}
          </button>
        </div>

        {/* Sent Pitches */}
        {activeTab === "sent" && (
          <div className="space-y-3">
            {sentPitches?.map((pitch) => (
              <Link
                key={pitch.pitch_id}
                to={`/artist/venue/${pitch.pitches.venue_id}`}
                className="block bg-gray-800 p-3 rounded-lg shadow hover:shadow-lg transition duration-300 text-center"
                onClick={togglePanel}
              >
                <h4 className="text-nextsetAccent font-semibold">
                  {pitch.pitches.venues?.name || "Unknown Venue"}
                </h4>
                <p className="text-sm text-gray-300">
                  {pitch.pitches.venues?.city || "Unknown City"},{" "}
                  {pitch.pitches.venues?.state || "Unknown State"}
                </p>
                <p className="text-xs text-gray-300">
                  {new Date(pitch.pitches.date).toLocaleDateString("en-US")}
                </p>
                <p className="text-sm text-yellow-400">
                  Status: {pitch.pitches.status}
                </p>
              </Link>
            ))}
          </div>
        )}

        {/* Results */}
        {activeTab === "results" && (
          <div className="space-y-3">
            {resultPitches?.map((pitch) => (
              <div
                key={pitch.pitch_id}
                className="bg-gray-800 p-3 rounded-lg shadow hover:shadow-lg transition duration-300 text-center"
              >
                <h4 className="text-nextsetAccent font-semibold">
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
                {pitch.pitches.status === "accepted" ? (
                  <button
                    onClick={() => handleOpenModal(pitch)}
                    className="w-full mt-2 bg-nextsetButton hover:bg-nextsetAccent text-white py-1 rounded-md"
                  >
                    Finalize Booking
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemovePitch(pitch)}
                    className="w-full mt-2 bg-nextsetButton hover:bg-nextsetAccent text-white py-1 rounded-md"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { ArtistMobileRightSidebar };
