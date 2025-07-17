import { Target, Globe, Users, BookOpen } from 'lucide-react';

const Mission = () => {
  const pillars = [
    {
      icon: Target,
      title: "Evidence-Based Research",
      description: "Conducting rigorous, methodologically sound research that advances understanding and informs policy."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Addressing challenges that transcend borders through international collaboration and knowledge sharing."
    },
    {
      icon: Users,
      title: "Interdisciplinary Collaboration",
      description: "Breaking down silos to foster innovative solutions through diverse academic partnerships."
    },
    {
      icon: BookOpen,
      title: "Knowledge Dissemination",
      description: "Making research accessible and actionable for academics, policymakers, and the public."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2>Our Mission</h2>
          <p className="lead mx-auto max-w-3xl">
            To advance human knowledge and address global challenges through 
            rigorous research, innovative collaboration, and the pursuit of evidence-based solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <pillar.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">{pillar.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;