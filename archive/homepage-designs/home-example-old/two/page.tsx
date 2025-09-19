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

import { useState } from "react";

export default function Home() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden relative">
      <ScrollProgress />
      
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
                      className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center relative overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      />
                      <span className="text-white font-bold text-xl relative z-10">AH</span>
                    </motion.div>
                    <span className="text-2xl font-bold tracking-wide">Alan Hirsch</span>
                  </div>
                  <StatusIndicator status="connected" label="Live Platform" />
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
                  Welcome to the
                  <br />
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-size-200 animate-gradient"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: "200% 50%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    New Movemental World!
                  </motion.span>
                </motion.h1>
                
                <motion.p
                  className="text-xl text-gray-300 leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Build, test and deploy AI-powered ministry workflows with our comprehensive platform designed for movement builders.
                </motion.p>
              </div>

              {/* Enhanced CTAs */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <AnimatedButton variant="primary" href="/lms/dashboard">
                  <Zap className="h-5 w-5" />
                  Start Building
                </AnimatedButton>
                <AnimatedButton variant="secondary" href="/books">
                  <BookOpen className="h-5 w-5" />
                  Explore Resources
                </AnimatedButton>
              </motion.div>

              {/* Stats Row */}
              <motion.div 
                className="grid grid-cols-3 gap-6 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {[
                  { label: "Active Users", value: "10K+", trend: "up" as const },
                  { label: "Success Rate", value: "98.5%", trend: "up" as const },
                  { label: "Deployments", value: "50K+", trend: "up" as const }
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
                        title="Ministry Dashboard"
                        metrics={[
                          { label: "Active Movements", value: "127", trend: "up" },
                          { label: "Engagement", value: "94%", trend: "up" },
                          { label: "Growth Rate", value: "+23%", trend: "up" },
                          { label: "Completions", value: "1.2K", trend: "up" }
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

      {/* Features Section - Aceternity Style */}
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
            <span className="text-blue-400 font-medium text-sm uppercase tracking-wide">Features</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Ministry Intelligence</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Build, test and deploy ministry workflows with a powerful visual interface designed for movement builders and technical teams.
            </p>
          </motion.div>

          {/* Feature Grid */}
          <FeatureGrid
            features={[
              {
                icon: <Code className="h-8 w-8" />,
                title: "Visual Workflow Builder",
                description: "A drag-and-drop interface to create, connect, and configure ministry processes into logical workflows"
              },
              {
                icon: <Database className="h-8 w-8" />,
                title: "Ministry Model Selector",
                description: "Track real-time activity with detailed records of triggers, tools used, outcomes, and timestamps"
              },
              {
                icon: <Network className="h-8 w-8" />,
                title: "Native Tools Integration",
                description: "Movements operate independently and coordinate tasks to complete all complex ministry goals together"
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Text to Workflow Builder",
                description: "Preview and debug workflow logic in a safe sandbox before deploying, helping you iterate with confidence"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "One Click Deployment",
                description: "Run ministry workflows in a sandbox to preview behavior, debug logic, and test interactions"
              },
              {
                icon: <Cpu className="h-8 w-8" />,
                title: "Custom Ministry SDK",
                description: "Track real-time activity with detailed records of triggers, tools used, outcomes, and timestamps"
              }
            ]}
          />
        </div>
      </section>

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
            <span className="text-purple-400 font-medium text-sm uppercase tracking-wide">Workflow</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Design your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Ministry Workflow</span>
            </h2>
          </motion.div>

          <WorkflowVisualization
            nodes={[
              {
                id: 'input',
                icon: <Mail className="h-6 w-6" />,
                title: 'New Inquiry',
                status: 'connected',
                position: { x: 50, y: 100 }
              },
              {
                id: 'process',
                icon: <Cpu className="h-6 w-6" />,
                title: 'Assessment',
                status: 'connected',
                position: { x: 250, y: 100 }
              },
              {
                id: 'decision',
                icon: <Users className="h-6 w-6" />,
                title: 'Placement',
                status: 'waiting',
                position: { x: 450, y: 100 }
              },
              {
                id: 'output',
                icon: <CheckCircle2 className="h-6 w-6" />,
                title: 'Discipleship',
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

      {/* Use Cases Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-pink-400 font-medium text-sm uppercase tracking-wide">Use Cases</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Across various <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Ministries</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We empower ministry leaders and technical teams to create, simulate, and manage movement-driven processes visually
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
              { title: "Church Planting", description: "Visually orchestrate church planting movements without writing complex workflows", icon: <Users className="h-6 w-6 text-blue-400" /> },
              { title: "Discipleship", description: "Visually orchestrate discipleship processes without writing complex workflows", icon: <BookOpen className="h-6 w-6 text-green-400" /> },
              { title: "Leadership Dev", description: "Visually orchestrate leadership development without writing complex workflows", icon: <Award className="h-6 w-6 text-purple-400" /> },
              { title: "Community Support", description: "Visually orchestrate community care without writing complex workflows", icon: <Target className="h-6 w-6 text-yellow-400" /> },
              { title: "Ministry Ops", description: "Visually orchestrate ministry operations without writing complex workflows", icon: <BarChart3 className="h-6 w-6 text-pink-400" /> },
              { title: "Movement Growth", description: "Visually orchestrate movement expansion without writing complex workflows", icon: <TrendingUp className="h-6 w-6 text-indigo-400" /> }
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

      {/* Social Proof / Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Making Leaders <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">10x faster</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We empower ministry leaders and technical teams to create, simulate, and manage movement-driven workflows visually
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              { title: "Launch Faster", description: "Visually orchestrate ministry movements without writing complex workflows", icon: <Zap className="h-6 w-6 text-red-400" /> },
              { title: "Reuse Intelligence", description: "Visually orchestrate ministry movements without writing complex workflows", icon: <Database className="h-6 w-6 text-blue-400" /> },
              { title: "Iterate Rapidly", description: "Visually orchestrate ministry movements without writing complex workflows", icon: <Users className="h-6 w-6 text-green-400" /> },
              { title: "Prevent Breakdowns", description: "Visually orchestrate ministry movements without writing complex workflows", icon: <Shield className="h-6 w-6 text-purple-400" /> },
              { title: "Scale Smarter", description: "Visually orchestrate ministry movements without writing complex workflows", icon: <BarChart3 className="h-6 w-6 text-pink-400" /> },
              { title: "Automate More", description: "Visually orchestrate ministry movements without writing complex workflows", icon: <Cpu className="h-6 w-6 text-indigo-400" /> }
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

          {/* Testimonial */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TestimonialCard
              quote="Movemental changed how we build ministry systems. What used to take days of coordination and planning now happens automatically through streamlined processes. It's like having a second ministry team that never rests."
              author="Dr. Sarah Johnson"
              role="Senior Pastor"
              company="Movement Church Network"
              avatar="/images/alan-hirsch-portrait.jpg"
            />
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
            <span className="text-blue-400 font-medium text-sm uppercase tracking-wide">Pricing</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Simple and <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Accessible Pricing</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingTier
              name="Growth"
              price="Free"
              period="forever"
              description="Early stage ministries"
              features={[
                "Up to 5 active workflows",
                "50 automation runs",
                "Visual builder access",
                "Community support"
              ]}
              ctaText="Start Building"
              onSelect={() => console.log('Growth plan selected')}
            />
            
            <PricingTier
              name="Scale"
              price="$29"
              period="month"
              description="Fast moving ministries"
              features={[
                "Up to 25 active workflows",
                "500 automation runs",
                "Visual builder access",
                "Priority support",
                "Advanced integrations"
              ]}
              isPopular={true}
              ctaText="Start for Free"
              onSelect={() => console.log('Scale plan selected')}
            />
            
            <PricingTier
              name="Enterprise"
              price="$99"
              period="month"
              description="Large ministries"
              features={[
                "Unlimited active workflows",
                "Unlimited automation runs",
                "Visual builder access",
                "Dedicated support",
                "Custom integrations"
              ]}
              ctaText="Contact Sales"
              onSelect={() => console.log('Enterprise plan selected')}
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
            <span className="text-purple-400 font-medium text-sm uppercase tracking-wide">FAQs</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Find all your doubts and questions in one place. Still couldn't find what you're looking for?
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                title: "What exactly does this platform do?",
                content: "Our platform enables ministry leaders to build, test, and deploy automated workflows for church operations, discipleship processes, and movement building activities using a visual, no-code interface."
              },
              {
                title: "Can I test workflows before they go live?",
                content: "Yes! Our sandbox environment allows you to preview behavior, debug logic, and test interactions before deploying your ministry workflows to production."
              },
              {
                title: "What's the difference between automated and manual steps?",
                content: "Automated steps run independently without human intervention, while manual steps require human decision-making or input at specific points in your ministry workflow."
              },
              {
                title: "How does the visual builder work?",
                content: "Our drag-and-drop interface lets you create, connect, and configure ministry processes into logical workflows without writing any code. Simply connect the tools and triggers you need."
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
              <AnimatedButton variant="primary">
                Read Docs
              </AnimatedButton>
              <AnimatedButton variant="ghost">
                Contact Us
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
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Connect your Current Stack <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                and Start Automating
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Transform your ministry operations with intelligent automation that grows with your movement.
            </p>
            <AnimatedButton variant="primary" className="text-lg px-8 py-4">
              <Zap className="h-5 w-5" />
              Start Building for Free
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
