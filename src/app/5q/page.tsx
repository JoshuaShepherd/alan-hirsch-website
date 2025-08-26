import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5Q APEST Assessment by Alan Hirsch – Fivefold Ministry Tool",
  description: "Discover your unique ministry gifts through the 5Q APEST assessment. Understand how Apostle, Prophet, Evangelist, Shepherd, Teacher gifts shape your calling.",
  keywords: ["5Q", "APEST", "fivefold ministry", "ministry assessment", "apostle", "prophet", "evangelist", "shepherd", "teacher"],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "5Q Central",
  "description": "APEST Assessment Platform for discovering fivefold ministry gifts",
  "url": "https://5qcentral.com",
  "sameAs": ["https://5qcentral.com"],
  "founder": {
    "@type": "Person",
    "name": "Alan Hirsch"
  }
};

export default function FiveQ() {
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
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-2xl font-bold">
                    5Q
                  </div>
                  <div>
                    <h1 className="font-display text-display-lg text-foreground">
                      5Q Central
                    </h1>
                    <p className="text-xl">APEST Assessment Platform</p>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed mb-8">
                  Discover and develop your unique ministry gifts through the most comprehensive 
                  APEST assessment available. Understand how God has uniquely wired you for 
                  kingdom impact through the fivefold ministry framework.
                </p>
              </div>
              
              <div className="lg:col-span-4">
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="text-6xl mb-4">🧭</div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-card-foreground">Ready to Discover Your Calling?</h3>
                  <p className="mb-4">Take the comprehensive APEST assessment</p>
                  <a 
                    href="https://5qcentral.com?utm_source=alanhirsch&utm_medium=referral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    Take the APEST Assessment
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
              Alan's Connection to 5Q Central
            </h2>
            
            <div className="prose prose-lg max-w-none text-foreground space-y-6">
              <p>
                Alan Hirsch co-founded 5Q Central as the premier platform for understanding and 
                applying the APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) framework 
                that he pioneered. Drawing from Ephesians 4:11-16, this revolutionary assessment 
                helps individuals and teams discover their God-given ministry gifts.
              </p>
              
              <p>
                For over two decades, Alan has championed the idea that every believer is called 
                to one of these five primary ministry functions. Through 5Q Central, he's made 
                this life-changing discovery accessible to thousands worldwide, helping them 
                understand not just what they do, but who they are called to be.
              </p>
              
              <p>
                The platform represents Alan's commitment to equipping the church with practical 
                tools for spiritual formation and missional effectiveness. By understanding your 
                APEST type, you gain clarity on your unique contribution to the body of Christ 
                and how to maximize your kingdom impact.
              </p>
            </div>
          </div>
        </section>

        {/* APEST Framework Explanation */}
        <section className="section-padding bg-section">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Understanding the Five Ministry Types
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">Apostle</h3>
                <p className="text-sm">Pioneers and movement catalysts who extend the gospel into new territories</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">👁️</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">Prophet</h3>
                <p className="text-sm">Truth-tellers who call people back to covenant faithfulness</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">📢</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">Evangelist</h3>
                <p className="text-sm">Mobilizers who recruit people into the movement</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">🤗</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">Shepherd</h3>
                <p className="text-sm">Nurturers who care for and develop people</p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="font-display text-lg font-semibold mb-3 text-card-foreground">Teacher</h3>
                <p className="text-sm">Guardians who communicate and apply wisdom</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="section-padding">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              What You'll Discover Through 5Q
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Personal APEST Profile</h3>
                    <p className="">Comprehensive assessment revealing your primary and secondary ministry gifts</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Development Resources</h3>
                    <p className="">Tailored content and exercises to grow in your specific gifting</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Team Dynamics</h3>
                    <p className="">Understanding how your gifts complement others for effective collaboration</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Coaching Support</h3>
                    <p className="">Connect with certified coaches who can guide your development journey</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Community Connection</h3>
                    <p className="">Join a global network of individuals discovering their calling</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Ongoing Learning</h3>
                    <p className="">Access to webinars, courses, and resources for continued growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-section">
          <div className="max-w-content mx-auto px-6 text-center">
            <h2 className="font-display text-display-md mb-6 text-foreground">
              Ready to Discover Your Ministry DNA?
            </h2>
            <p className="text-lg mb-8">
              Join thousands who have gained clarity on their calling through the APEST framework. 
              Your unique contribution to God's mission starts with understanding who you're called to be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://5qcentral.com?utm_source=alanhirsch&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                🧭 Take the APEST Assessment
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
