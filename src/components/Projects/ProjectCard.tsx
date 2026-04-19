import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TechBadge from "@/components/Common/TechBadge";
import { ExternalLink, Github, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  id?: string;
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
  id,
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
    <Card id={id} className="group h-full flex flex-col overflow-hidden border-border hover:border-border/80 hover:shadow-md transition-smooth bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <CardTitle className="text-base font-semibold leading-snug group-hover:text-primary transition-fast">
            {title}
          </CardTitle>
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

        <p className="text-xs text-muted-foreground leading-relaxed mt-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between pt-0">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.map((tech) => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {slug && (
            <Button asChild variant="default" size="sm" className="flex-1 h-8 text-xs">
              <Link to={`/projects/${slug}`}>View Details</Link>
            </Button>
          )}
          {githubUrl && category !== "Community Impact" && category !== "Hackathon" && (
            <Button asChild variant="outline" size="sm" className="h-8 w-8 p-0">
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button asChild variant="outline" size="sm" className="h-8 w-8 p-0">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
