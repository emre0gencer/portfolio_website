import type { Metadata } from 'next';
import Section from '@/components/Common/Section';
import PageHeader from '@/components/Common/PageHeader';
import TechBadge from '@/components/Common/TechBadge';
import { GraduationCap, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Academic background and relevant coursework at Carnegie Mellon University and Robert College.',
};

const cmsCourses: Record<string, string[]> = {
  'Systems & Data': ['Data Structures', 'Computer Systems', 'Database Design & Development'],
  'AI & Machine Learning': ['Machine Learning', 'Artificial Intelligence', 'Computer Vision'],
  'Web & Software': ['Web Application Development', 'Software Development', 'Principles of Imperative Computation'],
  'Communication': ['Technical Writing', 'Organizational Design'],
};

const apScores = [
  { subject: 'Computer Science A', score: 5 },
  { subject: 'Calculus BC', score: 5 },
  { subject: 'Physics C: Mechanics', score: 5 },
  { subject: 'Physics C: E&M', score: 5 },
  { subject: 'Chemistry', score: 5 },
  { subject: 'Macro & Microeconomics', score: 5 },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <Section>
        <PageHeader
          title="Education"
          subtitle="Academic background and relevant coursework"
        />

        {/* Carnegie Mellon */}
        <div className="mb-6 animate-fade-up rounded-lg border border-border bg-card">
          <div className="p-6 pb-4">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-primary/10 rounded-lg shrink-0">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold text-base">Carnegie Mellon University</p>
                    <p className="text-sm text-foreground/70 mt-0.5">
                      Bachelor of Science in Information Systems
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">Expected May 2028</p>
                    <p className="text-xs font-medium text-foreground mt-0.5">Pittsburgh, PA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Information Systems combines computer science with business and systems thinking —
              covering software development, database design, machine learning, and organizational design.
            </p>

            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-primary" />
              <p className="text-sm font-medium">Relevant Coursework</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {Object.entries(cmsCourses).map(([group, courses]) => (
                <div key={group}>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                    {group}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {courses.map((course) => (
                      <TechBadge key={course}>{course}</TechBadge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Robert College */}
        <div className="mb-6 animate-fade-up rounded-lg border border-border bg-card">
          <div className="p-6 pb-4">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-muted rounded-lg shrink-0">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold text-base">Robert College</p>
                    <p className="text-sm text-foreground/70 mt-0.5">High School Diploma</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-muted-foreground">Graduated June 2024</p>
                    <p className="text-xs font-medium text-foreground mt-0.5">Istanbul, Turkey</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Rigorous college-preparatory curriculum with focus on STEM subjects,
              leadership, and extracurricular excellence.
            </p>
          </div>
        </div>

        {/* Honors & Scores */}
        <div className="animate-fade-up rounded-lg border border-border bg-card">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AP Scores */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                  AP Scores
                </p>
                <div className="space-y-2">
                  {apScores.map(({ subject, score }) => (
                    <div key={subject} className="flex items-center justify-between">
                      <span className="text-sm text-foreground/80">{subject}</span>
                      <span className="text-sm font-semibold text-primary tabular-nums">{score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tests & Languages */}
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                    Standardized Tests
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-foreground/80">SAT</span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">1530</span>
                    </div>
                    <p className="text-xs text-muted-foreground -mt-2">Reading &amp; Writing: 740 · Math: 790</p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-foreground/80">TOEFL</span>
                      <span className="text-sm font-semibold text-foreground tabular-nums">109</span>
                    </div>
                    <p className="text-xs text-muted-foreground -mt-2">L: 25 · R: 30 · W: 25 · S: 29</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                    Languages
                  </p>
                  <div className="space-y-2">
                    {([['Turkish', 'Native'], ['English', 'C2'], ['German', 'B1']] as const).map(([lang, level]) => (
                      <div key={lang} className="flex items-center justify-between">
                        <span className="text-sm text-foreground/80">{lang}</span>
                        <span className="text-xs text-muted-foreground">{level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
