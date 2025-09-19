import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Error - Alan Hirsch',
  description: 'An error occurred during authentication.',
}

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sorry, there was an error with your authentication. This could be due to:
          </p>
        </div>
        
        <div className="text-left bg-gray-100 rounded-lg p-4">
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Invalid or expired confirmation link</li>
            <li>• Incorrect email or password</li>
            <li>• Account already exists with this email</li>
            <li>• Network connection issues</li>
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Try Signing In Again
          </Link>
          
          <Link
            href="/signup"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create New Account
          </Link>
          
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  )
}