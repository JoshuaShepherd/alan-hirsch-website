import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Books - Alan Hirsch",
  description: "Explore Alan Hirsch's collection of transformative works on missional church, leadership, and spiritual renewal.",
};

const books = [
  {
    id: "the-forgotten-ways",
    title: "The Forgotten Ways",
    subtitle: "Reactivating Apostolic Movements",
    description: "A groundbreaking exploration of how to recover the missional DNA that once made the church a world-transforming movement.",
    cover: "/images/books/the-forgotten-ways.png",
    hasEbook: true,
    categories: ["Missional Church", "Movement"]
  },
  {
    id: "the-permanent-revolution",
    title: "The Permanent Revolution",
    subtitle: "Apostolic Imagination and Practice for the 21st Century Church",
    description: "Discover how APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) can revolutionize your understanding of ministry.",
    cover: "/images/books/the-permanent-revolution-book.png",
    hasEbook: false,
    categories: ["APEST", "Leadership"]
  },
  {
    id: "rejesus",
    title: "ReJesus",
    subtitle: "A Wild Messiah for a Missional Church",
    description: "A fresh look at Jesus that challenges conventional Christianity and calls us back to authentic discipleship.",
    cover: "/images/books/rejesus-book.png",
    hasEbook: true,
    categories: ["Christology", "Discipleship"]
  },
  {
    id: "the-shaping-of-things-to-come",
    title: "The Shaping of Things to Come",
    subtitle: "Innovation and Mission for the 21st Century Church",
    description: "A visionary work that reimagines what the church could become in our post-Christendom world.",
    cover: "/images/books/the-shaping-of-things-to-come-book.png",
    hasEbook: false,
    categories: ["Innovation", "Future Church"]
  },
  {
    id: "the-faith-of-leap",
    title: "The Faith of Leap",
    subtitle: "Embracing a Theology of Risk, Adventure & Courage",
    description: "An invitation to embrace the adventure of faith and step into the unknown with courage and hope.",
    cover: "/images/books/the-faith-of-leap-book.png",
    hasEbook: true,
    categories: ["Faith", "Adventure"]
  },
  {
    id: "untamed",
    title: "Untamed",
    subtitle: "Reactivating a Missional Form of Discipleship",
    description: "Challenges us to break free from domesticated faith and embrace the wild, transformative power of true discipleship.",
    cover: "/images/books/untamed-book.png",
    hasEbook: true,
    categories: ["Discipleship", "Transformation"]
  },
  {
    id: "the-forgotten-ways-handbook",
    title: "The Forgotten Ways Handbook",
    subtitle: "A Practical Guide for Developing Missional Churches",
    description: "The practical companion to The Forgotten Ways, providing tools and exercises for implementing missional principles.",
    cover: "/images/books/the-forgotten-ways-handbook.png",
    hasEbook: false,
    categories: ["Practical", "Handbook"]
  },
  {
    id: "right-here-right-now",
    title: "Right Here, Right Now",
    subtitle: "Everyday Mission for Everyday People",
    description: "Discover how to live missionally in your everyday context and relationships.",
    cover: "/images/books/right-here-right-now-book.png",
    hasEbook: false,
    categories: ["Everyday Mission", "Practical"]
  },
  {
    id: "on-the-verge",
    title: "On the Verge",
    subtitle: "A Journey into the Apostolic Future of the Church",
    description: "A prophetic call to embrace the apostolic dimensions of church life and mission.",
    cover: "/images/books/on-the-verge-book.png",
    hasEbook: false,
    categories: ["Apostolic", "Future"]
  }
];

export default function Books() {
  return (
    <div className="bg-page">
      {/* Hero Section */}
      <section className="section-padding-lg">
        <div className="max-w-container mx-auto px-6 text-center">
          <h1 className="font-display text-display-lg mb-6 text-foreground">
            Books & Interactive Ebooks
          </h1>
          <p className="text-xl max-w-content mx-auto leading-relaxed mb-8">
            Dive deep into transformative works on missional church, spiritual renewal, and kingdom leadership. 
            Select books are available as interactive digital experiences.
          </p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <article key={book.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="relative mb-4">
                  <Image
                    src={book.cover}
                    alt={`${book.title} book cover`}
                    width={200}
                    height={300}
                    className="w-full h-64 object-contain rounded"
                  />
                  {book.hasEbook && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                      Interactive Ebook
                    </div>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  {book.categories.map((category) => (
                    <span key={category} className="inline-block bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium mr-2">
                      {category}
                    </span>
                  ))}
                </div>

                <h3 className="font-display text-xl font-semibold mb-2 text-card-foreground group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                {book.subtitle && (
                  <h4 className="text-sm mb-3 italic">
                    {book.subtitle}
                  </h4>
                )}
                
                <p className="mb-6 leading-relaxed">
                  {book.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  {book.hasEbook && (
                    <Link
                      href={`/books/${book.id}/read`}
                      className="btn-primary text-center flex-1"
                    >
                      📖 Read Interactive Ebook
                    </Link>
                  )}
                  <Link
                    href={`/books/${book.id}`}
                    className="btn-outline text-center flex-1"
                  >
                    📚 Learn More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-section">
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-display-md mb-6 text-foreground">
            Experience Books Like Never Before
          </h2>
          <p className="text-lg mb-8">
            Our interactive ebooks combine the depth of Alan's written work with enhanced navigation, 
            multimedia elements, and features designed to deepen your understanding and application.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-primary-foreground text-xl">📑</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Chapter Navigation</h3>
              <p className="text-sm">Easy chapter-by-chapter browsing with progress tracking</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-primary-foreground text-xl">🔍</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Search & Find</h3>
              <p className="text-sm">Powerful search across all chapters and content</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-primary-foreground text-xl">🎧</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Multimedia Rich</h3>
              <p className="text-sm">Audio and video elements enhance understanding</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
