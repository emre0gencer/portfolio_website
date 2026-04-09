/**
 * Skill → badge color mapping.
 * Palette: 8 domain colors, all tuned for dark backgrounds.
 *   blue    → Python & data processing
 *   indigo  → TypeScript & architecture
 *   cyan    → React & frontend frameworks
 *   amber   → JavaScript & scripting
 *   violet  → AI / ML / research
 *   teal    → SQL, databases & backend
 *   rose    → Ruby / Rails & visual media
 *   sky     → CSS, styling & APIs
 *   emerald → Data science & systems/hardware
 *   slate   → Low-level systems, C, tools
 *   orange  → HTML & markup
 */
export const techColorMap: Record<string, string> = {

  // ── Python ───────────────────────────────────────────── blue
  "Python":                          "bg-blue-500/15 text-blue-300",
  "FastAPI":                         "bg-blue-500/15 text-blue-300",
  "Pandas":                          "bg-blue-500/15 text-blue-300",
  "NumPy":                           "bg-blue-500/15 text-blue-300",
  "scikit-learn":                    "bg-blue-500/15 text-blue-300",
  "psycopg2":                        "bg-blue-500/15 text-blue-300",

  // ── TypeScript & Architecture ─────────────────────────── indigo
  "TypeScript":                      "bg-indigo-500/15 text-indigo-300",
  "MVC Architecture":                "bg-indigo-500/15 text-indigo-300",
  "ERD":                             "bg-indigo-500/15 text-indigo-300",
  "Object-Oriented Programming":     "bg-indigo-500/15 text-indigo-300",

  // ── React & Frontend Frameworks ───────────────────────── cyan
  "React":                           "bg-cyan-500/15 text-cyan-300",
  "React Router":                    "bg-cyan-500/15 text-cyan-300",
  "Next.js":                         "bg-cyan-500/15 text-cyan-300",

  // ── JavaScript & Scripting ────────────────────────────── amber
  "JavaScript":                      "bg-amber-500/15 text-amber-300",
  "jQuery":                          "bg-amber-500/15 text-amber-300",
  "Chrome Extension API":            "bg-amber-500/15 text-amber-300",

  // ── HTML & Markup ─────────────────────────────────────── orange
  "HTML":                            "bg-orange-500/15 text-orange-300",
  "Jinja2":                          "bg-orange-500/15 text-orange-300",

  // ── CSS & Styling ─────────────────────────────────────── sky
  "CSS":                             "bg-sky-500/15 text-sky-300",
  "Tailwind CSS":                    "bg-sky-500/15 text-sky-300",

  // ── Ruby & Rails ──────────────────────────────────────── rose
  "Ruby":                            "bg-rose-500/15 text-rose-300",
  "Ruby on Rails":                   "bg-rose-500/15 text-rose-300",
  "ActiveRecord":                    "bg-rose-500/15 text-rose-300",

  // ── SQL & Databases ───────────────────────────────────── teal
  "SQL":                             "bg-teal-500/15 text-teal-300",
  "SQL (DDL & DML)":                 "bg-teal-500/15 text-teal-300",
  "PostgreSQL":                      "bg-teal-500/15 text-teal-300",
  "SQLite":                          "bg-teal-500/15 text-teal-300",
  "BCNF Normalization":              "bg-teal-500/15 text-teal-300",
  "Triggers & Trigger Functions":    "bg-teal-500/15 text-teal-300",
  "Window Functions":                "bg-teal-500/15 text-teal-300",
  "CSV-based Data Loading":          "bg-teal-500/15 text-teal-300",
  "Vertabelo":                       "bg-teal-500/15 text-teal-300",

  // ── AI / ML / Research ───────────────────────────────── violet
  "AI":                              "bg-violet-500/15 text-violet-300",
  "Machine Learning":                "bg-violet-500/15 text-violet-300",
  "LLM Integration":                 "bg-violet-500/15 text-violet-300",
  "Semantic Matching":               "bg-violet-500/15 text-violet-300",
  "Transfer Learning":               "bg-violet-500/15 text-violet-300",
  "Computer Vision":                 "bg-violet-500/15 text-violet-300",
  "CNNs":                            "bg-violet-500/15 text-violet-300",
  "Vision Transformers":             "bg-violet-500/15 text-violet-300",
  "Research Methods":                "bg-violet-500/15 text-violet-300",

  // ── Visual Computing / Media ──────────────────────────── rose
  "Visual Computing":                "bg-rose-500/15 text-rose-300",
  "Image Processing":                "bg-rose-500/15 text-rose-300",
  "Video Processing":                "bg-rose-500/15 text-rose-300",
  "Video Analysis":                  "bg-rose-500/15 text-rose-300",
  "QR Codes":                        "bg-rose-500/15 text-rose-300",
  "Data Analytics":                  "bg-rose-500/15 text-rose-300",

  // ── Data Science ─────────────────────────────────────── emerald
  "Exploratory Data Analysis (EDA)": "bg-emerald-500/15 text-emerald-300",
  "Statistical Modeling":            "bg-emerald-500/15 text-emerald-300",
  "Data Visualization":              "bg-emerald-500/15 text-emerald-300",
  "A/B Testing Concepts":            "bg-emerald-500/15 text-emerald-300",
  "Business Intelligence":           "bg-emerald-500/15 text-emerald-300",

  // ── IoT / Hardware / Autonomous ───────────────────────── emerald
  "IoT":                             "bg-emerald-500/15 text-emerald-300",
  "Satellite Data":                  "bg-emerald-500/15 text-emerald-300",
  "Autonomous Systems":              "bg-emerald-500/15 text-emerald-300",
  "Embedded Systems":                "bg-emerald-500/15 text-emerald-300",
  "Electronics":                     "bg-emerald-500/15 text-emerald-300",

  // ── Systems / C / Low-level ───────────────────────────── slate
  "C":                               "bg-slate-500/15 text-slate-300",
  "Systems Programming":             "bg-slate-500/15 text-slate-300",
  "Virtual Machines":                "bg-slate-500/15 text-slate-300",
  "Bytecode Interpreters":           "bg-slate-500/15 text-slate-300",
  "Memory Management":               "bg-slate-500/15 text-slate-300",
  "Stack & Call Frame Design":       "bg-slate-500/15 text-slate-300",
  "Low-Level Debugging":             "bg-slate-500/15 text-slate-300",
  "Valgrind":                        "bg-slate-500/15 text-slate-300",
  "Performance Benchmarking":        "bg-slate-500/15 text-slate-300",

  // ── External APIs ─────────────────────────────────────── sky
  "OpenWeatherMap API":              "bg-sky-500/15 text-sky-300",
  "Google Maps Embed API":           "bg-sky-500/15 text-sky-300",

  // ── Java ──────────────────────────────────────────────── amber
  "Java":                            "bg-amber-500/15 text-amber-300",

  // ── Game Dev ─────────────────────────────────────────── indigo
  "pygame":                          "bg-indigo-500/15 text-indigo-300",
  "Game Loop & State Management":    "bg-indigo-500/15 text-indigo-300",

  // ── Build / Tools ─────────────────────────────────────── slate
  "Vite":                            "bg-slate-500/15 text-slate-300",
  "shadcn/ui":                       "bg-slate-500/15 text-slate-300",
  "GitHub Pages":                    "bg-slate-500/15 text-slate-300",
  "Git":                             "bg-slate-500/15 text-slate-300",
};
