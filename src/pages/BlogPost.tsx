import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar, 
  User, 
  ArrowLeft
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { AuthDialog } from '@/components/AuthDialog';
import { Badge } from '@/components/ui/badge';

const BlogPost = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<any>(null);
  const [commentAuthors, setCommentAuthors] = useState<Record<string, string>>({});

  // Load article and check if user has liked it
  useEffect(() => {
    if (id) {
      loadArticle();
      checkUserLike();
      loadComments();
    }
  }, [id, user]);

  const loadArticle = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      setArticle(data);
      setLikes(data.likes_count || 0);
    } catch (error) {
      console.error('Error loading article:', error);
      toast({
        title: "Error",
        description: "Failed to load article",
        variant: "destructive",
      });
    }
  };

  const checkUserLike = async () => {
    if (!user || !id) return;

    try {
      const { data, error } = await supabase
        .from('article_likes')
        .select('id')
        .eq('article_id', id)
        .eq('user_id', user.id)
        .single();

      if (data) {
        setLiked(true);
      }
    } catch (error) {
      // User hasn't liked the article yet
    }
  };

  const loadComments = async () => {
    if (!id) return;
    
    try {
      const { data: commentsData, error } = await supabase
        .from('comments')
        .select('*')
        .eq('article_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setComments(commentsData || []);
      // Fetch all unique author profiles
      const authorIds = Array.from(new Set((commentsData || []).map((c: any) => c.author_id)));
      if (authorIds.length > 0) {
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('user_id, display_name')
          .in('user_id', authorIds);
        const authorMap: Record<string, string> = {};
        (profilesData || []).forEach((p: any) => {
          authorMap[p.user_id] = p.display_name;
        });
        setCommentAuthors(authorMap);
      } else {
        setCommentAuthors({});
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      setAuthDialogOpen(true);
      return;
    }

    try {
      if (liked) {
        // Remove like
        await supabase
          .from('article_likes')
          .delete()
          .eq('article_id', id)
          .eq('user_id', user.id);
        
        // Update likes count
        await supabase
          .from('articles')
          .update({ likes_count: likes - 1 })
          .eq('id', id);
        
        setLiked(false);
        setLikes(prev => prev - 1);
        toast({
          description: "Removed from favorites",
        });
      } else {
        // Add like
        await supabase
          .from('article_likes')
          .insert({
            article_id: id,
            user_id: user.id
          });
        
        // Update likes count
        await supabase
          .from('articles')
          .update({ likes_count: likes + 1 })
          .eq('id', id);
        
        setLiked(true);
        setLikes(prev => prev + 1);
        toast({
          description: "Added to favorites",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleComment = async () => {
    if (!user) {
      setAuthDialogOpen(true);
      return;
    }

    if (!newComment.trim()) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert({
          article_id: id,
          author_id: user.id,
          content: newComment.trim()
        });

      if (error) throw error;

      setNewComment('');
      loadComments(); // Reload comments
      toast({
        description: "Comment posted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
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

          {/* Loading State */}
          {!article ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading article...</p>
            </div>
          ) : (
            /* Article Header */
            <article className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-serif font-semibold leading-tight">
                    {article.title}
                  </h1>
                  {/* Category and Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {article.category && (
                      <Badge className="bg-blue-100 text-blue-800 font-medium">{article.category}</Badge>
                    )}
                    {Array.isArray(article.tags) && article.tags.map((tag: string) => (
                      <Badge key={tag} className="bg-gray-100 text-gray-800">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{article.author_name || article.profiles?.display_name || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(article.published_at).toLocaleDateString()}</span>
                    </div>
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
              <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-ul:text-muted-foreground">
                <div dangerouslySetInnerHTML={{ __html: article.content || '<p>Article content loading...</p>' }} />
              </div>
            </article>
          )}

          {/* Comments Section */}
          <section className="mt-16 space-y-8">
            {!user ? (
              <div className="flex items-center justify-between bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <span className="text-yellow-900 text-base font-medium">
                  Sign in to leave your thoughts and like this article.
                </span>
                <Button variant="outline" size="sm" onClick={() => setAuthDialogOpen(true)} type="button">
                  Sign In
                </Button>
              </div>
            ) : (
              <>
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
                  {loading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Loading comments...
                    </div>
                  ) : comments.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No comments yet. Be the first to share your thoughts!
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <Card key={comment.id}>
                        <CardContent className="p-6">
                          <div className="flex space-x-4">
                            <Avatar>
                              <AvatarFallback>
                                {commentAuthors[comment.author_id]?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">{commentAuthors[comment.author_id] || 'Anonymous'}</span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(comment.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-muted-foreground leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
      
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
};

export default BlogPost;