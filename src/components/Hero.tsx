import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// @ts-ignore
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import type { Mesh } from 'three';

function SpinningCube() {
  const mesh = useRef<Mesh>(null);
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={mesh} position={[0, 0, -2]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#22d3ee" />
    </mesh>
  );
}

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.width / 2) / rect.width,
        y: (e.clientY - rect.height / 2) / rect.height,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Interactive Background with Cursor Stretch Effect */}
      <div 
        className="absolute inset-0 -z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg) scale(1.02)`,
          background: 'radial-gradient(circle at center, hsl(var(--primary)/0.1), hsl(var(--background)))',
        }}
      >
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[2, 2, 5]} intensity={1} />
          <SpinningCube />
        </Canvas>
      </div>
      
      {/* Cursor-responsive overlay */}
      <div 
        className="absolute inset-0 -z-5 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(600px circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, hsl(var(--primary)/0.15), transparent 50%)`,
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="mx-auto max-w-4xl">
              Advancing Knowledge Through
              <span className="text-primary block">Collaborative Research</span>
            </h1>
            <p className="lead mx-auto max-w-3xl">
              We are a leading research institution dedicated to addressing the world's most 
              pressing challenges through innovative interdisciplinary collaboration and 
              evidence-based solutions.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group" asChild>
              <Link to="/teams">
                Explore Our Research
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/journal">
                View Publications
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-secondary/50 to-background"></div>
    </section>
  );
};

export default Hero;