import Link from "next/link";
import Image from "next/image";
import { BookOpen, Users, Video, Headphones, Calendar, Award, TrendingUp, Star, ArrowRight, Play, Download, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-page">
      {/* Human-First Hero Section - Split Hero with Portrait Card */}
      <section className="section-padding-lg">
        <div className="max-w-container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <Star className="h-4 w-4" />
                  Trusted by 25,000+ Leaders Worldwide
                </div>
                <h1 className="font-display text-display-lg mb-6 text-foreground">
                  Your Complete Digital Presence for Missional Leadership
                </h1>
                <p className="text-xl leading-relaxed text-foreground/80">
                  Everything you need to build, monetize, and scale your expert platform—from content creation 
                  to community building, powered by AI agents and authentic human connection.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/membership" 
                  className="btn-primary inline-flex items-center gap-2 justify-center"
                >
                  Start Your Assessment
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href="/demo" 
                  className="btn-outline inline-flex items-center gap-2 justify-center"
                >
                  <Play className="h-4 w-4" />
                  See How It Works
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background" />
                    ))}
                  </div>
                  <span className="text-sm text-foreground/70">Join 8,900+ subscribers</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                  <span className="text-sm text-foreground/70 ml-2">4.9/5 from 1,200+ reviews</span>
                </div>
              </div>
            </div>

            {/* Portrait Card */}
            <div className="relative">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
                <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-primary/5 to-accent/5">
                  <Image
                    src="/images/alan-hirsch-bw.png"
                    alt="Alan Hirsch - Missional Church Leader and Author"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="text-center space-y-3">
                  <h3 className="font-display text-xl font-semibold text-card-foreground">Alan Hirsch</h3>
                  <p className="text-card-foreground/80">30+ years pioneering missional church renewal</p>
                  <div className="flex items-center justify-center gap-4 text-sm text-card-foreground/70">
                    <span>15+ Published Books</span>
                    <span>•</span>
                    <span>6 Continents</span>
                    <span>•</span>
                    <span>100k+ Leaders Trained</span>
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                Live Platform
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities - What You Get */}
      <section className="section-padding bg-section">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-display-md mb-6 text-foreground">
              Everything You Need to Build Your Expert Platform
            </h2>
            <p className="text-lg max-w-content mx-auto leading-relaxed text-foreground/80">
              This isn't just a website—it's a complete digital ecosystem for thought leaders, 
              authors, and movement builders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Content Creation */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">Content Engine</h3>
              <p className="text-card-foreground/80 mb-4">
                Advanced CMS with AI writing agents, scheduling, and multi-platform publishing.
              </p>
              <Link href="/books" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                See Books Library <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Monetization */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">Revenue Streams</h3>
              <p className="text-card-foreground/80 mb-4">
                Subscriptions, courses, books, speaking, consulting—all integrated seamlessly.
              </p>
              <Link href="/membership" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                View Pricing <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Community */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">Audience Building</h3>
              <p className="text-card-foreground/80 mb-4">
                Email marketing, member dashboards, and community features that drive engagement.
              </p>
              <Link href="/community" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                Join Community <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Media */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">Rich Media</h3>
              <p className="text-card-foreground/80 mb-4">
                Podcast hosting, video libraries, downloadable resources, and media management.
              </p>
              <Link href="/podcast" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                Listen to Podcast <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Speaking */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">Event Management</h3>
              <p className="text-card-foreground/80 mb-4">
                Speaking booking, workshop scheduling, and event promotion—all in one place.
              </p>
              <Link href="/speaking" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                Book Speaking <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Analytics */}
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-teal-500" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">Smart Analytics</h3>
              <p className="text-card-foreground/80 mb-4">
                AI-powered insights on content performance, audience growth, and revenue optimization.
              </p>
              <Link href="/toolkit" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                View Tools <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">8,900+</div>
                <div className="text-sm text-foreground/70">Active Subscribers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">15+</div>
                <div className="text-sm text-foreground/70">Published Books</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">250+</div>
                <div className="text-sm text-foreground/70">Podcast Episodes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">6</div>
                <div className="text-sm text-foreground/70">Partner Organizations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Showcase */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-display-md mb-4 text-foreground">
                Latest from the Platform
              </h2>
              <p className="text-lg text-foreground/80">
                Fresh insights, resources, and conversations driving the missional church movement
              </p>
            </div>
            <Link href="/articles" className="btn-outline hidden md:inline-flex items-center gap-2">
              View All Content
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Featured Book */}
            <article className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary uppercase tracking-wide">New Book</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                The Forgotten Ways
              </h3>
              <p className="text-card-foreground/80 mb-4">
                Discover the hidden DNA of the early church and how these principles can spark movement today.
              </p>
              <div className="flex items-center justify-between">
                <Link href="/books/the-forgotten-ways" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                  Read Free Sample <ArrowRight className="h-3 w-3" />
                </Link>
                <div className="flex items-center gap-1 text-sm text-card-foreground/60">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  4.9 (142 reviews)
                </div>
              </div>
            </article>

            {/* Featured Podcast */}
            <article className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Headphones className="h-5 w-5 text-purple-500" />
                </div>
                <span className="text-xs font-medium text-purple-500 uppercase tracking-wide">Latest Episode</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                AI and the Future of Ministry
              </h3>
              <p className="text-card-foreground/80 mb-4">
                Exploring how artificial intelligence can serve missional leaders without compromising authenticity.
              </p>
              <div className="flex items-center justify-between">
                <Link href="/podcast/ai-future-ministry" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                  <Play className="h-3 w-3" />
                  Listen Now
                </Link>
                <span className="text-sm text-card-foreground/60">42 min • Episode 127</span>
              </div>
            </article>

            {/* Featured Resource */}
            <article className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Download className="h-5 w-5 text-green-500" />
                </div>
                <span className="text-xs font-medium text-green-500 uppercase tracking-wide">Free Resource</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground group-hover:text-primary transition-colors">
                APEST Assessment Tool
              </h3>
              <p className="text-card-foreground/80 mb-4">
                Discover your unique ministry gifts and learn how they contribute to movement building.
              </p>
              <div className="flex items-center justify-between">
                <Link href="/apest-agents" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                  Take Assessment <ArrowRight className="h-3 w-3" />
                </Link>
                <span className="text-sm text-card-foreground/60">8,400+ completed</span>
              </div>
            </article>
          </div>

          <div className="text-center md:hidden">
            <Link href="/articles" className="btn-outline inline-flex items-center gap-2">
              View All Content
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Ecosystem */}
      <section className="section-padding bg-section">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-md mb-6 text-foreground">
              Partner Network & Organizations
            </h2>
            <p className="text-lg max-w-content mx-auto leading-relaxed text-foreground/80">
              Strategic partnerships amplifying missional impact across six continents
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* 5Q */}
            <Link href="/5q" className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">5Q Collective</h3>
                  <p className="text-sm text-card-foreground/60">APEST Ministry</p>
                </div>
              </div>
              <p className="text-card-foreground/80 mb-4">
                Equipping leaders with five-fold ministry gifts for church multiplication and renewal.
              </p>
              <div className="text-primary group-hover:text-primary/80 font-medium text-sm">Learn More →</div>
            </Link>

            {/* Movement Leaders */}
            <Link href="/movement-leaders" className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Movement Leaders</h3>
                  <p className="text-sm text-card-foreground/60">Leadership Development</p>
                </div>
              </div>
              <p className="text-card-foreground/80 mb-4">
                Training movement catalysts for sustainable disciple-making and church planting.
              </p>
              <div className="text-primary group-hover:text-primary/80 font-medium text-sm">Learn More →</div>
            </Link>

            {/* 100 Movements */}
            <Link href="/100movements" className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">100 Movements</h3>
                  <p className="text-sm text-card-foreground/60">Global Initiative</p>
                </div>
              </div>
              <p className="text-card-foreground/80 mb-4">
                Catalyzing 100 church planting movements in the least reached places on earth.
              </p>
              <div className="text-primary group-hover:text-primary/80 font-medium text-sm">Learn More →</div>
            </Link>

            {/* Forge */}
            <Link href="/forge" className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Forge Mission Training</h3>
                  <p className="text-sm text-card-foreground/60">Education</p>
                </div>
              </div>
              <p className="text-card-foreground/80 mb-4">
                Innovative missional training preparing leaders for 21st century ministry challenges.
              </p>
              <div className="text-primary group-hover:text-primary/80 font-medium text-sm">Learn More →</div>
            </Link>

            {/* Future Travelers */}
            <Link href="/future-travelers" className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Video className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Future Travelers</h3>
                  <p className="text-sm text-card-foreground/60">Innovation Lab</p>
                </div>
              </div>
              <p className="text-card-foreground/80 mb-4">
                Exploring emerging trends and technologies shaping the future of faith communities.
              </p>
              <div className="text-primary group-hover:text-primary/80 font-medium text-sm">Learn More →</div>
            </Link>

            {/* CRM */}
            <Link href="/crm" className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-teal-500" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground">Church Resource Ministries</h3>
                  <p className="text-sm text-card-foreground/60">Strategic Partnership</p>
                </div>
              </div>
              <p className="text-card-foreground/80 mb-4">
                Providing infrastructure and support for sustainable ministry development worldwide.
              </p>
              <div className="text-primary group-hover:text-primary/80 font-medium text-sm">Learn More →</div>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/toolkit" className="btn-primary inline-flex items-center gap-2">
              Explore All Partners & Tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories & Testimonials */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-md mb-6 text-foreground">
              Real Results from Real Leaders
            </h2>
            <p className="text-lg text-foreground/80">
              See how this platform is helping leaders worldwide build sustainable movements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Case Study 1 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground">Grace Community Church</h4>
                  <p className="text-sm text-card-foreground/60">Portland, OR</p>
                </div>
              </div>
              <blockquote className="text-card-foreground/80 mb-4">
                "Implementing the APEST framework through Alan's platform helped us grow from 120 to 340 members 
                in 18 months, with 3 new church plants."
              </blockquote>
              <div className="text-sm text-green-600 font-medium">+183% growth in 18 months</div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground">Sarah Chen</h4>
                  <p className="text-sm text-card-foreground/60">Movement Leader, Singapore</p>
                </div>
              </div>
              <blockquote className="text-card-foreground/80 mb-4">
                "The AI agents saved me 15 hours per week on content creation, allowing me to focus on 
                what matters most—discipling leaders."
              </blockquote>
              <div className="text-sm text-blue-600 font-medium">15 hours saved weekly</div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground">David Martinez</h4>
                  <p className="text-sm text-card-foreground/60">Author & Speaker</p>
                </div>
              </div>
              <blockquote className="text-card-foreground/80 mb-4">
                "My book sales increased 300% and speaking bookings doubled after launching my 
                platform. The monetization tools are incredible."
              </blockquote>
              <div className="text-sm text-purple-600 font-medium">$50K additional revenue</div>
            </div>
          </div>

          {/* Featured Testimonial */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-xl font-display italic mb-6 text-foreground">
                "This isn't just a website platform—it's a movement multiplier. I've seen firsthand how 
                small communities equipped with the right tools and frameworks can spark global transformation. 
                My hope is to see the Church fully alive again."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/images/alan-hirsch-icon.png"
                    alt="Alan Hirsch"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <cite className="font-semibold text-foreground not-italic">Alan Hirsch</cite>
                  <p className="text-sm text-foreground/60">Founder & Missional Catalyst</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-display-md mb-6">
            Ready to Build Your Expert Platform?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of leaders who are using this complete digital ecosystem to build movements, 
            grow audiences, and create sustainable impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/membership" 
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors inline-flex items-center gap-2 justify-center"
            >
              Start Your Assessment
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              href="/demo" 
              className="border border-white/30 bg-white/10 backdrop-blur px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2 justify-center"
            >
              <Play className="h-4 w-4" />
              Watch Demo
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-sm opacity-90">
            <div className="flex items-center justify-center gap-2">
              <Star className="h-4 w-4" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="h-4 w-4" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="h-4 w-4" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-6">
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display text-2xl font-semibold mb-4 text-card-foreground">
              Stay Connected with the Movement
            </h3>
            <p className="text-lg text-card-foreground/80 mb-6">
              Get monthly insights on missional church renewal, leadership development, and movement building—
              plus exclusive resources and early access to new content.
            </p>
            <Link 
              href="/newsletter" 
              className="btn-primary inline-flex items-center gap-2"
            >
              Join 8,900+ Subscribers
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-sm text-card-foreground/60 mt-4">
              No spam. Unsubscribe anytime. Used by leaders in 67+ countries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
