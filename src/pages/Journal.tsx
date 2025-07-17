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
  
  // Mock journal posts data
  const posts = [
    {
      id: 1,
      title: "The Future of Digital Democracy: Lessons from Global Experiments",
      excerpt: "An analysis of digital democratic innovations across five continents, examining their effectiveness in increasing civic participation and improving governance outcomes.",
      author: "Dr. Sarah Chen",
      date: "2024-01-15",
      category: "Democratic Governance",
      readTime: "8 min read",
      likes: 45,
      comments: 12,
      featured: true
    },
    {
      id: 2,
      title: "Carbon Pricing in Developing Economies: A Comparative Study",
      excerpt: "This comprehensive study examines the implementation and effectiveness of carbon pricing mechanisms in emerging markets, with specific focus on economic and social impacts.",
      author: "Prof. Michael Rodriguez",
      date: "2024-01-10",
      category: "Climate Policy",
      readTime: "12 min read",
      likes: 67,
      comments: 23,
      featured: false
    },
    {
      id: 3,
      title: "AI Ethics in Healthcare: Balancing Innovation and Patient Rights",
      excerpt: "As artificial intelligence becomes increasingly prevalent in healthcare, this paper explores the ethical frameworks needed to ensure responsible implementation.",
      author: "Dr. Elena Petrov",
      date: "2024-01-08",
      category: "Technology & Society",
      readTime: "6 min read",
      likes: 34,
      comments: 8,
      featured: false
    },
    {
      id: 4,
      title: "Universal Basic Income: Evidence from Recent Pilot Programs",
      excerpt: "A meta-analysis of UBI pilot programs worldwide, examining their impact on poverty reduction, employment patterns, and social outcomes.",
      author: "Dr. Amara Okafor",
      date: "2024-01-05",
      category: "Social Innovation",
      readTime: "10 min read",
      likes: 89,
      comments: 31,
      featured: true
    },
    {
      id: 5,
      title: "Post-Pandemic Economic Recovery: Policy Lessons Learned",
      excerpt: "An examination of fiscal and monetary policy responses to COVID-19, analyzing their effectiveness and implications for future crisis management.",
      author: "Dr. James Kim",
      date: "2024-01-02",
      category: "Economic Policy",
      readTime: "9 min read",
      likes: 56,
      comments: 19,
      featured: false
    }
  ];

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
                {featuredPosts.map((post) => (
                  <Card key={post.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        <Link to={`/journal/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-8">
              {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
            </h2>
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{post.category}</Badge>
                          <span className="text-sm text-muted-foreground">{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-serif font-semibold group-hover:text-primary transition-colors">
                          <Link to={`/journal/${post.id}`}>{post.title}</Link>
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="h-4 w-4" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journal;