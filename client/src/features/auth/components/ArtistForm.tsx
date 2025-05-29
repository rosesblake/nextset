"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Props = {
  onSubmit: (data: any) => void;
};

export function ArtistForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card p-6 rounded-lg border shadow-sm w-full max-w-md space-y-4"
    >
      <h1 className="text-2xl font-bold text-primary">Register as Artist</h1>

      {error && <p className="text-destructive text-sm">{error}</p>}

      <div>
        <Label htmlFor="name">Artist Name</Label>
        <Input name="name" value={formData.name} onChange={handleChange} />
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
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input
          name="confirm"
          type="password"
          value={formData.confirm}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
}
