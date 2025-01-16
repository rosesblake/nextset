import React from "react";
import { SharedFields } from "../../../shared/forms/SharedFields";
import { FormWrapper } from "../../../shared/forms/FormWrapper";
import { InputField } from "../../../shared/forms/InputField";
import { useForm } from "../../../hooks/useForm";

function VenueForm({ onSubmit }) {
  const { formData, handleChange, handleSubmit } = useForm(
    {
      venue_name: "",
      capacity: "",
      address: "",
      city: "",
      state: "",
      zip_code: "",
      full_name: "",
      email: "",
      password: "",
    },
    async (data) => {
      await onSubmit(data);
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
      <InputField
        id="address"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
      />
      <InputField
        id="city"
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
      />
      <InputField
        id="state"
        name="state"
        placeholder="State"
        value={formData.state}
        onChange={handleChange}
      />
      <InputField
        id="zip_code"
        name="zip_code"
        placeholder="Zip Code"
        value={formData.zip_code}
        onChange={handleChange}
      />
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
