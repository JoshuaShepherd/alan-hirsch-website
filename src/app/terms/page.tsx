import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Alan Hirsch",
  description: "Terms of service for Alan Hirsch's website and services.",
};

export default function Terms() {
  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      <section className="section-padding-lg">
        <div className="max-w-content mx-auto px-6">
          <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
            Terms of Service
          </h1>
          <p className="text-lg mb-8" style={{ color: '#444444' }}>
            Last updated: February 2025
          </p>
          
          <div className="prose prose-lg max-w-none" style={{ color: '#444444', lineHeight: '1.7' }}>
            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Acceptance of Terms
            </h2>
            <p className="mb-6">
              By accessing and using this website, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please do not 
              use this service.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Website Content and Copyright
            </h2>
            <p className="mb-6">
              All content on this website, including but not limited to text, graphics, logos, images, 
              and audio clips, is the property of Alan Hirsch or its content suppliers and is protected 
              by copyright laws. You may not reproduce, distribute, or create derivative works from this 
              material without express written permission.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Use License
            </h2>
            <p className="mb-6">
              Permission is granted to temporarily download one copy of the materials on Alan Hirsch's 
              website for personal, non-commercial transitory viewing only. This is the grant of a 
              license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="mb-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Newsletter and Email Communications
            </h2>
            <p className="mb-6">
              By subscribing to our newsletter or providing your email address, you consent to receive 
              email communications from us. You may unsubscribe at any time by clicking the unsubscribe 
              link in our emails or by contacting us directly.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Disclaimer
            </h2>
            <p className="mb-6">
              The materials on Alan Hirsch's website are provided on an 'as is' basis. Alan Hirsch 
              makes no warranties, expressed or implied, and hereby disclaims and negates all other 
              warranties including without limitation, implied warranties or conditions of merchantability, 
              fitness for a particular purpose, or non-infringement of intellectual property or other 
              violation of rights.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Limitations
            </h2>
            <p className="mb-6">
              In no event shall Alan Hirsch or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on Alan Hirsch's website, even 
              if authorized representative has been notified orally or in writing of the possibility 
              of such damage.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Revisions and Errata
            </h2>
            <p className="mb-6">
              The materials appearing on Alan Hirsch's website could include technical, typographical, 
              or photographic errors. Alan Hirsch does not warrant that any of the materials on its 
              website are accurate, complete, or current. Alan Hirsch may make changes to the materials 
              contained on its website at any time without notice.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Contact Information
            </h2>
            <p className="mb-6">
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              Email: hello@alanhirsch.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
