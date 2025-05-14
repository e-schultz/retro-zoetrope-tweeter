
import { ContinuityBridge, ContinuityBridgeData } from '@/types/ContinuityBridge';
import { PostData, Author } from '@/types/post'; // Fix import path
import { toast } from "sonner";

// Get all bridges from localStorage
export const getBridges = (): ContinuityBridge[] => {
  try {
    const storedBridges = localStorage.getItem('zettr_bridges');
    if (storedBridges) {
      return JSON.parse(storedBridges);
    }
  } catch (error) {
    console.error('Error retrieving bridges from localStorage:', error);
  }
  return [];
};

// Save bridges to localStorage
export const saveBridges = (bridges: ContinuityBridge[]): void => {
  try {
    localStorage.setItem('zettr_bridges', JSON.stringify(bridges));
  } catch (error) {
    console.error('Error saving bridges to localStorage:', error);
  }
};

// Import bridges from JSON data
export const importBridges = (data: ContinuityBridgeData): boolean => {
  try {
    const bridges = data.continuity_bridges;
    if (!bridges || !Array.isArray(bridges)) {
      toast.error("Invalid bridge data format");
      return false;
    }
    
    saveBridges(bridges);
    toast.success(`Imported ${bridges.length} continuity bridges`);
    return true;
  } catch (error) {
    console.error('Error importing bridges:', error);
    toast.error("Failed to import bridges");
    return false;
  }
};

// Convert a bridge to a post for display in the main feed
export const bridgeToPost = (bridge: ContinuityBridge): PostData => {
  const { bridge_id, metadata, section_data } = bridge;
  
  // Extract context markers and create tags
  const tags = metadata.ctx_markers ? metadata.ctx_markers.split(',') : [];
  
  // Extract active threads
  const activeThreadNames = section_data.active_threads.map(thread => thread.name);
  
  // Create content from notable context elements and main active thread
  let content = '';
  
  // Add system mode
  if (section_data.notable_context_elements.system_mode) {
    content += `System Mode: ${section_data.notable_context_elements.system_mode}\n\n`;
  }
  
  // Add main thread activities if available
  if (section_data.active_threads.length > 0) {
    const mainThread = section_data.active_threads[0];
    content += `${mainThread.name}:\n`;
    mainThread.activities.forEach(activity => {
      content += `• ${activity}\n`;
    });
    content += '\n';
  }
  
  // Add key metaphors
  if (section_data.notable_context_elements.key_metaphors.length > 0) {
    content += `Key Metaphors: ${section_data.notable_context_elements.key_metaphors.join(', ')}\n\n`;
  }
  
  // Add bridge summary if available
  if (bridge.content_summary) {
    content += bridge.content_summary;
  }

  // Create linked posts based on active threads
  const linkedPosts = activeThreadNames.map(name => ({
    id: name.replace(/\s+/g, '_').toLowerCase(),
    title: name
  }));
  
  // Create the post
  const date = new Date(metadata.timestamp);
  const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}.${date.getFullYear().toString().substring(2)}`;
  
  const author: Author = {
    name: "FLOAT System",
    handle: "float_bridge"
  };

  return {
    id: bridge_id,
    author,
    content,
    timestamp: formattedDate,
    tags,
    replyCount: 0,
    repostCount: section_data.active_threads.length,
    likeCount: 0,
    connectionCount: linkedPosts.length,
    isThread: true,
    linkedPosts
  };
};

// Generate posts from all bridges
export const bridgesToPosts = (): PostData[] => {
  const bridges = getBridges();
  return bridges.map(bridgeToPost);
};

// Add bridges to the post list
export const integrateBridgesWithPosts = () => {
  try {
    const bridgePosts = bridgesToPosts();
    if (bridgePosts.length === 0) return;
    
    const storedPosts = localStorage.getItem('zettr_posts');
    if (!storedPosts) return;
    
    let posts = JSON.parse(storedPosts);
    
    // Check for duplicates and add only new bridges
    const existingIds = new Set(posts.map((post: PostData) => post.id));
    const newPosts = bridgePosts.filter(post => !existingIds.has(post.id));
    
    if (newPosts.length === 0) return;
    
    posts = [...newPosts, ...posts];
    localStorage.setItem('zettr_posts', JSON.stringify(posts));
    
    toast.success(`Added ${newPosts.length} continuity bridges to your thought stream`);
  } catch (error) {
    console.error('Error integrating bridges with posts:', error);
  }
};
