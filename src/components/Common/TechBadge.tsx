import { cn } from "@/lib/utils";
import { techColorMap } from "@/data/techColors";

interface TechBadgeProps {
  children: React.ReactNode;
  className?: string;
}

const TechBadge = ({ children, className }: TechBadgeProps) => {
  const key = typeof children === "string" ? children : "";
  const colorClasses =
    techColorMap[key] ?? "bg-secondary text-secondary-foreground";

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-sm bg-secondary text-secondary-foreground",
        colorClasses,
        className
      )}
    >
      {children}
    </span>
  );
};

export default TechBadge;
