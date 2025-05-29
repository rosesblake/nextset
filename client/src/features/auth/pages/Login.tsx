"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NextSetApi } from "@/lib/api";
import { useAuthStore } from "@/lib/stores/useAuthStore";

export function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await NextSetApi.loginUser(form);
      const user = res.user;
      setUser(user);
      localStorage.setItem("isLoggedIn", "true");

      router.push(
        user.account_type === "artist" ? "/artist/dashboard" : "/venue/profile"
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed");
    }
  };

  return (
    <Card className="shadow-xl border-muted w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login to NextSet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
