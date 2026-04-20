import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import Section from '@/components/Common/Section';
import ProjectCard from '@/components/Projects/ProjectCard';
import ExperienceCard from '@/components/Experience/ExperienceCard';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import SkillGlobe from '@/components/Common/SkillGlobe';
import HeroGallery from '@/components/Common/HeroGallery';

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const metadata: Metadata = {
  title: 'Emre Gencer',
  description: 'Information Systems sophomore at CMU building full-stack web apps and AI-driven products.',
};

const galleryItems = [
  { src: '/gallery/video1.mp4', title: 'ApplyEasy', desc: 'AI-powered resume tailoring with LLM bullet rewriting & PDF export', type: 'video' as const },
  { src: '/gallery/video3.mp4', title: 'Store Management System', desc: 'Full-stack Rails app with ERD-driven MVC architecture', type: 'video' as const },
  { src: '/gallery/video2.mp4', title: 'ExecutionLab', desc: 'Side-by-side VM execution traces & performance metrics', type: 'video' as const },
];

export default function HomePage() {
  const featuredProjects = projects.slice(0, 3);
  const recentExperiences = experiences.filter((e) => e.type === 'work' || e.type === 'research').slice(0, 2);

  return (
    <div className="min-h-screen text-foreground">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="min-h-[92vh] flex items-center">
        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — identity block */}
            <div className="flex flex-col gap-8 animate-fade-up">
              <div className="flex items-center gap-5">
                <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border border-border overflow-hidden ring-1 ring-primary/20 ring-offset-2 ring-offset-background shrink-0">
                  <Image
                    src={`${BASE}/profile-photo.jpg`}
                    alt="Emre Gencer"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-linear-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
                    Emre Gencer
                  </h1>
                  <p className="text-sm font-medium text-foreground/60 mt-1">
                    Information Systems · Carnegie Mellon University
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-w-md">
                <p className="text-base text-foreground/80 leading-relaxed">
                  Sophomore building full-stack web applications and AI-driven products.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Open to summer 2026 internships in software engineering, web development, and AI/ML.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-fast shadow-glow"
                >
                  View Projects <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`${BASE}/resume.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium rounded-md border border-border bg-transparent text-foreground hover:bg-muted/50 transition-fast"
                >
                  <Download className="h-4 w-4" /> Resume
                </a>
              </div>

              {/* Subtle divider stat row */}
              <div className="flex gap-8 pt-2 border-t border-border/40">
                <div>
                  <p className="text-xl font-semibold text-foreground">{projects.length}+</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Projects</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">{experiences.length}+</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Experiences</p>
                </div>
                <div>
                  <p className="text-xl font-semibold text-foreground">CMU</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Class of 2028</p>
                </div>
              </div>
            </div>

            {/* Right — photo gallery */}
            <HeroGallery items={galleryItems} base={BASE} />

          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────── */}
      <Section id="projects" className="border-t border-border/40">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-1">Featured Projects</h2>
          <p className="text-sm text-muted-foreground">A selection of work across web development, systems, and AI</p>
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
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 h-8 px-3 text-sm font-medium rounded-md border border-border bg-transparent text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-fast"
        >
          All Projects <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Section>

      {/* ── Skills ────────────────────────────────────────────── */}
      <Section className="border-t border-border/40">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">Skills & Technologies</h2>
        </div>
        <SkillGlobe />
      </Section>

      {/* ── Recent Experience ─────────────────────────────────── */}
      <Section id="experience" className="border-t border-border/40">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-1">Recent Experience</h2>
          <p className="text-sm text-muted-foreground">Machine learning and data analysis work</p>
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
            />
          ))}
        </div>
        <Link
          href="/experience"
          className="inline-flex items-center gap-1.5 h-8 px-3 text-sm font-medium rounded-md border border-border bg-transparent text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-fast"
        >
          All Experience <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Section>

      {/* ── Academic Coursework ───────────────────────────────── */}
      <Section className="border-t border-border/40">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight mb-1">Academic Coursework</h2>
          <p className="text-sm text-muted-foreground">Relevant CMU courses</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {[
            { name: '10301 — Introduction to Machine Learning', skills: ['Python', 'Supervised Learning', 'Neural Networks', 'Statistical ML'] },
            { name: '67272 — Application Design and Development', skills: ['MVC Architecture', 'Web Application Development', 'Relational Database Integration', 'User-Centered Design'] },
            { name: '15122 — Principles of Imperative Computation', skills: ['C Programming', 'Data Structures & Algorithms', 'Imperative Programming', 'Program Correctness'] },
            { name: '67262 — Database Design and Development', skills: ['SQL', 'Relational Database Design', 'Database Management Systems', 'Data Modeling'] },
            { name: '36225 — Introduction to Probability', skills: ['Probability Modeling', 'Random Variables & Distributions', 'Statistical Reasoning', 'R'] },
            { name: '05391 — Designing Human Centered Software', skills: ['UI Prototyping', 'Usability Evaluation', 'Human-Computer Interaction', 'User-Centered Design'] },
          ].map(({ name, skills }) => (
            <div key={name} className="px-4 py-3 rounded-lg border border-border bg-card flex flex-col gap-2.5">
              <p className="text-sm text-foreground/80">{name}</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span key={skill} className="text-[10px] font-medium border border-border text-muted-foreground rounded px-1.5 py-0.5">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 h-8 px-3 text-sm font-medium rounded-md border border-border bg-transparent text-foreground/80 hover:text-foreground hover:bg-muted/50 transition-fast"
        >
          All Courses <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Section>

      {/* ── Contact strip ─────────────────────────────────────── */}
      <Section className="border-t border-border/40">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Let&apos;s work together</h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Open to summer 2026 internships in software engineering, web development, and AI/ML.
            Also open to collaborations and interesting projects.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-9 px-4 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-fast shadow-glow"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </div>
  );
}
