import React, { useState } from "react";

const RegisterForm = ({ addUser }) => {
  const INITIAL_STATE = {
    username: "",
    password: "",
    email: "",
    account_type: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [accountType, setAccountType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData, accountType);
    setFormData(INITIAL_STATE);
    setAccountType("");
  };

  const handleAccountType = (e) => {
    setAccountType(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="account-type">
          Account Type
          <select
            id="account-type"
            value={accountType}
            onChange={handleAccountType}
            required
          >
            <option value="" disabled>
              Select Account Type
            </option>
            <option value="artist">Artist</option>
            <option value="venue">Venue</option>
          </select>
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export { RegisterForm };
