-- Blog Database Optimizations
-- Run this after your basic blog_posts table is created

-- Add missing fields for enhanced blog functionality
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[],
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS read_time_minutes INTEGER,
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Add search vector for full-text search
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS search_vector tsvector 
GENERATED ALWAYS AS (
  to_tsvector('english', title || ' ' || COALESCE(excerpt, '') || ' ' || content)
) STORED;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status_published 
ON blog_posts(status, published_at DESC) 
WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_blog_posts_featured 
ON blog_posts(is_featured, published_at DESC) 
WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_blog_posts_category 
ON blog_posts(category, published_at DESC) 
WHERE status = 'published' AND category IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_blog_posts_author 
ON blog_posts(author_id, published_at DESC) 
WHERE status = 'published';

CREATE INDEX IF NOT EXISTS idx_blog_posts_search 
ON blog_posts USING GIN(search_vector);

CREATE INDEX IF NOT EXISTS idx_blog_posts_tags 
ON blog_posts USING GIN(tags) 
WHERE tags IS NOT NULL;

-- Create view for published posts with common filters
CREATE OR REPLACE VIEW published_blog_posts AS
SELECT 
  id,
  title,
  slug,
  content,
  excerpt,
  featured_image_url,
  author_id,
  published_at,
  created_at,
  updated_at,
  meta_description,
  tags,
  category,
  read_time_minutes,
  view_count,
  is_featured,
  search_vector
FROM blog_posts 
WHERE status = 'published'
ORDER BY published_at DESC;

-- Function to update view count
CREATE OR REPLACE FUNCTION increment_blog_post_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE blog_posts 
  SET view_count = view_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update search vector when content changes
CREATE OR REPLACE FUNCTION update_blog_post_search_vector()
RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', NEW.title || ' ' || COALESCE(NEW.excerpt, '') || ' ' || NEW.content);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update search vector
DROP TRIGGER IF EXISTS update_blog_post_search_vector_trigger ON blog_posts;
CREATE TRIGGER update_blog_post_search_vector_trigger
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_post_search_vector();

-- Function to automatically calculate reading time
CREATE OR REPLACE FUNCTION calculate_reading_time(content_text TEXT)
RETURNS INTEGER AS $$
DECLARE
  word_count INTEGER;
  reading_time INTEGER;
BEGIN
  -- Count words (split by whitespace)
  word_count := array_length(string_to_array(content_text, ' '), 1);
  
  -- Calculate reading time (200 words per minute)
  reading_time := CEIL(word_count::FLOAT / 200);
  
  -- Minimum 1 minute
  RETURN GREATEST(reading_time, 1);
END;
$$ LANGUAGE plpgsql;

-- Function to auto-update reading time
CREATE OR REPLACE FUNCTION update_blog_post_reading_time()
RETURNS trigger AS $$
BEGIN
  NEW.read_time_minutes := calculate_reading_time(NEW.content);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update reading time
DROP TRIGGER IF EXISTS update_blog_post_reading_time_trigger ON blog_posts;
CREATE TRIGGER update_blog_post_reading_time_trigger
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_post_reading_time();

-- Create materialized view for popular posts
CREATE MATERIALIZED VIEW IF NOT EXISTS popular_blog_posts AS
SELECT 
  id,
  title,
  slug,
  excerpt,
  featured_image_url,
  published_at,
  view_count,
  category,
  tags,
  is_featured
FROM blog_posts 
WHERE status = 'published' 
ORDER BY view_count DESC, published_at DESC
LIMIT 10;

-- Function to refresh popular posts
CREATE OR REPLACE FUNCTION refresh_popular_blog_posts()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW popular_blog_posts;
END;
$$ LANGUAGE plpgsql;

-- Create function for search with ranking
CREATE OR REPLACE FUNCTION search_blog_posts(
  search_query TEXT,
  result_limit INTEGER DEFAULT 10
)
RETURNS TABLE(
  id UUID,
  title TEXT,
  slug TEXT,
  excerpt TEXT,
  featured_image_url TEXT,
  published_at TIMESTAMPTZ,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    bp.id,
    bp.title,
    bp.slug,
    bp.excerpt,
    bp.featured_image_url,
    bp.published_at,
    ts_rank(bp.search_vector, plainto_tsquery('english', search_query)) AS rank
  FROM blog_posts bp
  WHERE 
    bp.status = 'published' 
    AND bp.search_vector @@ plainto_tsquery('english', search_query)
  ORDER BY rank DESC, bp.published_at DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql;

-- Add RLS policies for blog posts (if using Row Level Security)
-- Enable RLS if not already enabled
-- ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy to allow reading published posts
-- CREATE POLICY "Anyone can read published blog posts" 
--   ON blog_posts FOR SELECT 
--   USING (status = 'published');

-- Policy for authenticated users to manage their own posts
-- CREATE POLICY "Users can manage their own blog posts" 
--   ON blog_posts FOR ALL 
--   USING (auth.uid() = author_id);

-- Policy for admins to manage all posts
-- CREATE POLICY "Admins can manage all blog posts" 
--   ON blog_posts FOR ALL 
--   TO authenticated
--   USING (
--     EXISTS (
--       SELECT 1 FROM profiles 
--       WHERE profiles.id = auth.uid() 
--       AND profiles.role = 'admin'
--     )
--   );

-- Create helpful stats function
CREATE OR REPLACE FUNCTION get_blog_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_posts', (SELECT COUNT(*) FROM blog_posts WHERE status = 'published'),
    'total_views', (SELECT SUM(view_count) FROM blog_posts WHERE status = 'published'),
    'total_categories', (SELECT COUNT(DISTINCT category) FROM blog_posts WHERE status = 'published' AND category IS NOT NULL),
    'total_tags', (SELECT COUNT(DISTINCT unnest(tags)) FROM blog_posts WHERE status = 'published' AND tags IS NOT NULL),
    'average_reading_time', (SELECT AVG(read_time_minutes) FROM blog_posts WHERE status = 'published'),
    'most_popular_post', (
      SELECT json_build_object('title', title, 'slug', slug, 'views', view_count)
      FROM blog_posts 
      WHERE status = 'published' 
      ORDER BY view_count DESC 
      LIMIT 1
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;