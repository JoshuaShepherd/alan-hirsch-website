-- Create blog posts table and related functionality
-- This migration adds blog posting capability to the content management system

-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id TEXT DEFAULT 'alan-hirsch',
    featured_image_url TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create blog_post_tags junction table
CREATE TABLE blog_post_tags (
    blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES content_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (blog_post_id, tag_id)
);

-- Create indexes for performance
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_search ON blog_posts USING gin(to_tsvector('english', title || ' ' || content || ' ' || COALESCE(excerpt, '')));

-- Add updated_at trigger for blog_posts
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for blog posts
CREATE POLICY "Public read published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for blog post tags
CREATE POLICY "Public read blog post tags" ON blog_post_tags
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage blog post tags" ON blog_post_tags
    FOR ALL USING (auth.role() = 'authenticated');

-- Create function to get blog post with tags
CREATE OR REPLACE FUNCTION get_blog_post_with_tags(post_slug TEXT)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'post', json_build_object(
            'id', bp.id,
            'title', bp.title,
            'slug', bp.slug,
            'content', bp.content,
            'excerpt', bp.excerpt,
            'author_id', bp.author_id,
            'featured_image_url', bp.featured_image_url,
            'status', bp.status,
            'published_at', bp.published_at,
            'created_at', bp.created_at,
            'updated_at', bp.updated_at
        ),
        'tags', COALESCE(tag_array.tags, '[]'::json)
    ) INTO result
    FROM blog_posts bp
    LEFT JOIN (
        SELECT 
            blog_post_id,
            json_agg(
                json_build_object(
                    'id', ct.id,
                    'name', ct.name,
                    'slug', ct.slug,
                    'description', ct.description,
                    'color', ct.color
                )
            ) as tags
        FROM blog_post_tags bpt
        JOIN content_tags ct ON bpt.tag_id = ct.id
        GROUP BY blog_post_id
    ) tag_array ON bp.id = tag_array.blog_post_id
    WHERE bp.slug = post_slug AND bp.status = 'published';
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the search_content function to include blog posts
CREATE OR REPLACE FUNCTION search_content(search_query TEXT)
RETURNS TABLE (
    type TEXT,
    id UUID,
    title TEXT,
    slug TEXT,
    content_snippet TEXT,
    rank REAL
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        'book'::TEXT as type,
        b.id,
        b.title,
        b.slug,
        LEFT(b.description, 200) as content_snippet,
        ts_rank(to_tsvector('english', b.title || ' ' || COALESCE(b.description, '') || ' ' || b.author), plainto_tsquery('english', search_query)) as rank
    FROM books b
    WHERE b.status = 'published'
    AND to_tsvector('english', b.title || ' ' || COALESCE(b.description, '') || ' ' || b.author) @@ plainto_tsquery('english', search_query)
    
    UNION ALL
    
    SELECT 
        'chapter'::TEXT as type,
        c.id,
        c.title,
        c.slug,
        LEFT(c.content, 200) as content_snippet,
        ts_rank(to_tsvector('english', c.title || ' ' || c.content || ' ' || COALESCE(c.summary, '')), plainto_tsquery('english', search_query)) as rank
    FROM chapters c
    WHERE c.status = 'published'
    AND to_tsvector('english', c.title || ' ' || c.content || ' ' || COALESCE(c.summary, '')) @@ plainto_tsquery('english', search_query)
    
    UNION ALL
    
    SELECT 
        'blog_post'::TEXT as type,
        bp.id,
        bp.title,
        bp.slug,
        LEFT(COALESCE(bp.excerpt, bp.content), 200) as content_snippet,
        ts_rank(to_tsvector('english', bp.title || ' ' || bp.content || ' ' || COALESCE(bp.excerpt, '')), plainto_tsquery('english', search_query)) as rank
    FROM blog_posts bp
    WHERE bp.status = 'published'
    AND to_tsvector('english', bp.title || ' ' || bp.content || ' ' || COALESCE(bp.excerpt, '')) @@ plainto_tsquery('english', search_query)
    
    ORDER BY rank DESC
    LIMIT 50;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;