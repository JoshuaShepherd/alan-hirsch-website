import { AuthProvider } from '@/components/lms/auth/AuthProvider'

export default function LMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </AuthProvider>
  )
}
