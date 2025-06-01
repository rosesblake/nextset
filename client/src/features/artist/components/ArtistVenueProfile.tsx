"use client";

import React, { useEffect, useState } from "react";
import { Venue } from "@/types/Venue";
import { NextSetApi } from "@/lib/api";
import { Spinner } from "@/components/ui/Spinner";
import Image from "next/image";
import { MapPin, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

type Props = {
  venueId: number;
};

export function ArtistVenueProfile({ venueId }: Props) {
  const [venue, setVenue] = useState<Venue>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    async function fetchVenue() {
      try {
        const v = await NextSetApi.getVenue(venueId);
        setVenue(v);
      } catch (e) {
        console.error("Error fetching venue", e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVenue();
  }, [venueId]);

  if (!venue || isLoading) return <Spinner />;

  const blockedDates = [
    new Date(2025, 5, 3),
    new Date(2025, 5, 7),
    new Date(2025, 5, 14),
    new Date(2025, 5, 21),
  ];

  const areAmenities =
    venue.venue_amenities && venue.venue_amenities.length > 0;

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto bg-white">
      <div className="relative w-full min-h-[250px] sm:h-64">
        <Image
          src="/images/hero.png"
          alt="Venue"
          fill
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-2xl font-semibold">{venue.name}</h1>
          <p className="text-sm opacity-80">
            {venue.city}, {venue.state}
          </p>
        </div>
        <div className="absolute bottom-4 right-4">
          <Button
            variant="default"
            className="backdrop-blur bg-white shadow-sm text-black hover:bg-white/90 cursor-pointer"
          >
            Pitch This Venue
          </Button>
        </div>
      </div>

      <div className="flex-1 px-6 py-6">
        <div className="max-w-[500px] mx-auto space-y-6">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-neutral-600 mt-1" />
            <div>
              <p className="text-sm text-neutral-500">Capacity</p>
              <p className="text-base font-medium text-neutral-900">
                {venue.capacity || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-neutral-600 mt-1" />
            <div>
              <p className="text-sm text-neutral-500">Address</p>
              <p className="text-base font-medium text-neutral-900 break-words">
                {venue.full_address ||
                  `${venue.street}, ${venue.city}, ${venue.state} ${venue.zip_code}`}
              </p>
            </div>
          </div>

          {areAmenities && (
            <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50/60 shadow-sm px-5 py-6 space-y-5">
              <div className="absolute inset-0 pointer-events-none border border-white/20 rounded-xl" />
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-neutral-600" />
                <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-700">
                  Amenities
                </h3>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  ...new Set(
                    venue.venue_amenities
                      ?.map((a) => a.amenities?.name)
                      .filter(Boolean)
                  ),
                ].map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1 rounded-full text-sm bg-white text-neutral-800 border border-neutral-200 shadow-sm"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-neutral-800 tracking-tight text-center">
              View Availability
            </h3>
            <div className="flex justify-center">
              <div className="w-full max-w-[460px]">
                <Calendar
                  mode="single"
                  selected={undefined}
                  onSelect={() => {}}
                  className="w-full"
                  disabled={blockedDates}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
