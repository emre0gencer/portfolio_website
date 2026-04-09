import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HoverEffectContextType {
  isEnabled: boolean;
  toggleHoverEffect: () => void;
}

const HoverEffectContext = createContext<HoverEffectContextType | undefined>(undefined);

export const HoverEffectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false); // Disabled by default

  const toggleHoverEffect = () => {
    setIsEnabled(prev => !prev);
  };

  return (
    <HoverEffectContext.Provider value={{ isEnabled, toggleHoverEffect }}>
      {children}
    </HoverEffectContext.Provider>
  );
};

export const useHoverEffect = () => {
  const context = useContext(HoverEffectContext);
  if (context === undefined) {
    throw new Error('useHoverEffect must be used within a HoverEffectProvider');
  }
  return context;
};
