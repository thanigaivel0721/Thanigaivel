"use client";

import { motion } from "framer-motion";
import { FiTerminal, FiMessageCircle } from "react-icons/fi";
import { site } from "@/lib/data";

export default function FloatingButtons() {
  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.8, duration: 0.5 }}
        aria-label="Terminal"
        onClick={() =>
          document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
        }
        className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full border border-white/[0.1] bg-[#161515]/90 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white hover:border-white/[0.25] hover:scale-105 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
      >
        <FiTerminal size={16} />
      </motion.button>
      <motion.a
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.95, duration: 0.5 }}
        aria-label="Chat"
        href={`mailto:${site.email}?subject=Hello Thanigaivel`}
        className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full border border-white/[0.1] bg-[#161515]/90 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white hover:border-white/[0.25] hover:scale-105 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
      >
        <FiMessageCircle size={16} />
      </motion.a>
    </>
  );
}
