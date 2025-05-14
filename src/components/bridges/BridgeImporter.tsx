
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { importBridges, integrateBridgesWithPosts } from '@/services/bridgeService';
import { ArrowUp } from 'lucide-react';
import { ContinuityBridgeData } from '@/types/ContinuityBridge';

const BridgeImporter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  
  const handleImport = () => {
    try {
      setError('');
      const data = JSON.parse(jsonInput) as ContinuityBridgeData;
      const success = importBridges(data);
      
      if (success) {
        integrateBridgesWithPosts();
        setIsOpen(false);
        setJsonInput('');
      }
    } catch (error) {
      console.error('Invalid JSON format:', error);
      setError('Invalid JSON format. Please check your input and try again.');
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-1 border-terminal-grid/50 hover:bg-terminal-grid/20 hover:text-neon-purple"
        >
          <ArrowUp size={14} />
          <span>Import Bridge</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/90 border border-terminal-grid text-terminal-green max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-neon-purple">Import Continuity Bridge</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="text-sm text-terminal-cyan">
            <p>Paste your continuity bridge JSON data below to import it into your ZETTR_NET knowledge network.</p>
            <p className="mt-1">This will convert bridges into connected thoughts in your stream.</p>
          </div>
          
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full h-80 p-3 bg-black/50 border border-terminal-grid/50 rounded text-sm font-mono text-terminal-green"
            placeholder='{"continuity_bridges": [...]}'
          />
          
          {error && (
            <div className="text-neon-pink text-sm">{error}</div>
          )}
          
          <div className="flex justify-end">
            <Button 
              onClick={handleImport}
              className="bg-terminal-green/20 text-terminal-green border border-terminal-green/50 hover:bg-terminal-green/30"
            >
              Import Bridges
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BridgeImporter;
