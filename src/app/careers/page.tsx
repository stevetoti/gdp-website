import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Global Digital Prime — explore career opportunities in enterprise software, AI, cloud computing, and digital transformation across the US and Indonesia.',
}

const benefits = [
  { icon: '🌍', title: 'Remote-First Culture', description: 'Work from anywhere with flexible hours that fit your lifestyle.' },
  { icon: '📈', title: 'Growth & Learning', description: 'Annual learning budget, conferences, and internal mentorship programs.' },
  { icon: '🏥', title: 'Health & Wellness', description: 'Comprehensive health insurance, mental health support, and gym allowance.' },
  { icon: '✈️', title: 'Travel Opportunities', description: 'Regular cross-office visits between New York and Jakarta.' },
  { icon: '💰', title: 'Competitive Pay', description: 'Top-of-market compensation with equity options for senior roles.' },
  { icon: '🎯', title: 'Impact Projects', description: 'Work on enterprise projects that serve millions of users globally.' },
]

const openings = [
  {
    title: 'Senior Full-Stack Engineer',
    location: 'New York / Remote',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Build and maintain enterprise-grade web applications using React, Node.js, and cloud services.',
  },
  {
    title: 'AI/ML Engineer',
    location: 'Jakarta / Remote',
    type: 'Full-time',
    department: 'AI & Data',
    description: 'Design and deploy machine learning models for fraud detection, NLP, and predictive analytics.',
  },
  {
    title: 'Cloud Solutions Architect',
    location: 'New York',
    type: 'Full-time',
    department: 'Cloud & Infrastructure',
    description: 'Architect multi-cloud solutions for enterprise clients migrating to AWS, Azure, or GCP.',
  },
  {
    title: 'Product Designer (UX/UI)',
    location: 'Jakarta / Remote',
    type: 'Full-time',
    department: 'Design',
    description: 'Create beautiful, intuitive interfaces for enterprise SaaS platforms and mobile applications.',
  },
  {
    title: 'DevOps Engineer',
    location: 'Jakarta',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Build and manage CI/CD pipelines, Kubernetes clusters, and infrastructure automation.',
  },
  {
    title: 'Cybersecurity Analyst',
    location: 'New York / Remote',
    type: 'Full-time',
    department: 'Security',
    description: 'Conduct security assessments, penetration testing, and incident response for enterprise clients.',
  },
  {
    title: 'Business Development Manager',
    location: 'New York',
    type: 'Full-time',
    department: 'Sales',
    description: 'Drive new business opportunities in the enterprise segment across North America.',
  },
  {
    title: 'Technical Project Manager',
    location: 'Jakarta / Remote',
    type: 'Full-time',
    department: 'Project Management',
    description: 'Lead cross-functional teams to deliver complex software projects on time and budget.',
  },
]

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-deep-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #EF5E33 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="relative container-custom text-center">
          <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Careers</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Build the Future With Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join a team of talented professionals transforming enterprises across two continents. Your next chapter starts here.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Why Join GDP</span>
            <h2 className="section-title mt-2">Benefits & Perks</h2>
            <p className="section-subtitle">
              We invest in our people because great work comes from great teams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-soft-gray rounded-2xl p-8 card-hover">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-deep-blue mb-2">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-soft-gray">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Open Positions</span>
            <h2 className="section-title mt-2">Current Openings</h2>
            <p className="section-subtitle">
              Explore roles across engineering, design, security, and business development.
            </p>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {openings.map((job) => (
              <div key={job.title} className="bg-white rounded-2xl p-6 md:p-8 card-hover group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-deep-blue group-hover:text-vibrant-orange transition-colors">
                        {job.title}
                      </h3>
                      <span className="px-3 py-1 bg-light-blue text-deep-blue text-xs font-medium rounded-full">
                        {job.department}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{job.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{job.type}</span>
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="btn-primary text-sm whitespace-nowrap"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-deep-blue text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don&apos;t See Your Role?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            We&apos;re always looking for exceptional talent. Send us your resume and tell us how you can contribute.
          </p>
          <Link href="/contact" className="btn-primary">
            Send Your Resume
          </Link>
        </div>
      </section>
    </>
  )
}
