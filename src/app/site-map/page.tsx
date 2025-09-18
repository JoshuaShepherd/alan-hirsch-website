import Link from "next/link";
import { Metadata } from "next";
import { 
  Home, 
  BookOpen, 
  Users, 
  Star, 
  Target, 
  Search, 
  MessageCircle, 
  Calendar, 
  Settings, 
  LogIn, 
  Sparkles, 
  User,
  FileText,
  Headphones,
  Mail,
  Shield,
  CreditCard,
  Building2,
  Award,
  Compass,
  Eye,
  Heart,
  Puzzle,
  Crown,
  Flame
} from "lucide-react";

export const metadata: Metadata = {
  title: "Site Map | Alan Hirsch - Complete Navigation Index",
  description: "Complete index of all pages and resources on Alan Hirsch's website. Find books, articles, assessments, partner organizations, and more.",
  keywords: ["site map", "navigation", "index", "Alan Hirsch", "missional church", "resources", "books", "assessments"],
};

export default function SiteMapPage() {
  const siteStructure = [
    {
      category: "Homepage & Core Pages",
      icon: Home,
      color: "bg-blue-500",
      pages: [
        { title: "Main Homepage", url: "/", description: "Primary landing page with human-first design" },
        { title: "AI-Powered Homepage", url: "/ai-homepage", description: "Interactive AI assistant experience" },
        { title: "About Alan", url: "/about", description: "Alan's background, mission, and vision" },
        { title: "Contact", url: "/contact", description: "Get in touch with Alan for speaking and consulting" },
        { title: "Privacy Policy", url: "/privacy", description: "Data privacy and usage policies" },
        { title: "Terms of Service", url: "/terms", description: "Website terms and conditions" },
        { title: "Ethics Statement", url: "/ethics", description: "Ethical guidelines and commitments" },
        { title: "Cookie Policy", url: "/cookies", description: "Cookie usage and preferences" }
      ]
    },
    {
      category: "Content Library",
      icon: BookOpen,
      color: "bg-green-500",
      pages: [
        { title: "Complete Books", url: "/books", description: "Full collection of Alan's published works" },
        { title: "Latest Articles", url: "/articles", description: "Thought leadership and insights" },
        { title: "Podcast Episodes", url: "/podcast", description: "Audio content and interviews" },
        { title: "Newsletter Archive", url: "/newsletter", description: "Monthly insights and updates" },
        { title: "Video Library", url: "/video-library", description: "Educational video content and lectures" },
        { title: "Resources Hub", url: "/resources", description: "Comprehensive resource collection" }
      ]
    },
    {
      category: "Assessment Tools & Resources",
      icon: Target,
      color: "bg-orange-500",
      pages: [
        { title: "Missional Assessment", url: "/missional-assessment", description: "Evaluate your church's missional health" },
        { title: "APEST Agents", url: "/apest-agents", description: "AI-powered ministry gift discovery" },
        { title: "Leadership Toolkit", url: "/toolkit", description: "Comprehensive resource hub for leaders" },
        { title: "Speaking Topics", url: "/speaking", description: "Available presentations and workshops" },
        { title: "mDNA Hero Demo", url: "/mdna-hero", description: "Interactive mDNA framework experience" },
        { title: "Diagnostic Tools", url: "/diagnostic", description: "Church health diagnostic resources" }
      ]
    },
    {
      category: "Community & Platform Features",
      icon: Users,
      color: "bg-purple-500",
      pages: [
        { title: "Community Forums", url: "/community", description: "Discussion and collaboration space" },
        { title: "Search Content", url: "/search", description: "Find specific resources and content" },
        { title: "Member Dashboard", url: "/dashboard", description: "Personal account and progress tracking" },
        { title: "Membership Plans", url: "/membership", description: "Subscription tiers and benefits" },
        { title: "Events Calendar", url: "/events", description: "Upcoming events and workshops" },
        { title: "Components Showcase", url: "/components", description: "UI component library demonstration" }
      ]
    },
    {
      category: "Learning Management System",
      icon: Award,
      color: "bg-emerald-500",
      pages: [
        { title: "LMS Platform", url: "/lms", description: "Complete learning management system" },
        { title: "LMS Dashboard", url: "/lms/dashboard", description: "Student and instructor dashboard" },
        { title: "Course Creation", url: "/lms/courses/new", description: "Create and manage courses" },
        { title: "LMS Authentication", url: "/lms/auth", description: "LMS-specific login portal" },
        { title: "LMS Setup", url: "/lms/setup", description: "Initial platform configuration" },
        { title: "Movemental Program", url: "/lms/movemental", description: "Specialized movemental training" },
        { title: "LMS Settings", url: "/lms/settings", description: "Platform configuration and preferences" }
      ]
    },
    {
      category: "Authentication & Account Management",
      icon: User,
      color: "bg-indigo-500",
      pages: [
        { title: "Sign In", url: "/auth/login", description: "Member login portal" },
        { title: "Create Account", url: "/auth/signup", description: "New user registration" },
        { title: "Admin Dashboard", url: "/admin", description: "Complete administrative control panel" },
        { title: "Test Users Management", url: "/admin/test-users", description: "Development user management" },
        { title: "Dev Sign In", url: "/dev-signin", description: "Development authentication portal" },
        { title: "No-Auth Testing", url: "/no-auth-testing", description: "Authentication bypass for testing" }
      ]
    },
    {
      category: "Partner Organizations",
      icon: Star,
      color: "bg-yellow-500",
      pages: [
        { title: "5Q Collective", url: "/5q", description: "APEST-based leadership development" },
        { title: "Movement Leaders", url: "/movement-leaders", description: "Global network of missional leaders" },
        { title: "100 Movements", url: "/100movements", description: "Church planting movement catalyst" },
        { title: "Forge Mission Training", url: "/forge", description: "Missional leadership formation" },
        { title: "Future Travelers", url: "/future-travelers", description: "Innovation and emerging culture" },
        { title: "Church Resource Ministries", url: "/crm", description: "Global church development organization" }
      ]
    },
    {
      category: "Development & Testing Pages",
      icon: Settings,
      color: "bg-gray-500",
      pages: [
        { title: "Content Checklist", url: "/content-checklist", description: "Development content audit tool" },
        { title: "Multimedia Demo", url: "/multimedia-demo", description: "Media component demonstrations" },
        { title: "Test Setup", url: "/test-setup", description: "Development environment configuration" },
        { title: "Content Creator", url: "/content-creator", description: "Content management interface" },
        { title: "Site Map", url: "/site-map", description: "Complete site navigation index" }
      ]
    },
    {
      category: "E-commerce & Donations",
      icon: CreditCard,
      color: "bg-green-600",
      pages: [
        { title: "Products", url: "/products", description: "Available books and resources for purchase" },
        { title: "Donate", url: "/donate", description: "Support Alan's ministry and mission" }
      ]
    }
  ];

  const featuredBooks = [
    { title: "The Forgotten Ways", slug: "the-forgotten-ways", icon: Compass },
    { title: "5Q: Reactivating the Original Intelligence", slug: "5q", icon: Crown },
    { title: "The Permanent Revolution", slug: "the-permanent-revolution", icon: Flame },
    { title: "ReJesus", slug: "rejesus", icon: Heart },
    { title: "The Faith of Leap", slug: "the-faith-of-leap", icon: Target },
    { title: "Untamed", slug: "untamed", icon: Eye },
    { title: "The Shaping of Things to Come", slug: "the-shaping-of-things-to-come", icon: Puzzle },
    { title: "The Forgotten Ways Handbook", slug: "the-forgotten-ways-handbook", icon: BookOpen },
    { title: "Disciplism", slug: "disciplism", icon: Users },
    { title: "Reframation", slug: "reframation", icon: Sparkles },
    { title: "The Starfish and the Spider", slug: "the-starfish-and-the-spider", icon: Star },
    { title: "Metanoia", slug: "metanoia", icon: Heart },
    { title: "Ephesians Study", slug: "ephesians", icon: BookOpen },
    { title: "Systematic Theology", slug: "systematic-theology", icon: Settings },
    { title: "La Fe del Salto (Spanish)", slug: "la-fe-del-salto", icon: Target }
  ];

  return (
    <div className="bg-page">
      {/* Hero Section */}
      <section className="section-padding-lg bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center max-w-content mx-auto">
            <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-6 flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-display-lg mb-6 text-foreground">
              Complete Site Map
            </h1>
            <p className="text-xl leading-relaxed text-foreground/80">
              Navigate Alan Hirsch's comprehensive platform for missional church renewal. 
              Find books, assessments, community resources, and partner organizations all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="section-padding bg-section">
        <div className="max-w-container mx-auto px-6">
          <h2 className="font-display text-display-md text-center mb-8 text-foreground">
            Quick Navigation
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {siteStructure.map((section, index) => {
              const Icon = section.icon;
              return (
                <a
                  key={index}
                  href={`#${section.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:shadow-md transition-all"
                >
                  <div className={`w-6 h-6 ${section.color} rounded flex items-center justify-center`}>
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-card-foreground">{section.category}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Site Structure */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <div className="space-y-12">
            {siteStructure.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <div 
                  key={sectionIndex}
                  id={section.category.toLowerCase().replace(/\s+/g, '-')}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-foreground">
                      {section.category}
                    </h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.pages.map((page, pageIndex) => (
                      <Link
                        key={pageIndex}
                        href={page.url}
                        className="group bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:border-primary/20 transition-all"
                      >
                        <h3 className="font-medium text-card-foreground group-hover:text-primary transition-colors mb-2">
                          {page.title}
                        </h3>
                        <p className="text-sm text-card-foreground/70 mb-3">
                          {page.description}
                        </p>
                        <div className="flex items-center text-xs text-primary">
                          <span>Visit page</span>
                          <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="section-padding bg-section">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Featured Books & Chapters
              </h2>
            </div>
            <p className="text-lg text-foreground/80 max-w-content mx-auto">
              Explore Alan's complete library of transformational books, available with full chapter navigation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featuredBooks.map((book, index) => {
              const Icon = book.icon;
              return (
                <Link
                  key={index}
                  href={`/books/${book.slug}`}
                  className="group bg-card border border-border rounded-lg p-4 hover:shadow-lg hover:border-primary/20 transition-all text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-card-foreground group-hover:text-primary transition-colors mb-2">
                    {book.title}
                  </h3>
                  <div className="flex items-center justify-center text-xs text-primary">
                    <span>Read chapters</span>
                    <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link 
              href="/books"
              className="btn-primary inline-block"
            >
              View Complete Book Library
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Pages & Utilities */}
      <section className="section-padding">
        <div className="max-w-container mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Additional Resources
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-card-foreground mb-3">Platform Features</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/search" className="text-primary hover:text-primary/80">Advanced Search</Link></li>
                <li><Link href="/ai-homepage" className="text-primary hover:text-primary/80">AI Assistant</Link></li>
                <li><Link href="/community" className="text-primary hover:text-primary/80">Community Forums</Link></li>
                <li><Link href="/dashboard" className="text-primary hover:text-primary/80">Personal Dashboard</Link></li>
                <li><Link href="/events" className="text-primary hover:text-primary/80">Events Calendar</Link></li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-card-foreground mb-3">Learning Systems</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/lms" className="text-primary hover:text-primary/80">LMS Platform</Link></li>
                <li><Link href="/lms/dashboard" className="text-primary hover:text-primary/80">Learning Dashboard</Link></li>
                <li><Link href="/lms/movemental" className="text-primary hover:text-primary/80">Movemental Program</Link></li>
                <li><Link href="/missional-assessment" className="text-primary hover:text-primary/80">Missional Assessment</Link></li>
                <li><Link href="/apest-agents" className="text-primary hover:text-primary/80">APEST Agents</Link></li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-card-foreground mb-3">Account & Administration</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/auth/login" className="text-primary hover:text-primary/80">Member Login</Link></li>
                <li><Link href="/auth/signup" className="text-primary hover:text-primary/80">Create Account</Link></li>
                <li><Link href="/membership" className="text-primary hover:text-primary/80">Subscription Plans</Link></li>
                <li><Link href="/admin" className="text-primary hover:text-primary/80">Admin Dashboard</Link></li>
                <li><Link href="/lms/auth" className="text-primary hover:text-primary/80">LMS Login</Link></li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-medium text-card-foreground mb-3">Commerce & Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products" className="text-primary hover:text-primary/80">Shop Products</Link></li>
                <li><Link href="/donate" className="text-primary hover:text-primary/80">Make Donation</Link></li>
                <li><Link href="/privacy" className="text-primary hover:text-primary/80">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-primary hover:text-primary/80">Terms of Service</Link></li>
                <li><Link href="/ethics" className="text-primary hover:text-primary/80">Ethics Statement</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-content mx-auto px-6 text-center">
          <h2 className="font-display text-display-md mb-6 text-foreground">
            Ready to Explore?
          </h2>
          <p className="text-lg mb-8 text-foreground/80">
            Start with our AI assistant for personalized recommendations, or dive into the complete book library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/ai-homepage"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Try AI Assistant
            </Link>
            <Link 
              href="/books"
              className="btn-outline inline-flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Browse Books
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
