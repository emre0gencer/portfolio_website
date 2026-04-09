import { Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useHoverEffect } from "@/contexts/HoverEffectContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isEnabled, toggleHoverEffect } = useHoverEffect();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Emre Gencer
          </p>

          <div className="flex items-center gap-5">
            <a
              href="mailto:egencer@andrew.cmu.edu"
              className="text-muted-foreground hover:text-foreground transition-fast"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/emre-gencer-021428265"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-fast"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/emre0gencer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-fast"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>

            <div className="w-px h-4 bg-border" />

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 cursor-pointer" onClick={toggleHoverEffect}>
                  <Sparkles className={`h-3.5 w-3.5 ${isEnabled ? "text-primary" : "text-muted-foreground/50"}`} />
                  <Switch
                    checked={isEnabled}
                    onCheckedChange={toggleHoverEffect}
                    className="h-4 w-7 data-[state=checked]:bg-primary"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">{isEnabled ? "Disable" : "Enable"} cursor effect</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
