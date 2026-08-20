"use client";

import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiSupabase,
  SiLaravel,
  SiTailwindcss,
} from "react-icons/si";
import { FiZap, FiCheck } from "react-icons/fi";
import GlowCard from "./GlowCard";
import { Badge, WordRise, FadeUp } from "./reveal";

const LIME = "#C2EF3A";
const limeGlow = "rgba(194, 239, 58, 0.15)";

function ActivityCard({
  children,
  className = "",
  glowSize = 250,
}: {
  children: React.ReactNode;
  className?: string;
  glowSize?: number;
}) {
  return (
    <GlowCard
      className={`relative border border-white/[0.04] rounded-[24px] overflow-hidden hover:border-white/[0.08] ${className}`}
      glowColor={limeGlow}
      glowSize={glowSize}
      radius={24}
      padding={2}
      style={{ contain: "layout style" }}
    >
      <div
        className="absolute inset-[2px] rounded-[22px] pointer-events-none"
        style={{ background: "rgba(19, 18, 18, 0.95)" }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </GlowCard>
  );
}

/* growth bars */
const barHeights = [30, 45, 38, 60, 52, 70, 64, 78, 72, 88, 82, 96];

function GrowthViz() {
  return (
    <div className="relative w-full h-24 bg-[#0E0D0D] border border-white/[0.03] rounded-2xl p-4 flex flex-col justify-between overflow-hidden shadow-inner mb-4">
      <div className="flex justify-between items-center z-10">
        <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold font-mono">
          Growth
        </span>
        <FiZap size={11} className="text-[#C2EF3A]" />
      </div>
      <div className="flex justify-between items-end h-10 w-full gap-1 mt-1 select-none relative z-10 px-0.5">
        {barHeights.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <div className="w-full bg-[#1C1A1A] rounded-full h-full overflow-hidden flex items-end">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-gradient-to-t from-[#C2EF3A]/40 to-[#C2EF3A] rounded-full shadow-[0_0_6px_rgba(194,239,58,0.3)]"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center text-[8px] font-semibold text-white/20 uppercase tracking-widest px-0.5 relative z-10">
        <span>Launch</span>
        <span>Growth</span>
        <span>Today</span>
      </div>
    </div>
  );
}

function IngestViz() {
  return (
    <div className="relative w-full h-24 bg-[#0E0D0D] border border-white/[0.03] rounded-2xl flex items-center justify-center overflow-hidden shadow-inner mb-4">
      <div className="absolute inset-0 flex flex-col justify-around py-4 opacity-5 pointer-events-none">
        <div className="w-full h-[1px] border-b border-dashed border-white" />
        <div className="w-full h-[1px] border-b border-dashed border-white" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-10 w-[85%] max-w-[210px] bg-[#121111] border border-white/[0.06] rounded-2xl p-2.5 flex items-center gap-2.5 shadow-lg"
      >
        <div className="w-8 h-8 rounded-full bg-[#C2EF3A]/10 border border-[#C2EF3A]/20 flex items-center justify-center text-[#C2EF3A] flex-shrink-0">
          <FiZap size={13} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2EF3A] animate-pulse" />
            <span className="text-[8px] font-bold text-[#C2EF3A] tracking-wider uppercase">
              Live
            </span>
          </div>
          <p className="text-[10px] font-black text-white/90 truncate leading-tight mt-0.5">
            Zora Order Sync
          </p>
          <span className="text-[8px] text-white/40 block mt-0.5 leading-none">
            Rider tracking API • Just now
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function PerfViz() {
  const pts = [42, 38, 40, 30, 33, 24, 26, 18, 20, 12];
  const path = pts
    .map((y, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 160} ${y}`)
    .join(" ");
  return (
    <div className="relative w-full h-24 bg-[#0E0D0D] border border-white/[0.03] rounded-2xl overflow-hidden p-4 flex flex-col justify-between shadow-inner mb-4">
      <div className="absolute inset-0 flex justify-between px-6 pointer-events-none opacity-[0.02]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-[1px] h-full bg-white" />
        ))}
      </div>
      <div className="absolute inset-0 z-10 pt-8 pb-3 px-1">
        <svg viewBox="0 0 160 48" className="w-full h-full" preserveAspectRatio="none">
          <motion.path
            d={path}
            fill="none"
            stroke={LIME}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 4px rgba(194,239,58,0.5))" }}
          />
        </svg>
        <div className="absolute top-2.5 right-0.5 flex h-3.5 w-3.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2EF3A] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C2EF3A] shadow-[0_0_8px_rgba(194,239,58,0.8)]" />
        </div>
      </div>
      <div className="flex justify-between items-center z-20">
        <span className="text-[9px] uppercase tracking-wider text-white/40 font-semibold font-mono">
          Performance
        </span>
      </div>
    </div>
  );
}

function FloatingIcons() {
  const icons = [
    { Icon: SiNextdotjs, pos: { top: "10%", left: "10%" }, color: "#fff" },
    { Icon: SiReact, pos: { top: "5%", left: "42%" }, color: "#61DAFB" },
    { Icon: SiTypescript, pos: { top: "15%", left: "72%" }, color: "#3178C6" },
    { Icon: SiSupabase, pos: { top: "50%", left: "15%" }, color: "#3ECF8E" },
    { Icon: SiLaravel, pos: { top: "60%", left: "48%" }, color: "#FF2D20" },
    { Icon: SiTailwindcss, pos: { top: "45%", left: "78%" }, color: "#38BDF8" },
  ];
  return (
    <div className="relative w-44 h-24 flex-shrink-0 select-none mt-2 md:mt-0">
      <div className="absolute inset-0 bg-[#C2EF3A]/5 blur-2xl rounded-full pointer-events-none" />
      {icons.map(({ Icon, pos, color }, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.6 + i * 0.35, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
          className="absolute w-9 h-9 rounded-full border border-white/5 bg-[#171616] flex items-center justify-center shadow-lg hover:border-white/15 hover:scale-110 transition-all duration-300"
          style={{ ...pos, boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.02)" }}
        >
          <Icon size={15} style={{ color }} />
        </motion.div>
      ))}
    </div>
  );
}

function TrackerViz() {
  const rows = [
    { done: true, label: "Auth Flow Setup" },
    { done: true, label: "Supabase DB Sync" },
    { done: false, label: "Client Review..." },
  ];
  return (
    <div className="relative w-44 h-24 flex-shrink-0 flex items-center justify-between select-none mt-2 md:mt-0 bg-[#0E0D0D] border border-white/[0.03] rounded-2xl p-3 shadow-inner">
      <div className="flex flex-col gap-1.5 justify-center flex-1 pr-1.5">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center gap-1.5 bg-white/[0.01] border border-white/[0.03] rounded-md px-1.5 py-0.5"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full flex items-center justify-center text-[7px] text-[#C2EF3A] font-bold ${
                r.done
                  ? "bg-[#C2EF3A]/20 border border-[#C2EF3A]"
                  : "bg-[#C2EF3A]/10 border border-[#C2EF3A]/20 animate-pulse"
              }`}
            >
              {r.done ? <FiCheck size={7} /> : "•"}
            </span>
            <span
              className={`text-[8px] font-mono tracking-tight truncate ${r.done ? "text-white/60" : "text-white/40"}`}
            >
              {r.label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0 ml-1.5">
        <svg viewBox="0 0 56 56" className="w-14 h-14 -rotate-90">
          <circle cx="28" cy="28" r="24" fill="none" stroke="#1C1A1A" strokeWidth="4" />
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke={LIME}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 24}
            initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
            whileInView={{ strokeDashoffset: 2 * Math.PI * 24 * 0.15 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 0 4px rgba(194,239,58,0.5))" }}
          />
        </svg>
        <span className="absolute text-[9px] font-mono font-bold text-white">85%</span>
      </div>
    </div>
  );
}

const chips = [
  "Tillsee Dating",
  "Zora Delivery",
  "Daycare Platform",
  "Libya Booking",
  "BlueShirt Network",
  "Next.js & React",
  "Bubble & Native",
  "Supabase Integration",
];

export default function Activity() {
  return (
    <section
      id="activity"
      className="relative z-20 py-16 sm:py-20 md:py-24 bg-[#0F0E0E] overflow-hidden"
      aria-label="Activity Metrics Section"
    >
      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <Badge color={LIME}>My Workflow &amp; Values</Badge>
          <WordRise
            text="Engineering robust products designed for business growth."
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-white max-w-2xl mx-auto font-jakarta"
          />
        </div>

        {/* top 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          <FadeUp>
            <ActivityCard>
              <div className="p-5 flex flex-col justify-between h-full w-full relative z-10">
                <GrowthViz />
                <div>
                  <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-white/30 uppercase block mb-1">
                    Production Builds
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug font-jakarta">
                    Cost-effective development
                  </h3>
                  <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-jakarta">
                    Bubble when it ships faster, code when it counts — six
                    products live in one year.
                  </p>
                </div>
              </div>
            </ActivityCard>
          </FadeUp>
          <FadeUp delay={0.1}>
            <ActivityCard>
              <div className="p-5 flex flex-col justify-between h-full w-full relative z-10">
                <IngestViz />
                <div>
                  <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-white/30 uppercase block mb-1">
                    Custom Logic
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug font-jakarta">
                    Tailor-made systems
                  </h3>
                  <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-jakarta">
                    Live rider tracking, booking engines and constellation
                    matchmaking flows.
                  </p>
                </div>
              </div>
            </ActivityCard>
          </FadeUp>
          <FadeUp delay={0.2}>
            <ActivityCard>
              <div className="p-5 flex flex-col justify-between h-full w-full relative z-10">
                <PerfViz />
                <div>
                  <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-white/30 uppercase block mb-1">
                    Performance
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug font-jakarta">
                    Responsive from breakpoint one
                  </h3>
                  <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-jakarta">
                    Fast, responsive UI held to production standards on web and
                    native.
                  </p>
                </div>
              </div>
            </ActivityCard>
          </FadeUp>
        </div>

        {/* bottom 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto mb-10">
          <FadeUp className="md:col-span-2">
            <ActivityCard glowSize={300}>
              <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 h-full w-full relative z-10">
                <div className="flex-1 min-w-0 pr-2">
                  <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-white/30 uppercase block mb-1">
                    Modern Stack
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug font-jakarta">
                    Full-stack toolkit
                  </h3>
                  <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-jakarta">
                    Next.js, Laravel and Supabase working together across
                    products.
                  </p>
                </div>
                <FloatingIcons />
              </div>
            </ActivityCard>
          </FadeUp>
          <FadeUp className="md:col-span-3" delay={0.1}>
            <ActivityCard glowSize={300}>
              <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 h-full w-full relative z-10">
                <div className="flex-1 min-w-0 pr-2">
                  <span className="text-[9px] font-mono font-bold tracking-[0.15em] text-white/30 uppercase block mb-1">
                    Collaboration
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug font-jakarta">
                    Git-first team workflow
                  </h3>
                  <p className="text-[11px] text-white/50 mt-1 leading-relaxed font-jakarta">
                    GitHub collaboration, reviews and steady release cadence
                    across six products.
                  </p>
                </div>
                <TrackerViz />
              </div>
            </ActivityCard>
          </FadeUp>
        </div>

        {/* chips */}
        <FadeUp className="flex flex-wrap gap-2.5 justify-center max-w-4xl mx-auto">
          {chips.map((c) => (
            <div
              key={c}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] text-xs text-white/70 tracking-wide font-medium transition-all duration-300 select-none cursor-default"
            >
              <div className="rounded-full bg-[#C2EF3A] flex items-center justify-center text-[#0F0E0E] flex-shrink-0 w-3.5 h-3.5">
                <FiCheck size={9} />
              </div>
              <span>{c}</span>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
