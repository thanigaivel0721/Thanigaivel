"use client";

const strip1 = [
  "Software Developer",
  "Web & Native Apps",
  "Bubble Expert",
  "Product Builder",
  "Next.js Expert",
  "React Specialist",
  "Laravel Backend",
  "API Integrations",
];

const strip2 = [
  "1+ Years Experience",
  "Creative Developer",
  "6+ Products Delivered",
  "Golden Axe",
  "UI/UX Enthusiast",
  "Performance Minded",
  "No-Code Speed",
  "Problem Solver",
];

function StripContent({
  items,
  bright,
}: {
  items: string[];
  bright: boolean;
}) {
  const textStyle: React.CSSProperties = bright
    ? {
        color: "#ffffff",
        textShadow: "0 2px 20px rgba(255,255,255,0.15)",
      }
    : {
        color: "rgba(255,255,255,0.85)",
        textShadow: "0 1px 10px rgba(255,255,255,0.05)",
      };
  const sepStyle: React.CSSProperties = bright
    ? { opacity: 0.6, color: "#fff" }
    : { opacity: 0.3, color: "rgba(255,255,255,0.5)" };

  return (
    <>
      {items.map((t, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="marquee-text-enhanced" style={textStyle}>
            {t}
          </span>
          <span className="marquee-separator" style={sepStyle}>
            ◆
          </span>
        </span>
      ))}
    </>
  );
}

export default function MarqueeStrips() {
  return (
    <section
      className="relative z-20 h-[55vh] sm:h-[60vh] flex items-center justify-center overflow-hidden select-none"
      style={{
        backgroundColor: "#0F0E0E",
        contain: "layout style paint",
        isolation: "isolate",
      }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] noise-overlay" />
      <div
        className="absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, #0F0E0E 0%, #0F0E0E 20%, rgba(15,14,14,0.85) 60%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, #0F0E0E 0%, #0F0E0E 20%, rgba(15,14,14,0.85) 60%, transparent 100%)",
        }}
      />
      <div className="relative w-full h-32 sm:h-40">
        {/* strip 1: rotate(-5deg), scroll right */}
        <div
          className="marquee-strip absolute left-0 right-0 z-[2]"
          style={{
            top: "50%",
            willChange: "transform, opacity",
            transform: "translateY(-50%) rotate(-5deg)",
          }}
        >
          <div className="marquee-strip-enhanced">
            <div className="flex overflow-hidden whitespace-nowrap">
              <div
                className="marquee-scroll-right"
                style={{
                  ["--marquee-duration" as string]: "50s",
                  transform: "translateZ(0)",
                }}
              >
                <StripContent items={strip1} bright />
                <StripContent items={strip1} bright />
              </div>
            </div>
          </div>
        </div>
        {/* strip 2: rotate(5deg), scroll left */}
        <div
          className="marquee-strip absolute left-0 right-0 z-[1]"
          style={{
            top: "50%",
            willChange: "transform, opacity",
            transform: "translateY(-50%) rotate(5deg)",
          }}
        >
          <div className="marquee-strip-enhanced">
            <div className="flex overflow-hidden whitespace-nowrap">
              <div
                className="marquee-scroll-left"
                style={{
                  ["--marquee-duration" as string]: "42s",
                  transform: "translateZ(0)",
                }}
              >
                <StripContent items={strip2} bright={false} />
                <StripContent items={strip2} bright={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
