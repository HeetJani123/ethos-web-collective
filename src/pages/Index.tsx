import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, FileText, Globe, TrendingUp } from 'lucide-react';
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

const Index = () => {
  return (
    <div className="page-container">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 text-center overflow-hidden">
          {/* Dynamic background layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.primary/10),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.accent/8),transparent_50%)]"></div>
          
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Enhanced hero content with better contrast */}
              <div className="glass rounded-3xl p-12 md:p-16 backdrop-blur-xl border border-border/50 shadow-2xl">
                <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent leading-tight">
                  Advancing Knowledge Through Collaborative Research
                </h1>
                <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  We are a leading research institution dedicated to addressing the world's most pressing challenges through innovative interdisciplinary collaboration and evidence-based solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl">
                    Explore Our Work
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="hover:scale-105 transform transition-all duration-300 border-primary/20 hover:border-primary/40">
                    View Publications
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 relative">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label} 
                    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-muted/20 border border-border/40 p-8 text-center transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>{stat.value}</div>
                      <div className="font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Get Started
              </h2>
              <p className="text-xl max-w-2xl mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
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
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-muted/10 border border-border/40 p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-primary/30"
                  >
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300" style={{ color: 'hsl(var(--foreground))' }}>
                            {feature.title}
                          </h3>
                          <p className="text-lg mb-6 leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                            {feature.description}
                          </p>
                          <span className="inline-flex items-center font-semibold group-hover:translate-x-2 transition-transform duration-300" style={{ color: 'hsl(var(--primary))' }}>
                            Learn more
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </span>
                        </div>
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
      <footer className="relative mt-32 py-16 border-t border-border/20">
        <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent"></div>
        <div className="container relative z-10 text-center">
          <div className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Institute for Global Research
          </div>
          <div className="text-lg mb-4 max-w-md mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Advancing knowledge through collaborative research and evidence-based solutions.
          </div>
          <div className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            © 2024 Institute for Global Research. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
