import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TechBadge from "@/components/Common/TechBadge";
import { Award, Calendar, ExternalLink } from "lucide-react";

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
    <Card className="hover:shadow-md transition-smooth border-border hover:border-primary/30 flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{title}</CardTitle>
          {certified && (
            <Award className="h-4 w-4 text-accent shrink-0" />
          )}
        </div>
        <CardDescription className="text-sm font-medium">{provider}</CardDescription>
        {date && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {date}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-2.5 flex-1 flex flex-col pt-0">
        <div className="flex-1 space-y-2.5">
          {description && (
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          )}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {categories.map((category) => (
                <TechBadge key={category} variant="outline" className="text-xs px-2 py-0.5">
                  {category}
                </TechBadge>
              ))}
            </div>
          )}
        </div>
        
        {certificateUrl && (
          <div className="pt-2 flex justify-end">
            <Button 
              asChild 
              variant="outline" 
              size="sm" 
              className="bg-transparent border-primary text-primary hover:bg-primary/10 h-7 text-xs"
            >
              <a
                href={certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <ExternalLink className="h-3 w-3" />
                View Certificate
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCard;
