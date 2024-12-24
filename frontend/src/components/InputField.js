import React from "react";

const InputField = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label htmlFor={id}>{placeholder}</label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export { InputField };
