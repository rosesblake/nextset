import React, { useState } from "react";
import { RegisterForm } from "../components/RegisterForm";
import { NextSetApi } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { ArtistRegisterForm } from "../components/ArtistRegisterForm";
import { VenueRegisterForm } from "../components/VenueRegisterForm";
import { useUser } from "../components/UserContext"; // Import useUser hook

function Register() {
  const { accountType } = useParams();
  const navigate = useNavigate();
  const { currUser, setCurrUser } = useUser(); // Get currUser and setCurrUser from context
  const [errorMessage, setErrorMessage] = useState([]);

  const addUser = async (user) => {
    try {
      const res = await NextSetApi.registerUser(user);
      const { token, user: registeredUser } = res;

      localStorage.setItem("token", token);
      setCurrUser(registeredUser); // Update currUser in context and localStorage
      const accountType = user.account_type;
      navigate(`/register/${accountType}`);
    } catch (e) {
      setErrorMessage(e);
    }
  };

  const addArtist = async (artist) => {
    if (!currUser) {
      console.error("User is not logged in.");
      return;
    }
    try {
      await NextSetApi.registerArtist(artist, currUser);
      navigate("/");
    } catch (e) {
      setErrorMessage(e);
    }
  };

  const addVenue = async (venue) => {
    if (!currUser) {
      console.error("User is not logged in.");
      return;
    }
    try {
      await NextSetApi.registerVenue(venue, currUser);
      navigate("/");
    } catch (e) {
      setErrorMessage(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        {errorMessage.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {errorMessage.map((error, idx) => (
              <p key={idx} className="text-sm">
                {error.msg}
              </p>
            ))}
          </div>
        )}
        {!accountType && <RegisterForm addUser={addUser} />}
        {accountType === "artist" && (
          <ArtistRegisterForm addArtist={addArtist} />
        )}
        {accountType === "venue" && <VenueRegisterForm addVenue={addVenue} />}
      </div>
    </div>
  );
}

export { Register };
