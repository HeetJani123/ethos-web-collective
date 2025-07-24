import { useState, useEffect } from 'react';
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
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { AuthDialog } from '@/components/AuthDialog';

const BlogPost = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<any>(null);

  // Load article and check if user has liked it
  useEffect(() => {
    if (id) {
      loadArticle();
      checkUserLike();
    }
  }, [id, user]);

  const loadArticle = async () => {
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          profiles:author_id (display_name)
        `)
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

  // Load comments from database
  useEffect(() => {
    loadComments();
  }, [id]);

  const loadComments = async () => {
    if (!id) return;
    
    try {
      const { data: commentsData, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          profiles!inner(display_name)
        `)
        .eq('article_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setComments(commentsData || []);
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
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{article.profiles?.display_name || 'Anonymous'}</span>
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
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-semibold">
                Discussion ({comments.length})
              </h3>
              
              {/* Add Comment */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Textarea
                    placeholder={user ? "Share your thoughts on this research..." : "Sign in to comment on this article..."}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                    disabled={!user}
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleComment} disabled={!newComment.trim()}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {user ? "Post Comment" : "Sign in to Comment"}
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
                            {comment.profiles?.display_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{comment.profiles?.display_name || 'Anonymous'}</span>
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
          </section>
        </div>
      </main>
      
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
};

export default BlogPost;