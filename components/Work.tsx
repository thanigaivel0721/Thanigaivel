"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiInfo, FiArrowRight, FiX, FiCheck, FiLayers } from "react-icons/fi";
import { Badge, WordFlip, FadeUp } from "./reveal";
import { projects, site, type Project } from "@/lib/data";

const ROSE = "#F43F5E";

const filters = [
  { key: "all", label: "All" },
  { key: "bubble", label: "Bubble & Native" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "web", label: "Web Apps" },
] as const;

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 1300);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function ProjectCard({
  p,
  index,
  onOpen,
}: {
  p: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <article
        onClick={() => onOpen(p)}
        className="group relative overflow-hidden bg-[#141416]/75 backdrop-blur-2xl border border-white/[0.08] hover:border-white/[0.18] rounded-[32px] flex flex-col h-full transition-all duration-300 cursor-pointer"
        style={{
          willChange: "transform",
          boxShadow:
            "inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 12px 36px -8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="p-3.5 pb-0 select-none">
          <div className="relative aspect-[1.65] rounded-[22px] overflow-hidden bg-[#0A0A0C] border border-white/[0.08] shadow-inner">
            <Image
              src={p.image}
              alt={`${p.title} screenshot`}
              fill
              className="object-cover object-top transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold font-mono tracking-widest bg-gradient-to-r from-[#FF8C00] to-[#F43F5E] bg-clip-text text-transparent uppercase mb-0.5 truncate">
                  {p.tagline}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight font-jakarta text-white truncate transition-colors duration-300">
                  {p.title}
                </h3>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpen(p);
                }}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-[#FF8C00]/20 hover:border-[#FF8C00]/40 border border-white/[0.1] flex items-center justify-center flex-shrink-0 text-white/60 hover:text-[#FF8C00] transition-all duration-200 cursor-pointer shadow-sm"
                aria-label={`View details for ${p.title}`}
              >
                <FiInfo size={13} />
              </button>
            </div>
            <p className="text-white/60 text-xs sm:text-[13px] font-outfit leading-relaxed line-clamp-2 mb-4">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] rounded-full bg-white/[0.04] border border-white/[0.06] text-white/70 font-outfit font-semibold transition-all duration-200 hover:bg-white/[0.08] hover:text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="w-full h-px bg-white/[0.06] mb-3.5" />
            <div className="flex items-center justify-between select-none">
              <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/35 group-hover:text-white/60 transition-colors duration-300">
                {p.year}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-outfit font-semibold text-white/60 group-hover:text-[#FF8C00] transition-colors duration-300">
                View Details
                <FiArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

function ProjectModal({
  p,
  onClose,
}: {
  p: Project | null;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!p) return;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [p, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {p && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${p.title} details`}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[86vh] overflow-y-auto scrollbar-hide rounded-[32px] border border-white/[0.1] bg-[#141416]/95 backdrop-blur-2xl"
            style={{
              boxShadow:
                "inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 24px 80px -12px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* cover */}
            <div className="p-3.5 pb-0">
              <div className="relative aspect-[1.9] rounded-[22px] overflow-hidden bg-[#0A0A0C] border border-white/[0.08]">
                <Image
                  src={p.image}
                  alt={`${p.title} cover`}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            <div className="px-5 sm:px-7 pt-5">
              <span className="block text-[10px] font-bold font-mono tracking-widest bg-gradient-to-r from-[#FF8C00] to-[#F43F5E] bg-clip-text text-transparent uppercase mb-0.5">
                {p.tagline}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-jakarta text-white">
                {p.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 border border-white/[0.15] flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 backdrop-blur-md"
            >
              <FiX size={15} />
            </button>

            <div className="p-5 sm:p-7">
              <p className="text-white/60 text-[13px] sm:text-sm font-outfit leading-relaxed mb-6">
                {p.description}
              </p>

              <div className="mb-6">
                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-[#FF8C00] font-mono font-bold mb-2.5">
                  <FiLayers size={11} /> How it works
                </p>
                <p className="text-white/70 text-[13px] sm:text-sm font-outfit leading-relaxed">
                  {p.how}
                </p>
              </div>

              <div className="mb-6">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#FF8C00] font-mono font-bold mb-3">
                  What I worked on
                </p>
                <ul className="flex flex-col gap-2">
                  {p.workedOn.map((w) => (
                    <li
                      key={w}
                      className="flex items-start gap-2.5 text-white/70 text-[13px] sm:text-sm font-outfit leading-relaxed"
                    >
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-[#FF8C00]/15 border border-[#FF8C00]/30 flex items-center justify-center text-[#FF8C00] flex-shrink-0">
                        <FiCheck size={9} />
                      </span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-full h-px bg-white/[0.06] mb-5" />
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-2.5 py-1 text-[10px] rounded-full bg-white/[0.04] border border-white/[0.06] text-white/70 font-outfit font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase text-white/35">
                  {p.year}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function Work() {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const shown =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="work"
      className="relative z-20 py-16 sm:py-20 md:py-28 lg:py-32 bg-[#0F0E0E] overflow-hidden"
      aria-label="Featured Projects Portfolio"
      style={{ contain: "layout style" }}
    >
      <div className="container mx-auto px-4 sm:px-6 mb-10 sm:mb-12">
        <div className="text-center max-w-4xl mx-auto">
          <Badge color={ROSE}>Portfolio</Badge>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.02em] leading-[0.95] mb-4 sm:mb-5">
            <WordFlip
              text="Architected Digital Products"
              wordClassName="font-black"
              style={{ fontFamily: "var(--font-jakarta)" }}
            />
          </h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex justify-center mb-5 sm:mb-6 origin-center"
          >
            <div
              className="h-[2px] w-20 sm:w-28 md:w-36"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #FF8C00, #FF1493, #FF8C00, transparent)",
              }}
            />
          </motion.div>
          <FadeUp delay={0.3}>
            <p className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto font-outfit">
              A curated collection of production applications showcasing modern
              web technologies, Bubble builds and native experiences.
            </p>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="flex items-center justify-center gap-6 xs:gap-8 sm:gap-14 md:gap-16 mt-8 sm:mt-10 md:mt-12 select-none">
              <div className="text-center">
                <span className="block text-4xl xs:text-5xl sm:text-6xl font-black font-outfit text-white tracking-tight leading-none mb-1.5 sm:mb-2">
                  <Counter to={6} />
                </span>
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest font-bold">
                  Projects
                </span>
              </div>
              <div className="w-px h-10 sm:h-12 bg-white/10" />
              <div className="text-center">
                <span className="block text-4xl xs:text-5xl sm:text-6xl font-black font-outfit text-white tracking-tight leading-none mb-1.5 sm:mb-2">
                  <Counter to={15} suffix="+" />
                </span>
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest font-bold">
                  Technologies
                </span>
              </div>
              <div className="w-px h-10 sm:h-12 bg-white/10" />
              <div className="text-center">
                <span className="block text-4xl xs:text-5xl sm:text-6xl font-black font-outfit text-white tracking-tight leading-none mb-1.5 sm:mb-2">
                  <Counter to={6} />
                </span>
                <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest font-bold">
                  Industries
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* filter pills */}
      <FadeUp className="flex justify-center mb-10 sm:mb-14 px-4 sm:px-0">
        <div className="relative flex items-center bg-[#0d0d0f]/80 backdrop-blur-xl border border-white/[0.06] rounded-full p-[3px] max-w-md w-full sm:w-auto overflow-hidden">
          {filters.map((f, i) => {
            const on = filter === f.key;
            return (
              <div key={f.key} className="flex-1 sm:flex-initial flex items-center">
                <button
                  onClick={() => setFilter(f.key)}
                  className={`relative flex-1 sm:flex-initial w-full sm:w-auto px-4 sm:px-6 py-2 text-xs sm:text-[13px] font-semibold rounded-full text-center cursor-pointer transition-all duration-200 z-[1] select-none font-outfit whitespace-nowrap ${
                    on
                      ? "text-neutral-950 font-bold"
                      : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {on && (
                    <motion.div
                      layoutId="work-filter-pill"
                      className="absolute inset-0 bg-white rounded-full z-[-1]"
                      style={{
                        boxShadow:
                          "0 2px 6px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1), inset 0 0.5px 0 rgba(255, 255, 255, 0.4)",
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  {f.label}
                </button>
                {i < filters.length - 1 && (
                  <div className="w-[1px] h-3.5 bg-white/[0.08] self-center transition-all duration-200" />
                )}
              </div>
            );
          })}
        </div>
      </FadeUp>

      {/* grid */}
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <ProjectCard key={p.slug} p={p} index={i} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* explore more */}
      <div className="container mx-auto px-4 sm:px-6 mt-16 sm:mt-20 md:mt-24 flex flex-col items-center justify-center">
        <div
          className="w-px h-12 mb-8"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent)",
          }}
        />
        <a
          href={site.socials.github}
          className="group relative inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-white/[0.08] hover:bg-white/[0.14] active:bg-white/[0.18] backdrop-blur-xl border border-white/[0.12] hover:border-white/[0.22] transition-all duration-300 cursor-pointer select-none font-jakarta"
          style={{
            boxShadow:
              "0 6px 20px -4px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)",
          }}
        >
          <span className="tracking-wide text-white/90 group-hover:text-white transition-colors">
            Explore More Projects
          </span>
          <div className="w-5 h-5 rounded-full bg-white/[0.1] group-hover:bg-white/[0.2] flex items-center justify-center transition-colors duration-200">
            <FiArrowRight size={11} />
          </div>
        </a>
      </div>

      <ProjectModal p={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
