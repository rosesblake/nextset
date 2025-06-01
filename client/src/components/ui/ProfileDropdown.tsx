"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  User,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Coins,
} from "lucide-react";
import { motion } from "framer-motion";

export function ProfileDropdown({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { currUser, logout } = useAuthStore();
  const profilePhoto = currUser?.artist?.spotify_photo || "/avatar.jpg";

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 p-0 rounded-2xl overflow-hidden border border-zinc-200 shadow-xl bg-white"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <div className="bg-gradient-to-br from-zinc-50 to-white px-4 py-4 border-b border-zinc-100">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Image
                  src={profilePhoto}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="cursor-pointer rounded-full object-cover border border-zinc-300"
                />
                <div>
                  <div className="text-sm font-medium text-zinc-800">
                    {currUser?.full_name || "Artist"}
                  </div>
                  <div className="text-xs text-zinc-500 truncate">
                    {currUser?.email || "artist@email.com"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-zinc-800">
                <Coins className="w-4 h-4 text-yellow-500" />
                {currUser?.token_balance ?? 10}
              </div>
            </div>
          </div>

          <div className="py-2 px-2 text-sm text-zinc-800 space-y-1">
            <DropdownMenuItem asChild>
              <Link
                href="/artist/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 transition cursor-pointer"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/artist/profile"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 transition cursor-pointer"
              >
                <User size={16} />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/artist/pitches"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 transition cursor-pointer"
              >
                <FileText size={16} />
                My Pitches
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/artist/calendar"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 transition cursor-pointer"
              >
                <Calendar size={16} />
                Calendar
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-100 transition cursor-pointer"
              >
                <Settings size={16} />
                Settings
              </Link>
            </DropdownMenuItem>
          </div>

          <div className="border-t border-zinc-100 px-2 py-2">
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-2 text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition w-full"
            >
              <LogOut size={16} />
              Log out
            </DropdownMenuItem>
          </div>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
