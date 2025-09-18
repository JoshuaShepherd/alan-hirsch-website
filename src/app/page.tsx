'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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
  ChevronDown,
  Database,
  Zap,
  Shield,
  Code,
  Cpu,
  Network
} from "lucide-react";

// Import our new components
import { 
  AnimatedCard, 
  AnimatedButton, 
  FloatingElement, 
  GradientOrb, 
  StatusIndicator, 
  MetricCard,
  LoadingSpinner 
} from "@/components/ui/animated-components";

import { 
  AccordionItem, 
  PricingTier, 
  CompanyLogos, 
  TestimonialCard, 
  FeatureGrid,
  ScrollProgress 
} from "@/components/ui/aceternity-components";

import { 
  WorkflowVisualization, 
  DashboardPreview 
} from "@/components/ui/workflow-components";

import WorldMapDemo from "@/components/ui/world-map-demo";

import { useState, useEffect } from "react";

export default function Home() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-ink min-h-screen text-paper overflow-x-hidden relative">
      {isMounted && <ScrollProgress />}
      
      {/* Background Elements */}
      <GradientOrb size="lg" color="blue" className="top-20 -left-48 opacity-30" />
      <GradientOrb size="md" color="purple" className="top-96 -right-32 opacity-20" />
      <GradientOrb size="sm" color="pink" className="bottom-96 left-1/3 opacity-40" />

      {/* Hero Section - Enhanced Aceternity Style */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Main Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Brand/Logo Area */}
              <FloatingElement delay={0.2}>
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="w-12 h-12 bg-indigo rounded-2xl flex items-center justify-center relative overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                      <span className="text-paper font-bold text-xl relative z-10">AH</span>
                    </motion.div>
                    <span className="text-2xl font-bold tracking-wide">Alan Hirsch</span>
                  </div>
                  <StatusIndicator status="connected" label="Author & Speaker" />
                </div>
              </FloatingElement>

              {/* Main Headline with Typewriter Effect */}
              <div className="space-y-6">
                <motion.h1 
                  className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Reactivating the Church's
                  <br />
                  <motion.span 
                    className="text-indigo"
                  >
                    Movement DNA
                  </motion.span>
                </motion.h1>
                
                <motion.p
                  className="text-xl text-graphite leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Jesus is Lord at the center. Recover the forgotten ways of disciple-making, mission, and movement in our time.
                </motion.p>
              </div>

              {/* Enhanced CTAs */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <AnimatedButton variant="primary" href="/courses">
                  <BookOpen className="h-5 w-5" />
                  Explore Courses
                </AnimatedButton>
                <AnimatedButton variant="secondary" href="/apest-assessment">
                  <Users className="h-5 w-5" />
                  Take APEST Assessment
                </AnimatedButton>
              </motion.div>

              {/* Secondary CTAs */}
              <motion.div 
                className="flex flex-wrap gap-4 pt-4 text-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link href="/cohorts" className="text-stone hover:text-indigo transition-colors flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Join a Cohort
                </Link>
                <Link href="/speaking" className="text-stone hover:text-indigo transition-colors flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Book Alan to Speak
                </Link>
              </motion.div>

              {/* Stats Row */}
              <motion.div 
                className="grid grid-cols-3 gap-6 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {[
                  { label: "Books Published", value: "15+", trend: "up" as const },
                  { label: "Global Leaders", value: "25K+", trend: "up" as const },
                  { label: "Movements Catalyzed", value: "200+", trend: "up" as const }
                ].map((stat, index) => (
                  <MetricCard
                    key={index}
                    title={stat.label}
                    value={stat.value}
                    trend={stat.trend}
                    className="text-center"
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Enhanced Phone Mockup with Dashboard */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                {/* Floating Elements */}
                <FloatingElement delay={1} className="absolute -top-8 -left-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
                    <Database className="h-8 w-8 text-blue-400" />
                  </div>
                </FloatingElement>

                <FloatingElement delay={1.5} className="absolute -top-4 -right-12">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-500/30">
                    <Network className="h-6 w-6 text-purple-400" />
                  </div>
                </FloatingElement>

                {/* Background Blur Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-[3rem] blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                {/* Phone Mockup */}
                <motion.div 
                  className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl border border-gray-700"
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-black rounded-[2.5rem] overflow-hidden w-80 h-[640px] relative">
                    {/* Phone Interface */}
                    <div className="p-6 space-y-6">
                      {/* Header with Status */}
                      <div className="flex justify-between items-center pt-8">
                        <div className="text-lg font-bold text-white">Movemental</div>
                        <StatusIndicator status="connected" label="Live" />
                      </div>

                      {/* Dashboard Preview */}
                      <DashboardPreview
                        title="Movemental Learning"
                        metrics={[
                          { label: "APEST Teams", value: "127", trend: "up" },
                          { label: "mDNA Health", value: "94%", trend: "up" },
                          { label: "Multiplication", value: "+23%", trend: "up" },
                          { label: "Disciples", value: "1.2K", trend: "up" }
                        ]}
                      />

                      {/* Feature Icons Grid */}
                      <motion.div 
                        className="grid grid-cols-3 gap-4"
                        variants={{
                          animate: {
                            transition: {
                              staggerChildren: 0.1
                            }
                          }
                        }}
                        initial="initial"
                        animate="animate"
                      >
                        {[
                          { icon: <Users className="h-5 w-5" />, status: 'connected' as const },
                          { icon: <BookOpen className="h-5 w-5" />, status: 'connected' as const },
                          { icon: <Video className="h-5 w-5" />, status: 'waiting' as const },
                          { icon: <Calendar className="h-5 w-5" />, status: 'connected' as const },
                          { icon: <BarChart3 className="h-5 w-5" />, status: 'connected' as const },
                          { icon: <Award className="h-5 w-5" />, status: 'waiting' as const }
                        ].map((item, i) => (
                          <motion.div
                            key={i}
                            variants={{
                              initial: { opacity: 0, scale: 0.8 },
                              animate: { opacity: 1, scale: 1 }
                            }}
                            whileHover={{ scale: 1.1 }}
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center border backdrop-blur-sm ${
                              item.status === 'connected' 
                                ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                                : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                            }`}
                          >
                            {item.icon}
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why This Matters Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo font-medium text-sm uppercase tracking-wide">Why This Matters</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-8 text-paper">
              The Simple Confession That <span className="text-indigo">Changed the World</span>
            </h2>
          </motion.div>

          <motion.div 
            className="prose prose-lg prose-invert max-w-none text-stone leading-relaxed space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl">
              At the heart of every transformative Jesus movement is a simple, seismic confession: <strong className="text-paper">Jesus is Lord</strong>. With this one confession, ordinary people reshaped history and society. It's the beating center of movement renewal and the epicenter of mDNA, the "missional DNA" common to world-changing Jesus movements.
            </p>
            
            <blockquote className="border-l-4 border-indigo pl-6 text-xl italic text-paper bg-stone/5 py-4 rounded-r-lg">
              "With this simple confession they changed the world."
            </blockquote>

            <p>
              Mission isn't just one activity of the church—it flows from the very nature of God. The church exists because God sends; we are drawn into His mission, not vice versa. Recovering that identity is how we rediscover our purpose in a changing world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* mDNA Framework Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo font-medium text-sm uppercase tracking-wide">The Framework</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 text-paper">
              The Six Elements of <span className="text-indigo">Apostolic Genius</span>
            </h2>
            <p className="text-xl text-graphite max-w-3xl mx-auto">
              mDNA: The genetic code common to every world-changing Jesus movement throughout history.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <FeatureGrid
            features={[
              {
                icon: <Star className="h-8 w-8" />,
                title: "Jesus Is Lord",
                description: "The orienting center of the whole movement. This simple confession reshapes everything else."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Disciple Making",
                description: "The irreplaceable core task—becoming like Jesus and transmitting His way to others."
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Missional–Incarnational Impulse",
                description: "A dynamic outward thrust that embeds the gospel deeply in real cultures and places."
              },
              {
                icon: <Target className="h-8 w-8" />,
                title: "Liminality–Communitas",
                description: "Risk and holy adventure forge a deeper, mission-shaped togetherness."
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "APEST Culture",
                description: "The fivefold ecosystem—Apostle, Prophet, Evangelist, Shepherd, Teacher—working in harmony."
              },
              {
                icon: <Network className="h-8 w-8" />,
                title: "Organic Systems",
                description: "Low control, high accountability structures that multiply and move."
              }
            ]}
          />
        </div>
      </section>

      {/* Global Movement Section with World Map */}
      <WorldMapDemo />

      {/* Workflow Visualization Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo font-medium text-sm uppercase tracking-wide">Workflow</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 text-paper">
              The <span className="text-indigo">Discipleship Journey</span>
            </h2>
          </motion.div>

          <WorkflowVisualization
            nodes={[
              {
                id: 'input',
                icon: <Users className="h-6 w-6" />,
                title: 'Seeker',
                status: 'connected',
                position: { x: 50, y: 100 }
              },
              {
                id: 'process',
                icon: <BookOpen className="h-6 w-6" />,
                title: 'Disciple',
                status: 'connected',
                position: { x: 250, y: 100 }
              },
              {
                id: 'decision',
                icon: <Award className="h-6 w-6" />,
                title: 'Leader',
                status: 'waiting',
                position: { x: 450, y: 100 }
              },
              {
                id: 'output',
                icon: <TrendingUp className="h-6 w-6" />,
                title: 'Multiplier',
                status: 'connected',
                position: { x: 350, y: 220 }
              }
            ]}
            connections={[
              { from: 'input', to: 'process', animated: true },
              { from: 'process', to: 'decision', animated: true },
              { from: 'decision', to: 'output', animated: false }
            ]}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* APEST Deep Dive Section */}
      <section className="py-20 px-6 bg-stone/5">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo font-medium text-sm uppercase tracking-wide">The Fivefold</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 text-paper">
              APEST: For the <span className="text-indigo">Whole Church</span>
            </h2>
          </motion.div>

          <motion.div 
            className="prose prose-lg prose-invert max-w-none text-stone leading-relaxed space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl">
              APEST is not a niche for leaders—it describes Christ's own ministry shared with His Body so that the whole church matures into His fullness. When APEST is activated across the body (not just the platform), latent gifts awaken and mission accelerates.
            </p>
            
            <p>
              Likewise, the fivefold belongs to the entire people of God; it's a church-wide matrix, not merely an org chart for clergy.
            </p>

            <div className="bg-ink/20 p-6 rounded-xl border border-stone/20">
              <h3 className="text-paper font-bold text-xl mb-4">Movements grow where people step into the edge spaces</h3>
              <p className="mb-0">
                Risk, challenge, and mission—where God forges a band of companions and a different genre of love. This adventure-shaped community is called <strong className="text-indigo">communitas</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Journeys Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo font-medium text-sm uppercase tracking-wide">Learning Journeys</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 text-paper">
              What You'll <span className="text-indigo">Find Here</span>
            </h2>
            <p className="text-xl text-graphite max-w-3xl mx-auto">
              Digital-first formation that helps teams and leaders re-center on Jesus, rebuild disciple-making, and reimagine church for mission
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { title: "Start Here", description: "Re-center on 'Jesus is Lord' and rebuild discipleship as your core operating system.", icon: <Star className="h-6 w-6 text-blue-400" /> },
              { title: "Go Deeper", description: "Activate APEST in your whole community to unlock Christ's ministry among all the people.", icon: <Users className="h-6 w-6 text-green-400" /> },
              { title: "Live Sent", description: "Practice the missional–incarnational impulse in your neighborhood, network, or city.", icon: <Globe className="h-6 w-6 text-purple-400" /> },
              { title: "Lead as a Movement", description: "Shift from institutional predictability to adaptive, movemental design—without losing the best of order and stability.", icon: <TrendingUp className="h-6 w-6 text-yellow-400" /> },
              { title: "Courses and Cohorts", description: "Digital-first formation with practice, reflection, and peer learning—not just content.", icon: <BookOpen className="h-6 w-6 text-pink-400" /> },
              { title: "Speaking and Advising", description: "Equip networks, dioceses, and denominations to move from static maintenance to missional movement.", icon: <Award className="h-6 w-6 text-indigo-400" /> }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 }
                }}
                className="group"
              >
                <AnimatedCard className="h-full hover:border-gray-600 transition-all duration-300">
                  <div className="space-y-4">
                    <motion.div 
                      className="group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 5 }}
                    >
                      {useCase.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{useCase.description}</p>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="py-20 px-6 bg-stone/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo font-medium text-sm uppercase tracking-wide">What Makes This Different</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 text-paper">
              Movement, Not <span className="text-indigo">Maintenance</span>
            </h2>
            <p className="text-xl text-graphite max-w-3xl mx-auto">
              Four core distinctives that set movemental approaches apart from institutional defaults
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { title: "Jesus at the Center", description: "Everything recalibrates around the simple confession and the presence of Jesus.", icon: <Star className="h-6 w-6 text-red-400" /> },
              { title: "Movement, Not Maintenance", description: "Structures serve mission, not the other way around—favoring multiplication over centralization.", icon: <TrendingUp className="h-6 w-6 text-blue-400" /> },
              { title: "Whole-Church Activation", description: "APEST awakens the gifts of the entire body for the sake of the city.", icon: <Users className="h-6 w-6 text-green-400" /> },
              { title: "Adventure-Shaped Community", description: "Risk and mission forge communitas—deeper love, courage, and resilience.", icon: <Target className="h-6 w-6 text-purple-400" /> }
            ].map((benefit, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <div className="space-y-4">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {/* Call to Action Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {[
              { title: "Explore Courses and Cohorts", description: "Step into a learning journey built for real-world change, not just new ideas.", icon: <BookOpen className="h-6 w-6 text-blue-400" />, href: "/courses" },
              { title: "Take the APEST Assessment", description: "See your fivefold profile and map your team's strengths and gaps.", icon: <Users className="h-6 w-6 text-green-400" />, href: "/apest-assessment" },
              { title: "Join the Movement Letter", description: "Monthly field notes on discipleship, APEST, and organic systems for leaders on mission.", icon: <Mail className="h-6 w-6 text-purple-400" />, href: "/newsletter" },
              { title: "Book Alan to Speak", description: "Catalyze your network with a clear, compelling vision of church as a multiplying movement.", icon: <Calendar className="h-6 w-6 text-yellow-400" />, href: "/speaking" }
            ].map((cta, index) => (
              <AnimatedCard key={index} delay={index * 0.1}>
                <div className="space-y-4 text-center">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    {cta.icon}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white">{cta.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{cta.description}</p>
                  <Link href={cta.href} className="text-indigo hover:text-indigo/80 transition-colors text-sm font-medium">
                    Learn More →
                  </Link>
                </div>
              </AnimatedCard>
            ))}
          </motion.div>

          {/* Company Logos */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CompanyLogos
              title="Trusted by ministry leaders worldwide"
              logos={[
                { name: "5Q Collective", src: "/images/partners/5q-logo.png" },
                { name: "Movement Leaders", src: "/images/partners/movement-leaders-logo.png" },
                { name: "100 Movements", src: "/images/partners/100movements-logo.png" },
                { name: "Forge", src: "/images/partners/forge-logo.png" },
                { name: "Future Travelers", src: "/images/partners/future-travelers-logo.png" },
                { name: "CRM", src: "/images/partners/crm-logo.png" }
              ]}
            />
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo font-medium text-sm uppercase tracking-wide">Featured Resources</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 text-paper">
              Books and <span className="text-indigo">Ideas</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingTier
              name="The Forgotten Ways"
              price="Available"
              period="now"
              description="Apostolic genius foundations"
              features={[
                "Apostolic Genius and the six mDNA elements",
                "How explosive Jesus movements recur",
                "Breaking through institutional barriers",
                "Movement multiplication principles"
              ]}
              ctaText="Get the Book"
              onSelect={() => console.log('Forgotten Ways selected')}
            />
            
            <PricingTier
              name="5Q"
              price="Essential"
              period="reading"
              description="APEST for the whole church"
              features={[
                "Jesus as the template of APEST",
                "Fivefold discipleship and ministry",
                "Activating gifts in the whole Body",
                "Mature, balanced leadership"
              ]}
              isPopular={true}
              ctaText="Explore 5Q"
              onSelect={() => console.log('5Q selected')}
            />
            
            <PricingTier
              name="The Permanent Revolution"
              price="Apostolic"
              period="imagination"
              description="Missional age leadership"
              features={[
                "Catalytic, fivefold environments",
                "Innovation for mission",
                "Decentralized leadership",
                "Releasing every believer"
              ]}
              ctaText="Read More"
              onSelect={() => console.log('Permanent Revolution selected')}
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-indigo font-medium text-sm uppercase tracking-wide">FAQs</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6 text-paper">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-graphite">
              Find all your doubts and questions in one place. Still couldn't find what you're looking for?
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                title: "What is movemental DNA (mDNA)?",
                content: "Movemental DNA represents the core genetic elements found in every authentic gospel movement: Jesus is Lord, disciple-making, missional-incarnational impulse, APEST culture, organic systems, and communitas. These six elements work together to create the conditions for multiplication."
              },
              {
                title: "How does APEST change church leadership?",
                content: "APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) represents the fivefold ministry gifts that create mature, balanced leadership. Most churches are dominated by Shepherds and Teachers, but healthy movements require all five functions working together."
              },
              {
                title: "What's the difference between attractional and incarnational?",
                content: "Attractional ministry invites people to 'come to us' at church events. Incarnational ministry sends believers to 'go to them' - living as missionaries in neighborhoods, workplaces, and communities where people already are."
              },
              {
                title: "How do I start implementing these frameworks?",
                content: "Begin with assessment - understand your current mDNA health and APEST balance. Then focus on one element at a time, embedding practices that shift from institutional maintenance to movemental multiplication."
              }
            ].map((faq, index) => (
              <AccordionItem
                key={index}
                title={faq.title}
                isOpen={openAccordion === index}
                onToggle={() => setOpenAccordion(openAccordion === index ? null : index)}
              >
                {faq.content}
              </AccordionItem>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center gap-4">
              <AnimatedButton variant="primary" href="/books">
                Explore Books
              </AnimatedButton>
              <AnimatedButton variant="ghost" href="/contact">
                Get In Touch
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-3xl"></div>
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-paper">
              The Future Belongs to Jesus <br />
              <span className="text-indigo">
                and Communities on the Move
              </span>
            </h2>
            <p className="text-xl text-graphite mb-8 max-w-2xl mx-auto">
              Let's reimagine church as a people on the move—centered on Christ, fired by disciple-making, and organized for mission in every place we're sent.
            </p>
            <AnimatedButton variant="primary" className="text-lg px-8 py-4" href="/courses">
              <BookOpen className="h-5 w-5" />
              Begin the Journey
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
