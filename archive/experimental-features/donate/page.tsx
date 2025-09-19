import { Metadata } from 'next';
import DonationSystem from '@/components/payment/DonationSystem';

export const metadata: Metadata = {
  title: 'Support the Mission | Alan Hirsch',
  description: 'Support missional church renewal and leadership development through your generous donations.',
  keywords: ['donation', 'support', 'missional', 'church', 'renewal', 'leadership', 'development'],
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-display-xl font-display text-ink mb-4">
              Support the Mission
            </h1>
            <p className="text-xl text-graphite max-w-2xl mx-auto">
              Your generous support helps expand missional church renewal and leadership 
              development around the world. Every donation makes a direct impact.
            </p>
          </div>

          {/* Impact Statement */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-indigo-900 mb-2">
                Your Impact in Numbers
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">50+</div>
                  <div className="text-sm text-indigo-800">Countries Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">10,000+</div>
                  <div className="text-sm text-indigo-800">Leaders Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">500+</div>
                  <div className="text-sm text-indigo-800">Churches Planted</div>
                </div>
              </div>
            </div>
          </div>

          {/* Donation System */}
          <DonationSystem />

          {/* Additional Information */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-ink mb-3">Tax Deductible</h3>
              <p className="text-sm text-graphite">
                All donations are tax-deductible to the full extent allowed by law. 
                You will receive a receipt via email for your records.
              </p>
            </div>

            <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-ink mb-3">Secure Giving</h3>
              <p className="text-sm text-graphite">
                Your donation is processed securely through Stripe with bank-level 
                encryption. We never store your payment information.
              </p>
            </div>

            <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-ink mb-3">Monthly Updates</h3>
              <p className="text-sm text-graphite">
                Recurring donors receive monthly updates on how their gifts are 
                making an impact in missional communities worldwide.
              </p>
            </div>

            <div className="bg-sage-50 border border-sage-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-ink mb-3">Questions?</h3>
              <p className="text-sm text-graphite">
                Have questions about giving or want to discuss larger gifts? 
                Contact us at giving@alanhirsch.org or call (555) 123-4567.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
