const hasPendingPitch = (venueId, pitches) => {
  const res = pitches.some(
    (pitch) =>
      pitch.pitches.venue_id === venueId &&
      ["pending", "accepted"].includes(pitch.pitches?.status)
  );
  return res;
};

export { hasPendingPitch };
