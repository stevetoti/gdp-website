'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  FadeInUp, 
  FadeIn, 
  ScaleIn, 
  SlideInLeft, 
  SlideInRight, 
  StaggerContainer, 
  StaggerItem,
  FloatingElement,
  GradientBlob 
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
  Star,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  CheckCircle2,
  Play,
  Users,
  Award,
  TrendingUp
} from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    description: 'Tailored solutions built from the ground up to match your exact business requirements and scale with your growth.',
    href: '/services#custom-software',
    color: 'from-blue-500 to-cyan-500',
    features: ['Web Applications', 'API Development', 'Legacy Modernization']
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Harness the power of artificial intelligence to automate processes, gain insights, and create intelligent experiences.',
    href: '/services#ai-ml',
    color: 'from-purple-500 to-pink-500',
    features: ['Predictive Analytics', 'NLP Solutions', 'Computer Vision']
  },
  {
    icon: Rocket,
    title: 'Digital Transformation',
    description: 'Modernize your business operations with cutting-edge technology and strategic digital initiatives.',
    href: '/services#digital-transformation',
    color: 'from-orange-500 to-red-500',
    features: ['Process Automation', 'Digital Strategy', 'Change Management']
  },
  {
    icon: Cloud,
    title: 'Cloud Architecture',
    description: 'Design and implement scalable, secure cloud infrastructure that optimizes performance and reduces costs.',
    href: '/services#cloud',
    color: 'from-cyan-500 to-blue-500',
    features: ['AWS & Azure', 'Kubernetes', 'DevOps']
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Create stunning, high-performance mobile applications for iOS and Android that users love.',
    href: '/services#mobile',
    color: 'from-green-500 to-emerald-500',
    features: ['React Native', 'Flutter', 'Native Apps']
  },
  {
    icon: Cog,
    title: 'Enterprise Integration',
    description: 'Connect your systems, data, and applications seamlessly for unified business operations.',
    href: '/services#integration',
    color: 'from-amber-500 to-orange-500',
    features: ['API Gateway', 'ETL Pipelines', 'Middleware']
  },
]

const stats = [
  { number: '150+', label: 'Enterprise Clients', icon: Users },
  { number: '98%', label: 'Client Retention', icon: Award },
  { number: '500+', label: 'Projects Delivered', icon: TrendingUp },
  { number: '24/7', label: 'Support & Monitoring', icon: Shield },
]

const testimonials = [
  {
    quote: 'Global Digital Prime transformed our entire digital infrastructure. Their AI solutions increased our operational efficiency by 40% in just 6 months.',
    author: 'Sarah Chen',
    role: 'CTO, TechFlow Industries',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    company: 'techflow'
  },
  {
    quote: 'The cloud migration was seamless. Their team\'s expertise and 24/7 support gave us the confidence to modernize our entire operation.',
    author: 'Michael Rodriguez',
    role: 'VP Engineering, DataScale',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    company: 'datascale'
  },
  {
    quote: 'Their custom software solution streamlined our workflows and reduced processing time by 60%. Truly exceptional work.',
    author: 'Emily Watson',
    role: 'Operations Director, GlobalRetail',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    company: 'globalretail'
  },
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'AWS', 
  'Azure', 'Kubernetes', 'TensorFlow', 'PostgreSQL', 'MongoDB', 'Docker'
]

const trustedBy = [
  { name: 'Fortune 500 Companies', count: '50+' },
  { name: 'Tech Startups', count: '200+' },
  { name: 'Government Agencies', count: '15+' },
  { name: 'Healthcare Organizations', count: '30+' },
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
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
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
                  Trusted by 150+ Enterprise Clients Worldwide
                </motion.div>
              </FadeInUp>
              
              <FadeInUp delay={0.1}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-8">
                  Build The Future
                  <span className="block mt-3">
                    <span className="relative">
                      <span className="gradient-text">With Digital</span>
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
                <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-xl">
                  We architect enterprise-grade software solutions, harness AI innovation, 
                  and drive digital transformation for organizations ready to lead their industries.
                </p>
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
              
              {/* Tech badges */}
              <FadeInUp delay={0.4}>
                <div className="flex flex-wrap gap-2">
                  {['AWS Partner', 'Microsoft Certified', 'ISO 27001'].map((badge) => (
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
                              { label: 'Revenue', value: '$2.4M', change: '+24%', color: 'text-green-400' },
                              { label: 'Projects', value: '47', change: '+12%', color: 'text-blue-400' },
                              { label: 'Efficiency', value: '94%', change: '+8%', color: 'text-purple-400' },
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
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Deployment Complete</p>
                          <p className="text-xs text-gray-500">Production v2.4.1</p>
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
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Brain className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">AI Model Trained</p>
                          <p className="text-xs text-gray-500">99.2% accuracy</p>
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

      {/* Trusted By / Social Proof */}
      <section className="py-20 bg-white relative overflow-hidden border-b border-gray-100">
        <div className="container-custom">
          <FadeInUp>
            <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider mb-12">
              Trusted by industry leaders worldwide
            </p>
          </FadeInUp>
          
          {/* Scrolling tech stack */}
          <div className="relative mb-16">
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
          
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <motion.div 
                    className="text-center p-8 rounded-2xl hover:bg-soft-gray transition-all group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-vibrant-orange/10 to-orange-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <stat.icon className="w-8 h-8 text-vibrant-orange" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-deep-blue mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
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
                Our Expertise
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-deep-blue mb-6">
                Enterprise-Grade
                <span className="gradient-text"> Solutions</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                From AI-powered innovation to cloud infrastructure, we deliver technology 
                solutions that transform how businesses operate and compete.
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

      {/* About/Why Us Section */}
      <section className="py-24 bg-deep-blue relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <motion.div 
            className="absolute top-20 right-40 w-[400px] h-[400px] bg-vibrant-orange/10 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideInLeft>
              <div className="relative">
                {/* Main image */}
                <div className="relative rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                    alt="Team collaboration"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/60 to-transparent" />
                </div>
                
                {/* Stats card overlay */}
                <motion.div 
                  className="absolute -bottom-8 -right-8 bg-white rounded-2xl p-6 shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-vibrant-orange to-orange-400 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-deep-blue">40%</div>
                      <div className="text-sm text-gray-600">Average ROI Increase</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </SlideInLeft>
            
            <SlideInRight>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-vibrant-orange text-sm font-medium mb-6">
                <Globe className="w-4 h-4 mr-2" />
                Why Global Digital Prime
              </span>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                We Don&apos;t Just Build Software.
                <span className="block text-vibrant-orange">We Build Partnerships.</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                With deep expertise across industries and technologies, we become an extension 
                of your team—committed to your success from day one.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { title: 'Expert Team', desc: 'Senior engineers with Fortune 500 experience' },
                  { title: 'Agile Delivery', desc: 'Transparent process with rapid iterations' },
                  { title: 'Long-term Support', desc: '24/7 monitoring and continuous optimization' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-vibrant-orange flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/about" className="btn-primary inline-flex items-center group">
                Learn Our Story
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-soft-gray relative overflow-hidden">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-vibrant-orange/10 text-vibrant-orange text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Client Success Stories
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-6">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Don&apos;t just take our word for it—hear from the companies we&apos;ve helped transform.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer staggerDelay={0.15}>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <p className="text-gray-700 text-lg leading-relaxed mb-8 flex-grow">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    
                    <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-deep-blue">{testimonial.author}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
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
              Schedule a free consultation with our experts and discover how we can 
              accelerate your digital transformation journey.
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
              No commitment required • Free consultation • Response within 24 hours
            </p>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}
