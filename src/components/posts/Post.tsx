
import React, { useState } from 'react';
import { MessageSquare, Repeat2, Share, Star, AtSign, Clock, ArrowRight, Link2, Quote } from 'lucide-react';
import TagChip from './TagChip';

interface PostProps {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  tags: string[];
  replyCount: number;
  repostCount: number;
  likeCount: number;
  connectionCount: number;
  isThread?: boolean;
  isQuote?: boolean;
  quotedPost?: {
    id: string;
    author: {
      name: string;
      handle: string;
    };
    content: string;
    timestamp: string;
  };
  linkedPosts?: {
    id: string;
    title: string;
  }[];
  onBridgeSelect?: () => void;
}

const Post: React.FC<PostProps> = ({
  id,
  author,
  content,
  timestamp,
  tags,
  replyCount,
  repostCount,
  likeCount,
  connectionCount,
  isThread = false,
  isQuote = false,
  quotedPost,
  linkedPosts = [],
  onBridgeSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isBridge = author.handle === 'float_bridge';
  
  return (
    <div 
      className={`border rounded-md mb-4 backdrop-blur-sm animate-appear ${isBridge ? 'border-neon-purple/50 bg-black/40' : 'border-terminal-grid bg-black/30'}`}
      style={{ animationDelay: `${Math.random() * 0.3}s` }}
    >
      <div className={`border-b px-4 py-2 flex justify-between items-center ${isBridge ? 'border-neon-purple/30' : 'border-terminal-grid'}`}>
        <div className="flex items-center gap-2">
          {author.avatar ? (
            <div className="w-8 h-8 rounded-md overflow-hidden border border-terminal-grid">
              <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className={`w-8 h-8 rounded-md flex items-center justify-center ${isBridge ? 'bg-neon-purple/20 text-neon-purple' : 'bg-terminal-grid text-neon-purple'}`}>
              <AtSign size={16} />
            </div>
          )}
          
          <div>
            <div className="text-sm font-semibold text-terminal-white">{author.name}</div>
            <div className={`text-xs ${isBridge ? 'text-neon-purple' : 'text-terminal-cyan'}`}>@{author.handle}</div>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-terminal-cyan">
          {isThread && (
            <span className="mr-2 px-1.5 py-0.5 rounded bg-neon-green/10 text-neon-green border border-neon-green/20 flex items-center">
              <MessageSquare size={10} className="mr-1" />
              Thread
            </span>
          )}
          {isBridge && (
            <span className="mr-2 px-1.5 py-0.5 rounded bg-neon-purple/10 text-neon-purple border border-neon-purple/20 flex items-center">
              <Link2 size={10} className="mr-1" />
              Bridge
            </span>
          )}
          <Clock size={12} className="mr-1" />
          <span>{timestamp}</span>
          <span className="ml-2 mr-1 text-terminal-green">ID:</span>
          <span className="text-terminal-white">{id.slice(0, 8)}</span>
        </div>
      </div>
      
      <div className="px-4 py-3">
        {isQuote && quotedPost && (
          <div className="mb-3 p-3 border border-dashed border-neon-purple/40 rounded bg-black/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1 text-xs">
                <Quote size={12} className="text-neon-purple" />
                <span className="text-neon-purple">Quote:</span>
                <span className="text-terminal-white">@{quotedPost.author.handle}</span>
                <span className="text-terminal-cyan/70 ml-1">{quotedPost.timestamp}</span>
              </div>
              <span className="text-xs text-terminal-cyan">{quotedPost.id.slice(0, 6)}</span>
            </div>
            <div className="text-sm text-terminal-cyan/90 line-clamp-2">
              {quotedPost.content}
            </div>
          </div>
        )}
        
        <div className={`whitespace-pre-wrap ${!isExpanded && content.length > 280 ? 'line-clamp-3' : ''}`}>
          {content}
        </div>
        
        {content.length > 280 && (
          <button 
            className="text-neon-purple text-xs mt-1 hover:underline focus:outline-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand thread'}
          </button>
        )}
        
        {linkedPosts.length > 0 && (
          <div className="mt-3 border-t border-terminal-grid/30 pt-2">
            <div className="flex items-center gap-1 text-xs text-neon-blue mb-1">
              <Link2 size={12} />
              <span>Linked thoughts:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {linkedPosts.map(post => (
                <button 
                  key={post.id}
                  className="text-xs px-2 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-sm text-terminal-cyan hover:bg-neon-blue/20 transition-colors"
                >
                  {post.title || post.id.slice(0, 6)}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap">
            {tags.map((tag, index) => (
              <TagChip 
                key={tag} 
                tag={tag} 
                color={['purple', 'blue', 'green', 'pink'][index % 4] as any} 
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="border-t border-terminal-grid px-4 py-2 flex justify-between text-xs">
        <button className="flex items-center gap-1 text-terminal-cyan hover:text-neon-blue transition-colors">
          <MessageSquare size={14} />
          <span>{replyCount}</span>
        </button>
        
        <button className="flex items-center gap-1 text-terminal-cyan hover:text-neon-green transition-colors">
          <Repeat2 size={14} />
          <span>{repostCount}</span>
        </button>
        
        <button className="flex items-center gap-1 text-terminal-cyan hover:text-neon-purple transition-colors">
          <Star size={14} />
          <span>{likeCount}</span>
        </button>
        
        <button className="flex items-center gap-1 text-terminal-cyan hover:text-neon-pink transition-colors">
          <Share size={14} />
          <span>{connectionCount}</span>
        </button>
        
        <button 
          className={`flex items-center gap-1 transition-colors ${isBridge ? 'text-neon-purple hover:text-terminal-white' : 'text-terminal-green hover:text-terminal-yellow'}`}
          onClick={isBridge && onBridgeSelect ? onBridgeSelect : undefined}
        >
          <ArrowRight size={14} />
          <span>{isBridge ? 'VIEW BRIDGE' : 'TRACE'}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
