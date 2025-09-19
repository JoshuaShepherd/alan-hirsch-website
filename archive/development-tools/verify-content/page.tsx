import ContentVerificationComponent from '@/components/ContentVerificationComponent'

export const metadata = {
  title: 'Content Verification - Alan Hirsch',
  description: 'Verify that all book content has been uploaded to Supabase database',
}

export default function ContentVerificationPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ContentVerificationComponent />
    </main>
  )
}