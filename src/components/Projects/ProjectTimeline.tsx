import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TechBadge from "@/components/Common/TechBadge";
import { Project } from "@/data/projects";
import { ExternalLink, Github, Award, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProjectTimelineProps {
  projects: Project[];
}

const ProjectTimeline = ({ projects }: ProjectTimelineProps) => {
  const [visibleIndexes, setVisibleIndexes] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = projects.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => new Set(prev).add(index));
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (itemRefs.current[index]) {
        observer.observe(itemRefs.current[index]!);
      }

      return observer;
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [projects]);

  const getLinks = (project: Project) => {
    const links: { label: string; href: string; icon: React.ReactNode; external: boolean }[] = [];

    if (project.awardsUrl) {
      links.push({ label: "Awards", href: project.awardsUrl, icon: <Award className="h-3.5 w-3.5" />, external: true });
    }
    if (project.githubUrl && project.category !== "Community Impact" && project.category !== "Hackathon") {
      links.push({ label: "Code", href: project.githubUrl, icon: <Github className="h-3.5 w-3.5" />, external: true });
    }
    if (project.liveUrl) {
      links.push({ label: "View", href: project.liveUrl, icon: <ExternalLink className="h-3.5 w-3.5" />, external: true });
    }

    return links;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent -translate-x-1/2" />

        <div className="space-y-8 md:space-y-14">
          {projects.map((project, index) => {
            const externalLinks = getLinks(project);
            const hasDetailPage = !!project.details;

            return (
              <div
                key={project.id}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`md:grid md:grid-cols-2 gap-8 transition-all duration-600 ${
                  visibleIndexes.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                {/* Left: Card */}
                <div className="relative flex items-center">
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute right-0 top-1/2 w-3 h-3 bg-primary rounded-full border-2 border-background shadow-sm -translate-y-1/2 translate-x-1/2 z-10" />

                  <Card className="w-full border border-border hover:border-border/80 hover:shadow-md transition-smooth bg-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm leading-snug">{project.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{project.role}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-0.5">
                          <Calendar className="h-3 w-3" />
                          <span>{project.date}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3 pt-0">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>

                      {project.impact && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-accent">
                          <Award className="h-3 w-3 shrink-0" />
                          <span>{project.impact}</span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <TechBadge key={tech}>{tech}</TechBadge>
                        ))}
                      </div>

                      {hasDetailPage && (
                        <div className="flex justify-center">
                          <Button asChild variant="default" size="sm" className="h-7 text-xs w-full">
                            <Link to={`/projects/${project.id}`}>View Details</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Right: External links */}
                <div className="hidden md:flex items-center">
                  {externalLinks.length > 0 && (
                    <div className="flex flex-col gap-2 w-full max-w-[180px]">
                      {externalLinks.map((link) => (
                        <Button
                          key={link.label}
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                        >
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            {link.icon}
                            {link.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
