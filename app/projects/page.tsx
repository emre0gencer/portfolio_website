'use client';

import { useState } from 'react';
import Section from '@/components/Common/Section';
import PageHeader from '@/components/Common/PageHeader';
import ProjectCard from '@/components/Projects/ProjectCard';
import ProjectTimeline from '@/components/Projects/ProjectTimeline';
import { projects, getProjectCategories } from '@/data/projects';

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('timeline');
  const categories = getProjectCategories();

  const filtered =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) =>
          p.categories ? p.categories.includes(selectedCategory) : p.category === selectedCategory
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
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-md border transition-fast ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-border/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex rounded-md border border-border overflow-hidden">
            {(['grid', 'timeline'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-xs font-medium capitalize transition-fast ${
                  viewMode === mode
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
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
            {filtered.length === 0 && (
              <p className="col-span-3 text-center py-12 text-sm text-muted-foreground">No projects found.</p>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
            <ProjectTimeline projects={filtered} />
            {filtered.length === 0 && (
              <p className="text-center py-12 text-sm text-muted-foreground">No projects found.</p>
            )}
          </div>
        )}
      </Section>
    </div>
  );
}
