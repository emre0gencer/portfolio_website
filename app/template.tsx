'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)', y: 6 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {children}
    </motion.div>
  );
}
