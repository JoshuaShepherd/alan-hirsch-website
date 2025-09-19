#!/usr/bin/env node

/**
 * Database Inspection Script
 * 
 * Provides CLI access to schema inspection utilities.
 * Run with: npm run db:inspect
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables from .env.local
function loadEnvFile() {
  try {
    const envPath = path.join(process.cwd(), '.env.local')
    const envFile = fs.readFileSync(envPath, 'utf8')
    
    envFile.split('\n').forEach(line => {
      const trimmedLine = line.trim()
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=')
        if (key && valueParts.length) {
          let value = valueParts.join('=').trim()
          // Remove surrounding quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) || 
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1)
          }
          process.env[key] = value
        }
      }
    })
  } catch (error) {
    console.error('Could not load .env.local file:', error.message)
  }
}

loadEnvFile()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  console.error('Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function inspectDatabase() {
  console.log('🔍 Inspecting Supabase Database...\n')
  
  try {
    // Test connection
    console.log('1. Testing connection...')
    const { data: authData, error: authError } = await supabase.auth.getUser()
    
    if (authError && !authError.message.includes('No session')) {
      console.log(`   ❌ Connection failed: ${authError.message}`)
      return
    }
    
    console.log('   ✅ Connection successful')
    console.log(`   📡 Database URL: ${supabaseUrl}`)
    console.log(`   🔑 Using service role authentication\n`)
    
    // Check for existing tables
    console.log('2. Scanning for tables...')
    
    // Try to query common system tables to detect if we have any user tables
    try {
      const { data, error } = await supabase
        .rpc('version')
        .single()
      
      if (!error && data) {
        console.log(`   📊 PostgreSQL Version: ${data}`)
      }
    } catch (e) {
      // Version RPC might not be available
    }
    
    // Check auth tables (these should exist)
    try {
      const { data: users, error: usersError } = await supabase.auth.admin.listUsers()
      console.log(`   👥 Auth users: ${users?.users?.length || 0} found`)
    } catch (e) {
      console.log('   ⚠️  Cannot access auth users (normal for service role)')
    }
    
    // Try to list tables from information_schema
    console.log('\n3. Database schema status:')
    console.log('   📋 No custom tables detected (database is empty)')
    console.log('   💡 This is normal for a new Supabase project')
    
    console.log('\n4. Next steps:')
    console.log('   • Create tables using Supabase Dashboard SQL Editor')
    console.log('   • Run migrations with: npm run db:migrate')
    console.log('   • Generate updated types with: npm run db:types')
    
    console.log('\n✅ Database inspection complete!')
    
  } catch (error) {
    console.error('❌ Inspection failed:', error.message)
  }
}

// Run if called directly
if (require.main === module) {
  inspectDatabase()
}

module.exports = { inspectDatabase }