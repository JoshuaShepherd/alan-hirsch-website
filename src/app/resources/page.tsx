import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - Alan Hirsch",
  description: "Access free guides, assessments, and tools to start reshaping your leadership culture and building movemental churches.",
};

// Sample resources data
const resources = [
  {
    title: "Missional DNA Toolkit",
    description: "A comprehensive guide to help churches rediscover their missional identity and purpose. Includes practical exercises and assessment tools.",
    type: "Guide",
    pages: "24 pages",
    featured: true
  },
  {
    title: "APEST Leadership Assessment",
    description: "Discover your unique ministry gifts and how they contribute to the five-fold ministry. Includes personal report and team exercises.",
    type: "Assessment",
    pages: "Interactive",
    featured: true
  },
  {
    title: "The Forgotten Ways Summary",
    description: "Key insights from Alan's seminal work on apostolic movements, distilled into actionable principles for church leaders.",
    type: "Summary",
    pages: "16 pages",
    featured: true
  },
  {
    title: "Building Movemental Communities",
    description: "Step-by-step guide for establishing simple, reproducible church communities that multiply naturally.",
    type: "Workbook",
    pages: "32 pages",
    featured: false
  },
  {
    title: "Post-Christendom Ministry Framework",
    description: "Strategies for effective ministry in secular, post-Christian contexts. Based on 30 years of global experience.",
    type: "Framework",
    pages: "18 pages",
    featured: false
  },
  {
    title: "Discipleship vs. Membership Audit",
    description: "Assess your church's culture and identify steps to shift from passive membership to active discipleship.",
    type: "Audit Tool",
    pages: "12 pages",
    featured: false
  }
];

export default function Resources() {
  const featuredResources = resources.filter(resource => resource.featured);
  const additionalResources = resources.filter(resource => !resource.featured);

  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      {/* Header */}
      <section className="section-padding-lg">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
              Free Resources & Tools
            </h1>
            <p className="text-xl max-w-content mx-auto leading-relaxed" style={{ color: '#444444' }}>
              Access practical guides, assessments, and frameworks to start reshaping your leadership culture and building movemental churches.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Popular Downloads
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <div 
                key={index}
                className="bg-paper rounded-lg p-8 text-center hover:shadow-lg transition-shadow border border-stone"
              >
                <div className="mb-6">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: index === 0 ? '#1D4A38' : index === 1 ? '#B2613E' : '#4B83C2' }}
                  >
                    {resource.type === 'Guide' && (
                      <svg className="w-8 h-8 text-paper" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM5 6V5H19V6H5Z"/>
                      </svg>
                    )}
                    {resource.type === 'Assessment' && (
                      <svg className="w-8 h-8 text-paper" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                      </svg>
                    )}
                    {resource.type === 'Summary' && (
                      <svg className="w-8 h-8 text-paper" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L13.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L10.91 8.26L12 2Z"/>
                      </svg>
                    )}
                  </div>
                  <div className="mb-2">
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-full"
                      style={{ backgroundColor: '#E3E3E0', color: '#444444' }}
                    >
                      {resource.type}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-display text-xl font-semibold mb-4" style={{ color: '#111111' }}>
                  {resource.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: '#444444' }}>
                  {resource.description}
                </p>
                <p className="text-xs mb-6" style={{ color: '#444444' }}>
                  {resource.pages}
                </p>
                
                <button 
                  className="w-full bg-forest text-paper px-6 py-3 rounded font-medium hover:bg-forest/90 transition-colors"
                  style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
                >
                  Download Free
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Capture Form */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-display-md mb-6" style={{ color: '#111111' }}>
            Get Instant Access
          </h2>
          <p className="text-lg mb-8" style={{ color: '#444444' }}>
            Enter your email below to download any of these resources and receive monthly insights on building movemental churches.
          </p>
          
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded border border-stone focus:outline-none focus:ring-2 focus:ring-forest/50"
                style={{ backgroundColor: '#F8F8F6' }}
              />
              <button 
                type="submit"
                className="bg-forest text-paper px-6 py-3 rounded font-medium hover:bg-forest/90 transition-colors whitespace-nowrap"
                style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
              >
                Get Resources
              </button>
            </div>
            <p className="text-xs mt-4" style={{ color: '#444444' }}>
              No spam. Unsubscribe anytime. See our <a href="/privacy" className="underline">privacy policy</a>.
            </p>
          </form>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Additional Resources
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalResources.map((resource, index) => (
              <div 
                key={index}
                className="bg-paper border border-stone rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <span 
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{ backgroundColor: '#B2613E', color: '#F8F8F6' }}
                  >
                    {resource.type}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-3" style={{ color: '#111111' }}>
                  {resource.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: '#444444' }}>
                  {resource.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: '#444444' }}>
                    {resource.pages}
                  </span>
                  <button 
                    className="text-forest hover:text-forest/80 font-medium text-sm"
                  >
                    Download →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Published Books
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div 
                className="aspect-[3/4] rounded-lg shadow-lg mb-6 mx-auto max-w-48"
                style={{ backgroundColor: '#E3E3E0' }}
              >
                {/* Book cover placeholder */}
                <div className="w-full h-full flex items-center justify-center text-graphite">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
                    </svg>
                    <p className="text-xs">Book Cover</p>
                  </div>
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                The Forgotten Ways
              </h3>
              <p className="mb-4" style={{ color: '#444444' }}>
                Reactivating apostolic movements for the 21st century church.
              </p>
              <a 
                href="#" 
                className="text-forest hover:text-forest/80 font-medium"
              >
                Learn More →
              </a>
            </div>

            <div className="text-center">
              <div 
                className="aspect-[3/4] rounded-lg shadow-lg mb-6 mx-auto max-w-48"
                style={{ backgroundColor: '#E3E3E0' }}
              >
                {/* Book cover placeholder */}
                <div className="w-full h-full flex items-center justify-center text-graphite">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
                    </svg>
                    <p className="text-xs">Book Cover</p>
                  </div>
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                5Q
              </h3>
              <p className="mb-4" style={{ color: '#444444' }}>
                Reactivating the original intelligence and capacity of the Body of Christ.
              </p>
              <a 
                href="#" 
                className="text-forest hover:text-forest/80 font-medium"
              >
                Learn More →
              </a>
            </div>

            <div className="text-center">
              <div 
                className="aspect-[3/4] rounded-lg shadow-lg mb-6 mx-auto max-w-48"
                style={{ backgroundColor: '#E3E3E0' }}
              >
                {/* Book cover placeholder */}
                <div className="w-full h-full flex items-center justify-center text-graphite">
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6,2A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
                    </svg>
                    <p className="text-xs">Book Cover</p>
                  </div>
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                The Permanent Revolution
              </h3>
              <p className="mb-4" style={{ color: '#444444' }}>
                Apostolic imagination and practice for the 21st century church.
              </p>
              <a 
                href="#" 
                className="text-forest hover:text-forest/80 font-medium"
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
