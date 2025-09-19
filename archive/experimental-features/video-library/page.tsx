import { Metadata } from 'next';
import VideoLibrary from '@/components/multimedia/VideoLibrary';

export const metadata: Metadata = {
  title: 'Video Library | Alan Hirsch',
  description: 'Explore Alan Hirsch\'s comprehensive video library featuring teachings, interviews, conference presentations, and workshops on missional leadership and apostolic genius.',
  keywords: ['video library', 'teachings', 'interviews', 'conferences', 'workshops', 'missional leadership', 'apostolic genius', 'APEST', 'church planting'],
  openGraph: {
    title: 'Video Library | Alan Hirsch',
    description: 'Explore Alan Hirsch\'s comprehensive video library featuring teachings, interviews, conference presentations, and workshops.',
    type: 'website',
    url: 'https://alanhirsch.org/video-library',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Library | Alan Hirsch',
    description: 'Explore Alan Hirsch\'s comprehensive video library featuring teachings, interviews, conference presentations, and workshops.',
  }
};

export default function VideoLibraryPage() {
  return (
    <main className="section-padding">
      <div className="max-w-container mx-auto px-4">
        <VideoLibrary />
      </div>
    </main>
  );
}
