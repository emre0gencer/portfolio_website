export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "Java", "C", "JavaScript", "SQL", "HTML", "CSS"],
  },
  {
    category: "Web & Backend",
    skills: ["React", "Node.js", "Ruby on Rails", "REST APIs", "Chrome Extensions", "Responsive Design"],
  },
  {
    category: "AI & Data",
    skills: ["Machine Learning", "Computer Vision", "CNNs", "Vision Transformers", "Transfer Learning", "Data Analytics", "SPSS"],
  },
  {
    category: "Tools & Workflow",
    skills: ["Git", "VS Code", "Jupyter", "Statistical Analysis", "Research Methods", "Agile"],
  },
];
