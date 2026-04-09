'use client';

import { useEffect, useRef, useState } from 'react';
import TechBadge from '@/components/Common/TechBadge';
import type { Experience } from '@/data/experience';
import { Briefcase, BookOpen, Heart, MapPin, Calendar, Eye } from 'lucide-react';

const getIcon = (type: string) => {
  if (type === 'work')      return <Briefcase className="h-4 w-4" />;
  if (type === 'research')  return <BookOpen className="h-4 w-4" />;
  if (type === 'volunteer') return <Heart className="h-4 w-4" />;
  return <Briefcase className="h-4 w-4" />;
};

const dotColor:    Record<string, string> = { work: 'bg-primary', research: 'bg-accent', volunteer: 'bg-green-500' };
const iconBg:      Record<string, string> = { work: 'bg-primary/10 text-primary', research: 'bg-accent/10 text-accent', volunteer: 'bg-green-500/10 text-green-500' };
const borderColor: Record<string, string> = { work: 'border-primary/25 hover:border-primary/50', research: 'border-accent/25 hover:border-accent/50', volunteer: 'border-green-500/25 hover:border-green-500/50' };

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = experiences.map((_, i) => {
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
  }, [experiences]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical gradient line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-green-500/40 -translate-x-1/2 hidden md:block" />

        <div className="space-y-8 md:space-y-14">
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              ref={(el) => { refs.current[i] = el; }}
              className={`md:grid md:grid-cols-2 gap-8 transition-all duration-600 ${
                visible.has(i) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {/* Left: Card */}
              <div className="relative flex items-center">
                <div
                  className={`hidden md:block absolute right-0 top-1/2 w-3 h-3 rounded-full ${dotColor[exp.type] ?? 'bg-primary'} border-2 border-background shadow-sm -translate-y-1/2 translate-x-1/2 z-10`}
                />
                <div className={`w-full border ${borderColor[exp.type] ?? ''} hover:shadow-md transition-smooth bg-card rounded-lg p-5`}>
                  <div className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <div className={`p-1.5 rounded-md shrink-0 ${iconBg[exp.type] ?? ''}`}>
                          {getIcon(exp.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm leading-snug">{exp.role}</p>
                          <p className="text-sm text-foreground/70 mt-0.5">{exp.organization}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-0.5">
                        <Calendar className="h-3 w-3" /><span>{exp.date}</span>
                      </div>
                    </div>
                    {exp.location && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground ml-9 mt-1">
                        <MapPin className="h-3 w-3" />{exp.location}
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 pt-0">
                    <ul className="space-y-1.5">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0 mt-[7px]" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.skills.map((skill) => (
                        <TechBadge key={skill}>{skill}</TechBadge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Link buttons */}
              <div className="hidden md:flex items-center">
                <div className="flex flex-col gap-2 w-full max-w-[200px]">
                  {exp.url1 && (
                    <a
                      href={exp.url1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 h-8 px-3 text-xs rounded-md border border-border bg-transparent text-muted-foreground hover:text-foreground hover:border-border/80 transition-fast"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      {exp.id === 'cerrahpasa' ? 'Journal Article' : 'Report'}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
