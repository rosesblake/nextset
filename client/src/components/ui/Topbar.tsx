"use client";

import { useAuthStore } from "@/lib/stores/useAuthStore";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function Topbar() {
  const { currUser } = useAuthStore();
  const profilePhoto = currUser?.artist?.spotify_photo || "/avatar.jpg";

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 z-50 w-full h-[80px] border-b border-black/10 backdrop-blur-lg bg-gradient-to-r from-black/60 via-black/40 to-black/60 shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
    >
      <div className="h-full max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center h-full">
          <Image
            src="/images/nextset-logo-white.png"
            alt="NextSet logo"
            width={150}
            height={45}
            className="object-contain"
          />
        </Link>

        <div className="flex items-center gap-5">
          <button
            className="relative group p-2 rounded-full hover:bg-white/10 transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-white/70 group-hover:text-white transition" />
            <span className="absolute -top-[2px] -right-[2px] h-2 w-2 rounded-full bg-red-500" />
          </button>

          <Image
            src={profilePhoto}
            alt={currUser?.full_name || "User avatar"}
            width={40}
            height={40}
            className="rounded-full object-cover border border-black/30 hover:border-black transition"
          />
        </div>
      </div>
    </motion.header>
  );
}
