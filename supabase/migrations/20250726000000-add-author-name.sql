-- Add author_name column to articles table
ALTER TABLE public.articles ADD COLUMN author_name TEXT;

-- Update existing articles to have a default author name
UPDATE public.articles SET author_name = 'Anonymous Author' WHERE author_name IS NULL; 