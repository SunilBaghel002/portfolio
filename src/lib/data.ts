export const portfolioData = {
  name: "{Sunil Baghel}",
  role: "<Full Stack Developer/>",
  bio: "Full-stack developer passionate about building impactful, scalable systems. 8× hackathon winner with strong skills in Next.js, Node.js, TypeScript, and cloud-native development. I love turning ideas into real-world products through clean architecture, fast execution, and modern UI/UX.",
  email: "sunilbaghel93100@gmail.com",
  location: "Faridabad, Haryana, India",

  skillCategories: [
    {
      name: "Languages",
      color: "#3B82F6", // Blue
      orbitIndex: 0,
      skills: [
        { name: "JavaScript", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Python", level: 85 },
        { name: "Solidity", level: 70 },
        { name: "C", level: 65 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 95 },
      ],
    },
    {
      name: "Frontend",
      color: "#10B981", // Green
      orbitIndex: 1,
      skills: [
        { name: "React", level: 95 },
        { name: "Next.js", level: 92 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Framer Motion", level: 88 },
        { name: "ShadCN UI", level: 85 },
        { name: "Responsive Design", level: 90 },
      ],
    },
    {
      name: "Backend",
      color: "#F97316", // Orange
      orbitIndex: 2,
      skills: [
        { name: "Node.js", level: 88 },
        { name: "Express", level: 85 },
        { name: "FastAPI", level: 75 },
        { name: "REST APIs", level: 90 },
        { name: "JWT", level: 85 },
        { name: "OAuth", level: 80 },
      ],
    },
    {
      name: "Databases",
      color: "#8B5CF6", // Purple
      orbitIndex: 3,
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 82 },
        { name: "Supabase", level: 80 },
        { name: "Prisma", level: 85 },
        { name: "Redis", level: 70 },
      ],
    },
    {
      name: "DevOps & Tools",
      color: "#78716C", // Brown/Gray
      orbitIndex: 4,
      skills: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 90 },
        { name: "Docker", level: 78 },
        { name: "Vercel", level: 88 },
        { name: "Postman", level: 85 },
        { name: "VS Code", level: 95 },
      ],
    },
    {
      name: "Other Technologies",
      color: "#EAB308", // Yellow
      orbitIndex: 5,
      skills: [
        { name: "Leaflet.js", level: 75 },
        { name: "Razorpay", level: 80 },
        { name: "NodeMailer", level: 82 },
        { name: "WebSockets", level: 70 },
        { name: "Cloudinary", level: 78 },
        { name: "Firebase", level: 75 },
      ],
    },
    {
      name: "Exploring",
      color: "#06B6D4", // Cyan
      orbitIndex: 6,
      skills: [
        { name: "Blockchain", level: 50 },
        { name: "AI/ML", level: 45 },
        { name: "Three.js", level: 60 },
        { name: "Web3", level: 55 },
      ],
    },
  ],

  // Flat skills array for other components
  skills: [
    { name: "JavaScript", level: 95, category: "languages", color: "#F7DF1E" },
    { name: "TypeScript", level: 90, category: "languages", color: "#3178C6" },
    { name: "Python", level: 85, category: "languages", color: "#3776AB" },
    { name: "Solidity", level: 70, category: "languages", color: "#363636" },
    { name: "React", level: 95, category: "frontend", color: "#61DAFB" },
    { name: "Next.js", level: 92, category: "frontend", color: "#000000" },
    { name: "Tailwind CSS", level: 95, category: "frontend", color: "#06B6D4" },
    { name: "Framer Motion", level: 88, category: "frontend", color: "#0055FF" },
    { name: "Node.js", level: 88, category: "backend", color: "#339933" },
    { name: "Express", level: 85, category: "backend", color: "#000000" },
    { name: "FastAPI", level: 75, category: "backend", color: "#009688" },
    { name: "MongoDB", level: 85, category: "databases", color: "#47A248" },
    { name: "PostgreSQL", level: 82, category: "databases", color: "#4169E1" },
    { name: "Supabase", level: 80, category: "databases", color: "#3ECF8E" },
    { name: "Prisma", level: 85, category: "databases", color: "#2D3748" },
    { name: "Redis", level: 70, category: "databases", color: "#DC382D" },
    { name: "Git", level: 90, category: "devops", color: "#F05032" },
    { name: "Docker", level: 78, category: "devops", color: "#2496ED" },
    { name: "Vercel", level: 88, category: "devops", color: "#000000" },
    { name: "AWS", level: 70, category: "devops", color: "#FF9900" },
  ],

  projects: [
    {
      id: 1,
      title: "Blood Donation Platform",
      description:
        "A real-time blood donor–hospital coordination platform powered by MERN stack.",
      longDescription:
        "A full-stack system enabling real-time donor discovery, emergency alerts, automated email notifications, JWT authentication, Leaflet maps, and hospital–donor request workflows. Designed for reliability, quick access, and large-scale medical use.",
      image: "/projects/blood-donation.jpg",
      tags: ["React", "Node.js", "MongoDB", "JWT", "Leaflet"],
      github: "https://github.com/SunilBaghel002/Blood-Donation",
      featured: true,
      year: 2024,
    },

    {
      id: 2,
      title: "Sankalp Welfare Platform",
      description:
        "Donation and welfare management system with Razorpay and cloud media storage.",
      longDescription:
        "A scalable MERN-based platform for welfare campaigns featuring secure Razorpay payments, admin dashboards, financial logs, cloud storage, and media uploads. Optimized backend ensures smooth donation flows and reliable performance under load.",
      image: "/projects/sankalp.jpg",
      tags: ["MERN", "Razorpay", "Cloud Storage", "Node.js"],
      github: "https://github.com/SunilBaghel002/Sankalp",
      featured: true,
      year: 2024,
    },

    {
      id: 3,
      title: "Skill Shastra",
      description:
        "A learning and skill-building platform built with modern full-stack architecture.",
      longDescription:
        "A structured skill development platform offering categorized learning modules, progress tracking, intuitive UI, and modern frontend interactions. Built with clean code and reusable components for scalability.",
      image: "/projects/skill-shastra.jpg",
      tags: ["React", "Node.js", "MongoDB", "Tailwind"],
      github: "https://github.com/SunilBaghel002/Skill-Shastra",
      featured: false,
      year: 2024,
    },

    {
      id: 4,
      title: "Smart Power – Energy Harvesting System",
      description:
        "A hardware + software IoT system for harvesting energy using piezoelectric sensors.",
      longDescription:
        "An innovative hybrid system that captures footstep energy through piezoelectric sensors and visualizes real-time power generation through a full-stack web dashboard. Included microcontroller programming, energy storage logic, and live monitoring UI.",
      image: "/projects/smart-power.jpg",
      tags: ["IoT", "Hardware", "JavaScript", "Web Dashboard"],
      github: "https://github.com/SunilBaghel002/Smart_Power_Frontend",
      featured: true,
      year: 2024,
    },

    {
      id: 5,
      title: "Pandemic Insights & Preparedness Hub (PIPH)",
      description:
        "A real-time pandemic dashboard with analytics, maps, and predictive systems.",
      longDescription:
        "A multi-module pandemic management system featuring real-time stats using APIs, resource allocation tools, volunteer systems, hospital locators, mapping with Leaflet, and predictive dashboards. Built using Node.js, Express, and MongoDB.",
      image: "/projects/piph.jpg",
      tags: ["Node.js", "Express", "MongoDB", "Leaflet", "OpenWeather"],
      github:
        "https://github.com/SunilBaghel002/PIPH_Pandemic-Insights-and-Preparedness-Hub",
      featured: true,
      year: 2025,
    },
  ],

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