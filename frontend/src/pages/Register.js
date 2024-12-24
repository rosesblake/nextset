import React, { useState } from "react";
import { RegisterForm } from "../components/RegisterForm";
import { NextSetApi } from "../api/api";
import { useNavigate } from "react-router-dom";
import { ArtistRegisterForm } from "../components/ArtistRegisterForm";
import { VenueRegisterForm } from "../components/VenueRegisterForm";

function Register() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  // Passing this function down to add a new user to db with the API
  const addUser = async (user) => {
    try {
      const newUser = await NextSetApi.registerUser(user);
      setUser(user);
      // Redirect based on account type
      navigate(`/register/${user.account_type}` || "/");
    } catch (e) {
      console.error("Error registering user:", e);
    }
  };

  const addArtist = async (artist) => {
    try {
      const newArtist = await NextSetApi.registerArtist(artist);
      navigate(`/register/${artist.account_type}` || "/");
    } catch (e) {
      console.error("Error registering artist:", e);
    }
  };

  const addVenue = async (venue) => {
    try {
      const newVenue = await NextSetApi.registerVenue(venue);
      navigate(`/register/${venue.account_type}` || "/");
    } catch (e) {
      console.error("Error registering venue:", e);
    }
  };

  return (
    <div className="register-user-form">
      <RegisterForm addUser={addUser} />

      {/* Conditionally render forms based on formData.account_type */}
      {user.account_type === "artist" && (
        <ArtistRegisterForm addArtist={addArtist} />
      )}
      {user.account_type === "venue" && (
        <VenueRegisterForm addVenue={addVenue} />
      )}
    </div>
  );
}

export { Register };
