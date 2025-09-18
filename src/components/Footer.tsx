import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-paper section-padding">
      <div className="max-w-container mx-auto px-6">
        <div className="grid md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-semibold mb-4">Alan Hirsch</h3>
            <p className="text-paper/80 text-base leading-relaxed mb-4">
              Reimagining the Church for a Post-Christendom World. 
              Discover frameworks and tools to build movements that last.
            </p>
            <div className="flex items-center gap-4 text-sm text-paper/60">
              <Link href="/about" className="hover:text-paper transition-colors">About</Link>
              <Link href="/contact" className="hover:text-paper transition-colors">Contact</Link>
              <Link href="/site-map" className="hover:text-paper transition-colors">Site Map</Link>
            </div>
          </div>

          {/* Books & Content */}
          <div>
            <h4 className="font-semibold mb-4">Books & Content</h4>
            <ul className="space-y-2">
              <li><Link href="/books" className="text-paper/80 hover:text-paper transition-colors">Complete Library</Link></li>
              <li><Link href="/articles" className="text-paper/80 hover:text-paper transition-colors">Articles</Link></li>
              <li><Link href="/podcast" className="text-paper/80 hover:text-paper transition-colors">Podcast</Link></li>
              <li><Link href="/video-library" className="text-paper/80 hover:text-paper transition-colors">Videos</Link></li>
              <li><Link href="/newsletter" className="text-paper/80 hover:text-paper transition-colors">Newsletter</Link></li>
            </ul>
          </div>

          {/* Assessment Tools */}
          <div>
            <h4 className="font-semibold mb-4">Assessment Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/missional-assessment" className="text-paper/80 hover:text-paper transition-colors">Missional Assessment</Link></li>
              <li><Link href="/apest-agents" className="text-paper/80 hover:text-paper transition-colors">APEST Agents</Link></li>
              <li><Link href="/mdna-hero" className="text-paper/80 hover:text-paper transition-colors">mDNA Hero</Link></li>
              <li><Link href="/toolkit" className="text-paper/80 hover:text-paper transition-colors">Toolkit</Link></li>
            </ul>
          </div>

          {/* Community & Learning */}
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li><Link href="/community" className="text-paper/80 hover:text-paper transition-colors">Forums</Link></li>
              <li><Link href="/lms" className="text-paper/80 hover:text-paper transition-colors">Learning Platform</Link></li>
              <li><Link href="/dashboard" className="text-paper/80 hover:text-paper transition-colors">Dashboard</Link></li>
              <li><Link href="/events" className="text-paper/80 hover:text-paper transition-colors">Events</Link></li>
              <li><Link href="/speaking" className="text-paper/80 hover:text-paper transition-colors">Speaking</Link></li>
            </ul>
          </div>

          {/* Partners & Support */}
          <div>
            <h4 className="font-semibold mb-4">Partners & Support</h4>
            <ul className="space-y-2">
              <li><Link href="/5q" className="text-paper/80 hover:text-paper transition-colors">5Q Collective</Link></li>
              <li><Link href="/movement-leaders" className="text-paper/80 hover:text-paper transition-colors">Movement Leaders</Link></li>
              <li><Link href="/100movements" className="text-paper/80 hover:text-paper transition-colors">100 Movements</Link></li>
              <li><Link href="/products" className="text-paper/80 hover:text-paper transition-colors">Products</Link></li>
              <li><Link href="/donate" className="text-paper/80 hover:text-paper transition-colors">Donate</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-paper/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-paper/60">
              <Link href="/privacy" className="hover:text-paper transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-paper transition-colors">Terms of Service</Link>
              <Link href="/ethics" className="hover:text-paper transition-colors">Ethics Statement</Link>
              <Link href="/cookies" className="hover:text-paper transition-colors">Cookie Policy</Link>
            </div>
            <div className="text-right">
              <p className="text-paper/60 text-sm">
                © 2025 Alan Hirsch. All rights reserved.
              </p>
              <p className="text-paper/60 text-xs mt-1">
                Built with human-first AI assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
