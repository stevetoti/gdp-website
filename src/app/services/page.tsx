'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  FadeInUp, 
  FadeIn, 
  SlideInLeft, 
  SlideInRight, 
  StaggerContainer, 
  StaggerItem,
  GradientBlob 
} from '@/components/animations'
import { motion } from 'framer-motion'
import { 
  Monitor, 
  Video, 
  Mail, 
  Search, 
  TrendingUp, 
  MessageSquare,
  Target,
  BarChart3,
  Megaphone,
  Palette,
  Code,
  Smartphone,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const services = [
  {
    id: 'website-design',
    icon: Monitor,
    title: 'Website Design',
    tagline: 'Converting Visitors into Customers',
    description: 'User-friendly, mobile-responsive, and visually stunning websites that convert visitors into loyal customers. We create digital experiences that leave lasting impressions.',
    features: [
      'Custom responsive design',
      'UI/UX optimization',
      'E-commerce solutions',
      'CMS integration',
      'Performance optimization',
      'SEO-friendly structure',
    ],
    color: 'from-blue-500 to-blue-600',
    image: '/images/services/website-design.jpg',
  },
  {
    id: 'video-production',
    icon: Video,
    title: 'Video Production',
    tagline: 'Tell Your Story Visually',
    description: 'We create compelling video content for social media, YouTube, websites, and ads that captivate your audience and drive engagement.',
    features: [
      'Brand storytelling videos',
      'Product demonstrations',
      'Social media content',
      'Explainer videos',
      'Testimonial videos',
      'Motion graphics',
    ],
    color: 'from-purple-500 to-purple-600',
    image: '/images/services/video-production.jpg',
  },
  {
    id: 'email-marketing',
    icon: Mail,
    title: 'Email Marketing',
    tagline: 'Nurture & Convert',
    description: 'Nurture relationships and increase sales through personalized, data-driven email campaigns that speak directly to your audience.',
    features: [
      'Campaign strategy',
      'Template design',
      'List segmentation',
      'Automation workflows',
      'A/B testing',
      'Performance analytics',
    ],
    color: 'from-green-500 to-green-600',
    image: '/images/services/email-marketing.jpg',
  },
  {
    id: 'seo',
    icon: Search,
    title: 'SEO Strategies',
    tagline: 'Rank Higher, Get Found',
    description: 'Drive organic traffic and ensure your site ranks higher for relevant keywords with proven SEO techniques that deliver lasting results.',
    features: [
      'Keyword research',
      'On-page optimization',
      'Technical SEO',
      'Content strategy',
      'Link building',
      'Local SEO',
    ],
    color: 'from-orange-500 to-orange-600',
    image: '/images/services/seo.jpg',
  },
  {
    id: 'ppc',
    icon: TrendingUp,
    title: 'PPC Advertising',
    tagline: 'Immediate Results, Maximum ROI',
    description: 'Strategic paid advertising campaigns that deliver immediate traffic and measurable ROI across Google, Facebook, and other platforms.',
    features: [
      'Google Ads management',
      'Facebook/Instagram ads',
      'Retargeting campaigns',
      'Landing page optimization',
      'Budget optimization',
      'Conversion tracking',
    ],
    color: 'from-red-500 to-red-600',
    image: '/images/services/ppc.jpg',
  },
  {
    id: 'social-media',
    icon: MessageSquare,
    title: 'Social Media Marketing',
    tagline: 'Build Your Community',
    description: 'Build your brand presence and engage with your audience across all major social platforms with strategic content and community management.',
    features: [
      'Content creation',
      'Community management',
      'Influencer partnerships',
      'Social listening',
      'Analytics & reporting',
      'Paid social campaigns',
    ],
    color: 'from-pink-500 to-pink-600',
    image: '/images/services/social-media.jpg',
  },
]

const additionalServices = [
  { icon: Target, title: 'Brand Strategy', description: 'Define and refine your brand identity' },
  { icon: BarChart3, title: 'Analytics', description: 'Data-driven insights for growth' },
  { icon: Megaphone, title: 'PR & Outreach', description: 'Build buzz and credibility' },
  { icon: Palette, title: 'Graphic Design', description: 'Visual content that stands out' },
  { icon: Code, title: 'Web Development', description: 'Custom solutions and apps' },
  { icon: Smartphone, title: 'App Marketing', description: 'ASO and mobile campaigns' },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden gradient-hero">
        <GradientBlob className="w-[600px] h-[600px] bg-vibrant-orange/20 -top-40 -right-40" />
        
        <div className="container-custom relative">
          <FadeInUp>
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 glass rounded-full text-white/90 text-sm mb-6">
                Our Services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                We Provide All Kinds Of
                <span className="block gradient-text text-glow mt-2">Business Growing Services</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                From brand awareness to lead generation, we provide a seamless digital marketing experience 
                that drives real results for your business.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          {services.map((service, index) => (
            <div 
              key={service.id}
              id={service.id}
              className={`py-16 ${index !== services.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {index % 2 === 0 ? (
                  <>
                    <SlideInLeft>
                      <div className="relative">
                        <div className={`absolute -inset-4 bg-gradient-to-r ${service.color} opacity-20 rounded-3xl blur-2xl`}></div>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={600}
                            height={400}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </SlideInLeft>
                    <SlideInRight>
                      <ServiceContent service={service} />
                    </SlideInRight>
                  </>
                ) : (
                  <>
                    <SlideInLeft className="lg:order-2">
                      <div className="relative">
                        <div className={`absolute -inset-4 bg-gradient-to-r ${service.color} opacity-20 rounded-3xl blur-2xl`}></div>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                          <Image
                            src={service.image}
                            alt={service.title}
                            width={600}
                            height={400}
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </SlideInLeft>
                    <SlideInRight className="lg:order-1">
                      <ServiceContent service={service} />
                    </SlideInRight>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-soft-gray">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">More Services</span>
              <h2 className="section-title mt-2">Additional Expertise</h2>
              <p className="section-subtitle">
                Beyond our core services, we offer specialized solutions to meet all your digital marketing needs.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {additionalServices.map((service) => (
                <StaggerItem key={service.title}>
                  <motion.div
                    className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-all h-full"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-deep-blue to-dark-navy rounded-2xl flex items-center justify-center text-white">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-deep-blue mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
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
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how our services can help you achieve your business goals.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center group">
              Get a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}

function ServiceContent({ service }: { service: typeof services[0] }) {
  return (
    <div>
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6`}>
        <service.icon className="w-8 h-8" />
      </div>
      <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">
        {service.tagline}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mt-2 mb-4">
        {service.title}
      </h2>
      <p className="text-gray-600 text-lg leading-relaxed mb-8">
        {service.description}
      </p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {service.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-vibrant-orange flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
      <Link 
        href="/contact" 
        className="btn-secondary inline-flex items-center group"
      >
        Get Started
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}
