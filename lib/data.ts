export const site = {
  name: "Thanigaivel",
  role: "Software Developer",
  email: "dev.goldenaxe@gmail.com",
  location: "Karur, Tamil Nadu, India",
  heroRows: ["WEB & APP", "SOFTWARE", "DEVELOPER"],
  captionTopLeft: ["THANIGAIVEL • BUILDING MODERN,", "PRODUCTION-READY WEB & NATIVE APPS."],
  captionBottomRight: ["SHIPPING RESPONSIVE PRODUCTS", "POWERED BY NEXT.JS & BUBBLE."],
  socials: {
    github: "https://github.com/thanigaivel0721",
    linkedin: "https://www.linkedin.com/in/thanigaivel-j-b4a7892a9",
    instagram: "https://www.instagram.com/",
  },
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  category: "bubble" | "fullstack" | "web";
  image: string;
  year: string;
  how: string;
  workedOn: string[];
};

export const projects: Project[] = [
  {
    slug: "tillsee",
    title: "Tillsee",
    tagline: "Compatibility-First Dating App",
    description:
      "A compatibility-first dating app — live-captured portraits, a 24-question assessment, and likes that become stars in your personal constellation.",
    tech: ["Bubble", "Native iOS", "Native Android", "REST APIs"],
    category: "bubble",
    image: "/images/projects/tillsee.svg",
    year: "2026",
    how: "Users sign up with OTP verification, create a profile with a live-captured portrait, then take a 24-question compatibility assessment. The app matches people by compatibility score — every like you receive becomes a star in your personal constellation on the home screen. From the daily discovery circle you connect with matches and move into chat.",
    workedOn: [
      "Built the full app in Bubble, shipped as native iOS & Android",
      "OTP sign-up, login and live portrait capture flow",
      "24-question assessment logic and compatibility scoring workflows",
      "Constellation home screen, daily discovery circle and matching UI",
      "Connections list and in-app chat",
      "Third-party API integrations and release preparation",
    ],
  },
  {
    slug: "zora",
    title: "Zora",
    tagline: "Cloud Kitchen & Delivery Platform",
    description:
      "A cloud kitchen & delivery platform — browsing menus, tracking riders live and keeping kitchens on top of their orders.",
    tech: ["PayU Payment Gateway", "Live Tracking", "Web", "Mobile"],
    category: "fullstack",
    image: "/images/projects/zora.svg",
    year: "2025–26",
    how: "Customers browse cloud-kitchen menus, add dishes to the cart and pay online through the PayU payment gateway. Once an order is placed, the kitchen sees it instantly on its dashboard, and customers track their rider live on the map until the food arrives.",
    workedOn: [
      "PayU payment gateway integration and the full checkout flow",
      "Live rider tracking with order status updates",
      "Menu browsing, cart and order management screens",
      "Kitchen dashboard for incoming orders and daily totals",
      "Responsive UI across web and mobile",
    ],
  },
  {
    slug: "daycare",
    title: "Daycare Platform",
    tagline: "Childcare Coordination Platform",
    description:
      "A platform connecting daycare centers and families — daily schedules, check-ins and updates that keep parents in the loop.",
    tech: ["Bubble", "Web", "Mobile", "Notifications"],
    category: "fullstack",
    image: "/images/projects/daycare.svg",
    year: "2025–26",
    how: "Daycare centers manage daily schedules, child check-ins and activities from their dashboard. Parents get live updates through the day — check-in confirmations, nap and meal notes, photo albums and direct messages with the staff — plus attendance summaries for the week.",
    workedOn: [
      "Check-in / check-out flow with instant parent notifications",
      "Daily schedule and activity management for staff",
      "Parent–staff chat and the daily photo album",
      "Attendance tracking and weekly report views",
      "Responsive layouts for web and mobile",
    ],
  },
  {
    slug: "libya-booking",
    title: "Libya Booking",
    tagline: "Travel & Reservation Application",
    description:
      "A booking application built for the Libyan market — search, availability and reservations in a flow that feels effortless.",
    tech: ["Bubble", "Mobile", "Web", "Payments"],
    category: "fullstack",
    image: "/images/projects/libya.svg",
    year: "2025–26",
    how: "Travelers search stays in Libyan cities with dates and guest count, compare available hotels, and reserve in a few taps. The booking is confirmed with check-in details, and hosts manage their availability from their own view.",
    workedOn: [
      "Search and availability flow with date & guest filters",
      "Hotel listing and detail screens with map view",
      "Reservation and confirmation flow",
      "Payments integration for bookings",
      "Market-specific UX for the Libyan audience",
    ],
  },
  {
    slug: "blueshirt",
    title: "BlueShirt",
    tagline: "Professional Networking Platform",
    description:
      "A professional networking platform — profiles, opportunities and conversations that move careers forward.",
    tech: ["Bubble", "Web", "Mobile", "Realtime Chat"],
    category: "web",
    image: "/images/projects/blueshirt.svg",
    year: "2025–26",
    how: "Professionals build a profile, set their status (like \"open to work\"), browse job opportunities and connect with other members. Conversations happen in realtime chat, and members see how their profile performs over the week.",
    workedOn: [
      "Profile builder with status and visibility controls",
      "Job opportunities feed with filters",
      "Connection requests and realtime chat",
      "Profile views and weekly analytics",
      "Notifications and responsive UI",
    ],
  },
  {
    slug: "golden-axe",
    title: "Golden Axe Website",
    tagline: "Company Website & Case Studies",
    description:
      "The company's own public website — services, case studies and a contact flow, built responsive from the first breakpoint.",
    tech: ["Next.js", "Tailwind CSS", "React", "Vercel"],
    category: "web",
    image: "/images/projects/goldenaxe.svg",
    year: "2025–26",
    how: "The company's public website — visitors land on the hero, explore services and case studies of shipped products, and start a project through the contact flow. Built responsive from the first breakpoint and optimized for fast loads.",
    workedOn: [
      "Built the site with Next.js and Tailwind CSS",
      "Services and case-study sections",
      "Contact flow for project inquiries",
      "Responsive design across all breakpoints",
      "Performance and SEO polish",
    ],
  },
];

export const journey = [
  {
    year: "2024",
    title: "Frontend Foundations",
    text: "Frontend Developer Intern at Manvian. React.js, Next.js, Tailwind CSS and responsive frontend development — learning to ship interfaces that hold up on every breakpoint.",
    icon: "code",
  },
  {
    year: "2024–25",
    title: "Backend Depth",
    text: "Backend Developer Intern at Cybertechninja. Laravel, PHP, REST APIs, authentication and API integrations — the plumbing behind the pixels.",
    icon: "server",
  },
  {
    year: "2025",
    title: "Going Professional",
    text: "Joined Golden Axe as a Software Developer. Production web & native applications in Next.js, Tailwind CSS and Bubble across six business domains.",
    icon: "briefcase",
  },
  {
    year: "2026",
    title: "Six Products Shipped",
    text: "Dating, delivery, daycare, booking, networking and the company website — one year, six production launches, in code and in Bubble.",
    icon: "rocket",
  },
  {
    year: "2027",
    title: "Scaling Vision",
    text: "Aiming to go deeper on full-stack architecture and native performance. Goal: build products people love to use, at scale.",
    icon: "vision",
  },
];

export type Milestone = {
  org: string;
  year: string;
  title: string;
  tint: string;
  image: string;
  no: string;
  href?: string;
};

export const milestones: Milestone[] = [
  {
    org: "Bubble (Official)",
    year: "2026",
    title: "Bubble Developer Certification",
    tint: "#8bd5ff",
    image: "/images/milestones/bubble-cert.png",
    no: "VALID UNTIL 3/29/28",
    href: "/certificates/bubble-developer-certificate.pdf",
  },
  {
    org: "Golden Axe",
    year: "2025–26",
    title: "Software Developer — 6 production launches",
    tint: "#ffcf8f",
    image: "/images/projects/goldenaxe.svg",
    no: "GA–2025–001",
  },
  {
    org: "Tillsee",
    year: "2026",
    title: "Native dating app shipped on iOS & Android",
    tint: "#ffcf8f",
    image: "/images/projects/tillsee.svg",
    no: "TS–2026–014",
  },
  {
    org: "Cybertechninja",
    year: "2024–25",
    title: "Backend Developer Internship — Laravel & REST",
    tint: "#ffcf8f",
    image: "/images/projects/cyber.svg",
    no: "CT–2024–032",
  },
];

export const disciplines = [
  {
    key: "frontend",
    title: "Frontend Development",
    sub: "Production-Ready Interfaces",
    projects: "6 Projects",
    years: "1+ Years",
    description:
      "Building responsive, production-ready interfaces with Next.js, React and Tailwind CSS. I focus on clean layouts, fast loads and interfaces that feel effortless on every screen size.",
    tech: [
      { name: "React", pct: 92, color: "#61DAFB" },
      { name: "Next.js", pct: 90, color: "#ffffff" },
      { name: "Tailwind CSS", pct: 94, color: "#38BDF8" },
      { name: "JavaScript", pct: 90, color: "#F7DF1E" },
      { name: "HTML5 / CSS3", pct: 95, color: "#E34F26" },
      { name: "Responsive UI", pct: 93, color: "#C2EF3A" },
    ],
  },
  {
    key: "backend",
    title: "Backend & Data",
    sub: "APIs, Auth & Databases",
    projects: "4 Projects",
    years: "1+ Years",
    description:
      "Designing REST APIs, authentication flows and data layers with Laravel, PHP and Supabase — transaction-safe backends that stay predictable under real traffic.",
    tech: [
      { name: "Laravel", pct: 85, color: "#FF2D20" },
      { name: "PHP", pct: 86, color: "#777BB4" },
      { name: "REST APIs", pct: 90, color: "#C2EF3A" },
      { name: "Supabase", pct: 82, color: "#3ECF8E" },
      { name: "Authentication", pct: 88, color: "#F59E0B" },
      { name: "MySQL", pct: 80, color: "#4479A1" },
    ],
  },
  {
    key: "bubble",
    title: "Bubble & Native",
    sub: "No-Code at Production Speed",
    projects: "5 Projects",
    years: "1+ Years",
    description:
      "Shipping Bubble applications end to end — including native mobile experiences. Complex workflows, third-party integrations and pixel-faithful UI, delivered at no-code speed.",
    tech: [
      { name: "Bubble", pct: 95, color: "#C2EF3A" },
      { name: "Native Mobile", pct: 88, color: "#BF5AF2" },
      { name: "Workflows", pct: 92, color: "#0A84FF" },
      { name: "Integrations", pct: 90, color: "#FF8C00" },
      { name: "Plugin APIs", pct: 84, color: "#F43F5E" },
      { name: "Data Design", pct: 86, color: "#10B981" },
    ],
  },
  {
    key: "workflow",
    title: "Workflow & Delivery",
    sub: "Git, Reviews & Releases",
    projects: "6 Projects",
    years: "1+ Years",
    description:
      "Git & GitHub collaboration, code reviews and performance-minded delivery — keeping six parallel products moving without stepping on each other.",
    tech: [
      { name: "Git & GitHub", pct: 92, color: "#F05032" },
      { name: "Code Review", pct: 88, color: "#ffffff" },
      { name: "Vercel", pct: 86, color: "#C2EF3A" },
      { name: "Performance", pct: 87, color: "#38BDF8" },
      { name: "Debugging", pct: 90, color: "#F59E0B" },
      { name: "Documentation", pct: 82, color: "#BF5AF2" },
    ],
  },
  {
    key: "product",
    title: "Product Thinking",
    sub: "From Brief to Launch",
    projects: "6 Projects",
    years: "1+ Years",
    description:
      "Turning a business brief into screens, flows and shipped features — across dating, delivery, childcare, travel, networking and company sites.",
    tech: [
      { name: "UX Flows", pct: 88, color: "#C2EF3A" },
      { name: "Prototyping", pct: 86, color: "#BF5AF2" },
      { name: "Client Feedback", pct: 90, color: "#0A84FF" },
      { name: "Iteration Speed", pct: 93, color: "#FF8C00" },
      { name: "QA & Polish", pct: 89, color: "#F43F5E" },
      { name: "Launch Ops", pct: 84, color: "#10B981" },
    ],
  },
];

export const arsenal = {
  row1: [
    { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
    { name: "React", icon: "SiReact", color: "#61DAFB" },
    { name: "Next.js", icon: "SiNextdotjs", color: "#ffffff" },
    { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#38BDF8" },
    { name: "HTML5", icon: "SiHtml5", color: "#E34F26" },
    { name: "CSS3", icon: "SiCss3", color: "#1572B6" },
    { name: "PHP", icon: "SiPhp", color: "#777BB4" },
    { name: "Laravel", icon: "SiLaravel", color: "#FF2D20" },
    { name: "MySQL", icon: "SiMysql", color: "#4479A1" },
    { name: "Supabase", icon: "SiSupabase", color: "#3ECF8E" },
    { name: "Bubble", icon: "SiBubble", color: "#C2EF3A" },
    { name: "REST APIs", icon: "SiPostman", color: "#FF6C37" },
  ],
  row2: [
    { name: "Git", icon: "SiGit", color: "#F05032" },
    { name: "GitHub", icon: "SiGithub", color: "#ffffff" },
    { name: "VS Code", icon: "VsCode", color: "#0A84FF" },
    { name: "Vercel", icon: "SiVercel", color: "#ffffff" },
    { name: "Node.js", icon: "SiNodedotjs", color: "#5FA04E" },
    { name: "Figma", icon: "SiFigma", color: "#F24E1E" },
    { name: "Android", icon: "SiAndroid", color: "#3DDC84" },
    { name: "iOS", icon: "SiApple", color: "#ffffff" },
    { name: "Stripe", icon: "SiStripe", color: "#635BFF" },
    { name: "Firebase", icon: "SiFirebase", color: "#FFCA28" },
    { name: "Postman", icon: "SiPostman", color: "#FF6C37" },
    { name: "npm", icon: "SiNpm", color: "#CB3837" },
  ],
};
