"use client";

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
import { Vortex } from "@/components/ui/vortex";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      {/* Hero Section - Vortex */}
      <section className="min-h-screen">
        <div className="w-full h-screen overflow-hidden">
          <Vortex
            backgroundColor="black"
            baseHue={220}
            particleCount={500}
            baseSpeed={0.1}
            rangeSpeed={1.0}
            className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
          >
            {/* Brand/Logo Area */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">AH</span>
                </div>
                <span className="text-2xl font-bold tracking-wide text-white">Alan Hirsch</span>
              </div>
            </div>

            <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
              Welcome to the New Movemental World!
            </h2>
            <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
              A comprehensive platform for missional church renewal, featuring AI-powered learning, 
              interactive content, and community-driven transformation.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
              <Link 
                href="/ai-homepage"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] inline-flex items-center gap-2"
              >
                <Video className="h-5 w-5" />
                Try AI Assistant
              </Link>
              <Link 
                href="/books"
                className="px-6 py-3 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                <BookOpen className="h-5 w-5" />
                Browse Library
              </Link>
            </div>
          </Vortex>
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
