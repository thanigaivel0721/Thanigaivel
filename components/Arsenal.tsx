"use client";

import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiSupabase,
  SiPostman,
  SiGit,
  SiGithub,
  SiVercel,
  SiNodedotjs,
  SiFigma,
  SiAndroid,
  SiApple,
  SiStripe,
  SiFirebase,
  SiNpm,
} from "react-icons/si";
import { FiDroplet, FiCode } from "react-icons/fi";
import { Badge, WordRise, FadeUp } from "./reveal";

const ORANGE = "#FF8C00";

type Tech = { name: string; Icon: IconType; color: string };

const row1: Tech[] = [
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss, color: "#1572B6" },
  { name: "PHP", Icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", Icon: SiLaravel, color: "#FF2D20" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E" },
  { name: "Bubble", Icon: FiDroplet, color: "#C2EF3A" },
  { name: "REST APIs", Icon: SiPostman, color: "#FF6C37" },
];

const row2: Tech[] = [
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
  { name: "VS Code", Icon: FiCode, color: "#0A84FF" },
  { name: "Vercel", Icon: SiVercel, color: "#ffffff" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Android", Icon: SiAndroid, color: "#3DDC84" },
  { name: "iOS", Icon: SiApple, color: "#ffffff" },
  { name: "Stripe", Icon: SiStripe, color: "#635BFF" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { name: "npm", Icon: SiNpm, color: "#CB3837" },
];

function Tile({ t }: { t: Tech }) {
  const { Icon } = t;
  return (
    <div className="group flex flex-col items-center gap-3 w-[104px] sm:w-[120px] flex-shrink-0 select-none cursor-default">
      <div
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border border-white/[0.06] bg-white/[0.02] transition-all duration-300 group-hover:border-white/[0.15] group-hover:bg-white/[0.05] group-hover:-translate-y-1"
        style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.03)" }}
      >
        <Icon size={30} style={{ color: t.color }} />
      </div>
      <span
        className="text-[13px] sm:text-[15px] text-white/60 group-hover:text-white transition-colors duration-300 whitespace-nowrap"
        style={{ fontFamily: "var(--font-instrument)", fontStyle: "italic" }}
      >
        {t.name}
      </span>
    </div>
  );
}

function Row({
  items,
  reverse,
  duration,
}: {
  items: Tech[];
  reverse?: boolean;
  duration: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-4">
      <div
        className={`flex gap-6 sm:gap-10 w-max ${reverse ? "animate-marquee-half-reverse" : "animate-marquee-half"}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {doubled.map((t, i) => (
          <Tile key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
      {/* edge fades */}
      <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#0F0E0E] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#0F0E0E] to-transparent pointer-events-none z-10" />
    </div>
  );
}

export default function Arsenal() {
  return (
    <section
      id="skills"
      className="relative z-20 py-16 sm:py-20 md:py-28 px-0 bg-[#0F0E0E] overflow-hidden"
      aria-label="Technical Skills and Expertise"
    >
      <div className="text-center mb-10 sm:mb-14 px-4 sm:px-6">
        <Badge color={ORANGE}>My Arsenal</Badge>
        <WordRise
          text="Technologies i engineer"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-[-0.02em] leading-[0.95] text-white"
          style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800 }}
        />
        <FadeUp delay={0.2}>
          <p className="text-sm sm:text-base text-white/50 mt-4 max-w-xl mx-auto">
            Building modern web experiences with cutting-edge tools and
            frameworks
          </p>
        </FadeUp>
      </div>

      <FadeUp amount={0.2}>
        <Row items={row1} duration={46} />
        <div className="h-10 sm:h-16" />
        <Row items={row2} duration={40} reverse />
      </FadeUp>
    </section>
  );
}
