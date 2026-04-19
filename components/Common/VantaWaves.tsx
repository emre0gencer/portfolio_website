'use client';

import { useEffect, useRef } from "react";
import * as THREE from "three";
import WAVES from "vanta/dist/vanta.waves.min";

const VantaWaves = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const effectRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current && !effectRef.current) {
      effectRef.current = WAVES({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x0d1f3c,
        shininess: 28,
        waveHeight: 14,
        waveSpeed: 0.45,
      });
    }

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

export default VantaWaves;
