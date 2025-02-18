import { NextSetApi } from "../services/api";
import { useUser } from "../contexts/UserContext";
import { useModal } from "../contexts/ModalContext";
import { useMessage } from "../contexts/MessageContext";
import { useLoading } from "../contexts/LoadingContext";

const useHandleSubmitPitch = () => {
  const { currUser, setCurrUser } = useUser();
  const { closeModal } = useModal();
  const { showMessage } = useMessage();
  const { setIsLoading } = useLoading();

  const handleSubmitPitch = async (pitchData) => {
    try {
      setIsLoading(true);

      // Check if the artist already has a confirmed pitch on the same date
      if (
        currUser.artist.artist_pitches.some(
          (pitch) =>
            pitch.pitches.status === "confirmed" &&
            pitch.pitches.date === pitchData.date.toISOString()
        )
      ) {
        setIsLoading(false);
        closeModal();
        return showMessage(
          "You already have a show booked for this date",
          "error"
        );
      }

      // Send pitch request
      await NextSetApi.sendPitch({
        ...pitchData,
        date: new Date(pitchData.date).toISOString(),
      });

      // Fetch updated artist data
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
