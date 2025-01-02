import React from "react";
import { useForm } from "../hooks/useForm";
import { InputField } from "../components/InputField";
import { FormWrapper } from "../components/FormWrapper";

const RegisterForm = ({ addUser }) => {
  const INITIAL_STATE = {
    full_name: "",
    password: "",
    email: "",
    account_type: "",
  };

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
    <FormWrapper title="Signup" handleSubmit={handleSubmit}>
      <InputField
        id="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        id="full_name"
        name="full_name"
        placeholder="Full Name"
        value={formData.full_name}
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
      <div>
        <label
          htmlFor="account_type"
          className="block text-sm font-medium text-gray-700"
        >
          Account Type
        </label>
        <select
          id="account_type"
          name="account_type"
          value={formData.account_type}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nextsetButton focus:border-nextsetPrimary"
        >
          <option value="" disabled>
            Select Account Type
          </option>
          <option value="artist">Artist</option>
          <option value="venue">Venue</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-nextsetPrimary text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-nextsetButton focus:outline-none focus:ring-2 focus:ring-nextsetButton focus:ring-offset-2"
      >
        Submit
      </button>
    </FormWrapper>
  );
};

export { RegisterForm };
