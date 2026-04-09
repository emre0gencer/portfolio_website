import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {year} Emre Gencer</p>
          <div className="flex items-center gap-5">
            <a href="mailto:egencer@andrew.cmu.edu" className="text-muted-foreground hover:text-foreground transition-fast" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com/in/emre-gencer-021428265" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-fast" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://github.com/emre0gencer" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-fast" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
