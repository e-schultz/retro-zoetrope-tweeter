
import React from 'react';

const CRTEffect: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Overlay with subtle CRT screen glow */}
      <div className="absolute inset-0 bg-terminal-black opacity-5 mix-blend-multiply animate-crt-flicker"></div>
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 scanlines z-30 opacity-10"></div>
      
      {/* Moving scan line */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 right-0 h-[2px] bg-terminal-white/10 animate-scan-line z-30"></div>
      </div>
      
      {/* Vignette effect (darkened corners) */}
      <div className="absolute inset-0 bg-radial-gradient-vignette opacity-60 z-20"></div>
      
      {/* Screen curvature */}
      <div className="absolute inset-0 rounded-[40px] opacity-30 z-20 pointer-events-none"></div>
    </div>
  );
};

export default CRTEffect;
