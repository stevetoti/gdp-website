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
  ArrowRight,
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Globe,
  TrendingUp,
  Linkedin,
  Twitter,
  CheckCircle2,
  Building2,
  Rocket
} from 'lucide-react'

const stats = [
  { number: '150+', label: 'Enterprise Clients', icon: Building2 },
  { number: '500+', label: 'Projects Delivered', icon: Rocket },
  { number: '50+', label: 'Team Members', icon: Users },
  { number: '12+', label: 'Countries Served', icon: Globe },
]

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We pursue excellence in every line of code, every design decision, and every client interaction.'
  },
  {
    icon: Heart,
    title: 'Integrity',
    description: 'We build trust through transparency, honest communication, and delivering on our promises.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We work as partners with our clients, treating their success as our own.'
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'We constantly explore new technologies and approaches to deliver cutting-edge solutions.'
  },
]

const team = [
  {
    name: 'Stephen Totimeh',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Visionary leader with 15+ years in digital transformation and enterprise software.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Sarah Chen',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    bio: 'Former Google engineer specializing in AI/ML and distributed systems.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Michael Rodriguez',
    role: 'VP of Engineering',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    bio: 'Full-stack architect with experience building scalable platforms at Fortune 500 companies.',
    linkedin: '#',
    twitter: '#'
  },
  {
    name: 'Emily Watson',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Product strategist who has launched 20+ successful enterprise products.',
    linkedin: '#',
    twitter: '#'
  },
]

const milestones = [
  { year: '2015', title: 'Company Founded', description: 'Started with a vision to transform businesses through technology.' },
  { year: '2017', title: 'First Enterprise Client', description: 'Signed our first Fortune 500 client, proving our enterprise capabilities.' },
  { year: '2019', title: 'AI Division Launch', description: 'Expanded into AI and machine learning solutions.' },
  { year: '2021', title: '100th Client', description: 'Reached the milestone of 100 satisfied enterprise clients.' },
  { year: '2023', title: 'Global Expansion', description: 'Opened offices across 3 continents to serve clients worldwide.' },
  { year: '2024', title: 'Pacific Wave Partnership', description: 'Joined forces with Pacific Wave Digital to expand our reach.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-dark-navy to-[#0a1628]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <motion.div 
            className="absolute top-20 left-20 w-[500px] h-[500px] bg-vibrant-orange/20 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="container-custom relative">
          <FadeInUp>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-vibrant-orange text-sm font-medium mb-6">
                <Building2 className="w-4 h-4 mr-2" />
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Building the Future of
                <span className="gradient-text"> Digital Enterprise</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                We&apos;re a team of passionate engineers, designers, and strategists dedicated to 
                helping organizations thrive in the digital age.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative z-10 -mt-16">
        <div className="container-custom">
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <StaggerContainer staggerDelay={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <StaggerItem key={stat.label}>
                    <div className="text-center">
                      <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-vibrant-orange/10 to-orange-100 rounded-2xl flex items-center justify-center">
                        <stat.icon className="w-7 h-7 text-vibrant-orange" />
                      </div>
                      <div className="text-4xl font-bold text-deep-blue mb-1">{stat.number}</div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideInLeft>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-vibrant-orange/20 to-blue-500/20 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                    alt="Team collaboration at Global Digital Prime"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </SlideInLeft>
            
            <SlideInRight>
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mt-2 mb-6">
                From Startup to Global Partner
              </h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Global Digital Prime was founded with a simple belief: that every organization 
                  deserves access to world-class technology solutions, regardless of size.
                </p>
                <p>
                  What started as a small team of passionate engineers has grown into a global 
                  technology partner serving enterprises across industries and continents.
                </p>
                <p>
                  Today, we continue to push the boundaries of what&apos;s possible, combining deep 
                  technical expertise with a genuine commitment to our clients&apos; success.
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-soft-gray rounded-2xl">
                <p className="text-gray-500 text-sm mb-2">Part of the</p>
                <a href="https://pacificwavedigital.com" target="_blank" rel="noopener noreferrer" className="font-bold text-deep-blue hover:text-vibrant-orange transition-colors">
                  Pacific Wave Digital Network
                </a>
                <p className="text-gray-500 text-sm mt-2">
                  A connected ecosystem of digital innovation companies spanning the Pacific, Americas, and beyond.
                </p>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-soft-gray">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-6">
                Our Mission & Vision
              </h2>
            </div>
          </FadeInUp>
          
          <div className="grid md:grid-cols-2 gap-8">
            <FadeInUp delay={0.1}>
              <div className="bg-white rounded-3xl p-10 shadow-sm h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-vibrant-orange to-orange-400 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-4">Our Mission</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To empower organizations with innovative technology solutions that drive growth, 
                  efficiency, and competitive advantage in the digital economy.
                </p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <div className="bg-white rounded-3xl p-10 shadow-sm h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-deep-blue mb-4">Our Vision</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be the trusted digital transformation partner for enterprises worldwide, 
                  known for our technical excellence, innovation, and unwavering commitment to client success.
                </p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-vibrant-orange/10 text-vibrant-orange text-sm font-medium mb-6">
                <Heart className="w-4 h-4 mr-2" />
                Our Values
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-6">
                What Drives Us
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our core values guide every decision we make and every solution we build.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <motion.div
                    className="text-center p-8 rounded-2xl hover:bg-soft-gray transition-all h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-deep-blue to-dark-navy rounded-2xl flex items-center justify-center">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-deep-blue mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-deep-blue relative overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-[400px] h-[400px] bg-vibrant-orange/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="container-custom relative">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Our Journey
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Key milestones that have shaped who we are today.
              </p>
            </div>
          </FadeInUp>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/10" />
            
            {milestones.map((milestone, index) => (
              <FadeInUp key={milestone.year} delay={index * 0.1}>
                <div className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="text-vibrant-orange font-bold text-xl mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-vibrant-orange rounded-full border-4 border-deep-blue z-10" />
                  
                  <div className="w-1/2" />
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-soft-gray">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-vibrant-orange/10 text-vibrant-orange text-sm font-medium mb-6">
                <Users className="w-4 h-4 mr-2" />
                Leadership Team
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-deep-blue mb-6">
                Meet Our Leaders
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experienced professionals dedicated to driving innovation and client success.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <StaggerItem key={member.name}>
                  <motion.div
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-deep-blue">{member.name}</h3>
                      <p className="text-vibrant-orange font-medium text-sm mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                      <div className="flex gap-3">
                        <a href={member.linkedin} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-vibrant-orange hover:text-white transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a href={member.twitter} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-vibrant-orange hover:text-white transition-colors">
                          <Twitter className="w-4 h-4" />
                        </a>
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
      <section className="py-24 bg-gradient-to-br from-deep-blue via-dark-navy to-[#0a1628] relative overflow-hidden">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-vibrant-orange/20 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="container-custom relative text-center">
          <FadeInUp>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help transform your business with technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="btn-primary inline-flex items-center justify-center group">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/careers" className="btn-outline inline-flex items-center justify-center">
                Join Our Team
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}
