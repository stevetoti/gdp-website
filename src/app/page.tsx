'use client'

import Link from 'next/link'
import { 
  FadeInUp, 
  ScaleIn, 
  StaggerContainer, 
  StaggerItem,
  FloatingElement
} from '@/components/animations'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { 
  Code2, 
  Brain, 
  Rocket, 
  Cloud, 
  Smartphone, 
  Cog, 
  ArrowRight,
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Globe2,
  CheckCircle2,
  Play,
  Landmark,
  Clock,
  MapPin,
  Building2,
  Cpu,
  Layers,
  TrendingUp
} from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    description: 'Purpose-built web platforms, APIs, and internal tools engineered to fit your business exactly — not the other way around.',
    href: '/services#custom-software',
    color: 'from-blue-500 to-cyan-500',
    features: ['Web Applications', 'API Development', 'Legacy Modernization']
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Practical AI that ships: intelligent assistants, automation pipelines, and data models that create measurable business value.',
    href: '/services#ai-ml',
    color: 'from-purple-500 to-pink-500',
    features: ['LLM Integration', 'Predictive Analytics', 'Intelligent Automation']
  },
  {
    icon: Rocket,
    title: 'Digital Transformation',
    description: 'A clear roadmap from manual processes to modern digital operations — strategy, execution, and adoption in one engagement.',
    href: '/services#digital-transformation',
    color: 'from-orange-500 to-red-500',
    features: ['Process Automation', 'Digital Strategy', 'Change Management']
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Secure, cost-efficient cloud infrastructure designed for scale — from first deployment to multi-region resilience.',
    href: '/services#cloud',
    color: 'from-cyan-500 to-blue-500',
    features: ['AWS & Azure', 'Kubernetes', 'DevOps & CI/CD']
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Polished iOS and Android applications with the performance of native and the speed of cross-platform delivery.',
    href: '/services#mobile',
    color: 'from-green-500 to-emerald-500',
    features: ['React Native', 'Flutter', 'Native Apps']
  },
  {
    icon: Cog,
    title: 'Enterprise Integration',
    description: 'Connect the systems your business already runs on — unified data, automated workflows, and zero swivel-chair work.',
    href: '/services#integration',
    color: 'from-amber-500 to-orange-500',
    features: ['API Gateway', 'ETL Pipelines', 'Middleware']
  },
]

const differentiators = [
  {
    icon: Landmark,
    title: 'US-Registered Entity',
    description: 'Incorporated in Delaware, USA — contract with a company built on the world\u2019s most trusted legal and corporate framework.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: TrendingUp,
    title: 'Asia-Pacific Delivery',
    description: 'Our Indonesia operations give you world-class engineering talent at a cost structure that keeps ambitious roadmaps affordable.',
    color: 'from-vibrant-orange to-orange-400'
  },
  {
    icon: Cpu,
    title: 'AI-First Engineering',
    description: 'AI isn\u2019t a bolt-on for us. Every solution we design considers automation, intelligence, and data leverage from day one.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Clock,
    title: '24/7 Across Time Zones',
    description: 'With teams spanning the US and Asia-Pacific, work continues around the clock — faster iterations, responsive support, no dead hours.',
    color: 'from-green-500 to-emerald-500'
  },
]

const footprintStats = [
  { number: '100+', label: 'Projects Delivered', icon: Rocket },
  { number: '10+', label: 'Industries Served', icon: Layers },
  { number: '24/7', label: 'Time Zone Coverage', icon: Clock },
  { number: '2', label: 'Countries of Registration', icon: Landmark },
]

const offices = [
  {
    flag: '\ud83c\uddfa\ud83c\uddf8',
    country: 'United States',
    city: 'Dover, Delaware',
    role: 'Legal & Corporate Base',
    description: 'Global Digital Prime Inc. is incorporated in Delaware — giving clients the confidence of US contracts, US jurisdiction, and US corporate governance.',
    points: ['US-law contracts & invoicing', 'Delaware corporate governance', 'Gateway to the Americas'],
    accent: 'from-blue-500 to-cyan-500'
  },
  {
    flag: '\ud83c\uddee\ud83c\udde9',
    country: 'Indonesia',
    city: 'Bali, Indonesia',
    role: 'Asia-Pacific Operations & Delivery',
    description: 'Our registered Indonesian entity anchors engineering delivery in Asia-Pacific — deep talent, efficient delivery, and a base in one of the world\u2019s fastest-growing digital economies.',
    points: ['Core engineering & delivery hub', 'Cost-efficient senior talent', 'Asia-Pacific market reach'],
    accent: 'from-vibrant-orange to-orange-400'
  },
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'AWS', 
  'Azure', 'Kubernetes', 'TensorFlow', 'PostgreSQL', 'MongoDB', 'Docker'
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <>
      {/* Hero Section - Full viewport with animated gradient */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-dark-navy to-[#0a1628]">
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          {/* Glowing orbs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 w-[600px] h-[600px] bg-vibrant-orange/20 rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px]"
          />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${(i * 47) % 100}%`,
                top: `${(i * 31) % 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: (i % 5) * 0.4,
              }}
            />
          ))}
        </div>
        
        <motion.div style={{ y, opacity }} className="relative container-custom py-20 z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            <div>
              <FadeInUp>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white/90 text-sm mb-8"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-vibrant-orange" />
                  A Global Software & AI Company \u2014 US + Asia
                </motion.div>
              </FadeInUp>
              
              <FadeInUp delay={0.1}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
                  Engineering
                  <span className="block mt-3">
                    <span className="relative">
                      <span className="gradient-text">Global Digital</span>
                      <motion.span 
                        className="absolute -inset-1 bg-gradient-to-r from-vibrant-orange/20 to-purple-500/20 blur-2xl"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </span>
                  </span>
                  <span className="block mt-3 text-white">Excellence</span>
                </h1>
              </FadeInUp>
              
              <FadeInUp delay={0.2}>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                  Global Digital Prime is a software and AI engineering company registered in 
                  Delaware, USA and Indonesia \u2014 combining American corporate trust with 
                  Asia-Pacific delivery power to build technology that moves businesses forward.
                </p>
              </FadeInUp>

              {/* Dual registration badges */}
              <FadeInUp delay={0.25}>
                <div className="flex flex-wrap gap-3 mb-10">
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-blue-500/15 to-cyan-500/10 border border-blue-400/30 backdrop-blur-sm"
                  >
                    <span className="text-xl leading-none">\ud83c\uddfa\ud83c\uddf8</span>
                    <ShieldCheck className="w-4 h-4 text-blue-300" />
                    <span className="text-sm font-semibold text-white">Registered in Delaware, USA</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-vibrant-orange/15 to-orange-500/10 border border-vibrant-orange/30 backdrop-blur-sm"
                  >
                    <span className="text-xl leading-none">\ud83c\uddee\ud83c\udde9</span>
                    <Globe2 className="w-4 h-4 text-orange-300" />
                    <span className="text-sm font-semibold text-white">Registered in Indonesia</span>
                  </motion.div>
                </div>
              </FadeInUp>
              
              <FadeInUp delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link href="/get-started" className="group relative overflow-hidden">
                    <span className="relative z-10 btn-primary inline-flex items-center">
                      Start Your Project
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.span 
                      className="absolute inset-0 bg-gradient-to-r from-orange-600 to-vibrant-orange"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                  <Link href="/services" className="btn-outline inline-flex items-center group">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Explore Solutions
                  </Link>
                </div>
              </FadeInUp>
              
              {/* Honest capability badges */}
              <FadeInUp delay={0.4}>
                <div className="flex flex-wrap gap-2">
                  {['AI-First Engineering', 'US + Asia Operations', '24/7 Time Zone Coverage'].map((badge) => (
                    <span key={badge} className="px-3 py-1 text-xs font-medium text-gray-400 bg-white/5 rounded-full border border-white/10">
                      {badge}
                    </span>
                  ))}
                </div>
              </FadeInUp>
            </div>
            
            {/* Hero visual - Animated dashboard mockup */}
            <div className="hidden lg:block relative">
              <FloatingElement y={20} duration={6}>
                <ScaleIn delay={0.3}>
                  <div className="relative">
                    {/* Glow effect behind */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-vibrant-orange/30 via-purple-500/20 to-blue-500/30 rounded-3xl blur-3xl opacity-60" />
                    
                    {/* Main card */}
                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-2 border border-white/10 shadow-2xl">
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                          </div>
                          <div className="flex-1 mx-4">
                            <div className="bg-white/10 rounded-lg px-4 py-1.5 text-xs text-gray-400 text-center">
                              dashboard.globaldigitalprime.com
                            </div>
                          </div>
                        </div>
                        
                        {/* Dashboard content */}
                        <div className="p-6">
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            {[
                              { label: 'Uptime', value: '99.9%', change: 'SLA met', color: 'text-green-400' },
                              { label: 'Deploys', value: '47', change: 'this month', color: 'text-blue-400' },
                              { label: 'Coverage', value: '24/7', change: 'US + APAC', color: 'text-purple-400' },
                            ].map((stat) => (
                              <motion.div 
                                key={stat.label}
                                className="bg-white/5 rounded-xl p-4 border border-white/5"
                                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                              >
                                <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                                <p className="text-white text-xl font-bold">{stat.value}</p>
                                <p className={`text-xs ${stat.color}`}>{stat.change}</p>
                              </motion.div>
                            ))}
                          </div>
                          
                          {/* Chart placeholder */}
                          <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                            <div className="flex items-end justify-between h-32 gap-2">
                              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                                <motion.div
                                  key={i}
                                  className="flex-1 bg-gradient-to-t from-vibrant-orange to-orange-400 rounded-t"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${height}%` }}
                                  transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating notification cards */}
                    <motion.div 
                      className="absolute -left-16 top-20 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Delaware, USA \ud83c\uddfa\ud83c\uddf8</p>
                          <p className="text-xs text-gray-500">Registered entity</p>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute -right-12 bottom-24 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Globe2 className="w-5 h-5 text-vibrant-orange" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Indonesia \ud83c\uddee\ud83c\udde9</p>
                          <p className="text-xs text-gray-500">Asia-Pacific delivery</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </ScaleIn>
              </FloatingElement>
            </div>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-vibrant-orange rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Technology band */}
      <section className="py-16 bg-white relative overflow-hidden border-b border-gray-100">
        <div className="container-custom">
          <FadeInUp>
            <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider mb-10">
              The technologies we engineer with
            </p>
          </FadeInUp>
          
          {/* Scrolling tech stack */}
          <div className="relative">
            <div className="flex overflow-hidden">
              <motion.div 
                className="flex gap-12 items-center"
                animate={{ x: [0, -1200] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {[...techStack, ...techStack].map((tech, i) => (
                  <span key={i} className="text-2xl font-bold text-gray-200 whitespace-nowrap hover:text-vibrant-orange transition-colors">
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-b from-white to-soft-gray relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-vibrant-orange/5 to-transparent" />
        
        <div className="container-custom relative">
          <FadeInUp>
            <div className="text-center mb-20">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-vibrant-orange/10 text-vibrant-orange text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                What We Build
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deep-blue mb-6">
                Software & AI,
                <span className="gradient-text"> Delivered End-to-End</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                From first architecture diagram to production and beyond \u2014 one accountable team 
                for custom software, AI systems, cloud infrastructure, and everything that connects them.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <StaggerItem key={service.title}>
                  <Link href={service.href}>
                    <motion.div
                      className="group relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 h-full"
                      whileHover={{ y: -8 }}
                    >
                      {/* Gradient overlay on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                      
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <service.icon className="w-8 h-8" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-deep-blue mb-3 group-hover:text-vibrant-orange transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                      
                      {/* Feature tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.features.map((feature) => (
                          <span key={feature} className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-vibrant-orange font-semibold group-hover:gap-3 transition-all">
                        Learn More
                        <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          
          <FadeInUp delay={0.4}>
            <div className="text-center mt-16">
              <Link href="/services" className="btn-secondary inline-flex items-center group">
                View All Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Why Global Digital Prime Section */}
      <section className="py-24 bg-deep-blue relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <motion.div 
            className="absolute top-20 right-40 w-[400px] h-[400px] bg-vibrant-orange/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        
        <div className="container-custom relative">
          <FadeInUp>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-vibrant-orange text-sm font-medium mb-6">
                <Globe2 className="w-4 h-4 mr-2" />
                Why Global Digital Prime
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                The Trust of the US.
                <span className="block text-vibrant-orange">The Power of Asia-Pacific.</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Our dual-registered structure isn&apos;t a footnote \u2014 it&apos;s the reason clients 
                choose us. Here&apos;s what it means for your project.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {differentiators.map((item) => (
                <StaggerItem key={item.title}>
                  <motion.div
                    className="group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-vibrant-orange/30 hover:bg-white/[0.08] transition-all duration-500 h-full"
                    whileHover={{ y: -8 }}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          
          <FadeInUp delay={0.4}>
            <div className="text-center mt-14">
              <Link href="/about" className="btn-primary inline-flex items-center group">
                Learn Our Story
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Global Footprint Section */}
      <section className="py-24 bg-soft-gray relative overflow-hidden">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-vibrant-orange/10 text-vibrant-orange text-sm font-medium mb-6">
                <MapPin className="w-4 h-4 mr-2" />
                Global Footprint
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-6">
                One Company. Two Continents.
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Registered in the United States and Indonesia, Global Digital Prime operates 
                where legal certainty meets engineering momentum.
              </p>
            </div>
          </FadeInUp>
          
          {/* Office cards */}
          <StaggerContainer staggerDelay={0.15}>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {offices.map((office) => (
                <StaggerItem key={office.country}>
                  <motion.div
                    className="relative bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all h-full overflow-hidden group"
                    whileHover={{ y: -5 }}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${office.accent}`} />
                    
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl">{office.flag}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-deep-blue">{office.country}</h3>
                        <p className="text-gray-500 flex items-center gap-1.5 text-sm mt-0.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {office.city}
                        </p>
                      </div>
                    </div>
                    
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r ${office.accent} text-white text-xs font-semibold mb-5`}>
                      <Building2 className="w-3.5 h-3.5 mr-1.5" />
                      {office.role}
                    </span>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">{office.description}</p>
                    
                    <ul className="space-y-3">
                      {office.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-vibrant-orange flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          
          {/* Stats band */}
          <FadeInUp delay={0.2}>
            <div className="relative bg-gradient-to-br from-deep-blue via-dark-navy to-[#0a1628] rounded-3xl p-8 md:p-12 overflow-hidden">
              <motion.div 
                className="absolute top-0 right-0 w-[300px] h-[300px] bg-vibrant-orange/20 rounded-full blur-[100px]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
                {footprintStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="w-14 h-14 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center">
                      <stat.icon className="w-7 h-7 text-vibrant-orange" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-gray-400 font-medium text-sm md:text-base">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Complex gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-dark-navy to-[#0a1628]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-vibrant-orange/20 rounded-full blur-[150px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="relative container-custom text-center">
          <FadeInUp>
            <motion.div 
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8"
              animate={{ boxShadow: ['0 0 20px rgba(239,94,51,0.3)', '0 0 40px rgba(239,94,51,0.5)', '0 0 20px rgba(239,94,51,0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-5 h-5 mr-2 text-vibrant-orange" />
              Ready to Transform Your Business?
            </motion.div>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Let&apos;s Build Something
              <span className="block gradient-text">Extraordinary Together</span>
            </h2>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Talk to a team that contracts under US law and delivers with Asia-Pacific 
              agility. Free consultation \u2014 we&apos;ll map your fastest path to shipping.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn-primary text-lg px-10 py-4 inline-flex items-center justify-center group">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn-outline text-lg px-10 py-4 inline-flex items-center justify-center">
                Contact Sales
              </Link>
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.4}>
            <p className="text-gray-400 mt-8 text-sm">
              No commitment required \u2022 Free consultation \u2022 Response within 24 hours
            </p>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}
