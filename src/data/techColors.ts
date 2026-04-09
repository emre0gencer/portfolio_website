/**
 * Global skill → color mapping.
 * Each skill has one consistent color used everywhere it appears.
 * Colors are grouped by technology domain.
 */
export const techColorMap: Record<string, string> = {
  // ── Python ecosystem ────────────────────────────────── blue
  "Python":           "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  "FastAPI":          "bg-blue-400/15 text-blue-600 dark:text-blue-400",
  "Pandas":           "bg-blue-500/15 text-blue-700 dark:text-blue-300",
  "NumPy":            "bg-blue-400/15 text-blue-600 dark:text-blue-400",
  "scikit-learn":     "bg-blue-600/15 text-blue-800 dark:text-blue-200",
  "psycopg2":         "bg-blue-300/15 text-blue-600 dark:text-blue-400",

  // ── React ecosystem ──────────────────────────────────── cyan
  "React":            "bg-cyan-500/15 text-cyan-700 dark:text-cyan-300",
  "React Router":     "bg-cyan-400/15 text-cyan-600 dark:text-cyan-400",

  // ── TypeScript ───────────────────────────────────────── indigo
  "TypeScript":       "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300",

  // ── JavaScript ───────────────────────────────────────── amber
  "JavaScript":       "bg-amber-400/15 text-amber-700 dark:text-amber-300",
  "jQuery":           "bg-amber-300/15 text-amber-600 dark:text-amber-400",
  "Chrome Extension API": "bg-amber-500/15 text-amber-700 dark:text-amber-300",

  // ── HTML / Markup ─────────────────────────────────────── orange
  "HTML":             "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  "Jinja2":           "bg-orange-400/15 text-orange-600 dark:text-orange-400",

  // ── CSS / Styling ─────────────────────────────────────── sky
  "CSS":              "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  "Tailwind CSS":     "bg-sky-400/15 text-sky-600 dark:text-sky-400",

  // ── Ruby ecosystem ────────────────────────────────────── red
  "Ruby":             "bg-red-500/15 text-red-700 dark:text-red-300",
  "Ruby on Rails":    "bg-red-600/15 text-red-800 dark:text-red-200",
  "ActiveRecord":     "bg-red-400/15 text-red-600 dark:text-red-400",

  // ── SQL / Databases ───────────────────────────────────── teal
  "SQL":                          "bg-teal-500/15 text-teal-700 dark:text-teal-300",
  "SQL (DDL & DML)":              "bg-teal-500/15 text-teal-700 dark:text-teal-300",
  "PostgreSQL":                   "bg-teal-600/15 text-teal-800 dark:text-teal-200",
  "SQLite":                       "bg-teal-400/15 text-teal-600 dark:text-teal-400",
  "BCNF Normalization":           "bg-teal-500/15 text-teal-700 dark:text-teal-300",
  "Triggers & Trigger Functions": "bg-teal-400/15 text-teal-600 dark:text-teal-400",
  "Window Functions":             "bg-teal-600/15 text-teal-800 dark:text-teal-200",
  "CSV-based Data Loading":       "bg-teal-400/15 text-teal-600 dark:text-teal-400",
  "Vertabelo":                    "bg-teal-500/15 text-teal-700 dark:text-teal-300",

  // ── Architecture / Patterns ───────────────────────────── indigo (lighter shades)
  "MVC Architecture":             "bg-indigo-400/15 text-indigo-600 dark:text-indigo-400",
  "ERD":                          "bg-indigo-300/15 text-indigo-600 dark:text-indigo-400",
  "Object-Oriented Programming":  "bg-indigo-600/15 text-indigo-800 dark:text-indigo-200",

  // ── Systems / C ───────────────────────────────────────── yellow
  "C":                            "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300",
  "Systems Programming":          "bg-yellow-400/15 text-yellow-600 dark:text-yellow-400",
  "Virtual Machines":             "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300",
  "Bytecode Interpreters":        "bg-yellow-400/15 text-yellow-600 dark:text-yellow-400",
  "Memory Management":            "bg-yellow-600/15 text-yellow-800 dark:text-yellow-200",
  "Stack & Call Frame Design":    "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300",
  "Low-Level Debugging":          "bg-yellow-600/15 text-yellow-800 dark:text-yellow-200",
  "Valgrind":                     "bg-yellow-600/15 text-yellow-800 dark:text-yellow-200",
  "Performance Benchmarking":     "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300",

  // ── AI / ML ───────────────────────────────────────────── purple / violet
  "AI":                           "bg-purple-500/15 text-purple-700 dark:text-purple-300",
  "Machine Learning":             "bg-purple-400/15 text-purple-600 dark:text-purple-400",
  "LLM Integration":              "bg-purple-600/15 text-purple-800 dark:text-purple-200",
  "Semantic Matching":            "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  "Transfer Learning":            "bg-violet-400/15 text-violet-600 dark:text-violet-400",
  "Computer Vision":              "bg-violet-600/15 text-violet-800 dark:text-violet-200",
  "CNNs":                         "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  "Vision Transformers":          "bg-violet-400/15 text-violet-600 dark:text-violet-400",
  "Research Methods":             "bg-violet-500/15 text-violet-700 dark:text-violet-300",

  // ── Visual Computing / Media ──────────────────────────── pink / rose
  "Visual Computing":             "bg-pink-500/15 text-pink-700 dark:text-pink-300",
  "Image Processing":             "bg-pink-400/15 text-pink-600 dark:text-pink-400",
  "Video Processing":             "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  "Video Analysis":               "bg-rose-400/15 text-rose-600 dark:text-rose-400",
  "QR Codes":                     "bg-pink-600/15 text-pink-800 dark:text-pink-200",
  "Data Analytics":               "bg-rose-600/15 text-rose-800 dark:text-rose-200",

  // ── IoT / Hardware / Autonomous ───────────────────────── green / emerald
  "IoT":                          "bg-green-500/15 text-green-700 dark:text-green-300",
  "Satellite Data":               "bg-green-400/15 text-green-600 dark:text-green-400",
  "Autonomous Systems":           "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "Embedded Systems":             "bg-green-600/15 text-green-800 dark:text-green-200",
  "Electronics":                  "bg-emerald-400/15 text-emerald-600 dark:text-emerald-400",

  // ── Data Science ──────────────────────────────────────── emerald
  "Exploratory Data Analysis (EDA)": "bg-emerald-400/15 text-emerald-600 dark:text-emerald-400",
  "Statistical Modeling":            "bg-emerald-600/15 text-emerald-800 dark:text-emerald-200",
  "Data Visualization":              "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  "A/B Testing Concepts":            "bg-emerald-400/15 text-emerald-600 dark:text-emerald-400",
  "Business Intelligence":           "bg-emerald-600/15 text-emerald-800 dark:text-emerald-200",

  // ── Game Development ──────────────────────────────────── lime
  "pygame":                          "bg-lime-500/15 text-lime-700 dark:text-lime-300",
  "Game Loop & State Management":    "bg-lime-400/15 text-lime-600 dark:text-lime-400",

  // ── External APIs ─────────────────────────────────────── sky (deeper shades)
  "OpenWeatherMap API":              "bg-sky-600/15 text-sky-800 dark:text-sky-200",
  "Google Maps Embed API":           "bg-sky-700/15 text-sky-800 dark:text-sky-200",

  // ── Build / Deploy tools ──────────────────────────────── fuchsia
  "Vite":                            "bg-fuchsia-500/15 text-fuchsia-700 dark:text-fuchsia-300",
  "shadcn/ui":                       "bg-fuchsia-400/15 text-fuchsia-600 dark:text-fuchsia-400",
  "GitHub Pages":                    "bg-fuchsia-600/15 text-fuchsia-800 dark:text-fuchsia-200",
};
