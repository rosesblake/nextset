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
        className="mt-[80px] fixed top-0 right-0 z-50 h-[calc(100%-80px)] w-full max-w-lg
          bg-white/90 backdrop-blur-md text-zinc-900 rounded-l-2xl
          border-l border-zinc-200 overflow-y-auto shadow-inner shadow-xl"
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="cursor-pointer text-zinc-400 hover:text-black transition"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-6 pb-10">{children}</div>
      </motion.aside>
    </>
  );
}
