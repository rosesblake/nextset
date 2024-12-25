import React, { useState } from "react";
import { FormWrapper } from "./FormWrapper";
import { InputField } from "./InputField";
import { useForm } from "../hooks/useForm";

function LoginForm({ loginUser }) {
  const INITIAL_STATE = {
    username: "",
    password: "",
  };

  const { formData, handleChange, handleSubmit } = useForm(
    INITIAL_STATE,
    (data) => {
      loginUser(data);
    }
  );

  return (
    <FormWrapper title="Login" handleSubmit={handleSubmit}>
      <InputField
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />

      <InputField
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
      />

      <div className="space-y-4">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition duration-300"
        >
          Login
        </button>
      </div>
    </FormWrapper>
  );
}

export { LoginForm };
