# Complete Supabase Authentication Setup Guide for Alan Hirsch Website

## 🎯 Overview

This guide provides step-by-step instructions for setting up comprehensive Supabase authentication in the Alan Hirsch Next.js website, covering admin authentication, subscriber management, payments integration, and complete security configuration.

## 📋 Table of Contents

1. [Current Project Status](#current-project-status)
2. [Environment Setup](#environment-setup)
3. [Supabase Client Configuration](#supabase-client-configuration)
4. [Authentication Flow Implementation](#authentication-flow-implementation)
5. [Row Level Security (RLS) Setup](#row-level-security-rls-setup)
6. [User Roles & Permissions](#user-roles--permissions)
7. [Payment Integration](#payment-integration)
8. [Admin Dashboard Security](#admin-dashboard-security)
9. [Subscriber Management](#subscriber-management)
10. [Testing & Deployment](#testing--deployment)

---

## 🔍 Current Project Status

**Based on analysis of the codebase:**

✅ **Already Implemented:**
- Next.js 15.5.0 with App Router
- Supabase client configuration in `src/lib/supabase.ts`
- Database schema with migrations
- Admin components architecture
- TypeScript types in `src/types/database.types.ts`

🔄 **Needs Implementation:**
- Authentication middleware
- Login/signup pages
- RLS policies
- User role management
- Payment integration
- Protected routes

---

## 🛠️ Environment Setup

### 1. Supabase Project Configuration

First, ensure your Supabase project is properly configured:

```bash
# Check current Supabase connection status
supabase status

# If not linked, link to your project
supabase link --project-ref YOUR_PROJECT_REF
```

### 2. Environment Variables

Update your `.env.local` file with the required Supabase variables:

```bash
# .env.local

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Auth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Payment Integration (for Stripe/other providers)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Install Required Packages

```bash
# Install Supabase SSR package for Next.js App Router
npm install @supabase/ssr

# Install additional auth dependencies
npm install @supabase/auth-helpers-nextjs
npm install bcryptjs
npm install jose  # For JWT handling
```

---

## ⚙️ Supabase Client Configuration

### 1. Update Supabase Client Files

Create the proper client configuration for Next.js App Router:

**`src/lib/supabase/client.ts`**
```typescript
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database.types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
}
```

**`src/lib/supabase/server.ts`**
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

**`src/lib/supabase/middleware.ts`**
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  await supabase.auth.getUser()

  return response
}
```

### 2. Create Middleware

**`src/middleware.ts`**
```typescript
import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public images
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

---

## 🔐 Authentication Flow Implementation

### 1. Create Authentication Actions

**`src/lib/auth-actions.ts`**
```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/admin')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}

export async function getUser() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }
  
  return user
}
```

### 2. Create Login Page

**`src/app/login/page.tsx`**
```tsx
import { login, signup } from '@/lib/auth-actions'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Alan Hirsch',
  description: 'Sign in to access your account and exclusive content.',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="flex space-x-4">
            <button
              formAction={login}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
            <button
              formAction={signup}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
```

### 3. Create Auth Confirmation Route

**`src/app/auth/confirm/route.ts`**
```typescript
import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/'

  if (token_hash && type) {
    const supabase = await createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      // Redirect user to specified redirect URL or root of app
      redirect(next)
    }
  }

  // Redirect the user to an error page with some instructions
  redirect('/error')
}
```

---

## 🛡️ Row Level Security (RLS) Setup

### 1. Enable RLS on All Tables

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable RLS on all existing tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_tags ENABLE ROW LEVEL SECURITY;

-- Create user profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'subscriber' CHECK (role IN ('subscriber', 'admin', 'creator')),
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium', 'pro')),
  subscription_end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
```

### 2. Create Essential RLS Policies

```sql
-- User profiles policies
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
  ON profiles FOR SELECT 
  TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Blog posts policies
CREATE POLICY "Published blog posts are viewable by everyone" 
  ON blog_posts FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Admin can manage all blog posts" 
  ON blog_posts FOR ALL 
  TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'creator'));

-- Books and chapters policies  
CREATE POLICY "Free content is viewable by everyone" 
  ON chapters FOR SELECT 
  USING (is_free = true);

CREATE POLICY "Premium content requires subscription" 
  ON chapters FOR SELECT 
  TO authenticated
  USING (
    is_free = true OR 
    (SELECT subscription_status FROM profiles WHERE id = auth.uid()) IN ('premium', 'pro')
  );

-- Tags policies
CREATE POLICY "Tags are viewable by everyone" 
  ON tags FOR SELECT 
  USING (true);

CREATE POLICY "Admin can manage tags" 
  ON tags FOR ALL 
  TO authenticated
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) IN ('admin', 'creator'));
```

### 3. Create User Management Functions

```sql
-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT role = 'admin' 
    FROM profiles 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check subscription status
CREATE OR REPLACE FUNCTION has_active_subscription()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT 
      subscription_status IN ('premium', 'pro') AND 
      (subscription_end_date IS NULL OR subscription_end_date > NOW())
    FROM profiles 
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 👥 User Roles & Permissions

### 1. Define User Roles

Create a comprehensive role system:

```sql
-- Create user roles enum if not exists
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('subscriber', 'premium', 'admin', 'creator');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Update profiles table to use enum
ALTER TABLE profiles 
ALTER COLUMN role TYPE user_role USING role::user_role;

-- Create permissions table
CREATE TABLE IF NOT EXISTS role_permissions (
  id SERIAL PRIMARY KEY,
  role user_role NOT NULL,
  permission TEXT NOT NULL,
  UNIQUE(role, permission)
);

-- Insert default permissions
INSERT INTO role_permissions (role, permission) VALUES
  ('subscriber', 'read_free_content'),
  ('premium', 'read_free_content'),
  ('premium', 'read_premium_content'),
  ('admin', 'read_free_content'),
  ('admin', 'read_premium_content'),
  ('admin', 'manage_users'),
  ('admin', 'manage_content'),
  ('admin', 'manage_blog'),
  ('admin', 'view_analytics'),
  ('creator', 'read_free_content'),
  ('creator', 'read_premium_content'),
  ('creator', 'manage_content'),
  ('creator', 'manage_blog')
ON CONFLICT (role, permission) DO NOTHING;
```

### 2. Create Role Check Functions

```sql
-- Function to check if user has specific permission
CREATE OR REPLACE FUNCTION user_has_permission(permission_name TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM profiles p
    JOIN role_permissions rp ON p.role = rp.role
    WHERE p.id = auth.uid() 
    AND rp.permission = permission_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to make user admin (only callable by existing admin)
CREATE OR REPLACE FUNCTION make_user_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Check if current user is admin
  IF NOT is_admin() THEN
    RAISE EXCEPTION 'Only admins can promote users';
  END IF;

  -- Find target user
  SELECT au.id INTO target_user_id
  FROM auth.users au
  WHERE au.email = user_email;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;

  -- Update user role
  UPDATE profiles 
  SET role = 'admin', updated_at = NOW()
  WHERE id = target_user_id;

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## 💳 Payment Integration

### 1. Create Subscription Tables

```sql
-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive',
  price_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create payment history table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id),
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER NOT NULL, -- Amount in cents
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Subscription policies
CREATE POLICY "Users can view their own subscriptions" 
  ON subscriptions FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Admin can view all subscriptions" 
  ON subscriptions FOR SELECT 
  TO authenticated
  USING (is_admin());

-- Payment policies
CREATE POLICY "Users can view their own payments" 
  ON payments FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Admin can view all payments" 
  ON payments FOR SELECT 
  TO authenticated
  USING (is_admin());
```

### 2. Stripe Webhook Handler

**`src/app/api/webhooks/stripe/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createClient()

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        await supabase
          .from('subscriptions')
          .upsert({
            stripe_subscription_id: subscription.id,
            stripe_customer_id: subscription.customer as string,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
        
        // Update user subscription status
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        if (customer && 'email' in customer && customer.email) {
          await supabase
            .from('profiles')
            .update({
              subscription_status: subscription.status === 'active' ? 'premium' : 'free',
              subscription_end_date: new Date(subscription.current_period_end * 1000).toISOString(),
            })
            .eq('email', customer.email)
        }
        
        break
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', subscription.id)
        
        // Update user subscription status
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        if (customer && 'email' in customer && customer.email) {
          await supabase
            .from('profiles')
            .update({
              subscription_status: 'free',
              subscription_end_date: null,
            })
            .eq('email', customer.email)
        }
        
        break
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        
        // Record payment
        await supabase
          .from('payments')
          .insert({
            stripe_payment_intent_id: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
          })
        
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
```

---

## 🔒 Admin Dashboard Security

### 1. Create Admin Route Protection

**`src/app/admin/layout.tsx`**
```tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Check if user has admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (!profile || !['admin', 'creator'].includes(profile.role)) {
    redirect('/unauthorized')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Alan Hirsch Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user.email}
              </span>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
```

### 2. Create Permission-Based Components

**`src/components/auth/RequirePermission.tsx`**
```tsx
'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface RequirePermissionProps {
  permission: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function RequirePermission({ 
  permission, 
  children, 
  fallback = <div>Access denied</div> 
}: RequirePermissionProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function checkPermission() {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setHasPermission(false)
        return
      }

      const { data } = await supabase
        .rpc('user_has_permission', { permission_name: permission })
      
      setHasPermission(data === true)
    }

    checkPermission()
  }, [permission, supabase])

  if (hasPermission === null) {
    return <div>Loading...</div>
  }

  return hasPermission ? <>{children}</> : <>{fallback}</>
}
```

---

## 👥 Subscriber Management

### 1. Create User Management API

**`src/app/api/admin/users/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  
  // Verify admin access
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Get all users with their subscription status
  const { data: users, error } = await supabase
    .from('profiles')
    .select(`
      id,
      email,
      full_name,
      role,
      subscription_status,
      subscription_end_date,
      created_at,
      subscriptions (
        status,
        current_period_end
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ users })
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient()
  const body = await request.json()
  const { userId, updates } = body
  
  // Verify admin access
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (!profile || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Update user
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ user: data })
}
```

### 2. Create Subscription Management

**`src/app/api/subscriptions/create/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { priceId } = await request.json()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Create or retrieve Stripe customer
    let customerId: string
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('email')
      .eq('id', user.id)
      .single()

    const existingCustomers = await stripe.customers.list({
      email: profile?.email,
      limit: 1,
    })

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id
    } else {
      const customer = await stripe.customers.create({
        email: profile?.email,
        metadata: {
          supabaseUserId: user.id,
        },
      })
      customerId = customer.id
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      metadata: {
        supabaseUserId: user.id,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
```

---

## 🧪 Testing & Deployment

### 1. Test Authentication Flow

Create a test script to verify your auth setup:

**`scripts/test-auth.js`**
```javascript
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function testAuth() {
  console.log('Testing Supabase Authentication...')
  
  // Test sign up
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: 'test@example.com',
    password: 'testpassword123',
  })
  
  if (signUpError) {
    console.error('Sign up error:', signUpError)
  } else {
    console.log('Sign up successful:', signUpData.user?.email)
  }
  
  // Test sign in
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: 'test@example.com',
    password: 'testpassword123',
  })
  
  if (signInError) {
    console.error('Sign in error:', signInError)
  } else {
    console.log('Sign in successful:', signInData.user?.email)
  }
  
  // Test RLS policies
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
  
  if (profilesError) {
    console.error('RLS error:', profilesError)
  } else {
    console.log('RLS working, profiles:', profiles.length)
  }
}

testAuth()
```

### 2. Pre-Deployment Checklist

- [ ] **Environment Variables Set**
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] Stripe keys (if using payments)

- [ ] **Database Setup**
  - [ ] All tables have RLS enabled
  - [ ] RLS policies created and tested
  - [ ] User roles and permissions configured
  - [ ] Database functions created

- [ ] **Authentication Flow**
  - [ ] Login/signup pages working
  - [ ] Email confirmation working
  - [ ] Password reset working
  - [ ] Protected routes working

- [ ] **Admin Access**
  - [ ] Admin user created
  - [ ] Admin dashboard accessible
  - [ ] Permission checks working

- [ ] **Payments (if applicable)**
  - [ ] Stripe webhook configured
  - [ ] Subscription flow tested
  - [ ] Payment recording working

### 3. Create Admin User

Run this SQL to create your first admin user:

```sql
-- First, sign up through your app with your email
-- Then run this to make yourself admin
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

---

## 🚀 Next Steps

After completing this setup:

1. **Test thoroughly** in development
2. **Deploy to staging** environment
3. **Configure production environment variables**
4. **Set up monitoring** for auth events
5. **Create backup procedures** for user data
6. **Document admin procedures** for team members

---

## 📞 Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Auth**: https://nextjs.org/docs/authentication
- **Stripe Integration**: https://stripe.com/docs/payments/checkout
- **RLS Best Practices**: https://supabase.com/docs/guides/database/postgres/row-level-security

This guide provides a complete foundation for authentication in your Alan Hirsch website. Adjust the specifics based on your exact requirements and business logic.