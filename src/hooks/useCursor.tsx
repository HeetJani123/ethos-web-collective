import { useEffect, useRef } from 'react';

interface CursorTrail {
  x: number;
  y: number;
  opacity: number;
}

export const useCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<CursorTrail[]>([]);

  useEffect(() => {
    let animationId: number;
    
    const cursor = cursorRef.current;
    if (!cursor) return;

    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      // Add trail point
      trailsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 1
      });
      
      // Limit trail length
      if (trailsRef.current.length > 20) {
        trailsRef.current.shift();
      }
    };

    const animateTrails = () => {
      // Update trail opacity
      trailsRef.current.forEach((trail, index) => {
        trail.opacity *= 0.9;
        if (trail.opacity < 0.01) {
          trailsRef.current.splice(index, 1);
        }
      });

      // Render trails
      const existingTrails = document.querySelectorAll('.cursor-trail');
      existingTrails.forEach(trail => trail.remove());

      trailsRef.current.forEach((trail, index) => {
        const trailElement = document.createElement('div');
        trailElement.className = 'cursor-trail';
        trailElement.style.left = `${trail.x}px`;
        trailElement.style.top = `${trail.y}px`;
        trailElement.style.opacity = trail.opacity.toString();
        trailElement.style.transform = `scale(${trail.opacity})`;
        document.body.appendChild(trailElement);
      });

      animationId = requestAnimationFrame(animateTrails);
    };

    const handleMouseEnter = () => {
      cursor.classList.add('hovering');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('hovering');
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .magnetic-btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    animateTrails();

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return cursorRef;
};