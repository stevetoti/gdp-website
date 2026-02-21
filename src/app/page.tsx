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
import { motion } from 'framer-motion'
import { 
  Globe, 
  Zap, 
  TrendingUp, 
  Mail, 
  Search, 
  Video, 
  Monitor, 
  Users, 
  Award, 
  CheckCircle,
  ArrowRight,
  Star,
  MessageSquare
} from 'lucide-react'

const services = [
  {
    icon: Monitor,
    title: 'Website Design',
    description: 'User-friendly, mobile-responsive, and visually stunning websites that convert visitors into loyal customers.',
    href: '/services#website-design',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Video,
    title: 'Video Production',
    description: 'Compelling video content for social media, YouTube, websites, and ads that captivate your audience.',
    href: '/services#video-production',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Mail,
    title: 'Email Marketing',
    description: 'Nurture relationships and increase sales through personalized, data-driven email campaigns.',
    href: '/services#email-marketing',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Search,
    title: 'SEO Strategies',
    description: 'Drive organic traffic and ensure your site ranks higher for relevant keywords with proven SEO techniques.',
    href: '/services#seo',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: TrendingUp,
    title: 'PPC Advertising',
    description: 'Strategic paid advertising campaigns that deliver immediate traffic and measurable ROI.',
    href: '/services#ppc',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: MessageSquare,
    title: 'Social Media',
    description: 'Build your brand presence and engage with your audience across all major social platforms.',
    href: '/services#social-media',
    color: 'from-pink-500 to-pink-600',
  },
]

const stats = [
  { number: '2000+', label: 'Companies Served', icon: Users },
  { number: '98%', label: 'Client Satisfaction', icon: Award },
  { number: '12+', label: 'Years Experience', icon: Zap },
  { number: '100%', label: 'Customer Trust', icon: CheckCircle },
]

const testimonials = [
  {
    quote: 'The team at Global Digital Prime helped us craft a custom strategy that not only elevated our brand visibility but also significantly boosted our sales.',
    author: 'Daniel Tetteh Kudji',
    role: 'Godan Foundation',
    avatar: '/images/testimonials/avatar1.jpg',
  },
  {
    quote: 'Their expertise in paid advertising and conversion optimization helped us see immediate results. We\'ve gained more sales than we ever thought possible.',
    author: 'David Alexon',
    role: 'MH Manager',
    avatar: '/images/testimonials/avatar2.jpg',
  },
  {
    quote: 'Their SEO and social media strategies were exactly what we needed to attract the right audience and grow our customer base.',
    author: 'Deborah Richlove',
    role: 'CEO, Founder',
    avatar: '/images/testimonials/avatar3.jpg',
  },
  {
    quote: 'They\'ve been nothing short of exceptional. Their PPC campaigns delivered immediate traffic, and their ongoing support has optimized our digital presence.',
    author: 'David Oswald',
    role: 'Marian Digitals',
    avatar: '/images/testimonials/avatar4.jpg',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Strategy Development',
    description: 'Create a tailored marketing plan based on your business goals and target audience.',
  },
  {
    step: '02',
    title: 'Campaign Execution',
    description: 'Implement SEO, run PPC ads, manage social media, create content, and optimize user engagement.',
  },
  {
    step: '03',
    title: 'Analysis & Optimization',
    description: 'Monitor key metrics, adjust strategies based on data, and report performance for continuous improvement.',
  },
]

const faqs = [
  {
    question: 'How do I know if I need digital marketing services?',
    answer: 'If you\'re looking to increase your online visibility, drive traffic to your website, engage your audience on social media, or improve your conversion rates, digital marketing can help. Whether you\'re a small business or an established brand, digital marketing can help you reach and grow your target audience effectively.',
  },
  {
    question: 'How much do your digital marketing services cost?',
    answer: 'Our pricing depends on the scope of the services you require and your specific business goals. We offer customized packages designed to suit different budgets. To get a quote, we recommend scheduling a consultation so we can assess your needs and provide a tailored solution.',
  },
  {
    question: 'Can you help with my website\'s SEO?',
    answer: 'Absolutely! SEO is one of our core services. We\'ll optimize your website to improve its search engine rankings, making it easier for potential customers to find you online. Our SEO strategies include keyword research, on-page optimization, content creation, link building, and more.',
  },
  {
    question: 'Do you work with all types of businesses?',
    answer: 'Yes, we work with businesses of all sizes and across various industries, including retail, healthcare, real estate, education, technology, and more. We tailor our digital marketing strategies to meet the unique needs of each business.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden gradient-hero">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <GradientBlob className="w-[600px] h-[600px] bg-vibrant-orange/20 -top-40 -right-40" />
          <GradientBlob className="w-[400px] h-[400px] bg-blue-400/20 bottom-20 -left-20" />
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
        </div>
        
        <div className="relative container-custom py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <FadeInUp>
                <div className="inline-flex items-center px-4 py-2 glass rounded-full text-white/90 text-sm mb-6">
                  <span className="w-2 h-2 bg-vibrant-orange rounded-full mr-2 animate-pulse"></span>
                  Business Growth Is What We Do
                </div>
              </FadeInUp>
              
              <FadeInUp delay={0.1}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                  Business Growth
                  <span className="block mt-2">
                    <span className="gradient-text text-glow">Begins Here</span>
                  </span>
                </h1>
              </FadeInUp>
              
              <FadeInUp delay={0.2}>
                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                  Let us be your trusted partner in navigating the ever-evolving digital landscape. 
                  We help businesses unlock their full potential through innovative digital marketing strategies.
                </p>
              </FadeInUp>
              
              <FadeInUp delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="btn-primary text-center shine group">
                    <span className="flex items-center justify-center">
                      Discover More
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link href="/services" className="btn-outline text-center">
                    Our Services
                  </Link>
                </div>
              </FadeInUp>
              
              {/* Quick stats */}
              <FadeInUp delay={0.4}>
                <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
                  <div>
                    <div className="text-3xl font-bold text-white">2000+</div>
                    <div className="text-gray-400 text-sm">Companies Served</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">98%</div>
                    <div className="text-gray-400 text-sm">Satisfaction Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white">12+</div>
                    <div className="text-gray-400 text-sm">Years Experience</div>
                  </div>
                </div>
              </FadeInUp>
            </div>
            
            {/* Hero visual */}
            <div className="hidden lg:block">
              <FloatingElement y={15} duration={4}>
                <ScaleIn delay={0.3}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-vibrant-orange/30 to-blue-500/30 rounded-3xl blur-3xl"></div>
                    <div className="relative glass rounded-3xl p-8 overflow-hidden">
                      <Image
                        src="/images/hero-dashboard.png"
                        alt="Digital marketing dashboard showing business growth"
                        width={600}
                        height={450}
                        className="rounded-2xl shadow-2xl"
                        priority
                      />
                    </div>
                  </div>
                </ScaleIn>
              </FloatingElement>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container-custom">
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <motion.div 
                    className="text-center p-6 rounded-2xl hover:bg-soft-gray transition-colors"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-vibrant-orange to-orange-400 rounded-2xl flex items-center justify-center text-white">
                      <stat.icon className="w-7 h-7" />
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

      {/* About Section */}
      <section className="py-20 bg-soft-gray relative overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SlideInLeft>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-vibrant-orange/20 to-deep-blue/20 rounded-3xl blur-2xl"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/about-team.jpg"
                    alt="Global Digital Prime team working together"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                  />
                </div>
                {/* Floating stats card */}
                <motion.div 
                  className="absolute -bottom-6 -right-6 glass-white rounded-2xl p-6 shadow-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-vibrant-orange to-orange-400 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-deep-blue">60%</div>
                      <div className="text-sm text-gray-600">Growth Average</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </SlideInLeft>
            
            <SlideInRight>
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">About Global Digital Prime</span>
              <h2 className="section-title mt-2">
                Built Strong Online Presence for Over 
                <span className="gradient-text"> 2000+ Companies</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We are dedicated to helping businesses unlock their full potential in the digital world. 
                Our expert team works hand-in-hand with you to craft custom digital marketing strategies that drive growth.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-vibrant-orange" />
                  <span className="font-medium">Full-Funnel Expertise</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-vibrant-orange" />
                  <span className="font-medium">Data-Driven Results</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-vibrant-orange" />
                  <span className="font-medium">24/7 Customer Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-vibrant-orange" />
                  <span className="font-medium">Innovative & Adaptive</span>
                </div>
              </div>
              
              <Link href="/about" className="btn-secondary inline-flex items-center group">
                Learn More About Us
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-soft-gray/50 to-transparent"></div>
        
        <div className="container-custom relative">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">What We Do</span>
              <h2 className="section-title mt-2">
                We Provide All Kinds Of 
                <span className="gradient-text"> Business Growing </span>
                Services
              </h2>
              <p className="section-subtitle">
                From brand awareness to lead generation and customer nurturing, we provide a seamless digital marketing experience.
              </p>
            </div>
          </FadeInUp>
          
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <StaggerItem key={service.title}>
                  <Link href={service.href}>
                    <motion.div
                      className="card-feature group cursor-pointer h-full"
                      whileHover={{ y: -8 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                        <service.icon className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl font-bold text-deep-blue mb-3 group-hover:text-vibrant-orange transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>
                      <div className="flex items-center text-vibrant-orange font-medium text-sm">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </motion.div>
                  </Link>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 gradient-hero text-white relative overflow-hidden">
        <GradientBlob className="w-[500px] h-[500px] bg-vibrant-orange/20 top-0 left-1/4" />
        
        <div className="container-custom relative">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
                We Bring Your Business into the Spotlight
              </h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                We build long-term partnerships with our clients to drive measurable growth. 
                Here&apos;s why businesses choose us to lead their digital marketing efforts.
              </p>
            </div>
          </FadeInUp>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FadeInUp delay={0.1}>
              <div className="glass rounded-2xl p-8 h-full hover:bg-white/20 transition-colors">
                <div className="w-16 h-16 bg-vibrant-orange rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Full-Funnel Expertise</h3>
                <p className="text-gray-300 leading-relaxed">
                  Whether you&apos;re building brand awareness, generating leads, or nurturing existing customers, 
                  we provide a seamless digital marketing experience.
                </p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <div className="glass rounded-2xl p-8 h-full hover:bg-white/20 transition-colors">
                <div className="w-16 h-16 bg-vibrant-orange rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Stunning Results</h3>
                <p className="text-gray-300 leading-relaxed">
                  Our data-driven approach consistently delivers exceptional outcomes. 
                  We measure, analyze, and optimize to ensure your investment generates maximum returns.
                </p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.3}>
              <div className="glass rounded-2xl p-8 h-full hover:bg-white/20 transition-colors">
                <div className="w-16 h-16 bg-vibrant-orange rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Customer Support</h3>
                <p className="text-gray-300 leading-relaxed">
                  We&apos;re not just your agency—we&apos;re your partners. From ongoing consulting to rapid-response 
                  customer support, we&apos;re here when you need us.
                </p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Process</span>
              <h2 className="section-title mt-2">
                We Follow Simple Steps to 
                <span className="gradient-text"> Develop Projects</span>
              </h2>
              <p className="section-subtitle">
                We follow a streamlined approach to elevate your brand&apos;s global presence using data-driven insights 
                to craft a tailored plan that aligns with your business objectives.
              </p>
            </div>
          </FadeInUp>
          
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((item, index) => (
              <FadeInUp key={item.step} delay={index * 0.1}>
                <div className="relative">
                  <div className="text-8xl font-bold text-soft-gray absolute -top-4 left-0 select-none">
                    {item.step}
                  </div>
                  <div className="relative pt-12 pl-4">
                    <div className="w-12 h-1 bg-vibrant-orange mb-6"></div>
                    <h3 className="text-xl font-bold text-deep-blue mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-soft-gray relative overflow-hidden">
        <div className="container-custom">
          <FadeInUp>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
              <div>
                <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Testimonials</span>
                <h2 className="section-title mt-2">
                  GDP Trusted Customers<br />
                  <span className="gradient-text">Awesome Reviews</span>
                </h2>
              </div>
              <div className="flex items-center gap-8 mt-6 md:mt-0">
                <div className="text-center">
                  <div className="text-4xl font-bold text-deep-blue">2000+</div>
                  <div className="text-gray-600 text-sm">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-deep-blue">98%</div>
                  <div className="text-gray-600 text-sm">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </FadeInUp>
          
          <StaggerContainer staggerDelay={0.1}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow text-sm">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="font-semibold text-deep-blue">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">FAQ</span>
              <h2 className="section-title mt-2">Frequently Asked Questions</h2>
            </div>
          </FadeInUp>
          
          <div className="max-w-3xl mx-auto">
            <StaggerContainer staggerDelay={0.1}>
              {faqs.map((faq, index) => (
                <StaggerItem key={index}>
                  <details className="group mb-4">
                    <summary className="flex items-center justify-between p-6 bg-soft-gray rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                      <span className="font-semibold text-deep-blue pr-4">{faq.question}</span>
                      <span className="flex-shrink-0 w-8 h-8 bg-vibrant-orange rounded-full flex items-center justify-center text-white group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <div className="px-6 py-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 gradient-mesh"></div>
        <GradientBlob className="w-[600px] h-[600px] bg-vibrant-orange/30 top-0 right-0" />
        
        <div className="relative container-custom text-center">
          <FadeInUp>
            <span className="inline-block px-4 py-2 glass rounded-full text-white/90 text-sm mb-6">
              24/7 Support Available
            </span>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Grow Your Business?
            </h2>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Partner with us to unlock the full potential of digital marketing. 
              Let&apos;s build something extraordinary together.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-center shine group">
                <span className="flex items-center justify-center">
                  Free Consultation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/services" className="btn-outline text-center">
                View Our Services
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}
