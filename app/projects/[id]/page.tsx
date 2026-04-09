import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import Section from '@/components/Common/Section';
import TechBadge from '@/components/Common/TechBadge';
import { getProjectById, projects } from '@/data/projects';
import { ArrowLeft, Github, ExternalLink, Award } from 'lucide-react';

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  return {
    title: project?.title ?? 'Project Not Found',
    description: project?.description,
  };
}

const DetailSection = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="border-l-2 border-border pl-5 space-y-2">
    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
    <div className="text-sm text-foreground/85 leading-relaxed">{children}</div>
  </div>
);

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  return (
    <div className="min-h-screen pt-20 pb-20">
      <Section>
        <div className="max-w-2xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 h-8 px-3 mb-8 -ml-1 text-sm text-muted-foreground hover:text-foreground transition-fast rounded-md hover:bg-muted/50"
          >
            <ArrowLeft className="h-4 w-4" /> Projects
          </Link>

          <div className="mb-10 animate-fade-up">
            <div className="flex items-start gap-3 mb-1">
              <span className="text-[11px] font-medium text-muted-foreground border border-border rounded px-1.5 py-0.5 mt-1 shrink-0">
                {project.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
                {project.title}
              </h1>
            </div>

            <p className="text-sm text-muted-foreground mt-2 mb-4">
              {project.role} · {project.date}
            </p>

            {project.impact && (
              <div className="flex items-start gap-2 py-3 px-4 bg-accent/[0.08] border border-accent/20 rounded-lg mb-5">
                <Award className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-accent">{project.impact}</p>
              </div>
            )}

            <p className="text-sm leading-relaxed text-foreground/80 mb-5">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.techStack.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>

            <div className="flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-8 px-3 text-sm rounded-md border border-border bg-transparent text-muted-foreground hover:text-foreground hover:border-border/80 transition-fast"
                >
                  <Github className="h-3.5 w-3.5" /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-8 px-3 text-sm rounded-md border border-border bg-transparent text-muted-foreground hover:text-foreground hover:border-border/80 transition-fast"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Live
                </a>
              )}
            </div>
          </div>

          {project.details && (
            <div className="space-y-8 animate-fade-in border-t border-border/40 pt-10">
              <DetailSection label="The Problem">{project.details.problem}</DetailSection>
              <DetailSection label="The Solution">{project.details.solution}</DetailSection>
              <DetailSection label="My Contribution">{project.details.contribution}</DetailSection>
              <DetailSection label="What I Learned">
                <ul className="space-y-1.5">
                  {project.details.learned.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0 mt-[7px]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
