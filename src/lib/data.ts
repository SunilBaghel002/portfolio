// Define Project interface
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  video?: string; // Optional
  link?: string; // Optional
  tags: string[];
  github: string;
  featured: boolean;
  year: number;
  color: string;
}

export const portfolioData = {
  name: "{Sunil Baghel}",
  role: "<Full Stack Developer/>",
  bio: "I'm a full stack developer and CS student who co-founded Forgeweb. I build fast, clean web systems and design interfaces that make sense. 8× hackathon winner, focused on Next.js, Node.js, and shipping products that work.",
  email: "sunilbaghel93100@gmail.com",
  location: "Faridabad, Haryana, India",

  skillCategories: [
    {
      name: "Languages",
      color: "#3B82F6",
      orbitIndex: 0,
      skills: [
        { name: "JavaScript", level: 95, color: "#F7DF1E" },
        { name: "TypeScript", level: 90, color: "#3178C6" },
        { name: "Python", level: 85, color: "#3776AB" },
        { name: "Solidity", level: 70, color: "#363636" },
        { name: "C", level: 65, color: "#A8B9CC" },
        { name: "HTML5", level: 95, color: "#E34F26" },
        { name: "CSS3", level: 95, color: "#1572B6" },
      ],
    },
    {
      name: "Frontend",
      color: "#10B981",
      orbitIndex: 1,
      skills: [
        { name: "React", level: 95, color: "#61DAFB" },
        { name: "Next.js", level: 92, color: "#ffffff" },
        { name: "Tailwind CSS", level: 95, color: "#06B6D4" },
        { name: "Framer Motion", level: 88, color: "#FF0055" },
        { name: "ShadCN UI", level: 85, color: "#ffffff" },
        { name: "Responsive Design", level: 90, color: "#38BDF8" },
      ],
    },
    {
      name: "Backend",
      color: "#F97316",
      orbitIndex: 2,
      skills: [
        { name: "Node.js", level: 88, color: "#339933" },
        { name: "Express", level: 85, color: "#ffffff" },
        { name: "FastAPI", level: 75, color: "#009688" },
        { name: "REST APIs", level: 90, color: "#FF6B6B" },
        { name: "JWT", level: 85, color: "#D63AFF" },
        { name: "OAuth", level: 80, color: "#EB5424" },
      ],
    },
    {
      name: "Databases",
      color: "#8B5CF6",
      orbitIndex: 3,
      skills: [
        { name: "MongoDB", level: 85, color: "#47A248" },
        { name: "PostgreSQL", level: 82, color: "#4169E1" },
        { name: "Supabase", level: 80, color: "#3ECF8E" },
        { name: "Prisma", level: 85, color: "#2D3748" },
        { name: "Redis", level: 70, color: "#DC382D" },
      ],
    },
    {
      name: "DevOps & Tools",
      color: "#78716C",
      orbitIndex: 4,
      skills: [
        { name: "Git", level: 90, color: "#F05032" },
        { name: "GitHub", level: 90, color: "#ffffff" },
        { name: "Docker", level: 78, color: "#2496ED" },
        { name: "Vercel", level: 88, color: "#ffffff" },
        { name: "Postman", level: 85, color: "#FF6C37" },
        { name: "VS Code", level: 95, color: "#007ACC" },
      ],
    },
    {
      name: "Other Technologies",
      color: "#EAB308",
      orbitIndex: 5,
      skills: [
        { name: "Leaflet.js", level: 75, color: "#199900" },
        { name: "Razorpay", level: 80, color: "#0C2451" },
        { name: "NodeMailer", level: 82, color: "#22B573" },
        { name: "WebSockets", level: 70, color: "#FF6B6B" },
        { name: "Cloudinary", level: 78, color: "#3448C5" },
        { name: "Firebase", level: 75, color: "#FFCA28" },
      ],
    },
    {
      name: "Exploring",
      color: "#06B6D4",
      orbitIndex: 6,
      skills: [
        { name: "Blockchain", level: 50, color: "#F7931A" },
        { name: "AI/ML", level: 45, color: "#FF6F61" },
        { name: "Three.js", level: 60, color: "#ffffff" },
        { name: "Web3", level: 55, color: "#F16822" },
      ],
    },
  ],

  skills: [
    { name: "JavaScript", level: 95, category: "languages", color: "#F7DF1E" },
    { name: "TypeScript", level: 90, category: "languages", color: "#3178C6" },
    { name: "Python", level: 85, category: "languages", color: "#3776AB" },
    { name: "Solidity", level: 70, category: "languages", color: "#363636" },
    { name: "React", level: 95, category: "frontend", color: "#61DAFB" },
    { name: "Next.js", level: 92, category: "frontend", color: "#ffffff" },
    { name: "Tailwind CSS", level: 95, category: "frontend", color: "#06B6D4" },
    {
      name: "Framer Motion",
      level: 88,
      category: "frontend",
      color: "#FF0055",
    },
    { name: "Node.js", level: 88, category: "backend", color: "#339933" },
    { name: "Express", level: 85, category: "backend", color: "#ffffff" },
    { name: "FastAPI", level: 75, category: "backend", color: "#009688" },
    { name: "MongoDB", level: 85, category: "databases", color: "#47A248" },
    { name: "PostgreSQL", level: 82, category: "databases", color: "#4169E1" },
    { name: "Supabase", level: 80, category: "databases", color: "#3ECF8E" },
    { name: "Prisma", level: 85, category: "databases", color: "#2D3748" },
    { name: "Redis", level: 70, category: "databases", color: "#DC382D" },
    { name: "Git", level: 90, category: "devops", color: "#F05032" },
    { name: "Docker", level: 78, category: "devops", color: "#2496ED" },
    { name: "Vercel", level: 88, category: "devops", color: "#ffffff" },
    { name: "AWS", level: 70, category: "devops", color: "#FF9900" },
  ],

  projects: [
    {
      id: 1,
      title: "PayDeskNow",
      category: "Client Work · B2B Fintech",
      description: "A production B2B fintech platform enabling rural CSC retailers to offer AEPS, BBPS, DMT, and recharge services.",
      longDescription: "A production B2B fintech platform enabling rural CSC retailers to offer AEPS, BBPS, DMT, and recharge services to their communities. Real money, real transactions, real impact.",
      image: "/projects/paydesk.png",
      tags: ["Next.js", "Node.js", "MongoDB", "Payment Gateway APIs"],
      github: "",
      link: "",
      featured: true,
      year: 2025,
      color: "#F97316",
    },
    {
      id: 2,
      title: "FlashBill",
      category: "Client Work · POS System",
      description: "An offline-first billing software for restaurants and cafés.",
      longDescription: "An offline-first billing software for restaurants and cafés. Handles complete restaurant operations — billing, expense tracking, staff management, QR ordering, and website integration. Works flawlessly without internet.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      tags: ["Electron.js", "Next.js", "SQLite", "Node.js"],
      github: "https://github.com/SunilBaghel002/ZapBill_offline-software",
      link: "",
      featured: true,
      year: 2025,
      color: "#FEF3C7",
    },
    {
      id: 3,
      title: "Hello Pizza Cafe",
      category: "Client Work · WhatsApp Automation",
      description: "A pizza website with WhatsApp bulk marketing and POS integration.",
      longDescription: "A pizza website with WhatsApp bulk marketing and POS integration. Broadcasts messages to 10,000+ customers via WhatsApp, handles orders through an interactive bot, tracks loyalty points, and connects directly to FlashBill POS.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop",
      tags: ["Next.js", "Node.js", "WhatsApp Business API", "MongoDB"],
      github: "https://github.com/official-forgeweb/Hello_Pizza_Cafe",
      link: "https://hello-pizza-cafe.vercel.app/",
      featured: true,
      year: 2025,
      color: "#F97316",
    },
    {
      id: 4,
      title: "Mobitel",
      category: "Client Work · Quick Commerce",
      description: "On-demand doorstep mobile repair booking platform with Razorpay.",
      longDescription: "A doorstep mobile repair booking platform. Customers book from home, technicians arrive at their location, payments happen via Razorpay. Think Urban Company, but laser-focused on mobile repair.",
      image: "/projects/mobitel.png",
      tags: ["Next.js", "Node.js", "MongoDB", "Razorpay"],
      github: "https://github.com/official-forgeweb/Mobitel",
      link: "https://www.mobitel.in/",
      featured: true,
      year: 2025,
      color: "#FEF3C7",
    },
    {
      id: 5,
      title: "Proton SMS",
      category: "Client Work · Institute ERP",
      description: "Institute management SaaS system with automated WhatsApp notifications.",
      longDescription: "A comprehensive institute management platform handling students, teachers, attendance, fees, exams, and communications — all in one place. Integrated WhatsApp system for instant parent-teacher-student communication.",
      image: "/projects/proton.png",
      tags: ["Next.js", "Node.js", "MongoDB", "WhatsApp API"],
      github: "https://github.com/official-forgeweb/Proton_SMS",
      link: "https://proton-sms.vercel.app/",
      featured: false,
      year: 2025,
      color: "#F97316",
    },
    {
      id: 6,
      title: "Smart Power",
      category: "Hardware · Innovation",
      description: "Generating electricity from footsteps using recycled plastic bricks.",
      longDescription: "An affordable Indian alternative to Japan's expensive piezoelectric floor tiles. Recycled plastic bricks embedded with piezoelectric sensors generate electricity from footsteps. Custom power conversion, battery storage, mobile charging, IoT monitoring dashboard.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop",
      tags: ["Piezoelectric Sensors", "Arduino Uno", "ESP8266", "TP4056", "Custom PCB", "Next.js"],
      github: "",
      link: "",
      featured: true,
      year: 2025,
      color: "#FFD700",
    },
  ] as Project[],

  achievements: [
    {
      id: 1,
      title: "8× Hackathon Winner",
      organization: "Multiple Institutions",
      description:
        "Recognized for rapid prototyping, innovation, and end-to-end full-stack execution across multiple hackathons.",
      icon: "trophy",
      year: 2024,
    },
    {
      id: 2,
      title: "Open Source Contributor",
      organization: "GirlScript Summer of Code",
      description:
        "Contributed to open-source projects through feature additions, bug fixes, documentation, and global team collaboration.",
      icon: "star",
      year: 2025,
    },
    {
      id: 3,
      title: "Top Performer – OneTick Technologies",
      organization: "OneTick Technologies Pvt. Ltd.",
      description:
        "Appreciated for delivering production-ready features including real-time seat allocation and optimized APIs.",
      icon: "award",
      year: 2025,
    },
    {
      id: 4,
      title: "Project Deployment Excellence",
      organization: "Multiple Startups",
      description:
        "Successfully deployed multiple large-scale full-stack applications with authentication, dashboards, and automation.",
      icon: "rocket",
      year: 2024,
    },
  ],

  experience: [
    {
      id: 1,
      role: "Full Stack Developer Intern",
      company: "OneTick Technologies Pvt. Ltd.",
      period: "July 2025 – August 2025",
      description:
        "Built scalable systems with Next.js, TypeScript, Node.js, and MongoDB. Developed real-time seat allocation, optimized APIs, automated email flows, and collaborated in Agile workflows.",
    },
    {
      id: 2,
      role: "Open Source Contributor",
      company: "GirlScript Summer of Code (GSSOC)",
      period: "July 2025 – October 2025",
      description:
        "Implemented features, fixed bugs, and improved documentation across multiple repositories while collaborating with global maintainers.",
    },
  ],

  socials: [
    {
      name: "GitHub",
      url: "https://github.com/SunilBaghel002",
      icon: "github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/sunil-baghel-140a60348",
      icon: "linkedin",
    },
    { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
  ],
};

export type PortfolioData = typeof portfolioData;
export type Skill = (typeof portfolioData.skills)[0];
export type SkillCategory = (typeof portfolioData.skillCategories)[0];
export type CategorySkill =
  (typeof portfolioData.skillCategories)[0]["skills"][0];
