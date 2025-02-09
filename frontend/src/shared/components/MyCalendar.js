import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const localizer = momentLocalizer(moment);

const CustomEvent = ({ event, full }) => (
  <div className="p-1">
    <div className="font-bold capitalize">{event.title}</div>
    {full && event.supportActs?.length > 0 && (
      <div className="text-xs text-white">
        Support: {event.supportActs.join(", ")}
      </div>
    )}
  </div>
);

const MyCalendar = ({ myEventsList, height = "450px", full }) => {
  const { currUser } = useUser();
  const navigate = useNavigate();

  // Handle Date Click for full calendars
  const handleDateClick = (slotInfo) => {
    if (full) {
      navigate(`/${currUser.account_type}/bookings`, {
        state: { date: slotInfo.start },
      });
    }
  };

  return (
    <div className={`rounded-xl shadow-md text-xs text-nextsetPrimary`}>
      <Calendar
        style={{ height, overflow: "hidden", padding: "15px" }}
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week"]}
        selectable
        onSelectSlot={handleDateClick}
        onSelectEvent={handleDateClick}
        components={{
          event: (props) => <CustomEvent {...props} full={full} />,
        }}
        dayPropGetter={(date) => {
          const isBlocked = myEventsList?.some(
            (event) =>
              event.type === "blocked" &&
              new Date(event.start).toDateString() === date.toDateString()
          );

          return {
            className: isBlocked ? "bg-nextsetAccent" : "",
          };
        }}
        eventPropGetter={(event) => {
          if (event.type === "blocked") {
            return {
              style: {
                color: "white",
                backgroundColor: "#1A1A2E",
                padding: "2px 1px",
                textAlign: "center",
              },
            };
          }
        }}
      />
    </div>
  );
};

export { MyCalendar };
