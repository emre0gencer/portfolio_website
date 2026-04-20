'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryItem {
  src: string;
  title: string;
  desc: string;
  type?: 'image' | 'video';
}

export default function HeroGallery({ items, base }: { items: GalleryItem[]; base: string }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goTo = (i: number) => {
    setFading(true);
    setTimeout(() => { setCurrent(i); setFading(false); }, 400);
  };

  useEffect(() => {
    const item = items[current];
    if (item.type === 'video') return; // don't auto-advance while video plays
    const interval = setInterval(() => goTo((current + 1) % items.length), 3500);
    return () => clearInterval(interval);
  }, [current, items]);

  // auto-advance after video ends
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onEnded = () => goTo((current + 1) % items.length);
    vid.addEventListener('ended', onEnded);
    return () => vid.removeEventListener('ended', onEnded);
  }, [current, items.length]);

  const item = items[current];
  const isVideo = item.type === 'video';

  return (
    <div className="flex flex-col gap-3 animate-fade-up" style={{ animationDelay: '0.15s' }}>
      <div
        className="relative rounded-xl overflow-hidden border border-border bg-card w-full"
        style={{ aspectRatio: '16/9', transition: 'opacity 0.4s ease', opacity: fading ? 0 : 1 }}
      >
        {!item.src ? (
          <div className="absolute inset-0 bg-muted/20 flex items-center justify-center">
            <span className="text-sm text-muted-foreground/30 select-none">Photo</span>
          </div>
        ) : isVideo ? (
          <video
            ref={videoRef}
            key={item.src}
            src={`${base}${item.src}`}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-contain"
          />
        ) : (
          <Image
            src={`${base}${item.src}`}
            alt={item.title}
            fill
            className="object-cover"
          />
        )}

        {/* Arrow navigation */}
        {current > 0 && (
          <button
            onClick={() => goTo(current - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-background/90 transition-fast"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
        {current < items.length - 1 && (
          <button
            onClick={() => goTo(current + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background/70 backdrop-blur-sm border border-border flex items-center justify-center text-foreground hover:bg-background/90 transition-fast"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Footer */}
      <div
        className="px-1"
        style={{ transition: 'opacity 0.4s ease', opacity: fading ? 0 : 1 }}
      >
        <p className="text-sm font-semibold text-foreground leading-tight">{item.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 px-1">
        {items.map((it, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === current ? 'w-5 bg-primary' : 'w-1.5 bg-border hover:bg-muted-foreground'
            }`}
            aria-label={`Go to ${it.type === 'video' ? 'video' : 'photo'} ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
