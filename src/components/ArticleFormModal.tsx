import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ArticleFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isMember: boolean;
  user?: { id: string } | null;
  onArticlePosted?: () => void;
}

export const ArticleFormModal: React.FC<ArticleFormModalProps> = ({ open, onOpenChange, isMember, user, onArticlePosted }) => {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [category, setCategory] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const handleCategoryInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (categoryInput.trim()) {
        setCategory(categoryInput.trim());
        setCategoryInput('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('articles').insert({
        title,
        author_name: authorName,
        excerpt,
        content,
        author_id: user.id,
        tags,
        category,
        published_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast({ title: 'Success', description: 'Article posted successfully!' });
      onOpenChange(false);
      setTitle(''); setAuthorName(''); setExcerpt(''); setContent(''); setTags([]); setCategory('');
      if (onArticlePosted) onArticlePosted();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Artificial Intelligence',
    'Bio Technology',
    'Climate Technology',
    'Med Society',
    'Stem Ethics',
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif">Post New Article</DialogTitle>
          <DialogDescription>
            Share your research, insights, or stories with the community.
          </DialogDescription>
        </DialogHeader>
        {isMember ? (
          <form onSubmit={handleSubmit} className="space-y-6 mt-2">
            <div>
              <label className="block text-lg font-medium mb-1">Title</label>
              <Input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter article title"
                required
                className="text-2xl font-serif px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-base font-medium mb-1">Author Name</label>
              <Input
                type="text"
                value={authorName}
                onChange={e => setAuthorName(e.target.value)}
                placeholder="Enter author name"
                required
                className="px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-base font-medium mb-1">Excerpt</label>
              <Textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                placeholder="Short summary of your article"
                rows={2}
                className="resize-none"
              />
            </div>
            <div>
              <label className="block text-base font-medium mb-1">Content</label>
              <Textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Write your article here..."
                rows={10}
                className="prose prose-lg w-full min-h-[200px]"
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium mb-1">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <Badge key={tag} className="flex items-center gap-1 px-2 py-1">
                    {tag}
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={e => { e.stopPropagation(); removeTag(tag); }}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); removeTag(tag); } }}
                      className="ml-1 text-xs cursor-pointer select-none p-1 rounded-full transition-colors hover:bg-red-100 hover:text-red-600 focus:bg-red-200 focus:text-red-700"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X className="w-3 h-3" />
                    </span>
                  </Badge>
                ))}
              </div>
              <Input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                placeholder="Add a tag and press Enter"
              />
            </div>
            <div>
              <label className="block text-base font-medium mb-1">Category</label>
              <select
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="px-8 py-2 text-lg" disabled={loading}>{loading ? 'Posting...' : 'Post Article'}</Button>
            </div>
          </form>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Only members can post articles. Please contact the admin for access.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}; 