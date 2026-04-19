/**
 * Global skill → color mapping.
 * Each value is a border-left + border-bottom accent color class only.
 * The badge itself uses a neutral background (bg-secondary) so text is always readable.
 * One hue per technology domain.
 *
 * Domain → hue:
 *   Languages                              → blue
 *   ML & AI                                → violet
 *   Data & Analytics                       → emerald
 *   Web & Backend (React/Node/APIs)        → cyan
 *   Ruby ecosystem                         → rose
 *   Databases / SQL schemas                → teal
 *   Systems/low-level / C                  → yellow
 *   Tools & DevOps                         → orange
 *   Game dev / misc                        → lime
 *   External APIs                          → sky
 *   Visual Computing / Media               → pink
 */
export const techColorMap: Record<string, string> = {

  // ── Languages ──────────────────────────────────────────── blue
  "Python":               "border-l-2 border-b-2 border-blue-500",
  "Java":                 "border-l-2 border-b-2 border-blue-600",
  "C":                    "border-l-2 border-b-2 border-blue-400",
  "JavaScript":           "border-l-2 border-b-2 border-blue-500",
  "TypeScript":           "border-l-2 border-b-2 border-blue-600",
  "SQL":                  "border-l-2 border-b-2 border-blue-400",
  "R":                    "border-l-2 border-b-2 border-blue-500",

  // ── ML & AI ────────────────────────────────────────────── violet
  "Machine Learning":     "border-l-2 border-b-2 border-violet-500",
  "scikit-learn":         "border-l-2 border-b-2 border-violet-600",
  "PyTorch":              "border-l-2 border-b-2 border-violet-500",
  "CNNs":                 "border-l-2 border-b-2 border-violet-400",
  "Vision Transformers":  "border-l-2 border-b-2 border-violet-600",
  "Transfer Learning":    "border-l-2 border-b-2 border-violet-500",
  "LLM Integration":      "border-l-2 border-b-2 border-violet-600",
  "Computer Vision":      "border-l-2 border-b-2 border-violet-400",
  "NLP":                  "border-l-2 border-b-2 border-violet-500",
  "AI":                   "border-l-2 border-b-2 border-violet-400",
  "Semantic Matching":    "border-l-2 border-b-2 border-violet-600",
  "Research Methods":     "border-l-2 border-b-2 border-violet-400",

  // ── Data & Analytics ───────────────────────────────────── emerald
  "Pandas":                           "border-l-2 border-b-2 border-emerald-500",
  "NumPy":                            "border-l-2 border-b-2 border-emerald-400",
  "Matplotlib":                       "border-l-2 border-b-2 border-emerald-500",
  "Seaborn":                          "border-l-2 border-b-2 border-emerald-400",
  "Exploratory Data Analysis":        "border-l-2 border-b-2 border-emerald-600",
  "Exploratory Data Analysis (EDA)":  "border-l-2 border-b-2 border-emerald-600",
  "Statistical Modeling":             "border-l-2 border-b-2 border-emerald-500",
  "Data Visualization":               "border-l-2 border-b-2 border-emerald-600",
  "A/B Testing":                      "border-l-2 border-b-2 border-emerald-400",
  "A/B Testing Concepts":             "border-l-2 border-b-2 border-emerald-400",
  "SPSS":                             "border-l-2 border-b-2 border-emerald-500",
  "Data Analytics":                   "border-l-2 border-b-2 border-emerald-600",
  "Business Intelligence":            "border-l-2 border-b-2 border-emerald-500",
  "AI-Assisted Analytics":            "border-l-2 border-b-2 border-emerald-400",
  "psycopg2":                         "border-l-2 border-b-2 border-emerald-400",
  "CSV-based Data Loading":           "border-l-2 border-b-2 border-emerald-400",

  // ── Web & Backend ──────────────────────────────────────── cyan
  "React":                "border-l-2 border-b-2 border-cyan-500",
  "React Router":         "border-l-2 border-b-2 border-cyan-400",
  "Node.js":              "border-l-2 border-b-2 border-cyan-500",
  "FastAPI":              "border-l-2 border-b-2 border-cyan-600",
  "REST APIs":            "border-l-2 border-b-2 border-cyan-400",
  "Chrome Extension API": "border-l-2 border-b-2 border-cyan-500",
  "Chrome Extensions":    "border-l-2 border-b-2 border-cyan-500",
  "Responsive Design":    "border-l-2 border-b-2 border-cyan-400",
  "jQuery":               "border-l-2 border-b-2 border-cyan-400",
  "Jinja2":               "border-l-2 border-b-2 border-cyan-500",
  "MVC Architecture":     "border-l-2 border-b-2 border-cyan-600",
  "ERD":                  "border-l-2 border-b-2 border-cyan-400",
  "Web Application Development": "border-l-2 border-b-2 border-cyan-500",

  // ── Ruby ecosystem ─────────────────────────────────────── rose
  "Ruby":                 "border-l-2 border-b-2 border-rose-400",
  "Ruby on Rails":        "border-l-2 border-b-2 border-rose-500",
  "ActiveRecord":         "border-l-2 border-b-2 border-rose-400",

  // ── Databases ──────────────────────────────────────────── teal
  "PostgreSQL":                   "border-l-2 border-b-2 border-teal-600",
  "SQLite":                       "border-l-2 border-b-2 border-teal-400",
  "SQL (DDL & DML)":              "border-l-2 border-b-2 border-teal-500",
  "BCNF Normalization":           "border-l-2 border-b-2 border-teal-500",
  "Triggers & Trigger Functions": "border-l-2 border-b-2 border-teal-400",
  "Window Functions":             "border-l-2 border-b-2 border-teal-600",
  "Vertabelo":                    "border-l-2 border-b-2 border-teal-400",
  "Object-Oriented Programming":  "border-l-2 border-b-2 border-teal-500",

  // ── Systems / low-level ────────────────────────────────── yellow
  "Systems Programming":       "border-l-2 border-b-2 border-yellow-500",
  "Virtual Machines":          "border-l-2 border-b-2 border-yellow-400",
  "Bytecode Interpreters":     "border-l-2 border-b-2 border-yellow-500",
  "Memory Management":         "border-l-2 border-b-2 border-yellow-600",
  "Stack & Call Frame Design": "border-l-2 border-b-2 border-yellow-400",
  "Low-Level Debugging":       "border-l-2 border-b-2 border-yellow-600",
  "Valgrind":                  "border-l-2 border-b-2 border-yellow-500",
  "Performance Benchmarking":  "border-l-2 border-b-2 border-yellow-400",
  "Embedded Systems":          "border-l-2 border-b-2 border-yellow-500",
  "Electronics":               "border-l-2 border-b-2 border-yellow-400",
  "IoT":                       "border-l-2 border-b-2 border-yellow-600",
  "Autonomous Systems":        "border-l-2 border-b-2 border-yellow-500",
  "Satellite Data":            "border-l-2 border-b-2 border-yellow-400",

  // ── Tools & DevOps ─────────────────────────────────────── orange
  "Git":              "border-l-2 border-b-2 border-orange-500",
  "GitHub Actions":   "border-l-2 border-b-2 border-orange-600",
  "GitHub Pages":     "border-l-2 border-b-2 border-orange-400",
  "Jupyter":          "border-l-2 border-b-2 border-orange-500",
  "Docker":           "border-l-2 border-b-2 border-orange-600",
  "Linux":            "border-l-2 border-b-2 border-orange-500",
  "Agile":            "border-l-2 border-b-2 border-orange-400",
  "VS Code":          "border-l-2 border-b-2 border-orange-400",
  "Vite":             "border-l-2 border-b-2 border-orange-500",
  "shadcn/ui":        "border-l-2 border-b-2 border-orange-400",
  "HTML":             "border-l-2 border-b-2 border-orange-500",
  "CSS":              "border-l-2 border-b-2 border-orange-400",
  "Tailwind CSS":     "border-l-2 border-b-2 border-orange-500",

  // ── Visual Computing / Media ───────────────────────────── pink
  "Visual Computing": "border-l-2 border-b-2 border-pink-500",
  "Image Processing": "border-l-2 border-b-2 border-pink-400",
  "Video Processing": "border-l-2 border-b-2 border-pink-500",
  "Video Analysis":   "border-l-2 border-b-2 border-pink-400",
  "QR Codes":         "border-l-2 border-b-2 border-pink-600",

  // ── Game dev / misc ────────────────────────────────────── lime
  "pygame":                       "border-l-2 border-b-2 border-lime-500",
  "Game Loop & State Management": "border-l-2 border-b-2 border-lime-400",

  // ── External APIs ──────────────────────────────────────── sky
  "OpenWeatherMap API":    "border-l-2 border-b-2 border-sky-500",
  "Google Maps Embed API": "border-l-2 border-b-2 border-sky-400",
};
