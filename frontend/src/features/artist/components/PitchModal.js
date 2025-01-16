import React, { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import DatePicker from "react-date-picker";

function PitchModal({ venue, selectedDate, artist, onClose, onSubmit }) {
  const initialState = {
    content: "",
    avg_ticket_sales: "",
    support_acts: "",
  };

  const { formData, handleChange, handleSubmit } = useForm(
    initialState,
    (data) => {
      const pitchData = {
        venue_id: venue.id,
        date,
        artist_id: artist.id,
        ...data,
      };
      onSubmit(pitchData);
    }
  );

  const [date, setDate] = useState(selectedDate || null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setIsDatePickerOpen(false); // Close DatePicker after date selection
  };

  const handleDatePickerToggle = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-nextsetAccent">
            Pitch to Venue
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-3xl"
          >
            &times;
          </button>
        </div>
        <p className="text-gray-700 mb-4">{`${venue.name} - ${venue.city}, ${venue.state}`}</p>

        {/* Date Picker */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-nextsetPrimary mb-2">
            Select a Date
          </h3>
          <button
            onClick={handleDatePickerToggle}
            className="w-full border rounded-md p-2 text-left bg-gray-100"
          >
            {date ? new Date(date).toLocaleDateString() : "Select a date"}
          </button>
          {isDatePickerOpen && (
            <DatePicker
              value={date}
              onChange={handleDateChange}
              minDate={new Date()}
              tileDisabled={({ date }) =>
                venue.blocked_dates?.some(
                  (blockedDate) =>
                    new Date(blockedDate).toDateString() === date.toDateString()
                )
              }
              className="mt-2 w-full border rounded-md"
            />
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-nextsetPrimary mb-2">
              Event Details
            </h3>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Describe your event..."
              className="w-full border rounded-md p-2"
            ></textarea>

            <input
              type="number"
              name="avg_ticket_sales"
              value={formData.avg_ticket_sales}
              onChange={handleChange}
              placeholder="Expected Ticket Sales"
              className="w-full border rounded-md p-2 mt-3"
            />

            <textarea
              name="support_acts"
              value={formData.support_acts}
              onChange={handleChange}
              placeholder="Support Acts (could use spotify api here if we want and send venue spotify links)"
              className="w-full border rounded-md p-2 mt-3"
            ></textarea>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-nextsetAccent text-white rounded hover:bg-nextsetButton"
            >
              Submit Pitch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { PitchModal };
