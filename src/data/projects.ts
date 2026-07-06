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
      live: "https://paydesknow.in/",
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
    image: "/projects/flashbill.png",
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
    image: "/projects/hello_pizza.png",
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
    id: "vogue-vault",
    number: "06",
    category: "client",
    type: "E-Commerce Platform",
    isFlagship: false,
    name: "Vogue Vault",
    tagline: "Premium clothing storefront with interactive catalog.",
    description:
      "A fast, responsive fashion e-commerce showcase featuring cart management drawers, dynamic listing filters, and interactive visual grids.",
    highlights: [
      { icon: "🛍️", text: "Visual storefront showcase" },
      { icon: "🛒", text: "Interactive cart management" },
      { icon: "🎨", text: "Sleek animated catalog filters" },
    ],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Stripe"],
    commits: "30+",
    links: {
      github: null,
      live: "https://voguevalut.vercel.app/",
    },
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
    year: "2025",
    color: "#ec4899",
  },
  {
    id: "homestead",
    number: "07",
    category: "client",
    type: "Real Estate Portal",
    isFlagship: false,
    name: "Homestead",
    tagline: "Luxury property search with custom mapping.",
    description:
      "A filterable property directory featuring dynamic Google Maps markers, pricing category tags, and responsive lead intake contact cards.",
    highlights: [
      { icon: "🏠", text: "Luxury property listings" },
      { icon: "📍", text: "Interactive location mapping" },
      { icon: "🔍", text: "Complex property queries" },
    ],
    tech: ["Next.js", "Tailwind CSS", "MongoDB", "Framer Motion"],
    commits: "25+",
    links: {
      github: null,
      live: "https://real-estate-ten-nu.vercel.app/",
    },
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    year: "2025",
    color: "#3b82f6",
  },
  {
    id: "decora",
    number: "08",
    category: "client",
    type: "Interior Design Portfolio",
    isFlagship: false,
    name: "Decora",
    tagline: "High-definition architectural interior catalog.",
    description:
      "A layout-focused styling showroom featuring parallax image scrolling, dynamic design collections, and smooth page transitions.",
    highlights: [
      { icon: "✨", text: "Showcase design concepts" },
      { icon: "🖼️", text: "Parallax project galleries" },
      { icon: "💫", text: "Fluid layout animations" },
    ],
    tech: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    commits: "20+",
    links: {
      github: null,
      live: "https://interior-design-showcase-nine.vercel.app/",
    },
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
    year: "2025",
    color: "#10b981",
  },
  {
    id: "gather",
    number: "09",
    category: "client",
    type: "Event Booking Platform",
    isFlagship: false,
    name: "Gather",
    tagline: "Organizer dashboard and ticket reservations.",
    description:
      "An organizer web portal mapping agendas, booking limits, speaker timetables, and registration counters with responsive ticketing features.",
    highlights: [
      { icon: "📅", text: "Speaker timelines & schedules" },
      { icon: "🎫", text: "Ticketing CTA flows" },
      { icon: "👥", text: "Attendee tracker counts" },
    ],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    commits: "20+",
    links: {
      github: null,
      live: "https://event-management-rho-gules.vercel.app/",
    },
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    year: "2025",
    color: "#f59e0b",
  },
  {
    id: "sankara-restaurant",
    number: "10",
    category: "client",
    type: "Fine Dining Website",
    isFlagship: false,
    name: "Sankara Restaurant",
    tagline: "A digital menu and booking app for gourmet dining.",
    description:
      "A fine dining digital storefront featuring interactive menus, chef highlights, table reservations, and smooth transitions.",
    highlights: [
      { icon: "🍽️", text: "Digital menu catalog" },
      { icon: "📅", text: "Table reservation manager" },
      { icon: "✨", text: "Gourmet design aesthetics" },
    ],
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    commits: "15+",
    links: {
      github: null,
      live: "https://sankara-restaurant.vercel.app/",
    },
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    year: "2025",
    color: "#f97316",
  },
  {
    id: "pankhuri-restaurant",
    number: "11",
    category: "client",
    type: "Multi-Cuisine Diner Portal",
    isFlagship: false,
    name: "Pankhuri Restaurant",
    tagline: "Digital reservation and online ordering catalog.",
    description:
      "A fast diner website supporting WhatsApp checkout links, filterable menu categories, and location navigation maps.",
    highlights: [
      { icon: "📲", text: "WhatsApp cart orders" },
      { icon: "🍕", text: "Diner menu navigation" },
      { icon: "📍", text: "Interactive location directions" },
    ],
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    commits: "15+",
    links: {
      github: null,
      live: "https://pankhuri-azure.vercel.app/",
    },
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    year: "2025",
    color: "#ea580c",
  },
  {
    id: "smart-power",
    number: "12",
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
