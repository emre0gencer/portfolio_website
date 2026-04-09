export interface Course {
  id: string;
  title: string;
  provider: string;
  date?: string;
  description?: string;
  categories: string[];
  certified: boolean;
  certificateUrl?: string;
}

export const courses: Course[] = [
  {
    id: "cs50",
    title: "CS50x: Introduction to Computer Science",
    provider: "Harvard University",
    date: "2022-2023",
    description: "Comprehensive introduction to CS fundamentals including C, Python, SQL, HTML/CSS, and JavaScript. Completed final project: Chrome Web extension for currency conversion.",
    categories: ["C", "Python", "SQL", "JavaScript", "Data Structures & Algorithms"],
    certified: true,
    certificateUrl: "https://certificates.cs50.io/5548fe5d-3bd0-4bfd-b4b1-b0d6448ba8f2.pdf?size=letter",
  },
  {
    id: "ml-course",
    title: "Machine Learning",
    provider: "Education for Innovation Foundation",
    date: "Jul 2022",
    description: "Fundamental concepts of ML algorithms including supervised/unsupervised learning, deep learning, and reinforcement learning. Built image classification model as final project.",
    categories: ["Python", "Supervised Learning", "Deep Learning", "Neural Networks"],
    certified: false,
    certificateUrl: "",
  },
  {
    id: "cv-course",
    title: "Computer Vision Course",
    provider: "Education for Innovation Foundation",
    date: "Jul 2022",
    description: "Image and video analysis, feature extraction, object detection, and classification. Implemented grayscale to RGB conversion algorithm.",
    categories: ["Python", "OpenCV", "Image Processing", "Feature Extraction", "Object Detection"],
    certified: false,
    certificateUrl: "",
  },
  {
    id: "blockchain",
    title: "Blockchain Course",
    provider: "Education for Innovation Foundation",
    date: "Jul 2022",
    description: "Blockchain technology, distributed ledgers, smart contracts, and decentralized systems. Covered security, consensus mechanisms, and dApps.",
    categories: ["Distributed Systems", "Smart Contracts", "Cryptography", "Consensus Algorithms"],
    certified: false,
    certificateUrl: "",
  },
  {
    id: "whisper-hackathon",
    title: "OpenAI Whisper Hackathon",
    provider: "LabLab AI",
    date: "Oct 2022",
    description: "Participated in OpenAI's Whisper hackathon, exploring speech recognition and audio processing using the Whisper model.",
    categories: ["Python", "Speech Recognition", "Audio Processing", "OpenAI APIs"],
    certified: true,
    certificateUrl: "https://lablab.ai/u/@emreGencer/cla6wn0x0009c6r0s36z6ojq1",
  },
  {
    id: "research-skills",
    title: "Oxford/Cambridge Research Skills Intensive",
    provider: "Oxford & Cambridge Universities",
    date: "Jun-Jul 2023",
    description: "Research methodology, source evaluation (CRAAP test), formal bibliography creation, and persuasive writing techniques.",
    categories: ["Research Methodology", "Academic Writing", "Source Evaluation", "Bibliography Management"],
    certified: true,
    certificateUrl: "https://drive.google.com/file/d/1cyH8UawiJTiUAr26qnwD6-Wfsp0f78vK/view?usp=sharing",
  },
  {
    id: "stats",
    title: "Statistical Methods in Scientific Research",
    provider: "Cerrahpasa University, Istanbul University & SOIL",
    date: "Jul 2022",
    description: "Statistics in scientific research, SPSS and PSPP programs, statistical models, and complex testing methods.",
    categories: ["SPSS", "Statistical Modeling", "Hypothesis Testing", "Data Analysis"],
    certified: true,
    certificateUrl: "https://drive.google.com/file/d/1Pf3Nd53dSOaHnN18-VSW4frNSlcFb0jN/view?usp=sharing",
  },
  {
    id: "java-duke",
    title: "Java Programming: Solving Problems With Software",
    provider: "Duke University (Coursera)",
    date: "Mar-Apr 2021",
    description: "Java syntax and semantics, CSV files, basic statistics. Final project: Baby names popularity comparison tool.",
    categories: ["Java", "Object-Oriented Programming", "File I/O", "Data Processing"],
    certified: true,
    certificateUrl: "https://www.coursera.org/account/accomplishments/certificate/EN5C2VL8NSZL",
  },
  {
    id: "mechanics",
    title: "Augmented Mechanics Course",
    provider: "Kadir Has University",
    date: "Jul 2021",
    description: "Advanced high-school physics with Prof. Dr. Nihat Berker. Applied calculus to physics problems and theorems.",
    categories: ["Calculus-Based Physics", "Classical Mechanics", "Mathematical Modeling"],
    certified: true,
    certificateUrl: "https://drive.google.com/file/d/1shbFpiLBRgPdJSgt-lTCS6GuKlKxHXPJ/view?usp=sharing",
  },
];

export const getCourseCategories = () => {
  const categories = new Set<string>();
  courses.forEach((course) => {
    course.categories.forEach((cat) => categories.add(cat));
  });
  return ["All", ...Array.from(categories).sort()];
};
