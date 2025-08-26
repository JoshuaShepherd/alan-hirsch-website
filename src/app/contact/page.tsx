import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Alan Hirsch",
  description: "Connect with Alan Hirsch for speaking inquiries, consulting opportunities, or general questions about missional church renewal.",
};

export default function Contact() {
  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      {/* Header */}
      <section className="section-padding-lg">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
              Get in Touch
            </h1>
            <p className="text-xl max-w-content mx-auto leading-relaxed" style={{ color: '#444444' }}>
              Whether you're interested in speaking engagements, consulting opportunities, or simply want to connect about missional church renewal, I'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-paper" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-4" style={{ color: '#111111' }}>
                Speaking Inquiries
              </h3>
              <p className="mb-4" style={{ color: '#444444' }}>
                Book Alan for keynotes, workshops, or training sessions.
              </p>
              <a 
                href="mailto:speaking@alanhirsch.com"
                className="text-forest hover:text-forest/80 font-medium"
              >
                speaking@alanhirsch.com
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-rust rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-paper" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,12C17,14.42 15.28,16.44 13,16.9V21H11V16.9C8.72,16.44 7,14.42 7,12C7,9.58 8.72,7.56 11,7.1V3H13V7.1C15.28,7.56 17,9.58 17,12M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-4" style={{ color: '#111111' }}>
                Consulting & Coaching
              </h3>
              <p className="mb-4" style={{ color: '#444444' }}>
                Strategic consultation for churches and organizations.
              </p>
              <a 
                href="mailto:consulting@alanhirsch.com"
                className="text-forest hover:text-forest/80 font-medium"
              >
                consulting@alanhirsch.com
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-soft-blue rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-paper" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-4" style={{ color: '#111111' }}>
                General Inquiries
              </h3>
              <p className="mb-4" style={{ color: '#444444' }}>
                Questions, feedback, or general correspondence.
              </p>
              <a 
                href="mailto:hello@alanhirsch.com"
                className="text-forest hover:text-forest/80 font-medium"
              >
                hello@alanhirsch.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-6">
          <div className="bg-paper border border-stone rounded-lg p-8">
            <h2 className="font-display text-2xl font-semibold mb-6 text-center" style={{ color: '#111111' }}>
              Send a Message
            </h2>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#111111' }}>
                    First Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded border border-stone focus:outline-none focus:ring-2 focus:ring-forest/50"
                    style={{ backgroundColor: '#F8F8F6' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#111111' }}>
                    Last Name *
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 rounded border border-stone focus:outline-none focus:ring-2 focus:ring-forest/50"
                    style={{ backgroundColor: '#F8F8F6' }}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111111' }}>
                  Email Address *
                </label>
                <input 
                  type="email" 
                  required
                  className="w-full px-4 py-3 rounded border border-stone focus:outline-none focus:ring-2 focus:ring-forest/50"
                  style={{ backgroundColor: '#F8F8F6' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111111' }}>
                  Organization
                </label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 rounded border border-stone focus:outline-none focus:ring-2 focus:ring-forest/50"
                  style={{ backgroundColor: '#F8F8F6' }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111111' }}>
                  Inquiry Type
                </label>
                <select 
                  className="w-full px-4 py-3 rounded border border-stone focus:outline-none focus:ring-2 focus:ring-forest/50"
                  style={{ backgroundColor: '#F8F8F6', color: '#444444' }}
                >
                  <option>Select an option</option>
                  <option>Speaking Engagement</option>
                  <option>Consulting Services</option>
                  <option>Media/Press Inquiry</option>
                  <option>Partnership Opportunity</option>
                  <option>General Question</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#111111' }}>
                  Message *
                </label>
                <textarea 
                  rows={6}
                  required
                  placeholder="Please provide details about your inquiry, including relevant dates, audience size, or specific needs..."
                  className="w-full px-4 py-3 rounded border border-stone focus:outline-none focus:ring-2 focus:ring-forest/50 resize-vertical"
                  style={{ backgroundColor: '#F8F8F6' }}
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-forest text-paper px-6 py-4 rounded-lg font-medium hover:bg-forest/90 transition-colors"
                style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Press Kit */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-md mb-6" style={{ color: '#111111' }}>
              Press & Media Kit
            </h2>
            <p className="text-lg max-w-content mx-auto" style={{ color: '#444444' }}>
              Resources for media professionals, event organizers, and conference coordinators.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-paper border border-stone rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-forest rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-paper" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3" style={{ color: '#111111' }}>Bio & Background</h3>
              <p className="text-sm mb-4" style={{ color: '#444444' }}>Complete biography and professional background</p>
              <a href="#" className="text-forest hover:text-forest/80 font-medium text-sm">Download</a>
            </div>
            
            <div className="bg-paper border border-stone rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-rust rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-paper" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3" style={{ color: '#111111' }}>High-Res Photos</h3>
              <p className="text-sm mb-4" style={{ color: '#444444' }}>Professional headshots and speaking photos</p>
              <a href="#" className="text-forest hover:text-forest/80 font-medium text-sm">Download</a>
            </div>
            
            <div className="bg-paper border border-stone rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-soft-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-paper" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3" style={{ color: '#111111' }}>Speaking Topics</h3>
              <p className="text-sm mb-4" style={{ color: '#444444' }}>Detailed descriptions and key takeaways</p>
              <a href="#" className="text-forest hover:text-forest/80 font-medium text-sm">Download</a>
            </div>
            
            <div className="bg-paper border border-stone rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-forest rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-paper" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM5 6V5H19V6H5Z"/>
                </svg>
              </div>
              <h3 className="font-semibold mb-3" style={{ color: '#111111' }}>Testimonials</h3>
              <p className="text-sm mb-4" style={{ color: '#444444' }}>Reviews from event organizers and attendees</p>
              <a href="#" className="text-forest hover:text-forest/80 font-medium text-sm">Download</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                What is your typical response time?
              </h3>
              <p style={{ color: '#444444' }}>
                I aim to respond to all inquiries within 48 hours during business days. Speaking inquiries may take slightly longer as I review calendar availability and event details.
              </p>
            </div>
            
            <div>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                Do you travel internationally for speaking engagements?
              </h3>
              <p style={{ color: '#444444' }}>
                Yes, I regularly speak at international conferences and events. Please include location details in your inquiry, and we'll discuss logistics and requirements.
              </p>
            </div>
            
            <div>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                What information should I include in a speaking inquiry?
              </h3>
              <p style={{ color: '#444444' }}>
                Please include: event dates, location, expected audience size, audience type (pastors, church leaders, etc.), preferred topic, and budget range. This helps me provide the most helpful response.
              </p>
            </div>
            
            <div>
              <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                Do you offer virtual/online presentations?
              </h3>
              <p style={{ color: '#444444' }}>
                Yes, I offer virtual keynotes, workshops, and training sessions. Virtual engagements can be customized to your platform and audience needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
