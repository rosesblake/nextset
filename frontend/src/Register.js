import React from "react";
import { RegisterForm } from "./RegisterForm";
import { NextSetApi } from "./api/api";

function Register() {
  const addUser = async (user, accountType) => {
    let newUser = { ...user, account_type: accountType };
    try {
      await NextSetApi.registerUser(newUser);
    } catch (e) {
      console.error("Error registering user:", e);
    }
  };
  return (
    <div className="register-user-form">
      <RegisterForm addUser={addUser} />
    </div>
  );
}

export { Register };
