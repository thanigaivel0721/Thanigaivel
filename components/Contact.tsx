"use client";

import { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Badge, WordFlip, FadeUp } from "./reveal";
import { openContactForm } from "./ContactForm";

const EMERALD = "#10B981";

/* dotted perspective-wave background, like the reference's grid image */
function DotWave() {
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

    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      rootMargin: "100px",
    });
    io.observe(canvas);

    let t = 0;
    let raf = 0;
    let lastFrame = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!visible || document.hidden) return;
      if (now - lastFrame < 33) return; // ~30fps is plenty for a slow wave
      lastFrame = now;
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      const cols = 70;
      const rows = 26;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = (i / (cols - 1)) * w;
          const ny = j / (rows - 1);
          const wave =
            Math.sin(i * 0.28 + t * 2 + j * 0.4) * 14 * (1 - ny * 0.4) +
            Math.cos(i * 0.12 - t * 1.4) * 10;
          const y = h * 0.28 + ny * h * 0.72 + wave * (0.4 + ny);
          const cx = Math.abs(x - w / 2) / (w / 2);
          const a = Math.max(0, 0.34 - cx * 0.3 - Math.abs(ny - 0.45) * 0.4);
          if (a <= 0.004) continue;
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${a})`;
          ctx.fill();
        }
      }
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      style={{
        maskImage:
          "radial-gradient(circle at center, black 30%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(circle at center, black 30%, transparent 75%)",
      }}
    />
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-20 min-h-[60vh] flex items-center justify-center pt-8 pb-10 sm:pt-12 sm:pb-14 px-4 sm:px-6 bg-[#0F0E0E] overflow-hidden"
      aria-label="Contact Information"
    >
      <DotWave />
      <div
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0F0E0E] to-transparent pointer-events-none"
        style={{ zIndex: 2 }}
      />
      <div className="relative z-20 max-w-5xl mx-auto text-center px-2 py-16 sm:py-20">
        <Badge color={EMERALD}>Get in Touch</Badge>
        <h2
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-[-0.02em] leading-[0.95] text-white mb-4 sm:mb-6"
          style={{ perspective: 1200 }}
        >
          <WordFlip
            text="Let's build something"
            className="mb-1.5 sm:mb-2.5"
            style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800 }}
          />
          <WordFlip
            text="extraordinary"
            delay={0.3}
            style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800 }}
          />
        </h2>
        <FadeUp delay={0.35}>
          <p
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8 sm:mb-12 px-2"
            style={{
              fontFamily: "var(--font-instrument), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            &ldquo;Whether you&apos;re launching a{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF5C29 0%, #FF1493 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 500,
              }}
            >
              startup
            </span>{" "}
            or scaling an{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #FF1493 0%, #FF8C00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 500,
              }}
            >
              enterprise
            </span>
            , I&apos;m here to turn your{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #00D2FF 0%, #3A7BD5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 500,
              }}
            >
              vision
            </span>{" "}
            into reality.&rdquo;
          </p>
        </FadeUp>
        <FadeUp delay={0.45}>
          <button onClick={openContactForm} aria-label="Open contact form">
            <div
              className="group glowing-border-btn px-8 sm:px-10 py-3 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base text-white transition-all duration-300 inline-flex items-center gap-2 sm:gap-3 opacity-90 hover:opacity-100 cursor-pointer"
            >
              <div className="absolute inset-0 rounded-full bg-[#0F0E0E]/95 backdrop-blur-xl z-0 pointer-events-none transition-colors duration-300 group-hover:bg-[#0F0E0E]" />
              <span className="relative z-10">Get in Touch</span>
              <FiArrowRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
