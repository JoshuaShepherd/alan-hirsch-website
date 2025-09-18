import { Metadata } from 'next';
import EventTicketing from '@/components/payment/EventTicketing';

export const metadata: Metadata = {
  title: 'Events & Training | Alan Hirsch',
  description: 'Join Alan Hirsch for workshops, conferences, and masterclasses on missional church renewal and leadership development.',
  keywords: ['events', 'workshops', 'conferences', 'training', 'missional', 'church', 'leadership', 'development'],
};

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-display-xl font-display text-ink mb-4">
              Events & Training
            </h1>
            <p className="text-xl text-graphite max-w-3xl mx-auto">
              Join Alan Hirsch and leading practitioners for transformative learning experiences 
              in missional church renewal, leadership development, and movement multiplication.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6 bg-sage-50 border border-sage-200 rounded-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">Expert Training</h3>
              <p className="text-sm text-graphite">
                Learn from recognized leaders in missional church renewal and movement multiplication
              </p>
            </div>

            <div className="text-center p-6 bg-sage-50 border border-sage-200 rounded-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">Community</h3>
              <p className="text-sm text-graphite">
                Connect with like-minded leaders and practitioners from around the world
              </p>
            </div>

            <div className="text-center p-6 bg-sage-50 border border-sage-200 rounded-lg">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">Practical Tools</h3>
              <p className="text-sm text-graphite">
                Gain actionable insights and resources you can implement immediately
              </p>
            </div>
          </div>

          {/* Event Ticketing System */}
          <EventTicketing />

          {/* Additional Information */}
          <div className="mt-12 bg-indigo-50 border border-indigo-200 rounded-lg p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-900 mb-2">
                Can't find what you're looking for?
              </h2>
              <p className="text-indigo-800">
                We offer custom training and consulting for organizations and networks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-indigo-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                  Custom Workshops
                </h3>
                <p className="text-sm text-indigo-800 mb-4">
                  Tailored training sessions for your team, church, or organization focusing on specific missional challenges and opportunities.
                </p>
                <ul className="text-xs text-indigo-700 space-y-1">
                  <li>• APEST Team Development</li>
                  <li>• Missional Culture Transformation</li>
                  <li>• Movement Multiplication Strategies</li>
                  <li>• Leadership Pipeline Development</li>
                </ul>
              </div>

              <div className="bg-white border border-indigo-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-indigo-900 mb-2">
                  Speaking Engagements
                </h3>
                <p className="text-sm text-indigo-800 mb-4">
                  Book Alan for keynote presentations, conference sessions, or multi-day intensives at your event.
                </p>
                <ul className="text-xs text-indigo-700 space-y-1">
                  <li>• Keynote Presentations</li>
                  <li>• Conference Workshops</li>
                  <li>• Leadership Retreats</li>
                  <li>• Organizational Consulting</li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-6">
              <a
                href="mailto:events@alanhirsch.org"
                className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Contact Us for Custom Training
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
