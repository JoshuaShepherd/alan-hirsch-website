'use client'

import Link from 'next/link'
import { BookOpen, Users, Settings, BarChart3, Video, Play } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Manage your website content and settings</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Blog Management */}
          <Link 
            href="/admin/blog"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Blog Posts
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Manage blog content
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Create, edit, and publish blog posts with the TipTap editor
                </p>
              </div>
            </div>
          </Link>

          {/* Video Management */}
          <Link 
            href="/admin/video"
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Video className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Video Content
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Manage video library
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Upload, organize, and optimize video content for your platform
                </p>
              </div>
            </div>
          </Link>

          {/* User Management */}
          <div className="bg-white overflow-hidden shadow rounded-lg opacity-50">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Users
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Coming Soon
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Manage user accounts and permissions
                </p>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white overflow-hidden shadow rounded-lg opacity-50">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Analytics
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Coming Soon
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  View site statistics and performance
                </p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white overflow-hidden shadow rounded-lg opacity-50">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Settings className="h-8 w-8 text-gray-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Settings
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      Coming Soon
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Configure site settings and preferences
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/admin/blog/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              New Blog Post
            </Link>
            
            <Link 
              href="/blog"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Public Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
