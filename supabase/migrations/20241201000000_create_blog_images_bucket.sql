-- Create blog images storage bucket
-- This migration creates a dedicated storage bucket for blog post images

-- Create the blog-images bucket with larger size limits for high-quality images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'blog-images',
    'blog-images',
    true, -- Public bucket for blog images
    10485760, -- 10MB limit for high-quality images
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
);

-- Create storage policies for blog-images bucket
-- Allow authenticated users to upload, but anyone can read (public blog)

-- Policy for reading files - anyone can read blog images (public bucket)
CREATE POLICY "Anyone can view blog images" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'blog-images'
    );

-- Policy for uploading files - authenticated users can upload blog images
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'blog-images' AND
        auth.role() = 'authenticated'
    );

-- Policy for updating files - users can update their own uploaded images
CREATE POLICY "Users can update their own blog images" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'blog-images' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Policy for deleting files - users can delete their own uploaded images
CREATE POLICY "Users can delete their own blog images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'blog-images' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );