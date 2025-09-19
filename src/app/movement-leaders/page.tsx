import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movement Leaders Collective – Missional Leadership Hub",
  description: "Join a global network of movement leaders pioneering innovative approaches to mission and church planting through collaborative learning and peer mentorship.",
  keywords: ["movement leaders", "missional leadership", "church planting", "leadership development", "peer mentorship"],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Movement Leaders Collective",
  "description": "Global network of movement leaders pioneering missional innovation",
  "url": "https://movementleaderscollective.com",
  "sameAs": ["https://movementleaderscollective.com"],
  "founder": {
    "@type": "Person",
    "name": "Alan Hirsch"
  }
};

export default function MovementLeaders() {
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
                    MLC
                  </div>
                  <div>
                    <h1 className="font-display text-display-lg text-foreground">
                      Movement Leaders Collective
                    </h1>
                    <p className="text-xl ">Global Network for Missional Innovation</p>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed  mb-8">
                  Join a transformative community of movement leaders who are pioneering 
                  innovative approaches to mission, church planting, and kingdom advancement 
                  through collaborative learning and peer mentorship.
                </p>
              </div>
              
              <div className="lg:col-span-4">
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="text-6xl mb-4">🌐</div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-card-foreground">Ready to Connect?</h3>
                  <p className=" mb-4">Join the global movement community</p>
                  <a 
                    href="https://movementleaderscollective.com?utm_source=alanhirsch&utm_medium=referral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    Join a Cohort
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
              Alan's Vision for Collaborative Leadership
            </h2>
            
            <div className="prose prose-lg max-w-none text-foreground space-y-6">
              <p>
                Alan Hirsch co-founded the Movement Leaders Collective out of a deep conviction 
                that the most effective learning happens in community. After decades of studying 
                movement dynamics and training leaders globally, he recognized that isolated 
                leadership development was insufficient for the complex challenges facing the church today.
              </p>
              
              <p>
                The Collective represents Alan's commitment to fostering peer-to-peer learning 
                among seasoned practitioners who are actively engaged in movement building. 
                Rather than traditional top-down training, MLC creates space for leaders to 
                learn from each other's successes, failures, and ongoing experiments in missional innovation.
              </p>
              
              <p>
                Through his involvement in MLC, Alan continues to shape the next generation of 
                movement leaders while learning from their frontline experiences. This reciprocal 
                relationship enriches both his ongoing research and the practical wisdom being 
                developed by leaders around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="section-padding bg-section">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              What Drives the Collective
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="text-5xl mb-6">🤝</div>
                <h3 className="font-display text-xl font-semibold mb-4 text-card-foreground">Peer Learning</h3>
                <p className="">
                  Experienced leaders learning from each other's real-world experiences, 
                  challenges, and breakthroughs in missional contexts.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="text-5xl mb-6">🧪</div>
                <h3 className="font-display text-xl font-semibold mb-4 text-card-foreground">Innovation Lab</h3>
                <p className="">
                  A safe space to experiment with new approaches, test emerging theories, 
                  and develop cutting-edge strategies for movement building.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="text-5xl mb-6">🌍</div>
                <h3 className="font-display text-xl font-semibold mb-4 text-card-foreground">Global Network</h3>
                <p className="">
                  Connecting movement leaders across cultures, contexts, and continents 
                  to share resources and cross-pollinate ideas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="section-padding">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              How the Collective Works
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Learning Cohorts</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Small Group Format</h4>
                      <p className=" text-sm">6-8 leaders meeting regularly for deep, focused learning</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Case Study Method</h4>
                      <p className=" text-sm">Real scenarios from members' contexts drive learning</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Expert Input</h4>
                      <p className=" text-sm">Alan and other thought leaders provide frameworks and insights</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Resources & Support</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm shrink-0">
                      📚
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Curated Content</h4>
                      <p className=" text-sm">Essential readings, tools, and frameworks for movement leaders</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm shrink-0">
                      💬
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Peer Mentorship</h4>
                      <p className=" text-sm">Ongoing support and accountability from fellow practitioners</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm shrink-0">
                      🎯
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Action Learning</h4>
                      <p className=" text-sm">Implement learnings in real-time with group feedback</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Should Join */}
        <section className="section-padding bg-section">
          <div className="max-w-content mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Is This For You?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-xl font-semibold mb-4 text-card-foreground flex items-center gap-3">
                  <span className="text-2xl">✅</span>
                  Perfect Fit If You Are:
                </h3>
                <ul className="space-y-3 ">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Leading a church planting or missional movement</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Experienced practitioner seeking peer learning</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Committed to long-term leadership development</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Open to sharing your own experiences and challenges</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Passionate about innovative missional approaches</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-display text-xl font-semibold mb-4 text-card-foreground flex items-center gap-3">
                  <span className="text-2xl">💡</span>
                  You'll Gain:
                </h3>
                <ul className="space-y-3 ">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Fresh perspectives on persistent challenges</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Proven strategies from diverse cultural contexts</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Lifelong relationships with fellow practitioners</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Access to cutting-edge research and tools</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Confidence to experiment and innovate boldly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding">
          <div className="max-w-content mx-auto px-6 text-center">
            <h2 className="font-display text-display-md mb-6 text-foreground">
              Ready to Level Up Your Leadership?
            </h2>
            <p className="text-lg  mb-8">
              Join a community of movement leaders who are shaping the future of mission 
              through collaborative learning and peer mentorship. The next cohort is forming now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://movementleaderscollective.com?utm_source=alanhirsch&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                🌐 Join a Cohort
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
