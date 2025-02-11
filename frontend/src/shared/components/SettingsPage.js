import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { NextSetApi } from "../../services/api";
import { useLoading } from "../../contexts/LoadingContext";
import { useMessage } from "../../contexts/MessageContext";
import { Spinner } from "./Spinner";

function SettingsPage() {
  const { currUser, setCurrUser } = useUser();
  const { isLoading, setIsLoading } = useLoading();
  const { showMessage } = useMessage();

  const [formData, setFormData] = useState({
    email: currUser.email || "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updateData = {};
    //if new email add to updateData
    if (formData.email !== currUser.email) {
      updateData.email = formData.email;
    }
    if (formData.password && formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        showMessage("New passwords do not match", "error");
        setIsLoading(false);
        return;
      }
      updateData.currentPassword = formData.password;
      updateData.newPassword = formData.newPassword;
    }

    try {
      if (Object.keys(updateData).length > 0) {
        const res = await NextSetApi.updateUser(currUser.email, updateData);

        //  Update currUser based on account type
        if (currUser.accountType === "artist") {
          setCurrUser({
            ...currUser,
            ...res.updatedUser,
            artist: currUser.artist,
          });
        } else if (currUser.accountType === "venue") {
          setCurrUser({
            ...currUser,
            ...res.updatedUser,
            venue: currUser.venue,
          });
        } else {
          setCurrUser({ ...currUser, ...res.updatedUser });
        }
        //update JWT
        localStorage.setItem("token", res.token);
        showMessage("Profile updated successfully", "success");
      } else {
        showMessage("No changes detected", "info");
      }
    } catch (error) {
      showMessage("Failed to update profile", "error");
    } finally {
      setIsLoading(false);
      setFormData({
        ...formData,
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-nextsetAccent mb-4">
          Account Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-nextsetAccent font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              autoComplete="username"
              required
            />
          </div>

          <h3 className="text-xl font-bold text-nextsetAccent mt-6 mb-4">
            Change Password
          </h3>

          <div>
            <label className="block text-nextsetAccent font-semibold">
              Current Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              autoComplete="current-password"
            />
          </div>

          <div>
            <label className="block text-nextsetAccent font-semibold">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-nextsetAccent font-semibold">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-nextsetButton text-white py-2 rounded-md hover:bg-opacity-90"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export { SettingsPage };
