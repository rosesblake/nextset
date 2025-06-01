"use client";

import { useAuthStore } from "@/lib/stores/useAuthStore";
import { Bell, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProfileDropdown } from "./ProfileDropdown";

export function Topbar() {
  const { currUser } = useAuthStore();
  const isLoggedIn = !!currUser;

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-[75px] bg-white/50 backdrop-blur-xl shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-full">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/nextset-logo-black.png"
            alt="NextSet logo"
            width={120}
            height={40}
            className="w-[120px] h-auto object-contain"
            priority
          />
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <button
              aria-label="Notifications"
              className="relative p-2 rounded-full hover:bg-black/5 transition"
            >
              <Bell className="w-5 h-5 text-black cursor-pointer" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <ProfileDropdown>
              {currUser.artist?.spotify_photo ? (
                <Image
                  src={currUser.artist.spotify_photo}
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="hover:brightness-90 cursor-pointer rounded-full object-cover border border-white/10 hover:ring-2 hover:ring-white/20 hover:shadow-md transition"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white border border-white/30 flex items-center justify-center hover:ring-2 hover:ring-white transition">
                  <User className="w-4 h-4 text-zinc-600" />
                </div>
              )}
            </ProfileDropdown>
          </div>
        ) : (
          <Link
            href="/login"
            className="text-sm font-medium text-black hover:underline transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
