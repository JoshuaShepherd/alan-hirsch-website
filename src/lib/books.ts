import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BookChapter {
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

export interface BookStructure {
  id: string;
  title: string;
  author: string;
  chapters: BookChapter[];
}

const BOOKS_DIRECTORY = path.join(process.cwd(), 'src/content/books');

export function getAvailableBooks(): string[] {
  const books = fs.readdirSync(BOOKS_DIRECTORY);
  return books.filter(book => {
    const bookPath = path.join(BOOKS_DIRECTORY, book);
    return fs.statSync(bookPath).isDirectory();
  });
}

export function getBookStructure(bookId: string): BookStructure | null {
  const bookPath = path.join(BOOKS_DIRECTORY, bookId);
  
  if (!fs.existsSync(bookPath)) {
    return null;
  }

  const files = fs.readdirSync(bookPath);
  const mdxFiles = files.filter(file => file.endsWith('.mdx')).sort();
  
  const chapters: BookChapter[] = [];
  let bookTitle = '';
  let author = '';

  for (const file of mdxFiles) {
    const filePath = path.join(bookPath, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Set book metadata from first chapter
    if (!bookTitle && data.bookTitle) {
      bookTitle = data.bookTitle;
      author = data.author || 'Alan Hirsch';
    }

    chapters.push({
      slug: data.slug || file.replace('.mdx', ''),
      title: data.title,
      chapter: data.chapter || 0,
      content,
      metadata: {
        bookTitle: data.bookTitle,
        author: data.author,
        description: data.description,
        keywords: data.keywords || [],
        readingTime: data.readingTime || 10,
        difficulty: data.difficulty || 'intermediate'
      }
    });
  }

  return {
    id: bookId,
    title: bookTitle,
    author,
    chapters: chapters.sort((a, b) => a.chapter - b.chapter)
  };
}

export function getBookChapter(bookId: string, chapterSlug: string): BookChapter | null {
  const bookStructure = getBookStructure(bookId);
  if (!bookStructure) return null;
  
  return bookStructure.chapters.find(chapter => chapter.slug === chapterSlug) || null;
}

export function searchBookContent(bookId: string, query: string): Array<{
  chapter: BookChapter;
  matches: Array<{
    text: string;
    context: string;
  }>;
}> {
  const bookStructure = getBookStructure(bookId);
  if (!bookStructure) return [];

  const results: Array<{
    chapter: BookChapter;
    matches: Array<{
      text: string;
      context: string;
    }>;
  }> = [];

  const searchTerms = query.toLowerCase().split(' ');

  for (const chapter of bookStructure.chapters) {
    const content = chapter.content.toLowerCase();
    const matches: Array<{ text: string; context: string }> = [];

    for (const term of searchTerms) {
      if (content.includes(term)) {
        const sentences = chapter.content.split(/[.!?]+/);
        for (const sentence of sentences) {
          if (sentence.toLowerCase().includes(term)) {
            matches.push({
              text: term,
              context: sentence.trim().substring(0, 200) + '...'
            });
          }
        }
      }
    }

    if (matches.length > 0) {
      results.push({
        chapter,
        matches
      });
    }
  }

  return results;
}
