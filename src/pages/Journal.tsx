import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ArticleFormModal } from '@/components/ArticleFormModal';
import { Badge } from '@/components/ui/badge';

const categories = [
  'All',
  'Artificial Intelligence',
  'Bio Technology',
  'Climate Technology',
  'Med Society',
  'Stem Ethics',
];

const bgImage = '/bg-illustration.jpg'; // Match Teams and Home

const Journal = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [canPost, setCanPost] = useState(false);
  const [articleModalOpen, setArticleModalOpen] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    // Check if user is a member who can post
    if (user && profile) {
      setCanPost(profile.is_member || false);
    } else {
      setCanPost(false);
    }
  }, [user, profile]);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleArticleClick = (articleId: string) => {
    navigate(`/journal/${articleId}`);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <Navigation />
      {/* Subtle overlay for readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(240,244,255,0.85) 100%), url(${bgImage}) center/cover no-repeat fixed`,
          pointerEvents: 'none',
        }}
      />
      <div className="relative z-10">
        <main className="pt-24 pb-20 bg-background/80 min-h-screen transition-all duration-300"> 
          <div className="container max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Research Journal</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Explore our latest research insights, policy analyses, and scholarly contributions.
              </p>
            </div>
            
            {/* Post Article Section */}
            <div className="mb-12 flex justify-center">
              {user && canPost && (
                <>
                  <Button 
                    className="px-8 py-3 text-lg"
                    onClick={() => setArticleModalOpen(true)}
                  >
                    Post New Article
                  </Button>
                  <ArticleFormModal
                    open={articleModalOpen}
                    onOpenChange={setArticleModalOpen}
                    isMember={profile?.is_member}
                    user={user}
                    onArticlePosted={fetchArticles}
                  />
                </>
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
            
            {/* Loading State */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">Loading articles...</p>
              </div>
            ) : (
              /* Journal Cards */
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="mb-8">
                    <div
                      className="group relative bg-white/20 border border-white/30 rounded-2xl shadow-xl p-8 flex flex-col gap-4 cursor-pointer hover:scale-[1.03] transition-all duration-500 glass-card overflow-hidden"
                      style={{
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        background: 'rgba(255,255,255,0.18)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                      }}
                      onClick={() => handleArticleClick(article.id)}
                    >
                      <div className="transition-all duration-300 group-hover:blur-sm">
                        <h3 className="text-2xl font-semibold text-foreground mb-2">{article.title}</h3>
                        {/* Category badge below the title and above the summary */}
                        {article.category && (
                          <div className="mb-2">
                            <Badge className="bg-blue-100 text-blue-800 font-medium text-xs px-2 py-1">{article.category}</Badge>
                          </div>
                        )}
                        <p className="text-muted-foreground leading-relaxed">{article.excerpt}</p>
                      </div>
                      {/* Read More overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none">
                        <div className="text-lg font-semibold text-primary bg-background/95 px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm border border-primary/30 transform scale-95 group-hover:scale-100 transition-transform duration-300">
                          Read More
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredArticles.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-muted-foreground">No articles found.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Journal;