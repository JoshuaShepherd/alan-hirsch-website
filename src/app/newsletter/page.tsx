import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter - Alan Hirsch",
  description: "Get practical insights on building movemental churches delivered monthly to your inbox.",
};

export default function Newsletter() {
  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      {/* Hero */}
      <section className="section-padding-lg">
        <div className="max-w-content mx-auto px-6 text-center">
          <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
            The Movemental Newsletter
          </h1>
          <p className="text-xl mb-8 leading-relaxed" style={{ color: '#444444' }}>
            Get practical insights on building movemental churches—delivered monthly to your inbox. 
            Join thousands of church leaders who rely on these insights to guide their missional journey.
          </p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-lg mx-auto px-6">
          <div className="bg-paper border border-stone rounded-lg p-8 text-center">
            <h2 className="font-display text-2xl font-semibold mb-6" style={{ color: '#111111' }}>
              Subscribe Today
            </h2>
            
            <form className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="First Name"
                  className="w-full px-4 py-3 rounded border border-stone focus:outline-none focus:ring-2 focus:ring-forest/50"
                  style={{ backgroundColor: '#F8F8F6' }}
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded border border-stone focus:outline-none focus:ring-2 focus:ring-forest/50"
                  style={{ backgroundColor: '#F8F8F6' }}
                />
              </div>
              <div>
                <select 
                  className="w-full px-4 py-3 rounded border border-stone focus:outline-none focus:ring-2 focus:ring-forest/50"
                  style={{ backgroundColor: '#F8F8F6', color: '#444444' }}
                >
                  <option>I'm a...</option>
                  <option>Pastor / Church Leader</option>
                  <option>Denominational Leader</option>
                  <option>Church Planter</option>
                  <option>Ministry Student</option>
                  <option>Lay Leader</option>
                  <option>Other</option>
                </select>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-forest text-paper px-6 py-4 rounded-lg font-medium hover:bg-forest/90 transition-colors"
                style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
              >
                Subscribe to Newsletter
              </button>
              
              <p className="text-xs mt-4" style={{ color: '#444444' }}>
                No spam. Unsubscribe anytime. See our <a href="/privacy" className="underline">privacy policy</a>.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            What You'll Receive
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-paper" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM5 6V5H19V6H5Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#111111' }}>
                    Monthly Insights
                  </h3>
                  <p style={{ color: '#444444' }}>
                    Deep dives into missional principles, APEST leadership, and church multiplication strategies.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-rust rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-paper" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L10.91 8.26L12 2Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#111111' }}>
                    Exclusive Resources
                  </h3>
                  <p style={{ color: '#444444' }}>
                    Subscriber-only guides, assessments, and tools not available anywhere else.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-paper" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9L12 15L21 12V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#111111' }}>
                    Case Studies
                  </h3>
                  <p style={{ color: '#444444' }}>
                    Real examples of churches successfully implementing movemental principles.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-paper" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#111111' }}>
                    Q&A Sessions
                  </h3>
                  <p style={{ color: '#444444' }}>
                    Answers to your most pressing questions about church renewal and mission.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-rust rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-paper" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 1H4C2.9 1 2 1.9 2 3V17C2 18.1 2.9 19 4 19H16C17.1 19 18 18.1 18 17V3C18 1.9 17.1 1 16 1ZM16 17H4V3H16V17ZM6 10V12H14V10H6ZM6 6V8H14V6H6ZM6 14V16H10V14H6Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#111111' }}>
                    Book Previews
                  </h3>
                  <p style={{ color: '#444444' }}>
                    Early access to excerpts from upcoming books and publications.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-soft-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-paper" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#111111' }}>
                    Event Updates
                  </h3>
                  <p style={{ color: '#444444' }}>
                    Early notifications about speaking events, workshops, and training opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Issue */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Sample Issue Preview
          </h2>
          
          <div className="bg-paper border border-stone rounded-lg p-8">
            <div className="text-center mb-8">
              <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: '#111111' }}>
                The Movemental Newsletter
              </h3>
              <p className="text-sm" style={{ color: '#444444' }}>Issue #47 • February 2025</p>
            </div>
            
            <div className="space-y-8">
              <article>
                <h4 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                  This Month: Rethinking Church Planting
                </h4>
                <p className="mb-4" style={{ color: '#444444' }}>
                  Most church planting strategies focus on replicating existing models. But what if the future of church multiplication lies in something far simpler? This month, we explore organic approaches to starting new faith communities...
                </p>
                <p className="text-sm italic" style={{ color: '#444444' }}>
                  [Continue reading - 8 minutes]
                </p>
              </article>
              
              <hr style={{ borderColor: '#E3E3E0' }} />
              
              <article>
                <h4 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                  Case Study: From 50 to 500 Through APEST
                </h4>
                <p className="mb-4" style={{ color: '#444444' }}>
                  Grace Community Church in Portland was struggling with plateau. Then they discovered the five-fold ministry gifts. Here's how implementing APEST led to sustainable growth and multiplication...
                </p>
                <p className="text-sm italic" style={{ color: '#444444' }}>
                  [Continue reading - 5 minutes]
                </p>
              </article>
              
              <hr style={{ borderColor: '#E3E3E0' }} />
              
              <article>
                <h4 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                  Q&A: Discipleship in Digital Spaces
                </h4>
                <p className="mb-4" style={{ color: '#444444' }}>
                  "How can we make authentic disciples in an increasingly digital world?" This month's Q&A addresses online community building, digital discipleship tools, and maintaining human connection...
                </p>
                <p className="text-sm italic" style={{ color: '#444444' }}>
                  [Continue reading - 4 minutes]
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Archive */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Previous Issues
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { issue: 46, title: "The Prophetic Voice in Leadership", month: "January 2025" },
              { issue: 45, title: "Building Anti-Fragile Churches", month: "December 2024" },
              { issue: 44, title: "From Programs to Movements", month: "November 2024" },
              { issue: 43, title: "Organic Multiplication Principles", month: "October 2024" },
              { issue: 42, title: "Missional DNA Assessment", month: "September 2024" },
              { issue: 41, title: "Post-Pandemic Church Renewal", month: "August 2024" },
            ].map((issue) => (
              <div 
                key={issue.issue}
                className="bg-paper border border-stone rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-sm mb-2" style={{ color: '#444444' }}>
                  Issue #{issue.issue} • {issue.month}
                </div>
                <h3 className="font-display text-lg font-semibold mb-3" style={{ color: '#111111' }}>
                  {issue.title}
                </h3>
                <a href="#" className="text-forest hover:text-forest/80 font-medium text-sm">
                  Read Archive →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-content mx-auto px-6 text-center">
          <blockquote className="text-xl italic font-display mb-6 leading-relaxed" style={{ color: '#111111' }}>
            "Alan's newsletter has become essential reading for our entire leadership team. The practical insights and real-world examples have transformed how we approach discipleship and church multiplication."
          </blockquote>
          <cite className="not-italic">
            <div className="font-semibold" style={{ color: '#111111' }}>Pastor Maria Rodriguez</div>
            <div className="text-sm" style={{ color: '#444444' }}>Lead Pastor, Hope Fellowship Network</div>
          </cite>
        </div>
      </section>
    </div>
  );
}
