import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { InputField } from "../components/InputField";

const RegisterForm = ({ addUser, onAccountTypeChange }) => {
  const INITIAL_STATE = {
    username: "",
    password: "",
    email: "",
    account_type: "",
  };

  //custom hook to re-use for other forms
  const { formData, handleChange, handleSubmit } = useForm(
    INITIAL_STATE,
    (data) => {
      if (!data.account_type) {
        alert("Please select an account type.");
        return;
      }
      addUser(data);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>

      <InputField
        id="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />

      <InputField
        id="username"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />

      <InputField
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      <label htmlFor="account_type">Account Type</label>
      <select
        id="account_type"
        name="account_type"
        value={formData.account_type}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select Account Type
        </option>
        <option value="artist">Artist</option>
        <option value="venue">Venue</option>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

export { RegisterForm };
