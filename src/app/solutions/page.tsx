import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Custom software, SaaS platforms, mobile apps, API development, and business intelligence solutions by Global Digital Prime.',
}

const solutions = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description: 'Tailor-made software solutions designed specifically for your unique business requirements. We build from the ground up, ensuring every feature aligns with your operational goals.',
    benefits: [
      'Full ownership of source code and IP',
      'Designed for your specific workflows',
      'Scalable architecture from day one',
      'Ongoing support and maintenance',
    ],
    image: '/images/solutions/custom-software.jpg',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'saas',
    title: 'SaaS Platform Development',
    description: 'Build multi-tenant SaaS platforms that scale to millions of users. We handle everything from architecture to subscription management and analytics.',
    benefits: [
      'Multi-tenant architecture design',
      'Subscription and billing integration',
      'Usage analytics and dashboards',
      'Auto-scaling infrastructure',
    ],
    image: '/images/solutions/saas-platform.jpg',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android devices.',
    benefits: [
      'Native iOS and Android development',
      'Cross-platform with React Native or Flutter',
      'Offline-first capabilities',
      'App store optimization and launch',
    ],
    image: '/images/solutions/mobile-app.jpg',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'api',
    title: 'API Development & Integration',
    description: 'Robust API architectures that connect your systems, partners, and customers. We design APIs that are secure, well-documented, and developer-friendly.',
    benefits: [
      'RESTful and GraphQL API design',
      'Third-party integration services',
      'API gateway and management',
      'Comprehensive documentation',
    ],
    image: '/images/solutions/api-integration.jpg',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'bi',
    title: 'Business Intelligence',
    description: 'Turn your data into actionable insights with custom BI dashboards, data warehousing, and predictive analytics platforms.',
    benefits: [
      'Custom executive dashboards',
      'Real-time data visualization',
      'Predictive modeling and forecasting',
      'Data warehouse architecture',
    ],
    image: '/images/solutions/business-intelligence.jpg',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

const process_steps = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    description: 'We begin with deep-dive workshops to understand your business goals, challenges, and technical landscape.',
  },
  {
    step: '02',
    title: 'Architecture & Design',
    description: 'Our architects design a robust, scalable solution with clear technical specifications and UX wireframes.',
  },
  {
    step: '03',
    title: 'Agile Development',
    description: 'We build in iterative sprints, delivering working features every two weeks with continuous client feedback.',
  },
  {
    step: '04',
    title: 'Quality Assurance',
    description: 'Rigorous testing including automated tests, security audits, and performance benchmarking.',
  },
  {
    step: '05',
    title: 'Launch & Scale',
    description: 'Zero-downtime deployment with monitoring, alerting, and ongoing optimization support.',
  },
]

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-deep-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, #EF5E33 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="relative container-custom text-center">
          <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Solutions</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Technology Solutions That Scale
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From custom software to enterprise platforms, we deliver solutions that drive measurable business outcomes.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="space-y-24">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                id={solution.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="w-16 h-16 bg-light-blue rounded-2xl flex items-center justify-center text-deep-blue mb-6">
                    {solution.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-deep-blue mb-4">{solution.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{solution.description}</p>
                  <ul className="space-y-3 mb-8">
                    {solution.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-vibrant-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary inline-block">
                    Get Started
                  </Link>
                </div>
                <div className={`relative overflow-hidden rounded-2xl shadow-xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-deep-blue/30 to-transparent"></div>
                    {/* Icon badge */}
                    <div className="absolute bottom-4 right-4 w-14 h-14 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-vibrant-orange shadow-lg">
                      {solution.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-soft-gray">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="section-title mt-2">How We Deliver</h2>
            <p className="section-subtitle">
              A proven methodology that ensures on-time, on-budget delivery with full transparency at every stage.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {process_steps.map((step, index) => (
              <div key={step.step} className="relative text-center">
                <div className="text-5xl font-bold text-vibrant-orange/20 mb-4">{step.step}</div>
                <h3 className="text-lg font-bold text-deep-blue mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                {index < process_steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/office-modern.jpg"
            alt="Modern office workspace"
            fill
            className="object-cover"
          />
          <div className="gradient-overlay"></div>
        </div>
        <div className="relative container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Let&apos;s Build Your Solution
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Every great product starts with a conversation. Tell us about your vision and we&apos;ll show you how to make it reality.
          </p>
          <Link href="/contact" className="btn-primary">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
