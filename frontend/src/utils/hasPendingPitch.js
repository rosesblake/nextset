const hasPendingPitch = (venueId, pitches) => {
  return pitches.some(
    (pitch) =>
      pitch.pitches.venue_id === venueId &&
      ["pending", "accepted"].includes(pitch.pitches?.status)
  );
};

export { hasPendingPitch };
