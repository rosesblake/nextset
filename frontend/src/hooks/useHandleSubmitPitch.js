import { NextSetApi } from "../services/api";
import { useUser } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import { useMessage } from "../contexts/MessageContext";
import { useLoading } from "../contexts/LoadingContext";

// Helper to check if two date ranges overlap
const dateRangesOverlap = (start1, end1, start2, end2) => {
  return start1 <= end2 && end1 >= start2;
};

const useHandleSubmitPitch = () => {
  const { currUser, setCurrUser } = useUser();
  const { closeModal } = useModal();
  const { showMessage } = useMessage();
  const { setIsLoading } = useLoading();

  const handleSubmitPitch = async (pitchData) => {
    try {
      setIsLoading(true);

      const newStart = new Date(pitchData.start_date);
      const newEnd = new Date(pitchData.end_date);

      // Check for overlapping confirmed pitches
      const hasConflict = currUser.artist.artist_pitches.some(({ pitches }) => {
        if (pitches.status !== "confirmed") return false;

        const existingStart = new Date(pitches.start_date);
        const existingEnd = new Date(pitches.end_date);

        return dateRangesOverlap(existingStart, existingEnd, newStart, newEnd);
      });

      if (hasConflict) {
        setIsLoading(false);
        closeModal();
        return showMessage(
          "You already have a confirmed show during this date range",
          "error"
        );
      }

      // Send pitch request with range
      await NextSetApi.sendPitch({
        ...pitchData,
        start_date: newStart.toISOString(),
        end_date: newEnd.toISOString(),
      });

      // Refresh artist data
      const updatedArtist = await NextSetApi.getArtist(currUser.artist.id);
      setCurrUser({ ...currUser, artist: updatedArtist });

      showMessage("Submission successful!", "success");
    } catch (e) {
      console.error(e);
      showMessage(e.message || "An error occurred", "error");
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return handleSubmitPitch;
};

export { useHandleSubmitPitch };
