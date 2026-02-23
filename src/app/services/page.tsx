'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  FadeInUp, 
  StaggerContainer, 
  StaggerItem,
  SlideInLeft,
  SlideInRight
} from '@/components/animations'
import { 
  Code2, 
  Brain, 
  Cloud, 
  Smartphone, 
  Rocket, 
  Cog,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Clock,
  Users,
  Star,
  ChevronRight
} from 'lucide-react'

const services = [
  {
    id: 'custom-software',
    icon: Code2,
    title: 'Custom Software Development',
    subtitle: 'Tailored Solutions for Unique Challenges',
    description: 'We build bespoke software applications that perfectly align with your business processes, scale with your growth, and give you a competitive edge.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    color: 'from-blue-500 to-cyan-500',
    features: [
      'Full-stack web application development',
      'API design and development',
      'Legacy system modernization',
      'Microservices architecture',
      'Real-time data processing',
      'Third-party integrations'
    ],
    technologies: ['React', 'Node.js', 'Python', 'PostgreSQL', 'GraphQL', 'Redis'],
    stats: { projects: '200+', satisfaction: '99%' }
  },
  {
    id: 'ai-ml',
    icon: Brain,
    title: 'AI & Machine Learning',
    subtitle: 'Intelligent Solutions for Smart Decisions',
    description: 'Harness the power of artificial intelligence to automate processes, uncover insights, and create intelligent experiences that transform your business.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    color: 'from-purple-500 to-pink-500',
    features: [
      'Predictive analytics & forecasting',
      'Natural language processing (NLP)',
      'Computer vision solutions',
      'Recommendation engines',
      'Chatbots & virtual assistants',
      'Custom ML model development'
    ],
    technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Langchain', 'Hugging Face', 'Scikit-learn'],
    stats: { models: '50+', accuracy: '95%+' }
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Architecture',
    subtitle: 'Scalable, Secure, Cost-Optimized',
    description: 'Design and implement cloud infrastructure that scales on demand, maintains enterprise-grade security, and optimizes your operational costs.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
    color: 'from-cyan-500 to-blue-500',
    features: [
      'Cloud migration strategy & execution',
      'Multi-cloud architecture design',
      'Kubernetes orchestration',
      'Infrastructure as Code (IaC)',
      'Cost optimization & FinOps',
      'Disaster recovery planning'
    ],
    technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'Docker'],
    stats: { migrations: '100+', uptime: '99.99%' }
  },
  {
    id: 'mobile',
    icon: Smartphone,
    title: 'Mobile App Development',
    subtitle: 'Native Performance, Cross-Platform Efficiency',
    description: 'Create stunning, high-performance mobile applications that users love, with seamless experiences across iOS and Android platforms.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
    color: 'from-green-500 to-emerald-500',
    features: [
      'Cross-platform development (React Native, Flutter)',
      'Native iOS & Android apps',
      'Progressive Web Apps (PWA)',
      'App Store optimization',
      'Push notifications & real-time features',
      'Offline-first architecture'
    ],
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'Expo'],
    stats: { apps: '80+', downloads: '5M+' }
  },
  {
    id: 'digital-transformation',
    icon: Rocket,
    title: 'Digital Transformation',
    subtitle: 'Modernize Your Business Operations',
    description: 'Navigate the digital landscape with confidence. We guide your organization through comprehensive digital transformation initiatives.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop',
    color: 'from-orange-500 to-red-500',
    features: [
      'Digital strategy consulting',
      'Business process automation',
      'Customer experience optimization',
      'Data-driven decision making',
      'Change management support',
      'Technology roadmap development'
    ],
    technologies: ['Automation', 'Analytics', 'CRM', 'ERP', 'BPM', 'Low-code'],
    stats: { transformations: '75+', roi: '40%+' }
  },
  {
    id: 'integration',
    icon: Cog,
    title: 'Enterprise Integration',
    subtitle: 'Connect Your Digital Ecosystem',
    description: 'Seamlessly connect your systems, data, and applications for unified operations and enhanced productivity across your organization.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    color: 'from-amber-500 to-orange-500',
    features: [
      'API gateway implementation',
      'ETL pipeline development',
      'Middleware solutions',
      'Data synchronization',
      'Legacy system integration',
      'Real-time event streaming'
    ],
    technologies: ['Apache Kafka', 'RabbitMQ', 'REST APIs', 'GraphQL', 'gRPC', 'Webhooks'],
    stats: { integrations: '500+', systems: '150+' }
  },
]

const whyChooseUs = [
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Senior engineers with experience at Fortune 500 companies and leading tech firms.'
  },
  {
    icon: Zap,
    title: 'Agile Delivery',
    description: 'Rapid iterations with transparent communication and continuous value delivery.'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant processes with security-first development practices.'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock monitoring and support for mission-critical systems.'
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-dark-navy to-[#0a1628]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <motion.div 
            className="absolute top-20 right-20 w-[500px] h-[500px] bg-vibrant-orange/20 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="container-custom relative">
          <FadeInUp>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-vibrant-orange text-sm font-medium mb-6">
                <Zap className="w-4 h-4 mr-2" />
                Our Services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Enterprise Solutions for
                <span className="gradient-text"> Every Challenge</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                From custom software development to AI innovation, we deliver technology 
                solutions that drive real business outcomes.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          {services.map((service, index) => (
            <div 
              key={service.id}
              id={service.id}
              className={`py-20 ${index !== 0 ? 'border-t border-gray-100' : ''}`}
            >
              <div className={`grid lg:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {index % 2 === 0 ? (
                  <>
                    <SlideInLeft>
                      <div className="relative">
                        <div className={`absolute -inset-4 bg-gradient-to-br ${service.color} opacity-10 rounded-3xl blur-2xl`} />
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={800}
                            height={500}
                            className="w-full h-auto"
                          />
                        </div>
                        
                        {/* Stats overlay */}
                        <motion.div 
                          className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex gap-6">
                            <div>
                              <div className="text-2xl font-bold text-deep-blue">{Object.values(service.stats)[0]}</div>
                              <div className="text-sm text-gray-500">{Object.keys(service.stats)[0].replace(/([A-Z])/g, ' $1').trim()}</div>
                            </div>
                            <div className="border-l border-gray-200 pl-6">
                              <div className="text-2xl font-bold text-vibrant-orange">{Object.values(service.stats)[1]}</div>
                              <div className="text-sm text-gray-500">{Object.keys(service.stats)[1].replace(/([A-Z])/g, ' $1').trim()}</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </SlideInLeft>
                    
                    <SlideInRight>
                      <ServiceContent service={service} />
                    </SlideInRight>
                  </>
                ) : (
                  <>
                    <SlideInLeft className="order-2 lg:order-1">
                      <ServiceContent service={service} />
                    </SlideInLeft>
                    
                    <SlideInRight className="order-1 lg:order-2">
                      <div className="relative">
                        <div className={`absolute -inset-4 bg-gradient-to-br ${service.color} opacity-10 rounded-3xl blur-2xl`} />
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={800}
                            height={500}
                            className="w-full h-auto"
                          />
                        </div>
                        
                        <motion.div 
                          className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex gap-6">
                            <div>
                              <div className="text-2xl font-bold text-deep-blue">{Object.values(service.stats)[0]}</div>
                              <div className="text-sm text-gray-500">{Object.keys(service.stats)[0].replace(/([A-Z])/g, ' $1').trim()}</div>
                            </div>
                            <div className="border-l border-gray-200 pl-6">
                              <div className="text-2xl font-bold text-vibrant-orange">{Object.values(service.stats)[1]}</div>
                              <div className="text-sm text-gray-500">{Object.keys(service.stats)[1].replace(/([A-Z])/g, ' $1').trim()}</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </SlideInRight>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-soft-gray">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-vibrant-orange/10 text-vibrant-orange text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Why Global Digital Prime
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-6">
                What Sets Us Apart
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine technical excellence with business acumen to deliver solutions that truly matter.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item) => (
                <StaggerItem key={item.title}>
                  <motion.div
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all h-full text-center"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-vibrant-orange to-orange-400 rounded-2xl flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-deep-blue mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-deep-blue via-dark-navy to-[#0a1628] relative overflow-hidden">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vibrant-orange/20 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="container-custom relative text-center">
          <FadeInUp>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss how our services can help transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn-primary inline-flex items-center justify-center group">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="btn-outline inline-flex items-center justify-center">
                Schedule a Call
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}

function ServiceContent({ service }: { service: typeof services[0] }) {
  return (
    <div>
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6`}>
        <service.icon className="w-7 h-7" />
      </div>
      
      <p className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider mb-2">
        {service.subtitle}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">
        {service.title}
      </h2>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        {service.description}
      </p>
      
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {service.features.map((feature) => (
          <div key={feature} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-vibrant-orange flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {service.technologies.map((tech) => (
          <span key={tech} className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
            {tech}
          </span>
        ))}
      </div>
      
      <Link href="/get-started" className="inline-flex items-center text-vibrant-orange font-semibold group">
        Get Started with {service.title.split(' ')[0]}
        <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-2 transition-transform" />
      </Link>
    </div>
  )
}
