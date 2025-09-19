/**
 * Contemporary Meta Design System Examples
 * 
 * These examples demonstrate how to use the new design primitives
 * and motion components while preserving your Editorial Modern aesthetic.
 */

import { Shell, Eyebrow, Prose } from '@/components/primitives';
import { FadeIn, Stagger, Interactive, MotionProvider } from '@/components/motion';

// Example 1: Enhanced Card Component
export function EnhancedBookCard({ book }) {
  return (
    <FadeIn delay={0.1}>
      <Interactive>
        <Shell variant="elevated" size="md">
          <div className="space-contemporary-sm">
            <Eyebrow variant="accent" size="sm">
              {book.category}
            </Eyebrow>
            
            <h3 className="font-display text-xl text-foreground">
              {book.title}
            </h3>
            
            <Prose variant="contemporary" size="md">
              <p>{book.description}</p>
            </Prose>
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">
                {book.readingTime} min read
              </span>
              <Interactive>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl shadow-xs hover:shadow-sm transition-shadow duration-fast">
                  Read More
                </button>
              </Interactive>
            </div>
          </div>
        </Shell>
      </Interactive>
    </FadeIn>
  );
}

// Example 2: Enhanced Section with Staggered Content
export function FeaturedSection({ articles }) {
  return (
    <section className="space-contemporary-lg max-w-container mx-auto px-6">
      <FadeIn delay={0.2}>
        <div className="text-center space-contemporary">
          <Eyebrow variant="accent" size="md">
            Featured Content
          </Eyebrow>
          
          <h2 className="font-display text-display-lg text-foreground">
            Latest Insights
          </h2>
          
          <Prose variant="contemporary" size="lg" className="max-w-content mx-auto">
            <p className="text-muted-foreground">
              Discover transformative ideas for missional church renewal
              and leadership development in our contemporary world.
            </p>
          </Prose>
        </div>
      </FadeIn>
      
      <Stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {articles.map(article => (
          <EnhancedBookCard key={article.id} book={article} />
        ))}
      </Stagger>
    </section>
  );
}

// Example 3: Contemporary Form with Glass Effect
export function ContactForm() {
  return (
    <Shell variant="glass" size="lg" className="max-w-md mx-auto">
      <div className="space-contemporary">
        <div className="text-center space-contemporary-sm">
          <Eyebrow variant="accent" size="md">
            Get Connected
          </Eyebrow>
          
          <h2 className="font-display text-display-md text-foreground">
            Join the Conversation
          </h2>
        </div>
        
        <form className="space-contemporary-sm">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground 
                         focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-all duration-fast"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground 
                         focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-all duration-fast"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground 
                         focus:ring-2 focus:ring-primary focus:border-transparent
                         transition-all duration-fast resize-none"
              placeholder="Your message..."
            />
          </div>
          
          <Interactive>
            <button
              type="submit"
              className="w-full p-3 bg-primary text-primary-foreground rounded-xl 
                         shadow-sm hover:shadow-md transition-shadow duration-base
                         font-medium"
            >
              Send Message
            </button>
          </Interactive>
        </form>
      </div>
    </Shell>
  );
}

// Example 4: App Layout with Motion Provider
export function AppLayout({ children }) {
  return (
    <MotionProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b border-border">
          <nav className="max-w-container mx-auto px-6 py-4">
            <Interactive>
              <div className="flex items-center space-x-8">
                <h1 className="font-display text-xl text-foreground">
                  Alan Hirsch
                </h1>
                {/* Navigation items */}
              </div>
            </Interactive>
          </nav>
        </header>
        
        <main className="space-contemporary-lg">
          {children}
        </main>
        
        <footer className="border-t border-border bg-muted/30">
          <div className="max-w-container mx-auto px-6 py-8">
            <Prose variant="contemporary" size="sm">
              <p className="text-center text-muted-foreground">
                © 2024 Alan Hirsch. All rights reserved.
              </p>
            </Prose>
          </div>
        </footer>
      </div>
    </MotionProvider>
  );
}

// Example 5: Homepage Hero with Contemporary Styling
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-container mx-auto px-6 py-section-lg">
        <FadeIn delay={0.3}>
          <div className="text-center space-contemporary-lg">
            <Eyebrow variant="accent" size="lg">
              Missional Church Renewal
            </Eyebrow>
            
            <h1 className="font-display text-display-xl text-foreground">
              Reimagining the Church for a 
              <span className="text-primary"> Post-Christendom</span> World
            </h1>
            
            <Prose variant="contemporary" size="lg" className="max-w-2xl mx-auto">
              <p className="text-graphite">
                Discover frameworks and tools to build movements that last.
                Transform communities through authentic missional leadership
                and sustainable church renewal strategies.
              </p>
            </Prose>
            
            <Stagger staggerDelay={0.1} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Interactive>
                <button className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl 
                                 shadow-md hover:shadow-lg transition-shadow duration-base
                                 font-medium text-lg">
                  Explore Books
                </button>
              </Interactive>
              
              <Interactive>
                <button className="px-8 py-4 border-2 border-border bg-background text-foreground rounded-2xl 
                                 hover:bg-muted/50 transition-colors duration-base
                                 font-medium text-lg">
                  Assessment Tools
                </button>
              </Interactive>
            </Stagger>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// Usage in a page component:
export default function HomePage() {
  return (
    <AppLayout>
      <HeroSection />
      <FeaturedSection articles={featuredArticles} />
      <ContactForm />
    </AppLayout>
  );
}