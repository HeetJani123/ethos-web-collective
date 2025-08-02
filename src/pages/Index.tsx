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
        <section className="hero-bg text-center py-32 relative z-10">
          <div className="container">
            <div className="content-overlay max-w-5xl mx-auto">
              <h1 className="scholarly-text text-5xl md:text-7xl font-bold mb-8">
                Advancing Knowledge Through Collaborative Research
              </h1>
              <p className="text-xl md:text-2xl text-secondary mb-12 max-w-4xl mx-auto leading-relaxed">
                We are a leading research institution dedicated to addressing the world's most pressing challenges through innovative interdisciplinary collaboration and evidence-based solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="magnetic-btn">
                  Explore Our Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="hover:scale-105 transform transition-all duration-300">
                  View Publications
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
