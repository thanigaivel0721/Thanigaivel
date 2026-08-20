"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";

const items = [
  { id: "hero", label: "Home", icon: FiHome },
  { id: "about", label: "About", icon: FiUser },
  { id: "skills", label: "Skills", icon: FiCode },
  { id: "work", label: "Work", icon: FiBriefcase },
  { id: "contact", label: "Contact", icon: FiMail },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      let current = "hero";
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          current = it.id;
        }
      }
      setActive((prev) => (prev === current ? prev : current));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    measure();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    if (id === "hero") {
      // the hero is sticky, so target the absolute top instead of the element
      if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* logo */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex fixed top-6 left-6 md:left-10 z-50 cursor-pointer w-14 h-14 items-center justify-center"
        onClick={() => go("hero")}
      >
        <span
          className="text-3xl font-black text-white select-none"
          style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic" }}
        >
          T<span className="text-[#ff6b3d]">.</span>
        </span>
      </motion.div>

      {/* desktop pill nav */}
      <motion.nav
        initial={{ opacity: 0, y: -100, scale: 0.95, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center pointer-events-none px-6 md:px-10"
      >
        <div
          className="relative rounded-full px-3 py-1.5 flex items-center gap-1 border pointer-events-auto"
          style={{
            background: "rgba(15, 14, 14, 0.4)",
            backdropFilter: "blur(8px)",
            borderColor: "rgba(255, 255, 255, 0.05)",
            boxShadow:
              "0 8px 32px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
            style={{
              padding: 1,
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 w-[150%] aspect-square animate-navbar-border-spin"
              style={{
                background:
                  "conic-gradient(from 0deg, #ffffff, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.2) 75%, #ffffff)",
              }}
            />
          </div>
          <div className="flex items-center gap-2 relative">
            {items.map((it) => {
              const Icon = it.icon;
              const on = active === it.id;
              return (
                <div className="relative" key={it.id}>
                  <button
                    onClick={() => go(it.id)}
                    className={`relative text-sm px-4 py-2 rounded-full cursor-pointer flex items-center gap-1.5 transition-colors duration-200 ${
                      on
                        ? "text-white font-semibold"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {on && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-white/[0.05] rounded-full border border-white/[0.08]"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    <span className="relative z-10 flex items-center justify-center mr-1">
                      <Icon size={13} />
                    </span>
                    <span className="relative z-10">{it.label}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* mobile nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="fixed top-4 left-0 right-0 z-50 px-4 md:hidden"
      >
        <div className="relative backdrop-blur-sm rounded-full px-4 py-2 shadow-lg flex justify-between items-center bg-[#0F0E0E]/40 border border-white/[0.05]">
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
            style={{
              padding: 1,
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 w-[150%] aspect-square animate-navbar-border-spin"
              style={{
                background:
                  "conic-gradient(from 0deg, #ffffff, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.2) 75%, #ffffff)",
              }}
            />
          </div>
          <div
            className="cursor-pointer flex-shrink-0 text-xl font-black"
            style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic" }}
            onClick={() => go("hero")}
          >
            T<span className="text-[#ff6b3d]">.</span>
          </div>
          <button
            className="text-white p-1.5 hover:bg-white/[0.05] rounded-full transition-all"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 rounded-3xl bg-[#0F0E0E]/95 backdrop-blur-xl border border-white/[0.08] p-2 flex flex-col"
          >
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <button
                  key={it.id}
                  onClick={() => go(it.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-left ${
                    active === it.id
                      ? "text-white bg-white/[0.06] font-semibold"
                      : "text-white/70"
                  }`}
                >
                  <Icon size={15} />
                  {it.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
