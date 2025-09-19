import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Church Resource Ministries (CRM) – Supporting Alan Hirsch's Global Mission",
  description: "Learn how Church Resource Ministries partners with Alan Hirsch to advance missional leadership development and movement multiplication worldwide.",
  keywords: ["Church Resource Ministries", "CRM", "missions support", "missional development", "leadership training", "global mission"],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Church Resource Ministries",
  "description": "Supporting global mission and leadership development initiatives",
  "url": "https://crmleaders.org",
  "sameAs": ["https://crmleaders.org"],
  "member": {
    "@type": "Person",
    "name": "Alan Hirsch"
  }
};

export default function CRM() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="bg-page">
        {/* Hero Section */}
        <section className="section-padding-lg bg-section">
          <div className="max-w-container mx-auto px-6">
            <div className="text-center mb-8">
              <Link href="/resources" className="text-primary hover:text-primary/80 text-sm font-medium mb-4 inline-block">
                ← Back to Movement Resources
              </Link>
            </div>
            
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm font-bold">
                    CRM
                  </div>
                  <div>
                    <h1 className="font-display text-display-lg text-foreground">
                      Church Resource Ministries
                    </h1>
                    <p className="text-xl">Supporting Global Missional Innovation</p>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed mb-8">
                  Discover how Church Resource Ministries provides strategic support and 
                  infrastructure for Alan Hirsch's global mission to equip leaders and 
                  multiply movements that transform communities worldwide.
                </p>
              </div>
              
              <div className="lg:col-span-4">
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="text-6xl mb-4">🤝</div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-card-foreground">Join the Mission</h3>
                  <p className="mb-4">Partner with Alan's global initiatives</p>
                  <a 
                    href="https://crmleaders.org?utm_source=alanhirsch&utm_medium=referral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    Partner with Alan in Mission
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="section-padding">
          <div className="max-w-content mx-auto px-6">
            <h2 className="font-display text-2xl font-semibold mb-6 text-foreground">
              The Foundation for Global Impact
            </h2>
            
            <div className="prose prose-lg max-w-none text-foreground space-y-6">
              <p>
                Church Resource Ministries (CRM) serves as the foundational support system 
                that enables Alan Hirsch to pursue his calling as a global missionary, 
                researcher, and movement catalyst. For over two decades, CRM has provided 
                the organizational infrastructure, financial accountability, and strategic 
                partnership that allows Alan to focus on what he does best—equipping 
                leaders and catalyzing movements.
              </p>
              
              <p>
                Through CRM's support, Alan has been able to travel extensively, conduct 
                field research, write influential books, and develop training programs 
                that have impacted leaders across six continents. This partnership 
                represents a unique model of missions support that prioritizes thought 
                leadership, research-based ministry, and movement multiplication over 
                traditional missionary paradigms.
              </p>
              
              <p>
                CRM's commitment to Alan's work reflects their understanding that transforming 
                leaders creates exponential kingdom impact. Rather than supporting just 
                one missionary family, CRM's investment in Alan's ministry has resulted 
                in thousands of leaders being equipped and hundreds of movements being 
                influenced worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Partnership Model */}
        <section className="section-padding bg-section">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              How CRM Enables Global Mission
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="text-5xl mb-6">🏗️</div>
                <h3 className="font-display text-xl font-semibold mb-4 text-card-foreground">Infrastructure Support</h3>
                <p className="">
                  Providing organizational framework, legal structure, and administrative 
                  support that enables focus on mission rather than operations.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="text-5xl mb-6">💰</div>
                <h3 className="font-display text-xl font-semibold mb-4 text-card-foreground">Financial Partnership</h3>
                <p className="">
                  Connecting generous supporters with strategic mission opportunities 
                  through transparent stewardship and clear impact reporting.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="text-5xl mb-6">🎯</div>
                <h3 className="font-display text-xl font-semibold mb-4 text-card-foreground">Strategic Alignment</h3>
                <p className="">
                  Ensuring mission activities align with kingdom priorities and maximize 
                  impact through careful strategic planning and evaluation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Areas */}
        <section className="section-padding">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Where Your Partnership Makes Impact
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Global Training Initiatives</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      🌍
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">International Speaking</h4>
                      <p className="text-sm">Conferences, seminars, and workshops across six continents</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      📚
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Resource Development</h4>
                      <p className="text-sm">Books, curricula, assessments, and digital learning platforms</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      🎓
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Leadership Formation</h4>
                      <p className="text-sm">Cohorts, intensives, and mentorship programs for emerging leaders</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Research & Innovation</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      🔬
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Movement Studies</h4>
                      <p className="text-sm">Field research on successful Christian movements worldwide</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      💡
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Framework Development</h4>
                      <p className="text-sm">Creating practical tools and models for missional leaders</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      📖
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Publishing Projects</h4>
                      <p className="text-sm">Books and articles that shape missional conversation globally</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Opportunities */}
        <section className="section-padding bg-section">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Ways to Partner with Alan's Mission
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">💝</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Financial Support</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Monthly Partnership:</strong>
                      <span className="text-sm block">Ongoing support for ministry operations and travel</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Project Funding:</strong>
                      <span className="text-sm block">Special initiatives like book projects or research trips</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Event Sponsorship:</strong>
                      <span className="text-sm block">Supporting conferences and training programs</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🙏</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Prayer Partnership</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Regular Updates:</strong>
                      <span className="text-sm block">Monthly prayer letters with specific requests</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Strategic Intercession:</strong>
                      <span className="text-sm block">Praying for breakthrough in key ministry areas</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <div>
                      <strong className="text-foreground">Global Impact:</strong>
                      <span className="text-sm block">Interceding for leaders and movements worldwide</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why CRM */}
        <section className="section-padding">
          <div className="max-w-content mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Why Partner Through CRM?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-foreground">Strategic Focus</h3>
                <p className="text-sm">
                  CRM ensures resources are directed toward maximum kingdom impact 
                  through careful strategic planning and oversight.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-foreground">Transparent Stewardship</h3>
                <p className="text-sm">
                  Regular reporting and financial accountability provide confidence 
                  that your investment is making a real difference.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-foreground">Global Network</h3>
                <p className="text-sm">
                  Connection to CRM's worldwide network of missionaries and 
                  ministries amplifies impact and creates synergies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="section-padding bg-section">
          <div className="max-w-content mx-auto px-6 text-center">
            <h2 className="font-display text-display-md mb-6 text-foreground">
              Kingdom Impact Through Partnership
            </h2>
            <p className="text-lg mb-12">
              Through CRM's support, Alan's ministry has achieved remarkable global reach:
            </p>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <div className="text-sm">Books Published</div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">60+</div>
                <div className="text-sm">Countries Visited</div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">1000s</div>
                <div className="text-sm">Leaders Trained</div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-3xl font-bold text-primary mb-2">100s</div>
                <div className="text-sm">Movements Influenced</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding">
          <div className="max-w-content mx-auto px-6 text-center">
            <h2 className="font-display text-display-md mb-6 text-foreground">
              Join Alan's Global Mission Team
            </h2>
            <p className="text-lg mb-8">
              Your partnership enables continued research, writing, training, and movement 
              catalyzing that transforms leaders and communities worldwide. Join the mission 
              to see God's kingdom advanced through equipped, empowered leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://crmleaders.org?utm_source=alanhirsch&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                🤝 Partner with Alan in Mission
              </a>
              <Link href="/resources" className="btn-outline">
                ← Back to Movement Resources
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
