"use client";

import { useAuthStore } from "@/lib/stores/useAuthStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ArtistDashboard() {
  const { currUser } = useAuthStore();
  console.log(currUser);
  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>
            Welcome back, {currUser?.full_name || "Artist"}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p>Email: {currUser?.email}</p>
          <p>Account Type: {currUser?.account_type}</p>
          {currUser?.artist && (
            <>
              <p>Artist Name: {currUser.artist.name}</p>
              <p>
                Hometown: {currUser.artist.hometown_city},{" "}
                {currUser.artist.hometown_state}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
