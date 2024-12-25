import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { NextSetApi } from "../api/api";
import { useUser } from "../components/UserContext";

function Login() {
  const navigate = useNavigate();
  const { setCurrUser } = useUser(); // Get setCurrUser from context
  const [errorMessage, setErrorMessage] = useState("");

  const loginUser = async (user) => {
    try {
      const res = await NextSetApi.loginUser(user); // Adjust API function as needed
      const { token, user: loggedInUser } = res;
      console.log(res);
      // Save the token in localStorage
      localStorage.setItem("token", token);

      // Set the logged-in user in the context
      setCurrUser(loggedInUser); // Update currUser in context

      // Redirect to home page after successful login
      navigate("/");
    } catch (e) {
      setErrorMessage("Invalid credentials. Please try again.");
      console.error("Error logging in user:", e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        {errorMessage && (
          <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
        )}
        <LoginForm loginUser={loginUser} />
      </div>
    </div>
  );
}

export { Login };
