export const portfolioData = {
  name: "<Sunil Baghel>",
  role: "{Full Stack Developer}",
  bio: "{BIO}",
  email: "hello@example.com",
  location: "San Francisco, CA",

  skills: [
    { name: "React", level: 95, category: "frontend", color: "#61DAFB" },
    { name: "Next.js", level: 92, category: "frontend", color: "#000000" },
    { name: "TypeScript", level: 90, category: "language", color: "#3178C6" },
    { name: "Node.js", level: 88, category: "backend", color: "#339933" },
    { name: "Python", level: 85, category: "language", color: "#3776AB" },
    { name: "Three.js", level: 80, category: "3d", color: "#000000" },
    { name: "PostgreSQL", level: 82, category: "database", color: "#4169E1" },
    { name: "Docker", level: 78, category: "devops", color: "#2496ED" },
    { name: "AWS", level: 75, category: "cloud", color: "#FF9900" },
    { name: "GraphQL", level: 85, category: "api", color: "#E10098" },
    { name: "Tailwind CSS", level: 95, category: "styling", color: "#06B6D4" },
    {
      name: "Framer Motion",
      level: 88,
      category: "animation",
      color: "#0055FF",
    },
  ],

  projects: [
    {
      id: 1,
      title: "Project Alpha",
      description:
        "A revolutionary AI-powered platform that transforms how teams collaborate and create.",
      longDescription:
        "Built with cutting-edge technology, this platform leverages machine learning to provide intelligent suggestions and automate repetitive tasks.",
      image: "/projects/project1.jpg",
      video: "/projects/project1.mp4",
      tags: ["React", "Node.js", "AI/ML", "PostgreSQL"],
      link: "https://example.com",
      github: "https://github.com",
      featured: true,
      year: 2024,
    },
    {
      id: 2,
      title: "Project Beta",
      description:
        "Real-time data visualization dashboard with 3D graphics and immersive interactions.",
      longDescription:
        "An innovative dashboard that brings data to life through stunning visualizations and real-time updates.",
      image: "/projects/project2.jpg",
      tags: ["Three.js", "WebGL", "D3.js", "TypeScript"],
      link: "https://example.com",
      github: "https://github.com",
      featured: true,
      year: 2024,
    },
    {
      id: 3,
      title: "Project Gamma",
      description:
        "Mobile-first e-commerce platform with seamless payment integration.",
      longDescription:
        "A complete e-commerce solution featuring modern UI, secure payments, and inventory management.",
      image: "/projects/project3.jpg",
      tags: ["Next.js", "Stripe", "Prisma", "Tailwind"],
      link: "https://example.com",
      featured: false,
      year: 2023,
    },
    {
      id: 4,
      title: "Project Delta",
      description:
        "Open-source developer tools that streamline the development workflow.",
      longDescription:
        "A collection of CLI tools and VS Code extensions that boost developer productivity.",
      image: "/projects/project4.jpg",
      tags: ["Rust", "TypeScript", "CLI", "Open Source"],
      github: "https://github.com",
      featured: true,
      year: 2023,
    },
    {
      id: 5,
      title: "Project Epsilon",
      description:
        "Social platform for creators with built-in monetization features.",
      longDescription:
        "Empowering creators with tools to build their audience and monetize their content.",
      image: "/projects/project5.jpg",
      tags: ["React Native", "Firebase", "Stripe", "Node.js"],
      link: "https://example.com",
      featured: false,
      year: 2023,
    },
  ],

  achievements: [
    {
      id: 1,
      title: "Best Innovation Award",
      organization: "Tech Summit 2024",
      description:
        "Recognized for groundbreaking work in AI-driven user experiences.",
      icon: "trophy",
      year: 2024,
    },
    {
      id: 2,
      title: "Open Source Contributor",
      organization: "GitHub",
      description:
        "Top 1% contributor with 10,000+ contributions across major projects.",
      icon: "star",
      year: 2024,
    },
    {
      id: 3,
      title: "Speaker at ReactConf",
      organization: "React Community",
      description:
        "Presented advanced animation patterns to 5,000+ developers.",
      icon: "mic",
      year: 2023,
    },
    {
      id: 4,
      title: "Patent Holder",
      organization: "USPTO",
      description: "Patent for innovative real-time collaboration technology.",
      icon: "award",
      year: 2023,
    },
  ],

  experience: [
    {
      id: 1,
      role: "Senior Software Engineer",
      company: "Tech Corp",
      period: "2022 - Present",
      description:
        "Leading frontend architecture for a platform serving 10M+ users.",
    },
    {
      id: 2,
      role: "Full Stack Developer",
      company: "Startup Inc",
      period: "2020 - 2022",
      description: "Built core product features that drove 300% user growth.",
    },
    {
      id: 3,
      role: "Frontend Developer",
      company: "Agency Co",
      period: "2018 - 2020",
      description: "Crafted award-winning websites for Fortune 500 clients.",
    },
  ],

  socials: [
    { name: "GitHub", url: "https://github.com", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { name: "Dribbble", url: "https://dribbble.com", icon: "dribbble" },
  ],
};

export type PortfolioData = typeof portfolioData;
