
import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const VectorGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Draw 3D vector grid
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = '#080810';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Configuration
      const now = Date.now() / 5000;
      // Larger grid size on mobile means fewer lines
      const gridSize = isMobile ? 60 : 40;
      const perspective = 800;
      // Fewer depth levels on mobile
      const depth = isMobile ? 6 : 10;
      
      // Center point
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw grid lines with reduced opacity
      ctx.lineWidth = 1;
      
      // Floor grid with reduced opacity
      for (let z = 1; z <= depth; z++) {
        const scale = perspective / (perspective + z * gridSize);
        // Reduced opacity overall, especially on mobile
        const baseOpacity = isMobile ? 0.2 : 0.3;
        const lineOpacity = baseOpacity - (z / depth) * 0.2;
        
        ctx.strokeStyle = `rgba(26, 58, 58, ${lineOpacity})`;
        
        // Horizontal lines - draw fewer on mobile
        const lineStep = isMobile ? 2 : 1;
        for (let y = -15; y <= 15; y += lineStep) {
          const y1 = centerY + (y * gridSize - gridSize/2) * scale;
          
          ctx.beginPath();
          for (let x = -15; x <= 15; x++) {
            const x1 = centerX + x * gridSize * scale;
            
            if (x === -15) {
              ctx.moveTo(x1, y1);
            } else {
              ctx.lineTo(x1, y1);
            }
          }
          ctx.stroke();
        }
        
        // Vertical lines - draw fewer on mobile
        for (let x = -15; x <= 15; x += lineStep) {
          const x1 = centerX + x * gridSize * scale;
          
          ctx.beginPath();
          for (let y = -15; y <= 15; y++) {
            const y1 = centerY + (y * gridSize - gridSize/2) * scale;
            
            if (y === -15) {
              ctx.moveTo(x1, y1);
            } else {
              ctx.lineTo(x1, y1);
            }
          }
          ctx.stroke();
        }
      }
      
      // Draw some vector-style geometric elements with reduced opacity
      ctx.strokeStyle = 'rgba(177, 74, 237, 0.2)'; // Reduced from 0.3
      ctx.lineWidth = isMobile ? 1 : 1.5;
      
      // Draw central vector shape - simpler animation
      const time = Date.now() / 3000; // Slower animation
      
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + time;
        // Reduced animation amplitude
        const radius = 80 + Math.sin(time * 1.5 + i) * 10; // Reduced from 20
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius * 0.3;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      
      // Request next frame
      requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isMobile]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-0"
    />
  );
};

export default VectorGrid;
