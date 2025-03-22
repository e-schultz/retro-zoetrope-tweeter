
import React, { useState } from 'react';
import { MessageSquare, Repeat2, Share, Star, AtSign, Clock, ArrowRight } from 'lucide-react';
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
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="border border-terminal-grid rounded-md mb-4 bg-black/30 backdrop-blur-sm animate-appear" style={{ animationDelay: `${Math.random() * 0.3}s` }}>
      <div className="border-b border-terminal-grid px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {author.avatar ? (
            <div className="w-8 h-8 rounded-md overflow-hidden border border-terminal-grid">
              <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-md bg-terminal-grid flex items-center justify-center text-neon-purple">
              <AtSign size={16} />
            </div>
          )}
          
          <div>
            <div className="text-sm font-semibold text-terminal-white">{author.name}</div>
            <div className="text-xs text-terminal-cyan">@{author.handle}</div>
          </div>
        </div>
        
        <div className="flex items-center text-xs text-terminal-cyan">
          <Clock size={12} className="mr-1" />
          <span>{timestamp}</span>
          <span className="ml-2 mr-1 text-terminal-green">ID:</span>
          <span className="text-terminal-white">{id.slice(0, 8)}</span>
        </div>
      </div>
      
      <div className="px-4 py-3">
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
        
        <button className="flex items-center gap-1 text-terminal-green hover:text-terminal-yellow transition-colors">
          <ArrowRight size={14} />
          <span>TRACE</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
