"use client";

import {
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiArrowUp,
  FiMapPin,
} from "react-icons/fi";
import { FadeUp } from "./reveal";
import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-[#0F0E0E] px-4 sm:px-6 pb-8">
      <FadeUp amount={0.3}>
        <div
          className="max-w-4xl mx-auto rounded-[40px] border border-white/[0.07] px-6 sm:px-10 py-7 sm:py-8"
          style={{
            background:
              "linear-gradient(180deg, rgba(26, 24, 24, 0.55) 0%, rgba(14, 13, 13, 0.95) 100%)",
            boxShadow:
              "0 12px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
              <span
                className="text-xl sm:text-2xl text-white"
                style={{
                  fontFamily: "var(--font-instrument), Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                {site.name}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-[9px] font-mono font-bold tracking-wider uppercase text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Status
              </span>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              {[
                { Icon: FiGithub, href: site.socials.github, label: "GitHub" },
                { Icon: FiLinkedin, href: site.socials.linkedin, label: "LinkedIn" },
                { Icon: FiInstagram, href: site.socials.instagram, label: "Instagram" },
                { Icon: FiMail, href: `mailto:${site.email}`, label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.18] transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
              <button
                onClick={() => {
                  if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
                  else window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px] font-semibold text-white/70 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
              >
                Back to Top
                <FiArrowUp
                  size={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left font-mono">
              <p className="text-[11px] tracking-[0.04em] text-white/40">
                <span className="text-white/25">© 2026 · </span>
                <span className="text-[#ff6b3d]">&lt;</span>
                <span className="text-white/70">handcrafted</span>{" "}
                <span className="text-[#C2EF3A]">with</span>
                <span className="text-white/40">=</span>
                <span className="text-[#F43F5E]">&quot;♥&quot;</span>{" "}
                <span className="text-[#C2EF3A]">in</span>
                <span className="text-white/40">=</span>
                <span className="text-[#8bd5ff]">&quot;India&quot;</span>{" "}
                <span className="text-[#ff6b3d]">/&gt;</span>
              </p>
              <p className="text-[10px] tracking-[0.04em] text-white/25 mt-1">
                <span className="text-emerald-400/40">//</span> engineered for
                performance &amp; scalability
              </p>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-[9.5px] font-mono tracking-wider uppercase text-white/50">
              <FiMapPin size={10} className="text-[#BF5AF2]" />
              {site.location}
            </span>
          </div>
        </div>
      </FadeUp>
    </footer>
  );
}
