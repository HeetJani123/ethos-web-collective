import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Calendar, User, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';

// Use the same journals array as in Journal.tsx
const journals = [
  {
    title: 'The Future of Digital Democracy',
    content: `The intersection of technology and democratic governance has become one of the most fascinating areas of political research in the 21st century. As digital tools reshape how citizens engage with government, we find ourselves at a critical juncture in the evolution of democratic institutions.\n\nGlobal Digital Democracy Initiatives: Our comprehensive study examined digital democratic innovations across five continents, from Estonia's e-residency program to Taiwan's vTaiwan platform. These experiments offer valuable insights into how technology can enhance civic participation while maintaining the integrity of democratic processes.\n\nKey Findings: Increased Participation, Enhanced Transparency, Deliberative Quality.\n\nChallenges and Considerations: Digital divides can exacerbate existing inequalities in political participation. Cybersecurity concerns and the potential for manipulation require robust safeguards. Most critically, the design of digital democratic tools must be guided by democratic principles, not technological possibilities alone.\n\nRecommendations: Invest in digital literacy programs, establish clear privacy and security standards, and maintain multiple channels for civic participation to ensure inclusivity.`,
    author: 'Dr. Sarah Chen',
    date: '2024-01-15',
    category: 'Democratic Governance',
    readTime: '8 min read',
    tags: ['digital democracy', 'civic engagement', 'governance', 'technology policy']
  },
  {
    title: 'Carbon Pricing in Developing Economies',
    content: `This comprehensive study examines the implementation and effectiveness of carbon pricing mechanisms in emerging markets, with specific focus on economic and social impacts.\n\nWe analyze case studies from Latin America, Southeast Asia, and Africa, highlighting both successes and challenges.\n\nKey Points: Market-based solutions, social equity, and policy recommendations for sustainable growth.`,
    author: 'Prof. Michael Rodriguez',
    date: '2024-01-10',
    category: 'Climate Policy',
    readTime: '12 min read',
    tags: ['carbon pricing', 'climate policy', 'emerging markets']
  },
  {
    title: 'AI Ethics in Healthcare',
    content: `As artificial intelligence becomes increasingly prevalent in healthcare, this paper explores the ethical frameworks needed to ensure responsible implementation.\n\nTopics include patient privacy, algorithmic bias, and the future of medical decision-making.`,
    author: 'Dr. Elena Petrov',
    date: '2024-01-08',
    category: 'Technology & Society',
    readTime: '6 min read',
    tags: ['AI', 'ethics', 'healthcare']
  },
  {
    title: 'Universal Basic Income: Global Pilots',
    content: `A meta-analysis of UBI pilot programs worldwide, examining their impact on poverty reduction, employment patterns, and social outcomes.\n\nWe review data from Finland, Kenya, and the United States.`,
    author: 'Dr. Amara Okafor',
    date: '2024-01-05',
    category: 'Social Innovation',
    readTime: '10 min read',
    tags: ['UBI', 'social innovation', 'poverty reduction']
  },
  {
    title: 'Post-Pandemic Economic Recovery',
    content: `An examination of fiscal and monetary policy responses to COVID-19, analyzing their effectiveness and implications for future crisis management.\n\nIncludes lessons learned and recommendations for policymakers.`,
    author: 'Dr. James Kim',
    date: '2024-01-02',
    category: 'Economic Policy',
    readTime: '9 min read',
    tags: ['economic policy', 'COVID-19', 'recovery']
  },
  {
    title: 'Youth Policy Innovations',
    content: `This article explores new approaches to youth engagement and empowerment, including participatory budgeting, youth parliaments, and digital activism.`,
    author: 'Dr. Amara Okafor',
    date: '2024-01-01',
    category: 'Social Innovation',
    readTime: '7 min read',
    tags: ['youth', 'policy', 'empowerment']
  },
];

const BlogPost = () => {
  const { id } = useParams();
  const index = Number(id);
  const post = journals[index];

  // Demo Like/Comment state
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-muted-foreground py-32 text-xl">Article not found.</div>
          </div>
        </main>
      </div>
    );
  }

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [...prev, newComment.trim()]);
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link to="/journal" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Journal
            </Link>
          </div>

          {/* Article Header */}
          <article className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge variant="secondary">{post.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-serif font-semibold leading-tight">
                  {post.title}
                </h1>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </div>

              {/* Article Actions */}
              <div className="flex items-center space-x-4 py-4 border-y border-border">
                <Button 
                  variant={liked ? "default" : "outline"} 
                  size="sm"
                  onClick={handleLike}
                  className="space-x-2"
                >
                  <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                  <span>{likes}</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-ul:text-muted-foreground"
              style={{ whiteSpace: 'pre-line' }}
              >
              {post.content}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
              {post.tags && post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </article>

          {/* Comments Section */}
          <section className="mt-16 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-semibold">
                Discussion ({comments.length})
              </h3>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Textarea
                    placeholder={"Share your thoughts on this research..."}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleComment} disabled={!newComment.trim()}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Comments List */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No comments yet. Be the first to share your thoughts!
                </div>
              ) : (
                comments.map((comment, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        <Avatar>
                          <AvatarFallback>
                            U
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Anonymous</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {comment}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;