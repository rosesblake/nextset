const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : "Date Not Available";

export { formatDate };
