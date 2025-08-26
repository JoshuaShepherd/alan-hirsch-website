import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "100Movements – Exploring Movement DNA Framework",
  description: "Discover the essential DNA elements that create and sustain Christian movements through research-based insights and practical frameworks for movement catalysts.",
  keywords: ["100movements", "movement DNA", "mDNA", "church movements", "movement catalyst", "Christian movements"],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "100Movements",
  "description": "Research platform exploring the DNA of Christian movements worldwide",
  "url": "https://100movements.com",
  "sameAs": ["https://100movements.com"],
  "founder": {
    "@type": "Person",
    "name": "Alan Hirsch"
  }
};

export default function HundredMovements() {
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
              <Link href="/toolkit" className="text-primary hover:text-primary/80 text-sm font-medium mb-4 inline-block">
                ← Back to Movement Toolkit
              </Link>
            </div>
            
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-lg font-bold">
                    100M
                  </div>
                  <div>
                    <h1 className="font-display text-display-lg text-foreground">
                      100Movements
                    </h1>
                    <p className="text-xl">Decoding Movement DNA</p>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed mb-8">
                  Uncover the essential DNA elements that create and sustain extraordinary 
                  Christian movements through rigorous research, pattern analysis, and 
                  practical frameworks for movement catalysts worldwide.
                </p>
              </div>
              
              <div className="lg:col-span-4">
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="text-6xl mb-4">🧬</div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-card-foreground">Decode the Pattern</h3>
                  <p className="mb-4">Explore movement frameworks and research</p>
                  <a 
                    href="https://100movements.com?utm_source=alanhirsch&utm_medium=referral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    Explore the mDNA Framework
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
              Alan's Quest to Understand Movement Dynamics
            </h2>
            
            <div className="prose prose-lg max-w-none text-foreground space-y-6">
              <p>
                100Movements represents Alan Hirsch's most ambitious research project—a 
                comprehensive study of Christian movements throughout history to identify 
                the common DNA elements that enable some communities to become world-changing 
                movements while others remain static organizations.
              </p>
              
              <p>
                Drawing from decades of field research and collaboration with movement 
                scholars worldwide, Alan developed the mDNA (movement DNA) framework to 
                help leaders understand and cultivate the essential characteristics that 
                transform ordinary churches into extraordinary movements. This isn't 
                theoretical speculation—it's pattern recognition based on empirical evidence.
              </p>
              
              <p>
                Through 100Movements, Alan makes this groundbreaking research accessible 
                to practitioners who want to catalyze movements in their own contexts. 
                The platform serves as both an archive of movement wisdom and a practical 
                toolkit for leaders who refuse to settle for business-as-usual Christianity.
              </p>
            </div>
          </div>
        </section>

        {/* mDNA Framework */}
        <section className="section-padding bg-section">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              The Six Elements of Movement DNA
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl mb-4 text-center">⚡</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground text-center">Jesus</h3>
                <p className="text-sm text-center">
                  An authentic, transformative encounter with Jesus that changes everything
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl mb-4 text-center">👥</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground text-center">Disciple Making</h3>
                <p className="text-sm text-center">
                  Systematic multiplication of committed followers who make other followers
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl mb-4 text-center">📖</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground text-center">Missional-Incarnational Impulse</h3>
                <p className="text-sm text-center">
                  Compulsion to embody and extend God's mission in the world
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl mb-4 text-center">🎯</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground text-center">Apostolic Environment</h3>
                <p className="text-sm text-center">
                  Culture of pioneering, risk-taking, and entrepreneurial leadership
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl mb-4 text-center">🏗️</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground text-center">Organic Systems</h3>
                <p className="text-sm text-center">
                  Flexible structures that facilitate growth rather than control it
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-4xl mb-4 text-center">🔥</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground text-center">Communitas</h3>
                <p className="text-sm text-center">
                  Deep community forged through shared mission and common trials
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Insights */}
        <section className="section-padding">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              What the Research Reveals
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Historical Patterns</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">Early Christianity (30-300 AD)</h4>
                    <p className="text-sm">From 120 believers to 20 million—explosive growth through disciple-making movements</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">Celtic Christianity (400-1200 AD)</h4>
                    <p className="text-sm">Missional monasticism that evangelized Europe through incarnational presence</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">Methodist Revival (1700s-1800s)</h4>
                    <p className="text-sm">Class meetings and circuit riders created a multiplying movement across continents</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Contemporary Applications</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">House Church Networks</h4>
                    <p className="text-sm">Simple, reproducible structures enabling rapid multiplication in restricted nations</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">Church Planting Movements</h4>
                    <p className="text-sm">Strategic focus on indigenous leadership and local cultural adaptation</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">Fresh Expressions</h4>
                    <p className="text-sm">Innovative forms of church for post-Christian contexts and emerging cultures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Tools */}
        <section className="section-padding bg-section">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Tools for Movement Catalysts
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">mDNA Assessment</h3>
                <p className="text-sm mb-4">
                  Evaluate your community's movement potential across all six DNA elements
                </p>
                <div className="text-xs bg-muted/10 rounded px-2 py-1">
                  Diagnostic Tool
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">Case Studies</h3>
                <p className="text-sm mb-4">
                  Deep-dive analyses of successful movements throughout history and today
                </p>
                <div className="text-xs bg-muted/10 rounded px-2 py-1">
                  Learning Resource
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-5xl mb-4">🛠️</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">Implementation Guides</h3>
                <p className="text-sm mb-4">
                  Step-by-step frameworks for cultivating movement DNA in your context
                </p>
                <div className="text-xs bg-muted/10 rounded px-2 py-1">
                  Practical Framework
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="section-padding">
          <div className="max-w-content mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Is This Research For You?
            </h2>
            
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-lg font-semibold mb-4 text-card-foreground">
                    Perfect for leaders who are:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Frustrated with slow growth or plateaued communities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Passionate about catalyzing genuine transformation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Interested in evidence-based ministry approaches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Committed to multiplication over just addition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span>Ready to challenge traditional church models</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-display text-lg font-semibold mb-4 text-card-foreground">
                    You'll discover:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Why some churches become movements while others stagnate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Specific DNA elements present in all healthy movements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Practical steps to cultivate movement characteristics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>How to assess your community's movement potential</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">→</span>
                      <span>Lessons from history's most impactful Christian movements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-section">
          <div className="max-w-content mx-auto px-6 text-center">
            <h2 className="font-display text-display-md mb-6 text-foreground">
              Ready to Decode Movement DNA?
            </h2>
            <p className="text-lg mb-8">
              Stop guessing about what makes movements work. Access evidence-based research 
              and practical frameworks that have helped thousands of leaders catalyze transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://100movements.com?utm_source=alanhirsch&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                🧬 Explore the mDNA Framework
              </a>
              <Link href="/toolkit" className="btn-outline">
                ← Back to Movement Toolkit
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
