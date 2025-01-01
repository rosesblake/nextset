import React from "react";
import { useForm } from "../hooks/useForm";
import { InputField } from "./InputField";
import { FormWrapper } from "../components/FormWrapper"; // Assuming FormWrapper has the correct styling

const ArtistRegisterForm = ({ addArtist }) => {
  const INITIAL_STATE = {
    name: "",
    instagram_handle: "",
    x_handle: "",
    facebook_url: "",
    home_city: "",
    home_state: "",
    genre: "",
  };

  const { formData, handleChange, handleSubmit } = useForm(
    INITIAL_STATE,
    (data) => {
      addArtist(data); // Trigger addArtist function passed as prop
    }
  );

  return (
    <FormWrapper title="Artist Details" handleSubmit={handleSubmit}>
      <InputField
        id="name"
        name="name"
        placeholder="Artist Name"
        value={formData.name}
        onChange={handleChange}
      />
      <InputField
        id="instagram_handle"
        name="instagram_handle"
        placeholder="Instagram Handle"
        value={formData.instagram_handle}
        onChange={handleChange}
      />
      <InputField
        id="x_handle"
        name="x_handle"
        placeholder="X Handle"
        value={formData.x_handle}
        onChange={handleChange}
      />
      <InputField
        id="facebook_url"
        name="facebook_url"
        placeholder="Facebook URL"
        value={formData.facebook_url}
        onChange={handleChange}
      />
      <InputField
        id="home_city"
        name="home_city"
        placeholder="Home City"
        value={formData.home_city}
        onChange={handleChange}
      />
      <InputField
        id="home_state"
        name="home_state"
        placeholder="Home State"
        value={formData.home_state}
        onChange={handleChange}
      />
      <InputField
        id="genre"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full bg-nextsetPrimary text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-nextsetButton focus:outline-none focus:ring-2 focus:ring-nextsetPrimary focus:ring-offset-2"
      >
        Submit
      </button>
    </FormWrapper>
  );
};

export { ArtistRegisterForm };
