"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type VenueFormProps = {
  onSubmit: (formData: any) => void;
};

export function VenueForm({ onSubmit }: VenueFormProps) {
  const [formData, setFormData] = useState({
    venue_name: "",
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    capacity: "",
    full_address: "",
  });

  const [locationData, setLocationData] = useState({
    full_address: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    lat: "",
    lng: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!locationData.lat || !locationData.lng || !locationData.street) {
      setError("Please select a valid address.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    onSubmit({ ...formData, ...locationData });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card border p-6 rounded-lg shadow-md w-full max-w-md space-y-5"
    >
      <h1 className="text-2xl font-bold text-primary">Register as Venue</h1>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <div>
        <Label htmlFor="venue_name">Venue Name</Label>
        <Input
          name="venue_name"
          value={formData.venue_name}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="capacity">Capacity</Label>
        <Input
          name="capacity"
          type="number"
          value={formData.capacity}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="full_address">Full Address</Label>
        <Input
          name="full_address"
          placeholder="Enter full address manually for now"
          value={formData.full_address}
          onChange={(e) => {
            handleChange(e);
            // You can later replace this with a real address picker
            setLocationData((prev) => ({
              ...prev,
              full_address: e.target.value,
            }));
          }}
        />
      </div>

      <hr className="my-4" />
      <h2 className="text-xl font-semibold text-foreground">
        Create Your Account
      </h2>

      <div>
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="confirm_password">Confirm Password</Label>
        <Input
          name="confirm_password"
          type="password"
          value={formData.confirm_password}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full mt-4">
        Register
      </Button>
    </form>
  );
}
