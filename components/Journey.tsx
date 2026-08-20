"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiCode,
  FiServer,
  FiBriefcase,
  FiSend,
  FiTrendingUp,
} from "react-icons/fi";
import { Badge, WordRise, FadeUp } from "./reveal";
import { journey } from "@/lib/data";

const PURPLE = "#BF5AF2";
const icons: Record<string, React.ComponentType<{ size?: number }>> = {
  code: FiCode,
  server: FiServer,
  briefcase: FiBriefcase,
  rocket: FiSend,
  vision: FiTrendingUp,
};

function Dot({ last }: { last?: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="w-3 h-3 rounded-full relative z-10"
      style={{
        background: PURPLE,
        boxShadow:
          "0 0 20px rgba(191, 90, 242, 0.5), 0 0 40px rgba(191, 90, 242, 0.2)",
      }}
    >
      {last && (
        <>
          <span
            className="absolute inset-0 rounded-full timeline-pulse-1"
            style={{ background: PURPLE }}
          />
          <span
            className="absolute inset-0 rounded-full timeline-pulse-2"
            style={{ background: PURPLE }}
          />
        </>
      )}
    </motion.div>
  );
}

function Entry({
  item,
  index,
}: {
  item: (typeof journey)[number];
  index: number;
}) {
  const left = index % 2 === 0;
  const Icon = icons[item.icon] ?? FiCode;
  const last = index === journey.length - 1;

  const copy = (
    <div className="group cursor-default">
      <div
        className={`inline-flex items-center gap-2 mb-2 transition-transform duration-200 ${left ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
      >
        {left ? (
          <>
            <span className="text-xs font-bold tracking-wider" style={{ color: PURPLE }}>
              {item.year}
            </span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-[#BF5AF2] to-transparent" />
          </>
        ) : (
          <>
            <div className="w-8 h-[1px] bg-gradient-to-r from-[#BF5AF2] to-transparent" />
            <span className="text-xs font-bold tracking-wider" style={{ color: PURPLE }}>
              {item.year}
            </span>
          </>
        )}
      </div>
      <div
        className={`flex items-center gap-3 mb-2 ${left ? "justify-end" : ""}`}
      >
        {left ? (
          <>
            <h4 className="text-lg font-bold text-white group-hover:text-[#BF5AF2] transition-colors duration-300 font-jakarta">
              {item.title}
            </h4>
            <div className="w-9 h-9 rounded-lg bg-[#BF5AF2]/10 border border-[#BF5AF2]/20 flex items-center justify-center text-[#BF5AF2] group-hover:bg-[#BF5AF2]/20 group-hover:border-[#BF5AF2]/40 transition-all duration-300">
              <Icon size={15} />
            </div>
          </>
        ) : (
          <>
            <div className="w-9 h-9 rounded-lg bg-[#BF5AF2]/10 border border-[#BF5AF2]/20 flex items-center justify-center text-[#BF5AF2] group-hover:bg-[#BF5AF2]/20 group-hover:border-[#BF5AF2]/40 transition-all duration-300">
              <Icon size={15} />
            </div>
            <h4 className="text-lg font-bold text-white group-hover:text-[#BF5AF2] transition-colors duration-300 font-jakarta">
              {item.title}
            </h4>
          </>
        )}
      </div>
      <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/70 transition-colors duration-300">
        {item.text}
      </p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: left ? -35 : 35, y: 15 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* desktop */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-8 lg:items-center">
        {left ? (
          <>
            <div className="text-right">{copy}</div>
            <div className="relative flex justify-center">
              <Dot last={last} />
            </div>
            <div className="opacity-0 pointer-events-none" />
          </>
        ) : (
          <>
            <div className="opacity-0 pointer-events-none" />
            <div className="relative flex justify-center">
              <Dot last={last} />
            </div>
            <div className="text-left">{copy}</div>
          </>
        )}
      </div>
      {/* mobile */}
      <div className="lg:hidden flex gap-4">
        <div className="relative flex flex-col items-center">
          <Dot last={last} />
        </div>
        <div className="flex-1 pb-6 group">
          <span className="text-[11px] font-bold tracking-wider" style={{ color: PURPLE }}>
            {item.year}
          </span>
          <div className="flex items-center gap-2.5 mt-1 mb-1.5">
            <div className="w-7 h-7 rounded-md bg-[#BF5AF2]/10 border border-[#BF5AF2]/20 flex items-center justify-center text-[#BF5AF2]">
              <Icon size={13} />
            </div>
            <h4 className="text-base font-bold text-white font-jakarta">
              {item.title}
            </h4>
          </div>
          <p className="text-xs text-white/50 leading-[1.6]">{item.text}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 75%"],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      className="relative py-16 sm:py-20 bg-[#0F0E0E]"
      id="my-journey"
      style={{ contain: "layout style" }}
    >
      <div className="text-center mb-8 xs:mb-10 sm:mb-12 md:mb-16 px-4">
        <Badge color={PURPLE}>The Story So Far</Badge>
        <WordRise
          text="Tracing my path"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] leading-[0.95] text-white"
          style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800 }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6" ref={ref}>
        {/* base line */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/[0.06]" />
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 pointer-events-none">
          <motion.div
            className="w-[2px] origin-top will-change-transform"
            style={{
              background: PURPLE,
              boxShadow: "0 0 10px rgba(191, 90, 242, 0.4)",
              height: lineH,
            }}
          />
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full will-change-transform"
            style={{
              marginTop: -8,
              background: PURPLE,
              boxShadow:
                "0 0 20px rgba(191, 90, 242, 0.8), 0 0 40px rgba(191, 90, 242, 0.4)",
              top: lineH,
            }}
          >
            <div className="absolute inset-1 rounded-full bg-white/80" />
          </motion.div>
        </div>
        {/* mobile line */}
        <div className="lg:hidden absolute left-[17px] top-0 bottom-0 w-[2px] bg-white/[0.06]" />
        <div className="lg:hidden absolute left-[17px] top-0 bottom-0 pointer-events-none">
          <motion.div
            className="w-[2px] origin-top will-change-transform"
            style={{
              background: PURPLE,
              boxShadow: "0 0 8px rgba(191, 90, 242, 0.4)",
              height: lineH,
            }}
          />
        </div>

        <div className="relative space-y-4 lg:space-y-6">
          {journey.map((item, i) => (
            <Entry key={item.year} item={item} index={i} />
          ))}
        </div>

        <FadeUp className="flex justify-center mt-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-[#BF5AF2]/30 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#BF5AF2]/50" />
            </div>
            <span className="text-[10px] text-white/20 uppercase tracking-wider">
              To be continued
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
