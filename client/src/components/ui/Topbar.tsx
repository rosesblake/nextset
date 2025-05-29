"use client";

import { useAuthStore } from "@/lib/stores/useAuthStore";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Topbar() {
  const { currUser } = useAuthStore();
  const profilePhoto = currUser?.artist?.spotify_photo || "/avatar.jpg";

  return (
    <header className="sticky top-0 z-50 w-full h-[80px] bg-gradient-to-b from-white/90 to-white/40 backdrop-blur-md border-b border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      <div className="h-[80px] px-10 flex items-center justify-between">
        <Link
          href="/"
          className="text-[22px] font-medium text-zinc-800 tracking-wide"
        >
          NEXTSET
        </Link>

        <div className="flex items-center gap-6">
          <button
            className="relative cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-[20px] h-[20px] text-zinc-500 hover:text-zinc-800 transition" />
            <span className="absolute -top-[2px] -right-[2px] h-2 w-2 rounded-full bg-red-500" />
          </button>

          <Image
            src={profilePhoto}
            alt={currUser?.full_name || "User avatar"}
            width={40}
            height={40}
            className="cursor-pointer rounded-full border border-white/50 object-cover"
          />
        </div>
      </div>
    </header>
  );
}
