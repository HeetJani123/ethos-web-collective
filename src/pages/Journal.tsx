import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const categories = [
  'All',
  'Democratic Governance',
  'Climate Policy',
  'Technology & Society',
  'Social Innovation',
  'Economic Policy',
];

const journals = [
  {
    title: 'The Future of Digital Democracy',
    excerpt: 'Exploring innovations in civic participation and governance.',
    category: 'Democratic Governance',
    content: 'The intersection of technology and democratic governance has become one of the most fascinating areas of political research in the 21st century. As digital tools reshape how citizens engage with government, we find ourselves at a critical juncture in the evolution of democratic institutions.\n\nGlobal Digital Democracy Initiatives: Our comprehensive study examined digital democratic innovations across five continents, from Estonia\'s e-residency program to Taiwan\'s vTaiwan platform. These experiments offer valuable insights into how technology can enhance civic participation while maintaining the integrity of democratic processes.\n\nKey Findings: Increased Participation, Enhanced Transparency, Deliberative Quality.\n\nChallenges and Considerations: Digital divides can exacerbate existing inequalities in political participation. Cybersecurity concerns and the potential for manipulation require robust safeguards. Most critically, the design of digital democratic tools must be guided by democratic principles, not technological possibilities alone.\n\nRecommendations: Invest in digital literacy programs, establish clear privacy and security standards, and maintain multiple channels for civic participation to ensure inclusivity.'
  },
  {
    title: 'Carbon Pricing in Developing Economies',
    excerpt: 'A comparative study of market mechanisms and social impact.',
    category: 'Climate Policy',
    content: 'This comprehensive study examines the implementation and effectiveness of carbon pricing mechanisms in emerging markets, with specific focus on economic and social impacts.\n\nWe analyze case studies from Latin America, Southeast Asia, and Africa, highlighting both successes and challenges.\n\nKey Points: Market-based solutions, social equity, and policy recommendations for sustainable growth.'
  },
  {
    title: 'AI Ethics in Healthcare',
    excerpt: 'Balancing innovation and patient rights in a digital age.',
    category: 'Technology & Society',
    content: 'As artificial intelligence becomes increasingly prevalent in healthcare, this paper explores the ethical frameworks needed to ensure responsible implementation.\n\nTopics include patient privacy, algorithmic bias, and the future of medical decision-making.'
  },
  {
    title: 'Universal Basic Income: Global Pilots',
    excerpt: 'Meta-analysis of UBI programs and their outcomes.',
    category: 'Social Innovation',
    content: 'A meta-analysis of UBI pilot programs worldwide, examining their impact on poverty reduction, employment patterns, and social outcomes.\n\nWe review data from Finland, Kenya, and the United States.'
  },
  {
    title: 'Post-Pandemic Economic Recovery',
    excerpt: 'Fiscal and monetary policy responses to COVID-19.',
    category: 'Economic Policy',
    content: 'An examination of fiscal and monetary policy responses to COVID-19, analyzing their effectiveness and implications for future crisis management.\n\nIncludes lessons learned and recommendations for policymakers.'
  },
  {
    title: 'Youth Policy Innovations',
    excerpt: 'New approaches to youth engagement and empowerment.',
    category: 'Social Innovation',
    content: 'This article explores new approaches to youth engagement and empowerment, including participatory budgeting, youth parliaments, and digital activism.'
  },
];

const bgImage = '/bg-illustration.jpg';

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modal, setModal] = useState<{title: string, content: string} | null>(null);
  const { user } = useAuth();
  const [canPost, setCanPost] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user?.email) {
        const { data, error } = await (supabase as any)
          .from('journal_admins')
          .select('email')
          .eq('email', user.email)
          .single();
        setCanPost(!!data && !error);
      }
      setCheckedAuth(true);
    };
    checkAdmin();
  }, [user]);

  const filteredJournals = journals.filter(journal => {
    const matchesSearch =
      journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || journal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="min-h-screen relative"
      style={{
        background: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${bgImage}) center/cover no-repeat fixed`,
      }}
    >
      <Navigation />
      <main className={`pt-24 pb-20 bg-background/80 min-h-screen transition-all duration-300 ${modal ? 'blur-md pointer-events-none select-none' : ''}`}> 
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Research Journal</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our latest research insights, policy analyses, and scholarly contributions.
            </p>
          </div>
          {/* Authenticated Post UI */}
          <div className="mb-8 flex justify-center">
            {!user && (
              <div className="text-muted-foreground">Sign in to post a journal entry.</div>
            )}
            {user && checkedAuth && canPost && (
              <Button variant="default">Post Journal</Button>
            )}
            {user && checkedAuth && !canPost && (
              <div className="text-muted-foreground">You are not authorized to post.</div>
            )}
          </div>
          {/* Search and Categories */}
          <div className="mb-16 space-y-8">
            <div className="flex justify-center">
              <div className="relative max-w-xl w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-2 rounded-xl bg-background/50 backdrop-blur-sm"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="default"
                  onClick={() => setSelectedCategory(category)}
                  className="px-6 py-2 rounded-full transition-all duration-300"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          {/* Journal Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJournals.map((journal, i) => (
              <Link
                key={i}
                to={`/journal/${i}`}
                className="group relative backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-xl p-8 flex flex-col gap-4 cursor-pointer hover:scale-[1.03] transition-all duration-500 glass-card overflow-hidden"
                style={{
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  textDecoration: 'none',
                }}
              >
                {/* Content that blurs on hover */}
                <div className="group-hover:blur-sm transition-all duration-300 relative z-10">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">{journal.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{journal.excerpt}</p>
                </div>
                {/* Read More overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <div className="text-lg font-semibold text-primary bg-background/95 px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm border border-primary/30 transform scale-95 group-hover:scale-100 transition-transform duration-300">
                    Read More
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      {/* Modal Popup */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in">
            <button
              className="absolute top-4 right-4 text-xl text-muted-foreground hover:text-primary"
              onClick={() => setModal(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{modal.title}</h2>
            <p className="text-muted-foreground mb-2">{modal.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;