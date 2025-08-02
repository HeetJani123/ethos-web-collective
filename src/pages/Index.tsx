import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, FileText, Globe, TrendingUp } from 'lucide-react';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { useEffect, useState } from 'react';

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

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page-container">
      <Navigation />
      
      {/* Floating Academic Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-1 h-1 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-primary/25 rounded-full animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '6s' }} />
      </div>

      <main className="flex-1">
        {/* Hero Section with Parallax */}
        <section className="hero-bg text-center py-32 relative z-10 overflow-hidden">
          {/* Scholarly Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, hsl(var(--primary)) 1px, transparent 1px),
                radial-gradient(circle at 75% 75%, hsl(var(--primary)) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          />
          
          <div className="container relative">
            <div className="content-overlay max-w-5xl mx-auto">
              {/* Enhanced Academic Title */}
              <div className="relative mb-8">
                <h1 className="scholarly-text text-5xl md:text-7xl font-bold relative z-10 animate-fade-in">
                  <span className="inline-block hover:scale-105 transition-transform duration-300">Advancing</span>{' '}
                  <span className="inline-block hover:scale-105 transition-transform duration-300 delay-75">Knowledge</span>{' '}
                  <span className="inline-block hover:scale-105 transition-transform duration-300 delay-150">Through</span>
                  <br />
                  <span className="text-primary inline-block hover:scale-105 transition-transform duration-300 delay-225">Collaborative</span>{' '}
                  <span className="text-primary inline-block hover:scale-105 transition-transform duration-300 delay-300">Research</span>
                </h1>
                {/* Subtle academic accent line */}
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
              </div>
              
              <p className="text-xl md:text-2xl text-secondary mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
                We are a leading research institution dedicated to addressing the world's most pressing challenges through innovative interdisciplinary collaboration and evidence-based solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button size="lg" className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="relative z-10">Explore Our Work</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
                <Button size="lg" variant="outline" className="group relative overflow-hidden border-primary/30 text-primary hover:text-primary-foreground hover:bg-primary/10 hover:border-primary hover:scale-105 transform transition-all duration-300">
                  <span className="relative z-10">View Publications</span>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label} 
                    className="modern-card text-center p-8"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mx-auto w-16 h-16 academic-gradient rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="scholarly-text text-4xl md:text-5xl font-bold mb-6">
                Get Started
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Explore our research initiatives and discover how we're making an impact
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={index}
                    to={feature.link}
                    className="modern-card group cursor-pointer"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 academic-gradient rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                          {feature.description}
                        </p>
                        <span className="inline-flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                          Learn more
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="glass mt-32 py-16">
        <div className="container text-center">
          <div className="scholarly-text text-3xl font-bold mb-6">
            Institute for Global Research
          </div>
          <div className="text-muted-foreground text-lg mb-4 max-w-md mx-auto">
            Advancing knowledge through collaborative research and evidence-based solutions.
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 Institute for Global Research. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
