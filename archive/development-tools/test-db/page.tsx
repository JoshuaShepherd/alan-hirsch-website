import DatabaseTestComponent from '@/components/DatabaseTestComponent'

export const metadata = {
  title: 'Database Test - Alan Hirsch',
  description: 'Supabase database connection and status testing',
}

export default function DatabaseTestPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <DatabaseTestComponent />
    </main>
  )
}