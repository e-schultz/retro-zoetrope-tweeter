
import { useState, useEffect } from 'react';
import { PostData } from '@/types/post';
import { initialPosts } from '@/data/initialPosts';
import { generateId, getCurrentTimestamp, extractTagsFromContent } from '@/utils/postUtils';
import { useToast } from '@/hooks/use-toast';
import { integrateBridgesWithPosts } from '@/services/bridgeService';
import { ContinuityBridge } from '@/types/ContinuityBridge';

export const usePostStore = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [selectedBridge, setSelectedBridge] = useState<ContinuityBridge | null>(null);
  const [isBridgeDetailsOpen, setIsBridgeDetailsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if posts already exist in localStorage
    const storedPosts = localStorage.getItem('zettr_posts');
    
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts));
      } catch (error) {
        console.error('Error parsing posts from localStorage:', error);
        // If there's an error parsing, initialize with default posts
        setPosts(initialPosts);
        localStorage.setItem('zettr_posts', JSON.stringify(initialPosts));
      }
    } else {
      // Initialize localStorage with default posts
      setPosts(initialPosts);
      localStorage.setItem('zettr_posts', JSON.stringify(initialPosts));
    }
    
    // Integrate any existing bridges
    integrateBridgesWithPosts();

    // Set up event listener for new posts
    window.addEventListener('new-zettr-post', ((event: CustomEvent) => {
      const newPost = event.detail;
      addNewPost(newPost);
    }) as EventListener);

    // Set up event listener for bridge selection
    window.addEventListener('select-zettr-bridge', ((event: CustomEvent) => {
      const bridge = event.detail;
      handleBridgeSelect(bridge);
    }) as EventListener);

    return () => {
      window.removeEventListener('new-zettr-post', ((event: CustomEvent) => {
        const newPost = event.detail;
        addNewPost(newPost);
      }) as EventListener);

      window.removeEventListener('select-zettr-bridge', ((event: CustomEvent) => {
        const bridge = event.detail;
        handleBridgeSelect(bridge);
      }) as EventListener);
    };
  }, []);

  const addNewPost = (postData: Partial<PostData>) => {
    const newPost: PostData = {
      id: generateId(),
      author: {
        name: 'User',
        handle: 'user_handle',
      },
      content: postData.content || '',
      timestamp: getCurrentTimestamp(),
      tags: postData.tags || extractTagsFromContent(postData.content || ''),
      replyCount: 0,
      repostCount: 0,
      likeCount: 0,
      connectionCount: 0,
      ...postData,
    };
    
    setPosts(prevPosts => {
      const updatedPosts = [newPost, ...prevPosts];
      localStorage.setItem('zettr_posts', JSON.stringify(updatedPosts));
      return updatedPosts;
    });

    toast({
      title: "Thought connected",
      description: "Your new thought has been added to the network.",
    });
  };

  const handleBridgeSelect = (bridge: ContinuityBridge) => {
    setSelectedBridge(bridge);
    setIsBridgeDetailsOpen(true);
  };

  return {
    posts,
    selectedBridge,
    isBridgeDetailsOpen,
    setIsBridgeDetailsOpen,
    handleBridgeSelect
  };
};
