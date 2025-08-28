import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, FileText, Globe, TrendingUp } from 'lucide-react';
import { useMagneticButton } from '@/hooks/useMagneticButton';

const stats = [
  { label: 'Research Fellows', value: '100+', icon: Users },
  { label: 'Countries Represented', value: '8+', icon: Globe },
  { label: 'Publications', value: '1', icon: FileText },
  { label: 'Research Teams', value: '6', icon: TrendingUp },
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
        <section className="hero-bg text-center py-24 relative z-10">
          <div className="container">
            <div className="content-overlay max-w-4xl mx-auto">
              <h1 className="interactive-text text-4xl md:text-6xl font-bold mb-6">
                Advancing Knowledge Through Student Led Research
              </h1>
              <p className="text-xl md:text-2xl text-secondary mb-10 max-w-3xl mx-auto leading-relaxed">
                We are an aspiring research institution dedicated to addressing the world's most pressing challenges through innovative research led by students and evidence-based solutions.
              </p>
              <Button size="lg" className="magnetic-btn">
                Explore Our Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label} 
                    className="modern-card interactive-card text-center p-6"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mx-auto w-16 h-16 academic-gradient pulse-icon rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-primary floating-stat mb-2">{stat.value}</div>
                    <div className="text-muted font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container">
            <h2 className="interactive-text text-3xl md:text-4xl font-bold mb-12 text-center">
              Get Started
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Link
                    key={index}
                    to={feature.link}
                    className="modern-card interactive-card group cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 academic-gradient pulse-icon rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-accent transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-secondary mb-4 leading-relaxed">
                          {feature.description}
                        </p>
                        <span className="inline-flex items-center text-accent font-medium group-hover:translate-x-2 transition-transform duration-300">
                          Learn more
                          <ArrowRight className="ml-2 h-4 w-4" />
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
      <footer className="glass mt-20 py-12">
        <div className="container text-center">
          <div className="interactive-text text-2xl font-bold mb-4">
            Youth Tech and Ethics Institute
          </div>
          <div className="text-secondary mb-2 max-w-md mx-auto">
            Advancing knowledge through student led research and evidence-based solutions.
          </div>
          <div className="text-sm text-muted">
            © 2025 Youth Tech and Ethics. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
