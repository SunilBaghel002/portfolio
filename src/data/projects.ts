export interface Project {
  id: string;
  number: string;
  category: "client" | "hardware";
  type: string;
  isFlagship: boolean;
  name: string;
  tagline: string;
  description: string;
  highlights: Array<{ icon: string; text: string }>;
  tech: string[];
  commits: string;
  links: {
    github: string | null;
    live: string | null;
  };
  image: string;
  year: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "paydesknow",
    number: "01",
    category: "client",
    type: "B2B Fintech Platform",
    isFlagship: true,
    name: "PayDeskNow",
    tagline: "Banking services for India's underserved.",
    description:
      "A production B2B fintech platform enabling rural CSC retailers to offer AEPS, BBPS, DMT, and recharge services to their communities. Real money, real transactions, real impact.",
    highlights: [
      { icon: "🔥", text: "240+ solo commits" },
      { icon: "💰", text: "Real payment integrations" },
      { icon: "🏦", text: "AEPS · BBPS · DMT · Recharge" },
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "Payment Gateway APIs"],
    commits: "240+",
    links: {
      github: null,
      live: null,
    },
    image: "/projects/paydesk.png",
    year: "2024–2025",
    color: "#F97316",
  },
  {
    id: "flashbill",
    number: "02",
    category: "client",
    type: "Offline POS Software",
    isFlagship: false,
    name: "FlashBill",
    tagline: "A Petpooja-style POS, built ground-up.",
    description:
      "An offline-first billing software for restaurants and cafés. Handles complete restaurant operations — billing, expense tracking, staff management, QR ordering, and website integration. Works flawlessly without internet.",
    highlights: [
      { icon: "💻", text: "Offline-first architecture" },
      { icon: "📊", text: "Complete restaurant management" },
      { icon: "🔥", text: "120+ solo commits" },
      { icon: "🖥️", text: "Desktop application" },
    ],
    tech: ["Electron.js", "Next.js", "SQLite", "Node.js"],
    commits: "120+",
    links: {
      github: "https://github.com/SunilBaghel002/ZapBill_offline-software",
      live: null,
    },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    year: "2025",
    color: "#FEF3C7",
  },
  {
    id: "hello-pizza-cafe",
    number: "03",
    category: "client",
    type: "Website + WhatsApp Automation",
    isFlagship: false,
    name: "Hello Pizza Cafe",
    tagline: "A pizza website with WhatsApp superpowers.",
    description:
      "Not your typical restaurant website. Broadcasts messages to 10,000+ customers via WhatsApp, handles orders through an interactive bot, tracks loyalty points, and connects directly to FlashBill POS for seamless order processing.",
    highlights: [
      { icon: "📱", text: "10,000+ customer WhatsApp automation" },
      { icon: "🤖", text: "Interactive ordering bot" },
      { icon: "🎁", text: "Loyalty points system" },
      { icon: "🔗", text: "Direct POS integration" },
    ],
    tech: ["Next.js", "Node.js", "WhatsApp Business API", "MongoDB"],
    commits: "100+",
    links: {
      github: "https://github.com/official-forgeweb/Hello_Pizza_Cafe",
      live: "https://hello-pizza-cafe.vercel.app/",
    },
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop",
    year: "2025",
    color: "#F97316",
  },
  {
    id: "mobitel",
    number: "04",
    category: "client",
    type: "Quick Commerce Platform",
    isFlagship: false,
    name: "Mobitel",
    tagline: "Quick-commerce for mobile repair.",
    description:
      "A doorstep mobile repair booking platform. Customers book from home, technicians arrive at their location, payments happen via Razorpay. Think Urban Company, but laser-focused on mobile repair.",
    highlights: [
      { icon: "🏠", text: "Doorstep service booking" },
      { icon: "💳", text: "Razorpay payment integration" },
      { icon: "📍", text: "Real-time technician tracking" },
      { icon: "🚀", text: "Live production platform" },
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "Razorpay"],
    commits: "50+",
    links: {
      github: "https://github.com/official-forgeweb/Mobitel",
      live: "https://www.mobitel.in/",
    },
    image: "/projects/mobitel.png",
    year: "2025",
    color: "#FEF3C7",
  },
  {
    id: "proton-sms",
    number: "05",
    category: "client",
    type: "Institute Management System",
    isFlagship: false,
    name: "Proton SMS",
    tagline: "Complete institute management with WhatsApp built-in.",
    description:
      "A comprehensive institute management platform handling students, teachers, attendance, fees, exams, and communications — all in one place. Integrated WhatsApp system for instant parent-teacher-student communication.",
    highlights: [
      { icon: "🎓", text: "Full institute operations" },
      { icon: "📱", text: "WhatsApp integration" },
      { icon: "💰", text: "Fee management" },
      { icon: "📊", text: "Multi-role dashboards" },
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "WhatsApp API"],
    commits: "50+",
    links: {
      github: "https://github.com/official-forgeweb/Proton_SMS",
      live: "https://proton-sms.vercel.app/",
    },
    image: "/projects/proton.png",
    year: "2025",
    color: "#F97316",
  },
  {
    id: "smart-power",
    number: "06",
    category: "hardware",
    type: "Hardware + IoT + Web",
    isFlagship: true,
    name: "Smart Power",
    tagline: "Generating electricity from footsteps.",
    description:
      "An affordable Indian alternative to Japan's expensive piezoelectric floor tiles. Recycled plastic bricks embedded with piezoelectric sensors generate electricity from footsteps. Complete with custom power conversion circuits, battery storage, mobile charging capability, and IoT monitoring dashboard. A genuinely cross-disciplinary project combining Civil Engineering, Electronics, Embedded Systems, IoT, and Full-Stack Development.",
    highlights: [
      { icon: "🏆", text: "Won 4 hackathons (1 National)" },
      { icon: "⚡", text: "Hardware + Software + IoT" },
      { icon: "🇮🇳", text: "Made-in-India innovation" },
      { icon: "♻️", text: "Uses recycled materials" },
    ],
    tech: [
      "Piezoelectric Sensors",
      "Arduino Uno",
      "ESP8266",
      "TP4056",
      "Custom PCB",
      "Next.js",
    ],
    commits: "",
    links: {
      github: null,
      live: null,
    },
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
    year: "2025–2026",
    color: "#FFD700",
  },
];
