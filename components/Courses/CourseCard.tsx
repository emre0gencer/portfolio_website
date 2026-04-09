import TechBadge from '@/components/Common/TechBadge';
import { Award, Calendar, ExternalLink } from 'lucide-react';

interface CourseCardProps {
  title: string;
  provider: string;
  date?: string;
  description?: string;
  categories?: string[];
  certified?: boolean;
  certificateUrl?: string;
}

const CourseCard = ({
  title,
  provider,
  date,
  description,
  categories = [],
  certified = false,
  certificateUrl,
}: CourseCardProps) => {
  return (
    <div className="hover:shadow-md transition-smooth border-border hover:border-primary/30 flex flex-col h-full bg-card rounded-lg border p-5">
      <div className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-base font-semibold">{title}</p>
          {certified && <Award className="h-4 w-4 text-accent shrink-0" />}
        </div>
        <p className="text-sm font-medium text-muted-foreground mt-0.5">{provider}</p>
        {date && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1.5">
            <Calendar className="h-3.5 w-3.5" />{date}
          </p>
        )}
      </div>

      <div className="space-y-2.5 flex-1 flex flex-col pt-0">
        <div className="flex-1 space-y-2.5">
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          )}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <TechBadge key={cat} variant="outline">{cat}</TechBadge>
              ))}
            </div>
          )}
        </div>
        {certificateUrl && (
          <div className="pt-2 flex justify-end">
            <a
              href={certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 h-7 px-3 text-xs rounded-md border border-primary bg-transparent text-primary hover:bg-primary/10 transition-fast"
            >
              <ExternalLink className="h-3 w-3" />View Certificate
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
