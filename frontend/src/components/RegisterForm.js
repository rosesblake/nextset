import React, { useEffect } from "react";
import { useForm } from "../hooks/useForm";
import { InputField } from "../components/InputField";
import { FormWrapper } from "../components/FormWrapper";
import { useSearchParams, useNavigate } from "react-router-dom";

const RegisterForm = ({ addUser }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accountType = searchParams.get("account_type");
    if (!accountType) {
      navigate("/");
    }
  }, [searchParams, navigate]);

  const INITIAL_STATE = {
    full_name: "",
    password: "",
    email: "",
  };

  const { formData, handleChange, handleSubmit } = useForm(
    INITIAL_STATE,
    (data) => {
      addUser({ ...data, account_type: searchParams.get("account_type") });
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
        autocomplete="username"
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
        autocomplete="current-password"
      />
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
