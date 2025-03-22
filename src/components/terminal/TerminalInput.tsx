
import React, { useState } from 'react';
import { ArrowRight, Hash, AtSign, BookMarked } from 'lucide-react';

const TerminalInput: React.FC = () => {
  const [input, setInput] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would trigger processing of the input
    console.log('Processing input:', input);
    
    // Clear input after submission
    setInput('');
  };
  
  return (
    <div className="mt-8 mb-6">
      <div className="bg-black/50 backdrop-blur-sm border border-terminal-grid rounded-md">
        <div className="flex px-3 py-2 text-xs text-terminal-cyan border-b border-terminal-grid">
          <div className="flex items-center gap-1">
            <ArrowRight size={12} />
            <span>NEW_THOUGHT.zet</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-3">
          <div className="flex items-start gap-2">
            <div className="py-2 text-neon-purple font-bold">$&gt;</div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none resize-none min-h-[100px] text-terminal-green font-mono placeholder-terminal-green/40"
              placeholder="What's on your mind? Connect thoughts with #tags or @references..."
            />
          </div>
          
          <div className="flex justify-between items-center mt-2 pt-3 border-t border-terminal-grid/30">
            <div className="flex gap-2">
              <button 
                type="button"
                className="text-terminal-cyan text-xs flex items-center gap-1 hover:text-neon-blue transition-colors"
              >
                <Hash size={14} />
                <span>Add Tag</span>
              </button>
              
              <button 
                type="button"
                className="text-terminal-cyan text-xs flex items-center gap-1 hover:text-neon-blue transition-colors"
              >
                <AtSign size={14} />
                <span>Link Zettel</span>
              </button>
              
              <button 
                type="button"
                className="text-terminal-cyan text-xs flex items-center gap-1 hover:text-neon-blue transition-colors"
              >
                <BookMarked size={14} />
                <span>Add Reference</span>
              </button>
            </div>
            
            <button 
              type="submit"
              className="bg-terminal-green/20 text-terminal-green border border-terminal-green/50 px-3 py-1 rounded text-sm hover:bg-terminal-green/30 transition-colors"
            >
              EXECUTE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TerminalInput;
