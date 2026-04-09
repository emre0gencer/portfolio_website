import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TechBadge from "@/components/Common/TechBadge";
import { Experience } from "@/data/experience";
import { Briefcase, BookOpen, Heart, MapPin, Calendar, Eye, Download } from "lucide-react";

const getExperienceIcon = (type: string) => {
  switch (type) {
    case "work":
      return <Briefcase className="h-4 w-4" />;
    case "research":
      return <BookOpen className="h-4 w-4" />;
    case "volunteer":
      return <Heart className="h-4 w-4" />;
    default:
      return <Briefcase className="h-4 w-4" />;
  }
};

const dotColor: Record<string, string> = {
  work: "bg-primary",
  research: "bg-accent",
  volunteer: "bg-green-500",
};

const iconBg: Record<string, string> = {
  work: "bg-primary/10 text-primary",
  research: "bg-accent/10 text-accent",
  volunteer: "bg-green-500/10 text-green-500",
};

const borderColor: Record<string, string> = {
  work: "border-primary/25 hover:border-primary/50",
  research: "border-accent/25 hover:border-accent/50",
  volunteer: "border-green-500/25 hover:border-green-500/50",
};

interface ExperienceTimelineProps {
  experiences: Experience[];
}

const ExperienceTimeline = ({ experiences }: ExperienceTimelineProps) => {
  const [visibleIndexes, setVisibleIndexes] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = experiences.map((_, index) => {
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
  }, [experiences]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-green-500/40 -translate-x-1/2 hidden md:block" />

        <div className="space-y-8 md:space-y-14">
          {experiences.map((experience, index) => {
            const isVisible = visibleIndexes.has(index);
            const type = experience.type;

            return (
              <div
                key={experience.id}
                ref={(el) => { itemRefs.current[index] = el; }}
                className={`md:grid md:grid-cols-2 gap-8 transition-all duration-600 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
                {/* Left: Card */}
                <div className="relative flex items-center">
                  {/* Timeline dot */}
                  <div
                    className={`hidden md:block absolute right-0 top-1/2 w-3 h-3 rounded-full ${dotColor[type] ?? "bg-primary"} border-2 border-background shadow-sm -translate-y-1/2 translate-x-1/2 z-10`}
                  />

                  <Card className={`w-full border ${borderColor[type] ?? ""} hover:shadow-md transition-smooth bg-card`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                          <div className={`p-1.5 rounded-md shrink-0 ${iconBg[type] ?? ""}`}>
                            {getExperienceIcon(type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm leading-snug">{experience.role}</p>
                            <p className="text-sm text-foreground/70 mt-0.5">{experience.organization}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-0.5">
                          <Calendar className="h-3 w-3" />
                          <span>{experience.date}</span>
                        </div>
                      </div>
                      {experience.location && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground ml-9 mt-1">
                          <MapPin className="h-3 w-3" />
                          {experience.location}
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-3 pt-0">
                      <ul className="space-y-1.5">
                        {experience.description.map((desc, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0 mt-[7px]" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {experience.skills.map((skill) => (
                          <TechBadge key={skill}>{skill}</TechBadge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right: Action buttons */}
                <div className="hidden md:flex items-center">
                  <div className="flex flex-col gap-2 w-full max-w-[200px]">
                    {experience.url1 && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                      >
                        <a href={experience.url1} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <Eye className="h-3.5 w-3.5" />
                          {experience.id === "cerrahpasa" ? "Journal Article" : "Report"}
                        </a>
                      </Button>
                    )}
                    {experience.url2 && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                      >
                        <a href={experience.url2} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
