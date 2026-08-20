"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiAward } from "react-icons/fi";
import { FadeUp } from "./reveal";
import { milestones, site } from "@/lib/data";

const tilts = [
  { className: "left-[2%] top-[2%]", rotate: -6, delay: 0.15 },
  { className: "right-[2%] top-[4%]", rotate: 5, delay: 0.3 },
  { className: "left-[4%] bottom-[4%]", rotate: 4, delay: 0.45 },
  { className: "right-[4%] bottom-[2%]", rotate: -5, delay: 0.6 },
];

function MilestoneCard({
  m,
  tilt,
}: {
  m: (typeof milestones)[number];
  tilt: (typeof tilts)[number];
}) {
  const Wrapper = m.href ? "a" : "div";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt.rotate, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: tilt.delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 30 }}
      className={`absolute ${tilt.className} hidden lg:block w-[272px] cursor-pointer`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <Wrapper
        {...(m.href ? { href: m.href, target: "_blank", rel: "noreferrer" } : {})}
        className="block group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#1c1f26] via-[#16181d] to-[#121419] border border-white/10 p-4 pb-0 select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_2px_4px_rgba(0,0,0,0.45),0_20px_44px_-18px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,197,110,0.07)]"
      >
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/[0.055] to-transparent pointer-events-none" />
        <div className="absolute inset-0 rounded-[28px] border border-white/5 pointer-events-none z-[3]" />
        <span className="absolute left-1/2 top-3 -translate-x-1/2 flex items-center gap-1 text-[#ffb088] text-[9.5px] tracking-wider uppercase font-medium font-mono whitespace-nowrap opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-20">
          <FiAward size={10} /> Verified
        </span>
        <div className="h-[138px] rounded-[17px] relative overflow-hidden mb-1.5 border border-white/[0.07] bg-[#0c0c0d]">
          <Image
            src={m.image}
            alt={m.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute left-3.5 bottom-3 text-[9px] tracking-wider text-white/40 font-mono z-[2]">
            NO. {m.no}
          </span>
          <div className="absolute right-3 bottom-[-16px] w-[46px] h-[46px] rounded-full flex items-center justify-center bg-gradient-to-br from-white/[0.12] to-white/[0.02] backdrop-blur-[6px] border border-white/[0.14] shadow-[0_8px_18px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] z-[3] text-[#ffcf8f]">
            <FiAward size={18} />
          </div>
        </div>
        <div className="pt-0.5 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="inline-block text-[9.5px] font-semibold tracking-wider uppercase py-1 px-2.5 rounded-[6px] text-[#ffcf8f] bg-[#ffc56e]/[0.14]">
              {m.org}
            </span>
            <span className="text-[11px] text-white/40 tracking-wider font-mono">
              {m.year}
            </span>
          </div>
          <p className="text-[15px] font-semibold leading-[1.35] text-[#f2f1ee] m-0">
            {m.title}
          </p>
        </div>
        <div className="relative -mx-4 px-4 py-3 flex items-center justify-between border-t border-dashed border-white/10">
          <div className="absolute left-[-8px] top-[-8px] w-4 h-4 rounded-full bg-[#0F0E0E]" />
          <div className="absolute right-[-8px] top-[-8px] w-4 h-4 rounded-full bg-[#0F0E0E]" />
          <span className="flex items-center gap-1.5 text-[10.5px] tracking-wider uppercase text-white/60 font-mono group-hover:text-white transition-colors duration-300">
            {m.href ? "View Certificate" : "Explore Milestones"}{" "}
            <FiArrowUpRight size={11} />
          </span>
        </div>
      </Wrapper>
    </motion.div>
  );
}

export default function Milestones() {
  return (
    <div className="relative py-16 sm:py-24 bg-[#0F0E0E] overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 min-h-[560px] lg:min-h-[620px] flex items-center justify-center">
        {milestones.map((m, i) => (
          <MilestoneCard key={m.no} m={m} tilt={tilts[i]} />
        ))}

        {/* center copy */}
        <div className="relative z-10 text-center max-w-md mx-auto">
          <FadeUp>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-5 text-[#ffcf8f] text-[10px] font-semibold tracking-[0.2em] uppercase font-mono">
              <FiAward size={11} /> Professional Milestones
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="text-5xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] leading-[0.95] text-white"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Milestones
              <br />
              <span className="text-[#ff6b3d]">&amp; Highlights</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-sm sm:text-base text-white/50 mt-5 leading-relaxed">
              A visual journey through shipped products, internships and the
              work behind them.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex items-center justify-center gap-2 mt-6 text-[10px] font-mono tracking-[0.15em] uppercase text-white/40">
              <span>01 certification</span>
              <span className="text-white/20">◆</span>
              <span>06 launches</span>
              <span className="text-white/20">◆</span>
              <span>2024–26</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <a
              href="/certificates/bubble-developer-certificate.pdf"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-full border border-[#ff6b3d]/40 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-white hover:bg-[#ff6b3d]/10 hover:border-[#ff6b3d]/70 transition-all duration-300"
            >
              View Credentials{" "}
              <FiArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </FadeUp>
        </div>

        {/* mobile: stacked cards */}
        <div className="lg:hidden absolute inset-x-0 -bottom-2 hidden" />
      </div>

      {/* mobile list */}
      <div className="lg:hidden max-w-md mx-auto px-4 mt-10 grid grid-cols-1 xs:grid-cols-2 gap-4">
        {milestones.map((m) => (
          <FadeUp key={m.no}>
            <div className="rounded-[22px] bg-gradient-to-br from-[#1c1f26] via-[#16181d] to-[#121419] border border-white/10 p-3">
              <div className="h-[110px] rounded-[14px] relative overflow-hidden mb-2 border border-white/[0.07] bg-[#0c0c0d]">
                <Image src={m.image} alt={m.title} fill className="object-cover" />
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="inline-block text-[9px] font-semibold tracking-wider uppercase py-0.5 px-2 rounded-[6px] text-[#ffcf8f] bg-[#ffc56e]/[0.14]">
                  {m.org}
                </span>
                <span className="text-[10px] text-white/40 font-mono">{m.year}</span>
              </div>
              <p className="text-[13px] font-semibold leading-snug text-[#f2f1ee]">
                {m.title}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
