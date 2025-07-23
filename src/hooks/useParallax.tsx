import { useEffect, useRef } from 'react';

export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxValue = scrolled * speed;
      element.style.transform = `translateY(${parallaxValue}px)`;
    };

    const throttledUpdate = () => {
      requestAnimationFrame(updateParallax);
    };

    window.addEventListener('scroll', throttledUpdate);
    
    return () => {
      window.removeEventListener('scroll', throttledUpdate);
    };
  }, [speed]);

  return elementRef;
};