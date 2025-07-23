import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar, User, Heart, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';

const Journal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // No journal posts yet; placeholder for future real posts
  const posts = [];

  const categories = ["All", "Democratic Governance", "Climate Policy", "Technology & Society", "Social Innovation", "Economic Policy"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX / rect.width) * 100,
        y: (e.clientY / rect.height) * 100,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = posts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navigation />
      
      {/* Glassmorphism Background with Cursor Effects */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary)/0.08), transparent 50%), linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted)/0.3))`,
        }}
      />
      
      <main className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h1>Research Journal</h1>
            <p className="lead mx-auto max-w-3xl">
              Explore our latest research insights, policy analyses, and scholarly contributions 
              to understanding the world's most pressing challenges.
            </p>
          </div>

          {/* Search and Filters with Glassmorphism */}
          <div className="mb-12 space-y-6">
            <div 
              className="relative max-w-md mx-auto p-6 rounded-2xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Search className="absolute left-9 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-transparent border-white/20 focus:border-white/40"
              />
            </div>
            
            <div 
              className="flex flex-wrap justify-center gap-2 p-4 rounded-xl transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all duration-200 hover:scale-105"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Featured Articles with Glassmorphism */}
          {selectedCategory === "All" && searchTerm === "" && (
            <div className="mb-16">
              <h2 className="text-2xl font-serif font-semibold mb-8">Featured Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* No featured posts yet */}
                <div 
                  className="col-span-2 text-center text-muted-foreground py-12 rounded-2xl transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  No featured articles yet. Check back soon!
                </div>
              </div>
            </div>
          )}

          {/* All Articles with Glassmorphism */}
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-8">
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
            </h2>
            <div className="space-y-6">
              {/* No articles yet */}
              <div 
                className="text-center text-muted-foreground py-12 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                }}
              >
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