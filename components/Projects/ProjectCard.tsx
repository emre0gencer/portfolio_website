import Link from 'next/link';
import TechBadge from '@/components/Common/TechBadge';
import { ExternalLink, Github, Award } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  category?: string;
  githubUrl?: string;
  liveUrl?: string;
  slug?: string;
  impact?: string;
}

const ProjectCard = ({
  title,
  description,
  techStack,
  category,
  githubUrl,
  liveUrl,
  slug,
  impact,
}: ProjectCardProps) => {
  return (
    <div className="group h-full flex flex-col overflow-hidden border-border hover:border-border/80 hover:shadow-md transition-smooth bg-card rounded-lg border p-5">
      <div className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-base font-semibold leading-snug group-hover:text-primary transition-fast">
            {title}
          </p>
          {category && (
            <span className="text-[10px] font-medium text-muted-foreground border border-border rounded px-1.5 py-0.5 shrink-0 whitespace-nowrap">
              {category}
            </span>
          )}
        </div>
        {impact && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-accent mt-1">
            <Award className="h-3 w-3 shrink-0" />
            <span>{impact}</span>
          </div>
        )}
        <p className="text-xs text-muted-foreground leading-relaxed mt-2">{description}</p>
      </div>

      <div className="flex-1 flex flex-col justify-between pt-0">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {slug && (
            <Link
              href={`/projects/${slug}`}
              className="flex-1 inline-flex items-center justify-center h-8 px-3 text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-fast"
            >
              View Details
            </Link>
          )}
          {githubUrl && category !== 'Community Impact' && category !== 'Hackathon' && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-border/80 transition-fast"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live demo"
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-border/80 transition-fast"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
