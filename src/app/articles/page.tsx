import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Articles - Alan Hirsch",
  description: "Read insights on missional church renewal, APEST leadership, and building movements that last.",
};

// Sample articles data
const articles = [
  {
    slug: "forgotten-ways-mission",
    title: "The Forgotten Ways of Mission",
    excerpt: "How the early church's simple practices can revolutionize modern ministry approaches.",
    category: "Missional DNA",
    readTime: "8 min read",
    featured: true,
    date: "February 2025"
  },
  {
    slug: "apest-leadership-teams",
    title: "Building APEST Leadership Teams",
    excerpt: "Practical steps to implement the five-fold ministry in your church leadership structure.",
    category: "APEST",
    readTime: "6 min read",
    featured: true,
    date: "February 2025"
  },
  {
    slug: "post-christendom-evangelism",
    title: "Evangelism in a Post-Christendom Context",
    excerpt: "Rethinking how we share the gospel in secular, post-Christian societies.",
    category: "Evangelism",
    readTime: "7 min read",
    featured: true,
    date: "February 2025"
  },
  {
    slug: "organic-church-multiplication",
    title: "Organic Church Multiplication",
    excerpt: "Why sustainable movements grow from DNA, not programs.",
    category: "Apostolic Movements",
    readTime: "7 min read",
    featured: false,
    date: "January 2025"
  },
  {
    slug: "prophetic-voice-church",
    title: "Recovering the Prophetic Voice in the Church",
    excerpt: "How the prophetic gift challenges complacency and calls the church to its mission.",
    category: "APEST",
    readTime: "9 min read",
    featured: false,
    date: "January 2025"
  },
  {
    slug: "building-movemental-churches",
    title: "Building Churches That Move",
    excerpt: "Essential characteristics of churches that create and sustain movement dynamics.",
    category: "Movement",
    readTime: "10 min read",
    featured: false,
    date: "January 2025"
  },
  {
    slug: "discipleship-or-disciplism",
    title: "Discipleship or Disciplism?",
    excerpt: "Understanding the difference between making disciples and making church members.",
    category: "Discipleship",
    readTime: "5 min read",
    featured: false,
    date: "January 2025"
  },
  {
    slug: "the-shaping-future-church",
    title: "The Shaping of Things to Come",
    excerpt: "How emerging church paradigms are reshaping Christianity for the 21st century.",
    category: "Future Church",
    readTime: "9 min read",
    featured: false,
    date: "December 2024"
  },
  {
    slug: "apostolic-genius-rediscovered", 
    title: "Rediscovering Apostolic Genius",
    excerpt: "The six elements of apostolic genius that drove early Christian movement expansion.",
    category: "Missional DNA",
    readTime: "12 min read",
    featured: false,
    date: "December 2024"
  }
];

export default function Articles() {
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);
  
  // Get unique categories for filtering
  const categories = Array.from(new Set(articles.map(article => article.category)));

  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      {/* Header */}
      <section className="section-padding-lg">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
              Articles & Insights
            </h1>
            <p className="text-xl max-w-content mx-auto leading-relaxed" style={{ color: '#444444' }}>
              Deep thinking on missional church renewal, apostolic movements, and the future of Christianity in a post-Christendom world.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                  style={{ color: '#444444' }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 border border-graphite/20 rounded-lg focus:border-forest focus:outline-none"
                  style={{ backgroundColor: '#F8F8F6' }}
                />
              </div>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button className="px-4 py-2 rounded-lg font-medium transition-colors bg-forest text-paper">
                All Categories
              </button>
              {categories.slice(0, 5).map(category => (
                <button 
                  key={category}
                  className="px-4 py-2 rounded-lg font-medium transition-colors border border-graphite/20 hover:border-forest hover:bg-forest hover:text-paper"
                  style={{ backgroundColor: '#F8F8F6', color: '#444444' }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Featured Articles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <article 
                key={article.slug}
                className="bg-paper rounded-lg p-8 hover:shadow-lg transition-shadow border border-stone"
              >
                <div className="mb-4">
                  <span 
                    className="text-sm font-medium px-3 py-1 rounded-full"
                    style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
                  >
                    {article.category}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: '#111111' }}>
                  {article.title}
                </h3>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: '#444444' }}>
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: '#444444' }}>
                    {article.readTime}
                  </span>
                  <Link 
                    href={`/articles/${article.slug}`}
                    className="font-medium hover:underline"
                    style={{ color: '#1D4A38' }}
                  >
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            All Articles
          </h2>
          
          <div className="grid gap-6">
            {regularArticles.map((article) => (
              <article 
                key={article.slug}
                className="bg-paper border border-stone rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2">
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{ backgroundColor: '#B2613E', color: '#F8F8F6' }}
                      >
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                      {article.title}
                    </h3>
                    <p className="mb-3" style={{ color: '#444444' }}>
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 md:flex-col md:items-end">
                    <span className="text-sm whitespace-nowrap" style={{ color: '#444444' }}>
                      {article.readTime}
                    </span>
                    <Link 
                      href={`/articles/${article.slug}`}
                      className="font-medium hover:underline whitespace-nowrap"
                      style={{ color: '#1D4A38' }}
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-display-md mb-6" style={{ color: '#111111' }}>
            Never Miss an Insight
          </h2>
          <p className="text-lg mb-8" style={{ color: '#444444' }}>
            Get my latest articles and practical insights on building movemental churches delivered monthly to your inbox.
          </p>
          <Link 
            href="/newsletter" 
            className="bg-forest text-paper px-8 py-4 rounded-lg font-medium hover:bg-forest/90 transition-colors inline-block"
            style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </div>
  );
}
