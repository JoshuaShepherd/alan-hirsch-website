import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast - Alan Hirsch",
  description: "Listen to conversations on missional church renewal, APEST leadership, and building movements that last.",
};

// Sample podcast episodes data
const episodes = [
  {
    number: 47,
    title: "Movemental Leadership in Crisis",
    description: "How authentic leaders navigate uncertainty while maintaining missional focus. Exploring adaptive leadership principles from the early church.",
    duration: "42:15",
    date: "February 15, 2025",
    featured: true
  },
  {
    number: 46,
    title: "The Prophetic Voice: Challenging Complacency",
    description: "Why the prophetic gift is essential for church renewal and how to cultivate prophetic leadership in your community.",
    duration: "38:22",
    date: "February 1, 2025",
    featured: true
  },
  {
    number: 45,
    title: "APEST in Action: Case Study from Portland",
    description: "Real-world implementation of the five-fold ministry gifts. Interview with Pastor Sarah Chen about her church's transformation.",
    duration: "45:30",
    date: "January 18, 2025",
    featured: false
  },
  {
    number: 44,
    title: "Post-Christendom Evangelism",
    description: "Rethinking how we share the gospel in secular, post-Christian societies. Practical strategies that actually work.",
    duration: "41:18",
    date: "January 4, 2025",
    featured: false
  },
  {
    number: 43,
    title: "From Programs to Movements",
    description: "Why most church growth strategies fail and what we can learn from successful apostolic movements throughout history.",
    duration: "39:45",
    date: "December 21, 2024",
    featured: false
  },
  {
    number: 42,
    title: "Discipleship vs. Membership Mindset",
    description: "Shifting church culture from passive attendance to active participation in God's mission. Practical steps for leaders.",
    duration: "44:12",
    date: "December 7, 2024",
    featured: false
  }
];

export default function Podcast() {
  const featuredEpisodes = episodes.filter(episode => episode.featured);
  const regularEpisodes = episodes.filter(episode => !episode.featured);

  return (
    <div style={{ backgroundColor: '#F8F8F6' }}>
      {/* Header */}
      <section className="section-padding-lg">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-display text-display-lg mb-6" style={{ color: '#111111' }}>
              The Movemental Podcast
            </h1>
            <p className="text-xl max-w-content mx-auto leading-relaxed" style={{ color: '#444444' }}>
              Conversations on missional church renewal, APEST leadership, and building movements that last. 
              Weekly episodes exploring practical theology for church leaders.
            </p>
          </div>
          
          {/* Subscribe Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#" 
              className="bg-forest text-paper px-6 py-3 rounded font-medium hover:bg-forest/90 transition-colors inline-flex items-center gap-2"
              style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z"/>
              </svg>
              Apple Podcasts
            </a>
            <a 
              href="#" 
              className="bg-rust text-paper px-6 py-3 rounded font-medium hover:bg-rust/90 transition-colors inline-flex items-center gap-2"
              style={{ backgroundColor: '#B2613E', color: '#F8F8F6' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
              Spotify
            </a>
            <a 
              href="#" 
              className="border border-ink text-ink px-6 py-3 rounded font-medium hover:bg-ink hover:text-paper transition-colors inline-flex items-center gap-2"
              style={{ borderColor: '#111111', color: '#111111' }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6,2A3,3 0 0,0 3,5V19A3,3 0 0,0 6,22H18A3,3 0 0,0 21,19V5A3,3 0 0,0 18,2H6M12,4A1,1 0 0,1 13,5A1,1 0 0,1 12,6A1,1 0 0,1 11,5A1,1 0 0,1 12,4M6,7H18A1,1 0 0,1 19,8A1,1 0 0,1 18,9H6A1,1 0 0,1 5,8A1,1 0 0,1 6,7Z"/>
              </svg>
              RSS Feed
            </a>
          </div>
        </div>
      </section>

      {/* Latest Episode */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Latest Episode
          </h2>
          
          <div className="bg-paper border border-stone rounded-lg p-8 max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <div 
                  className="aspect-square rounded-lg shadow-lg"
                  style={{ backgroundColor: '#E3E3E0' }}
                >
                  {/* Podcast artwork placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-graphite">
                    <div className="text-center">
                      <svg className="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                      </svg>
                      <p className="text-sm">Episode #{featuredEpisodes[0].number}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <span 
                    className="text-sm font-medium px-3 py-1 rounded-full"
                    style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
                  >
                    Episode {featuredEpisodes[0].number}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-semibold mb-4" style={{ color: '#111111' }}>
                  {featuredEpisodes[0].title}
                </h3>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: '#444444' }}>
                  {featuredEpisodes[0].description}
                </p>
                <div className="flex items-center gap-6 mb-6 text-sm" style={{ color: '#444444' }}>
                  <span>{featuredEpisodes[0].date}</span>
                  <span>•</span>
                  <span>{featuredEpisodes[0].duration}</span>
                </div>
                
                {/* Audio Player Placeholder */}
                <div 
                  className="bg-stone/30 rounded-lg p-4 mb-6 flex items-center gap-4"
                >
                  <button className="w-12 h-12 bg-forest rounded-full flex items-center justify-center text-paper hover:bg-forest/90 transition-colors">
                    <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8,5.14V19.14L19,12.14L8,5.14Z"/>
                    </svg>
                  </button>
                  <div className="flex-1">
                    <div className="w-full bg-stone rounded-full h-2">
                      <div className="bg-forest h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <span className="text-sm" style={{ color: '#444444' }}>10:45 / {featuredEpisodes[0].duration}</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button 
                    className="bg-forest text-paper px-4 py-2 rounded font-medium hover:bg-forest/90 transition-colors text-sm"
                    style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
                  >
                    Listen Now
                  </button>
                  <button 
                    className="border border-ink text-ink px-4 py-2 rounded font-medium hover:bg-ink hover:text-paper transition-colors text-sm"
                    style={{ borderColor: '#111111', color: '#111111' }}
                  >
                    Download
                  </button>
                  <button 
                    className="border border-ink text-ink px-4 py-2 rounded font-medium hover:bg-ink hover:text-paper transition-colors text-sm"
                    style={{ borderColor: '#111111', color: '#111111' }}
                  >
                    Show Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Episodes */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Recent Episodes
          </h2>
          
          <div className="grid gap-6">
            {regularEpisodes.map((episode) => (
              <div 
                key={episode.number}
                className="bg-paper border border-stone rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="grid md:grid-cols-4 gap-6 items-center">
                  <div className="md:col-span-1">
                    <div 
                      className="aspect-square rounded-lg shadow-sm max-w-32"
                      style={{ backgroundColor: '#E3E3E0' }}
                    >
                      {/* Episode artwork placeholder */}
                      <div className="w-full h-full flex items-center justify-center text-graphite">
                        <div className="text-center">
                          <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                          </svg>
                          <p className="text-xs">#{episode.number}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="mb-2">
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded-full"
                        style={{ backgroundColor: '#B2613E', color: '#F8F8F6' }}
                      >
                        Episode {episode.number}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#111111' }}>
                      {episode.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: '#444444' }}>
                      {episode.description}
                    </p>
                  </div>
                  
                  <div className="md:col-span-1 text-center md:text-right">
                    <div className="mb-4 text-sm" style={{ color: '#444444' }}>
                      <div>{episode.date}</div>
                      <div>{episode.duration}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        className="bg-forest text-paper px-4 py-2 rounded font-medium hover:bg-forest/90 transition-colors text-sm"
                        style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
                      >
                        Listen
                      </button>
                      <button 
                        className="text-forest hover:text-forest/80 font-medium text-sm"
                      >
                        Show Notes →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              className="border border-ink text-ink px-8 py-4 rounded-lg font-medium hover:bg-ink hover:text-paper transition-colors"
              style={{ borderColor: '#111111', color: '#111111' }}
            >
              Load More Episodes
            </button>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="section-padding" style={{ backgroundColor: '#E3E3E0' }}>
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12" style={{ color: '#111111' }}>
            Popular Topics
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'APEST Leadership',
              'Missional DNA',
              'Church Multiplication',
              'Post-Christendom',
              'Apostolic Movements',
              'Cultural Engagement',
              'Leadership Development',
              'Discipleship',
              'Organic Church',
              'Movement Building'
            ].map((topic, index) => (
              <span 
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium hover:shadow-md transition-shadow cursor-pointer"
                style={{ 
                  backgroundColor: index % 3 === 0 ? '#1D4A38' : index % 3 === 1 ? '#B2613E' : '#4B83C2',
                  color: '#F8F8F6'
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-display-md mb-6" style={{ color: '#111111' }}>
            Never Miss an Episode
          </h2>
          <p className="text-lg mb-8" style={{ color: '#444444' }}>
            Subscribe to get notified about new episodes and receive show notes with additional resources and discussion questions.
          </p>
          <a 
            href="/newsletter" 
            className="bg-forest text-paper px-8 py-4 rounded-lg font-medium hover:bg-forest/90 transition-colors inline-block"
            style={{ backgroundColor: '#1D4A38', color: '#F8F8F6' }}
          >
            Subscribe to Updates
          </a>
        </div>
      </section>
    </div>
  );
}
