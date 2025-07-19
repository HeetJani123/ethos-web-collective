import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, Heart, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // No journal posts yet; placeholder for future real posts
  const posts = [];

  const categories = ["All", "Democratic Governance", "Climate Policy", "Technology & Society", "Social Innovation", "Economic Policy"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = posts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h1>Research Journal</h1>
            <p className="lead mx-auto max-w-3xl">
              Explore our latest research insights, policy analyses, and scholarly contributions 
              to understanding the world's most pressing challenges.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Articles */}
          {selectedCategory === "All" && searchTerm === "" && (
            <div className="mb-16">
              <h2 className="text-2xl font-serif font-semibold mb-8">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* No featured posts yet */}
                <div className="col-span-2 text-center text-muted-foreground py-12">
                  No featured articles yet. Check back soon!
                </div>
              </div>
            </div>
          )}

          {/* All Articles */}
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-8">
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
            </h2>
            <div className="space-y-6">
              {/* No articles yet */}
              <div className="text-center text-muted-foreground py-12">
                No journal articles have been published yet. Stay tuned!
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;