import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhoWeAre from '@/components/WhoWeAre';
import Mission from '@/components/Mission';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <WhoWeAre />
      <Mission />
      
      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="text-lg font-serif font-semibold text-primary">
              Institute for Global Research
            </div>
            <p className="text-sm text-muted-foreground">
              Advancing knowledge through collaborative research and evidence-based solutions.
            </p>
            <div className="text-xs text-muted-foreground">
              © 2024 Institute for Global Research. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
