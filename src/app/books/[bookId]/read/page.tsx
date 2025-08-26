import { notFound } from 'next/navigation';
import { getBookStructure } from '@/lib/books';
import { EbookReader } from '@/components/EbookReader';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{
    bookId: string;
  }>;
  searchParams: Promise<{
    chapter?: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bookId } = await params;
  const book = getBookStructure(bookId);
  
  if (!book) {
    return {
      title: 'Book Not Found',
    };
  }

  return {
    title: `${book.title} - Interactive Ebook | Alan Hirsch`,
    description: `Read ${book.title} by ${book.author} as an interactive digital experience with enhanced navigation and multimedia elements.`,
  };
}

export default async function BookReadPage({ params, searchParams }: Props) {
  const { bookId } = await params;
  const { chapter } = await searchParams;
  
  const book = getBookStructure(bookId);

  if (!book) {
    notFound();
  }

  return <EbookReader book={book} initialChapter={chapter} />;
}
