import type { Metadata } from "next";
import Link from "next/link";
import {
  FiDownload,
  FiArrowLeft,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiLinkedin,
  FiGithub,
  FiAward,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Resume — Thanigaivel J",
  description:
    "Resume of Thanigaivel J — Software Developer at Golden Axe. Next.js, React.js, Bubble, Laravel and Supabase.",
};

const ORANGE = "#ff6b3d";

function SectionHead({ no, title }: { no: string; title: string }) {
  return (
    <div className="flex items-baseline gap-3 border-b border-white/10 pb-2 mb-5">
      <span
        className="font-mono text-sm font-bold tracking-widest"
        style={{ color: ORANGE }}
      >
        {no}
      </span>
      <h2 className="text-sm font-extrabold tracking-[0.2em] uppercase text-white font-jakarta">
        {title}
      </h2>
    </div>
  );
}

function Dash({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 text-[13px] leading-relaxed text-white/60 font-outfit">
      <span className="text-white/30 flex-shrink-0">—</span>
      <span>{children}</span>
    </li>
  );
}

function Role({
  title,
  org,
  when,
  children,
}: {
  title: string;
  org: string;
  when: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
        <p className="text-[15px] font-bold text-white font-jakarta">
          {title}{" "}
          <span className="font-semibold" style={{ color: ORANGE }}>
            {org}
          </span>
        </p>
        <span className="text-[11px] font-mono font-bold tracking-wider text-white/40 whitespace-nowrap">
          {when}
        </span>
      </div>
      <ul className="flex flex-col gap-1.5">{children}</ul>
    </div>
  );
}

function ProjectRow({
  title,
  tech,
  children,
}: {
  title: string;
  tech: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-baseline gap-2.5 flex-wrap mb-1.5">
        <p className="text-[14px] font-bold text-white font-jakarta">{title}</p>
        <span className="text-[10.5px] font-mono text-white/40 tracking-wide">
          {tech}
        </span>
      </div>
      <ul className="flex flex-col gap-1.5">{children}</ul>
    </div>
  );
}

function SkillGroup({ label, items }: { label: string; items: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <p
        className="text-[10px] font-mono font-bold tracking-[0.18em] uppercase mb-1"
        style={{ color: ORANGE }}
      >
        {label}
      </p>
      <p className="text-[13px] leading-relaxed text-white/70 font-outfit">
        {items}
      </p>
    </div>
  );
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#0F0E0E] text-white pb-16">
      {/* subtle top glow */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(255,107,61,0.09) 0%, transparent 70%)",
        }}
      />

      {/* top bar */}
      <div className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0F0E0E]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white transition-colors duration-200 font-jakarta"
          >
            <FiArrowLeft size={13} />
            Back to Portfolio
          </Link>
          <a
            href="/Thanigaivel_J_Resume.pdf"
            download="Thanigaivel_J_Resume.pdf"
            className="group glowing-border-btn-white px-5 sm:px-6 py-2 rounded-full font-semibold text-xs sm:text-sm text-white inline-flex items-center gap-2 cursor-pointer opacity-90 hover:opacity-100 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-[#0F0E0E]/95 backdrop-blur-xl z-0 pointer-events-none transition-colors duration-300 group-hover:bg-[#0F0E0E]" />
            <FiDownload size={13} className="relative z-10" />
            <span className="relative z-10">Download</span>
          </a>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16">
        {/* header */}
        <header className="mb-10 sm:mb-12">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.02em] text-white font-jakarta"
            style={{ fontWeight: 800 }}
          >
            THANIGAIVEL <span style={{ color: ORANGE }}>J</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base font-semibold tracking-[0.35em] uppercase text-white/50 font-jakarta">
            Software Developer
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-outfit text-white/60">
            <a
              href="mailto:thanigaivel0721@gmail.com"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FiMail size={12} style={{ color: ORANGE }} />
              thanigaivel0721@gmail.com
            </a>
            <span className="inline-flex items-center gap-1.5">
              <FiPhone size={12} style={{ color: ORANGE }} />
              7708345336
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiMapPin size={12} style={{ color: ORANGE }} />
              Karur, Tamil Nadu
            </span>
            <a
              href="https://thanigaivel.jo3.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FiGlobe size={12} style={{ color: ORANGE }} />
              thanigaivel.jo3.org
            </a>
            <a
              href="https://www.linkedin.com/in/thanigaivel-j-b4a7892a9"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FiLinkedin size={12} style={{ color: ORANGE }} />
              linkedin.com/in/thanigaivel-j-b4a7892a9
            </a>
            <a
              href="https://github.com/thanigaivel0721"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FiGithub size={12} style={{ color: ORANGE }} />
              github.com/thanigaivel0721
            </a>
          </div>
        </header>

        {/* two-column body, same split as the PDF */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-12">
          {/* left column */}
          <div>
            <section className="mb-10">
              <SectionHead no="01" title="Profile" />
              <p className="text-[13.5px] leading-relaxed text-white/60 font-outfit">
                Software Developer with 1 year of experience at Golden Axe,
                building production web and mobile apps with Next.js, React.js,
                Bubble, Laravel and Supabase. Skilled in REST APIs, third-party
                integrations, authentication and responsive UI. Delivered
                native apps live on the App Store and Play Store.
              </p>
            </section>

            <section className="mb-10">
              <SectionHead no="02" title="Experience" />
              <Role
                title="Software Developer"
                org="Golden Axe"
                when="Sep 2025 – Aug 2026"
              >
                <Dash>
                  Built and maintained production web apps using Next.js,
                  Tailwind CSS and Bubble across dating, booking, delivery,
                  daycare, professional-networking and company-website
                  projects.
                </Dash>
                <Dash>
                  Developed responsive, mobile-first interfaces and native
                  application experiences; integrated third-party services,
                  APIs and authentication workflows.
                </Dash>
                <Dash>
                  Worked with AWS, Twilio, Vroom and OSRM across production
                  projects, focusing on polished UI, performance and
                  production-ready delivery.
                </Dash>
              </Role>
              <Role
                title="Backend Developer Intern"
                org="Cybertechninja Pvt Ltd"
                when="Nov 2024 – May 2025"
              >
                <Dash>
                  Developed RESTful APIs using Laravel and PHP; implemented
                  authentication using Laravel Passport and Sanctum for web and
                  mobile apps.
                </Dash>
              </Role>
              <Role
                title="Frontend Developer Intern"
                org="Manvian"
                when="Sep 2024 – Nov 2024"
              >
                <Dash>
                  Built interactive, responsive apps using React.js, Next.js
                  and Tailwind CSS with a focus on accessibility and
                  performance.
                </Dash>
              </Role>
            </section>

            <section className="mb-10 lg:mb-0">
              <SectionHead no="03" title="Selected Projects" />
              <ProjectRow
                title="Tillsee — Dating Application"
                tech="· Bubble · Next.js · AWS · Twilio"
              >
                <Dash>
                  Production dating app in Bubble + Next.js landing site;
                  converted to native mobile, published on Google Play &amp;
                  App Store, with AWS face verification and Twilio OTP.
                </Dash>
              </ProjectRow>
              <ProjectRow
                title="Zora — Cloud Kitchen & Delivery Platform"
                tech="· Next.js · Supabase · Vroom · OSRM"
              >
                <Dash>
                  Cloud-kitchen ordering &amp; delivery platform with live menu
                  updates; Supabase backend and Vroom/OSRM route optimization
                  for delivery mapping.
                </Dash>
              </ProjectRow>
              <ProjectRow
                title="Daycare Platform & Libya Booking App"
                tech="· Bubble"
              >
                <Dash>
                  Daycare management platform with parent-daycare chat &amp;
                  notifications; bilingual (English/Arabic, RTL) booking app
                  for a Libya-based project.
                </Dash>
              </ProjectRow>
            </section>
          </div>

          {/* right column */}
          <div>
            <section className="mb-10">
              <SectionHead no="04" title="Skills" />
              <SkillGroup
                label="Frontend"
                items="React.js, Next.js, TypeScript, Tailwind CSS, HTML/CSS, JavaScript"
              />
              <SkillGroup label="Backend" items="PHP, Laravel, REST APIs" />
              <SkillGroup label="Database" items="MySQL, Supabase" />
              <SkillGroup
                label="No-Code"
                items="Bubble, Native Mobile Apps, Responsive UI"
              />
              <SkillGroup
                label="Integrations"
                items="AWS, Twilio, Vroom, OSRM"
              />
              <SkillGroup
                label="Tools"
                items="Git, GitHub, Postman, Figma, VS Code, Photoshop, Canva"
              />
            </section>

            <section className="mb-10">
              <SectionHead no="05" title="Education" />
              <p className="text-[14px] font-bold text-white font-jakarta">
                B.E. Computer Science &amp; Engineering
              </p>
              <p className="text-[12.5px] text-white/60 font-outfit mt-0.5">
                Chettinad College of Engg. &amp; Tech.
              </p>
              <p
                className="text-[11px] font-mono font-bold tracking-wide mt-1"
                style={{ color: ORANGE }}
              >
                2021 – 2025 · Karur, Tamil Nadu
              </p>
              <a
                href="/certificates/bubble-developer-certificate.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-white/70 hover:text-white font-outfit border border-white/[0.1] hover:border-white/[0.25] rounded-full px-3 py-1.5 transition-all duration-200"
              >
                <FiAward size={12} style={{ color: ORANGE }} />
                <span>
                  <b className="font-semibold">Certification:</b> Bubble
                  Developer Certificate
                </span>
              </a>
            </section>

            <section className="mb-10">
              <SectionHead no="06" title="Achievements" />
              <ul className="flex flex-col gap-1.5">
                <Dash>Kalam Young Achiever Award — 2023</Dash>
                <Dash>Project Expo Winner, Chettinad College — 2024</Dash>
                <Dash>AMD Hackathon — Project Idea Selected</Dash>
                <Dash>World Youth Federation — Presentation Award</Dash>
              </ul>
            </section>

            <section>
              <SectionHead no="07" title="Languages" />
              <p className="text-[13px] leading-relaxed text-white/70 font-outfit">
                English — Professional Working Proficiency
                <br />
                Tamil — Native / Bilingual Proficiency
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
