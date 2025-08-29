import { Metadata } from 'next';
import { MissionalAssessmentHub } from '@/components/missional/MissionalAssessmentHub';

export const metadata: Metadata = {
  title: 'Missional Assessment Dashboard | Alan Hirsch',
  description: 'Comprehensive assessment and coaching tools for missional church transformation, based on Alan Hirsch\'s extensive research on missional communities and incarnational ministry.',
  keywords: [
    'missional assessment',
    'church transformation',
    'missional communities',
    'incarnational ministry',
    'contextual mission',
    'neighborhood mission',
    'alan hirsch',
    'missional coaching'
  ],
  openGraph: {
    title: 'Missional Assessment Dashboard | Alan Hirsch',
    description: 'Transform your community through comprehensive missional assessment and practical action planning tools.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Missional Assessment Dashboard | Alan Hirsch',
    description: 'Transform your community through comprehensive missional assessment and practical action planning tools.',
  },
};

export default function MissionalAssessmentPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-display-xl font-display text-foreground mb-4">
              Missional Assessment Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover your missional maturity, understand your context, and create actionable plans 
              for transforming your community through incarnational ministry.
            </p>
          </div>

          <MissionalAssessmentHub />
        </div>
      </div>
    </main>
  );
}
