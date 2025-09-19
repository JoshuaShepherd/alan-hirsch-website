-- Create database schema for Alan Hirsch content management
-- This migration sets up tables for books, chapters, and content management

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create books table
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    author TEXT NOT NULL DEFAULT 'Alan Hirsch',
    description TEXT,
    keywords TEXT[],
    cover_image_url TEXT,
    publication_year INTEGER,
    isbn TEXT,
    total_chapters INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chapters table
CREATE TABLE chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    chapter_number INTEGER NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    keywords TEXT[],
    reading_time INTEGER, -- in minutes
    difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    audio_url TEXT,
    video_url TEXT,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(book_id, slug),
    UNIQUE(book_id, chapter_number)
);

-- Create content_tags table for better categorization
CREATE TABLE content_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#3B82F6',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create junction table for book tags
CREATE TABLE book_tags (
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES content_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, tag_id)
);

-- Create junction table for chapter tags
CREATE TABLE chapter_tags (
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES content_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (chapter_id, tag_id)
);

-- Create search index for full-text search
CREATE INDEX idx_books_search ON books USING gin(to_tsvector('english', title || ' ' || description || ' ' || author));
CREATE INDEX idx_chapters_search ON chapters USING gin(to_tsvector('english', title || ' ' || content || ' ' || summary));

-- Create indexes for performance
CREATE INDEX idx_books_slug ON books(slug);
CREATE INDEX idx_books_status ON books(status);
CREATE INDEX idx_chapters_book_id ON chapters(book_id);
CREATE INDEX idx_chapters_book_slug ON chapters(book_id, slug);
CREATE INDEX idx_chapters_status ON chapters(status);
CREATE INDEX idx_chapters_chapter_number ON chapters(book_id, chapter_number);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON chapters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_tags_updated_at BEFORE UPDATE ON content_tags
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some default tags
INSERT INTO content_tags (name, slug, description, color) VALUES
('Mission', 'mission', 'Missional theology and practice', '#10B981'),
('APEST', 'apest', 'Five-fold ministry and leadership', '#8B5CF6'),
('Church Planting', 'church-planting', 'Church multiplication and planting', '#F59E0B'),
('Leadership', 'leadership', 'Leadership development and training', '#EF4444'),
('Discipleship', 'discipleship', 'Discipleship and spiritual formation', '#06B6D4'),
('Culture', 'culture', 'Cultural engagement and transformation', '#EC4899'),
('Ecclesiology', 'ecclesiology', 'Church structure and theology', '#6366F1'),
('Evangelism', 'evangelism', 'Evangelism and outreach', '#84CC16'),
('Apostolic', 'apostolic', 'Apostolic ministry and imagination', '#F97316'),
('Innovation', 'innovation', 'Innovation and adaptation in ministry', '#14B8A6');

-- Enable Row Level Security (RLS)
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapter_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for books" ON books
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read access for chapters" ON chapters
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read access for content_tags" ON content_tags
    FOR SELECT USING (true);

CREATE POLICY "Public read access for book_tags" ON book_tags
    FOR SELECT USING (true);

CREATE POLICY "Public read access for chapter_tags" ON chapter_tags
    FOR SELECT USING (true);

-- Create admin policies (you can modify these based on your auth setup)
CREATE POLICY "Authenticated users can manage books" ON books
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage chapters" ON chapters
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage tags" ON content_tags
    FOR ALL USING (auth.role() = 'authenticated');

-- Create function to get book with chapters
CREATE OR REPLACE FUNCTION get_book_with_chapters(book_slug TEXT)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'book', json_build_object(
            'id', b.id,
            'title', b.title,
            'slug', b.slug,
            'author', b.author,
            'description', b.description,
            'keywords', b.keywords,
            'cover_image_url', b.cover_image_url,
            'publication_year', b.publication_year,
            'total_chapters', b.total_chapters,
            'created_at', b.created_at,
            'updated_at', b.updated_at
        ),
        'chapters', COALESCE(chapter_array.chapters, '[]'::json)
    ) INTO result
    FROM books b
    LEFT JOIN (
        SELECT 
            book_id,
            json_agg(
                json_build_object(
                    'id', id,
                    'title', title,
                    'slug', slug,
                    'chapter_number', chapter_number,
                    'content', content,
                    'summary', summary,
                    'keywords', keywords,
                    'reading_time', reading_time,
                    'difficulty', difficulty,
                    'audio_url', audio_url,
                    'video_url', video_url,
                    'created_at', created_at,
                    'updated_at', updated_at
                ) ORDER BY chapter_number
            ) as chapters
        FROM chapters
        WHERE status = 'published'
        GROUP BY book_id
    ) chapter_array ON b.id = chapter_array.book_id
    WHERE b.slug = book_slug AND b.status = 'published';
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function for full-text search
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
    
    ORDER BY rank DESC
    LIMIT 50;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;