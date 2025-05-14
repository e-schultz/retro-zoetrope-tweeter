
import { PostData } from "@/types/post";

// Helper to generate a unique ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Helper to get current date in retro format
export const getCurrentTimestamp = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const year = String(now.getFullYear()).substring(2);
  return `${month}.${day}.${year}`;
};

// Extract tags from content (e.g., #tag)
export const extractTagsFromContent = (content: string): string[] => {
  const tagRegex = /#(\w+)/g;
  const matches = content.match(tagRegex);
  if (!matches) return [];
  return matches.map(tag => tag.substring(1)); // Remove the # symbol
};
