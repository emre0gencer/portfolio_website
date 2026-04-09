import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TechBadge from "@/components/Common/TechBadge";
import { MapPin, Calendar } from "lucide-react";

interface ExperienceCardProps {
  role: string;
  organization: string;
  location?: string;
  date: string;
  description: string[];
  skills: string[];
  type?: "work" | "research" | "volunteer";
  attachments?: {
    pdf?: string;
    pptx?: string;
  };
}

const typeAccent = {
  work: "border-l-primary",
  research: "border-l-accent",
  volunteer: "border-l-green-500",
};

const ExperienceCard = ({
  role,
  organization,
  location,
  date,
  description,
  skills,
  type = "work",
}: ExperienceCardProps) => {
  return (
    <Card className={`border-l-2 ${typeAccent[type]} hover:shadow-md transition-smooth bg-card`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm leading-snug">{role}</p>
            <p className="text-sm text-foreground/70 mt-0.5">{organization}</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-0.5">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
        {location && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            {location}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        <ul className="space-y-1.5">
          {description.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
              <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0 mt-[7px]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {skills.map((skill) => (
            <TechBadge key={skill}>{skill}</TechBadge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCard;
