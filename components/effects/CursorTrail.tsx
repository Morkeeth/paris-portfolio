'use client';

import { useEffect } from 'react';

export default function CursorTrail() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      
      document.body.appendChild(trail);
      
      setTimeout(() => {
        trail.remove();
      }, 500);
    };
    
    // Throttle to improve performance
    let lastTime = 0;
    const throttledMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime >= 50) {
        handleMouseMove(e);
        lastTime = now;
      }
    };
    
    document.addEventListener('mousemove', throttledMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', throttledMouseMove);
    };
  }, []);
  
  return null;
}

