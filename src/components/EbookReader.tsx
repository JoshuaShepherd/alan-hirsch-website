'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Search, Menu, Clock, BarChart3 } from 'lucide-react';

interface BookChapter {
  slug: string;
  title: string;
  chapter: number;
  content: string;
  metadata: {
    bookTitle: string;
    author: string;
    description: string;
    keywords: string[];
    readingTime: number;
    difficulty: string;
  };
}

interface BookStructure {
  id: string;
  title: string;
  author: string;
  chapters: BookChapter[];
}

interface EbookReaderProps {
  book: BookStructure;
  initialChapter?: string;
}

export function EbookReader({ book, initialChapter }: EbookReaderProps) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [showToc, setShowToc] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    chapter: BookChapter;
    matches: Array<{ text: string; context: string }>;
  }>>([]);
  const [readingProgress, setReadingProgress] = useState(0);

  const currentChapter = book.chapters[currentChapterIndex];

  useEffect(() => {
    if (initialChapter) {
      const chapterIndex = book.chapters.findIndex(ch => ch.slug === initialChapter);
      if (chapterIndex !== -1) {
        setCurrentChapterIndex(chapterIndex);
      }
    }
  }, [initialChapter, book.chapters]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxHeight, 1) * 100;
      setReadingProgress(progress);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).tagName === 'INPUT') return;
      
      if (e.key === 'ArrowLeft' && currentChapterIndex > 0) {
        previousChapter();
      } else if (e.key === 'ArrowRight' && currentChapterIndex < book.chapters.length - 1) {
        nextChapter();
      } else if (e.key === 'Escape') {
        setShowToc(false);
      } else if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder="Search content..."]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentChapterIndex, book.chapters.length]);

  const nextChapter = () => {
    if (currentChapterIndex < book.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const previousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const goToChapter = (index: number) => {
    setCurrentChapterIndex(index);
    setShowToc(false);
    window.scrollTo(0, 0);
  };

  const handleSearch = async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    // Simple client-side search for demo
    const results = book.chapters.filter(chapter => 
      chapter.content.toLowerCase().includes(query.toLowerCase()) ||
      chapter.title.toLowerCase().includes(query.toLowerCase())
    ).map(chapter => ({
      chapter,
      matches: [{ text: query, context: chapter.content.substring(0, 200) + '...' }]
    }));
    
    setSearchResults(results);
  };

  const formatContent = (content: string) => {
    // Convert markdown-style content to JSX with multimedia support
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-display font-semibold mb-6 text-foreground">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-display font-semibold mb-4 mt-8 text-foreground">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-display font-semibold mb-3 mt-6 text-foreground">{line.substring(4)}</h3>;
        }
        if (line.startsWith('> ')) {
          return <blockquote key={index} className="border-l-4 border-primary pl-4 my-4 italic ">{line.substring(2)}</blockquote>;
        }
        if (line.startsWith('- ')) {
          return <li key={index} className="ml-4 mb-1 text-foreground">{line.substring(2)}</li>;
        }
        if (line.startsWith('[AUDIO:')) {
          const title = line.match(/\[AUDIO:(.*?)\]/)?.[1] || 'Audio Clip';
          return (
            <div key={index} className="my-6 p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎧</span>
                <h4 className="font-semibold text-card-foreground">{title}</h4>
              </div>
              <div className="bg-secondary/20 rounded p-3 text-center ">
                <p className="text-sm">Interactive audio content will be available in the full version</p>
                <button className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors">
                  🎵 Play Audio Commentary
                </button>
              </div>
            </div>
          );
        }
        if (line.startsWith('[VIDEO:')) {
          const title = line.match(/\[VIDEO:(.*?)\]/)?.[1] || 'Video Content';
          return (
            <div key={index} className="my-6 p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎥</span>
                <h4 className="font-semibold text-card-foreground">{title}</h4>
              </div>
              <div className="bg-secondary/20 rounded p-3 text-center  aspect-video flex items-center justify-center">
                <div>
                  <p className="text-sm mb-2">Interactive video content will be available in the full version</p>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors">
                    ▶️ Play Video
                  </button>
                </div>
              </div>
            </div>
          );
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="mb-4 leading-relaxed text-foreground">{line}</p>;
      });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-secondary z-50">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-1 bg-background/95 backdrop-blur-sm border-b border-border z-40 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/books" className="text-primary hover:text-primary/80">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display text-lg font-semibold text-foreground truncate max-w-64">
                {book.title}
              </h1>
              <p className="text-sm ">by {book.author}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowToc(!showToc)}
              className="p-2 rounded-md hover:bg-secondary transition-colors"
              title="Table of Contents"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 flex gap-8">
        {/* Table of Contents Sidebar */}
        <aside className={`${showToc ? 'block' : 'hidden'} lg:block w-80 shrink-0`}>
          <div className="sticky top-32">
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <h3 className="font-display text-lg font-semibold mb-4 text-card-foreground">Table of Contents</h3>
              <nav className="space-y-2 max-h-96 overflow-y-auto">
                {book.chapters.map((chapter, index) => (
                  <button
                    key={chapter.slug}
                    onClick={() => goToChapter(index)}
                    className={`w-full text-left p-2 rounded text-sm transition-colors ${
                      index === currentChapterIndex
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary text-card-foreground'
                    }`}
                  >
                    <div className="font-medium">{chapter.title}</div>
                    <div className="text-xs opacity-75 flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3" />
                      {chapter.metadata.readingTime}min
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Search */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-display text-lg font-semibold mb-4 text-card-foreground">Search</h3>
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search content... (Press / to focus)"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {searchResults.length > 0 && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => goToChapter(book.chapters.indexOf(result.chapter))}
                      className="w-full text-left p-2 rounded text-sm hover:bg-secondary transition-colors"
                    >
                      <div className="font-medium text-card-foreground">{result.chapter.title}</div>
                      <div className="text-xs  mt-1 line-clamp-2">
                        {result.matches[0]?.context}
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {/* Keyboard Shortcuts */}
              <div className="mt-4 pt-4 border-t border-border text-xs  space-y-1">
                <div className="font-medium mb-2">Keyboard Shortcuts:</div>
                <div>← → Navigate chapters</div>
                <div>/ Focus search</div>
                <div>Esc Close menu</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Chapter Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Chapter {currentChapter.chapter}
              </span>
              <div className="flex items-center gap-2 text-sm ">
                <Clock className="w-4 h-4" />
                {currentChapter.metadata.readingTime}min read
              </div>
              <div className="flex items-center gap-2 text-sm ">
                <BarChart3 className="w-4 h-4" />
                {currentChapter.metadata.difficulty}
              </div>
            </div>
            <h1 className="font-display text-3xl font-semibold mb-4 text-foreground">
              {currentChapter.title}
            </h1>
            {currentChapter.metadata.description && (
              <p className="text-lg  mb-6">{currentChapter.metadata.description}</p>
            )}
          </div>

          {/* Chapter Content */}
          <article className="prose prose-lg max-w-none">
            <div className="space-y-4">
              {formatContent(currentChapter.content)}
            </div>
          </article>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-border">
            <button
              onClick={previousChapter}
              disabled={currentChapterIndex === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Chapter
            </button>
            
            <span className="text-sm ">
              {currentChapterIndex + 1} of {book.chapters.length}
            </span>
            
            <button
              onClick={nextChapter}
              disabled={currentChapterIndex === book.chapters.length - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next Chapter
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
