"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiLayers,
  FiDatabase,
  FiSmartphone,
  FiGitBranch,
  FiCompass,
  FiFolder,
  FiStar,
} from "react-icons/fi";
import { Badge, WordRise, FadeUp } from "./reveal";
import { disciplines } from "@/lib/data";

const icons = [FiLayers, FiDatabase, FiSmartphone, FiGitBranch, FiCompass];
const LIME = "#C2EF3A";

export default function Expertise() {
  const [idx, setIdx] = useState(0);
  const d = disciplines[idx];
  const ActiveIcon = icons[idx];

  return (
    <div className="relative py-16 xs:py-18 sm:py-20 md:py-24 overflow-hidden bg-[#0F0E0E]">
      <div className="relative z-10 max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8">
        <div className="text-center mb-10 xs:mb-12 sm:mb-14 md:mb-16">
          <Badge color={LIME}>My Core Expertise</Badge>
          <WordRise
            text="Professional disciplines engineered for high performance."
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-white max-w-2xl mx-auto font-jakarta"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-4 xs:gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {/* left rail */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: -8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              perspective: 1000,
              background:
                "linear-gradient(180deg, rgba(30, 28, 28, 0.45) 0%, rgba(21, 19, 19, 0.95) 100%)",
              boxShadow:
                "0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
            }}
            className="relative flex flex-col justify-between rounded-[30px] border border-white/[0.04] p-5 xs:p-6 lg:p-7 xl:p-8 overflow-hidden h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.02] pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-5 lg:gap-6 flex-1 justify-start">
              <div className="hidden lg:block">
                <p className="text-[10px] font-mono font-bold tracking-[0.15em] text-white/35 uppercase mb-1">
                  Disciplines
                </p>
                <h3 className="text-sm font-extrabold text-white font-jakarta tracking-tight">
                  Expertise Areas
                </h3>
              </div>
              <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-hide -mx-4 xs:-mx-5 sm:-mx-6 px-4 xs:px-5 sm:px-6 lg:mx-0 lg:px-0">
                {disciplines.map((disc, i) => {
                  const Icon = icons[i];
                  const on = i === idx;
                  return (
                    <button
                      key={disc.key}
                      onClick={() => setIdx(i)}
                      className={`group relative flex items-center gap-3 lg:gap-4 p-3.5 sm:p-4 rounded-[20px] min-w-[150px] sm:min-w-[180px] lg:min-w-0 w-full text-left overflow-hidden flex-shrink-0 lg:flex-shrink transition-all duration-300 border ${on ? "border-white/10" : "border-white/[0.04]"}`}
                      style={{
                        background: on
                          ? "linear-gradient(180deg, rgba(40, 36, 36, 0.6) 0%, rgba(26, 23, 23, 0.95) 100%)"
                          : "linear-gradient(180deg, rgba(30, 28, 28, 0.4) 0%, rgba(21, 19, 19, 0.85) 100%)",
                        boxShadow: on
                          ? "0 6px 20px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)"
                          : "0 4px 12px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.02)",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.02] pointer-events-none" />
                      {on && (
                        <div
                          className="absolute left-3.5 right-3.5 lg:left-0 bottom-0 lg:bottom-3.5 lg:top-3.5 h-[2px] lg:h-auto w-auto lg:w-[3px] rounded-t-full lg:rounded-r-full"
                          style={{
                            background: LIME,
                            boxShadow: "0 0 8px rgba(194, 239, 58, 0.6)",
                          }}
                        />
                      )}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-[12px] flex items-center justify-center border transition-all duration-300 ${
                          on
                            ? "bg-[#C2EF3A]/10 border-[#C2EF3A]/30 text-[#C2EF3A]"
                            : "bg-white/5 border-white/5 text-white/50 group-hover:text-white/80 group-hover:bg-white/10"
                        }`}
                      >
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`text-[12px] sm:text-[13px] font-bold font-jakarta truncate transition-colors duration-300 ${on ? "text-white" : "text-white/70 group-hover:text-white"}`}
                        >
                          {disc.title}
                        </h3>
                        <p
                          className={`text-[9px] sm:text-[10px] font-medium font-jakarta truncate transition-colors duration-300 ${on ? "text-white/45" : "text-white/30 group-hover:text-white/40"}`}
                        >
                          {disc.sub}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="relative z-10 flex lg:flex-row items-center gap-3 mt-6 pt-4 border-t border-white/[0.04]">
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-[16px] bg-[#0E0D0D] border border-white/[0.03] flex-1 justify-center lg:justify-start">
                <span className="text-[10px] font-bold font-mono text-white/55 uppercase tracking-wide whitespace-nowrap">
                  01+ Years Exp
                </span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-[16px] bg-[#0E0D0D] border border-white/[0.03] flex-1 justify-center lg:justify-start">
                <span className="text-[10px] font-bold font-mono text-white/55 uppercase tracking-wide whitespace-nowrap">
                  06+ Projects
                </span>
              </div>
            </div>
          </motion.div>

          {/* detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotateY: 8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[30px] border border-white/[0.04] overflow-hidden h-full flex flex-col"
            style={{
              background:
                "linear-gradient(180deg, rgba(30, 28, 28, 0.45) 0%, rgba(21, 19, 19, 0.95) 100%)",
              boxShadow:
                "0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.02] pointer-events-none" />
            <div
              className="absolute top-0 right-0 w-[200px] xs:w-[300px] sm:w-[400px] h-[200px] xs:h-[300px] sm:h-[400px] pointer-events-none opacity-20"
              style={{
                background:
                  "radial-gradient(circle at 80% 20%, rgba(194, 239, 58, 0.15) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10 p-5 xs:p-6 sm:p-7 md:p-8 lg:p-10 flex-1 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={d.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col flex-grow justify-between gap-6 h-full"
                >
                  <div className="flex-1 flex flex-col justify-start">
                    <div className="flex items-start justify-between gap-4 mb-5 sm:mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-[16px] flex items-center justify-center text-[#C2EF3A] border"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(194, 239, 58, 0.1) 0%, rgba(194, 239, 58, 0.02) 100%)",
                            borderColor: "rgba(194, 239, 58, 0.25)",
                            boxShadow: "0 4px 20px rgba(194, 239, 58, 0.12)",
                          }}
                        >
                          <ActiveIcon size={22} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-0.5 truncate font-jakarta">
                            {d.title}
                          </h3>
                          <p className="text-[10px] xs:text-xs sm:text-sm font-bold text-[#C2EF3A] tracking-wider uppercase font-mono">
                            {d.sub}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0E0D0D] border border-white/[0.04] text-[10px] sm:text-[11px] font-mono font-bold text-white/55 select-none uppercase tracking-wide">
                          <FiFolder size={11} />
                          <span>{d.projects}</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0E0D0D] border border-white/[0.04] text-[10px] sm:text-[11px] font-mono font-bold text-white/55 select-none uppercase tracking-wide">
                          <FiStar size={11} />
                          <span>{d.years}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] xs:text-[12px] sm:text-[13px] md:text-[14px] leading-relaxed text-white/50 mb-6 max-w-3xl font-jakarta">
                      {d.description}
                    </p>
                    <div className="h-px bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] mb-6 origin-left" />
                    <div className="mb-6">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 font-mono font-bold mb-3">
                        Tech Stack &amp; Proficiency
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
                        {d.tech.map((t, ti) => (
                          <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.08 + ti * 0.05, duration: 0.4 }}
                            className="group relative flex items-center justify-between px-3.5 py-2.5 rounded-[16px] border border-white/[0.04] hover:border-white/[0.12] transition-all duration-300 cursor-default select-none shadow-sm"
                            style={{
                              background:
                                "linear-gradient(180deg, rgba(24, 22, 22, 0.45) 0%, rgba(14, 13, 13, 0.95) 100%)",
                              boxShadow:
                                "inset 0 1px 0 0 rgba(255, 255, 255, 0.01)",
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.005] to-transparent rounded-[16px] pointer-events-none" />
                            <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                              <span
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ background: t.color }}
                              />
                              <span className="text-[11px] sm:text-xs font-bold font-jakarta text-white/80 truncate group-hover:text-white transition-colors duration-200">
                                {t.name}
                              </span>
                            </div>
                            <div className="flex flex-col items-end gap-1 flex-shrink-0 w-16">
                              <span className="text-[9px] font-mono font-bold text-white/40 group-hover:text-[#C2EF3A] transition-colors duration-200">
                                {t.pct}%
                              </span>
                              <div className="w-full h-1 bg-[#1C1A1A] rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${t.pct}%` }}
                                  transition={{
                                    delay: 0.25 + ti * 0.06,
                                    duration: 0.7,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  className="h-full bg-gradient-to-r from-[#C2EF3A]/60 to-[#C2EF3A] rounded-full"
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
