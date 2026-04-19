import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Section from "@/components/Common/Section";
import PageHeader from "@/components/Common/PageHeader";
import CourseCard from "@/components/Courses/CourseCard";
import { courses } from "@/data/courses";

const Courses = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("scroll-highlight");
    void el.offsetWidth;
    el.classList.add("scroll-highlight");
  }, [location.hash]);
  
  // Define 5 main categories that best distinguish courses
  const mainCategories = [
    "All",
    "Programming",
    "AI & Machine Learning",
    "Data Science",
    "Distributed Systems",
    "Research Methods"
  ];

  // Map courses to main categories
  const getCourseMainCategory = (course: typeof courses[0]): string[] => {
    const categoryMap: { [key: string]: string } = {
      "cs50": "Programming",
      "ml-course": "AI & Machine Learning",
      "cv-course": "AI & Machine Learning",
      "blockchain": "Distributed Systems",
      "whisper-hackathon": "AI & Machine Learning",
      "research-skills": "Research Methods",
      "stats": "Data Science",
      "java-duke": "Programming",
      "mechanics": "Research Methods",
    };
    return [categoryMap[course.id]];
  };

  const filteredCourses =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => getCourseMainCategory(course).includes(selectedCategory));

  return (
    <div className="min-h-screen pt-20 pb-20">
      <Section>
        <PageHeader
          title="Courses & Certificates"
          subtitle="University coursework, online courses, and certifications"
        />

        {/* Relevant Coursework */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            Relevant Coursework @ CMU
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {
                name: "10301 — Introduction to Machine Learning",
                skills: ["Python", "Supervised Learning", "Neural Networks", "Statistical ML"],
              },
              {
                name: "67272 — Application Design and Development",
                skills: ["MVC Architecture", "Web Application Development", "Relational Database Integration", "User-Centered Design"],
              },
              {
                name: "15122 — Principles of Imperative Computation",
                skills: ["C Programming", "Data Structures & Algorithms", "Imperative Programming", "Program Correctness"],
              },
              {
                name: "67262 — Database Design and Development",
                skills: ["SQL", "Relational Database Design", "Database Management Systems", "Data Modeling"],
              },
              {
                name: "36225 — Introduction to Probability",
                skills: ["Probability Modeling", "Random Variables & Distributions", "Statistical Reasoning", "R"],
              },
              {
                name: "05391 — Designing Human Centered Software",
                skills: ["UI Prototyping", "Usability Evaluation", "Human-Computer Interaction", "User-Centered Design"],
              },
            ].map(({ name, skills }) => (
              <div
                key={name}
                className="px-4 py-3 rounded-lg border border-border bg-card flex flex-col gap-2.5"
              >
                <p className="text-sm text-foreground/80">{name}</p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium border border-border text-muted-foreground rounded px-1.5 py-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Extracurricular header */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Extracurricular
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-1.5 mb-10">
          {mainCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-xs font-medium rounded-md border transition-fast ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in items-stretch">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              provider={course.provider}
              date={course.date}
              description={course.description}
              categories={course.categories}
              certified={course.certified}
              certificateUrl={course.certificateUrl}
            />
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">No courses found in this category.</p>
          </div>
        )}
      </Section>
    </div>
  );
};

export default Courses;
