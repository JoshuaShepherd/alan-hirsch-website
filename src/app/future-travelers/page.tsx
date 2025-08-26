import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Future Travelers – Church Renewal & Transformation Strategies",
  description: "Discover adaptive strategies for church renewal and transformation through Future Travelers' research-based approaches to navigating change in established congregations.",
  keywords: ["Future Travelers", "church renewal", "transformation", "adaptive change", "church revitalization", "congregational development"],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Future Travelers",
  "description": "Guiding established churches through adaptive transformation and renewal",
  "url": "https://alanhirsch.org/future-travelers",
  "sameAs": ["https://alanhirsch.org/future-travelers"],
  "founder": {
    "@type": "Person",
    "name": "Alan Hirsch"
  }
};

export default function FutureTravelers() {
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
                    FT
                  </div>
                  <div>
                    <h1 className="font-display text-display-lg text-foreground">
                      Future Travelers
                    </h1>
                    <p className="text-xl ">Navigating Church Transformation</p>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed  mb-8">
                  Equip established churches with adaptive strategies and proven frameworks 
                  for navigating transformation without losing their essential identity. 
                  Bridge the gap between where you are and where God is calling you to be.
                </p>
              </div>
              
              <div className="lg:col-span-4">
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="text-6xl mb-4">🧭</div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-card-foreground">Begin Your Journey</h3>
                  <p className=" mb-4">Explore transformation strategies and tools</p>
                  <Link 
                    href="/about"
                    className="btn-primary w-full"
                  >
                    Discover Church Renewal Strategies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="section-padding">
          <div className="max-w-content mx-auto px-6">
            <h2 className="font-display text-2xl font-semibold mb-6 text-foreground">
              Alan's Heart for Established Church Renewal
            </h2>
            
            <div className="prose prose-lg max-w-none text-foreground space-y-6">
              <p>
                Future Travelers emerged from Alan Hirsch's recognition that while much 
                attention has been given to church planting and fresh expressions, millions 
                of believers remain in established churches that desperately need renewal 
                and transformation. These communities possess rich histories, deep roots, 
                and tremendous potential—but often lack the tools to navigate adaptive change.
              </p>
              
              <p>
                Alan developed Future Travelers as a bridge between the cutting-edge 
                insights of missional church theory and the practical realities faced 
                by traditional congregations. Rather than abandoning established churches 
                or demanding wholesale reinvention, Future Travelers provides adaptive 
                strategies that honor the past while embracing the future.
              </p>
              
              <p>
                Through Future Travelers, Alan demonstrates that transformation is possible 
                for any church willing to embrace adaptive learning, courageous leadership, 
                and patient persistence. The approach recognizes that established churches 
                have unique strengths and challenges that require specialized strategies 
                for sustainable renewal.
              </p>
            </div>
          </div>
        </section>

        {/* Transformation Framework */}
        <section className="section-padding bg-section">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              The Future Travelers Framework
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">Assessment</h3>
                <p className="text-sm ">
                  Honest evaluation of current reality, strengths, and transformation readiness
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">Vision</h3>
                <p className="text-sm ">
                  Clarifying God's preferred future while honoring congregational identity
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🛤️</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">Strategy</h3>
                <p className="text-sm ">
                  Adaptive pathways that respect pace and capacity for change
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">Action</h3>
                <p className="text-sm ">
                  Practical implementation with ongoing support and course correction
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section className="section-padding">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Principles for Sustainable Transformation
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Adaptive Leadership</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">Honor the Past</h4>
                    <p className=" text-sm">Acknowledge history and tradition while creating space for new expressions</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">Navigate Resistance</h4>
                    <p className=" text-sm">Understand and address the natural human tendency to resist change</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">Gradual Implementation</h4>
                    <p className=" text-sm">Sustainable change happens through patient, persistent, incremental steps</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Cultural Intelligence</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">Decode Church Culture</h4>
                    <p className=" text-sm">Understand the unspoken rules, values, and assumptions that shape behavior</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">Bridge Generations</h4>
                    <p className=" text-sm">Create pathways for different generations to contribute to transformation</p>
                  </div>
                  
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground mb-2">External Awareness</h4>
                    <p className=" text-sm">Develop sensitivity to community context and cultural changes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Challenges */}
        <section className="section-padding bg-section">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Challenges Future Travelers Addresses
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">📉</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Decline & Stagnation</h3>
                </div>
                <ul className="space-y-2 text-sm ">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Shrinking attendance and engagement</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Aging congregation demographics</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Limited community impact</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Financial pressures and constraints</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">🚧</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Change Resistance</h3>
                </div>
                <ul className="space-y-2 text-sm ">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Fear of losing cherished traditions</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Power struggles and political dynamics</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Competing visions for the future</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Leadership fatigue and burnout</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">❓</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Identity Crisis</h3>
                </div>
                <ul className="space-y-2 text-sm ">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Unclear mission and purpose</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Disconnection from community needs</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Institutional maintenance over mission</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Lost sense of kingdom purpose</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Resources & Tools */}
        <section className="section-padding">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Tools for Your Transformation Journey
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">📋</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Assessment Tools</h3>
                </div>
                <ul className="space-y-2  text-sm">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Congregational health diagnostics</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Community context analysis frameworks</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Leadership capacity evaluation</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Change readiness indicators</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">🗺️</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Strategic Planning</h3>
                </div>
                <ul className="space-y-2  text-sm">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Adaptive change methodologies</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Vision development processes</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Implementation roadmaps</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Progress measurement metrics</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">💬</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Communication Resources</h3>
                </div>
                <ul className="space-y-2  text-sm">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Change communication strategies</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Conflict resolution approaches</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Stakeholder engagement methods</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Story development for vision casting</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">🎯</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Implementation Support</h3>
                </div>
                <ul className="space-y-2  text-sm">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Pilot project frameworks</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Team development resources</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Coaching and mentorship programs</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Celebration and milestone recognition</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Preview */}
        <section className="section-padding bg-section">
          <div className="max-w-content mx-auto px-6 text-center">
            <h2 className="font-display text-display-md mb-6 text-foreground">
              Transformation Is Possible
            </h2>
            <p className="text-lg  mb-8">
              Churches around the world have successfully navigated adaptive change using 
              Future Travelers principles. From declining rural congregations to stagnant 
              urban churches, renewal is happening when leaders embrace adaptive strategies 
              and patient persistence.
            </p>
            <blockquote className="text-xl italic text-foreground bg-card border-l-4 border-primary p-6 max-w-2xl mx-auto">
              "The church doesn't need to choose between honoring its past and embracing 
              its future. With the right approach, established congregations can become 
              launching pads for kingdom transformation."
              <footer className="text-sm  mt-4">— Alan Hirsch</footer>
            </blockquote>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding">
          <div className="max-w-content mx-auto px-6 text-center">
            <h2 className="font-display text-display-md mb-6 text-foreground">
              Ready to Begin Your Transformation Journey?
            </h2>
            <p className="text-lg  mb-8">
              Don't let your church's best days remain in the past. Discover how established 
              congregations can navigate change while honoring their unique identity and calling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about" className="btn-primary">
                🧭 Discover Church Renewal Strategies
              </Link>
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
