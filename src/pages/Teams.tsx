import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';

const Teams = () => {
  const teams = [
    {
      name: "Economic Policy Research",
      focus: "Macroeconomic analysis, fiscal policy, and international trade",
      description: "Our economists examine the complex relationships between policy decisions and economic outcomes, providing evidence-based recommendations for sustainable growth and stability.",
      projects: [
        "Global Trade Impact Assessment",
        "Digital Currency Policy Framework",
        "Post-Pandemic Economic Recovery Analysis"
      ],
      members: 18,
      lead: "Dr. Sarah Chen"
    },
    {
      name: "Climate & Environmental Studies",
      focus: "Climate change mitigation, environmental policy, and sustainability",
      description: "This interdisciplinary team combines environmental science, economics, and policy analysis to address the urgent challenges of climate change and environmental degradation.",
      projects: [
        "Carbon Pricing Mechanisms Study",
        "Urban Sustainability Index",
        "Renewable Energy Transition Pathways"
      ],
      members: 22,
      lead: "Prof. Michael Rodriguez"
    },
    {
      name: "Social Innovation Lab",
      focus: "Social policy, inequality, and community development",
      description: "Researchers in this lab explore innovative approaches to social challenges, focusing on evidence-based interventions that promote equity and social cohesion.",
      projects: [
        "Universal Basic Income Pilot Analysis",
        "Digital Divide Assessment",
        "Community Resilience Framework"
      ],
      members: 15,
      lead: "Dr. Amara Okafor"
    },
    {
      name: "Technology & Society",
      focus: "Digital governance, AI ethics, and technological impact",
      description: "This team examines the intersection of technology and society, providing frameworks for responsible innovation and digital governance.",
      projects: [
        "AI Governance Standards",
        "Platform Regulation Analysis",
        "Digital Rights Framework"
      ],
      members: 12,
      lead: "Dr. James Kim"
    },
    {
      name: "Global Health Initiative",
      focus: "Health systems, pandemic preparedness, and health equity",
      description: "Our health researchers work on strengthening health systems, improving pandemic preparedness, and addressing health inequalities worldwide.",
      projects: [
        "Pandemic Preparedness Framework",
        "Healthcare Access Analysis",
        "Mental Health Policy Review"
      ],
      members: 20,
      lead: "Dr. Elena Petrov"
    },
    {
      name: "Democratic Governance",
      focus: "Political institutions, electoral systems, and civic engagement",
      description: "This team studies democratic institutions and processes, working to strengthen governance systems and promote civic participation.",
      projects: [
        "Electoral System Reform Study",
        "Civic Engagement Measurement",
        "Digital Democracy Tools"
      ],
      members: 14,
      lead: "Prof. David Thompson"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h1>Research Teams</h1>
            <p className="lead mx-auto max-w-3xl">
              Our diverse research teams bring together experts from various disciplines 
              to tackle complex challenges and drive meaningful change through evidence-based research.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {teams.map((team, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{team.name}</CardTitle>
                      <p className="text-sm text-muted-foreground font-medium">
                        {team.focus}
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-4">
                      {team.members} members
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {team.description}
                  </p>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Current Projects</h4>
                    <ul className="space-y-1">
                      {team.projects.map((project, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Team Lead:</span>{' '}
                      <span className="font-medium">{team.lead}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Teams;