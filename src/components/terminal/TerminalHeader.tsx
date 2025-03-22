
import React from 'react';
import { X, Minus, Maximize, Terminal } from 'lucide-react';

const TerminalHeader: React.FC = () => {
  return (
    <div className="bg-black border-b border-terminal-grid flex items-center justify-between p-2 select-none">
      <div className="flex items-center gap-2">
        <Terminal size={16} className="text-neon-purple" />
        <span className="text-neon-purple font-display text-xs tracking-wide">
          ZETTR_OS v1.0.2
        </span>
      </div>
      
      <div className="font-display text-[10px] tracking-wider text-terminal-green flex-1 text-center uppercase animate-pulse">
        <span className="neon-text" style={{"--neon-color": "#05d9e8"} as React.CSSProperties}>
          &gt; Connected to Techno_Neural_Net &lt;
        </span>
      </div>
      
      <div className="flex gap-1">
        <button className="w-3 h-3 rounded-full bg-terminal-yellow hover:opacity-80 transition"></button>
        <button className="w-3 h-3 rounded-full bg-terminal-green hover:opacity-80 transition"></button>
        <button className="w-3 h-3 rounded-full bg-terminal-red hover:opacity-80 transition"></button>
      </div>
    </div>
  );
};

export default TerminalHeader;
