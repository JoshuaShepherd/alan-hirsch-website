import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Ethics & Transparency - Alan Hirsch",
  description: "Our commitment to ethical AI use and human-first content creation.",
};

export default function Ethics() {
  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      <section className="section-padding-lg">
        <div className="max-w-content mx-auto px-6">
          <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
            AI Ethics & Transparency
          </h1>
          <p className="text-lg mb-8" style={{ color: '#444444' }}>
            Our commitment to responsible AI use and authentic human connection
          </p>
          
          <div className="prose prose-lg max-w-none" style={{ color: '#444444', lineHeight: '1.7' }}>
            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Human-First Approach
            </h2>
            <p className="mb-6">
              At the heart of our digital presence is a commitment to authentic human communication. 
              While we may use AI tools to enhance our workflow and improve efficiency, all content 
              maintains human oversight, editorial control, and personal authenticity.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              How We Use AI
            </h2>
            <p className="mb-6">
              When AI tools are employed, they serve to support human creativity and communication, not replace it:
            </p>
            <ul className="mb-6 space-y-2">
              <li>Content editing and proofreading assistance</li>
              <li>Research and information synthesis support</li>
              <li>Technical optimization of website performance</li>
              <li>Email automation and scheduling tools</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              What Remains Entirely Human
            </h2>
            <ul className="mb-6 space-y-2">
              <li>All theological insights and teaching content</li>
              <li>Personal stories and experiences</li>
              <li>Speaking engagements and presentations</li>
              <li>Direct email correspondence and replies</li>
              <li>Book writing and academic work</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Transparency Commitment
            </h2>
            <p className="mb-6">
              We believe in full transparency about our use of technology. If AI tools significantly 
              contribute to any content creation process, this will be clearly disclosed. Our goal 
              is to use technology as a tool for better human connection, not as a substitute for it.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Data and Privacy
            </h2>
            <p className="mb-6">
              Any AI tools we use are selected with strict privacy and data protection standards. 
              Your personal information and communications are never used to train AI models without 
              your explicit consent. See our Privacy Policy for complete details.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Questions and Concerns
            </h2>
            <p className="mb-6">
              We welcome questions about our AI usage and are committed to ongoing dialogue about 
              ethical technology use in ministry and thought leadership. Please reach out with any 
              concerns or questions.
            </p>

            <div className="mt-12 p-8 rounded-lg" style={{ backgroundColor: '#E3E3E0' }}>
              <h3 className="font-display text-xl font-semibold mb-4" style={{ color: '#111111' }}>
                Our Promise
              </h3>
              <p className="mb-0">
                We commit to maintaining the personal, authentic voice that has characterized decades 
                of ministry and thought leadership. Technology serves our mission of human flourishing 
                and authentic community, never the other way around.
              </p>
            </div>

            <div className="mt-8 text-center">
              <a
                href="mailto:hello@alanhirsch.com"
                className="btn-primary"
                style={{
                  backgroundColor: '#1D4A38',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  fontWeight: '600',
                }}
              >
                Contact Us About AI Ethics
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
