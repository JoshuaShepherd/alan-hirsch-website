import Link from 'next/link'
import { ArrowLeft, Folder, FileText, Archive, Home, Code, Lightbulb, Settings, Users, Globe } from 'lucide-react'

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Main Site
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <Archive className="w-8 h-8 text-gray-600 dark:text-gray-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Archive</h1>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            This archive contains all content that was moved during the site consolidation process. 
            Nothing was deleted - everything is preserved here for reference or potential restoration.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="grid gap-6">
            
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Homepage Designs</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Alternative homepage implementations and design explorations
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/archive/homepage-designs/alternate-homepage" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">AI-Enhanced Homepage</span>
                </Link>
                <Link href="/archive/homepage-designs/home-example-old" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Design Examples (6 versions)</span>
                </Link>
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Authentication Systems</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Alternative authentication approaches and development tools
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/archive/auth-systems/login" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Standalone Login</span>
                </Link>
                <Link href="/archive/auth-systems/signup" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Standalone Signup</span>
                </Link>
                <Link href="/archive/auth-systems/dev-signin" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Development Auth</span>
                </Link>
                <Link href="/archive/auth-systems/no-auth-testing" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Auth Testing Bypass</span>
                </Link>
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Experimental Features</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Unfinished experiments and feature prototypes
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/archive/experimental-features/ai-homepage" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">AI-Dedicated Homepage</span>
                </Link>
                <Link href="/archive/experimental-features/multimedia-demo" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Multimedia Demo</span>
                </Link>
                <Link href="/archive/experimental-features/video-library" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Video Library</span>
                </Link>
                <Link href="/archive/experimental-features/mdna-hero" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">mDNA Hero Demo</span>
                </Link>
                <Link href="/archive/experimental-features/diagnostic" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Diagnostic Tools</span>
                </Link>
                <Link href="/archive/experimental-features/apest-agents" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">APEST Agents</span>
                </Link>
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Development Tools</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Development utilities and testing tools
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/archive/development-tools/test-setup" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Test Setup Tools</span>
                </Link>
                <Link href="/archive/development-tools/test-db" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Database Testing</span>
                </Link>
                <Link href="/archive/development-tools/verify-content" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Content Verification</span>
                </Link>
                <Link href="/archive/development-tools/error" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Error Handling Tests</span>
                </Link>
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">LMS Implementations</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Alternative learning management system approaches
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/archive/lms-implementations/lms-simple" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Simple LMS Implementation</span>
                </Link>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Content Experiments</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Content format experiments and prototypes
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/archive/content-experiments/content-checklist" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Content Checklist</span>
                </Link>
                <Link href="/archive/content-experiments/content-creator" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Content Creator Tools</span>
                </Link>
                <Link href="/archive/content-experiments/articles" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Articles Section</span>
                </Link>
                <Link href="/archive/content-experiments/toolkit" className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <Folder className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Leadership Toolkit</span>
                </Link>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Archive Information</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• All archived content is preserved and accessible</li>
            <li>• These pages were moved during site consolidation to focus on strategic content</li>
            <li>• Content can be restored to main navigation if needed</li>
            <li>• Archive serves as reference for design patterns and feature implementations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}