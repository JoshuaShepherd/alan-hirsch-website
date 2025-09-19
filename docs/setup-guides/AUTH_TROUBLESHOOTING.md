# 🔧 Authentication Troubleshooting Guide

## ❌ Current Error: "Failed to create user: Database error creating new user"

This error typically means one of these issues:

### 1. **Database Setup Not Run Yet**
- The `profiles` table doesn't exist
- The trigger function hasn't been created
- RLS policies aren't set up

### 2. **Trigger Function Issues**
- The `handle_new_user()` function has an error
- Missing permissions or syntax issues
- Metadata handling problems

## 🔧 Quick Fix Steps

### Step 1: Run Minimal Setup Script
1. Open Supabase SQL Editor
2. Copy and paste from `database-setup-minimal.sql`
3. Click "Run" - should show "Database setup complete!"

### Step 2: Test User Creation
Try creating a user through the Supabase dashboard first:
1. Go to Authentication → Users in Supabase
2. Click "Create new user"
3. Use the form you see in the screenshot
4. Check "Auto Confirm User"
5. Click "Create user"

### Step 3: Verify Database Setup
Run this query in SQL Editor to check:
```sql
-- Check if table exists
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'profiles';

-- Check if trigger exists
SELECT trigger_name FROM information_schema.triggers 
WHERE event_object_table = 'users' AND trigger_schema = 'auth';

-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables WHERE tablename = 'profiles';
```

### Step 4: Manual Profile Creation (If Needed)
If you create a user through Supabase dashboard but no profile is created:
```sql
-- Replace with actual user ID from auth.users table
INSERT INTO profiles (id, email, role) 
VALUES ('user-uuid-here', 'your-email@example.com', 'admin');
```

## 🚨 Common Issues & Solutions

### Issue: "relation profiles does not exist"
**Solution:** Run the minimal setup script first

### Issue: "function handle_new_user() does not exist"  
**Solution:** The trigger function wasn't created properly

### Issue: "permission denied for schema auth"
**Solution:** Make sure you're running as the postgres user or with sufficient permissions

### Issue: "duplicate key value violates unique constraint"
**Solution:** User already exists, just update their role:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
```

## ✅ Success Indicators

You'll know it's working when:
1. ✅ SQL script runs without errors
2. ✅ Can create users through Supabase dashboard
3. ✅ New users automatically get profiles created
4. ✅ Can sign up through your app at `/signup`

## 🔄 Reset Instructions (If All Else Fails)

If you need to start over:
```sql
-- Drop everything and start fresh
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();
DROP FUNCTION IF EXISTS is_admin();
DROP TABLE IF EXISTS profiles;
```

Then run the minimal setup script again.

## 📞 Next Steps After Fix

1. **Test signup in app** - Visit `/signup` 
2. **Create admin user** - Sign up, then update role to 'admin'
3. **Test admin access** - Visit `/admin` 
4. **Verify protection** - Log out and try accessing `/admin`

The error you're seeing should disappear once the database setup is complete! 🎯