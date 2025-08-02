import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import { Users, Globe, FileText, TrendingUp, Zap, Shield, Heart } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { useRef, useEffect, useState } from 'react';

const teamIcons = [Users, Globe, FileText, TrendingUp, Zap, Shield, Heart];

function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [threshold]);
  return [ref, inView];
}

function useScrollParallax(count: number) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // For each card, calculate a parallax offset based on scrollY and index
  return Array.from({ length: count }, (_, i) => {
    // Each card moves in opposite direction, and the effect is subtle
    const direction = i % 2 === 0 ? 1 : -1;
    return direction * Math.min(32, scrollY * 0.08 + i * 2); // max 32px offset
  });
}

const Teams = () => {
  const teams = [
    {
      name: "Artificial Intelligence",
      focus: "Machine learning, deep learning, and intelligent systems",
      description: "Our AI team pioneers research in machine learning, deep learning, and intelligent systems, developing innovative solutions for real-world challenges across industries.",
      projects: [
        "Global Trade Impact Assessment",
        "Digital Currency Policy Framework",
        "Post-Pandemic Economic Recovery Analysis"
      ],
      members: 18,
      lead: "Dr. Sarah Chen"
    },
    {
      name: "Bio Technology",
      focus: "Genetic engineering, synthetic biology, and bioprocessing",
      description: "The Bio Technology team explores advancements in genetic engineering, synthetic biology, and bioprocessing to drive breakthroughs in healthcare, agriculture, and sustainability.",
      projects: [
        "Carbon Pricing Mechanisms Study",
        "Urban Sustainability Index",
        "Renewable Energy Transition Pathways"
      ],
      members: 22,
      lead: "Prof. Michael Rodriguez"
    },
    {
      name: "Climate Technology",
      focus: "Renewable energy, carbon capture, and climate modeling",
      description: "Our Climate Technology group innovates in renewable energy, carbon capture, and climate modeling, working to combat climate change and promote environmental resilience.",
      projects: [
        "Universal Basic Income Pilot Analysis",
        "Digital Divide Assessment",
        "Community Resilience Framework"
      ],
      members: 15,
      lead: "Dr. Amara Okafor"
    },
    {
      name: "Med Society",
      focus: "Medicine, public health, and healthcare innovation",
      description: "Med Society unites experts in medicine, public health, and social sciences to address healthcare challenges, improve patient outcomes, and advance medical research.",
      projects: [
        "AI Governance Standards",
        "Platform Regulation Analysis",
        "Digital Rights Framework"
      ],
      members: 12,
      lead: "Dr. James Kim"
    },
    {
      name: "Stem Ethics",
      focus: "Ethics in science, technology, engineering, and mathematics",
      description: "The Stem Ethics team examines the ethical, legal, and social implications of advances in science, technology, engineering, and mathematics, ensuring responsible innovation.",
      projects: [
        "Pandemic Preparedness Framework",
        "Healthcare Access Analysis",
        "Mental Health Policy Review"
      ],
      members: 20,
      lead: "Dr. Elena Petrov"
    },
    
  ];
  const parallaxOffsets = useScrollParallax(teams.length);

  return (
    <div className="page-container">
      <Navigation />
      <main className="flex-1 py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h1 className="scholarly-text text-3xl md:text-5xl font-bold">Research Teams</h1>
            <p className="lead mx-auto max-w-3xl text-secondary">
              Our diverse research teams bring together experts from various disciplines 
              to tackle complex challenges and drive meaningful change through evidence-based research.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-10">
            {teams.map((team, index) => {
              const Icon = teamIcons[index % teamIcons.length];
              const [ref, inView] = useInView();
              // Slide in from left for even, right for odd
              const slideX = inView ? 0 : (index % 2 === 0 ? -64 : 64);
              // Center the last card if odd number of teams
              const isLast = index === teams.length - 1;
              const isOdd = teams.length % 2 === 1;
              const cardClass = isLast && isOdd ? 'col-span-2 justify-self-center' : '';
              return (
                <div ref={ref as React.Ref<any>} style={{ width: '100%' }} key={index} className={cardClass}>
                  <Tilt
                    glareEnable={true}
                    glareMaxOpacity={0.18}
                    tiltMaxAngleX={0}
                    tiltMaxAngleY={0}
                    transitionSpeed={350}
                    perspective={1200}
                    scale={1.0}
                    className="modern-card"
                    style={{
                      transition: 'transform 0.9s cubic-bezier(.4,2,.6,1), box-shadow 0.7s, border-color 0.7s',
                      animation: inView ? `fadeInSide 0.9s cubic-bezier(.4,2,.6,1) both` : 'none',
                      transform: `translateX(${slideX}px) scale(1)`,
                      cursor: 'pointer',
                      willChange: 'transform',
                    }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 academic-gradient rounded-full flex items-center justify-center animate-bounce-slow">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge variant="secondary" className="ml-2 text-base px-3 py-1 animate-pulse">
                        {team.members} members
                      </Badge>
                    </div>
                    <div className="space-y-2 mb-2">
                      <h2 className="text-xl font-bold text-primary mb-1">{team.name}</h2>
                      <p className="text-sm text-secondary font-medium">{team.focus}</p>
                    </div>
                    <p className="text-secondary leading-relaxed mb-4">
                      {team.description}
                    </p>
                    <div>
                      <h4 className="font-medium text-sm mb-2 text-primary">Current Projects</h4>
                      <ul className="space-y-1">
                        {team.projects.map((project, idx) => (
                          <li key={idx} className="text-sm text-secondary flex items-start">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-border mt-4">
                      <p className="text-sm">
                        <span className="text-secondary">Team Lead:</span>{' '}
                        <span className="font-medium text-primary">{team.lead}</span>
                      </p>
                    </div>
                  </Tilt>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <style>{`
        @keyframes fadeInSide {
          0% { opacity: 0; transform: translateX(var(--slide-x, 0)) scale(1); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.2s infinite alternate cubic-bezier(.4,2,.6,1);
        }
        @keyframes bounce-slow {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default Teams;