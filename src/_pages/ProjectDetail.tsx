import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Section from "@/components/Common/Section";
import TechBadge from "@/components/Common/TechBadge";
import { getProjectById } from "@/data/projects";
import { ArrowLeft, Github, ExternalLink, Award } from "lucide-react";

const DetailSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="border-l-2 border-border pl-5 space-y-2">
    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
      {label}
    </p>
    <div className="text-sm text-foreground/85 leading-relaxed">{children}</div>
  </div>
);

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : null;

  if (!project) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <Section>
          <div className="max-w-xl mx-auto">
            <h1 className="text-2xl font-semibold mb-3">Project not found</h1>
            <p className="text-sm text-muted-foreground mb-6">
              The project you're looking for doesn't exist.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
              </Link>
            </Button>
          </div>
        </Section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20">
      <Section>
        <div className="max-w-2xl mx-auto">
          {/* Back */}
          <Button asChild variant="ghost" size="sm" className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" /> Projects
            </Link>
          </Button>

          {/* Header */}
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
              <div className="flex items-start gap-2 py-3 px-4 bg-accent/8 border border-accent/20 rounded-lg mb-5">
                <Award className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-accent">{project.impact}</p>
              </div>
            )}

            <p className="text-sm leading-relaxed text-foreground/80 mb-5">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.techStack.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-2">
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-3.5 w-3.5" /> Code
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-3.5 w-3.5" /> Live
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Case Study Sections */}
          {project.details && (
            <div className="space-y-8 animate-fade-in border-t border-border/40 pt-10">
              <DetailSection label="The Problem">
                {project.details.problem}
              </DetailSection>

              <DetailSection label="The Solution">
                {project.details.solution}
              </DetailSection>

              <DetailSection label="My Contribution">
                {project.details.contribution}
              </DetailSection>

              <DetailSection label="What I Learned">
                <ul className="space-y-1.5">
                  {project.details.learned.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
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
};

export default ProjectDetail;
