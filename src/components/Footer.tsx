import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-paper section-padding">
      <div className="max-w-container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-4">Alan Hirsch</h3>
            <p className="text-paper/80 text-base leading-relaxed">
              Reimagining the Church for a Post-Christendom World. 
              Discover frameworks and tools to build movements that last.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-paper/80 hover:text-paper transition-colors">About</Link></li>
              <li><Link href="/articles" className="text-paper/80 hover:text-paper transition-colors">Articles</Link></li>
              <li><Link href="/resources" className="text-paper/80 hover:text-paper transition-colors">Resources</Link></li>
              <li><Link href="/speaking" className="text-paper/80 hover:text-paper transition-colors">Speaking</Link></li>
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className="font-semibold mb-4">Content</h4>
            <ul className="space-y-2">
              <li><Link href="/podcast" className="text-paper/80 hover:text-paper transition-colors">Podcast</Link></li>
              <li><Link href="/newsletter" className="text-paper/80 hover:text-paper transition-colors">Newsletter</Link></li>
              <li><Link href="/case-studies" className="text-paper/80 hover:text-paper transition-colors">Case Studies</Link></li>
              <li><Link href="/courses" className="text-paper/80 hover:text-paper transition-colors">Courses</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-paper/80 hover:text-paper transition-colors">Contact</Link></li>
              <li><Link href="/ethics" className="text-paper/80 hover:text-paper transition-colors">Ethics</Link></li>
              <li><Link href="/privacy" className="text-paper/80 hover:text-paper transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-paper/80 hover:text-paper transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-paper/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-paper/60 text-sm">
            © 2025 Alan Hirsch. All rights reserved.
          </p>
          <p className="text-paper/60 text-sm mt-4 md:mt-0">
            Built with human-first AI assistance
          </p>
        </div>
      </div>
    </footer>
  );
}
