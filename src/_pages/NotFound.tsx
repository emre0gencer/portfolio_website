import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-4 animate-fade-up">
        <p className="text-7xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tabular-nums">
          404
        </p>
        <h1 className="text-xl font-semibold mb-2">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-8 max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="sm">
            <Link to="/">
              <Home className="mr-2 h-3.5 w-3.5" /> Home
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/projects">
              <ArrowLeft className="mr-2 h-3.5 w-3.5" /> Projects
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
