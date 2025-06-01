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
        className="fixed top-[80px] right-0 z-50 h-[calc(100%-80px)] w-full sm:max-w-lg md:max-w-xl lg:max-w-xl
    bg-white/90 backdrop-blur-md text-zinc-900 border-l border-zinc-200
    overflow-y-auto shadow-inner shadow-xl
    rounded-l-2xl sm:rounded-l-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-zinc-400 hover:text-black transition"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-full h-full">{children}</div>
      </motion.aside>
    </>
  );
}
