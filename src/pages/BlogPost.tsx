import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar, 
  User, 
  ArrowLeft,
  ThumbsUp
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

const BlogPost = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(45);

  // Mock post data (in a real app, this would come from an API)
  const post = {
    id: 1,
    title: "The Future of Digital Democracy: Lessons from Global Experiments",
    content: `
      <p>The intersection of technology and democratic governance has become one of the most fascinating areas of political research in the 21st century. As digital tools reshape how citizens engage with government, we find ourselves at a critical juncture in the evolution of democratic institutions.</p>

      <h3>Global Digital Democracy Initiatives</h3>
      <p>Our comprehensive study examined digital democratic innovations across five continents, from Estonia's e-residency program to Taiwan's vTaiwan platform. These experiments offer valuable insights into how technology can enhance civic participation while maintaining the integrity of democratic processes.</p>

      <h3>Key Findings</h3>
      <p>Three primary patterns emerged from our analysis:</p>
      <ul>
        <li><strong>Increased Participation:</strong> Digital platforms consistently showed higher engagement rates among younger demographics, with participation increasing by an average of 23% in studied cases.</li>
        <li><strong>Enhanced Transparency:</strong> Real-time access to government data and decision-making processes improved public trust in institutions by measurable margins.</li>
        <li><strong>Deliberative Quality:</strong> Well-designed digital platforms fostered more substantive policy discussions compared to traditional public forums.</li>
      </ul>

      <h3>Challenges and Considerations</h3>
      <p>However, our research also revealed significant challenges. Digital divides can exacerbate existing inequalities in political participation. Cybersecurity concerns and the potential for manipulation require robust safeguards. Most critically, the design of digital democratic tools must be guided by democratic principles, not technological possibilities alone.</p>

      <h3>Recommendations for Implementation</h3>
      <p>Based on our findings, we recommend a gradual, evidence-based approach to digital democracy implementation. This includes investing in digital literacy programs, establishing clear privacy and security standards, and maintaining multiple channels for civic participation to ensure inclusivity.</p>

      <p>The future of digital democracy lies not in replacing traditional democratic institutions, but in thoughtfully augmenting them with technology that serves democratic values and expands meaningful participation for all citizens.</p>
    `,
    author: "Dr. Sarah Chen",
    date: "2024-01-15",
    category: "Democratic Governance",
    readTime: "8 min read",
    tags: ["digital democracy", "civic engagement", "governance", "technology policy"]
  };

  // Mock comments data
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Prof. Michael Thompson",
      content: "Excellent analysis, Dr. Chen. The point about digital divides is particularly important. Have you considered how blockchain technologies might address some of the trust and transparency challenges you mention?",
      date: "2024-01-16",
      likes: 12
    },
    {
      id: 2,
      author: "Dr. Lisa Park",
      content: "This research is timely and relevant. I'd be interested in seeing a follow-up study that examines the long-term sustainability of these digital democracy initiatives.",
      date: "2024-01-17",
      likes: 8
    },
    {
      id: 3,
      author: "James Rodriguez",
      content: "The comparison between Taiwan's vTaiwan and Estonia's e-residency program is fascinating. Do you think cultural factors play a significant role in the success of these platforms?",
      date: "2024-01-18",
      likes: 5
    }
  ]);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
    toast({
      description: liked ? "Removed from favorites" : "Added to favorites",
    });
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        content: newComment,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setComments([...comments, comment]);
      setNewComment('');
      toast({
        description: "Comment posted successfully",
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      description: "Link copied to clipboard",
    });
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
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-ul:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-8 border-t border-border">
              {post.tags.map((tag, index) => (
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
              
              {/* Add Comment */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Textarea
                    placeholder="Share your thoughts on this research..."
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
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(comment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {comment.content}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;