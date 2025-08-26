import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getBookStructure } from '@/lib/books';
import { Clock, BookOpen, BarChart3, Tag } from 'lucide-react';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{
    bookId: string;
  }>;
}

const bookCovers: { [key: string]: string } = {
  'the-forgotten-ways': '/images/books/the-forgotten-ways.png',
  'rejesus': '/images/books/rejesus-book.png',
  'the-faith-of-leap': '/images/books/the-faith-of-leap-book.png',
  'untamed': '/images/books/untamed-book.png',
  'the-permanent-revolution': '/images/books/the-permanent-revolution-book.png',
  'the-shaping-of-things-to-come': '/images/books/the-shaping-of-things-to-come-book.png',
  'the-forgotten-ways-handbook': '/images/books/the-forgotten-ways-handbook.png',
  'right-here-right-now': '/images/books/right-here-right-now-book.png',
  'on-the-verge': '/images/books/on-the-verge-book.png',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bookId } = await params;
  const book = getBookStructure(bookId);
  
  if (!book) {
    return {
      title: 'Book Not Found',
    };
  }

  return {
    title: `${book.title} | Alan Hirsch`,
    description: `Explore ${book.title} by ${book.author}. Discover transformative insights on missional church, leadership, and spiritual renewal.`,
  };
}

export default async function BookDetailPage({ params }: Props) {
  const { bookId } = await params;
  const book = getBookStructure(bookId);

  if (!book) {
    notFound();
  }

  const coverImage = bookCovers[bookId] || '/images/books/default-book.png';
  const totalReadingTime = book.chapters.reduce((total, chapter) => total + chapter.metadata.readingTime, 0);
  
  // Get unique keywords from all chapters
  const allKeywords = Array.from(new Set(
    book.chapters.flatMap(chapter => chapter.metadata.keywords || [])
  ));

  return (
    <div className="bg-page">
      {/* Hero Section */}
      <section className="section-padding-lg bg-section">
        <div className="max-w-container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <Image
                src={coverImage}
                alt={`${book.title} book cover`}
                width={400}
                height={600}
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="lg:col-span-8">
              <div className="mb-6">
                <Link href="/books" className="text-primary hover:text-primary/80 text-sm font-medium mb-4 inline-block">
                  ← Back to Books
                </Link>
              </div>
              
              <h1 className="font-display text-display-lg mb-4 text-foreground">
                {book.title}
              </h1>
              <p className="text-xl mb-6">by {book.author}</p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {book.chapters.length} chapters
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  ~{totalReadingTime} min total
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Intermediate level
                </div>
              </div>

              {/* Keywords */}
              {allKeywords.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Topics Covered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allKeywords.slice(0, 10).map((keyword) => (
                      <span key={keyword} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/books/${bookId}/read`}
                  className="btn-primary text-center"
                >
                  📖 Start Reading Interactive Ebook
                </Link>
                <button className="btn-outline text-center">
                  🛒 Purchase Physical Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Overview */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-12 text-foreground">
            What You'll Discover
          </h2>
          
          <div className="grid gap-6">
            {book.chapters.map((chapter) => (
              <div key={chapter.slug} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Chapter {chapter.chapter}
                      </span>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        {chapter.metadata.readingTime}min
                      </div>
                    </div>
                    
                    <h3 className="font-display text-xl font-semibold mb-3 text-card-foreground">
                      {chapter.title}
                    </h3>
                    
                    {chapter.metadata.description && (
                      <p className="leading-relaxed mb-4">
                        {chapter.metadata.description}
                      </p>
                    )}
                    
                    {chapter.metadata.keywords && chapter.metadata.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {chapter.metadata.keywords.slice(0, 5).map((keyword) => (
                          <span key={keyword} className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <Link
                    href={`/books/${bookId}/read?chapter=${chapter.slug}`}
                    className="ml-6 px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors text-sm font-medium"
                  >
                    Read Chapter
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-section">
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-display-md mb-6 text-foreground">
            Ready to Dive In?
          </h2>
          <p className="text-lg mb-8">
            Experience this transformative work through our interactive ebook platform with enhanced navigation, search, and multimedia elements.
          </p>
          <Link
            href={`/books/${bookId}/read`}
            className="btn-primary inline-block"
          >
            Start Reading Now
          </Link>
        </div>
      </section>
    </div>
  );
}
