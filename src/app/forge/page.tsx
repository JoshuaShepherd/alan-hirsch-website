import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forge Mission Training Network – Missional Leadership Development",
  description: "Develop missional leaders through Forge's innovative training programs that integrate theological formation with practical missional experience in real-world contexts.",
  keywords: ["Forge", "missional training", "leadership development", "theological formation", "church planting", "missional church"],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Forge Mission Training Network",
  "description": "Innovative training network for developing missional leaders",
  "url": "https://forge.org",
  "sameAs": ["https://forge.org"],
  "founder": {
    "@type": "Person",
    "name": "Alan Hirsch"
  }
};

export default function Forge() {
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
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-sm font-bold">
                    FORGE
                  </div>
                  <div>
                    <h1 className="font-display text-display-lg text-foreground">
                      Forge Mission Training Network
                    </h1>
                    <p className="text-xl ">Forging Missional Leaders for Tomorrow's Church</p>
                  </div>
                </div>
                
                <p className="text-lg leading-relaxed mb-8">
                  Develop the next generation of missional leaders through innovative training 
                  programs that integrate deep theological formation with hands-on experience 
                  in real-world missional contexts.
                </p>
              </div>
              
              <div className="lg:col-span-4">
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="text-6xl mb-4">🔨</div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-card-foreground">Ready to Be Forged?</h3>
                  <p className="mb-4">Discover training opportunities near you</p>
                  <a 
                    href="https://forge.org?utm_source=alanhirsch&utm_medium=referral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full"
                  >
                    Find Leadership Training
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
              Alan's Vision for Transformational Leadership Development
            </h2>
            
            <div className="prose prose-lg max-w-none text-foreground space-y-6">
              <p>
                Alan Hirsch co-founded Forge out of a conviction that traditional theological 
                education was inadequate for preparing leaders for the missional challenges 
                of the 21st century. He envisioned a training approach that would forge 
                leaders in the fires of real missional engagement, not just in the safety 
                of academic classrooms.
              </p>
              
              <p>
                Forge represents Alan's commitment to praxis-based learning—the integration 
                of theological reflection with missional action. Rather than separating theory 
                from practice, Forge creates learning communities where emerging leaders 
                develop their theological understanding through actual missional engagement 
                in their local contexts.
              </p>
              
              <p>
                Through Forge's global network, Alan continues to shape a new generation 
                of leaders who think theologically, act missionally, and lead innovatively. 
                These leaders aren't just studying mission—they're living it, and being 
                transformed in the process.
              </p>
            </div>
          </div>
        </section>

        {/* Training Philosophy */}
        <section className="section-padding bg-section">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              The Forge Approach to Leadership Development
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="text-5xl mb-6">🤝</div>
                <h3 className="font-display text-xl font-semibold mb-4 text-card-foreground">Learning in Community</h3>
                <p className="">
                  Cohort-based learning that builds deep relationships and provides 
                  ongoing support throughout the transformational journey.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="text-5xl mb-6">🎯</div>
                <h3 className="font-display text-xl font-semibold mb-4 text-card-foreground">Praxis-Based Learning</h3>
                <p className="">
                  Integration of theological reflection with real-world missional 
                  action in local contexts and communities.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <div className="text-5xl mb-6">🌱</div>
                <h3 className="font-display text-xl font-semibold mb-4 text-card-foreground">Holistic Formation</h3>
                <p className="">
                  Development of head, heart, and hands—intellectual, spiritual, 
                  and practical preparation for missional leadership.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Features */}
        <section className="section-padding">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              What Makes Forge Different
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Innovative Curriculum</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      📖
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Theological Foundations</h4>
                      <p className="text-sm">Deep dive into biblical theology, missiology, and church history</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      🚀
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Missional Practices</h4>
                      <p className="text-sm">Hands-on training in evangelism, discipleship, and community engagement</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      💡
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Innovation Labs</h4>
                      <p className="text-sm">Experimental spaces for developing new forms of church and ministry</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      🎭
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Cultural Engagement</h4>
                      <p className="text-sm">Understanding and engaging contemporary culture through a missional lens</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">Learning Experience</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      👥
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Mentorship</h4>
                      <p className="text-sm">Personal mentoring from experienced missional practitioners</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      🏘️
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Community Immersion</h4>
                      <p className="text-sm">Extended engagement in diverse cultural and missional contexts</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      🔬
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Action Research</h4>
                      <p className="text-sm">Learning through reflection on real ministry experiments and initiatives</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shrink-0">
                      🌍
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Global Network</h4>
                      <p className="text-sm">Connection with Forge communities and leaders worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Training Programs */}
        <section className="section-padding bg-section">
          <div className="max-w-container mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Forge Training Options
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🎓</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Residency Programs</h3>
                  <p className="text-sm mt-2">1-2 year intensive formation</p>
                </div>
                <ul className="space-y-2 text-sm ">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Full-time immersive experience</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Deep theological formation</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Embedded community living</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Extensive mentorship</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">📚</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Certificate Courses</h3>
                  <p className="text-sm mt-2">6-12 month focused training</p>
                </div>
                <ul className="space-y-2 text-sm ">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Part-time flexible format</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Specialized skill development</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Working professionals friendly</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Practical application focus</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🛠️</div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Workshops & Events</h3>
                  <p className="text-sm mt-2">Short-term intensive learning</p>
                </div>
                <ul className="space-y-2 text-sm ">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Weekend intensive format</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Specific topic deep-dives</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Network building opportunities</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Expert practitioner led</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Who Should Apply */}
        <section className="section-padding">
          <div className="max-w-content mx-auto px-6">
            <h2 className="font-display text-display-md text-center mb-12 text-foreground">
              Is Forge Right for You?
            </h2>
            
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-lg font-semibold mb-4 text-card-foreground flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    Ideal Candidates:
                  </h3>
                  <ul className="space-y-3 ">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Emerging leaders called to missional ministry</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Church planters and fresh expression pioneers</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Pastors transitioning to missional approaches</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Ministry leaders seeking innovative training</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Anyone passionate about transforming communities</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-display text-lg font-semibold mb-4 text-card-foreground flex items-center gap-3">
                    <span className="text-2xl">🚀</span>
                    You'll Develop:
                  </h3>
                  <ul className="space-y-3 ">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Theological depth grounded in missional praxis</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Cultural intelligence for diverse contexts</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Innovation skills for creating new forms of church</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Leadership competencies for complex challenges</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Lifelong learning practices and peer networks</span>
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
              Ready to Be Forged Into a Missional Leader?
            </h2>
            <p className="text-lg mb-8">
              Join a global network of innovative leaders who are being formed through 
              the integration of deep theological reflection and real-world missional engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://forge.org?utm_source=alanhirsch&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                🔨 Find Leadership Training
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
