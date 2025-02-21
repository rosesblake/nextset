const formatDate = (date, digits) => {
  return date
    ? new Date(date).toLocaleDateString(
        "en-US",
        digits
          ? {
              month: "2-digit",
              day: "2-digit",
              year: "2-digit",
              timeZone: "UTC",
            }
          : {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            }
      )
    : "Date Not Available";
};

export { formatDate };
