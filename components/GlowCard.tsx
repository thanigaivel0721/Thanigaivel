"use client";

import { useRef, useState, type ReactNode } from "react";

/**
 * Card with the reference site's signature mouse-follow glow border:
 * a 1px masked ring whose radial gradient tracks the cursor.
 */
export default function GlowCard({
  children,
  className = "",
  glowColor = "rgba(249, 115, 22, 0.75)",
  glowSize = 220,
  radius = 30,
  padding = 1,
  style,
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  radius?: number;
  padding?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--glow-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--glow-y", `${e.clientY - r.top}px`);
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{
          borderRadius: radius,
          opacity: hover ? 1 : 0,
          transition: "opacity 300ms",
          padding,
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(${glowSize}px circle at var(--glow-x, 0px) var(--glow-y, 0px), ${glowColor}, transparent 45%)`,
          }}
        />
      </div>
      {children}
    </div>
  );
}
