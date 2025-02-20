import React from "react";
import { MapPin, Users, Mic, Music, FileText } from "lucide-react";
import { useModal } from "../../../contexts/ModalContext";
import { EditPitchModal } from "../../pitch/EditPitchModal";
import { formatDate } from "../../../utils/formatDate";

function GigCard({ gigs }) {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = (gig) => {
    openModal(<EditPitchModal gig={gig} closeModal={closeModal} />);
  };

  return (
    <div className="w-full flex justify-center">
      {gigs.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming gigs.</p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-6 w-full max-w-xl">
          {gigs.map((gig) => (
            <li
              key={gig.pitch_id}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition flex flex-col justify-between text-center w-full"
            >
              {/* Venue & Date */}
              <div className="border-b pb-4 mb-4">
                <h3 className="text-2xl font-bold text-nextsetAccent">
                  {gig.pitches.venues?.name || "Unknown Venue"}
                </h3>
                <div className="flex items-center justify-center text-gray-600 text-sm space-x-2 mt-1">
                  <MapPin size={18} className="text-nextsetPrimary" />
                  <span>
                    {gig.pitches.venues?.street}, {gig.pitches.venues?.city},{" "}
                    {gig.pitches.venues?.state}
                  </span>
                </div>
                <p className="text-gray-500 font-semibold text-sm mt-2">
                  {formatDate(gig.pitches.date)}
                </p>
              </div>

              {/* Role & Capacity */}
              <div className="flex justify-center items-center text-gray-700 text-sm">
                <div className="flex items-center space-x-2 mr-2">
                  <Mic size={18} className="text-nextsetAccent" />
                  <span className="font-medium">{gig.pitches.role}</span>
                </div>
                <div className="flex items-center space-x-2 ml-2">
                  <Users size={18} className="text-nextsetButton" />
                  <span>Capacity: {gig.pitches.venues.capacity || "N/A"}</span>
                </div>
              </div>

              {/* Gig Description */}
              {gig.pitches.content && (
                <p className="text-gray-600 text-sm italic mt-3 text-center">
                  "{gig.pitches.content}"
                </p>
              )}

              {/* Support Acts */}
              {gig.pitches.support_acts.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-nextsetPrimary font-semibold text-sm mb-1 flex items-center justify-center">
                    <Music size={16} className="mr-1 text-nextsetAccent" />
                    Support Acts
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2">
                    {gig.pitches.support_acts.map((act) => (
                      <a
                        key={act.spotify_id}
                        href={act.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-nextsetAccent text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-nextsetButton transition"
                      >
                        {act.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleOpenModal(gig)}
                className="mt-6 flex items-center justify-center px-6 py-2 bg-nextsetButton text-white rounded-lg hover:bg-nextsetAccent transition w-fit mx-auto"
              >
                <FileText size={18} className="mr-2" />
                View Documents
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export { GigCard };
