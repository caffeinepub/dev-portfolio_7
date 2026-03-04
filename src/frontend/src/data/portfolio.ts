export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  image: string;
  techs: string[];
  liveUrl: string;
  repoUrl: string;
  features: string[];
  challenges: string;
  learned: string;
}

export interface Skill {
  name: string;
  icon: string;
  proficiency: number;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  achievement: string;
}

export const projects: Project[] = [
  {
    id: "startup-website",
    title: "Startup Website",
    shortDesc:
      "Full-stack startup website built with React, Node.js, and MongoDB",
    description:
      "A fully functional startup website developed using the MERN stack. Features a modern landing page, dynamic content management, contact forms, and a clean responsive design tailored for a startup's online presence.",
    image: "/assets/generated/project-ecommerce.dim_600x400.jpg",
    techs: ["React.js", "Node.js", "MongoDB"],
    liveUrl: "#",
    repoUrl: "https://github.com/Kundan3930",
    features: [
      "Modern responsive landing page design",
      "Dynamic content sections with React components",
      "Backend API with Node.js and Express",
      "MongoDB database integration",
      "Contact form with backend storage",
      "Clean and professional UI/UX",
    ],
    challenges:
      "Designing a scalable component architecture while keeping the UI polished and the backend lightweight. Ensuring data consistency between MongoDB and the frontend in real time was a key challenge.",
    learned:
      "Gained practical experience with the full MERN stack, improved skills in REST API design, database schema planning, and deploying full-stack applications end to end.",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    shortDesc: "Personal developer portfolio with animations and modern UI",
    description:
      "A personal portfolio website showcasing projects, skills, and experience. Built with HTML, CSS, JavaScript, and React.js. Features smooth animations, responsive design, and an engaging visual layout to represent a developer's professional brand.",
    image: "/assets/generated/project-portfolio.dim_600x400.jpg",
    techs: ["HTML", "CSS", "JavaScript", "React.js"],
    liveUrl: "#",
    repoUrl: "https://github.com/Kundan3930",
    features: [
      "Animated hero section with typing effect",
      "Project showcase with filterable grid",
      "Smooth scroll navigation",
      "Responsive layout for all screen sizes",
      "Skills section with visual indicators",
      "Contact form integration",
    ],
    challenges:
      "Creating fluid animations while keeping the page lightweight and fast. Balancing visual impact with accessibility and performance across devices was an important design constraint.",
    learned:
      "Deepened understanding of CSS animations, React component architecture, responsive design principles, and how to create an impactful digital presence as a developer.",
  },
  {
    id: "tic-tac-toe",
    title: "Tic-Tac-Toe Game",
    shortDesc: "Interactive browser-based Tic-Tac-Toe game with smart UI",
    description:
      "A classic Tic-Tac-Toe game built entirely with HTML, CSS, and JavaScript. Features a clean game board, win detection logic, player turn tracking, score keeping, and a restart option — all without any external libraries.",
    image: "/assets/generated/project-chat.dim_600x400.jpg",
    techs: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#",
    repoUrl: "https://github.com/Kundan3930",
    features: [
      "Two-player game on a single device",
      "Win and draw detection logic",
      "Player turn indicators",
      "Score tracking across rounds",
      "Restart and reset functionality",
      "Fully responsive game board",
    ],
    challenges:
      "Implementing the win-detection algorithm efficiently and ensuring the game state updates correctly without any framework or library. Keeping the UI responsive and interactive with pure JavaScript was a rewarding constraint.",
    learned:
      "Strengthened core JavaScript skills including DOM manipulation, event handling, conditional logic, and game state management without relying on any external dependencies.",
  },
];

export const skills: Skill[] = [
  {
    name: "C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    proficiency: 80,
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    proficiency: 85,
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    proficiency: 95,
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    proficiency: 90,
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    proficiency: 88,
  },
  {
    name: "React.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    proficiency: 85,
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    proficiency: 80,
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    proficiency: 78,
  },
  {
    name: "SQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    proficiency: 75,
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    proficiency: 88,
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    proficiency: 90,
  },
  {
    name: "DSA",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    proficiency: 82,
  },
];

export const certifications: Certification[] = [
  {
    id: 1,
    title: "FullStack Development",
    issuer: "Udemy",
    date: "2025–Present",
    image: "/assets/generated/cert-webdev.dim_600x400.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "Design Thinking",
    issuer: "Swayam (NPTEL) IIT Madras",
    date: "Jul 2025 – Oct 2025",
    image: "/assets/generated/cert-dsa.dim_600x400.jpg",
    link: "#",
  },
];

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Birat Global Academy | Biratnagar",
    role: "Frontend Trainer",
    duration: "June 2025 – Aug 2025",
    responsibilities: [
      "Contributed to web projects using modern development tools and frameworks (HTML, CSS, JavaScript, React, Node.js)",
      "Gained hands-on experience in project workflow, version control (Git), and collaborative development",
      "Enhanced problem-solving, teamwork, and mentorship skills while working on real projects in a professional environment",
    ],
    achievement:
      "Successfully mentored students in modern frontend development tools and delivered real-world web projects",
  },
  {
    id: 2,
    company: "Ocean Institute Pvt Ltd.",
    role: "Computer Trainer",
    duration: "2023 – 2024",
    responsibilities: [
      "Instructed students on fundamental computer skills including MS Office, internet usage, and file management",
      "Provided practical exercises and demonstrations to help learners gain confidence in day-to-day computer operations",
      "Assisted students in troubleshooting common computer issues and improved their overall digital literacy",
    ],
    achievement:
      "Improved overall digital literacy of students with effective practical training and hands-on demonstrations",
  },
];
