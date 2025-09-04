import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-page">
      {/* Hero Section */}
      <section className="section-padding-lg">
        <div className="max-w-container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8">
              <h1 className="font-display text-display-lg mb-6 text-foreground">
                Reimagining the Church for a Post-Christendom World
              </h1>
              <p className="text-xl mb-8 max-w-content leading-relaxed">
                For over 30 years, I've helped leaders worldwide recover the missional DNA of the church. 
                Discover frameworks and tools to build movements that last.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/newsletter" 
                  className="btn-primary inline-block text-center"
                >
                  Get Monthly Insights
                </Link>
                <Link 
                  href="/resources" 
                  className="btn-outline inline-block text-center"
                >
                  Explore Resources
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/alan-hirsch-icon.png"
                  alt="Alan Hirsch - Missional Church Leader and Author"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section-padding bg-section">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-display-md mb-6 text-foreground">
              What if we've forgotten how to be the Church?
            </h2>
            <p className="text-lg max-w-content mx-auto leading-relaxed">
              Much of the Western church has settled into maintenance mode. But the gospel calls us beyond maintenance—to mission. I explore how to get there.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8H19V19ZM5 6V5H19V6H5Z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">APEST Framework</h3>
              <p className="">
                Discover the five-fold ministry gifts that unleash the church's full potential for mission.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">Missional DNA</h3>
              <p className="">
                Reconnect with the church's core mission to reach the world through organic movements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-chart-3 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 text-foreground">Cultural Renewal</h3>
              <p className="">
                Navigate post-Christendom contexts with wisdom and authentic gospel witness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12 text-foreground">
            Latest Insights
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Article */}
            <article className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">
                The Forgotten Ways of Mission
              </h3>
              <p className="mb-4">
                How the early church's simple practices can revolutionize modern ministry approaches.
              </p>
              <Link href="/articles/forgotten-ways" className="text-primary hover:text-primary/80 font-medium">
                Read more →
              </Link>
            </article>

            {/* Featured Resource */}
            <article className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">
                APEST Assessment Tool
              </h3>
              <p className="mb-4">
                Discover your unique ministry gifts and how they contribute to the body of Christ.
              </p>
              <Link href="/resources/apest-assessment" className="text-primary hover:text-primary/80 font-medium">
                Take Assessment →
              </Link>
            </article>

            {/* Featured Podcast */}
            <article className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">
                Movemental Leadership
              </h3>
              <p className="mb-4">
                Latest podcast episode on cultivating leaders for sustainable church movements.
              </p>
              <Link href="/podcast/movemental-leadership" className="text-primary hover:text-primary/80 font-medium">
                Listen now →
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-section">
        <div className="max-w-content mx-auto px-6 text-center">
          <blockquote className="text-xl italic font-display mb-6 text-foreground">
            "I've seen firsthand how small communities can spark global movements. My hope is to see the Church fully alive again."
          </blockquote>
          <cite className="font-semibold">— Alan Hirsch</cite>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-display-md mb-6 text-foreground">
            Join the Movement
          </h2>
          <p className="text-lg mb-8">
            Get practical insights on building movemental churches—delivered monthly.
          </p>
          <Link 
            href="/newsletter" 
            className="btn-primary inline-block"
          >
            Subscribe to Newsletter
          </Link>
        </div>
      </section>
    </div>
  );
}
