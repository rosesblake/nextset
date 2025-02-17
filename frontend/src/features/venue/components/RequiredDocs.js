import React from "react";
import { useForm } from "../../../hooks/useForm";

const DOCUMENTS = [
  { key: "w9_required", label: "W9" },
  { key: "rider_required", label: "Rider" },
  { key: "epk_required", label: "EPK" },
  { key: "stage_plot_required", label: "Stage Plot" },
];

function RequiredDocs({ pitch, status, handlePitchStatus }) {
  const initialState = DOCUMENTS.reduce((acc, doc) => {
    acc[doc.key] = pitch?.[doc.key] || false;
    return acc;
  }, {});
  const { formData, handleChange, handleSubmit } = useForm(
    initialState,
    (data) =>
      handlePitchStatus(pitch.id, {
        status,
        requirements: { ...data },
        venue_id: pitch.venue_id,
        date: pitch.date,
      })
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-lg w-[500px] max-w-md"
    >
      <h2 className="text-xl font-bold text-nextsetAccent mb-4">
        Require Documents
      </h2>
      <ul className="space-y-2">
        {DOCUMENTS.map(({ key, label }) => (
          <li key={key} className="flex items-center space-x-3">
            <input
              type="checkbox"
              name={key}
              checked={formData[key]}
              onChange={handleChange}
              className="form-checkbox h-5 w-5 text-nextsetAccent"
            />
            <p className="text-nextsetButton font-medium underline">{label}</p>
          </li>
        ))}
      </ul>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-nextsetButton text-white font-semibold rounded-lg hover:bg-opacity-80 transition"
      >
        Confirm
      </button>
    </form>
  );
}

export { RequiredDocs };
