import { MyCalendar } from "./MyCalendar";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { NextSetApi } from "../../services/api";
import { useLoading } from "../../contexts/LoadingContext";
import { Spinner } from "./Spinner";

function CalendarView() {
  const { currUser } = useUser();
  const { isLoading, setIsLoading } = useLoading();
  const [pitches, setPitches] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        let pitches = [];
        if (currUser?.account_type === "venue") {
          pitches = await NextSetApi.getVenuePitches(
            currUser.venue_id || currUser.venue.id
          );
          setPitches(pitches);
        } else if (currUser.account_type === "artist") {
          pitches = await NextSetApi.getArtistPitches(
            currUser.artist_id || currUser.artist.id
          );
          setPitches(
            pitches?.map((pitch) => {
              return pitch.pitches || [];
            })
          );
        } else {
          setPitches([]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, [currUser, setIsLoading]);

  //show only confirmed shows
  const bookedEvents = pitches?.filter((pitch) => pitch.status === "confirmed");

  const calendarEvents = bookedEvents?.map((pitch) => {
    const titleName =
      currUser.account_type === "venue"
        ? pitch.artist_pitches?.[0]?.artists?.name?.toLowerCase() ||
          currUser?.artist?.name ||
          "Unknown Artist"
        : pitch.venues?.name;
    return {
      title: titleName,
      start: new Date(pitch.date).toISOString(),
      end: new Date(pitch.date).toISOString(),
      allDay: true,
      type: "blocked",
      supportActs: pitch.support_acts?.map((act) => act.name) || [],
    };
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <MyCalendar height="100dvh" myEventsList={calendarEvents} full={true} />
  );
}

export { CalendarView };
