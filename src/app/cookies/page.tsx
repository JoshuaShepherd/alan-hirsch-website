import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy - Alan Hirsch",
  description: "Cookie policy explaining how we use cookies on Alan Hirsch's website.",
};

export default function Cookies() {
  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      <section className="section-padding-lg">
        <div className="max-w-content mx-auto px-6">
          <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
            Cookie Policy
          </h1>
          <p className="text-lg mb-8" style={{ color: '#444444' }}>
            Last updated: February 2025
          </p>
          
          <div className="prose prose-lg max-w-none" style={{ color: '#444444', lineHeight: '1.7' }}>
            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              What Are Cookies
            </h2>
            <p className="mb-6">
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
              They help websites remember information about your visit, making your next visit easier and the site more useful to you.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              How We Use Cookies
            </h2>
            <p className="mb-6">
              We use cookies to enhance your experience on our website, understand how you use our site, 
              and provide personalized content. Our cookies help us:
            </p>
            <ul className="mb-6 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Understand how you navigate through our site</li>
              <li>Improve site performance and user experience</li>
              <li>Provide relevant content and recommendations</li>
              <li>Analyze site traffic and usage patterns</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Types of Cookies We Use
            </h2>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              Essential Cookies
            </h3>
            <p className="mb-6">
              These cookies are necessary for the website to function properly. They enable basic functions 
              like page navigation, secure areas access, and form submissions. The website cannot function 
              properly without these cookies.
            </p>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              Analytics Cookies
            </h3>
            <p className="mb-6">
              We use analytics cookies to understand how visitors interact with our website. These cookies 
              help us improve our site by collecting and reporting information anonymously. We use Google 
              Analytics and similar services for this purpose.
            </p>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              Preference Cookies
            </h3>
            <p className="mb-6">
              These cookies allow our website to remember choices you make (such as your preferred language 
              or theme) and provide enhanced, more personal features.
            </p>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              Marketing Cookies
            </h3>
            <p className="mb-6">
              These cookies track your online activity to help advertisers deliver more relevant advertising 
              or to limit how many times you see an ad. We may use these cookies to build a profile of your 
              interests and show you relevant content on other sites.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Third-Party Cookies
            </h2>
            <p className="mb-6">
              We may use third-party services that set cookies on your device. These include:
            </p>
            <ul className="mb-6 space-y-2">
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>YouTube:</strong> For embedded video content</li>
              <li><strong>Social Media Platforms:</strong> For social sharing functionality</li>
              <li><strong>Email Service Providers:</strong> For newsletter and communication services</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Managing Your Cookie Preferences
            </h2>
            <p className="mb-6">
              You have the right to choose whether to accept or decline cookies. You can manage your cookie 
              preferences through your browser settings:
            </p>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              Browser Settings
            </h3>
            <ul className="mb-6 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Site Settings → Cookies</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and Website Data</li>
              <li><strong>Edge:</strong> Settings → Privacy and Services → Cookies</li>
            </ul>

            <h3 className="font-display text-xl font-semibold mt-6 mb-4" style={{ color: '#111111' }}>
              Cookie Consent Banner
            </h3>
            <p className="mb-6">
              When you first visit our website, you'll see a cookie consent banner that allows you to:
            </p>
            <ul className="mb-6 space-y-2">
              <li>Accept all cookies</li>
              <li>Reject non-essential cookies</li>
              <li>Customize your cookie preferences</li>
              <li>Learn more about our cookie practices</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Impact of Disabling Cookies
            </h2>
            <p className="mb-6">
              If you choose to disable cookies, some features of our website may not function properly. 
              This could affect:
            </p>
            <ul className="mb-6 space-y-2">
              <li>Site navigation and user experience</li>
              <li>Personalized content and recommendations</li>
              <li>Form submissions and interactive features</li>
              <li>Analytics and site improvement efforts</li>
            </ul>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Updates to This Policy
            </h2>
            <p className="mb-6">
              We may update this Cookie Policy from time to time to reflect changes in our practices or 
              applicable laws. We will notify you of any significant changes by posting the updated policy 
              on this page with a new "Last updated" date.
            </p>

            <h2 className="font-display text-2xl font-semibold mt-8 mb-6" style={{ color: '#111111' }}>
              Contact Us
            </h2>
            <p className="mb-6">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <ul className="mb-6 space-y-2">
              <li>Email: hello@alanhirsch.org</li>
              <li>Address: [Your Business Address]</li>
              <li>Phone: [Your Contact Number]</li>
            </ul>

            <div className="p-6 rounded-lg mt-8" style={{ backgroundColor: '#E3E3E0' }}>
              <h3 className="font-display text-lg font-semibold mb-4" style={{ color: '#111111' }}>
                Your Privacy Matters
              </h3>
              <p className="mb-4">
                We are committed to being transparent about how we collect and use your data. 
                Your privacy is important to us, and we strive to use cookies responsibly.
              </p>
              <p>
                For more information about how we protect your privacy, please review our 
                <a href="/privacy" className="font-medium hover:underline ml-1" style={{ color: '#1D4A38' }}>
                  Privacy Policy
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
