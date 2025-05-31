"use client";

import { useAuthStore } from "@/lib/stores/useAuthStore";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProfileDropdown } from "./ProfileDropdown";
import clsx from "clsx";

export function Topbar() {
  const { currUser } = useAuthStore();
  const isLoggedIn = !!currUser;

  const logo = isLoggedIn
    ? "/images/nextset-logo-black.png"
    : "/images/nextset-logo-white.png";

  const textColor = isLoggedIn
    ? "text-zinc-700 hover:text-black"
    : "text-white/80 hover:text-white";

  const iconColor = isLoggedIn
    ? "text-zinc-600 group-hover:text-black"
    : "text-white/70 group-hover:text-white";

  const hoverBg = isLoggedIn ? "hover:bg-black/5" : "hover:bg-white/10";

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-[80px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLoggedIn ? "light" : "dark"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={clsx(
            "absolute inset-0 w-full h-full backdrop-blur-lg bg-gradient-to-r",
            isLoggedIn
              ? "from-zinc-50 via-white to-zinc-50 shadow-[0_2px_6px_rgba(0,0,0,0.04)]"
              : "from-zinc-950/80 via-zinc-950/60 to-zinc-950/80 border-b border-black/10 shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
          )}
        />
      </AnimatePresence>

      <div className="relative z-10 h-full max-w-[2000px] mx-auto px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center h-full">
          <Image
            src={logo}
            alt="NextSet logo"
            width={150}
            height={150}
            className="object-contain w-[150px] h-[150px]"
            priority
          />
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center gap-5">
            <button
              className={clsx(
                "relative group p-2 rounded-full transition",
                hoverBg
              )}
              aria-label="Notifications"
            >
              <Bell
                className={clsx("w-5 h-5 cursor-pointer transition", iconColor)}
              />
              <span className="absolute -top-[2px] -right-[2px] h-2 w-2 rounded-full bg-red-500" />
            </button>
            <ProfileDropdown />
          </div>
        ) : (
          <Link
            href="/login"
            className={clsx("font-medium transition", textColor)}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
