require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function checkBlogPost() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase
      .from('blog_posts')
      .select('title, content, slug')
      .eq('slug', 'partner-organization-spotlight')
      .single();
    
    if (error) {
      console.log('Error:', error);
      return;
    }
    
    console.log('=== BLOG POST DATA ===');
    console.log('Title:', data.title);
    console.log('Slug:', data.slug);
    console.log('Content (first 500 chars):');
    console.log(data.content.substring(0, 500));
    console.log('...');
    console.log('Content type:', typeof data.content);
    console.log('Is it markdown?', data.content.includes('#') || data.content.includes('**'));
    console.log('Has line breaks?', data.content.includes('\n'));
    console.log('Starts with HTML?', data.content.trim().startsWith('<'));
    console.log('Contains <p> tags?', data.content.includes('<p>'));
  } catch (err) {
    console.error('Script error:', err);
  }
}

checkBlogPost();