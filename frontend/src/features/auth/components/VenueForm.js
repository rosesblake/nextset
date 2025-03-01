import React, { useState } from "react";
import { SharedFields } from "../../../shared/forms/SharedFields";
import { FormWrapper } from "../../../shared/forms/FormWrapper";
import { InputField } from "../../../shared/forms/InputField";
import { useForm } from "../../../hooks/useForm";
import { LocationInput } from "../../../utils/LocationInput";

function VenueForm({ onSubmit }) {
  const [locationData, setLocationData] = useState({
    full_address: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    lat: "",
    lng: "",
  });

  const { formData, handleChange, handleSubmit } = useForm(
    {
      venue_name: "",
      full_name: "",
      email: "",
      capacity: "",
      full_address: "",
    },
    async (data) => {
      if (!locationData.lat || !locationData.lng || !locationData.street) {
        alert("Please select a valid address.");
        return;
      }

      await onSubmit({
        ...data,
        ...locationData,
      });
    }
  );

  return (
    <FormWrapper title="Register as Venue" handleSubmit={handleSubmit}>
      <InputField
        id="venue_name"
        name="venue_name"
        placeholder="Venue Name"
        value={formData.venue_name}
        onChange={handleChange}
      />
      <InputField
        id="capacity"
        name="capacity"
        placeholder="Capacity"
        value={formData.capacity}
        onChange={handleChange}
      />
      <div>
        <label
          htmlFor="hometown"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <LocationInput
          id="full_address"
          mode="venue"
          placeholder="Search for Venue Address"
          onChange={(location) => {
            if (!location) return;
            setLocationData(location);
            handleChange({
              target: {
                name: "full_address",
                value: location.full_address || "",
              },
            });
          }}
        />
      </div>

      <h1 className="text-2xl font-bold text-center text-gray-800 py-4">
        Create a User
      </h1>
      <SharedFields formData={formData} onChange={handleChange} />
      <button
        type="submit"
        className="w-full bg-nextsetPrimary text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-nextsetButton focus:outline-none focus:ring-2 focus:ring-nextsetButton focus:ring-offset-2"
      >
        Register
      </button>
    </FormWrapper>
  );
}

export { VenueForm };
