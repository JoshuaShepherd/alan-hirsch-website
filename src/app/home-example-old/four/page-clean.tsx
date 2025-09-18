import Link from "next/link";
import Image from "next/image";
import { 
  BookOpen, 
  Users, 
  Video, 
  ArrowRight, 
  Play,
  Calendar,
  BarChart3,
  Award,
  Clock,
  TrendingUp,
  CheckCircle2,
  Star,
  Headphones,
  Download,
  Mail,
  Target,
  Trophy,
  Smartphone,
  Globe,
  ChevronDown
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      {/* Hero Section - VUCit Inspired */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Main Content */}
            <div className="space-y-8">
              {/* Brand/Logo Area */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">AH</span>
                  </div>
                  <span className="text-2xl font-bold tracking-wide">Alan Hirsch</span>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                  Welcome to the
                  <br />
                  <span className="text-white">New Movemental World!</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  A comprehensive platform for missional church renewal, featuring AI-powered learning, 
                  interactive content, and community-driven transformation.
                </p>
              </div>

              {/* App Store Style CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/ai-homepage"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-lg font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Video className="h-6 w-6" />
                  Try AI Assistant
                </Link>
                <Link 
                  href="/books"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/20 bg-white/10 backdrop-blur text-white text-lg font-bold rounded-xl hover:bg-white/20 transition-all"
                >
                  <BookOpen className="h-6 w-6" />
                  Browse Library
                </Link>
              </div>
            </div>

            {/* Right: Simple Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-3xl p-8">
                <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-2xl p-6 shadow-xl">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Movement Platform</h3>
                    <p className="text-gray-600 mb-4">
                      Complete ecosystem for church renewal and leadership development
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">15+</div>
                        <div>Books</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">5</div>
                        <div>AI Agents</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">892</div>
                        <div>Discussions</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">67+</div>
                        <div>Countries</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leader Categories Section */}
      <section className="section-padding bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Designed for Every Type of Leader
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Whether you're a senior pastor, church planter, seminary student, lay leader, or movement catalyst—
              this platform meets you where you are.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Senior Pastor */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Senior Pastor</h3>
              <p className="text-gray-600 mb-6">
                Resources for leaders at every level—from foundational principles to advanced movement strategies.
              </p>
              <Link href="/lms/dashboard" className="text-blue-500 font-semibold hover:text-blue-600 inline-flex items-center gap-1">
                Explore Resources <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Church Planter */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Church Planter</h3>
              <p className="text-gray-600 mb-6">
                Practical, usable tools and frameworks that work in real-world ministry contexts.
              </p>
              <Link href="/movement-leaders" className="text-green-500 font-semibold hover:text-green-600 inline-flex items-center gap-1">
                Start Planting <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Seminary Student */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Seminary Student</h3>
              <p className="text-gray-600 mb-6">
                Course cards and structured learning that feels familiar while expanding your world.
              </p>
              <Link href="/lms/courses/new" className="text-purple-500 font-semibold hover:text-purple-600 inline-flex items-center gap-1">
                Browse Courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Ministry?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of leaders using this platform to build movements, grow communities, and create lasting impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/membership" 
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 justify-center"
            >
              Start Your Journey
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link 
              href="/ai-homepage" 
              className="border border-white/30 bg-white/10 backdrop-blur px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors inline-flex items-center gap-2 justify-center"
            >
              <Play className="h-4 w-4" />
              Try AI Assistant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
