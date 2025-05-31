"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LandingCard } from "@/components/landing/LandingCard";

export default function MainLanding() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto">
      <Image
        src="/images/hero.png"
        alt="Concert crowd and stage"
        fill
        priority
        quality={100}
        className="object-cover object-center z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />

      <main className="relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-white px-6 text-center gap-y-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold tracking-tight"
        >
          Join the NextSet Movement
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg max-w-xl mb-6 text-white/90"
        >
          Whether you’re an <span className="font-semibold">Artist</span> ready
          to perform or a <span className="font-semibold">Venue</span> eager to
          host, we make collaboration seamless.
        </motion.p>

        <div className="w-full max-w-5xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            <LandingCard
              title="Artist"
              description="Find venues, pitch your shows, and get booked with ease."
              href="/register/artist"
              buttonText="Sign Up as Artist"
              imageSrc="/images/artist-card.png"
            />
            <LandingCard
              title="Venue"
              description="List your venue, discover talent, and manage bookings."
              href="/register/venue"
              buttonText="Sign Up as Venue"
              imageSrc="/images/venue-card.png"
            />
          </div>
        </div>

        <p className="text-sm mt-12 text-white/80">
          Already have an account?{" "}
          <Link href="/login" className="text-white underline font-medium">
            Log in here
          </Link>
        </p>
      </main>

      <div className="absolute bottom-6 animate-bounce text-white text-2xl z-20">
        ↓
      </div>
    </div>
  );
}
