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
    featured: true
  },
  {
    slug: "apest-leadership-teams",
    title: "Building APEST Leadership Teams",
    excerpt: "Practical steps to implement the five-fold ministry in your church leadership structure.",
    category: "APEST",
    readTime: "6 min read",
    featured: true
  },
  {
    slug: "post-christendom-evangelism",
    title: "Evangelism in a Post-Christendom Context",
    excerpt: "Rethinking how we share the gospel in secular, post-Christian societies.",
    category: "Cultural Analysis",
    readTime: "10 min read",
    featured: false
  },
  {
    slug: "organic-church-multiplication",
    title: "Organic Church Multiplication",
    excerpt: "Why sustainable movements grow from DNA, not programs.",
    category: "Apostolic Movements",
    readTime: "7 min read",
    featured: false
  },
  {
    slug: "prophetic-voice-church",
    title: "Recovering the Prophetic Voice in the Church",
    excerpt: "How the prophetic gift challenges complacency and calls the church to its mission.",
    category: "APEST",
    readTime: "9 min read",
    featured: false
  },
  {
    slug: "discipleship-vs-membership",
    title: "From Membership to Discipleship",
    excerpt: "Shifting church culture from passive attendance to active participation in God's mission.",
    category: "Missional DNA",
    readTime: "5 min read",
    featured: false
  }
];

export default function Articles() {
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

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
