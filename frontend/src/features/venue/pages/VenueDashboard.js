import React, { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import { NextSetApi } from "../../../services/api";
import { ArtistPitchCard } from "../components/ArtistPitchCard";
import { useModal } from "../../../contexts/ModalContext";
import { RequiredDocs } from "../components/RequiredDocs";
import { useLoading } from "../../../contexts/LoadingContext";
import { Spinner } from "../../../shared/components/Spinner";
import { useMessage } from "../../../contexts/MessageContext";

function VenueDashboard() {
  const { currUser } = useUser();
  const [pitches, setPitches] = useState([]);
  const { openModal, closeModal } = useModal();
  const { isLoading, setIsLoading } = useLoading();
  const { showMessage } = useMessage();

  useEffect(() => {
    const fetchPitches = async () => {
      if (currUser?.venue?.id) {
        try {
          setIsLoading(true);
          const response = await NextSetApi.getVenuePitches(
            currUser.venue.id,
            currUser.account_type
          );
          //only pending and declined pitches
          setPitches(
            response.filter(
              (pitch) => !["confirmed", "canceled"].includes(pitch.status)
            )
          );
        } catch (e) {
          console.error("error fetching pitches", e);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPitches();
  }, [currUser, setIsLoading]);

  const handlePitchStatus = async (pitch_id, data) => {
    try {
      setIsLoading(true);
      await NextSetApi.updatePitchStatus(pitch_id, {
        status: data.status,
        venue_id: data.venue_id,
        date: data.date,
      });

      setPitches((prev) =>
        prev.map((pitch) =>
          pitch.id === pitch_id ? { ...pitch, status: data.status } : pitch
        )
      );
      if (data.status !== "declined") {
        await NextSetApi.updatePitchRequiredDocs({
          pitch_id: pitch_id,
          ...data.requirements,
        });
      }

      showMessage(`Successfully ${data.status} pitch`, "success");
      closeModal();
    } catch (e) {
      closeModal();
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const openDocsModal = (pitch, status) => {
    openModal(
      <RequiredDocs
        pitch={pitch}
        status={status}
        handlePitchStatus={handlePitchStatus}
      />
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-nextsetAccent mb-6 text-center">
          Pitches Received
        </h2>
        {pitches.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {pitches.map((pitch) => (
              <ArtistPitchCard
                key={pitch.id}
                pitch={pitch}
                openDocsModal={openDocsModal}
                handlePitchStatus={handlePitchStatus}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No pitches received yet.</p>
        )}
      </div>
    </div>
  );
}

export { VenueDashboard };
