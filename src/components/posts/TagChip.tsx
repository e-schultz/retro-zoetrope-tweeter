
import React from 'react';
import { Hash } from 'lucide-react';

interface TagChipProps {
  tag: string;
  color?: 'purple' | 'blue' | 'green' | 'pink';
}

const TagChip: React.FC<TagChipProps> = ({ tag, color = 'purple' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-neon-blue/10 text-neon-blue border-neon-blue/30';
      case 'green':
        return 'bg-neon-green/10 text-neon-green border-neon-green/30';
      case 'pink':
        return 'bg-neon-pink/10 text-neon-pink border-neon-pink/30';
      case 'purple':
      default:
        return 'bg-neon-purple/10 text-neon-purple border-neon-purple/30';
    }
  };
  
  return (
    <span className={`inline-flex items-center gap-1 text-xs border rounded px-2 py-0.5 mr-1 mb-1 ${getColorClasses()}`}>
      <Hash size={10} />
      <span>{tag}</span>
    </span>
  );
};

export default TagChip;
