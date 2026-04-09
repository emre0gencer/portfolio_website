import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Emre Gencer',
    template: '%s · Emre Gencer',
  },
  description:
    'Emre Gencer — Information Systems sophomore at Carnegie Mellon University. Building full-stack web apps, AI-driven products, and systems-level software.',
  openGraph: {
    title: 'Emre Gencer',
    description: 'Information Systems sophomore at CMU. Full-stack, AI, Systems.',
    siteName: 'Emre Gencer',
    locale: 'en_US',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground antialiased">
        {/* Fixed CSS orb background — replaces Vanta.js, no canvas/WebGL */}
        <div className="site-bg-layer" aria-hidden="true" />

        <div className="relative flex flex-col min-h-screen" style={{ zIndex: 1 }}>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
