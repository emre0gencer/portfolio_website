import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CobwebHover from "@/components/Common/CobwebHover";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { HoverEffectProvider } from "@/contexts/HoverEffectContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HoverEffectProvider>
        <Toaster />
        <Sonner />
        <CobwebHover />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <div className="site-bg-layer" aria-hidden="true">
            <div className="site-bg-image" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}background.png)` }} />
          </div>
          <div className="relative flex flex-col min-h-screen" style={{ zIndex: 1 }}>
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/education" element={<Education />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/contact" element={<Contact />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </HoverEffectProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
