import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Global Digital Prime serves Finance & Banking, Healthcare, Government, E-Commerce, Manufacturing, and Education sectors with enterprise digital solutions.',
}

const industries = [
  {
    id: 'finance',
    title: 'Finance & Banking',
    icon: '🏦',
    description: 'Modernize financial services with secure, compliant, and innovative technology solutions. From core banking platforms to fraud detection systems, we help financial institutions stay competitive in the digital economy.',
    capabilities: [
      'Core banking system modernization',
      'AI-powered fraud detection and prevention',
      'Regulatory compliance automation (KYC, AML)',
      'Digital payment and fintech platforms',
      'Risk management and analytics',
      'Mobile banking applications',
    ],
    image: '/images/finance-banking.jpg',
    stat: { number: '40+', label: 'Financial institutions served' },
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    icon: '🏥',
    description: 'Transform healthcare delivery with technology that improves patient outcomes, streamlines operations, and ensures regulatory compliance. Our solutions connect care providers, patients, and data securely.',
    capabilities: [
      'Electronic Health Record (EHR) systems',
      'Telemedicine and remote care platforms',
      'Healthcare data analytics',
      'HIPAA-compliant cloud infrastructure',
      'Medical device integration',
      'Patient engagement portals',
    ],
    image: '/images/healthcare.jpg',
    stat: { number: '25+', label: 'Healthcare projects delivered' },
  },
  {
    id: 'government',
    title: 'Government',
    icon: '🏛️',
    description: 'Enable digital government through citizen-centric platforms, data-driven policy tools, and secure infrastructure. We partner with government agencies to deliver transparent, efficient, and accessible public services.',
    capabilities: [
      'E-government and citizen service portals',
      'Government data analytics platforms',
      'Secure document management systems',
      'Inter-agency integration solutions',
      'Digital identity and authentication',
      'Smart city infrastructure',
    ],
    image: '/images/government.jpg',
    stat: { number: '15+', label: 'Government agencies supported' },
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce',
    icon: '🛒',
    description: 'Build powerful e-commerce experiences that drive conversions, customer loyalty, and revenue growth. From marketplace platforms to personalization engines, we deliver solutions that scale with demand.',
    capabilities: [
      'Custom marketplace development',
      'AI-powered recommendation engines',
      'Inventory and supply chain optimization',
      'Payment gateway integrations',
      'Omnichannel commerce platforms',
      'Performance optimization for high traffic',
    ],
    image: '/images/ecommerce.jpg',
    stat: { number: '$2B+', label: 'Transaction volume processed' },
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    icon: '🏭',
    description: 'Digitize manufacturing operations with IoT, predictive maintenance, and smart factory solutions. Our technology helps manufacturers optimize production, reduce waste, and improve quality control.',
    capabilities: [
      'IoT sensor integration and monitoring',
      'Predictive maintenance systems',
      'Supply chain digital twins',
      'Quality assurance automation',
      'Production planning optimization',
      'Industrial data analytics',
    ],
    image: '/images/manufacturing.jpg',
    stat: { number: '30%', label: 'Average efficiency improvement' },
  },
  {
    id: 'education',
    title: 'Education',
    icon: '🎓',
    description: 'Transform learning experiences with technology that engages students, empowers educators, and streamlines administration. Our edtech solutions serve institutions from K-12 to higher education and corporate training.',
    capabilities: [
      'Learning Management Systems (LMS)',
      'Virtual classroom platforms',
      'AI-powered adaptive learning',
      'Student information systems',
      'Assessment and analytics tools',
      'Content delivery networks',
    ],
    image: '/images/education.jpg',
    stat: { number: '1M+', label: 'Learners impacted' },
  },
]

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-deep-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 75% 75%, #EF5E33 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="relative container-custom text-center">
          <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Industries We Serve</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Domain Expertise That Drives Results
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We bring deep industry knowledge to every engagement, understanding the unique challenges, regulations, and opportunities in your sector.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="container-custom space-y-20">
          {industries.map((industry, index) => (
            <div
              key={industry.id}
              id={industry.id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? '' : ''}`}>
                <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-6 left-6 bg-deep-blue/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl">
                    <div className="text-2xl font-bold">{industry.stat.number}</div>
                    <div className="text-sm text-gray-300">{industry.stat.label}</div>
                  </div>
                </div>
                <div className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h2 className="text-2xl font-bold text-deep-blue mb-4">{industry.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{industry.description}</p>
                  <div className="space-y-3 mb-8">
                    {industry.capabilities.map((cap) => (
                      <div key={cap} className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-vibrant-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700 text-sm">{cap}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contact" className="btn-primary inline-block">
                    Discuss Your Project
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-deep-blue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your Industry Not Listed?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Our expertise extends beyond these sectors. Tell us about your industry and challenges, and we will design a solution that fits.
          </p>
          <Link href="/contact" className="btn-primary">
            Tell Us About Your Industry
          </Link>
        </div>
      </section>
    </>
  )
}
