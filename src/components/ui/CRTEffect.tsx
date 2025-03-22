
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const CRTEffect: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Reduce effect intensity on mobile
  const opacityValues = {
    scanlines: isMobile ? 'opacity-[0.05]' : 'opacity-[0.1]',
    scanLine: isMobile ? 'bg-terminal-white/5' : 'bg-terminal-white/10',
    vignette: isMobile ? 'opacity-40' : 'opacity-60'
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Removed the CRT flicker effect */}
      
      {/* Scanlines effect - reduced opacity */}
      <div className={`absolute inset-0 scanlines z-30 ${opacityValues.scanlines}`}></div>
      
      {/* Moving scan line - less visible */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute left-0 right-0 h-[1px] ${opacityValues.scanLine} animate-scan-line z-30`}></div>
      </div>
      
      {/* Vignette effect (darkened corners) - reduced opacity */}
      <div className={`absolute inset-0 bg-radial-gradient-vignette ${opacityValues.vignette} z-20`}></div>
      
      {/* Screen curvature */}
      <div className="absolute inset-0 rounded-[40px] opacity-20 z-20 pointer-events-none"></div>
    </div>
  );
};

export default CRTEffect;
