import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const PageHeader = ({ title, subtitle, className }: PageHeaderProps) => {
  return (
    <div className={cn("mb-12 animate-fade-up text-center", className)}>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {title}
      </h1>
      {subtitle && (
        <p className="text-base text-muted-foreground max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
