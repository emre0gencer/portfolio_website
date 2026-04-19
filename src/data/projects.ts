export interface Project {
  id: string;
  title: string;
  role: string;
  description: string;
  impact?: string;
  techStack: string[];
  category: string;
  categories?: string[];
  date: string;
  githubUrl?: string;
  liveUrl?: string;
  awardsUrl?: string;
  details?: {
    problem: string;
    solution: string;
    contribution: string;
    learned: string[];
  };
}

export const projects: Project[] = [
  {
    id: "executionlab-ruby",
    title: "ExecutionLab - Ruby Full-Stack VM Visualization App",
    role: "Solo Developer",
    description:
      "Full-stack Ruby on Rails app that runs sample bytecode programs through multiple VM implementations and surfaces side-by-side execution traces and performance metrics. Bridges hands-on VM knowledge from low-level C coursework with higher-level full-stack development, making machine-level design decisions visible and comparable through a browser interface.",
    techStack: [
      "Ruby on Rails",
      "Virtual Machines",
      "JavaScript",
      "Bytecode Interpreters",
      "ActiveRecord",
      "Stack & Call Frame Design",
      "Performance Benchmarking",
      "HTML",
      "CSS",
      "MVC Architecture",
      "Ruby",
    ],
    category: "Systems",
    categories: ["Systems", "Web Dev", "Full-Stack Development"],
    date: "2026",
    githubUrl: "https://github.com/emre0gencer/executionlabruby",
    details: {
      problem:
        "Understanding how VM design trade-offs manifest at runtime is difficult without being able to observe them directly. Stack-based vs. register-based execution models, call frame management, and opcode dispatch strategies are well-defined in theory but hard to compare interactively against real bytecode programs.",
      solution:
        "Built a full-stack Rails application that implements multiple VM backends sharing a common bytecode format. Users load sample programs, execute them across different VM implementations, and view side-by-side instruction traces, operand stack states, and wall-clock performance metrics — all surfaced through a clean browser interface backed by Rails MVC and ActiveRecord.",
      contribution:
        "Sole developer responsible for VM backend implementations, bytecode program library, Rails MVC architecture, ActiveRecord data modeling, execution trace logging, performance benchmarking pipeline, and frontend visualization of runtime metrics.",
      learned: [
        "Translating low-level VM concepts from C into idiomatic Ruby",
        "Designing multiple interchangeable VM backends under a shared interface",
        "Surfacing execution internals (stack state, frame depth, cycle counts) as structured data",
        "Rails MVC patterns for data-driven visualization features",
        "Benchmarking and comparing runtime behavior across implementation strategies",
      ],
    },
  },
  {
    id: "applyeasy",
    title: "ApplyEasy - Resume Tailoring Platform",
    role: "Full-Stack Developer",
    description:
      "Full-stack AI platform that tailors resumes to specific job descriptions using semantic relevance ranking, LLM-based bullet rewriting, and one-page PDF rendering. Features a multi-step backend pipeline covering profile extraction, job analysis, fit scoring, resume generation, validation, and export — with built-in safeguards against hallucinated claims and keyword stuffing.",
    techStack: ["Python", "FastAPI", "React", "TypeScript", "SQLite", "LLM Integration", "Semantic Matching", "NLP"],
    category: "Web Dev",
    categories: ["Web Dev", "AI & Data", "Full-Stack Development"],
    date: "2026",
    githubUrl: "https://github.com/emre0gencer/applyeasy",
    details: {
      problem:
        "Tailoring a resume to each job posting is time-consuming and error-prone — most applicants either submit generic resumes or over-optimize with keyword stuffing, both of which reduce their chances with modern ATS systems and human reviewers.",
      solution:
        "Built a full-stack platform that automates resume tailoring end-to-end: the backend pipeline extracts structured profile data, analyzes the target job description, scores fit via semantic matching, rewrites bullets using an LLM, validates output for accuracy, and renders a clean one-page PDF. Guardrails prevent hallucinated claims and excessive keyword inflation.",
      contribution:
        "Sole full-stack developer responsible for the FastAPI backend pipeline, React/TypeScript frontend, SQLite data layer, LLM prompt engineering and integration, semantic matching logic, Jinja2-based PDF templating, and end-to-end validation system.",
      learned: [
        "Designing multi-step LLM pipelines with validation and guardrails",
        "Semantic similarity scoring for job-resume fit analysis",
        "FastAPI backend architecture and API design",
        "Prompt engineering for structured, factual LLM output",
        "PDF generation from server-side templates with Jinja2",
        "Full-stack integration across Python backend and React frontend",
      ],
    },
  },
  {
    id: "store-management-rails",
    title: "Store Management System",
    role: "Solo Developer",
    description:
      "Full-stack web application built with Ruby on Rails, designed around a carefully planned ERD and translated into ActiveRecord models with validations, associations, and database constraints. Developed across the full MVC stack — routes, controllers, models, and views — connecting backend business logic with user-facing functionality and emphasizing maintainable, correct relational data workflows.",
    techStack: ["Ruby", "Ruby on Rails", "ActiveRecord", "MVC Architecture", "ERD", "SQL", "HTML", "CSS"],
    category: "Web Dev",
    categories: ["Web Dev", "Backend Systems", "Databases"],
    date: "2026",
    details: {
      problem:
        "Design and build a reliable store management system from scratch, beginning with a well-structured data model and implementing the full application layer — from database constraints to user-facing views — within the conventions of a full-stack framework.",
      solution:
        "Designed an ERD to model the domain, then translated it into Rails ActiveRecord models with validations, associations, and database-level constraints. Implemented the full MVC stack: RESTful routes, controllers handling business logic, and views surfacing functionality to users. Prioritized correctness and maintainability throughout the data workflows.",
      contribution:
        "Sole developer responsible for ERD design, schema implementation, ActiveRecord modeling, route and controller development, view construction, and end-to-end testing of relational data workflows.",
      learned: [
        "ERD design and schema-to-code translation in Rails",
        "ActiveRecord associations, validations, and database constraints",
        "Full-stack MVC development with Rails conventions",
        "Backend integration and database-backed feature design",
        "Component-based thinking applied to server-rendered web applications",
      ],
    },
  },
  {
    id: "c0vm",
    title: "C0 Virtual Machine (C0VM)",
    role: "Solo Developer",
    description:
      "A fully functional stack-based virtual machine for the C0 programming language, implemented in C as the final project for CMU 15-122 (Principles of Imperative Computation). The VM executes compiler-generated bytecode, supports function calls, control flow, heap allocation, arrays, structs, native function interop, and robust runtime error handling, closely mirroring real-world VM and compiler backend design.",
    techStack: [
      "C",
      "Systems Programming",
      "Virtual Machines",
      "Bytecode Interpreters",
      "Memory Management",
      "Stack & Call Frame Design",
      "Low-Level Debugging",
      "Valgrind"
    ],
    category: "Systems",
    categories: ["Systems", "Course Project", "Low-Level Programming"],
    date: "2025",
    githubUrl: undefined, // typically private for 15-122
    details: {
      problem:
        "Design and implement a complete virtual machine capable of executing arbitrary C0 programs from compiled bytecode, while ensuring correct control flow, memory safety, stack discipline, and precise runtime error reporting — all in an unsafe language (C).",
      solution:
        "Implemented a stack-based abstract machine inspired by the JVM and LLVM, including an operand stack, program counter, call stack with activation records, local variable environments, constant pools, and a dynamically allocated heap for arrays and structs. The VM decodes and executes dozens of bytecode instructions, handles function invocation and returns, and enforces runtime safety checks required by the C0 language specification.",
      contribution:
        "Individually implemented the VM execution engine, instruction dispatch loop, arithmetic and control-flow opcodes, call stack and frame management, heap allocation for arrays and structs, memory access instructions, and runtime error handling. Wrote extensive manual tests, debug traces, and used Valgrind to verify correctness and acceptable memory behavior.",
      learned: [
        "Virtual machine and interpreter architecture",
        "Call stack and activation record management",
        "Low-level memory modeling for arrays and structs",
        "Runtime safety checks and error signaling",
        "Bridging compiler output (bytecode) with execution semantics",
        "Debugging complex stateful systems in C"
      ],
    },
  },
  {
    id: "instacart-db-system",
    title: "Instacart-Style Database System",
    role: "Co-Developer",
    description:
      "End-to-end relational database system modeled after Instacart, designed and implemented as a multi-phase project for CMU 67-262 (Database Design & Development). The project translates real-world user stories into a fully normalized schema, physical database implementation, and executable Python workflows supporting complex operational and analytical queries.",
    techStack: [
      "PostgreSQL",
      "SQL (DDL & DML)",
      "BCNF Normalization",
      "Triggers & Trigger Functions",
      "Window Functions",
      "Python",
      "psycopg2",
      "CSV-based Data Loading",
      "Vertabelo"
    ],
    category: "Databases",
    categories: ["Databases", "Course Project", "Backend Systems"],
    date: "2025",
    githubUrl: "https://github.com/emre0gencer/instacartdb",
    details: {
      problem:
        "Design a scalable database system that supports diverse real-world user roles (customers, shoppers, retailers) and complex behaviors such as analytics-heavy budget tracking, earnings computation, order monitoring, and multi-store cart management — while maintaining strict data integrity and normalization guarantees.",
      solution:
        "Developed an Instacart-inspired relational database by incrementally converting user stories into a conceptual model, relational schema, and BCNF-normalized design. Implemented the physical database in PostgreSQL with carefully chosen primary and foreign keys, enforced integrity via triggers, and supported analytical workloads using window functions. Each user story was executed through Python programs that interact directly with the database and demonstrate before/after state transitions.",
      contribution:
        "Co-designed the conceptual and relational models, performed functional dependency analysis and BCNF normalization, implemented PostgreSQL tables and constraints via generated DDL, authored SQL triggers and analytical queries, and built Python scripts using psycopg2 to execute and demonstrate all 10 user stories with traceable output.",
      learned: [
        "End-to-end database design lifecycle (conceptual → logical → physical)",
        "Functional dependencies and BCNF normalization in practice",
        "Designing triggers for automatic state maintenance",
        "Using window functions for analytical queries",
        "Bridging SQL systems with Python application logic",
        "Incremental system growth driven by user stories"
      ],
    },
  }
,
  {
    id: "duquesne-incline",
    title: "Duquesne Incline Visitor Experience Website",
    role: "Solo Developer",
    description: "Responsive multi-page website for Pittsburgh's historic Duquesne Incline featuring live weather via API, interactive photo gallery, FAQ accordion, embedded map, and validated contact form, built as the final project for CMU 67-250.",
    techStack: ["HTML", "CSS", "JavaScript", "jQuery", "OpenWeatherMap API", "Google Maps Embed API"],
    category: "Web Dev",
    categories: ["Web Dev", "Course Project"],
    date: "2024",
    githubUrl: "https://github.com/emre0gencer/DuquesneIncline",
    liveUrl: "https://emre0gencer.github.io/DuquesneIncline/",
    details: {
      problem: "Pittsburgh's historic Duquesne Incline needed a modern, user-friendly website to enhance visitor experience and provide essential information about this iconic landmark.",
      solution: "Developed a fully responsive multi-page website integrating real-time weather data, interactive galleries, and visitor resources to create a comprehensive digital experience.",
      contribution: "Sole developer responsible for all aspects: responsive design, API integrations (OpenWeatherMap and Google Maps), interactive UI components including FAQ accordion and photo gallery, and form validation.",
      learned: [
        "API integration with third-party services",
        "Responsive web design principles",
        "jQuery for DOM manipulation and effects",
        "User experience design for visitor information",
      ],
    },
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    role: "Solo Developer",
    description:
      "Modern, responsive portfolio website showcasing projects, experience, and skills. Built with React and TypeScript, featuring dynamic routing, component-based architecture, and smooth animations. Deployed on GitHub Pages with automated CI/CD.",
    techStack: [
      "TypeScript",
      "React",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Vite",
      "React Router",
      "shadcn/ui",
      "GitHub Pages",
      "GitHub Actions"
    ],
    category: "Web Dev",
    categories: ["Web Dev", "Frontend Development"],
    date: "2025",
    githubUrl: "https://github.com/emre0gencer/portfolio",
    liveUrl: "https://emre0gencer.github.io/portfolio/",
    details: {
      problem:
        "Create a professional online presence to showcase technical skills, projects, and experience in an organized and visually appealing way that reflects modern web development practices.",
      solution:
        "Developed a full-featured portfolio website using React and TypeScript with modern UI components from shadcn/ui. Implemented responsive design with Tailwind CSS, dynamic routing for project details, filtering systems for projects and experiences, and smooth scroll animations for enhanced user experience.",
      contribution:
        "Sole developer responsible for all aspects: component architecture, TypeScript interfaces for data models, responsive layout design, deployment configuration, and continuous integration via GitHub Actions. Designed reusable components for projects, experiences, courses, and contact forms.",
      learned: [
        "React component composition and prop patterns",
        "TypeScript for type-safe React development",
        "Tailwind CSS utility-first styling",
        "Vite build configuration and optimization",
        "GitHub Pages deployment workflow",
        "UI/UX design principles for portfolio sites"
      ],
    },
  },
  {
    id: "basketball-duels",
    title: "1v1 Basketball Duels",
    role: "Solo Developer",
    description: "Single-player 2D basketball game featuring Quick Match and Tournament modes, adjustable AI difficulty (action cooldown tuning), and an NBA-style four-round bracket where winning consecutive games earns the championship, developed as the final project for CMU 15-112 and delivered within 1.5 weeks.",
    techStack: ["Python", "pygame", "Game Loop & State Management", "Object-Oriented Programming"],
    category: "Course Project",
    date: "2024",
    githubUrl: "https://github.com/emre0gencer/1v1duels",
    details: {
      problem: "Create an engaging single-player basketball game with intelligent AI opponents and multiple game modes within a tight 1.5-week deadline for the CMU 15-112 final project.",
      solution: "Developed a 2D basketball game using pygame with a complete game loop, state management system, and object-oriented architecture featuring Quick Match and Tournament modes with adjustable AI difficulty.",
      contribution: "Sole developer responsible for all aspects: game mechanics, AI opponent logic with tunable action cooldowns, tournament bracket system, state management, and physics-based ball movement.",
      learned: [
        "Game development with pygame",
        "AI difficulty balancing through cooldown mechanics",
        "State machine architecture for game modes",
        "Rapid prototyping and delivery under time constraints",
      ],
    },
  },
  {
    id: "tok-tut",
    title: "TOK-TUT Earthquake Relief Platform",
    role: "Co-Founder, Developer",
    description: "High-impact visual computing platform developed in response to the 2023 Turkey earthquakes, enabling rapid and transparent coordination of relief efforts. The system processed and visualized images, videos, and QR-based donation data in real time.",
    techStack: ["Python", "Data Visualization", "Image Processing", "Video Processing", "QR Codes", "Data Analytics"],
    category: "Community Impact",
    date: "2023",
    liveUrl: "https://drive.google.com/file/d/1kDBAwEYzf0SXLgMciZydWeeN4hbkTOxP/view?usp=sharing",
    details: {
      problem: "After devastating earthquakes in Turkey, there was a critical need for a transparent, efficient platform to mobilize resources and donations for relief efforts.",
      solution: "Built a comprehensive visual computing platform that processed and displayed images, videos, and QR code data to facilitate donations and track relief operations.",
      contribution: "Led the technical development including data acquisition, processing pipelines, and visual display systems. Managed water treatment plant operations in container cities.",
      learned: [
        "Large-scale data processing and visualization",
        "Crisis response technology development",
        "Community impact through technology",
        "Team coordination in high-pressure situations",
      ],
    },
  },
  {
    id: "visiosoft",
    title: "Visiosoft - AI Public Safety System",
    role: "Designer, Developer",
    description: "AI-powered startup concept utilizing Transfer Learning to extract information from camera footage for enhanced public security.",
    impact: "1st Place: Human-Centered AI & UN SDG Good Health and Wellbeing",
    techStack: ["Python", "Computer Vision", "Transfer Learning", "PyTorch", "Video Analysis"],
    category: "Hackathon",
    date: "Jul-Oct 2023",
    liveUrl: "https://drive.google.com/file/d/10AOQRtBcEIV1VmgJ-oDvPwjTtSYg1Zfh/view?usp=sharing",
    awardsUrl: "https://drive.google.com/file/d/1ZLI9XCGQb0334fk_HD9Wt9z38EQawp5_/view?usp=sharing",
    details: {
      problem: "Public safety systems often lack real-time intelligent analysis capabilities to detect and respond to security threats effectively.",
      solution: "Designed an AI system that leverages Transfer Learning to analyze camera footage in real-time, detecting potential security incidents and alerting authorities.",
      contribution: "Developed the core AI architecture, trained models for threat detection, and designed the alert system infrastructure.",
      learned: [
        "Transfer Learning applications in security",
        "Real-time video processing at scale",
        "Ethical considerations in AI surveillance",
        "Human-centered AI design principles",
      ],
    },
  },
  {
    id: "currency-converter", 
    title: "Live Currency Converter Extension",
    role: "Solo Developer",
    description: "Chrome Web extension enabling real-time currency conversion with live exchange rates, built as final project for Harvard CS50x.",
    techStack: ["JavaScript", "HTML", "CSS", "Chrome Extension API"],
    category: "Web Dev",
    date: "2022-2023",
    githubUrl: "https://github.com/emre0gencer/currencyconverter2022",
    liveUrl: "https://drive.google.com/file/d/18MOsKSO-cPPHlqefuA-icX1pYPSYeOwX/view?usp=sharing",
    details: {
      problem: "Users need quick access to accurate currency conversions while browsing without switching to separate websites or apps.",
      solution: "Developed a Chrome extension that integrates with live exchange rate APIs to provide instant currency conversions directly in the browser.",
      contribution: "Sole developer responsible for all aspects: API integration, UI/UX design, extension architecture, and deployment.",
      learned: [
        "Chrome Extension development",
        "API integration and data handling",
        "Cross-platform web development",
        "User experience optimization",
      ],
    },
  },
  {
    id: "hydroport",
    title: "Hydroport - Clean Water Delivery System",
    role: "Designer, Developer",
    description: "AI/ML-driven autonomous clean water delivery system combining satellite data, automated transfers, and sustainable energy.",
    impact: "1st Place: UN SDG Clean Water & Social Innovation",
    techStack: ["Python", "Machine Learning", "scikit-learn", "IoT", "Satellite Data", "Autonomous Systems"],
    category: "Hackathon",
    date: "Jul-Sept 2022",
    liveUrl: "https://drive.google.com/file/d/1lrAaoNR0M5finkQphWzTOIJWsdAXotol/view?usp=sharing",
    awardsUrl: "https://drive.google.com/file/d/1a2EXNvTlBYa9SXoC2yQQ2L46Dlbc8P1Z/view?usp=sharing",
    details: {
      problem: "Millions lack access to clean water. Traditional distribution methods are inefficient and costly, especially in remote areas.",
      solution: "Created an automated water delivery system using AI for route optimization, ML for demand prediction, and autonomous vehicles powered by sustainable energy.",
      contribution: "Designed the AI/ML algorithms for route optimization and demand forecasting. Integrated satellite data for real-time monitoring and decision-making.",
      learned: [
        "IoT systems integration",
        "Satellite data processing",
        "Sustainable technology design",
        "Social impact through innovation",
      ],
    },
  },
];

export const getProjectById = (id: string) => projects.find((p) => p.id === id);

export const getProjectCategories = () => {
  const categorySet = new Set<string>();
  projects.forEach((p) => {
    if (p.categories) {
      p.categories.forEach((cat) => categorySet.add(cat));
    } else {
      categorySet.add(p.category);
    }
  });
  const categories = Array.from(categorySet).sort();
  
  // Move "Community Impact" to the end
  const communityIndex = categories.indexOf("Community Impact");
  if (communityIndex > -1) {
    categories.splice(communityIndex, 1);
    categories.push("Community Impact");
  }
  
  return ["All", ...categories];
};
