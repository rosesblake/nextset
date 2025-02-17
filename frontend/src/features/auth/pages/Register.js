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
      const locationDetails = data.pendingLocationData;

      const userRes = await NextSetApi.registerUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        account_type: accountType,
      });

      let { user, token } = userRes;
      let registrationSuccess = false;

      if (accountType === "artist") {
        try {
          const artistRes = await NextSetApi.registerArtist(
            {
              name: data.name,
              hometown_city: locationDetails.city || "",
              hometown_state: locationDetails.state || "",
              hometown_country: locationDetails.country || "",
              hometown_lat: locationDetails.lat || 0,
              hometown_lng: locationDetails.lng || 0,
              spotify_id: data.spotify_id,
              spotify_photo: data.spotify_photo,
              spotify_url: data.spotify_url,
              spotify_popularity: data.spotify_popularity,
              spotify_followers: data.spotify_followers,
              created_by: user.id,
            },
            user
          );

          user = {
            ...user,
            artist_id: artistRes.artist.id,
            artist: artistRes.artist,
          };
          registrationSuccess = true;
          navigate("/artist/dashboard");
        } catch (artistError) {
          console.error(artistError);
          showMessage(
            artistError.message || "Artist registration failed",
            "error"
          );
        }
      } else if (accountType === "venue") {
        try {
          const venueRes = await NextSetApi.registerVenue(
            {
              name: data.venue_name,
              capacity: parseInt(data.capacity),
              full_address: data.full_address,
              city: data.city,
              state: data.state,
              zip_code: parseInt(data.zip),
              lat: data.lat,
              lng: data.lng,
              created_by: user.id,
            },
            user
          );

          user = {
            ...user,
            venue_id: venueRes.venue.id,
            venue: venueRes.venue,
          };
          registrationSuccess = true;
          navigate("/venue/profile");
        } catch (venueError) {
          showMessage(
            venueError.message || "Venue registration failed",
            "error"
          );
        }
      }

      if (!registrationSuccess && user?.id) {
        return await NextSetApi.deleteUser(user.id);
      }

      localStorage.setItem("token", token);
      setCurrUser(user);
      showMessage("Registration successful", "success");
      setErrorMessage([]);
    } catch (e) {
      console.error(e);
      showMessage(e.message || "An unexpected error occurred", "error");
      setErrorMessage(e.errors || []);
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
