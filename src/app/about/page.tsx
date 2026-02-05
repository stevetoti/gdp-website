import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Global Digital Prime — an international digital solutions company serving the United States and Indonesia with enterprise-grade technology services.',
}

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: 'Innovation First',
    description: 'We push the boundaries of what technology can achieve, constantly exploring emerging solutions to give our clients a competitive edge.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Security & Trust',
    description: 'Every solution we deliver is built with security at its core. We protect our clients\' data and digital assets with the highest standards.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Global Perspective',
    description: 'With teams across two continents, we bring diverse perspectives and cultural understanding to every project we undertake.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Client Partnership',
    description: 'We don\'t just deliver projects — we build lasting partnerships. Your success is our success, and we invest deeply in every relationship.',
  },
]

const leadership = [
  {
    name: 'Stephen Toti',
    role: 'Founder & CEO',
    bio: 'Visionary entrepreneur with a passion for leveraging technology to transform businesses across emerging and established markets.',
  },
  {
    name: 'David Park',
    role: 'Chief Technology Officer',
    bio: 'Former enterprise architect at Fortune 500 companies, leading our technical strategy and innovation initiatives.',
  },
  {
    name: 'Ayu Pratiwi',
    role: 'VP of Engineering, Jakarta',
    bio: 'Leading our Southeast Asian engineering hub with 15+ years of experience in large-scale software delivery.',
  },
  {
    name: 'Rachel Anderson',
    role: 'VP of Client Success',
    bio: 'Ensuring every client engagement delivers measurable value with her background in management consulting.',
  },
]

const milestones = [
  { year: '2013', event: 'Founded in New York with a focus on enterprise software development' },
  { year: '2015', event: 'Expanded operations to Jakarta, Indonesia' },
  { year: '2017', event: 'Launched AI & Machine Learning practice' },
  { year: '2019', event: 'Reached 100+ enterprise clients milestone' },
  { year: '2021', event: 'Established cybersecurity and cloud infrastructure divisions' },
  { year: '2023', event: 'Joined the Global Digital Network with partners across 4 countries' },
  { year: '2025', event: 'Serving 150+ clients with a team of 200+ professionals' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-deep-blue text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #EF5E33 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="relative container-custom text-center">
          <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Building the Digital Future,<br />Together
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Global Digital Prime is an international digital solutions company delivering enterprise-grade technology services across the United States and Indonesia.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mt-2 mb-6">
                From Vision to Global Impact
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded with the belief that world-class technology should be accessible to businesses everywhere, Global Digital Prime bridges the innovation ecosystems of the United States and Southeast Asia.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our dual-continent presence gives us a unique advantage: the strategic consulting depth of the US market combined with the engineering excellence of Indonesia&apos;s thriving tech ecosystem.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we serve 150+ enterprise clients across six industries, with a team of 200+ professionals delivering solutions that transform how organizations operate, compete, and grow.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/images/about-team.jpg"
                alt="Global Digital Prime team collaboration"
                width={600}
                height={400}
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-vibrant-orange text-white p-6 rounded-2xl shadow-lg">
                <div className="text-3xl font-bold">12+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-soft-gray">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="section-title mt-2">What Drives Us</h2>
            <p className="section-subtitle">
              Our core values guide every decision, every project, and every interaction with our clients and partners.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 card-hover text-center">
                <div className="w-16 h-16 bg-light-blue rounded-2xl flex items-center justify-center text-deep-blue mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-deep-blue mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Leadership</span>
            <h2 className="section-title mt-2">Meet Our Team</h2>
            <p className="section-subtitle">
              Experienced leaders driving innovation and excellence across our global operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person) => (
              <div key={person.name} className="bg-soft-gray rounded-2xl p-8 text-center card-hover">
                <div className="w-20 h-20 bg-deep-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-lg font-bold text-deep-blue mb-1">{person.name}</h3>
                <p className="text-vibrant-orange text-sm font-medium mb-3">{person.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-deep-blue text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Milestones</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex items-start space-x-6 mb-8 last:mb-0">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-vibrant-orange font-bold text-lg">{milestone.year}</span>
                </div>
                <div className="relative flex-shrink-0">
                  <div className="w-4 h-4 bg-vibrant-orange rounded-full mt-1"></div>
                  {index < milestones.length - 1 && (
                    <div className="absolute top-5 left-1.5 w-0.5 h-12 bg-white/20"></div>
                  )}
                </div>
                <p className="text-gray-300 leading-relaxed">{milestone.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-soft-gray">
        <div className="container-custom text-center">
          <h2 className="section-title">Want to Join Our Story?</h2>
          <p className="section-subtitle mb-8">
            Whether as a client or a team member, there&apos;s a place for you in our journey to transform the digital landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary text-center">
              Start a Project
            </Link>
            <Link href="/careers" className="btn-secondary text-center">
              View Careers
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
