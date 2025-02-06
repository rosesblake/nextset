import React from "react";
import { FormWrapper } from "../../../shared/forms/FormWrapper";
import { InputField } from "../../../shared/forms/InputField";
import { useForm } from "../../../hooks/useForm";

function LoginForm({ loginUser }) {
  const INITIAL_STATE = {
    email: "",
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
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        autoComplete="username"
      />

      <InputField
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        type="password"
        autoComplete="current-password"
      />

      <div className="space-y-4">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-nextsetPrimary hover:bg-nextsetButton rounded-md transition duration-300"
        >
          Login
        </button>
      </div>
    </FormWrapper>
  );
}

export { LoginForm };
