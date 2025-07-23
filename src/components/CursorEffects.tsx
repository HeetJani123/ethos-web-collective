import { useCursor } from '@/hooks/useCursor';

const CursorEffects = () => {
  const cursorRef = useCursor();

  return (
    <div 
      id="custom-cursor" 
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
    />
  );
};

export default CursorEffects;