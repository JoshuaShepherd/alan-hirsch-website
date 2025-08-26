import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movement Toolkit - Alan Hirsch",
  description: "Explore the ecosystem of missional innovation. Connect with Alan's key partnerships in 5Q, Movement Leaders Collective, 100Movements, and more.",
  keywords: ["movement toolkit", "5Q", "APEST", "missional leadership", "Alan Hirsch", "church movements"],
};

const organizations = [
  {
    id: "5q",
    name: "5Q Central",
    tagline: "APEST Assessment Platform",
    description: "Discover and develop your unique ministry gifts through the comprehensive APEST assessment.",
    shortDescription: "APEST Assessment & Training",
    url: "https://5qcentral.com",
    features: ["Take the APEST Assessment", "Explore fivefold ministry", "Access training resources", "Connect with coaches"],
    cta: "Take the APEST Assessment",
    logo: "/images/partners/5q-logo.png", // We'll create placeholder logos
    color: "#1D4A38"
  },
  {
    id: "movement-leaders",
    name: "Movement Leaders Collective",
    tagline: "Empowering Missional Leaders Worldwide",
    description: "Join a global network of leaders committed to catalyzing sustainable kingdom movements.",
    shortDescription: "Global Leadership Network",
    url: "https://movementleaderscollective.com",
    features: ["Join leadership cohorts", "Access exclusive content", "Network with leaders", "Attend events"],
    cta: "Join a Cohort",
    logo: "/images/partners/mlc-logo.png",
    color: "#B2613E"
  },
  {
    id: "100movements",
    name: "100Movements",
    tagline: "Catalyzing Church Planting Movements",
    description: "Learn and apply the mDNA framework to spark reproducible church movements.",
    shortDescription: "Movement DNA Framework",
    url: "https://100movements.com",
    features: ["Explore mDNA framework", "Learn from case studies", "Access training tools", "Connect with practitioners"],
    cta: "Explore the mDNA Framework",
    logo: "/images/partners/100movements-logo.png",
    color: "#4B83C2"
  },
  {
    id: "forge",
    name: "Forge Mission Training Network",
    tagline: "Developing Missional Leaders",
    description: "Equipping emerging leaders with the skills and vision for missional church in the 21st century.",
    shortDescription: "Missional Leadership Training",
    url: "/forge", // Internal page since we need to verify external URL
    features: ["Leadership development", "Missional training", "Cohort experiences", "Mentorship programs"],
    cta: "Find Leadership Training",
    logo: "/images/partners/forge-logo.png",
    color: "#2D6B4A"
  },
  {
    id: "future-travelers",
    name: "Future Travelers",
    tagline: "Church Renewal for Tomorrow",
    description: "Pioneering new approaches to church renewal and transformation for the post-Christendom world.",
    shortDescription: "Church Renewal Strategies",
    url: "/future-travelers", // Internal page
    features: ["Church renewal strategies", "Future-focused resources", "Innovation frameworks", "Transformation tools"],
    cta: "Discover Church Renewal Strategies",
    logo: "/images/partners/future-travelers-logo.png",
    color: "#D4764E"
  },
  {
    id: "crm",
    name: "Church Resource Ministries",
    tagline: "Serving Churches Globally",
    description: "Supporting Alan's mission through partnership, sponsorship, and collaborative ministry initiatives.",
    shortDescription: "Ministry Partnership",
    url: "/crm", // Internal page
    features: ["Partnership opportunities", "Ministry support", "Global connections", "Resource sharing"],
    cta: "Partner with Alan in Mission",
    logo: "/images/partners/crm-logo.png",
    color: "#6B9BD4"
  }
];

export default function MovementToolkit() {
  return (
    <div className="bg-page">
      {/* Hero Section */}
      <section className="section-padding-lg">
        <div className="max-w-container mx-auto px-6 text-center">
          <h1 className="font-display text-display-lg mb-6 text-foreground">
            Explore the Ecosystem of Missional Innovation
          </h1>
          <p className="text-xl max-w-content mx-auto leading-relaxed mb-8">
            For decades, Alan has partnered with organizations that share his vision for renewed, 
            missional Christianity. Together, these movements create a comprehensive toolkit for 
            church transformation and leadership development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/5q" className="btn-primary">
              🧭 Take the APEST Assessment
            </Link>
            <Link href="#organizations" className="btn-outline">
              📚 Explore All Partners
            </Link>
          </div>
        </div>
      </section>

      {/* Organizations Grid */}
      <section id="organizations" className="section-padding bg-section">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-4 text-foreground">
            Movement Partners
          </h2>
          <p className="text-center mb-12 max-w-content mx-auto">
            Each organization brings unique strengths to the mission of church renewal and leadership development.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {organizations.map((org) => (
              <article key={org.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: org.color }}
                  >
                    {org.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {org.name}
                    </h3>
                    <p className="text-sm ">{org.tagline}</p>
                  </div>
                </div>

                <p className="mb-6 leading-relaxed">
                  {org.description}
                </p>

                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-card-foreground text-sm mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {org.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/${org.id}`}
                  className="btn-primary w-full text-center mb-3 block"
                >
                  Learn More
                </Link>
                
                {org.url.startsWith('http') && (
                  <a
                    href={`${org.url}?utm_source=alanhirsch&utm_medium=referral`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full text-center block text-sm"
                  >
                    🌐 Visit {org.name}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12 text-foreground">
            Featured Tools & Resources
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl">
                🧭
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">
                APEST Assessment
              </h3>
              <p className="mb-6">
                Discover your unique ministry gifts through the comprehensive 5Q APEST assessment. 
                Understand how God has wired you for kingdom impact.
              </p>
              <Link href="/5q" className="btn-primary">
                Take Assessment Now
              </Link>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center text-accent-foreground text-2xl">
                📚
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">
                Movement Resources
              </h3>
              <p className="mb-6">
                Access Alan's comprehensive library of books, articles, and resources on 
                missional church and leadership development.
              </p>
              <Link href="/resources" className="btn-primary">
                Explore Resources
              </Link>
            </div>
          </div>

          <div className="text-center">
            <h3 className="font-display text-2xl font-semibold mb-4 text-foreground">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-lg mb-6 max-w-content mx-auto">
              Start with the APEST assessment to understand your unique calling, 
              then explore the tools and partnerships that align with your mission.
            </p>
            <Link 
              href="https://5qcentral.com?utm_source=alanhirsch&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              🚀 Get Started – Take the APEST Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
