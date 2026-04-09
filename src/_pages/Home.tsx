import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Section from "@/components/Common/Section";
import ProjectCard from "@/components/Projects/ProjectCard";
import ExperienceCard from "@/components/Experience/ExperienceCard";
import SkillGlobe from "@/components/Common/SkillGlobe";
import VantaWaves from "@/components/Common/VantaWaves";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { ArrowRight, Download, Eye, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.jpg";

const Home = () => {
  const featuredProjects = projects.slice(0, 3);
  const recentExperiences = experiences
    .filter((e) => e.type === "work" || e.type === "research")
    .slice(0, 2);

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleCategorySelection = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="min-h-screen text-foreground">
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <VantaWaves />
        <div className="absolute inset-0 bg-background/60" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center animate-fade-up">
            {/* Profile Photo */}
            <div className="mb-8 flex justify-center">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-border overflow-hidden ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                <img
                  src={profilePhoto}
                  alt="Emre Gencer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Emre Gencer
            </h1>
            <p className="text-base md:text-lg font-medium text-foreground/80 mb-2">
              Information Systems · Carnegie Mellon University
            </p>
            <p className="text-sm md:text-base text-muted-foreground mb-10 max-w-lg mx-auto leading-relaxed">
              Sophomore building full-stack web applications and AI-driven products.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="default" className="shadow-glow">
                <Link to="/projects">
                  View Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="default" variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Resume
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem
                    onClick={() => window.open(`${import.meta.env.BASE_URL}resume.pdf`, "_blank")}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View in browser
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = `${import.meta.env.BASE_URL}resume.pdf`;
                      link.download = "Emre_Gencer_Resume.pdf";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = `${import.meta.env.BASE_URL}resume.docx`;
                      link.download = "Emre_Gencer_Resume.docx";
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Download DOCX
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <Section id="projects">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-1">Featured Projects</h2>
          <p className="text-sm text-muted-foreground">
            A selection of work across web development, systems, and AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              techStack={project.techStack.slice(0, 4)}
              category={project.category}
              slug={project.id}
              impact={project.impact}
            />
          ))}
        </div>

        <Button asChild variant="outline" size="sm">
          <Link to="/projects">
            All Projects <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </Section>

      {/* Skills */}
      <Section className="border-t border-border/40">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Skills & Technologies</h2>
        </div>

        <div className="flex justify-center">
          <SkillGlobe
            hoveredCategory={hoveredCategory}
            selectedCategory={selectedCategory}
            onSkillHover={(_name, category) => {
              setHoveredCategory(category);
            }}
            onCategorySelect={(category) => {
              if (!category) {
                setSelectedCategory(null);
              } else {
                toggleCategorySelection(category);
              }
            }}
          />
        </div>
      </Section>

      {/* Recent Experience */}
      <Section id="experience" className="border-t border-border/40">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-1">Recent Experience</h2>
          <p className="text-sm text-muted-foreground">
            Machine learning and data analysis work
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {recentExperiences.map((exp) => (
            <ExperienceCard
              key={exp.id}
              role={exp.role}
              organization={exp.organization}
              location={exp.location}
              date={exp.date}
              description={exp.description.slice(0, 3)}
              skills={exp.skills}
              type={exp.type}
              attachments={exp.attachments}
            />
          ))}
        </div>

        <Button asChild variant="outline" size="sm">
          <Link to="/experience">
            All Experience <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </Section>

      {/* Academic Coursework */}
      <Section className="border-t border-border/40">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-1">Academic Coursework</h2>
          <p className="text-sm text-muted-foreground">Relevant CMU courses</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
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

        <Button asChild variant="outline" size="sm">
          <Link to="/courses">
            All Courses <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </Section>

      {/* Contact Strip */}
      <Section className="border-t border-border/40">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Let's work together</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Open to summer 2026 internships in software engineering, web development, and AI/ML.
            Also open to collaborations and interesting projects.
          </p>
          <Button asChild size="default" className="shadow-glow">
            <Link to="/contact">
              Get in touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default Home;
