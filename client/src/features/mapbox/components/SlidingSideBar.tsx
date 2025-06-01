"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface SlidingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function SlidingSidebar({
  isOpen,
  onClose,
  children,
}: SlidingSidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/10 transition-opacity"
        />
      )}

      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 28,
          delay: 0.05,
        }}
        className="fixed top-[75px] right-0 z-50 h-[calc(100%-75px)] w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl
        bg-white/30 backdrop-blur-xl border-l border-white/20 text-zinc-900
        overflow-y-auto shadow-xl rounded-l-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-zinc-400 hover:text-white transition"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6 cursor-pointer" />
        </button>

        <div className="w-full h-full">{children}</div>
      </motion.aside>
    </>
  );
}
