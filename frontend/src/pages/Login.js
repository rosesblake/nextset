import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { NextSetApi } from "../api/api";
import { useUser } from "../components/UserContext";
import { useMessage } from "../components/MessageContext";

function Login() {
  const navigate = useNavigate();
  const { setCurrUser } = useUser(); // Get setCurrUser from context
  const [errorMessage, setErrorMessage] = useState([]);
  const { showMessage } = useMessage();

  const loginUser = async (user) => {
    try {
      const res = await NextSetApi.loginUser(user);
      const { token, user: loggedInUser } = res;

      // Save the token in localStorage
      localStorage.setItem("token", token);

      // Set the logged-in user in context
      setCurrUser(loggedInUser);

      // Redirect to home page after successful login
      navigate(`/${loggedInUser.account_type}/home`);
      showMessage("Successfully logged in", "success");
    } catch (e) {
      showMessage(e.message, "error");
      setErrorMessage(e.errors);
    }
  };

  return (
    <div className="mt-[64px] flex items-center justify-center min-h-screen">
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
        <LoginForm loginUser={loginUser} />
      </div>
    </div>
  );
}

export { Login };
