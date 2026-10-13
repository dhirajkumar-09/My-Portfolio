export const DEFAULT_PROFILE = {
  name: "Dhiraj Kumar",
  role: "Full-Stack Engineer & IoT Developer",
  focus: "Distributed Systems · Modern Web · Smart Hardware",
  headline: "Engineering Scalable Systems,",
  headlineAccent: "that solve real-world problems.",
  intro: "Computer Science & IoT engineer designing and shipping full-stack products end-to-end — from database schemas and cloud infrastructure to fluid, intuitive interfaces. Passionate about clean architectures and robust engineering.",
  email: "dhidna9090@gmail.com",
  linkedin: "https://www.linkedin.com/in/dhiraj-kumar-01b185350?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://github.com/dhirajkumar-09/My-Portfolio",
  resumeUrl: "#",
  location: "India",
  status: "Open to Opportunities",
  stats: [
    { k: "Years Experience", v: "03+" },
    { k: "Projects Shipped", v: "18+" },
    { k: "Certifications", v: "09" },
    { k: "DSA Problems Solved", v: "300+" },
  ],
};

export const DEFAULT_PROJECTS = [
  {
    title: "Ledgerline",
    subtitle: "Expense Automation & Reconciliation Engine",
    desc: "A high-performance reconciliation engine that ingests financial feeds and digital invoices, automatically categorizing spend with high accuracy. Reduced manual bookkeeping cycles by 70% for pilot teams.",
    stack: ["React", "Node.js", "PostgreSQL", "AWS Lambda", "Tailwind CSS"],
    category: "Full-Stack",
    live: "https://github.com/dhirajkumar-09/My-Portfolio",
    source: "https://github.com/dhirajkumar-09/My-Portfolio",
    image: null,
    highlights: ["Real-time financial ingestion", "OCR invoice parsing", "Automated ledger matching"],
  },
  {
    title: "EduForge",
    subtitle: "Real-Time Collaborative Learning Platform",
    desc: "An interactive online learning system with live multi-user code editors, synchronized digital canvas, and low-latency communication for real-time remote engineering mentorship.",
    stack: ["React", "Firebase", "WebSockets", "Node.js", "Express"],
    category: "Full-Stack",
    live: "https://github.com/dhirajkumar-09/My-Portfolio",
    source: "https://github.com/dhirajkumar-09/My-Portfolio",
    image: null,
    highlights: ["Sub-50ms collaboration sync", "Sandboxed runner", "Role-based access control"],
  },
  {
    title: "IoT Smart Mesh & Telemetry Hub",
    subtitle: "Distributed Environmental Monitoring Grid",
    desc: "Low-power edge sensor platform connecting ESP32 nodes over MQTT. Features dynamic failover routing and streams telemetry metrics directly to a reactive analytical web dashboard.",
    stack: ["C++ / Arduino", "ESP32", "MQTT", "Python", "React", "TimescaleDB"],
    category: "IoT & Systems",
    live: "https://github.com/dhirajkumar-09/My-Portfolio",
    source: "https://github.com/dhirajkumar-09/My-Portfolio",
    image: null,
    highlights: ["Edge telemetry aggregation", "Deep-sleep power optimization", "Dynamic alert triggers"],
  },
  {
    title: "DevMetrics Pipeline",
    subtitle: "Engineering Health & CI/CD Observability",
    desc: "Automated developer productivity monitor measuring deployment velocity, pull request turnaround time, and build reliability across distributed repositories.",
    stack: ["Go", "React", "Docker", "GitHub Actions", "Tailwind CSS"],
    category: "Cloud & DevOps",
    live: "https://github.com/dhirajkumar-09/My-Portfolio",
    source: "https://github.com/dhirajkumar-09/My-Portfolio",
    image: null,
    highlights: ["Automated DORA metrics", "Slack status notifications", "Containerized microservice"],
  }
];

export const DEFAULT_CERTIFICATES = [
  {
    seal: "AWS",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2025",
    desc: "Architecting secure, fault-tolerant, and scalable multi-tier architectures on AWS cloud infrastructure.",
    verifyUrl: "https://aws.amazon.com/verification",
    image: null
  },
  {
    seal: "META",
    title: "Full-Stack Web Development Specialization",
    issuer: "Meta / Coursera",
    date: "2024",
    desc: "Mastery of advanced React state management, REST API architecture, and database relational models.",
    verifyUrl: "https://coursera.org/verify",
    image: null
  },
  {
    seal: "IoT",
    title: "IoT & Embedded Systems Engineering",
    issuer: "UC Irvine / Coursera",
    date: "2024",
    desc: "Microcontroller architecture, sensor interfacing, wireless communication protocols, and RTOS fundamentals.",
    verifyUrl: "https://coursera.org/verify",
    image: null
  },
  {
    seal: "DSA",
    title: "Data Structures & Algorithms in Java",
    issuer: "Coding Ninjas",
    date: "2023",
    desc: "Rigorous algorithmic problem solving covering trees, graphs, dynamic programming, and space-time optimization.",
    verifyUrl: "https://codingninjas.com",
    image: null
  }
];

export const DEFAULT_SKILLS = [
  {
    label: "Frontend",
    category: "User Interfaces",
    items: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 & CSS3", "Vite", "Redux"]
  },
  {
    label: "Backend & APIs",
    category: "Server Architectures",
    items: ["Node.js", "Express.js", "Python", "Go", "RESTful APIs", "GraphQL", "WebSockets"]
  },
  {
    label: "Databases & Cloud",
    category: "Infrastructure & Data",
    items: ["PostgreSQL", "MongoDB", "Firebase Firestore", "AWS (S3, Lambda)", "Docker", "Git & GitHub"]
  },
  {
    label: "IoT & Embedded",
    category: "Hardware & Edge",
    items: ["ESP32 / ESP8266", "Arduino", "Raspberry Pi", "Embedded C / C++", "MQTT Protocol", "Sensors & Actuators"]
  },
  {
    label: "Engineering Foundations",
    category: "Computer Science",
    items: ["Data Structures & Algorithms", "System Design", "OOP", "Database Indexing", "CI/CD Pipelines"]
  }
];

export const DEFAULT_ACTIVITY_LOGS = [
  {
    date: "October 2026",
    title: "Portfolio V3 Redesign & Performance Overhaul",
    desc: "Completely redesigned portfolio with modular React architecture, glassmorphic UI, responsive navigation, and instant-load optimizations."
  },
  {
    date: "August 2026",
    title: "EduForge Real-Time Beta Launch",
    desc: "Shipped collaborative online learning environment with synchronized code editing and role-based permissions."
  },
  {
    date: "July 2026",
    title: "Ledgerline Pilot Deployment",
    desc: "Successfully deployed automated expense reconciliation platform with OCR invoice parsing for pilot customers."
  },
  {
    date: "March 2026",
    title: "AWS Solutions Architect Credential",
    desc: "Earned AWS Certified Solutions Architect credential, validating core cloud infrastructure and scalability expertise."
  }
];

export const NAV = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Toolkit" },
  { id: "certificates", label: "Certifications" },
  { id: "activity", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

export const GREETINGS = [
  "Hello",
  "नमस्ते",
  "Hola",
  "Bonjour",
  "Ciao",
  "Konnichiwa",
  "Merhaba",
  "Welcome",
  "DHIRAJ KUMAR"
];

export const emptyProject = () => ({
  title: "New Project",
  subtitle: "Short subtitle or overview",
  desc: "Describe the technical challenge, architecture, and impact of this project.",
  stack: ["React", "Node.js", "Tailwind CSS"],
  category: "Full-Stack",
  live: "#",
  source: "#",
  image: null,
  highlights: ["Feature highlight 1", "Feature highlight 2"],
});

export const emptyCert = () => ({
  seal: "NEW",
  title: "Certificate Name",
  issuer: "Issuing Organization",
  date: "2026",
  desc: "Brief summary of skills or domain validated by this certification.",
  verifyUrl: "#",
  image: null
});

export const emptyLog = () => ({
  date: "New Milestone",
  title: "Milestone Title",
  desc: "Describe what was accomplished, built, or achieved."
});
