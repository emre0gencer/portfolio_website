'use client';

import { useState } from 'react';
import Section from '@/components/Common/Section';
import PageHeader from '@/components/Common/PageHeader';
import ExperienceCard from '@/components/Experience/ExperienceCard';
import ExperienceTimeline from '@/components/Experience/ExperienceTimeline';
import { experiences } from '@/data/experience';

const TYPES = ['all', 'work', 'research', 'volunteer'] as const;
type TypeFilter = typeof TYPES[number];

export default function ExperiencePage() {
  const [selectedType, setSelectedType] = useState<TypeFilter>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'timeline'>('timeline');

  const filtered =
    selectedType === 'all'
      ? experiences
      : experiences.filter((e) => e.type === selectedType);

  return (
    <div className="min-h-screen pt-20 pb-20">
      <Section>
        <PageHeader
          title="Experience"
          subtitle="Professional work, research, and community involvement"
        />

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          {/* Type filters */}
          <div className="flex flex-wrap gap-1.5">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1 text-xs font-medium rounded-md border transition-fast capitalize ${
                  selectedType === t
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-border/80'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex rounded-md border border-border overflow-hidden">
            {(['cards', 'timeline'] as const).map((mode) => (
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

        {/* Content */}
        {viewMode === 'cards' ? (
          <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
            {filtered.map((exp) => (
              <ExperienceCard
                key={exp.id}
                role={exp.role}
                organization={exp.organization}
                location={exp.location}
                date={exp.date}
                description={exp.description}
                skills={exp.skills}
                type={exp.type}
              />
            ))}
            {filtered.length === 0 && (
              <p className="text-center py-12 text-sm text-muted-foreground">No experiences found.</p>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
            <ExperienceTimeline experiences={filtered} />
            {filtered.length === 0 && (
              <p className="text-center py-12 text-sm text-muted-foreground">No experiences found.</p>
            )}
          </div>
        )}
      </Section>
    </div>
  );
}
