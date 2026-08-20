"use client";

import { FiGithub } from "react-icons/fi";
import { FadeUp, WordRise } from "./reveal";
import { site } from "@/lib/data";

/* deterministic PRNG so server & client render identical grids */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LEVELS = ["#161B22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const MONTHS = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

const rand = mulberry32(20260818);
const WEEKS = 52;
const grid: number[][] = Array.from({ length: WEEKS }, (_, w) =>
  Array.from({ length: 7 }, () => {
    const r = rand();
    // busier recent months
    const bias = w / WEEKS;
    const v = r + bias * 0.35;
    if (v < 0.45) return 0;
    if (v < 0.68) return 1;
    if (v < 0.85) return 2;
    if (v < 0.96) return 3;
    return 4;
  })
);
const total = grid.flat().filter((v) => v > 0).length * 2 + 137;

export default function Github() {
  return (
    <section className="relative z-20 py-12 xs:py-16 sm:py-20 px-4 xs:px-5 sm:px-6 bg-[#0F0E0E]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <FadeUp>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4 text-white/70 text-[11px] font-semibold tracking-[0.18em] uppercase font-mono">
              <FiGithub size={12} /> Open Source
            </div>
          </FadeUp>
          <WordRise
            text="My code contributions"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] leading-[0.95] text-white"
            style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800 }}
          />
          <FadeUp delay={0.2}>
            <p className="text-sm sm:text-base text-white/50 mt-4">
              Consistent contributions and continuous learning
            </p>
          </FadeUp>
        </div>

        <FadeUp amount={0.2}>
          <div
            className="max-w-4xl mx-auto rounded-[24px] border border-white/[0.06] p-5 sm:p-7 overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(24, 22, 22, 0.6) 0%, rgba(14, 13, 13, 0.95) 100%)",
              boxShadow:
                "0 8px 32px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.04)",
            }}
          >
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <FiGithub size={17} className="text-white/70" />
                <span className="text-base sm:text-lg font-bold text-white font-jakarta">
                  {site.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-mono">
                <span className="mr-1">Less</span>
                {LEVELS.map((c) => (
                  <span
                    key={c}
                    className="w-2.5 h-2.5 rounded-[3px]"
                    style={{ background: c }}
                  />
                ))}
                <span className="ml-1">More</span>
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="min-w-[720px]">
                <div className="flex text-[9px] text-white/35 font-mono mb-1.5 pl-0.5">
                  {MONTHS.map((m) => (
                    <span key={m} style={{ width: `${100 / 12}%` }}>
                      {m}
                    </span>
                  ))}
                </div>
                <div className="flex gap-[3px]">
                  {grid.map((week, w) => (
                    <div key={w} className="flex flex-col gap-[3px] flex-1">
                      {week.map((lvl, d) => (
                        <div
                          key={d}
                          className="aspect-square w-full rounded-[3px] transition-colors duration-200 hover:outline hover:outline-1 hover:outline-white/40"
                          style={{ background: LEVELS[lvl] }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.05] text-[11px] font-mono text-white/40 flex-wrap gap-2">
              <span>
                <b className="text-white/80">{total}</b> contributions in the
                last year
              </span>
              <span className="text-white/25">Sep 2025 — Aug 2026</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
