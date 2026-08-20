"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";
import GlowCard from "./GlowCard";
import { Badge, FadeUp } from "./reveal";
import { site } from "@/lib/data";
import { openContactForm } from "./ContactForm";

const cardBg = {
  background:
    "linear-gradient(180deg, rgba(30, 28, 28, 0.45) 0%, rgba(21, 19, 19, 0.9) 100%)",
  boxShadow:
    "0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
};

function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <GlowCard
      className={`group relative overflow-hidden rounded-[30px] border border-white/[0.04] transition-colors duration-300 cursor-pointer select-none ${className}`}
      style={cardBg}
      radius={30}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.01] via-transparent to-white/[0.02] pointer-events-none" />
      {children}
    </GlowCard>
  );
}

function CornerArrow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute bottom-4 right-4 sm:bottom-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/5 bg-neutral-900/60 flex items-center justify-center text-white/30 group-hover:text-white group-hover:bg-neutral-950 group-hover:border-white/15 transition-all duration-300 ${className}`}
    >
      <FiArrowUpRight size={14} />
    </div>
  );
}

/* dome arc over the section header */
function Dome() {
  return (
    <FadeUp
      className="relative mx-auto -mt-1 -mb-8 sm:-mb-10 md:-mb-12 w-[480px] sm:w-[640px] md:w-[800px] h-[165px] sm:h-[220px] md:h-[265px] pointer-events-none overflow-visible z-10 max-w-full"
      amount={0.2}
    >
      <svg viewBox="0 0 800 265" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="domeWhite" x1="0" x2="800" y1="0" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.35" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="0.65" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="domeOrange" x1="0" x2="800" y1="0" y2="0">
            <stop offset="0" stopColor="#ff6b3d" stopOpacity="0" />
            <stop offset="0.25" stopColor="#ff6b3d" stopOpacity="0.9" />
            <stop offset="0.75" stopColor="#ff6b3d" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ff6b3d" stopOpacity="0" />
          </linearGradient>
          <filter id="domeBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <path
          d="M 40 240 Q 400 -60 760 240"
          stroke="url(#domeOrange)"
          strokeWidth="10"
          filter="url(#domeBlur)"
          opacity="0.65"
        />
        <path
          d="M 60 235 Q 400 -45 740 235"
          stroke="url(#domeOrange)"
          strokeWidth="2.5"
        />
        <path
          d="M 100 225 Q 400 -30 700 225"
          stroke="url(#domeWhite)"
          strokeWidth="2.5"
        />
      </svg>
    </FadeUp>
  );
}

/* animated visitor counter */
function Visitors() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const target = 1200;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <span ref={ref}>
      {val >= 1000 ? `${(val / 1000).toFixed(1)}K` : val}
    </span>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative z-20 w-full bg-[#0F0E0E] overflow-x-clip pb-12 rounded-t-[32px] md:rounded-t-[48px] lg:rounded-t-[64px] border-t border-white/15 shadow-[0_-24px_48px_rgba(0,0,0,0.8)]"
      aria-label={`About ${site.name} - ${site.role}`}
    >
      <div className="pt-0 pb-4 sm:pb-8 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 w-full">
        {/* header */}
        <div className="text-center mb-12 md:mb-16">
          <Dome />
          <Badge color="#ff6b3d">Get to Know Me</Badge>
          <FadeUp delay={0.1}>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] font-black tracking-[-0.03em] leading-[0.9] text-white"
              style={{ fontFamily: '"Plus Jakarta Sans", var(--font-jakarta), sans-serif' }}
            >
              Turning ideas into{" "}
              <span className="font-bold px-1 text-white animate-pulse">
                reality
              </span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p
              className="text-lg sm:text-xl md:text-2xl mt-4 max-w-2xl mx-auto italic"
              style={{
                fontFamily:
                  'var(--font-playfair), "Playfair Display", Georgia, serif',
                color: "rgba(255,255,255,0.95)",
              }}
            >
              Developer by day, problem solver by nature. Let&apos;s build
              something amazing together.
            </p>
          </FadeUp>
        </div>

        {/* bento grid */}
        <div className="grid grid-cols-4 gap-4 xs:gap-5 md:gap-6 max-w-6xl mx-auto w-full font-jakarta">
          {/* profile — large card */}
          <FadeUp className="col-span-4 md:col-span-2 row-span-2 md:h-full" amount={0.2}>
            <CardShell className="p-4 xs:p-4.5 sm:p-5 flex flex-col justify-between h-full">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center sm:justify-between h-full w-full">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-tl-[30px] rounded-br-[30px] overflow-hidden flex-shrink-0 bg-gradient-to-br from-[#FF8C00] via-[#FF5F00] to-[#F43F5E] shadow-lg">
                    <Image
                      src="/images/profile/me.png"
                      alt={site.name}
                      fill
                      sizes="144px"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-[#0c0b0b]/15 pointer-events-none" />
                  </div>
                  <div className="text-center sm:text-left flex flex-col justify-center flex-1">
                    <span className="text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block mb-1">
                      A {site.role}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                      {site.name}.
                    </h2>
                    <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-xs">
                      I build production web &amp; native applications — in
                      code and in Bubble — with layouts people love to use.
                    </p>
                    <div className="mt-3 flex justify-center sm:justify-start">
                      <a
                        href="/resume"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#ff6b3d]/40 bg-[#ff6b3d]/[0.06] text-[11px] font-semibold text-white/80 hover:text-white hover:bg-[#ff6b3d]/[0.14] hover:border-[#ff6b3d]/70 transition-all duration-300"
                      >
                        View Resume
                        <FiArrowUpRight size={11} className="text-[#ff6b3d]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <CornerArrow />
            </CardShell>
          </FadeUp>

          {/* marquee card */}
          <FadeUp className="col-span-4 md:col-span-2" delay={0.05} amount={0.2}>
            <CardShell className="p-3 sm:p-4 flex items-center h-full">
              <div className="flex w-full items-center justify-between overflow-hidden relative">
                <div className="flex whitespace-nowrap animate-marquee py-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-[0.1em] text-white/40 uppercase">
                  <span>
                    Next.js Expert • Bubble &amp; Native • Product Builder •
                    Full-Stack Ready • Next.js Expert • Bubble &amp; Native •
                  </span>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-full bg-gradient-to-l from-[#171515] to-transparent pointer-events-none" />
              </div>
            </CardShell>
          </FadeUp>

          {/* visitors */}
          <FadeUp className="col-span-2 md:col-span-1" delay={0.1} amount={0.2}>
            <CardShell className="p-4 xs:p-4.5 sm:p-5 flex flex-col justify-between h-36 sm:h-38 md:h-40">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex flex-col justify-center pt-1.5 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-emerald-400">
                      Live Now
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-outfit">
                    <Visitors />
                  </div>
                </div>
                <div className="pr-10 pt-1">
                  <span className="text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block">
                    Stats Counter
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                    Profile Visitors
                  </h3>
                </div>
              </div>
              <CornerArrow />
            </CardShell>
          </FadeUp>

          {/* projects preview stack */}
          <FadeUp className="col-span-2 md:col-span-1" delay={0.15} amount={0.2}>
            <CardShell className="p-4 xs:p-4.5 sm:p-5 flex flex-col justify-between h-36 sm:h-38 md:h-40 group/project">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="relative w-full h-16 sm:h-18 pt-1 flex items-center justify-center pointer-events-none">
                  <div className="absolute w-20 h-12 sm:w-24 sm:h-14 rounded-lg overflow-hidden border border-white/10 shadow-lg bg-neutral-900 transition-all duration-500 ease-out -translate-x-3 -rotate-12 opacity-40 group-hover/project:-translate-x-6 group-hover/project:opacity-70">
                    <Image
                      src="/images/projects/daycare.svg"
                      alt="Project preview"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute w-20 h-12 sm:w-24 sm:h-14 rounded-lg overflow-hidden border border-white/15 shadow-xl bg-neutral-900 transition-all duration-500 ease-out translate-x-3 rotate-12 opacity-60 group-hover/project:translate-x-6 group-hover/project:opacity-85">
                    <Image
                      src="/images/projects/zora.svg"
                      alt="Project preview"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="relative w-24 h-14 sm:w-28 sm:h-16 rounded-xl overflow-hidden border border-white/20 shadow-[0_10px_24px_rgba(0,0,0,0.6)] bg-neutral-950 z-10 transition-all duration-500 ease-out group-hover/project:scale-105 group-hover/project:-translate-y-1">
                    <Image
                      src="/images/projects/tillsee.svg"
                      alt="Featured project"
                      fill
                      className="object-cover object-top opacity-90 group-hover/project:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-white/10" />
                    <div className="absolute bottom-1 left-1.5 right-1.5 flex items-center justify-between">
                      <span className="text-[7.5px] font-mono font-bold text-white/90 truncate max-w-[70px]">
                        Tillsee
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" />
                    </div>
                  </div>
                </div>
                <div className="pr-10 pt-1">
                  <span className="text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block">
                    Showcase
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                    Projects
                  </h3>
                </div>
              </div>
              <CornerArrow />
            </CardShell>
          </FadeUp>

          {/* core expertise chips */}
          <FadeUp className="col-span-2 md:col-span-1" delay={0.2} amount={0.2}>
            <CardShell className="p-4 sm:p-5 flex flex-col justify-between h-36 sm:h-38 md:h-40">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex flex-col justify-between h-full w-full">
                  <div>
                    <span className="text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block mb-1.5 text-center">
                      Core Expertise
                    </span>
                    <div className="flex flex-col gap-2.5 sm:gap-3 items-center w-full mt-2">
                      <div className="flex justify-center">
                        {["Next.js"].map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                      <div className="flex justify-center gap-2 sm:gap-2.5">
                        {["React", "Tailwind"].map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                      <div className="flex justify-center gap-2 sm:gap-2.5">
                        {["Bubble", "Laravel", "Supabase"].map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardShell>
          </FadeUp>

          {/* services offering */}
          <FadeUp className="col-span-4 md:col-span-2" delay={0.25} amount={0.2}>
            <CardShell className="p-4 xs:p-4.5 sm:p-5 flex flex-col justify-between h-36 sm:h-38 md:h-40">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-full w-full pr-8 sm:pr-10">
                  <div className="flex flex-col justify-center text-left w-full sm:w-auto">
                    <span className="text-[9px] sm:text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block">
                      Specialization
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1 leading-tight">
                      Services Offering
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full sm:w-auto max-w-[280px]">
                    {["Web Apps", "Native Apps", "Backends", "Bubble Builds"].map(
                      (s) => (
                        <div
                          key={s}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08] transition-colors duration-300"
                        >
                          <span className="text-[9px] sm:text-[10px] text-white/70 font-semibold font-jakarta leading-none">
                            {s}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <CornerArrow />
            </CardShell>
          </FadeUp>

          {/* socials */}
          <FadeUp className="col-span-2 md:col-span-1" delay={0.3} amount={0.2}>
            <CardShell className="p-4 xs:p-4.5 sm:p-5 flex flex-col justify-between h-36 sm:h-38 md:h-40 group/socials">
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3 pt-2 flex-1 z-10">
                  <a
                    href={site.socials.github}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/50 transition-all duration-300 active:scale-95 hover:bg-white/10 hover:border-white/20 hover:text-white hover:shadow-[0_0_16px_rgba(255,255,255,0.25)]"
                    style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.03)" }}
                  >
                    <FiGithub size={16} />
                  </a>
                  <a
                    href={site.socials.linkedin}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/50 transition-all duration-300 active:scale-95 hover:bg-[#0A84FF]/15 hover:border-[#0A84FF]/30 hover:text-[#0A84FF] hover:shadow-[0_0_16px_rgba(10,132,255,0.35)]"
                    style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.03)" }}
                  >
                    <FiLinkedin size={16} />
                  </a>
                  <a
                    href={site.socials.instagram}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/50 transition-all duration-300 active:scale-95 hover:bg-[#FF2D55]/15 hover:border-[#FF2D55]/30 hover:text-[#FF2D55] hover:shadow-[0_0_16px_rgba(255,45,85,0.35)]"
                    style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.03)" }}
                  >
                    <FiInstagram size={16} />
                  </a>
                </div>
                <div className="pr-10 pt-1 z-10">
                  <span className="text-[10px] font-mono font-medium tracking-[0.15em] text-white/30 uppercase block">
                    Stay Connected
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                    Profiles
                  </h3>
                </div>
              </div>
              <CornerArrow />
            </CardShell>
          </FadeUp>

          {/* stats row */}
          <FadeUp className="col-span-4 md:col-span-2" delay={0.35} amount={0.2}>
            <CardShell className="flex flex-col justify-between p-4 sm:p-5 h-36 sm:h-38 md:h-40">
              <div className="flex gap-3 sm:gap-4 w-full h-full pt-1.5">
                {[
                  ["01+", "Years", "Experience"],
                  ["10+", "Tech Stack", "Skills"],
                  ["06+", "Total", "Projects"],
                ].map(([n, a, b]) => (
                  <div
                    key={a}
                    className="flex-1 flex flex-col justify-center items-center py-2.5 sm:py-3 rounded-2xl border border-white/[0.02]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(20, 19, 19, 0.6) 0%, rgba(12, 11, 11, 0.9) 100%)",
                      boxShadow: "inset 0 1px 0 0 rgba(255, 255, 255, 0.01)",
                    }}
                  >
                    <span className="text-xl sm:text-2xl font-black text-white/90 tracking-tight font-outfit">
                      {n}
                    </span>
                    <span className="text-[9px] font-semibold text-white/20 uppercase tracking-widest mt-1 block">
                      {a}
                    </span>
                    <span className="text-[8px] font-medium text-white/20 uppercase tracking-wider block">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </CardShell>
          </FadeUp>

          {/* let's work together */}
          <FadeUp className="col-span-4 md:col-span-2 md:h-full" delay={0.4} amount={0.2}>
            <button
              onClick={openContactForm}
              className="block h-full w-full text-left"
              aria-label="Open contact form"
            >
              <CardShell className="p-4 sm:p-5 flex flex-col justify-between min-h-[150px] md:h-full">
                <div className="text-white/20 group-hover:text-orange-400 transition-colors duration-300">
                  <FiArrowUpRight size={18} />
                </div>
                <div className="pr-12 pt-4">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.05] text-white mb-2 font-jakarta">
                    Let&apos;s
                    <br />
                    work{" "}
                    <span
                      className="font-normal text-white/90 lowercase pr-1"
                      style={{
                        fontFamily: "var(--font-instrument)",
                        fontStyle: "italic",
                      }}
                    >
                      together.
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm text-white/55 leading-relaxed max-w-xs font-jakarta mt-2">
                    Have a project in mind? Reach out and let&apos;s craft
                    something exceptional.
                  </p>
                </div>
                <CornerArrow className="!bottom-6 !right-6 w-9 h-9 sm:w-10 sm:h-10" />
              </CardShell>
            </button>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300">
      <span className="text-[8px] sm:text-[9px] text-white/60 font-medium font-jakarta">
        {children}
      </span>
    </div>
  );
}
