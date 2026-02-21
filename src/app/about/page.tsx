'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  FadeInUp, 
  SlideInLeft, 
  SlideInRight, 
  StaggerContainer, 
  StaggerItem,
  GradientBlob 
} from '@/components/animations'
import { motion } from 'framer-motion'
import { 
  Target, 
  Eye, 
  Heart, 
  Award, 
  Users, 
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Linkedin,
  Twitter
} from 'lucide-react'

const stats = [
  { number: '2000+', label: 'Companies Served' },
  { number: '12+', label: 'Years Experience' },
  { number: '98%', label: 'Client Satisfaction' },
  { number: '50+', label: 'Team Members' },
]

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We focus on measurable outcomes that directly impact your bottom line.',
  },
  {
    icon: Heart,
    title: 'Client-First',
    description: 'Your success is our success. We treat your business as our own.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'Clear communication and honest reporting at every step.',
  },
  {
    icon: TrendingUp,
    title: 'Innovation',
    description: 'We stay ahead of trends to keep your business competitive.',
  },
]

const team = [
  {
    name: 'Silvia Garden',
    role: 'Creative Director',
    image: '/images/team/member1.jpg',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Monalisha Shen',
    role: 'IT Executive',
    image: '/images/team/member2.jpg',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Bubli Khanam',
    role: 'Lead Developer',
    image: '/images/team/member3.jpg',
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'James Wilson',
    role: 'Marketing Director',
    image: '/images/team/member4.jpg',
    linkedin: '#',
    twitter: '#',
  },
]

const milestones = [
  { year: '2012', title: 'Company Founded', description: 'Started with a vision to transform digital marketing.' },
  { year: '2015', title: '500 Clients', description: 'Reached our first major milestone of serving 500 businesses.' },
  { year: '2018', title: 'Global Expansion', description: 'Expanded operations with international offices.' },
  { year: '2022', title: '2000+ Clients', description: 'Serving over 2000 businesses worldwide.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden gradient-hero">
        <GradientBlob className="w-[600px] h-[600px] bg-vibrant-orange/20 -top-40 -right-40" />
        
        <div className="container-custom relative">
          <FadeInUp>
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 glass rounded-full text-white/90 text-sm mb-6">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Built Strong Online Presence for
                <span className="block gradient-text text-glow mt-2">Over 2000+ Companies</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                We are dedicated to helping businesses unlock their full potential in the digital world. 
                Our expert team works hand-in-hand with you to craft custom strategies that drive growth.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white relative -mt-10 z-10">
        <div className="container-custom">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <FadeInUp key={stat.label}>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-deep-blue mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideInLeft>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-vibrant-orange/20 to-deep-blue/20 rounded-3xl blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about-office.jpg"
                    alt="Global Digital Prime office"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </SlideInLeft>
            
            <SlideInRight>
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="section-title mt-2">
                Transforming Businesses Through Digital Excellence
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded with a passion for digital innovation, Global Digital Prime has grown from a small team 
                of marketing enthusiasts to a full-service digital agency serving clients worldwide.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our mission is simple: help businesses thrive in the digital age. We combine creativity with 
                data-driven strategies to deliver results that matter. Every campaign we run, every website 
                we build, and every strategy we develop is focused on one thing – your growth.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-vibrant-orange" />
                  <span className="font-medium">Data-Driven Approach</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-vibrant-orange" />
                  <span className="font-medium">Expert Team</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-vibrant-orange" />
                  <span className="font-medium">Proven Results</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-vibrant-orange" />
                  <span className="font-medium">24/7 Support</span>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-soft-gray">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Values</span>
              <h2 className="section-title mt-2">What Drives Us</h2>
              <p className="section-subtitle">
                Our core values guide everything we do and how we work with our clients.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <StaggerItem key={value.title}>
                  <motion.div
                    className="bg-white rounded-2xl p-8 text-center h-full hover:shadow-xl transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-vibrant-orange to-orange-400 rounded-2xl flex items-center justify-center text-white">
                      <value.icon className="w-8 h-8" />
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
      <section className="py-20 bg-white">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Journey</span>
              <h2 className="section-title mt-2">Milestones That Matter</h2>
            </div>
          </FadeInUp>
          
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <FadeInUp key={milestone.year} delay={index * 0.1}>
                <div className="flex gap-8 mb-12 last:mb-0">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="text-2xl font-bold text-vibrant-orange">{milestone.year}</span>
                  </div>
                  <div className="relative pb-12 last:pb-0">
                    <div className="absolute left-0 top-2 w-4 h-4 bg-vibrant-orange rounded-full"></div>
                    <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="ml-10">
                      <h3 className="text-xl font-bold text-deep-blue mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-soft-gray">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Team</span>
              <h2 className="section-title mt-2">Meet the Experts</h2>
              <p className="section-subtitle">
                A talented team of strategists, creatives, and technologists dedicated to your success.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <StaggerItem key={member.name}>
                  <motion.div
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                        <div className="flex gap-3">
                          <a href={member.linkedin} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-vibrant-orange transition-colors">
                            <Linkedin className="w-5 h-5" />
                          </a>
                          <a href={member.twitter} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-vibrant-orange transition-colors">
                            <Twitter className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold text-deep-blue">{member.name}</h3>
                      <p className="text-gray-600">{member.role}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <GradientBlob className="w-[500px] h-[500px] bg-vibrant-orange/30 top-0 right-0" />
        
        <div className="container-custom relative text-center">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can help take your business to the next level.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center group">
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}
