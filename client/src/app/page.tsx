import Link from "next/link";
import { LandingCard } from "@/components/landing/LandingCard";

export default function MainLanding() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-5xl font-bold tracking-tight mb-6 text-center text-primary">
        Join the NextSet Movement
      </h1>
      <p className="text-lg text-muted-foreground text-center max-w-xl mb-12">
        Whether you’re an{" "}
        <span className="font-semibold text-primary">Artist</span> ready to
        perform or a <span className="font-semibold text-primary">Venue</span>{" "}
        eager to host, we make collaboration seamless.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <LandingCard
          title="🎵 Artist"
          description="Find venues, pitch your shows, and get booked with ease."
          href="/register/artist"
          buttonText="Sign Up as Artist"
        />
        <LandingCard
          title="🏢 Venue"
          description="List your venue, discover talent, and manage bookings."
          href="/register/venue"
          buttonText="Sign Up as Venue"
        />
      </div>

      <p className="text-sm text-muted-foreground mt-12">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:underline font-medium"
        >
          Log in here
        </Link>
      </p>
    </main>
  );
}
