import React from "react";
import { useForm } from "../hooks/useForm";
import { InputField } from "./InputField";

const ArtistRegisterForm = () => {
  const INITIAL_STATE = {
    name: "",
    instagram_handle: "",
    x_handle: "",
    facebook_url: "",
    rating_social_media: "",
    spotify_monthly_listeners: "",
    spotify_popular_cities: "",
    spotify_most_plays: "",
    rating_streams: "",
    w9: "",
    rider: "",
    manager: "",
    record_label: "",
    tour_booking_agent: "",
    tour_manager: "",
    phone: "",
    home_city: "",
    home_state: "",
    email: "",
  };

  const { formData, handleChange, handleSubmit } = useForm(
    INITIAL_STATE,
    (data) => {
      console.log("Artist Details Submitted:", data);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1>Artist Details</h1>

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
        id="rating_social_media"
        name="rating_social_media"
        placeholder="Social Media Rating"
        value={formData.rating_social_media}
        onChange={handleChange}
      />

      <InputField
        id="spotify_monthly_listeners"
        name="spotify_monthly_listeners"
        placeholder="Spotify Monthly Listeners"
        value={formData.spotify_monthly_listeners}
        onChange={handleChange}
      />

      <InputField
        id="spotify_popular_cities"
        name="spotify_popular_cities"
        placeholder="Spotify Popular Cities"
        value={formData.spotify_popular_cities}
        onChange={handleChange}
      />

      <InputField
        id="spotify_most_plays"
        name="spotify_most_plays"
        placeholder="Spotify Most Played Track"
        value={formData.spotify_most_plays}
        onChange={handleChange}
      />

      <InputField
        id="rating_streams"
        name="rating_streams"
        placeholder="Streams Rating"
        value={formData.rating_streams}
        onChange={handleChange}
      />

      <InputField
        id="w9"
        name="w9"
        placeholder="W9 Info"
        value={formData.w9}
        onChange={handleChange}
      />

      <InputField
        id="rider"
        name="rider"
        placeholder="Rider"
        value={formData.rider}
        onChange={handleChange}
      />

      <InputField
        id="manager"
        name="manager"
        placeholder="Manager"
        value={formData.manager}
        onChange={handleChange}
      />

      <InputField
        id="record_label"
        name="record_label"
        placeholder="Record Label"
        value={formData.record_label}
        onChange={handleChange}
      />

      <InputField
        id="tour_booking_agent"
        name="tour_booking_agent"
        placeholder="Tour Booking Agent"
        value={formData.tour_booking_agent}
        onChange={handleChange}
      />

      <InputField
        id="tour_manager"
        name="tour_manager"
        placeholder="Tour Manager"
        value={formData.tour_manager}
        onChange={handleChange}
      />

      <InputField
        id="phone"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
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
        id="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export { ArtistRegisterForm };
