import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
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
            <Button size="lg" className="group">
              Explore Our Research
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg">
              View Publications
            </Button>
          </div>
        </div>
      </div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-secondary/50 to-background"></div>
    </section>
  );
};

export default Hero;