import Link from 'next/link'
import Image from 'next/image'

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Enterprise Software',
    description: 'Custom-built enterprise applications designed to scale with your business operations and drive efficiency.',
    href: '/services#enterprise-software',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions that leverage artificial intelligence to automate processes and generate insights.',
    href: '/services#ai-ml',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    title: 'Cloud Infrastructure',
    description: 'Scalable, secure cloud solutions that provide the foundation for your digital operations worldwide.',
    href: '/services#cloud',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Digital Transformation',
    description: 'End-to-end transformation strategies that modernize your business for the digital age.',
    href: '/services#digital-transformation',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Cybersecurity',
    description: 'Comprehensive security solutions to protect your digital assets from evolving threats.',
    href: '/services#cybersecurity',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Data Analytics',
    description: 'Transform raw data into actionable business intelligence with advanced analytics platforms.',
    href: '/services#data-analytics',
  },
]

const industries = [
  { name: 'Finance & Banking', icon: '🏦' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Government', icon: '🏛️' },
  { name: 'E-Commerce', icon: '🛒' },
  { name: 'Manufacturing', icon: '🏭' },
  { name: 'Education', icon: '🎓' },
]

const stats = [
  { number: '150+', label: 'Enterprise Clients' },
  { number: '12+', label: 'Years Experience' },
  { number: '2', label: 'Global Offices' },
  { number: '98%', label: 'Client Satisfaction' },
]

const testimonials = [
  {
    quote: 'Global Digital Prime transformed our entire banking infrastructure. Their AI-driven fraud detection system reduced our losses by 40% in the first quarter alone.',
    author: 'Michael Chen',
    role: 'CTO, Pacific Financial Group',
    company: 'Finance',
  },
  {
    quote: 'The cloud migration was seamless. GDP handled our 500-server infrastructure with zero downtime, and we saw a 60% reduction in operational costs.',
    author: 'Sarah Williams',
    role: 'VP of Engineering, MediCare Solutions',
    company: 'Healthcare',
  },
  {
    quote: 'Their team in Jakarta delivered an e-government platform that serves 50 million citizens. The quality and dedication were beyond our expectations.',
    author: 'Bambang Suryanto',
    role: 'Director of Digital Services, Ministry of Digital Affairs',
    company: 'Government',
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-skyline.jpg"
            alt="Modern city skyline representing global enterprise solutions"
            fill
            className="object-cover"
            priority
          />
          <div className="gradient-overlay"></div>
        </div>
        <div className="relative container-custom py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm mb-6 border border-white/20">
              <span className="w-2 h-2 bg-vibrant-orange rounded-full mr-2 animate-pulse"></span>
              Serving the United States &amp; Indonesia
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Transforming Business
              <span className="block text-vibrant-orange">Through Technology</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Enterprise-grade digital solutions that drive innovation, accelerate growth, and position your organization at the forefront of the digital economy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary text-center">
                Start Your Project
              </Link>
              <Link href="/solutions" className="btn-outline text-center">
                Explore Solutions
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-deep-blue mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-soft-gray">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">What We Do</span>
            <h2 className="section-title mt-2">Enterprise-Grade Services</h2>
            <p className="section-subtitle">
              Comprehensive digital solutions designed for organizations that demand excellence, security, and scalability.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="bg-white rounded-2xl p-8 card-hover group"
              >
                <div className="w-14 h-14 bg-light-blue rounded-xl flex items-center justify-center text-deep-blue group-hover:bg-vibrant-orange group-hover:text-white transition-colors mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-deep-blue mb-3 group-hover:text-vibrant-orange transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                <div className="mt-4 flex items-center text-vibrant-orange font-medium text-sm">
                  Learn More
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-20 bg-deep-blue text-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Global Presence</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Two Continents, One Mission
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                With offices in New York and Jakarta, we bridge the gap between Western innovation and Southeast Asian dynamism. Our teams work across time zones to deliver solutions that meet the highest international standards.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
                    🇺🇸
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">United States</h4>
                    <p className="text-gray-400">Strategic headquarters in New York. Enterprise sales, solution architecture, and executive consulting for the North American market.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl">
                    🇮🇩
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Indonesia</h4>
                    <p className="text-gray-400">Engineering hub in Jakarta. Software development, QA, data science, and regional operations for the Southeast Asian market.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/global-map.jpg"
                alt="Global operations spanning United States and Indonesia"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
              {/* Pulse markers */}
              <div className="absolute top-[35%] left-[22%] w-4 h-4">
                <div className="w-4 h-4 bg-vibrant-orange rounded-full animate-ping"></div>
                <div className="absolute inset-0 w-4 h-4 bg-vibrant-orange rounded-full"></div>
              </div>
              <div className="absolute top-[55%] left-[78%] w-4 h-4">
                <div className="w-4 h-4 bg-vibrant-orange rounded-full animate-ping"></div>
                <div className="absolute inset-0 w-4 h-4 bg-vibrant-orange rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Industries We Serve</span>
            <h2 className="section-title mt-2">Domain Expertise Across Sectors</h2>
            <p className="section-subtitle">
              Deep industry knowledge enables us to deliver solutions that address your specific challenges and regulatory requirements.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industries.map((industry) => (
              <Link
                key={industry.name}
                href={`/industries#${industry.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="bg-soft-gray rounded-2xl p-6 text-center card-hover group"
              >
                <div className="text-4xl mb-3">{industry.icon}</div>
                <h3 className="font-semibold text-deep-blue text-sm group-hover:text-vibrant-orange transition-colors">
                  {industry.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-soft-gray">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Client Success</span>
            <h2 className="section-title mt-2">Trusted by Industry Leaders</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-semibold text-deep-blue">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/team-meeting.jpg"
            alt="Professional team collaborating on enterprise solutions"
            fill
            className="object-cover"
          />
          <div className="gradient-overlay"></div>
        </div>
        <div className="relative container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Partner with us to unlock the full potential of digital technology. Let&apos;s build something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-center">
              Schedule a Consultation
            </Link>
            <Link href="/solutions" className="btn-outline text-center">
              View Our Solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
