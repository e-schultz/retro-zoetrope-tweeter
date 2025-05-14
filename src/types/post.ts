
// Define post types for better type safety
export type Author = {
  name: string;
  handle: string;
};

export type QuotedPost = {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
};

export type PostData = {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
  tags: string[];
  replyCount: number;
  repostCount: number;
  likeCount: number;
  connectionCount: number;
  isThread?: boolean;
  isQuote?: boolean;
  quotedPost?: QuotedPost;
  linkedPosts?: { id: string; title: string }[];
};
