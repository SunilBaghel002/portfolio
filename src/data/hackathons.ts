export interface Hackathon {
  id: string;
  order: number;
  isNational: boolean;
  isFeatured: boolean;
  event: string;
  location: string;
  date: string;
  prize: number | null;
  project: string;
  projectFullName: string;
  projectDescription: string;
  story?: string;
  note?: string;
  photos: string[];
}

export const hackathons: Hackathon[] = [
  {
    id: "sharda-2025",
    order: 1,
    isNational: true,
    isFeatured: true,
    event: "6th Technovation Hackathon",
    location: "Sharda University, Noida",
    date: "January 25–26, 2025",
    prize: 25000,
    project: "PIPH",
    projectFullName: "Pandemic Insights and Preparedness Hub",
    projectDescription:
      "A platform to help people prepare before pandemics hit: information dissemination, food supply coordination, GPS-based patient tracking for hospitals, and more.",
    story:
      "It was my very first hackathon. National level. 6th Technovation at Sharda University, Noida.\n\nI had never built anything close to what my competitors were showing off. I only knew basic HTML, CSS, and JavaScript. Everyone around me looked more experienced.\n\nWe built PIPH — Pandemic Insights and Preparedness Hub. A platform to help people prepare before pandemics hit: information dissemination, food supply coordination, GPS-based patient tracking for hospitals, and more.\n\nTwo days later, I walked out with a ₹25,000 winning cheque and something I couldn't quite explain — the feeling that maybe I could actually do this.",
    note: "My first hackathon ever, knowing only HTML/CSS/JS",
    photos: ["/personal/hackathon-winning.jpg"],
  },
  {
    id: "jcbose-pic-2025",
    order: 2,
    isNational: false,
    isFeatured: false,
    event: "Project Innovation Council Hackathon",
    location: "J.C. Bose University",
    date: "March 13–14, 2025",
    prize: null,
    project: "PIPH",
    projectFullName: "Pandemic Insights and Preparedness Hub",
    projectDescription: "Refined version of PIPH with improved UI and additional data analytics features.",
    photos: ["/personal/winning2.jpg"],
  },
  {
    id: "iitdelhi-tryst-2025",
    order: 3,
    isNational: false,
    isFeatured: false,
    event: "Tryst Hackathon",
    location: "IIT Delhi",
    date: "April 12, 2025",
    prize: null,
    project: "AI Career Mapping Tool",
    projectFullName: "AI Career Mapping Tool",
    projectDescription:
      "Helps students find their correct career path through targeted questions and AI-driven analysis.",
    photos: ["/personal/hackathon-winning.jpg"],
  },
  {
    id: "aravali-sih-2025",
    order: 4,
    isNational: false,
    isFeatured: false,
    event: "Internal SIH 2025",
    location: "Aravali College of Engineering & Management",
    date: "September 20, 2025",
    prize: null,
    project: "Smart Power",
    projectFullName: "Smart Power — Piezoelectric Floor Tiles",
    projectDescription:
      "First outing for Smart Power — generating electricity from footsteps using recycled plastic bricks with embedded piezoelectric sensors.",
    photos: ["/personal/winning2.jpg"],
  },
  {
    id: "dgim-2025",
    order: 5,
    isNational: false,
    isFeatured: false,
    event: "DGIM Hackathon 2025",
    location: "DGIM College",
    date: "October 13, 2025",
    prize: 15000,
    project: "Smart Power",
    projectFullName: "Smart Power — Piezoelectric Floor Tiles",
    projectDescription:
      "Refined Smart Power with improved circuit design and live IoT monitoring dashboard.",
    photos: ["/personal/hackathon-winning.jpg"],
  },
  {
    id: "nexhack-2025",
    order: 6,
    isNational: true,
    isFeatured: true,
    event: "NexHack 2025",
    location: "Geeta University, Panipat, Haryana",
    date: "November 3–4, 2025",
    prize: 25000,
    project: "Smart Power",
    projectFullName: "Smart Power — Piezoelectric Floor Tiles",
    projectDescription:
      "The full cross-disciplinary innovation: Civil Engineering brick design + Electronics AC-DC conversion + Arduino control + ESP8266 IoT + Full-stack monitoring dashboard.",
    story:
      "NexHack 2025 at Geeta University, Panipat, Haryana. November 3-4, 2025.\n\nWe showed up with Smart Power — a project that had no business existing in a hackathon setting. It combined Civil Engineering, Electronics, Embedded Systems, IoT, and Full-Stack Development. It generated electricity from footsteps.\n\nJapan has this technology, but their panels cost lakhs. We built ours from recycled plastic bricks mixed with sand, clay, glass, and bitumen. Embedded piezoelectric sensors. Built our own AC-to-DC conversion circuit. Added Arduino for control, ESP8266 for IoT, TP4056 for mobile charging, and a live monitoring dashboard.\n\nI did 50% of the work — from ideation to electronics to civil design to code to presentation.\n\nWe won ₹25,000. But more importantly, this project went on to win 4 different hackathons across the country.",
    photos: ["/personal/winning2.jpg"],
  },
  {
    id: "manav-rachna-2025",
    order: 7,
    isNational: false,
    isFeatured: false,
    event: "Manav Rachna Tech Fest",
    location: "Manav Rachna University",
    date: "November 2025",
    prize: null,
    project: "Smart Power",
    projectFullName: "Smart Power — Piezoelectric Floor Tiles",
    projectDescription:
      "Double win at one fest — took both Project Showcase and Ideathon categories with Smart Power.",
    note: "Won both Project Showcase and Ideathon at the same fest",
    photos: ["/personal/hackathon-winning.jpg"],
  },
  {
    id: "visionx-2026",
    order: 8,
    isNational: false,
    isFeatured: false,
    event: "VisionX 2026",
    location: "J.C. Bose University",
    date: "February 10, 2026",
    prize: 5000,
    project: "Smart Power",
    projectFullName: "Smart Power — Piezoelectric Floor Tiles",
    projectDescription:
      "Latest iteration of Smart Power with refined hardware and improved power output efficiency.",
    photos: ["/personal/winning2.jpg"],
  },
];

// Calculated stats
export const hackathonStats = {
  totalParticipated: 15,
  totalWins: 8,
  nationalWins: 2,
  totalPrize: 80000,
};
