-- Create LMS assets storage bucket
-- This migration creates a separate storage bucket for LMS assets

-- Create the lms-assets bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'lms-assets',
    'lms-assets',
    false,
    52428800, -- 50MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'audio/mpeg', 'audio/wav', 'application/pdf', 'text/plain']
);

-- Create storage policies for lms-assets bucket
-- Only tenant members can upload/read files in their tenant folder structure

-- Policy for reading files - tenant members can read their tenant's files
CREATE POLICY "Tenant members can read lms assets" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'lms-assets' AND
        (storage.foldername(name))[1] IN (
            SELECT t.slug FROM lms.tenants t
            JOIN lms.memberships m ON t.id = m.tenant_id
            WHERE m.user_id = auth.uid()
        )
    );

-- Policy for uploading files - tenant admins/editors can upload to their tenant folder
CREATE POLICY "Tenant admins/editors can upload lms assets" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'lms-assets' AND
        (storage.foldername(name))[1] IN (
            SELECT t.slug FROM lms.tenants t
            JOIN lms.memberships m ON t.id = m.tenant_id
            WHERE m.user_id = auth.uid() AND m.role IN ('admin', 'editor')
        )
    );

-- Policy for updating files - tenant admins/editors can update their tenant's files
CREATE POLICY "Tenant admins/editors can update lms assets" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'lms-assets' AND
        (storage.foldername(name))[1] IN (
            SELECT t.slug FROM lms.tenants t
            JOIN lms.memberships m ON t.id = m.tenant_id
            WHERE m.user_id = auth.uid() AND m.role IN ('admin', 'editor')
        )
    );

-- Policy for deleting files - tenant admins can delete their tenant's files
CREATE POLICY "Tenant admins can delete lms assets" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'lms-assets' AND
        (storage.foldername(name))[1] IN (
            SELECT t.slug FROM lms.tenants t
            JOIN lms.memberships m ON t.id = m.tenant_id
            WHERE m.user_id = auth.uid() AND m.role = 'admin'
        )
    );
