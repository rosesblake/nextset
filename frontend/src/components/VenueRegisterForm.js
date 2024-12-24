import React from "react";
import { useForm } from "../hooks/useForm";
import { InputField } from "./InputField";

const VenueRegisterForm = () => {
  const INITIAL_STATE = {
    name: "",
    capacity: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    available_dates: "",
  };

  const { formData, handleChange, handleSubmit } = useForm(
    INITIAL_STATE,
    (data) => {
      console.log("Venue Details Submitted:", data);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1>Venue Details</h1>

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

      <InputField
        id="available_dates"
        name="available_dates"
        placeholder="Available Dates"
        value={formData.available_dates}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export { VenueRegisterForm };
