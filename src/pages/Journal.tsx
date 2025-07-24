import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

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
    content: 'Full article content for The Future of Digital Democracy...'
  },
  {
    title: 'Carbon Pricing in Developing Economies',
    excerpt: 'A comparative study of market mechanisms and social impact.',
    category: 'Climate Policy',
    content: 'Full article content for Carbon Pricing in Developing Economies...'
  },
  {
    title: 'AI Ethics in Healthcare',
    excerpt: 'Balancing innovation and patient rights in a digital age.',
    category: 'Technology & Society',
    content: 'Full article content for AI Ethics in Healthcare...'
  },
  {
    title: 'Universal Basic Income: Global Pilots',
    excerpt: 'Meta-analysis of UBI programs and their outcomes.',
    category: 'Social Innovation',
    content: 'Full article content for Universal Basic Income...'
  },
  {
    title: 'Post-Pandemic Economic Recovery',
    excerpt: 'Fiscal and monetary policy responses to COVID-19.',
    category: 'Economic Policy',
    content: 'Full article content for Post-Pandemic Economic Recovery...'
  },
  {
    title: 'Youth Policy Innovations',
    excerpt: 'New approaches to youth engagement and empowerment.',
    category: 'Social Innovation',
    content: 'Full article content for Youth Policy Innovations...'
  },
];

const bgImage = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80';

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modal, setModal] = useState<{title: string, content: string} | null>(null);

  const filteredJournals = journals.filter(journal => {
    const matchesSearch =
      journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || journal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="min-h-screen bg-background relative"
      style={{
        background: `url(${bgImage}) center/cover no-repeat fixed, linear-gradient(135deg, #e0e7ef 0%, #f8fafc 100%)`,
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
              <div
                key={i}
                className="group relative backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-xl p-8 flex flex-col gap-4 cursor-pointer hover:scale-[1.03] transition-all duration-500 glass-card overflow-hidden"
                style={{
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
                onClick={() => setModal({ title: journal.title, content: journal.content })}
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
              </div>
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