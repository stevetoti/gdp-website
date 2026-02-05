import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Enterprise software development, AI & machine learning, cloud infrastructure, digital transformation, cybersecurity, and data analytics services by Global Digital Prime.',
}

const services = [
  {
    id: 'enterprise-software',
    title: 'Enterprise Software Development',
    description: 'We design and build mission-critical software systems that power large organizations. From legacy modernization to greenfield development, our engineering teams deliver robust, scalable solutions that integrate seamlessly with your existing infrastructure.',
    features: [
      'Custom ERP and CRM systems',
      'Microservices architecture design',
      'Legacy system modernization',
      'High-availability distributed systems',
      'Enterprise integration platforms',
      'Real-time data processing pipelines',
    ],
    image: '/images/enterprise-software.jpg',
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Harness the power of artificial intelligence to automate complex processes, predict outcomes, and unlock insights hidden in your data. Our AI engineers build production-ready models that deliver measurable business impact.',
    features: [
      'Natural language processing (NLP)',
      'Computer vision systems',
      'Predictive analytics models',
      'Recommendation engines',
      'Automated decision systems',
      'AI-powered chatbots and virtual assistants',
    ],
    image: '/images/ai-technology.jpg',
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    description: 'Build, migrate, and optimize your cloud infrastructure for peak performance and cost efficiency. We partner with leading cloud providers to architect solutions that scale with your business demands.',
    features: [
      'Cloud migration strategies',
      'Multi-cloud and hybrid architectures',
      'Infrastructure as Code (IaC)',
      'Container orchestration with Kubernetes',
      'Serverless application development',
      'Cloud cost optimization',
    ],
    image: '/images/data-center.jpg',
  },
  {
    id: 'digital-transformation',
    title: 'Digital Transformation',
    description: 'Reimagine your business processes, customer experiences, and operational models for the digital era. We guide organizations through comprehensive transformation journeys that create lasting competitive advantages.',
    features: [
      'Digital strategy and roadmap development',
      'Process automation and optimization',
      'Customer experience redesign',
      'Change management consulting',
      'Digital workplace solutions',
      'Innovation lab and prototyping',
    ],
    image: '/images/digital-transformation.jpg',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Protect your digital assets with comprehensive security solutions that address the evolving threat landscape. Our security experts implement defense-in-depth strategies tailored to your risk profile and compliance requirements.',
    features: [
      'Security architecture design',
      'Penetration testing and vulnerability assessments',
      'Security Operations Center (SOC) setup',
      'Identity and access management',
      'Compliance and regulatory frameworks',
      'Incident response planning',
    ],
    image: '/images/cybersecurity.jpg',
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Transform raw data into strategic business intelligence. Our data engineering and analytics teams build platforms that enable data-driven decision making at every level of your organization.',
    features: [
      'Data warehouse and lake architecture',
      'Business intelligence dashboards',
      'ETL pipeline development',
      'Real-time analytics platforms',
      'Data governance frameworks',
      'Advanced statistical modeling',
    ],
    image: '/images/data-analytics.jpg',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-deep-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #EF5E33 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="relative container-custom text-center">
          <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Enterprise-Grade Digital Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From AI-powered automation to bulletproof cybersecurity, we deliver the full spectrum of technology services that modern enterprises demand.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container-custom space-y-24">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <h2 className="text-3xl font-bold text-deep-blue mb-4">{service.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">{service.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start space-x-2">
                      <svg className="w-5 h-5 text-vibrant-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="btn-primary inline-block mt-8">
                  Discuss This Service
                </Link>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-[350px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-soft-gray">
        <div className="container-custom text-center">
          <h2 className="section-title">Need a Custom Solution?</h2>
          <p className="section-subtitle mb-8">
            Every organization is unique. Let us design a service package tailored specifically to your business goals and technical requirements.
          </p>
          <Link href="/contact" className="btn-primary">
            Get a Custom Quote
          </Link>
        </div>
      </section>
    </>
  )
}
