import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, FileText, Globe, TrendingUp } from 'lucide-react';
import { useParallax } from '@/hooks/useParallax';
import { useMagneticButton } from '@/hooks/useMagneticButton';

const stats = [
  { label: 'Research Fellows', value: '150+', icon: Users },
  { label: 'Countries Represented', value: '25+', icon: Globe },
  { label: 'Publications', value: '500+', icon: FileText },
  { label: 'Research Teams', value: '12', icon: TrendingUp },
];

const features = [
  {
    title: 'Explore Our Latest Research',
    description: 'Discover cutting-edge research, policy analyses, and scholarly contributions addressing global challenges.',
    link: '/journal',
    icon: FileText,
  },
  {
    title: 'Meet Our Research Teams',
    description: 'Learn about our interdisciplinary teams and their innovative approaches to complex problems.',
    link: '/teams',
    icon: Users,
  },
];

const heroImageUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=80';

const HeroButton = ({ children, variant = "default", ...props }: any) => {
  const magneticRef = useMagneticButton(0.2);
  
  return (
    <Button 
      ref={magneticRef}
      className="magnetic-btn"
      variant={variant}
      size="lg"
      {...props}
    >
      {children}
    </Button>
  );
};

const Index = () => {
  const parallaxRef = useParallax(-0.3);
  const slowParallaxRef = useParallax(-0.1);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-bg parallax-container overflow-hidden">
        {/* Parallax Background Image */}
        <div 
          ref={parallaxRef}
          className="absolute inset-0 parallax-element"
          style={{
            backgroundImage: `url(${heroImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'brightness(0.7) blur(0.5px)',
          }}
        />
        
        {/* Animated overlay */}
        <div 
          ref={slowParallaxRef}
          className="absolute inset-0 parallax-element bg-gradient-to-br from-primary/20 via-transparent to-purple-600/20"
        />
        
        {/* Content */}
        <div className="relative z-10 container text-center text-white">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Advancing Knowledge Through
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Collaborative Research
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90">
              We are a leading research institution dedicated to addressing the world's most 
              pressing challenges through innovative interdisciplinary collaboration and 
              evidence-based solutions.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <HeroButton asChild>
                <Link to="/teams">
                  Explore Our Research
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </HeroButton>
              <HeroButton variant="outline" asChild>
                <Link to="/journal">
                  View Publications
                </Link>
              </HeroButton>
            </div>
          </div>
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${6 + i}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label} 
                  className="text-center space-y-4 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get Started</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our research initiatives and discover how we're making a difference
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={feature.title}
                  className="modern-card group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      <Link 
                        to={feature.link}
                        className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group"
                      >
                        Learn more 
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t">
        <div className="container py-12">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Institute for Global Research</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advancing knowledge through collaborative research and evidence-based solutions for a better world.
            </p>
            <div className="text-sm text-muted-foreground">
              © 2024 Institute for Global Research. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
