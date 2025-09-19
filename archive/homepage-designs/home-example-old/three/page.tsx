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
              </div>

              {/* App Store Style CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/lms/dashboard" 
                  className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Learning
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  href="/books" 
                  className="inline-flex items-center gap-3 px-8 py-4 border-2 border-indigo-500 text-indigo-400 text-lg font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                >
                  Explore Books
                </Link>
              </div>
            </div>

            {/* Right: Phone Mockup with Interface */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Background Blob */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-[3rem] transform rotate-3 scale-110"></div>
                
                {/* Phone Mockup */}
                <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border border-gray-700">
                  <div className="bg-black rounded-[2.5rem] overflow-hidden w-80 h-[640px] relative">
                    {/* Phone Interface */}
                    <div className="p-6 space-y-6">
                      {/* Header */}
                      <div className="flex justify-between items-center pt-8">
                        <div className="text-lg font-bold text-white">Movemental</div>
                        <div className="w-6 h-6 bg-indigo-500 rounded-full"></div>
                      </div>

                      {/* Welcome Message */}
                      <div className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-2xl p-6 text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Ready to grow, together?</h3>
                        <p className="text-sm text-gray-300 mb-4">Start your movemental journey and join thousands building kingdom movements.</p>
                        
                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold">
                            Begin Assessment
                          </button>
                          <button className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold">
                            Browse Courses
                          </button>
                        </div>
                        
                        <div className="mt-4 text-center">
                          <p className="text-xs text-gray-400">
                            Already have access? <span className="text-indigo-400">Sign In</span>
                          </p>
                        </div>
                      </div>

                      {/* Feature Icons */}
                      <div className="grid grid-cols-3 gap-4">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border border-indigo-500/30">
                            <div className="w-6 h-6 bg-indigo-500/20 rounded-full"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <h2 className="text-xl font-medium text-gray-400">The Problem</h2>
            <span className="text-gray-500">01/06</span>
          </div>
          
          <div className="max-w-4xl">
            <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
              Since the Great Commission, 
              <span className="block">church life has changed a lot.</span>
              <span className="block">Institutionalization, declining</span>
              <span className="block">engagement & loss of</span>
              <span className="block">movement DNA created</span>
              <span className="text-indigo-400 block">the new normal</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image/Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-3xl p-8">
                <Image
                  src="/images/alan-hirsch-portrait.jpg"
                  alt="Church Renewal"
                  width={400}
                  height={300}
                  className="rounded-2xl w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Right: Stats */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold mb-4">By the Year 2030</h3>
                <p className="text-gray-400 text-lg">
                  Church leaders will need to adapt up to 80% of their ministry approach due to the accelerating cultural shift.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 border-2 border-indigo-500 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-indigo-400">67%</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Institutional Drift</h4>
                    <p className="text-gray-400">Churches admit struggling with traditional models failing to engage new generations.</p>
                    <p className="text-xs text-gray-500 mt-1">*Barna Research on Future of Church, 2024</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 border-2 border-green-500 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xl font-bold text-green-400">89%</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">Movement Hunger</h4>
                    <p className="text-gray-400">Leaders desire to see authentic disciple-making movements but lack practical frameworks.</p>
                    <p className="text-xs text-gray-500 mt-1">*Global Leadership Survey, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-500/5 to-purple-600/5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-between items-start mb-12">
            <h2 className="text-xl font-medium text-gray-400">The Vision</h2>
            <span className="text-gray-500">02/06</span>
          </div>

          <div className="w-16 h-16 bg-black border border-indigo-500 rounded-full flex items-center justify-center mx-auto mb-12">
            <span className="text-indigo-400 text-2xl">✌️</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold leading-tight mb-16">
            To create a movement &amp; skill
            <br />
            <span className="block">multiplication ecosystem to</span>
            <br />
            <span className="block">empower leaders to excel</span>
            <br />
            <span className="block">missionally in the new</span>
            <br />
            <span className="text-indigo-400">movemental world!</span>
          </h2>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 overflow-hidden">
                <div className="relative">
                  <Image
                    src="/images/alan-hirsch-1.jpeg"
                    alt="Movement Building"
                    width={400}
                    height={300}
                    className="rounded-2xl w-full h-64 object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-8">
              <div className="w-16 h-16 bg-black border border-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-indigo-400 text-2xl">✌️</span>
              </div>

              <h3 className="text-3xl font-bold">Pathway to the Future</h3>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                The vision behind this platform was to create scientifically based, 
                systematically integrated learning for the new world of ministry, using proven 
                methods and principles from movemental thinking, apostolic genius and 
                multiplicative leadership.
              </p>

              <div className="flex gap-8">
                <div className="text-center">
                  <div className="border border-indigo-500 rounded-2xl px-6 py-4 mb-2">
                    <div className="text-2xl font-bold text-indigo-400">6</div>
                    <div className="text-sm text-gray-400">Elements</div>
                  </div>
                  <div className="text-sm font-semibold">mDNA</div>
                  <div className="text-xs text-gray-500">framework</div>
                </div>

                <div className="text-center">
                  <div className="border border-indigo-500 rounded-2xl px-6 py-4 mb-2">
                    <div className="text-2xl font-bold text-indigo-400">5Q</div>
                    <div className="text-sm text-gray-400">Gifts</div>
                  </div>
                  <div className="text-sm font-semibold">APEST</div>
                  <div className="text-xs text-gray-500">ministry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Platform Preview - Updated Content */}
      <section className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-between items-start mb-12">
              <h2 className="text-xl font-medium text-gray-400">The Platform</h2>
              <span className="text-gray-500">03/06</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              More Than Just Content—A Movement Ecosystem
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the integration of library, courses, and cohorts designed to multiply impact.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Digital Library */}
            <div className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
                <BookOpen className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Digital Library</h3>
              <p className="text-gray-400 mb-6">
                Access Alan's complete body of work—15+ books, 250+ podcast episodes, and exclusive resources 
                all searchable and cross-referenced.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Interactive reading experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Downloadable resources</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Cross-book connections</span>
                </div>
              </div>
              <Link href="/books" className="text-indigo-400 font-semibold hover:text-indigo-300 inline-flex items-center gap-1">
                Explore Library <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Structured Courses */}
            <div className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
                <Play className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Structured Courses</h3>
              <p className="text-gray-400 mb-6">
                Step-by-step learning paths with assessments, progress tracking, and practical applications 
                for real ministry contexts.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Self-paced learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Progress tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Certificates of completion</span>
                </div>
              </div>
              <Link href="/lms/dashboard" className="text-indigo-400 font-semibold hover:text-indigo-300 inline-flex items-center gap-1">
                Browse Courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Learning Cohorts */}
            <div className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
                <Users className="h-8 w-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Learning Cohorts</h3>
              <p className="text-gray-400 mb-6">
                Join small groups of practitioners working through content together with expert facilitation 
                and peer learning.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Expert facilitation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Peer collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Real-world application</span>
                </div>
              </div>
              <Link href="/community" className="text-indigo-400 font-semibold hover:text-indigo-300 inline-flex items-center gap-1">
                Join Cohort <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/lms/dashboard" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-xl hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Experience the Full Platform
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Leaders Section - Adapted */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-between items-start mb-12">
              <h2 className="text-xl font-medium text-gray-400">Built For Leaders</h2>
              <span className="text-gray-500">04/06</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Built for Every Type of Leader
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Whether you're a senior pastor, church planter, seminary student, lay leader, or movement catalyst—
              this platform meets you where you are.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Senior Pastor */}
            <div className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 border border-blue-500/30">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Senior Pastor</h3>
              <p className="text-gray-400 mb-6">
                Resources for leaders at every level—from foundational principles to advanced movement strategies.
              </p>
              <Link href="/lms/dashboard" className="text-blue-400 font-semibold hover:text-blue-300 inline-flex items-center gap-1">
                Explore Resources <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Church Planter */}
            <div className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6 border border-green-500/30">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Church Planter</h3>
              <p className="text-gray-400 mb-6">
                Practical, usable tools and frameworks that work in real-world ministry contexts.
              </p>
              <Link href="/movement-leaders" className="text-green-400 font-semibold hover:text-green-300 inline-flex items-center gap-1">
                Start Planting <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Seminary Student */}
            <div className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 border border-purple-500/30">
                <BookOpen className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Seminary Student</h3>
              <p className="text-gray-400 mb-6">
                Course cards and structured learning that feels familiar while expanding your world.
              </p>
              <Link href="/lms/courses/new" className="text-purple-400 font-semibold hover:text-purple-300 inline-flex items-center gap-1">
                Browse Courses <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Lay Leader */}
            <div className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 border border-yellow-500/30">
                <Award className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Lay Leader</h3>
              <p className="text-gray-400 mb-6">
                Clear pathways and accessible content that welcomes you into meaningful ministry.
              </p>
              <Link href="/apest-agents" className="text-yellow-400 font-semibold hover:text-yellow-300 inline-flex items-center gap-1">
                Find Your Path <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Movement Leader */}
            <div className="bg-black border border-gray-800 rounded-2xl p-8 hover:border-indigo-500/50 transition-all">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6 border border-red-500/30">
                <Video className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-4">Movement Leader</h3>
              <p className="text-gray-400 mb-6">
                A complete ecosystem design—library, courses, and cohorts integrated seamlessly.
              </p>
              <Link href="/100movements" className="text-red-400 font-semibold hover:text-red-300 inline-flex items-center gap-1">
                Scale Impact <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* All Leaders CTA */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-indigo-500/30 rounded-2xl p-8 hover:border-indigo-500/50 transition-all lg:col-span-1 md:col-span-2 lg:col-start-2">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Not Sure Where to Start?</h3>
                <p className="text-gray-400 mb-6">
                  Take our quick assessment to find your optimal learning path and connect with the right community.
                </p>
                <Link 
                  href="/missional-assessment" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all"
                >
                  Take Assessment <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories - Simplified */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-between items-start mb-12">
              <h2 className="text-xl font-medium text-gray-400">Success Stories</h2>
              <span className="text-gray-500">05/06</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Real Results from Real Leaders
            </h2>
            <p className="text-lg text-gray-400">
              See how this platform is helping leaders worldwide build sustainable movements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Case Study 1 */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6 hover:border-green-500/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold">Grace Community Church</h4>
                  <p className="text-sm text-gray-400">Portland, OR</p>
                </div>
              </div>
              <blockquote className="text-gray-300 mb-4">
                "Implementing the APEST framework through Alan's platform helped us grow from 120 to 340 members 
                in 18 months, with 3 new church plants."
              </blockquote>
              <div className="text-sm text-green-400 font-medium">+183% growth in 18 months</div>
            </div>

            {/* Case Study 2 */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-gray-400">Movement Leader, Singapore</p>
                </div>
              </div>
              <blockquote className="text-gray-300 mb-4">
                "The integrated learning saved me 15 hours per week on content creation, allowing me to focus on 
                what matters most—discipling leaders."
              </blockquote>
              <div className="text-sm text-blue-400 font-medium">15 hours saved weekly</div>
            </div>

            {/* Case Study 3 */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30">
                  <Award className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold">David Martinez</h4>
                  <p className="text-sm text-gray-400">Author & Speaker</p>
                </div>
              </div>
              <blockquote className="text-gray-300 mb-4">
                "My ministry impact increased 300% and speaking bookings doubled after implementing movemental principles. 
                The frameworks are incredible."
              </blockquote>
              <div className="text-sm text-purple-400 font-medium">$50K additional impact</div>
            </div>
          </div>

          {/* Featured Testimonial */}
          <div className="bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border border-indigo-500/30 rounded-2xl p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <blockquote className="text-xl font-semibold italic mb-6">
                "This isn't just a website platform—it's a movement multiplier. I've seen firsthand how 
                small communities equipped with the right tools and frameworks can spark global transformation. 
                My hope is to see the Church fully alive again."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500/50">
                  <Image
                    src="/images/alan-hirsch-icon.png"
                    alt="Alan Hirsch"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <cite className="font-semibold not-italic">Alan Hirsch</cite>
                  <p className="text-sm text-gray-400">Founder & Missional Catalyst</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-between items-start mb-12">
            <h2 className="text-xl font-medium text-indigo-200">Get Started</h2>
            <span className="text-indigo-300">06/06</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Build Your Movemental Future?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Join thousands of leaders who are using this complete digital ecosystem to build movements, 
            grow audiences, and create sustainable impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/membership" 
              className="bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 justify-center text-lg"
            >
              Start Your Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/lms/dashboard" 
              className="border-2 border-white/30 bg-white/10 backdrop-blur px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors inline-flex items-center gap-2 justify-center text-lg"
            >
              <Play className="h-5 w-5" />
              Explore Platform
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-sm text-indigo-200">
            <div className="flex items-center justify-center gap-2">
              <Star className="h-4 w-4" />
              <span>Complete ecosystem</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="h-4 w-4" />
              <span>Join 8,900+ leaders</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Award className="h-4 w-4" />
              <span>Proven frameworks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter - Simplified */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black border border-gray-800 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-500/30">
              <Mail className="h-8 w-8 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Stay Connected with the Movement
            </h3>
            <p className="text-lg text-gray-400 mb-6">
              Get monthly insights on missional church renewal, leadership development, and movement building—
              plus exclusive resources and early access to new content.
            </p>
            <Link 
              href="/newsletter" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all text-lg"
            >
              Join 8,900+ Subscribers
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              No spam. Unsubscribe anytime. Used by leaders in 67+ countries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
