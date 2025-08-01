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
    <div className="page-container">
      <Navigation />
      <main className="container py-8">
        {/* Hero Section */}
        <section className="hero-bg text-center py-16 mb-12">
          <div className="content-overlay max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Research Journal
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              Explore cutting-edge research, insights, and discoveries from our global community of scholars.
            </p>
            
            {/* Post Article Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!user ? (
                <p className="text-muted-foreground">
                  <Button variant="outline" className="mr-2">Sign in</Button> 
                  to contribute to our research journal
                </p>
              ) : !canPost ? (
                <p className="text-muted-foreground">
                  Contact admin to become a member and contribute articles
                </p>
              ) : (
                <Button 
                  onClick={() => setArticleModalOpen(true)}
                  className="magnetic-btn"
                  size="lg"
                >
                  Post New Article
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <div className="glass p-6 rounded-2xl mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-0 backdrop-blur"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2 hover:scale-105 transition-transform"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="modern-card h-64 animate-pulse">
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="h-3 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))
          ) : filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <div
                key={article.id}
                className="modern-card group cursor-pointer h-full flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleArticleClick(article.id)}
              >
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  
                  {article.category && (
                    <Badge variant="secondary" className="mb-3">
                      {article.category}
                    </Badge>
                  )}
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
                    {article.excerpt || 'No excerpt available'}
                  </p>
                </div>
                
                {/* Read More overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 pointer-events-none rounded-2xl">
                  <div className="text-lg font-semibold text-primary bg-background/95 px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm border border-primary/30 transform scale-95 group-hover:scale-100 transition-transform duration-300">
                    Read More
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="glass p-12 rounded-3xl max-w-md mx-auto">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedCategory !== 'All' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Be the first to contribute to our research journal'}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Article Modal */}
      {user && canPost && (
        <ArticleFormModal
          open={articleModalOpen}
          onOpenChange={setArticleModalOpen}
          isMember={profile?.is_member}
          user={user}
          onArticlePosted={fetchArticles}
        />
      )}
    </div>
  );
};

export default Journal;