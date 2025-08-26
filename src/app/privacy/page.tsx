import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Alan Hirsch",
  description: "Privacy policy for Alan Hirsch's website, newsletter, and services.",
};

export default function Privacy() {
  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      <section className="section-padding-lg">
        <div className="max-w-content mx-auto px-6">
          <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
            Privacy Policy
          </h1>
          <p className="text-lg mb-8" style={{ color: '#444444' }}>
            Last updated: February 2025
          </p>
          
          <div className="prose prose-lg max-w-none" style={{ color: '#444444', lineHeight: '1.7' }}>
            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Information We Collect
            </h2>
            <p className="mb-6">
              We collect information you provide directly to us, such as when you subscribe to our newsletter, 
              contact us, or request resources. This may include your name, email address, organization, and 
              any message content you choose to share.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              How We Use Your Information
            </h2>
            <ul className="mb-6 space-y-2">
              <li>To send you our newsletter and updates (with your consent)</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To send you requested resources and materials</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Information Sharing
            </h2>
            <p className="mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties. 
              We may share your information only in the following circumstances:
            </p>
            <ul className="mb-6 space-y-2">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Human-First AI Usage
            </h2>
            <p className="mb-6">
              We believe in transparent AI usage. Any AI tools used on this site are employed to enhance 
              human communication, not replace it. We maintain editorial oversight and personal authenticity 
              in all content and correspondence.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Your Rights
            </h2>
            <p className="mb-6">You have the right to:</p>
            <ul className="mb-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Unsubscribe from communications at any time</li>
              <li>Object to processing of your information</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Contact Us
            </h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: hello@alanhirsch.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
