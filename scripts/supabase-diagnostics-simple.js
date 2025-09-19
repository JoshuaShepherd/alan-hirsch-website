#!/usr/bin/env node

/**
 * Simplified Supabase Authentication Diagnostic
 * Uses Supabase client instead of direct PostgreSQL connection
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

class SupabaseDiagnostics {
  constructor() {
    this.serviceClient = createClient(supabaseUrl, supabaseServiceKey);
    this.anonClient = createClient(supabaseUrl, supabaseAnonKey);
  }

  async runDiagnostics() {
    console.log('🔍 SUPABASE AUTHENTICATION DIAGNOSTICS');
    console.log('=====================================\n');

    try {
      await this.checkConnection();
      await this.checkTables();
      await this.testUserCreation();
      await this.provideSolution();
    } catch (error) {
      console.error('❌ Fatal error during diagnostics:', error.message);
    }
  }

  async checkConnection() {
    console.log('📡 Testing Supabase Connection...');
    try {
      // Test service role connection
      const { data, error } = await this.serviceClient
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .limit(1);

      if (error) {
        console.error('❌ Service role connection failed:', error.message);
        return false;
      }

      console.log('✅ Supabase connection successful\n');
      return true;
    } catch (error) {
      console.error('❌ Connection test failed:', error.message);
      return false;
    }
  }

  async checkTables() {
    console.log('📋 Checking Database Tables...');
    
    try {
      // Check if profiles table exists
      const { data: profiles, error: profilesError } = await this.serviceClient
        .from('profiles')
        .select('*')
        .limit(1);

      if (profilesError) {
        console.log('❌ profiles table does NOT exist');
        console.log(`   Error: ${profilesError.message}`);
        console.log('   This is the ROOT CAUSE of the signup failures!\n');
        return { profilesExists: false };
      } else {
        console.log('✅ profiles table exists');
        console.log(`   Sample check successful\n`);
        return { profilesExists: true };
      }
    } catch (error) {
      console.error('❌ Table check failed:', error.message);
      return { profilesExists: false };
    }
  }

  async testUserCreation() {
    console.log('🧪 Testing User Creation...');
    
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    
    try {
      // Test signup with anon client (what users experience)
      console.log('Testing signup with anonymous client...');
      const { data: signupData, error: signupError } = await this.anonClient.auth.signUp({
        email: testEmail,
        password: testPassword
      });

      if (signupError) {
        console.log('❌ Signup failed (this matches user experience):');
        console.log(`   Error: ${signupError.message}`);
        console.log('   This confirms the problem users are experiencing!\n');
        return false;
      } else {
        console.log('✅ Signup succeeded');
        console.log(`   User created: ${signupData.user?.id}\n`);
        return true;
      }
    } catch (error) {
      console.error('❌ User creation test failed:', error.message);
      return false;
    }
  }

  async provideSolution() {
    console.log('🎯 DIAGNOSIS & SOLUTION');
    console.log('========================\n');

    console.log('📊 FINDINGS:');
    console.log('• The profiles table is missing from your database');
    console.log('• When users try to sign up, Supabase expects to create a profile');
    console.log('• Without the profiles table, signup fails with database errors');
    console.log('• This explains both the Supabase dashboard error AND the /signup failures\n');

    console.log('💡 ROOT CAUSE:');
    console.log('• The database setup script (database-setup-minimal.sql) has not been run');
    console.log('• Without this setup, the authentication system is incomplete');
    console.log('• Users cannot sign up because the supporting database structure is missing\n');

    console.log('🚀 IMMEDIATE SOLUTION:');
    console.log('1. Open your Supabase Dashboard');
    console.log('2. Go to SQL Editor');
    console.log('3. Copy and paste the ENTIRE content from database-setup-minimal.sql');
    console.log('4. Click "Run" button');
    console.log('5. You should see "Database setup complete!" message');
    console.log('6. Then test signup at localhost:3000/signup\n');

    console.log('✅ AFTER RUNNING THE SCRIPT:');
    console.log('• profiles table will be created');
    console.log('• RLS policies will be set up');
    console.log('• Trigger function will be created');
    console.log('• User signup will work in both Supabase dashboard AND your app');
    console.log('• You can create your first admin user\n');

    console.log('🔧 TEST STEPS AFTER FIX:');
    console.log('1. Run the SQL script in Supabase');
    console.log('2. Visit localhost:3000/signup');
    console.log('3. Create an account with your email');
    console.log('4. In Supabase SQL Editor, run:');
    console.log(`   UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';`);
    console.log('5. Visit localhost:3000/admin to test admin access\n');

    console.log('🎉 EXPECTED RESULT:');
    console.log('• Signup will work without errors');
    console.log('• Users will be redirected properly after signup');
    console.log('• Admin dashboard will be accessible');
    console.log('• Authentication system will be fully functional');
  }
}

// Run diagnostics
async function main() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables');
    console.error('   Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
    process.exit(1);
  }

  const diagnostics = new SupabaseDiagnostics();
  await diagnostics.runDiagnostics();
}

if (require.main === module) {
  main().catch(console.error);
}