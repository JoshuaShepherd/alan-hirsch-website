import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaking & Consulting - Alan Hirsch",
  description: "Bring fresh vision to your community. Book Alan Hirsch for keynotes, workshops, and consulting on missional church renewal.",
};

const speakingTopics = [
  {
    title: "Missional Movements in the 21st Century",
    description: "How to cultivate apostolic movements that thrive in post-Christendom contexts",
    duration: "45-60 minutes",
    audience: "Church leaders, denominational gatherings, conferences"
  },
  {
    title: "The APEST Framework: Unlocking Your Church's Potential",
    description: "Implementing the five-fold ministry for sustainable growth and multiplication",
    duration: "60-90 minutes",
    audience: "Leadership teams, pastoral conferences, ministry training"
  },
  {
    title: "From Maintenance to Mission",
    description: "Shifting church culture from inward focus to outward engagement",
    duration: "45-60 minutes", 
    audience: "Congregational gatherings, denominational events"
  },
  {
    title: "Discipleship in a Post-Christian World",
    description: "Effective strategies for making disciples in secular contexts",
    duration: "45-60 minutes",
    audience: "Evangelism conferences, church planters, youth ministries"
  },
  {
    title: "Organic Church Multiplication",
    description: "Building simple, reproducible communities that multiply naturally",
    duration: "3-8 hours",
    audience: "Workshop format for church planters and leaders"
  },
  {
    title: "Leadership for Movements",
    description: "Developing apostolic leadership that pioneers new ground",
    duration: "Half or full day",
    audience: "Leadership development programs, seminary training"
  }
];

const testimonials = [
  {
    quote: "Alan's insights on APEST transformed how our denomination approaches leadership development. We've seen a 40% increase in new church plants since implementing his framework.",
    author: "Dr. Sarah Martinez",
    role: "Denominational President",
    organization: "Reformed Church Alliance"
  },
  {
    quote: "The most practical and inspiring conference session we've ever hosted. Alan helped our leaders see beyond maintenance mode to genuine missional engagement.",
    author: "Rev. Michael Chen",
    role: "Conference Director",
    organization: "National Church Leaders Summit"
  },
  {
    quote: "Alan's consulting work with our network resulted in 15 new church communities launched in 18 months. His approach is both theologically sound and practically effective.",
    author: "Pastor Jennifer Williams",
    role: "Network Coordinator",
    organization: "Urban Church Network"
  }
];

export default function Speaking() {
  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      {/* Hero */}
      <section className="section-padding-lg">
        <div className="max-w-container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
                Speaking & Consulting
              </h1>
              <p className="text-xl mb-8 max-w-content leading-relaxed" style={{ color: '#444444' }}>
                Bring fresh vision to your community. For over 30 years, I've helped church leaders worldwide rediscover their missional DNA and build movements that last.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:speaking@alanhirsch.com" 
                  className="bg-forest text-paper px-6 py-3 rounded font-medium hover:bg-forest/90 transition-colors inline-block text-center"
                  style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
                >
                  Book Alan to Speak
                </a>
                <a 
                  href="/contact" 
                  className="border border-ink text-ink px-6 py-3 rounded font-medium hover:bg-ink hover:text-paper transition-colors inline-block text-center"
                  style={{ borderColor: '#111111', color: '#111111' }}
                >
                  Consulting Inquiry
                </a>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div 
                className="aspect-square rounded-lg shadow-lg"
                style={{ backgroundColor: '#E3E3E0' }}
              >
                {/* Placeholder for Alan speaking photo */}
                <div className="w-full h-full flex items-center justify-center text-graphite">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                    </svg>
                    <p className="text-sm">Alan Speaking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Speaking Topics
          </h2>
          
          <div className="grid gap-6">
            {speakingTopics.map((topic, index) => (
              <div 
                key={index}
                className="bg-paper border border-stone rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                      {topic.title}
                    </h3>
                    <p className="mb-4 leading-relaxed" style={{ color: '#444444' }}>
                      {topic.description}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium" style={{ color: '#111111' }}>Duration: </span>
                      <span className="text-sm" style={{ color: '#444444' }}>{topic.duration}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium" style={{ color: '#111111' }}>Audience: </span>
                      <span className="text-sm" style={{ color: '#444444' }}>{topic.audience}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            What Leaders Are Saying
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-paper border border-stone rounded-lg p-6"
              >
                <blockquote className="text-lg italic mb-6 font-display leading-relaxed" style={{ color: '#111111' }}>
                  "{testimonial.quote}"
                </blockquote>
                <cite className="not-italic">
                  <div className="font-semibold" style={{ color: '#111111' }}>
                    {testimonial.author}
                  </div>
                  <div className="text-sm" style={{ color: '#444444' }}>
                    {testimonial.role}
                  </div>
                  <div className="text-sm" style={{ color: '#444444' }}>
                    {testimonial.organization}
                  </div>
                </cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Ways to Work Together
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-paper" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: '#111111' }}>
                Keynote Speaking
              </h3>
              <p className="mb-6" style={{ color: '#444444' }}>
                Inspiring presentations for conferences, denominational gatherings, and church events. 45-90 minutes.
              </p>
              <ul className="text-left space-y-2 text-sm" style={{ color: '#444444' }}>
                <li>• Main stage presentations</li>
                <li>• Breakout sessions</li>
                <li>• Panel discussions</li>
                <li>• Q&A formats</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-rust rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-paper" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L1 9L12 15L21 12V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"/>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: '#111111' }}>
                Workshops & Training
              </h3>
              <p className="mb-6" style={{ color: '#444444' }}>
                Interactive training sessions for leadership teams and ministry groups. Half-day to multi-day formats.
              </p>
              <ul className="text-left space-y-2 text-sm" style={{ color: '#444444' }}>
                <li>• APEST implementation</li>
                <li>• Leadership development</li>
                <li>• Church planting training</li>
                <li>• Missional strategy</li>
              </ul>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-soft-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-paper" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,12C17,14.42 15.28,16.44 13,16.9V21H11V16.9C8.72,16.44 7,14.42 7,12C7,9.58 8.72,7.56 11,7.1V3H13V7.1C15.28,7.56 17,9.58 17,12M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
                </svg>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: '#111111' }}>
                Consulting & Coaching
              </h3>
              <p className="mb-6" style={{ color: '#444444' }}>
                Strategic consultation for denominations, networks, and individual churches. Customized engagement.
              </p>
              <ul className="text-left space-y-2 text-sm" style={{ color: '#444444' }}>
                <li>• Organizational assessment</li>
                <li>• Strategic planning</li>
                <li>• Leadership coaching</li>
                <li>• Culture transformation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-md mb-6" style={{ color: '#111111' }}>
              Global Impact
            </h2>
            <p className="text-xl max-w-content mx-auto leading-relaxed" style={{ color: '#444444' }}>
              Over three decades of helping church leaders worldwide rediscover their missional DNA.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-display font-semibold mb-2" style={{ color: '#1D4A38' }}>
                6
              </div>
              <p className="text-lg font-medium" style={{ color: '#111111' }}>Continents</p>
              <p className="text-sm" style={{ color: '#444444' }}>Churches consulted</p>
            </div>
            
            <div>
              <div className="text-4xl font-display font-semibold mb-2" style={{ color: '#1D4A38' }}>
                1000+
              </div>
              <p className="text-lg font-medium" style={{ color: '#111111' }}>Leaders Trained</p>
              <p className="text-sm" style={{ color: '#444444' }}>In missional principles</p>
            </div>
            
            <div>
              <div className="text-4xl font-display font-semibold mb-2" style={{ color: '#1D4A38' }}>
                50+
              </div>
              <p className="text-lg font-medium" style={{ color: '#111111' }}>Denominations</p>
              <p className="text-sm" style={{ color: '#444444' }}>Across traditions</p>
            </div>
            
            <div>
              <div className="text-4xl font-display font-semibold mb-2" style={{ color: '#1D4A38' }}>
                30+
              </div>
              <p className="text-lg font-medium" style={{ color: '#111111' }}>Years</p>
              <p className="text-sm" style={{ color: '#444444' }}>Of experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-display-md mb-6" style={{ color: '#111111' }}>
            Ready to Transform Your Community?
          </h2>
          <p className="text-lg mb-8" style={{ color: '#444444' }}>
            Whether you need a keynote speaker, workshop facilitator, or strategic consultant, let's explore how we can work together to see your church thrive in mission.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:speaking@alanhirsch.com"
              className="bg-forest text-paper px-8 py-4 rounded-lg font-medium hover:bg-forest/90 transition-colors inline-block"
              style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
            >
              Book Speaking Engagement
            </a>
            <a 
              href="/contact"
              className="border border-ink text-ink px-8 py-4 rounded-lg font-medium hover:bg-ink hover:text-paper transition-colors inline-block"
              style={{ borderColor: '#111111', color: '#111111' }}
            >
              Schedule Consultation
            </a>
          </div>
          
          <p className="text-sm mt-6" style={{ color: '#444444' }}>
            For booking inquiries, please include your event details, dates, and expected audience size.
          </p>
        </div>
      </section>
    </div>
  );
}
