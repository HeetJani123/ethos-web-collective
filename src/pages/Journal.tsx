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
      <main className={`py-20 bg-background/80 min-h-screen transition-all duration-300 ${modal ? 'blur-md pointer-events-none select-none' : ''}`}> 
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Research Journal</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our latest research insights, policy analyses, and scholarly contributions.
            </p>
          </div>
          {/* Search and Categories */}
          <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
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
                className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-xl p-8 flex flex-col gap-4 cursor-pointer hover:scale-[1.03] transition-transform glass-card"
                style={{
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
                onClick={() => setModal({ title: journal.title, content: journal.content })}
              >
                <h3 className="text-2xl font-semibold text-foreground mb-2">{journal.title}</h3>
                <p className="text-muted-foreground mb-4">{journal.excerpt}</p>
                <div className="flex-1" />
                <Button className="mt-4 w-fit" variant="outline">Read More</Button>
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