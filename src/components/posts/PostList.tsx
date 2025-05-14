
import React from 'react';
import Post from './Post';
import { useIsMobile } from '@/hooks/use-mobile';
import { ContinuityBridge } from '@/types/ContinuityBridge';
import BridgeDetails from '../bridges/BridgeDetails';
import { usePostStore } from '@/hooks/usePostStore';

const PostList: React.FC = () => {
  const { 
    posts, 
    selectedBridge, 
    isBridgeDetailsOpen, 
    setIsBridgeDetailsOpen,
    handleBridgeSelect 
  } = usePostStore();
  const isMobile = useIsMobile();

  return (
    <div className={`mt-4 ${isMobile ? 'px-1' : ''}`}>
      <div className="text-sm text-terminal-white border-b border-terminal-grid pb-2 mb-4">
        RECENT THOUGHT CONNECTIONS <span className="text-terminal-green animate-terminal-blink">█</span>
      </div>
      
      <BridgeDetails 
        bridge={selectedBridge} 
        isOpen={isBridgeDetailsOpen}
        onOpenChange={setIsBridgeDetailsOpen}
      />
      
      {posts.length === 0 ? (
        <div className="text-terminal-cyan text-center py-8">
          No thoughts connected yet. Start by sharing your first thought.
        </div>
      ) : (
        posts.map((post) => (
          <Post 
            key={post.id} 
            {...post} 
            onBridgeSelect={post.author.handle === "float_bridge" ? () => {
              // Look up the bridge from localStorage
              try {
                const bridges = localStorage.getItem('zettr_bridges');
                if (bridges) {
                  const parsedBridges = JSON.parse(bridges);
                  const bridge = parsedBridges.find((b: ContinuityBridge) => b.bridge_id === post.id);
                  if (bridge) {
                    handleBridgeSelect(bridge);
                  }
                }
              } catch (error) {
                console.error('Error finding bridge:', error);
              }
            } : undefined}
          />
        ))
      )}
    </div>
  );
};

export default PostList;
