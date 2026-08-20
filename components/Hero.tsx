"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiGithub, FiLinkedin, FiInstagram, FiArrowRight } from "react-icons/fi";
import { site } from "@/lib/data";
import { openContactForm } from "./ContactForm";

/** true while the hero can actually be seen (not scrolled past, tab visible) */
function heroVisible() {
  return !document.hidden && window.scrollY < window.innerHeight * 1.3;
}

/* ---------- starfield + shooting stars canvas ---------- */
function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 130 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      tw: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.02 + 0.005,
    }));

    type Meteor = { x: number; y: number; vx: number; vy: number; life: number };
    let meteors: Meteor[] = [];
    let last = 0;
    let raf = 0;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!heroVisible()) return; // hero covered or tab hidden — skip all work

      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.tw += s.sp;
        const a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(s.tw));
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h * 0.85, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }

      if (t - last > 2600 && Math.random() < 0.02) {
        last = t;
        meteors.push({
          x: w * (0.55 + Math.random() * 0.45),
          y: h * Math.random() * 0.3,
          vx: -(4 + Math.random() * 3),
          vy: 4 + Math.random() * 3,
          life: 1,
        });
      }
      meteors = meteors.filter((m) => m.life > 0);
      for (const m of meteors) {
        m.x += m.vx;
        m.y += m.vy;
        m.life -= 0.012;
        const grad = ctx.createLinearGradient(
          m.x,
          m.y,
          m.x - m.vx * 14,
          m.y - m.vy * 14
        );
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * m.life})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 14, m.y - m.vy * 14);
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 z-[11] pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

/* ---------- hero heading + captions ----------
 * animated=true  -> intro animations (the visible layer)
 * animated=false -> static, final-state markup (the inverted cursor-reveal
 *                   layer) so we don't pay for a second animation tree
 */
function HeroContent({
  inverted = false,
  animated = true,
}: {
  inverted?: boolean;
  animated?: boolean;
}) {
  const ink = inverted ? "#000000" : "#ffffff";
  const dim = inverted ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)";
  const iconCls = inverted
    ? "text-black/15 hover:text-black/70"
    : "text-white/15 hover:text-white/80";

  const rows = site.heroRows;
  const rowIcons = [
    { icon: FiGithub, href: site.socials.github, side: "right" as const },
    { icon: FiLinkedin, href: site.socials.linkedin, side: "left" as const },
    { icon: FiInstagram, href: site.socials.instagram, side: "right" as const },
  ];

  let letterIndex = 0;

  return (
    <div className="w-full max-w-[1400px] h-full mx-auto px-4 sm:px-6 md:px-8 text-center pointer-events-auto">
      <div className="relative w-full h-full flex flex-col items-center justify-center py-20">
        {/* corner captions */}
        {[
          {
            cls: "absolute left-[3%] lg:left-[5%] top-[14%] lg:top-[16%] hidden md:block max-w-[210px] lg:max-w-[240px] text-right select-none pointer-events-none font-mono text-[9px] lg:text-[10px] xl:text-[11px] leading-[1.6] tracking-[0.1em]",
            lines: site.captionTopLeft,
            delay: 2.1,
          },
          {
            cls: "absolute right-[3%] lg:right-[5%] bottom-[20%] lg:bottom-[22%] hidden md:block max-w-[215px] lg:max-w-[245px] text-left select-none pointer-events-none font-mono text-[9px] lg:text-[10px] xl:text-[11px] leading-[1.6] tracking-[0.1em]",
            lines: site.captionBottomRight,
            delay: 2.25,
          },
        ].map(({ cls, lines, delay }, ci) =>
          animated ? (
            <motion.div
              key={ci}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay, duration: 0.8 }}
              className={cls}
              style={{ color: dim }}
            >
              {lines[0]}
              <br />
              {lines[1]}
            </motion.div>
          ) : (
            <div key={ci} className={cls} style={{ color: dim }}>
              {lines[0]}
              <br />
              {lines[1]}
            </div>
          )
        )}

        {/* heading */}
        <h1
          className="w-full flex flex-col items-center leading-[0.92] select-none text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[7.5vw] xl:text-[8vw] font-black subpixel-antialiased"
          style={{
            fontFamily: "var(--font-jakarta), sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.045em",
            color: ink,
            textShadow: inverted ? "none" : "0 0 12px rgba(255, 255, 255, 0.25)",
            WebkitTextStroke: inverted
              ? undefined
              : "2.2px rgba(255, 255, 255, 0.9)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #fff calc(100% - 8px), transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, #fff calc(100% - 8px), transparent 100%)",
          }}
          aria-label={`${site.role} ${site.name}`}
        >
          {rows.map((row, r) => {
            const { icon: Icon, href, side } = rowIcons[r];
            const iconInner = (
              <Icon className="w-[0.55em] h-[0.55em]" strokeWidth={1.6} />
            );
            const iconEl = animated ? (
              <motion.a
                key={`icon-${r}`}
                href={href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9 + r * 0.15, duration: 0.5 }}
                className={`cursor-pointer transition-all duration-300 hover:scale-115 ${iconCls}`}
                aria-label={`${site.name} social link`}
              >
                {iconInner}
              </motion.a>
            ) : (
              <span key={`icon-${r}`} className={iconCls}>
                {iconInner}
              </span>
            );
            const letters = (
              <div key={`row-${r}`}>
                <span className="inline-flex">
                  {row.split("").map((ch, i) => {
                    if (!animated) {
                      return (
                        <span key={i} style={{ display: "inline-block", whiteSpace: "pre" }}>
                          {ch}
                        </span>
                      );
                    }
                    const d = 1.15 + letterIndex++ * 0.045;
                    return (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 60, rotateX: 40 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          delay: d,
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{ display: "inline-block", whiteSpace: "pre" }}
                      >
                        {ch}
                      </motion.span>
                    );
                  })}
                </span>
              </div>
            );
            return (
              <div
                key={r}
                className={`flex items-center gap-x-3 sm:gap-x-4 md:gap-x-6 relative ${r > 0 ? "mt-2" : ""}`}
              >
                {side === "left" ? (
                  <>
                    {iconEl}
                    {letters}
                  </>
                ) : (
                  <>
                    {letters}
                    {iconEl}
                  </>
                )}
              </div>
            );
          })}
        </h1>

        {/* CTA */}
        {(() => {
          const btn = (
            <button
              onClick={inverted ? undefined : openContactForm}
              aria-label="Open contact form"
            >
              <div
                className={`group px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 opacity-90 hover:opacity-100 cursor-pointer glowing-border-btn-white ${inverted ? "text-black" : "text-white"}`}
                style={{ pointerEvents: inverted ? "none" : "auto" }}
              >
                <div
                  className={`absolute inset-0 rounded-full z-0 pointer-events-none transition-colors duration-300 ${inverted ? "bg-white" : "bg-[#0F0E0E]/95 backdrop-blur-xl group-hover:bg-[#0F0E0E]"}`}
                />
                <span className="relative z-10">Get in Touch</span>
                <FiArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          );
          const cls =
            "flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0 mt-8 sm:mt-10 md:mt-12 z-30";
          return animated ? (
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={cls}
              aria-label="Primary navigation"
            >
              {btn}
            </motion.nav>
          ) : (
            <nav className={cls} aria-label="Primary navigation">
              {btn}
            </nav>
          );
        })()}
      </div>
    </div>
  );
}

/* ---------- fluid cursor reveal (white inverse layer) ---------- */
function FluidReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = -500;
    let my = -500;
    let x = -500;
    let y = -500;
    let r = 0;
    let target = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) {
        target = 0;
        return;
      }
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
      target = 110;
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => (target = 0), 700);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!heroVisible()) return;
      // fully settled and invisible — nothing to update
      if (r < 0.5 && target === 0) {
        if (el.style.opacity !== "0") el.style.opacity = "0";
        return;
      }
      x += (mx - x) * 0.14;
      y += (my - y) * 0.14;
      r += (target - r) * 0.09;
      const rr = Math.max(0, r);
      const mask = `radial-gradient(circle ${rr}px at ${x}px ${y}px, #000 0%, #000 62%, transparent 100%)`;
      el.style.maskImage = mask;
      el.style.webkitMaskImage = mask;
      el.style.opacity = rr < 2 ? "0" : "1";
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="hidden md:flex absolute inset-0 z-20 items-center justify-center pointer-events-none"
      style={{
        backgroundColor: "#ffffff",
        opacity: 0,
        willChange: "opacity",
        contain: "layout paint",
      }}
    >
      <HeroContent inverted animated={false} />
    </div>
  );
}

/* ---------- planet horizon ---------- */
function Horizon() {
  return (
    <div className="absolute bottom-[-24px] sm:bottom-[-36px] left-0 w-full h-[380px] sm:h-[500px] z-[13] pointer-events-none overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 240, scaleY: 0.9 }}
        animate={{ opacity: 1, y: 0, scaleY: 1 }}
        transition={{ delay: 0.7, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full"
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-40%] w-[160%] aspect-[2/1] rounded-[50%]"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,140,0,0.55) 0%, rgba(255,94,0,0.25) 35%, transparent 68%)",
            filter: "blur(30px)",
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[42%] w-[170%] aspect-[2.4/1] rounded-[50%]"
          style={{
            background: "#0A0908",
            boxShadow:
              "0 -2px 8px rgba(255,190,120,0.9), 0 -8px 26px rgba(255,120,20,0.65), 0 -26px 80px rgba(255,90,0,0.4), 0 -60px 160px rgba(255,90,0,0.2)",
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[42%] w-[46%] h-[6px] rounded-full"
          style={{
            background:
              "radial-gradient(50% 100% at 50% 0%, rgba(255,255,255,0.95) 0%, rgba(255,200,140,0.5) 45%, transparent 100%)",
            filter: "blur(2px)",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ---------- available-for-opportunity edge tab ---------- */
function EdgeTab() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2.6, duration: 0.8 }}
      className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-30 items-center"
    >
      <div
        className="border border-white/15 border-r-0 rounded-l-xl bg-[#0F0E0E]/60 backdrop-blur-sm px-2.5 py-5 font-mono text-[9px] tracking-[0.3em] text-white/50 select-none"
        style={{ writingMode: "vertical-rl" }}
      >
        AVAILABLE FOR OPPORTUNITY
      </div>
    </motion.div>
  );
}

/* ---------- main hero ---------- */
export default function Hero() {
  const [veil, setVeil] = useState(true);

  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 0.94]);
  const opacity = useTransform(scrollY, [0, 600, 1000], [1, 0.5, 0]);
  // once fully covered, stop painting/compositing the hero entirely
  const visibility = useTransform(scrollY, (v) =>
    v > 1050 ? ("hidden" as const) : ("visible" as const)
  );

  useEffect(() => {
    const t = setTimeout(() => setVeil(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      className="sticky top-0 z-10 overflow-hidden pb-0 mb-0 w-full"
      style={{ height: "100vh" }}
      aria-label={`${site.name} - ${site.role} Portfolio`}
    >
      {veil && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="fixed inset-0 z-[9999] bg-[#0F0E0E] pointer-events-none"
        />
      )}

      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          scale,
          opacity,
          visibility,
          willChange: "transform, opacity",
        }}
      >
        <Starfield />
        <Horizon />
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto">
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <HeroContent />
          </div>
          <FluidReveal />
        </div>
      </motion.div>
      <EdgeTab />
    </section>
  );
}
