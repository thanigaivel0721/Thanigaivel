"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/** Section badge that pops in: opacity 0, y 15, scale .7 -> visible */
export function Badge({
  color,
  children,
}: {
  color: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.7 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4 text-xs font-semibold tracking-wider uppercase font-outfit"
      style={{ color }}
    >
      <div
        className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[#0F0E0E] flex-shrink-0"
        style={{ background: color }}
      >
        <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
          <circle cx="4" cy="4" r="2" />
        </svg>
      </div>
      <span>{children}</span>
    </motion.div>
  );
}

/** Word-by-word rise reveal (translateY(102%) -> 0 inside overflow-hidden spans) */
export function WordRise({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h2" | "h3" | "p" | "div";
  style?: React.CSSProperties;
}) {
  const words = text.split(" ");
  const M = motion.create(Tag as "div");
  return (
    <M
      className={`${className ?? ""} flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.05em]`}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden py-0.5">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: "102%" },
              show: {
                opacity: 1,
                y: "0%",
                transition: {
                  duration: 0.7,
                  delay: delay + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

/** Word-by-word 3D flip reveal (translateY(105%) rotateX(70deg) -> 0) */
export function WordFlip({
  text,
  className,
  delay = 0,
  wordClassName,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  wordClassName?: string;
  style?: React.CSSProperties;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={`${className ?? ""} flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.05em]`}
      style={{ perspective: 1200, ...style }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden py-1">
          <motion.span
            className={`inline-block origin-top text-white ${wordClassName ?? ""}`}
            variants={{
              hidden: { opacity: 0, y: "105%", rotateX: 70 },
              show: {
                opacity: 1,
                y: "0%",
                rotateX: 0,
                transition: {
                  duration: 0.8,
                  delay: delay + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Generic fade-up reveal */
export function FadeUp({
  children,
  delay = 0,
  y = 15,
  className,
  style,
  amount = 0.4,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  amount?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export const easeOutExpo: Variants = {};
