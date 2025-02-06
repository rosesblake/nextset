import React from "react";
import { InputField } from "./InputField";

function SharedFields({ formData, onChange }) {
  return (
    <>
      <InputField
        id="full_name"
        name="full_name"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={onChange}
      />
      <InputField
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={onChange}
        autoComplete="username"
      />
      <InputField
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        value={formData.password}
        onChange={onChange}
        autoComplete="current-password"
      />
    </>
  );
}

export { SharedFields };
