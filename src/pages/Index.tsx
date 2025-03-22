
import React, { useState, useEffect } from 'react';
import { Terminal, Hash, Search, UserCircle, BarChart4, Settings, Menu } from 'lucide-react';
import Layout from '../components/layout/Layout';
import TerminalInput from '../components/terminal/TerminalInput';
import PostList from '../components/posts/PostList';
import ConnectionMap from '../components/connections/ConnectionMap';
import { useIsMobile } from '../hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Simulate boot sequence
    const messages = [
      'ZETTR_OS v1.0.2 - Personal Knowledge Network',
      'Loading kernel modules...',
      'Initializing neural graph engine...',
      'Mounting thought index...',
      'Establishing connection to techno_neuralink...',
      'Rendering vector interface...',
      'Scanning local memory banks...',
      'System ready. Welcome, User.',
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < messages.length) {
        setBootMessages(prev => [...prev, messages[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-terminal-black flex flex-col items-center justify-center text-terminal-green font-mono">
        <div className="w-full max-w-2xl px-4">
          <div className="mb-8 flex items-center justify-center">
            <div className="text-4xl md:text-5xl font-display tracking-wide neon-text mb-2 relative" style={{ "--neon-color": "#b14aed" } as React.CSSProperties}>
              <span className="relative z-10 glitch" data-text="ZETTR_NET">ZETTR_NET</span>
            </div>
          </div>
          
          <div className="border border-terminal-green p-4 bg-black/40 backdrop-blur-sm">
            {bootMessages.map((message, index) => (
              <div key={index} className="flex items-start animate-appear" style={{ animationDelay: `${index * 0.3}s` }}>
                <span className="mr-2 opacity-70">[{index.toString().padStart(2, '0')}]</span>
                <span>{message}</span>
              </div>
            ))}
            
            {bootMessages.length === 8 && (
              <div className="mt-4 animate-appear" style={{ animationDelay: "2.5s" }}>
                <span className="animate-terminal-blink">█</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const renderSidebar = () => (
    <div className="lg:col-span-1 space-y-4">
      <div className="bg-black/40 backdrop-blur-sm border border-terminal-grid rounded-md overflow-hidden">
        <div className="text-sm border-b border-terminal-grid px-4 py-2 flex items-center gap-2">
          <Terminal size={14} className="text-neon-purple" />
          <span className="text-terminal-white">NAVIGATION</span>
        </div>
        
        <div className="p-2">
          <div className="flex items-center gap-3 text-terminal-green px-3 py-2 bg-neon-purple/10 rounded-md border border-neon-purple/30">
            <Hash size={16} />
            <span>Thought Stream</span>
          </div>
          
          <div className="flex items-center gap-3 text-terminal-cyan px-3 py-2 hover:bg-terminal-grid/10 rounded-md mt-1 cursor-pointer">
            <Search size={16} />
            <span>Search Zettelkasten</span>
          </div>
          
          <div className="flex items-center gap-3 text-terminal-cyan px-3 py-2 hover:bg-terminal-grid/10 rounded-md mt-1 cursor-pointer">
            <UserCircle size={16} />
            <span>Profile</span>
          </div>
          
          <div className="flex items-center gap-3 text-terminal-cyan px-3 py-2 hover:bg-terminal-grid/10 rounded-md mt-1 cursor-pointer">
            <BarChart4 size={16} />
            <span>Knowledge Graph</span>
          </div>
          
          <div className="flex items-center gap-3 text-terminal-cyan px-3 py-2 hover:bg-terminal-grid/10 rounded-md mt-1 cursor-pointer">
            <Settings size={16} />
            <span>Settings</span>
          </div>
        </div>
      </div>
      
      <ConnectionMap />
      
      <div className="bg-black/40 backdrop-blur-sm border border-terminal-grid rounded-md p-4">
        <div className="text-sm text-terminal-white mb-2">SYSTEM STATUS</div>
        <div className="text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-terminal-cyan">Thoughts indexed:</span>
            <span className="text-terminal-green">1,248</span>
          </div>
          <div className="flex justify-between">
            <span className="text-terminal-cyan">Connections:</span>
            <span className="text-terminal-green">3,562</span>
          </div>
          <div className="flex justify-between">
            <span className="text-terminal-cyan">Tags:</span>
            <span className="text-terminal-green">127</span>
          </div>
          <div className="flex justify-between">
            <span className="text-terminal-cyan">Last backup:</span>
            <span className="text-terminal-green">01.24.85 - 14:42</span>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mobile Sidebar Toggle */}
        {isMobile && (
          <div className="fixed bottom-4 right-4 z-50">
            <Sheet>
              <SheetTrigger asChild>
                <button className="bg-neon-purple text-white p-3 rounded-full shadow-lg flex items-center justify-center">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-terminal-black border-terminal-grid w-[85vw] max-w-[300px] p-0">
                <div className="p-4 h-full overflow-y-auto">
                  {renderSidebar()}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
        
        {/* Sidebar - Hidden on mobile */}
        {!isMobile && renderSidebar()}
        
        {/* Main content */}
        <div className="lg:col-span-2">
          <div className="text-xl md:text-2xl font-display tracking-wide text-neon-purple mb-6 neon-text" style={{ "--neon-color": "#b14aed" } as React.CSSProperties}>
            NEURAL.STREAM <span className="animate-terminal-blink">█</span>
          </div>
          
          <TerminalInput />
          
          <PostList />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
