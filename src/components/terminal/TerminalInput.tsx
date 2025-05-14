
import React, { useState } from 'react';
import { ArrowRight, Hash, AtSign, BookMarked, Quote, MessageSquarePlus, Link2, ArrowUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { PostData } from '@/types/post'; // Fix import path
import BridgeImporter from '../bridges/BridgeImporter';

type InputMode = 'thought' | 'thread' | 'quote' | 'link';

const TerminalInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<InputMode>('thought');
  const [linkTarget, setLinkTarget] = useState('');
  const [quoteTarget, setQuoteTarget] = useState('');
  const isMobile = useIsMobile();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Create new post data
    const postData: Partial<PostData> = {
      content: input,
      author: {
        name: 'User',
        handle: 'user_handle',
      },
    };
    
    // Add mode-specific properties
    if (mode === 'thread') {
      postData.isThread = true;
    } else if (mode === 'quote' && quoteTarget) {
      postData.isQuote = true;
      
      // Find the quoted post in localStorage
      try {
        const storedPosts = localStorage.getItem('zettr_posts');
        if (storedPosts) {
          const posts = JSON.parse(storedPosts);
          const targetPost = posts.find((post: PostData) => post.id === quoteTarget);
          
          if (targetPost) {
            postData.quotedPost = {
              id: targetPost.id,
              author: targetPost.author,
              content: targetPost.content.length > 100 ? 
                targetPost.content.substring(0, 100) + '...' : 
                targetPost.content,
              timestamp: targetPost.timestamp,
            };
          }
        }
      } catch (error) {
        console.error('Error finding quoted post:', error);
      }
    } else if (mode === 'link' && linkTarget) {
      postData.linkedPosts = [{ id: linkTarget, title: 'Linked Thought' }];
    }
    
    // Dispatch event to add new post
    const newPostEvent = new CustomEvent('new-zettr-post', { detail: postData });
    window.dispatchEvent(newPostEvent);
    
    // Clear input after submission
    setInput('');
    setMode('thought');
    setLinkTarget('');
    setQuoteTarget('');
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'thought': return 'NEW_THOUGHT.zet';
      case 'thread': return 'NEW_THREAD.zet';
      case 'quote': return 'QUOTE_THOUGHT.zet';
      case 'link': return 'LINK_THOUGHT.zet';
      default: return 'NEW_THOUGHT.zet';
    }
  };
  
  return (
    <div className="mt-8 mb-6">
      <div className="bg-black/50 backdrop-blur-sm border border-terminal-grid rounded-md">
        <div className="flex px-3 py-2 text-xs text-terminal-cyan border-b border-terminal-grid">
          <div className="flex items-center gap-1">
            <ArrowRight size={12} />
            <span>{getModeTitle()}</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-3">
          <div className="flex items-start gap-2">
            <div className="py-2 text-neon-purple font-bold">$&gt;</div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none resize-none min-h-[100px] text-terminal-green font-mono placeholder-terminal-green/40"
              placeholder={mode === 'quote' 
                ? "Add your thoughts to this quote..." 
                : mode === 'link' 
                  ? "Connect this thought to another..." 
                  : "What's on your mind? Connect thoughts with #tags or @references..."}
            />
          </div>
          
          {mode === 'quote' && (
            <div className="ml-8 mt-2 p-2 border-l-2 border-neon-purple/50 text-terminal-cyan/70 text-sm italic">
              <span>Quoting thought: {quoteTarget || 'Select a thought to quote'}</span>
            </div>
          )}
          
          {mode === 'link' && (
            <div className="ml-8 mt-2 p-2 border-l-2 border-neon-blue/50 text-terminal-cyan/70 text-sm">
              <span>Linking to: {linkTarget || 'Select a thought to link'}</span>
            </div>
          )}
          
          <div className="flex flex-wrap justify-between items-center mt-2 pt-3 border-t border-terminal-grid/30">
            <div className="flex gap-2 flex-wrap mb-2 md:mb-0">
              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    type="button"
                    className="text-terminal-cyan text-xs flex items-center gap-1 hover:text-neon-blue transition-colors"
                  >
                    <Hash size={14} />
                    <span>Add Tag</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border border-terminal-grid text-terminal-green max-w-[90vw] md:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-neon-purple">Select or Create Tag</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Input 
                      placeholder="New tag name..." 
                      className="bg-transparent border-terminal-grid text-terminal-green"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      {['techno', 'zettelkasten', 'AI', 'patterns', 'music', 'interface', 'design', 'neural'].map(tag => (
                        <Button 
                          key={tag}
                          variant="outline"
                          size="sm" 
                          className="justify-start border-terminal-grid/50 hover:bg-terminal-grid/20 hover:text-neon-purple"
                          onClick={() => {
                            setInput(prev => `${prev} #${tag} `);
                          }}
                        >
                          <Hash size={14} className="mr-1" /> {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    type="button"
                    className="text-terminal-cyan text-xs flex items-center gap-1 hover:text-neon-blue transition-colors"
                  >
                    <AtSign size={14} />
                    <span>Link Zettel</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border border-terminal-grid text-terminal-green max-w-[90vw] md:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-neon-purple">Link to Zettel</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <Input 
                      placeholder="Search zettels..." 
                      className="bg-transparent border-terminal-grid text-terminal-green mb-4"
                    />
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {['neural_nexus', 'thoughtweb', 'neon_grid', 'line_geometry'].map(handle => (
                        <Button 
                          key={handle}
                          variant="outline" 
                          className="w-full justify-start border-terminal-grid/50 hover:bg-terminal-grid/20 hover:text-neon-purple"
                          onClick={() => {
                            setInput(prev => `${prev} @${handle} `);
                          }}
                        >
                          <AtSign size={14} className="mr-1" /> {handle}
                        </Button>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Dialog>
                <DialogTrigger asChild>
                  <button 
                    type="button"
                    className="text-terminal-cyan text-xs flex items-center gap-1 hover:text-neon-blue transition-colors"
                  >
                    <BookMarked size={14} />
                    <span>Add Ref</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border border-terminal-grid text-terminal-green max-w-[90vw] md:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-neon-purple">Add Reference</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Input 
                      placeholder="Reference name" 
                      className="bg-transparent border-terminal-grid text-terminal-green"
                    />
                    <Input 
                      placeholder="Reference URL or citation" 
                      className="bg-transparent border-terminal-grid text-terminal-green"
                    />
                    <Button 
                      className="w-full bg-terminal-green/20 text-terminal-green border border-terminal-green/50 hover:bg-terminal-green/30"
                      onClick={() => {
                        // In a real app, would add reference metadata
                        setInput(prev => `${prev} [citation] `);
                      }}
                    >
                      Add Reference
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <button 
                type="button"
                className={`text-xs flex items-center gap-1 transition-colors ${mode === 'thread' ? 'text-neon-green' : 'text-terminal-cyan hover:text-neon-green'}`}
                onClick={() => setMode(mode === 'thread' ? 'thought' : 'thread')}
              >
                <MessageSquarePlus size={14} />
                <span>{isMobile ? 'Thread' : mode === 'thread' ? 'Cancel Thread' : 'New Thread'}</span>
              </button>
              
              <button 
                type="button"
                className={`text-xs flex items-center gap-1 transition-colors ${mode === 'quote' ? 'text-neon-purple' : 'text-terminal-cyan hover:text-neon-purple'}`}
                onClick={() => {
                  if (mode === 'quote') {
                    setMode('thought');
                    setQuoteTarget('');
                  } else {
                    setMode('quote');
                    // Get a random post ID for demo purposes
                    try {
                      const storedPosts = localStorage.getItem('zettr_posts');
                      if (storedPosts) {
                        const posts = JSON.parse(storedPosts);
                        if (posts.length) {
                          const randomIndex = Math.floor(Math.random() * posts.length);
                          setQuoteTarget(posts[randomIndex].id);
                        }
                      }
                    } catch (error) {
                      console.error('Error finding random post to quote:', error);
                      setQuoteTarget('1a2b3c4d5e6f7g8h'); // Fallback
                    }
                  }
                }}
              >
                <Quote size={14} />
                <span>{isMobile ? 'Quote' : mode === 'quote' ? 'Cancel Quote' : 'Quote Thought'}</span>
              </button>
              
              <button 
                type="button"
                className={`text-xs flex items-center gap-1 transition-colors ${mode === 'link' ? 'text-neon-blue' : 'text-terminal-cyan hover:text-neon-blue'}`}
                onClick={() => {
                  if (mode === 'link') {
                    setMode('thought');
                    setLinkTarget('');
                  } else {
                    setMode('link');
                    // Get a random post ID for demo purposes
                    try {
                      const storedPosts = localStorage.getItem('zettr_posts');
                      if (storedPosts) {
                        const posts = JSON.parse(storedPosts);
                        if (posts.length) {
                          const randomIndex = Math.floor(Math.random() * posts.length);
                          setLinkTarget(posts[randomIndex].id);
                        }
                      }
                    } catch (error) {
                      console.error('Error finding random post to link:', error);
                      setLinkTarget('8h7g6f5e4d3c2b1a'); // Fallback
                    }
                  }
                }}
              >
                <Link2 size={14} />
                <span>{isMobile ? 'Link' : mode === 'link' ? 'Cancel Link' : 'Cross-Link'}</span>
              </button>
              
              {/* New Bridge Importer button */}
              <BridgeImporter />
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
