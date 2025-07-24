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

const bgImage = '/bg-illustration.jpg';

const Index = () => {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: `linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url(${bgImage}) center/cover no-repeat fixed`,
      }}
    >
      <Navigation />
      <main className="container px-4 md:px-0" style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <section className="text-center pt-16 pb-8 md:pt-24 md:pb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
            Advancing Knowledge Through Collaborative Research
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We are a leading research institution dedicated to addressing the world's most pressing challenges through innovative interdisciplinary collaboration and evidence-based solutions.
          </p>
        </section>
        {/* Stats Section */}
        <section className="flex flex-wrap justify-center gap-8 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="text-center space-y-3 animate-slide-up w-40"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-muted-foreground font-medium text-sm">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </section>
        {/* Features/Links Section */}
        <section className="mb-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-primary">Get Started</h2>
          <div className="flex flex-col gap-6">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className={`feature-fade-in${index} feature-hover-pop w-full`}
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '1rem',
                  boxShadow: '0 2px 12px 0 rgba(31,38,135,0.08)',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                  animation: `fadeInUp 0.7s ease ${index * 0.15 + 0.1}s both`,
                  transition: 'transform 0.35s cubic-bezier(.4,2,.6,1), opacity 0.35s cubic-bezier(.4,2,.6,1)',
                  textDecoration: 'none',
                }}
              >
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-primary" style={{ margin: 0 }}>{feature.title}</h3>
                <p className="text-muted-foreground mb-3 text-base md:text-lg" style={{ margin: 0 }}>{feature.description}</p>
                <span style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'underline', fontSize: '1rem' }}>
                  Learn more &rarr;
                </span>
              </Link>
            ))}
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
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(32px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .feature-hover-pop {
          transition: transform 0.35s cubic-bezier(.4,2,.6,1), opacity 0.35s cubic-bezier(.4,2,.6,1);
        }
        .feature-hover-pop:hover {
          transform: scale(1.07);
          opacity: 0.96;
        }
      `}</style>
    </div>
  );
};

export default Index;
