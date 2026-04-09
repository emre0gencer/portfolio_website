import { useState } from "react";
import Section from "@/components/Common/Section";
import PageHeader from "@/components/Common/PageHeader";
import ExperienceCard from "@/components/Experience/ExperienceCard";
import ExperienceTimeline from "@/components/Experience/ExperienceTimeline";
import { experiences } from "@/data/experience";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Experience = () => {
  const [selectedType, setSelectedType] = useState<"all" | "work" | "research" | "volunteer">("all");
  const [viewMode, setViewMode] = useState<"cards" | "timeline">("timeline");

  const filteredExperiences =
    selectedType === "all"
      ? experiences
      : experiences.filter((exp) => exp.type === selectedType);

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
            {(["all", "work", "research", "volunteer"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1 text-xs font-medium rounded-md border transition-fast capitalize ${
                  selectedType === t
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "cards" | "timeline")}>
            <TabsList className="h-8">
              <TabsTrigger value="cards" className="text-xs h-7 px-3">Cards</TabsTrigger>
              <TabsTrigger value="timeline" className="text-xs h-7 px-3">Timeline</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        {viewMode === "cards" ? (
          <>
            {/* Experience Cards */}
            <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
              {filteredExperiences.map((exp) => (
                <ExperienceCard
                  key={exp.id}
                  role={exp.role}
                  organization={exp.organization}
                  location={exp.location}
                  date={exp.date}
                  description={exp.description}
                  skills={exp.skills}
                  type={exp.type}
                  attachments={exp.attachments}
                />
              ))}
            </div>

            {filteredExperiences.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground">No experiences found in this category.</p>
              </div>
            )}
          </>
        ) : (
          <div className="animate-fade-in">
            <ExperienceTimeline experiences={filteredExperiences} />
            {filteredExperiences.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground">No experiences found in this category.</p>
              </div>
            )}
          </div>
        )}
      </Section>
    </div>
  );
};

export default Experience;
