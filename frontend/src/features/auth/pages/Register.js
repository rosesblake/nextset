import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import { NextSetApi } from "../../../services/api";
import { ErrorDisplay } from "../../../shared/forms/ErrorDisplay";
import { ArtistForm } from "../components/ArtistForm";
import { VenueForm } from "../components/VenueForm";
import { useMessage } from "../../../contexts/MessageContext";

function Register() {
  const { accountType } = useParams();
  const navigate = useNavigate();
  const { setCurrUser } = useUser();
  const { showMessage } = useMessage();
  const [errorMessage, setErrorMessage] = useState([]);

  const handleRegister = async (data) => {
    try {
      // Step 1: Register User
      const userRes = await NextSetApi.registerUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        account_type: accountType,
      });

      let { user } = userRes;

      // Step 2: Register Account Type
      if (accountType === "artist") {
        const artistRes = await NextSetApi.registerArtist(
          {
            name: data.artist_name,
            hometown: data.hometown,
            spotify_id: data.spotify_id,
            spotify_photo: data.spotify_photo,
            spotify_url: data.spotify_url,
            spotify_popularity: data.spotify_popularity,
            spotify_followers: data.spotify_followers,
          },
          user
        );

        user = {
          ...user,
          artist_id: artistRes.artist.id,
          artist: artistRes.artist,
        };
        navigate("/artist/home");
      } else if (accountType === "venue") {
        const venueRes = await NextSetApi.registerVenue(
          {
            name: data.venue_name,
            capacity: parseInt(data.capacity),
            address: data.address,
            city: data.city,
            state: data.state,
            zip_code: parseInt(data.zip_code),
          },
          user
        );
        user = { ...user, venue_id: venueRes.venue.id, venue: venueRes.venue };

        navigate("/venue/dashboard");
      }

      // Step 3: Store Token and Updated User
      const { token } = userRes;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setCurrUser(user);
      showMessage("Registration successful", "success");
      setErrorMessage([]);
    } catch (e) {
      showMessage(e.message, "error");
      setErrorMessage(e.errors);
    }
  };

  return (
    <div className="mt-[64px] flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <ErrorDisplay errors={errorMessage} />
        {accountType === "artist" && <ArtistForm onSubmit={handleRegister} />}
        {accountType === "venue" && <VenueForm onSubmit={handleRegister} />}
      </div>
    </div>
  );
}

export { Register };
