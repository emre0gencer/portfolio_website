export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "Java", "C", "JavaScript", "TypeScript", "SQL", "R"],
  },
  {
    category: "ML & AI",
    skills: ["scikit-learn", "PyTorch", "CNNs", "Vision Transformers", "Transfer Learning", "LLM Integration", "Computer Vision", "NLP"],
  },
  {
    category: "Data & Analytics",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Exploratory Data Analysis", "Statistical Modeling", "Data Visualization", "A/B Testing", "SPSS"],
  },
  {
    category: "Web & Backend",
    skills: ["React", "FastAPI", "Node.js", "Ruby on Rails", "REST APIs", "PostgreSQL", "SQLite"],
  },
  {
    category: "Tools & DevOps",
    skills: ["Git", "GitHub Actions", "Jupyter", "Docker", "Linux", "Agile", "VS Code"],
  },
];
