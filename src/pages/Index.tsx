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

const bgImage = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80';

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
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${bgImage}) center/cover no-repeat fixed`,
      }}
    >
      <Navigation />
      {/* Original content structure below (no glassmorphism on containers) */}
      <main className="container" style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', padding: '3rem 0 2rem 0' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>
            Advancing Knowledge Through Collaborative Research
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-muted)', marginBottom: '2.5rem' }}>
            We are a leading research institution dedicated to addressing the world's most pressing challenges through innovative interdisciplinary collaboration and evidence-based solutions.
          </p>
        </section>
        {/* Stats Section */}
        <section style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
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
        </section>
        {/* Features/Links Section */}
        <section style={{ marginTop: '1rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--color-primary)', textAlign: 'center', fontWeight: '600' }}>Discover Our Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
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
        </section>
      </main>
      <footer>
        <div style={{ maxWidth: 960, margin: '16px auto 0 auto', padding: '4px 0' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>
            Institute for Global Research
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)', margin: '0.15rem 0' }}>
            Advancing knowledge through collaborative research and evidence-based solutions.
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>
            © 2024 Institute for Global Research. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
