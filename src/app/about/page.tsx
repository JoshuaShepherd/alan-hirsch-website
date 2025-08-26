import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Alan Hirsch",
  description: "Meet Alan Hirsch, author, missiologist, and thought leader focused on missional church renewal and movemental Christianity.",
};

export default function About() {
  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      {/* Hero */}
      <section className="section-padding-lg">
        <div className="max-w-container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
                About Alan Hirsch
              </h1>
              <div className="prose prose-lg max-w-none" style={{ color: '#444444' }}>
                <p className="text-xl leading-relaxed mb-6">
                  I'm an Australian-born missiologist, author, and thought leader focused on the renewal 
                  of the Christian church and the concept of "movemental Christianity."
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  For over three decades, I've dedicated my work to helping church leaders worldwide 
                  rediscover the missional DNA that drove the early Christian movement. My journey has 
                  taken me from founding churches in Australia to consulting with denominations across 
                  six continents.
                </p>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div 
                className="aspect-[4/5] rounded-lg shadow-lg mb-6"
                style={{ backgroundColor: '#E3E3E0' }}
              >
                {/* Placeholder for Alan's environmental portrait */}
                <div className="w-full h-full flex items-center justify-center text-graphite">
                  <div className="text-center">
                    <svg className="w-32 h-32 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V19H13V12H11V19H9V5.5L3 7V9H1V6.5L9.5 4.5C10.5 4.2 11.5 4.2 12.5 4.5L23 6.5V9H21Z"/>
                    </svg>
                    <p className="text-sm">Environmental Portrait</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Themes */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Core Themes of My Work
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: '#111111' }}>
                Apostolic Movements
              </h3>
              <p className="mb-6" style={{ color: '#444444' }}>
                Developing decentralized, organic, mission-driven communities that multiply naturally 
                rather than through institutional programs.
              </p>
              
              <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: '#111111' }}>
                APEST Model
              </h3>
              <p className="mb-6" style={{ color: '#444444' }}>
                Apostles, Prophets, Evangelists, Shepherds, Teachers as a framework for church 
                leadership based on Ephesians 4, unlocking the full potential of every believer.
              </p>
            </div>
            
            <div>
              <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: '#111111' }}>
                Missional DNA
              </h3>
              <p className="mb-6" style={{ color: '#444444' }}>
                Reconnecting the church with its core mission to reach the world, moving from 
                maintenance mode to mission mode.
              </p>
              
              <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: '#111111' }}>
                Cultural Analysis
              </h3>
              <p className="mb-6" style={{ color: '#444444' }}>
                Understanding post-Christendom, secular contexts and how to authentically engage 
                them with the gospel message.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Books & Recognition */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-display-md mb-8" style={{ color: '#111111' }}>
                Books & Publications
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#111111' }}>
                    The Forgotten Ways
                  </h3>
                  <p style={{ color: '#444444' }}>
                    Reactivating apostolic movements for the 21st century church.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#111111' }}>
                    5Q: Reactivating the Original Intelligence and Capacity of the Body of Christ
                  </h3>
                  <p style={{ color: '#444444' }}>
                    A comprehensive guide to the five-fold ministry and its transformative power.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#111111' }}>
                    The Permanent Revolution
                  </h3>
                  <p style={{ color: '#444444' }}>
                    Apostolic imagination and practice for the 21st century church.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="font-display text-display-md mb-8" style={{ color: '#111111' }}>
                Recognition & Impact
              </h2>
              <div className="space-y-4" style={{ color: '#444444' }}>
                <p>
                  • <strong>Global Influence:</strong> Consulted with denominations and church networks across six continents
                </p>
                <p>
                  • <strong>Academic Role:</strong> Adjunct Professor at Fuller Seminary and Wheaton College
                </p>
                <p>
                  • <strong>Movement Catalyst:</strong> Co-founder of Forge Mission Training Network
                </p>
                <p>
                  • <strong>Thought Leadership:</strong> Recognized as one of the most influential missiological voices of our time
                </p>
                <p>
                  • <strong>Practical Impact:</strong> Thousands of leaders trained in missional principles worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Note */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-display-md mb-8" style={{ color: '#111111' }}>
            My Personal Mission
          </h2>
          <blockquote className="text-xl italic font-display mb-6" style={{ color: '#111111' }}>
            "Complex systems require adaptive leadership rooted in the gospel. My work is about helping leaders navigate this complexity with wisdom, courage, and hope."
          </blockquote>
          <p className="text-lg mb-8" style={{ color: '#444444' }}>
            If you're tired of decline and longing to see authentic disciple-making communities flourish, 
            I believe we can rediscover the simple, powerful ways that made the early church so effective. 
            This isn't about returning to the past—it's about reclaiming timeless principles for our present moment.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/speaking" 
              className="bg-forest text-paper px-6 py-3 rounded font-medium hover:bg-forest/90 transition-colors"
              style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
            >
              Bring Fresh Vision to Your Community
            </a>
            <a 
              href="/contact" 
              className="border border-ink text-ink px-6 py-3 rounded font-medium hover:bg-ink hover:text-paper transition-colors"
              style={{ borderColor: '#111111', color: '#111111' }}
            >
              Connect Personally
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
