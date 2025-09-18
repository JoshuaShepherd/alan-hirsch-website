#!/bin/bash

# Apply LMS Database Migrations
# This script applies the LMS schema and RLS policies to the Supabase database

set -e

echo "🚀 Applying LMS Database Migrations..."

# Get database URL from environment
if [ -z "$POSTGRES_URL" ]; then
    echo "❌ POSTGRES_URL environment variable not set"
    exit 1
fi

# Apply schema migration
echo "📄 Applying LMS schema..."
psql "$POSTGRES_URL" -f supabase/migrations/lms/001_create_lms_schema.sql

# Apply RLS policies
echo "🔒 Applying RLS policies..."
psql "$POSTGRES_URL" -f supabase/migrations/lms/002_create_rls_policies.sql

# Apply storage bucket setup
echo "📦 Setting up storage bucket..."
psql "$POSTGRES_URL" -f supabase/migrations/lms/002_create_storage_bucket.sql

echo "✅ All LMS migrations applied successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Visit http://localhost:3000/lms/auth to sign up"
echo "3. Visit http://localhost:3000/lms/setup to create your tenant"
echo "4. Visit http://localhost:3000/lms/dashboard to access the LMS"
