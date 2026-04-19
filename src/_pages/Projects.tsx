import { useState } from "react";
import Section from "@/components/Common/Section";
import PageHeader from "@/components/Common/PageHeader";
import ProjectCard from "@/components/Projects/ProjectCard";
import ProjectTimeline from "@/components/Projects/ProjectTimeline";
import { projects, getProjectCategories } from "@/data/projects";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("timeline");
  const categories = getProjectCategories();

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => 
          p.categories 
            ? p.categories.includes(selectedCategory)
            : p.category === selectedCategory
        );

  return (
    <div className="min-h-screen pt-20 pb-20">
      <Section>
        <PageHeader
          title="Projects"
          subtitle="Web development, AI, systems, and community impact"
        />

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          {/* Filter chips */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-xs font-medium rounded-md border transition-fast ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "timeline")}>
            <TabsList className="h-8">
              <TabsTrigger value="grid" className="text-xs h-7 px-3">Grid</TabsTrigger>
              <TabsTrigger value="timeline" className="text-xs h-7 px-3">Timeline</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        {viewMode === "grid" ? (
          <>
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack.slice(0, 5)}
                  category={project.category}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  slug={project.id}
                  impact={project.impact}
                />
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground">No projects found in this category.</p>
              </div>
            )}
          </>
        ) : (
          <div className="animate-fade-in">
            <ProjectTimeline projects={filteredProjects} />
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground">No projects found in this category.</p>
              </div>
            )}
          </div>
        )}
      </Section>
    </div>
  );
};

export default Projects;
