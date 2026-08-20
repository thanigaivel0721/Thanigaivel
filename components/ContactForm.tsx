"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";
import { site } from "@/lib/data";

const OPEN_EVENT = "open-contact-form";

/** Call from anywhere to open the contact form modal. */
export function openContactForm() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

const inputCls =
  "w-full rounded-2xl bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/30 font-outfit outline-none transition-all duration-200 focus:border-[#ff6b3d]/60 focus:bg-white/[0.05]";

export default function ContactForm() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    setMounted(true);
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry — ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setOpen(false);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Contact form"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[86vh] overflow-y-auto scrollbar-hide rounded-[32px] border border-white/[0.1] bg-[#141416]/95 backdrop-blur-2xl p-6 sm:p-8"
            style={{
              boxShadow:
                "inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 24px 80px -12px rgba(0, 0, 0, 0.8)",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/[0.1] flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
            >
              <FiX size={15} />
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] mb-3 text-[#10B981] text-[10px] font-semibold tracking-wider uppercase font-outfit">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Get in Touch
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-jakarta text-white">
                Let&apos;s talk about{" "}
                <span
                  className="font-normal"
                  style={{
                    fontFamily: "var(--font-instrument)",
                    fontStyle: "italic",
                  }}
                >
                  your project.
                </span>
              </h3>
              <p className="text-white/50 text-xs sm:text-[13px] font-outfit leading-relaxed mt-2">
                Fill this in and it opens your email app with everything ready
                to send. I usually reply within a day.
              </p>
            </div>

            <form onSubmit={submit} className="flex flex-col gap-3.5">
              <div className="relative">
                <FiUser
                  size={13}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                />
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`${inputCls} pl-10`}
                />
              </div>
              <div className="relative">
                <FiMail
                  size={13}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`${inputCls} pl-10`}
                />
              </div>
              <div className="relative">
                <FiMessageSquare
                  size={13}
                  className="absolute left-4 top-4 text-white/30 pointer-events-none"
                />
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project…"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${inputCls} pl-10 resize-none`}
                />
              </div>

              <button
                type="submit"
                className="group glowing-border-btn mt-2 self-start px-8 py-3 rounded-full font-semibold text-sm text-white inline-flex items-center gap-2.5 cursor-pointer opacity-90 hover:opacity-100 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-full bg-[#0F0E0E]/95 backdrop-blur-xl z-0 pointer-events-none transition-colors duration-300 group-hover:bg-[#0F0E0E]" />
                <span className="relative z-10">Send Message</span>
                <FiSend
                  size={13}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>

              <p className="text-[10px] font-mono tracking-wide text-white/25 mt-1">
                Or write directly:{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-white/45 hover:text-white/80 transition-colors"
                >
                  {site.email}
                </a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
