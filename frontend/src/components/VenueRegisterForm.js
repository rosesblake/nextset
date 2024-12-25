import React from "react";
import { useForm } from "../hooks/useForm";
import { InputField } from "./InputField";
import { FormWrapper } from "../components/FormWrapper"; // Assuming FormWrapper has the correct styling

const VenueRegisterForm = ({ addVenue }) => {
  const INITIAL_STATE = {
    name: "",
    capacity: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
  };

  const { formData, handleChange, handleSubmit } = useForm(
    INITIAL_STATE,
    (data) => {
      console.log("Venue Details Submitted:", data);
      addVenue(data);
    }
  );

  return (
    <FormWrapper title="Venue Details" handleSubmit={handleSubmit}>
      <InputField
        id="name"
        name="name"
        placeholder="Venue Name"
        value={formData.name}
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

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </FormWrapper>
  );
};

export { VenueRegisterForm };
