import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { NextSetApi } from "../../../services/api";
import { useUser } from "../../../contexts/UserContext";
import { useMessage } from "../../../contexts/MessageContext";

function Login() {
  const navigate = useNavigate();
  const { setCurrUser } = useUser();
  const [errorMessage, setErrorMessage] = useState([]);
  const { showMessage } = useMessage();

  const loginUser = async (user) => {
    try {
      const res = await NextSetApi.loginUser(user);

      if (!res) {
        return showMessage("Invalid User/Password");
      }
      const { token, user: loggedInUser } = res;
      // Save the token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("justLoggedIn", "true");
      // Set the logged-in user in context
      setCurrUser(loggedInUser);
      // Redirect to home page after successful login
      navigate(`/${loggedInUser.account_type}/dashboard`);
      if (
        loggedInUser.artist?.artist_pitches?.some(
          (pitch) => pitch.pitches.status === "accepted"
        )
      ) {
        localStorage.removeItem("justLoggedIn");
        //show notification if they have a pitch awaiting confirmation
        return showMessage(
          "You have a pitch awaiting confirmation!",
          "success"
        );
      }
      showMessage("Successfully logged in", "success");
    } catch (e) {
      showMessage(e.message, "error");
      setErrorMessage(e.errors);
    }
  };

  return (
    <div className="mt-[64px] flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm">
        {errorMessage?.length > 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {errorMessage.map((error, idx) => (
              <p key={idx} className="text-sm">
                {error.msg}
              </p>
            ))}
          </div>
        )}
        <LoginForm loginUser={loginUser} />
      </div>
    </div>
  );
}

export { Login };
