
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ContinuityBridge } from '@/types/ContinuityBridge';
import { Badge } from '@/components/ui/badge';

interface BridgeDetailsProps {
  bridge: ContinuityBridge | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const BridgeDetails: React.FC<BridgeDetailsProps> = ({ bridge, isOpen, onOpenChange }) => {
  if (!bridge) return null;
  
  const { metadata, section_data } = bridge;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black/90 border border-terminal-grid text-terminal-green max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-neon-purple">
            Continuity Bridge: {metadata.bridge_id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Metadata Section */}
          <div>
            <h3 className="text-neon-blue text-lg mb-2">Bridge Metadata</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex gap-2">
                <span className="text-terminal-cyan">ID:</span>
                <span>{metadata.bridge_id}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-terminal-cyan">Timestamp:</span>
                <span>{new Date(metadata.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-terminal-cyan">Conversation:</span>
                <span>{metadata.conversation_id}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-terminal-cyan">Mode:</span>
                <span>{metadata.mode || 'N/A'}</span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="text-terminal-cyan text-sm mb-1">Context Markers:</div>
              <div className="flex flex-wrap gap-1">
                {metadata.ctx_markers.split(',').map((marker, i) => (
                  <Badge key={i} variant="outline" className="bg-neon-purple/10 border-neon-purple/30 text-terminal-white">
                    {marker.trim()}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="mt-3">
              <div className="text-terminal-cyan text-sm mb-1">Active Threads:</div>
              <div className="flex flex-wrap gap-1">
                {metadata.active_threads.split(',').map((thread, i) => (
                  <Badge key={i} variant="outline" className="bg-neon-blue/10 border-neon-blue/30 text-terminal-white">
                    {thread.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Session Context */}
          <div>
            <h3 className="text-neon-green text-lg mb-2">Session Context</h3>
            <div className="text-sm">
              <div className="flex gap-2">
                <span className="text-terminal-cyan">Date:</span>
                <span>{section_data.session_context.date}</span>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-terminal-cyan text-sm mb-1">Timeline:</div>
              <ul className="space-y-1 text-sm border-l border-terminal-grid/30 pl-4">
                {section_data.session_context.timestamp_markers.map((marker, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-4 top-2 w-2 h-2 rounded-full bg-neon-green"></span>
                    <span>{marker}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Active Threads */}
          <div>
            <h3 className="text-neon-pink text-lg mb-2">Active Threads</h3>
            <div className="space-y-4">
              {section_data.active_threads.map((thread, i) => (
                <div key={i} className="border border-terminal-grid/30 rounded-md p-3 bg-black/30">
                  <div className="font-medium text-neon-blue mb-2">{thread.name}</div>
                  <ul className="space-y-1 text-sm">
                    {thread.activities.map((activity, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-neon-pink">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Notable Context Elements */}
          <div>
            <h3 className="text-neon-green text-lg mb-2">Notable Context Elements</h3>
            
            <div className="space-y-3">
              <div>
                <div className="text-terminal-cyan text-sm mb-1">System Mode:</div>
                <div className="text-sm bg-black/30 p-2 rounded border border-terminal-grid/20">
                  {section_data.notable_context_elements.system_mode}
                </div>
              </div>
              
              <div>
                <div className="text-terminal-cyan text-sm mb-1">Key Metaphors:</div>
                <div className="flex flex-wrap gap-1">
                  {section_data.notable_context_elements.key_metaphors.map((metaphor, i) => (
                    <Badge key={i} variant="outline" className="bg-neon-green/10 border-neon-green/30 text-terminal-white">
                      {metaphor}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-terminal-cyan text-sm mb-1">Signal Phrases:</div>
                <ul className="space-y-1 text-sm">
                  {section_data.notable_context_elements.signal_phrases.map((phrase, i) => (
                    <li key={i} className="italic text-terminal-cyan">"{phrase}"</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="text-terminal-cyan text-sm mb-1">Open Traces:</div>
                <ul className="space-y-1 text-sm">
                  {section_data.notable_context_elements.open_traces.map((trace, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-neon-blue">→</span>
                      <span>{trace}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Summary if available */}
          {bridge.content_summary && (
            <div>
              <h3 className="text-neon-purple text-lg mb-2">Content Summary</h3>
              <div className="text-sm bg-black/30 p-3 rounded border border-terminal-grid/20">
                {bridge.content_summary}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BridgeDetails;
