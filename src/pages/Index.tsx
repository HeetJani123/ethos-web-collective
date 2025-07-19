import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

const stats = [
  { label: 'Research Fellows', value: '150+' },
  { label: 'Countries Represented', value: '25+' },
  { label: 'Publications', value: '500+' },
  { label: 'Research Teams', value: '12' },
];

const articles = [
  {
    title: 'Explore our latest research insights',
    excerpt: 'Discover our most recent research, policy analyses, and scholarly contributions to global challenges.',
    link: '/journal',
  },
  {
    title: 'Meet our research teams',
    excerpt: 'Learn more about our interdisciplinary teams tackling complex issues worldwide.',
    link: '/teams',
  },
];

const heroImageUrl =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80'; // Vibrant, high-contrast research image

const Index = () => {
  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>
      <Navigation />
      {/* Hero + Stats Background (curved top, ends above Get Started) */}
      <div style={{ position: 'relative', width: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', height: 500, overflow: 'visible', zIndex: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
        <Tilt
          glareEnable={true}
          glareMaxOpacity={0.15}
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          style={{
            width: '90vw',
            maxWidth: 1100,
            height: 500,
            zIndex: 0,
            overflow: 'visible',
            cursor: 'pointer',
            borderTopLeftRadius: '120px 80px',
            borderTopRightRadius: '120px 80px',
            borderBottomLeftRadius: '0',
            borderBottomRightRadius: '0',
            boxShadow: '0 8px 32px rgba(37,99,235,0.10)',
            background: '#fff',
            position: 'relative',
            marginTop: '40px',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <img
            src={heroImageUrl}
            alt="Research and studying"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(0.5px) brightness(1)',
              opacity: 1,
              transition: 'filter 0.3s',
              borderTopLeftRadius: '120px 80px',
              borderTopRightRadius: '120px 80px',
              borderBottomLeftRadius: '0',
              borderBottomRightRadius: '0',
            }}
          />
          {/* Main Content Above Image (Hero + Stats only) */}
          <div style={{ position: 'absolute', zIndex: 3, maxWidth: 960, margin: '0 auto', left: 0, right: 0, top: 0, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 2rem' }}>
            {/* Hero Section */}
            <section style={{ textAlign: 'center', padding: '3rem 0 2rem 0', color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
                Advancing Knowledge Through Collaborative Research
              </h1>
              <p style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '2.5rem', textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
                We are a leading research institution dedicated to addressing the world's most pressing challenges through innovative interdisciplinary collaboration and evidence-based solutions.
              </p>
            </section>
            {/* Stats Section */}
            <section style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
              {stats.map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center', minWidth: 120, color: '#fff', fontWeight: 700, textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</div>
                  <div style={{ fontSize: '1rem' }}>{stat.label}</div>
                </div>
              ))}
            </section>
          </div>
        </Tilt>
      </div>
      {/* Get Started Section (no image behind) */}
      <main className="container" style={{ maxWidth: 960, margin: '48px auto 0 auto', position: 'relative', zIndex: 1 }}>
        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Get Started</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {articles.map((article) => (
              <div className="card" key={article.title}>
                <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>{article.title}</h3>
                <p style={{ color: 'var(--color-muted)' }}>{article.excerpt}</p>
                <Link to={article.link} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                  Learn more &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
            Institute for Global Research
          </div>
          <div style={{ fontSize: '1rem', color: 'var(--color-muted)', margin: '0.5rem 0' }}>
            Advancing knowledge through collaborative research and evidence-based solutions.
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--color-muted)' }}>
            © 2024 Institute for Global Research. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
