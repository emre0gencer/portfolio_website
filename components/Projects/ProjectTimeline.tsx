'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import TechBadge from '@/components/Common/TechBadge';
import type { Project } from '@/data/projects';
import { ExternalLink, Github, Award, Calendar } from 'lucide-react';

interface ProjectTimelineProps {
  projects: Project[];
}

const ProjectTimeline = ({ projects }: ProjectTimelineProps) => {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = projects.map((_, i) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => new Set(prev).add(i));
            obs.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );
      if (refs.current[i]) obs.observe(refs.current[i]!);
      return obs;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [projects]);

  const getLinks = (project: Project) => {
    const links: { label: string; href: string; icon: React.ReactNode }[] = [];
    if (project.awardsUrl) links.push({ label: 'Awards', href: project.awardsUrl, icon: <Award className="h-3.5 w-3.5" /> });
    if (project.githubUrl && project.category !== 'Community Impact' && project.category !== 'Hackathon')
      links.push({ label: 'Code', href: project.githubUrl, icon: <Github className="h-3.5 w-3.5" /> });
    if (project.liveUrl) links.push({ label: 'View', href: project.liveUrl, icon: <ExternalLink className="h-3.5 w-3.5" /> });
    return links;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent -translate-x-1/2" />

        <div className="space-y-8 md:space-y-14">
          {projects.map((project, i) => {
            const links = getLinks(project);
            return (
              <div
                key={project.id}
                ref={(el) => { refs.current[i] = el; }}
                className={`md:grid md:grid-cols-2 gap-8 transition-all duration-600 ${
                  visible.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {/* Left: Card */}
                <div className="relative flex items-center">
                  <div className="hidden md:block absolute right-0 top-1/2 w-3 h-3 bg-primary rounded-full border-2 border-background shadow-sm -translate-y-1/2 translate-x-1/2 z-10" />
                  <div className="w-full border border-border hover:border-border/80 hover:shadow-md transition-smooth bg-card rounded-lg p-5">
                    <div className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm leading-snug">{project.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{project.role}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-0.5">
                          <Calendar className="h-3 w-3" /><span>{project.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 pt-0">
                      <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>
                      {project.impact && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-accent">
                          <Award className="h-3 w-3 shrink-0" /><span>{project.impact}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <TechBadge key={tech}>{tech}</TechBadge>
                        ))}
                      </div>
                      {project.details && (
                        <Link
                          href={`/projects/${project.id}`}
                          className="flex items-center justify-center h-7 w-full text-xs rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-fast"
                        >
                          View Details
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: External links */}
                <div className="hidden md:flex items-center">
                  {links.length > 0 && (
                    <div className="flex flex-col gap-2 w-full max-w-[180px]">
                      {links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 h-8 px-3 text-xs rounded-md border border-border bg-transparent text-muted-foreground hover:text-foreground hover:border-border/80 transition-fast"
                        >
                          {link.icon}{link.label}
                        </a>
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
