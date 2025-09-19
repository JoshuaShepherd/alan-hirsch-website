#!/usr/bin/env node

/**
 * Supabase Authentication Diagnostic Script
 * 
 * This script will:
 * 1. Connect to your Supabase database
 * 2. Pull comprehensive schema information
 * 3. Test authentication functionality
 * 4. Diagnose why user creation is failing
 */

const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Database configuration  
const dbConfig = {
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
};

class SupabaseDiagnostics {
  constructor() {
    // Create both service role and anon clients
    this.serviceClient = createClient(supabaseUrl, supabaseServiceKey);
    this.anonClient = createClient(supabaseUrl, supabaseAnonKey);
    this.pool = new Pool(dbConfig);
  }

  async runDiagnostics() {
    console.log('🔍 SUPABASE AUTHENTICATION DIAGNOSTICS');
    console.log('=====================================\n');

    try {
      await this.checkConnection();
      await this.getSchemaInfo();
      await this.checkAuthTables();
      await this.checkProfilesTable();
      await this.checkTriggers();
      await this.checkPolicies();
      await this.testUserCreation();
      await this.diagnoseProblem();
    } catch (error) {
      console.error('❌ Fatal error during diagnostics:', error.message);
    } finally {
      await this.pool.end();
    }
  }

  async checkConnection() {
    console.log('📡 Testing Database Connection...');
    try {
      const client = await this.pool.connect();
      const result = await client.query('SELECT version()');
      console.log('✅ Database connected successfully');
      console.log(`   PostgreSQL version: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}\n`);
      client.release();
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      throw error;
    }
  }

  async getSchemaInfo() {
    console.log('📋 Schema Information...');
    try {
      const client = await this.pool.connect();
      
      // Get all tables
      const tablesQuery = `
        SELECT schemaname, tablename, tableowner 
        FROM pg_tables 
        WHERE schemaname IN ('public', 'auth')
        ORDER BY schemaname, tablename;
      `;
      const tables = await client.query(tablesQuery);
      
      console.log('📊 Database Tables:');
      tables.rows.forEach(table => {
        console.log(`   ${table.schemaname}.${table.tablename} (owner: ${table.tableowner})`);
      });

      // Get all functions
      const functionsQuery = `
        SELECT schemaname, functionname, returntype
        FROM pg_functions 
        WHERE schemaname IN ('public', 'auth')
        ORDER BY schemaname, functionname;
      `;
      const functions = await client.query(functionsQuery);
      
      console.log('\n🔧 Database Functions:');
      functions.rows.forEach(func => {
        console.log(`   ${func.schemaname}.${func.functionname}() -> ${func.returntype}`);
      });

      client.release();
      console.log('');
    } catch (error) {
      console.error('❌ Failed to get schema info:', error.message);
    }
  }

  async checkAuthTables() {
    console.log('🔐 Checking Auth Schema...');
    try {
      const client = await this.pool.connect();
      
      // Check auth.users table
      const authUsersQuery = `
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_schema = 'auth' AND table_name = 'users'
        ORDER BY ordinal_position;
      `;
      const authUsers = await client.query(authUsersQuery);
      
      if (authUsers.rows.length > 0) {
        console.log('✅ auth.users table exists with columns:');
        authUsers.rows.forEach(col => {
          console.log(`   ${col.column_name} (${col.data_type}, nullable: ${col.is_nullable})`);
        });
      } else {
        console.log('❌ auth.users table not found');
      }

      // Check existing users
      const userCountQuery = 'SELECT COUNT(*) as count FROM auth.users';
      const userCount = await client.query(userCountQuery);
      console.log(`📊 Current users in auth.users: ${userCount.rows[0].count}`);

      client.release();
      console.log('');
    } catch (error) {
      console.error('❌ Failed to check auth tables:', error.message);
    }
  }

  async checkProfilesTable() {
    console.log('👤 Checking Profiles Table...');
    try {
      const client = await this.pool.connect();
      
      // Check if profiles table exists
      const profilesExistQuery = `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = 'profiles'
        );
      `;
      const profilesExist = await client.query(profilesExistQuery);
      
      if (profilesExist.rows[0].exists) {
        console.log('✅ profiles table exists');
        
        // Get column info
        const columnsQuery = `
          SELECT column_name, data_type, column_default, is_nullable
          FROM information_schema.columns 
          WHERE table_schema = 'public' AND table_name = 'profiles'
          ORDER BY ordinal_position;
        `;
        const columns = await client.query(columnsQuery);
        
        console.log('📋 Profiles table structure:');
        columns.rows.forEach(col => {
          console.log(`   ${col.column_name} (${col.data_type}, default: ${col.column_default}, nullable: ${col.is_nullable})`);
        });

        // Check RLS status
        const rlsQuery = `
          SELECT schemaname, tablename, rowsecurity 
          FROM pg_tables 
          WHERE schemaname = 'public' AND tablename = 'profiles';
        `;
        const rls = await client.query(rlsQuery);
        console.log(`🔒 RLS enabled: ${rls.rows[0]?.rowsecurity || 'unknown'}`);

        // Count profiles
        const profileCountQuery = 'SELECT COUNT(*) as count FROM profiles';
        const profileCount = await client.query(profileCountQuery);
        console.log(`📊 Current profiles: ${profileCount.rows[0].count}`);
        
      } else {
        console.log('❌ profiles table does NOT exist - This is likely the problem!');
      }

      client.release();
      console.log('');
    } catch (error) {
      console.error('❌ Failed to check profiles table:', error.message);
    }
  }

  async checkTriggers() {
    console.log('⚡ Checking Triggers...');
    try {
      const client = await this.pool.connect();
      
      const triggersQuery = `
        SELECT 
          trigger_name,
          event_object_schema,
          event_object_table,
          action_statement
        FROM information_schema.triggers
        WHERE event_object_schema = 'auth' AND event_object_table = 'users'
        ORDER BY trigger_name;
      `;
      const triggers = await client.query(triggersQuery);
      
      if (triggers.rows.length > 0) {
        console.log('✅ Found triggers on auth.users:');
        triggers.rows.forEach(trigger => {
          console.log(`   ${trigger.trigger_name}: ${trigger.action_statement}`);
        });
      } else {
        console.log('❌ No triggers found on auth.users - This could be the problem!');
      }

      // Check if our specific function exists
      const functionQuery = `
        SELECT proname, prosrc 
        FROM pg_proc 
        WHERE proname = 'handle_new_user';
      `;
      const functions = await client.query(functionQuery);
      
      if (functions.rows.length > 0) {
        console.log('✅ handle_new_user() function exists');
      } else {
        console.log('❌ handle_new_user() function does NOT exist - This is likely the problem!');
      }

      client.release();
      console.log('');
    } catch (error) {
      console.error('❌ Failed to check triggers:', error.message);
    }
  }

  async checkPolicies() {
    console.log('🛡️ Checking RLS Policies...');
    try {
      const client = await this.pool.connect();
      
      const policiesQuery = `
        SELECT 
          schemaname,
          tablename,
          policyname,
          permissive,
          roles,
          cmd,
          qual,
          with_check
        FROM pg_policies
        WHERE schemaname = 'public'
        ORDER BY tablename, policyname;
      `;
      const policies = await client.query(policiesQuery);
      
      if (policies.rows.length > 0) {
        console.log('✅ Found RLS policies:');
        policies.rows.forEach(policy => {
          console.log(`   ${policy.tablename}.${policy.policyname} (${policy.cmd})`);
          console.log(`     Condition: ${policy.qual || 'none'}`);
        });
      } else {
        console.log('❌ No RLS policies found');
      }

      client.release();
      console.log('');
    } catch (error) {
      console.error('❌ Failed to check policies:', error.message);
    }
  }

  async testUserCreation() {
    console.log('🧪 Testing User Creation...');
    
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    
    try {
      // Test with service role client (should work)
      console.log('Testing with service role client...');
      const { data: serviceUser, error: serviceError } = await this.serviceClient.auth.admin.createUser({
        email: testEmail,
        password: testPassword,
        email_confirm: true
      });

      if (serviceError) {
        console.log('❌ Service role user creation failed:', serviceError.message);
      } else {
        console.log('✅ Service role user creation succeeded');
        console.log(`   User ID: ${serviceUser.user.id}`);
        
        // Clean up test user
        await this.serviceClient.auth.admin.deleteUser(serviceUser.user.id);
        console.log('🧹 Test user cleaned up');
      }

      // Test with anon client (normal signup flow)
      console.log('\nTesting with anonymous client (normal signup)...');
      const { data: anonUser, error: anonError } = await this.anonClient.auth.signUp({
        email: `anon-${Date.now()}@example.com`,
        password: testPassword
      });

      if (anonError) {
        console.log('❌ Anonymous signup failed:', anonError.message);
        console.log('   This matches the error users are experiencing!');
      } else {
        console.log('✅ Anonymous signup succeeded');
        console.log(`   User ID: ${anonUser.user?.id}`);
      }

    } catch (error) {
      console.error('❌ User creation test failed:', error.message);
    }
    
    console.log('');
  }

  async diagnoseProblem() {
    console.log('🔍 DIAGNOSIS & RECOMMENDATIONS');
    console.log('===============================\n');

    try {
      const client = await this.pool.connect();
      
      // Check what's missing
      const checks = {
        profilesTable: false,
        handleNewUserFunction: false,
        authTrigger: false,
        rlsPolicies: false
      };

      // Check profiles table
      const profilesCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = 'profiles'
        );
      `);
      checks.profilesTable = profilesCheck.rows[0].exists;

      // Check function
      const functionCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM pg_proc 
          WHERE proname = 'handle_new_user'
        );
      `);
      checks.handleNewUserFunction = functionCheck.rows[0].exists;

      // Check trigger
      const triggerCheck = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.triggers
          WHERE event_object_schema = 'auth' 
          AND event_object_table = 'users'
          AND trigger_name = 'on_auth_user_created'
        );
      `);
      checks.authTrigger = triggerCheck.rows[0].exists;

      // Check policies
      const policyCheck = await client.query(`
        SELECT COUNT(*) as count
        FROM pg_policies
        WHERE schemaname = 'public' AND tablename = 'profiles';
      `);
      checks.rlsPolicies = policyCheck.rows[0].count > 0;

      // Generate diagnosis
      console.log('📊 SYSTEM STATUS:');
      console.log(`   ✅ Database Connection: Working`);
      console.log(`   ${checks.profilesTable ? '✅' : '❌'} Profiles Table: ${checks.profilesTable ? 'Exists' : 'Missing'}`);
      console.log(`   ${checks.handleNewUserFunction ? '✅' : '❌'} Handle New User Function: ${checks.handleNewUserFunction ? 'Exists' : 'Missing'}`);
      console.log(`   ${checks.authTrigger ? '✅' : '❌'} Auth Trigger: ${checks.authTrigger ? 'Exists' : 'Missing'}`);
      console.log(`   ${checks.rlsPolicies ? '✅' : '❌'} RLS Policies: ${checks.rlsPolicies ? 'Configured' : 'Missing'}`);

      console.log('\n🎯 ROOT CAUSE ANALYSIS:');
      
      if (!checks.profilesTable) {
        console.log('❌ CRITICAL: profiles table does not exist');
        console.log('   When users sign up, Supabase tries to trigger profile creation');
        console.log('   But the trigger fails because the profiles table is missing');
        console.log('   This causes the entire signup process to fail');
      }

      if (!checks.handleNewUserFunction) {
        console.log('❌ CRITICAL: handle_new_user() function does not exist');
        console.log('   The trigger cannot execute without this function');
      }

      if (!checks.authTrigger) {
        console.log('❌ CRITICAL: on_auth_user_created trigger does not exist');
        console.log('   Without this trigger, profiles are never created for new users');
      }

      console.log('\n💡 SOLUTION:');
      console.log('   1. Run the database-setup-minimal.sql script in Supabase SQL Editor');
      console.log('   2. This will create all missing components');
      console.log('   3. Then test signup again at /signup');
      console.log('   4. Users should be able to create accounts successfully');

      console.log('\n🚀 NEXT STEPS:');
      console.log('   1. Copy database-setup-minimal.sql content');
      console.log('   2. Go to Supabase Dashboard → SQL Editor');
      console.log('   3. Paste and run the script');
      console.log('   4. Look for "Database setup complete!" message');
      console.log('   5. Test signup at localhost:3000/signup');

      client.release();

    } catch (error) {
      console.error('❌ Failed to complete diagnosis:', error.message);
    }
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

module.exports = SupabaseDiagnostics;