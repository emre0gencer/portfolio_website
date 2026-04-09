import type { Metadata } from 'next';
import Section from '@/components/Common/Section';
import PageHeader from '@/components/Common/PageHeader';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Emre Gencer — open to summer 2026 internships in software engineering, web development, and AI/ML.',
};

const channels = [
  {
    label: 'University Email',
    value: 'egencer@andrew.cmu.edu',
    href: 'mailto:egencer@andrew.cmu.edu',
    external: false,
    cta: 'Send an email',
    icon: 'mail',
  },
  {
    label: 'Personal Email',
    value: 'emre0gencer@gmail.com',
    href: 'mailto:emre0gencer@gmail.com',
    external: false,
    cta: 'Send an email',
    icon: 'mail',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/emre-gencer-021428265',
    href: 'https://linkedin.com/in/emre-gencer-021428265',
    external: true,
    cta: 'Connect',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    value: 'github.com/emre0gencer',
    href: 'https://github.com/emre0gencer',
    external: true,
    cta: 'View profile',
    icon: 'github',
  },
] as const;

function ChannelIcon({ icon }: { icon: string }) {
  if (icon === 'linkedin') return <Linkedin className="h-5 w-5" />;
  if (icon === 'github') return <Github className="h-5 w-5" />;
  return <Mail className="h-5 w-5" />;
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <Section>
        <div className="max-w-lg mx-auto">
          <PageHeader
            title="Get In Touch"
            subtitle="Open to summer 2026 internships in software engineering, web development, and AI/ML — as well as collaborations and interesting projects."
          />

          <div className="space-y-10">
            {/* Channel cards */}
            <div className="space-y-3">
              {channels.map(({ label, value, href, external, cta, icon }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/40 bg-card transition-smooth"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground group-hover:text-primary transition-fast shrink-0">
                      <ChannelIcon icon={icon} />
                    </span>
                    <div>
                      <p className="text-sm font-medium leading-none mb-1">{label}</p>
                      <p className="text-xs text-muted-foreground">{value}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-fast shrink-0">
                    {cta} <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="border-t border-border/40 pt-8 space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                  Currently based in
                </p>
                <p className="text-sm text-foreground/80">Pittsburgh, PA · Carnegie Mellon University</p>
                <p className="text-sm text-foreground/80">Istanbul, Turkey</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                  Available for
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Summer 2026 Internship', 'Part-time Collaboration', 'Research Projects'].map((item) => (
                    <span
                      key={item}
                      className="text-[11px] font-medium border border-border text-muted-foreground rounded px-2 py-0.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                  Interested in
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Software Engineering', 'Full-Stack Web Dev', 'AI / ML', 'Systems Programming'].map((role) => (
                    <span
                      key={role}
                      className="text-[11px] font-medium border border-border text-muted-foreground rounded px-2 py-0.5"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
