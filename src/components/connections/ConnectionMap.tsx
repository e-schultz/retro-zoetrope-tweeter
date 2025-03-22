import React, { useEffect, useRef } from 'react';

const ConnectionMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Sample nodes representing thoughts
    const nodes = [
      { id: 1, name: 'Techno', x: 0, y: 0, size: 14, color: '#ff33ff' },
      { id: 2, name: 'Terminals', x: 0, y: 0, size: 12, color: '#33ff33' },
      { id: 3, name: 'Vector Graphics', x: 0, y: 0, size: 13, color: '#33ffff' },
      { id: 4, name: 'Zettelkasten', x: 0, y: 0, size: 15, color: '#ff3333' },
      { id: 5, name: 'Knowledge', x: 0, y: 0, size: 11, color: '#ffff33' },
      { id: 6, name: 'Networks', x: 0, y: 0, size: 12, color: '#0099ff' },
      { id: 7, name: 'Music', x: 0, y: 0, size: 10, color: '#ff33ff' },
      { id: 8, name: 'Patterns', x: 0, y: 0, size: 9, color: '#33ff33' },
      { id: 9, name: 'Interfaces', x: 0, y: 0, size: 11, color: '#33ffff' },
      { id: 10, name: 'Minimalism', x: 0, y: 0, size: 10, color: '#ff3333' },
    ];
    
    // Connections between nodes
    const links = [
      { source: 0, target: 1, strength: 0.7 },
      { source: 0, target: 2, strength: 0.5 },
      { source: 0, target: 6, strength: 0.9 },
      { source: 1, target: 2, strength: 0.8 },
      { source: 1, target: 8, strength: 0.6 },
      { source: 2, target: 9, strength: 0.7 },
      { source: 3, target: 4, strength: 0.9 },
      { source: 3, target: 5, strength: 0.8 },
      { source: 4, target: 5, strength: 0.7 },
      { source: 5, target: 8, strength: 0.5 },
      { source: 6, target: 7, strength: 0.6 },
      { source: 7, target: 0, strength: 0.4 },
      { source: 8, target: 9, strength: 0.6 },
      { source: 9, target: 1, strength: 0.5 },
      { source: 4, target: 0, strength: 0.3 },
      { source: 2, target: 7, strength: 0.2 },
    ];
    
    // Initialize node positions randomly
    nodes.forEach(node => {
      node.x = Math.random() * canvas.width;
      node.y = Math.random() * canvas.height;
    });
    
    // Simple force-directed layout simulation
    const simulation = () => {
      // Apply forces and update positions
      for (let i = 0; i < 50; i++) { // Run multiple iterations for better layout
        // Repulsive forces between all nodes
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            const repulsionForce = 5000 / (distance * distance);
            
            const forceX = dx / distance * repulsionForce;
            const forceY = dy / distance * repulsionForce;
            
            nodes[i].x -= forceX;
            nodes[i].y -= forceY;
            nodes[j].x += forceX;
            nodes[j].y += forceY;
          }
        }
        
        // Attractive forces along links
        links.forEach(link => {
          const sourceNode = nodes[link.source];
          const targetNode = nodes[link.target];
          
          const dx = targetNode.x - sourceNode.x;
          const dy = targetNode.y - sourceNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          
          const attractiveForce = distance * 0.02 * link.strength;
          
          const forceX = dx / distance * attractiveForce;
          const forceY = dy / distance * attractiveForce;
          
          sourceNode.x += forceX;
          sourceNode.y += forceY;
          targetNode.x -= forceX;
          targetNode.y -= forceY;
        });
        
        // Center gravity to keep nodes in view
        nodes.forEach(node => {
          const dx = canvas.width / 2 - node.x;
          const dy = canvas.height / 2 - node.y;
          
          node.x += dx * 0.01;
          node.y += dy * 0.01;
        });
      }
    };
    
    // Run the simulation
    simulation();
    
    // Draw the network
    const drawNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw links
      ctx.lineWidth = 1;
      links.forEach(link => {
        const sourceNode = nodes[link.source];
        const targetNode = nodes[link.target];
        
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        
        // Set opacity based on link strength
        ctx.strokeStyle = `rgba(177, 74, 237, ${link.strength * 0.5})`;
        ctx.stroke();
      });
      
      // Draw nodes
      nodes.forEach(node => {
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        
        // Node label
        ctx.font = '10px "VT323", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + node.size + 10);
      });
      
      // Add some visual effects
      const now = Date.now() / 1000;
      
      // Pulse effect on a random node
      const pulseNode = nodes[Math.floor(now / 2) % nodes.length];
      ctx.beginPath();
      const pulseSize = pulseNode.size + 5 + Math.sin(now * 5) * 3;
      ctx.arc(pulseNode.x, pulseNode.y, pulseSize, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${pulseNode.color.substring(1, 3)}, ${pulseNode.color.substring(3, 5)}, ${pulseNode.color.substring(5, 7)}, 0.3)`;
      ctx.stroke();
      
      // Draw data transmission along a random link
      const activeLink = links[Math.floor(now) % links.length];
      const sourceNode = nodes[activeLink.source];
      const targetNode = nodes[activeLink.target];
      
      const dx = targetNode.x - sourceNode.x;
      const dy = targetNode.y - sourceNode.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Position along the link (moves from source to target)
      const t = (now * 2) % 1;
      const dataX = sourceNode.x + dx * t;
      const dataY = sourceNode.y + dy * t;
      
      // Draw data packet
      ctx.beginPath();
      ctx.arc(dataX, dataY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      
      // Request animation frame
      requestAnimationFrame(drawNetwork);
    };
    
    // Start the drawing loop
    drawNetwork();
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Reset node positions on resize
      nodes.forEach(node => {
        node.x = Math.random() * canvas.width;
        node.y = Math.random() * canvas.height;
      });
      
      // Re-run simulation after resize
      simulation();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="w-full h-[300px] border border-terminal-grid rounded-md overflow-hidden bg-black/30 backdrop-blur-sm">
      <div className="text-xs border-b border-terminal-grid px-3 py-1 bg-black/50 flex justify-between items-center">
        <span className="text-terminal-green">THOUGHT.CONNECTIONS</span>
        <span className="text-terminal-cyan">[Interactive]</span>
      </div>
      <canvas ref={canvasRef} className="w-full h-[calc(100%-24px)]" />
    </div>
  );
};

export default ConnectionMap;
