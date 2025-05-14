
import { PostData } from "@/types/post";

// Initial sample data with enhanced post types
export const initialPosts: PostData[] = [
  {
    id: '1a2b3c4d5e6f7g8h',
    author: {
      name: 'DataExplorer',
      handle: 'neural_nexus',
    },
    content: 'Just connected my thoughts on #techno influences in #retrocomputing interfaces. The geometric precision and neon aesthetics create an almost meditative state - a perfect environment for focused thought and networked ideas.\n\nThis becomes particularly evident when examining the evolution from early vector graphics to modern visualizations of neural networks.',
    timestamp: '01.24.85',
    tags: ['techno', 'retrocomputing', 'interfaces', 'vector'],
    replyCount: 12,
    repostCount: 5,
    likeCount: 42,
    connectionCount: 7,
    isThread: true,
    linkedPosts: [
      { id: '3c4d5e6f7g8h1a2b', title: 'Vector Graphics' }
    ]
  },
  {
    id: '5r6t7y8u9i0o1p2q',
    author: {
      name: 'SynthMind',
      handle: 'pattern_seeker',
    },
    content: 'I find this connection between techno aesthetics and thought organization fascinating. The structured yet fluid nature creates perfect symmetry for cognitive exploration.',
    timestamp: '01.24.85',
    tags: ['cognition', 'aesthetics'],
    replyCount: 3,
    repostCount: 2,
    likeCount: 18,
    connectionCount: 4,
    isQuote: true,
    quotedPost: {
      id: '1a2b3c4d5e6f7g8h',
      author: {
        name: 'DataExplorer',
        handle: 'neural_nexus',
      },
      content: 'Just connected my thoughts on #techno influences in #retrocomputing interfaces. The geometric precision and neon aesthetics create an almost meditative state...',
      timestamp: '01.24.85',
    }
  },
  {
    id: '8h7g6f5e4d3c2b1a',
    author: {
      name: 'Zettelmeister',
      handle: 'thoughtweb',
    },
    content: 'The beauty of a personal #Zettelkasten is how it mirrors mental connections. My graph visualization of recent thoughts shows clusters around #terminal aesthetics and #knowledge management systems.\n\nNotes don\'t have to be in a fixed hierarchy - they connect organically like neurons.',
    timestamp: '01.23.85',
    tags: ['Zettelkasten', 'terminal', 'knowledge', 'graphs'],
    replyCount: 8,
    repostCount: 14,
    likeCount: 37,
    connectionCount: 22,
    linkedPosts: [
      { id: '9q8w7e6r5t4y3u2i', title: 'Knowledge Systems' },
      { id: '2i3u4y5t6r7e8w9q', title: 'Neural Networks' }
    ]
  },
  {
    id: '5e6f7g8h1a2b3c4d',
    author: {
      name: 'RetroSynthwave',
      handle: 'neon_grid',
    },
    content: 'Exploring the parallels between #techno music structure and thought organization. Both build complex networks from simple patterns and loops.\n\nThe repetitive yet evolving patterns of techno create a mental state conducive to deep thinking - similar to how interconnected notes form emergent ideas in a Zettelkasten system.',
    timestamp: '01.22.85',
    tags: ['techno', 'music', 'patterns', 'thinking'],
    replyCount: 5,
    repostCount: 9,
    likeCount: 28,
    connectionCount: 13,
  },
  {
    id: '3c4d5e6f7g8h1a2b',
    author: {
      name: 'VectorScope',
      handle: 'line_geometry',
    },
    content: 'Created a new visualization for my thought connections using #vector graphics inspired by vintage arcade games.\n\nThe minimal aesthetics of early computer graphics offers unmatched clarity - perfect for mapping complex knowledge networks without visual distraction.',
    timestamp: '01.21.85',
    tags: ['vector', 'visualization', 'arcade', 'graphics'],
    replyCount: 17,
    repostCount: 21,
    likeCount: 65,
    connectionCount: 19,
  },
];
