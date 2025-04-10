import React, { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { format, eachDayOfInterval } from "date-fns";

const DOCUMENTS = [
  { key: "w9_required", label: "W9" },
  { key: "rider_required", label: "Rider" },
  { key: "epk_required", label: "EPK" },
  { key: "stage_plot_required", label: "Stage Plot" },
];

function VenueDateSelector({ pitch, status, handlePitchStatus }) {
  const initialState = DOCUMENTS.reduce((acc, doc) => {
    acc[doc.key] = pitch?.[doc.key] || false;
    return acc;
  }, {});

  const { formData, handleChange, handleSubmit } = useForm(
    initialState,
    (data) => {
      handlePitchStatus(pitch.id, {
        status,
        requirements: { ...data },
        venue_id: pitch.venue_id,
        date: selectedDate,
      });
    }
  );

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(pitch.start_date), "yyyy-MM-dd")
  );

  const availableDates = eachDayOfInterval({
    start: new Date(pitch.start_date),
    end: new Date(pitch.end_date),
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-lg w-[500px] max-w-md"
    >
      <h2 className="text-xl font-bold text-nextsetAccent mb-4">
        Require Documents
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-nextsetPrimary mb-1">
          Select Show Date
        </label>
        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          {availableDates.map((d) => {
            const str = format(d, "yyyy-MM-dd");
            return (
              <option key={str} value={str}>
                {format(d, "MMMM d, yyyy")}
              </option>
            );
          })}
        </select>
      </div>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4">
        {DOCUMENTS.map(({ key, label }) => (
          <li
            key={key}
            className="flex items-center bg-gray-100 rounded-lg px-3 py-2 shadow-sm"
          >
            <input
              type="checkbox"
              name={key}
              checked={formData[key]}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-nextsetAccent mr-3"
            />
            <label htmlFor={key} className="text-nextsetPrimary font-medium">
              {label}
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center">
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export { VenueDateSelector };
