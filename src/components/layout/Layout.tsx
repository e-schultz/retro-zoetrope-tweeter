
import React from 'react';
import { Terminal } from 'lucide-react';
import CRTEffect from '../ui/CRTEffect';
import VectorGrid from '../ui/VectorGrid';
import TerminalHeader from '../terminal/TerminalHeader';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-terminal-black text-terminal-green font-mono overflow-hidden">
      {/* Vector grid background */}
      <VectorGrid />
      
      {/* Terminal container */}
      <div className="relative z-10 max-w-5xl mx-auto min-h-screen flex flex-col">
        {/* Terminal header with controls */}
        <TerminalHeader />
        
        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6 relative terminal-window overflow-y-auto">
          <div className="opacity-90 animate-appear">
            {children}
          </div>
        </main>
        
        {/* Status bar */}
        <div className="flex justify-between items-center text-xs border-t border-terminal-grid px-4 py-2 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Terminal size={14} />
            <span>nethexplorer_v2.3.4</span>
          </div>
          <div className="flex items-center gap-4">
            <span>MEM: 648K</span>
            <span>CPU: 24%</span>
            <span className="animate-terminal-blink">█</span>
          </div>
        </div>
      </div>
      
      {/* CRT screen effect overlay */}
      <CRTEffect />
    </div>
  );
};

export default Layout;
