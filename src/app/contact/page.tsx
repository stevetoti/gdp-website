'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FadeInUp, SlideInLeft, SlideInRight } from '@/components/animations'
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Phone,
  Building2,
  Globe
} from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Our team typically responds within 24 hours.',
    value: 'hello@globaldigitalprime.com',
    href: 'mailto:hello@globaldigitalprime.com'
  },
  {
    icon: Globe,
    title: 'Global Presence',
    description: 'Offices in USA and Indonesia.',
    value: 'New York • Jakarta',
    href: '#offices'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: 'We\'re here when you need us.',
    value: '24/7 Global Coverage',
    href: '#'
  },
]

const offices = [
  {
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    address: 'Financial District',
    addressLine2: 'New York, NY 10004',
    phone: '+1 (555) 123-4567',
    email: 'usa@globaldigitalprime.com',
    timezone: 'EST (UTC-5)',
    hours: 'Mon-Fri, 9am - 6pm EST',
    image: '/images/usa-office.jpg',
    highlight: 'Headquarters'
  },
  {
    city: 'Jakarta',
    country: 'Indonesia',
    flag: '🇮🇩',
    address: 'Sudirman Central Business District',
    addressLine2: 'Jakarta 12190, Indonesia',
    phone: '+62 21 555 1234',
    email: 'indonesia@globaldigitalprime.com',
    timezone: 'WIB (UTC+7)',
    hours: 'Mon-Fri, 9am - 6pm WIB',
    image: '/images/jakarta-office.jpg',
    highlight: 'APAC Hub'
  },
]

const services = [
  'Custom Software Development',
  'AI & Machine Learning',
  'Cloud Architecture',
  'Mobile App Development',
  'Digital Transformation',
  'Enterprise Integration',
  'Other'
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    preferredOffice: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue via-dark-navy to-[#0a1628]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <motion.div 
            className="absolute top-20 right-20 w-[500px] h-[500px] bg-vibrant-orange/20 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>
        
        <div className="container-custom relative">
          <FadeInUp>
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-vibrant-orange text-sm font-medium mb-6">
                <MessageSquare className="w-4 h-4 mr-2" />
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Let&apos;s Build Something
                <span className="gradient-text"> Amazing Together</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Have a project in mind? With offices in the USA and Indonesia, we&apos;re ready to serve you 
                across time zones. Get in touch and let&apos;s discuss how we can transform your business.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white relative z-10 -mt-16">
        <div className="container-custom">
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {contactMethods.map((method) => (
                <a 
                  key={method.title}
                  href={method.href}
                  className="group p-6 rounded-2xl hover:bg-soft-gray transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-vibrant-orange to-orange-400 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <method.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-deep-blue mb-2">{method.title}</h3>
                  <p className="text-gray-500 text-sm mb-2">{method.description}</p>
                  <p className="text-vibrant-orange font-medium">{method.value}</p>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Locations - Prominent Section */}
      <section id="offices" className="py-24 bg-soft-gray">
        <div className="container-custom">
          <FadeInUp>
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-vibrant-orange/10 text-vibrant-orange text-sm font-medium mb-4">
                <Building2 className="w-4 h-4 mr-2" />
                Our Offices
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">
                Two Offices, One Mission
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Global Digital Prime operates from both the United States and Indonesia, 
                providing seamless service across the Americas and Asia-Pacific regions.
              </p>
            </div>
          </FadeInUp>

          <div className="grid lg:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* Office Header */}
                <div className="bg-gradient-to-r from-deep-blue to-dark-navy p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{office.flag}</span>
                      <div>
                        <span className="bg-vibrant-orange/20 text-vibrant-orange px-3 py-1 rounded-full text-xs font-semibold">
                          {office.highlight}
                        </span>
                        <h3 className="text-2xl font-bold mt-2">{office.city}</h3>
                        <p className="text-gray-300">{office.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Details */}
                <div className="p-8 space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-vibrant-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-vibrant-orange" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-blue mb-1">Address</h4>
                      <p className="text-gray-600">{office.address}</p>
                      <p className="text-gray-600">{office.addressLine2}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-vibrant-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-vibrant-orange" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-blue mb-1">Phone</h4>
                      <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="text-gray-600 hover:text-vibrant-orange transition-colors">
                        {office.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-vibrant-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-vibrant-orange" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-blue mb-1">Email</h4>
                      <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-vibrant-orange transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-vibrant-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-vibrant-orange" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-deep-blue mb-1">Business Hours</h4>
                      <p className="text-gray-600">{office.hours}</p>
                      <p className="text-sm text-vibrant-orange mt-1">{office.timezone}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Global Coverage Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-deep-blue text-white px-6 py-3 rounded-full">
              <Globe className="w-5 h-5" />
              <span>Combined 24-hour coverage across EST and WIB time zones</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <SlideInLeft>
              <div className="bg-soft-gray rounded-3xl p-8 md:p-10">
                <h2 className="text-3xl font-bold text-deep-blue mb-2">Start a Project</h2>
                <p className="text-gray-600 mb-8">Fill out the form and we&apos;ll get back to you within 24 hours.</p>
                
                {isSubmitted ? (
                  <motion.div 
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-deep-blue mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-vibrant-orange font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all bg-white"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all bg-white"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Work Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all bg-white"
                        placeholder="john@company.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all bg-white"
                        placeholder="Your Company"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all bg-white"
                        >
                          <option value="">Select a service</option>
                          {services.map(service => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all bg-white"
                        >
                          <option value="">Select budget</option>
                          <option value="<25k">Less than $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="50k-100k">$50,000 - $100,000</option>
                          <option value="100k-250k">$100,000 - $250,000</option>
                          <option value=">250k">More than $250,000</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Office</label>
                      <select
                        name="preferredOffice"
                        value={formData.preferredOffice}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all bg-white"
                      >
                        <option value="">No preference</option>
                        <option value="usa">🇺🇸 New York, USA</option>
                        <option value="indonesia">🇮🇩 Jakarta, Indonesia</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your project *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all resize-none bg-white"
                        placeholder="Describe your project, goals, timeline, and any specific requirements..."
                      />
                    </div>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </SlideInLeft>
            
            {/* Info */}
            <SlideInRight>
              <div className="lg:pl-8">
                <h2 className="text-3xl font-bold text-deep-blue mb-6">Why Choose GDP?</h2>
                <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                  With offices in both the United States and Indonesia, we provide true global coverage 
                  with local expertise. Our teams work across time zones to ensure your projects move 
                  forward around the clock.
                </p>
                
                {/* Benefits */}
                <div className="space-y-4 mb-10">
                  {[
                    { title: 'Global Reach, Local Expertise', desc: 'Teams in USA and Indonesia understand regional markets' },
                    { title: '24-Hour Development Cycle', desc: 'Work continues across time zones for faster delivery' },
                    { title: 'Cost-Effective Solutions', desc: 'Leverage optimal resource allocation across regions' },
                    { title: 'Seamless Communication', desc: 'English-fluent teams in both locations' },
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-vibrant-orange/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-vibrant-orange" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-deep-blue">{benefit.title}</h4>
                        <p className="text-gray-600 text-sm">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* FAQ */}
                <div className="bg-deep-blue rounded-3xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1">What&apos;s your typical project timeline?</h4>
                      <p className="text-gray-300 text-sm">
                        Timelines vary by project scope. Simple projects take 4-8 weeks, 
                        while enterprise solutions may take 3-6 months.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Which office will handle my project?</h4>
                      <p className="text-gray-300 text-sm">
                        Projects are assigned based on your preference, time zone, and 
                        the expertise required. Many projects involve both teams.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Do you offer ongoing support?</h4>
                      <p className="text-gray-300 text-sm">
                        Yes! We offer flexible support packages including 24/7 monitoring, 
                        maintenance, and continuous improvement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-soft-gray">
        <div className="container-custom text-center">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">
              Prefer to talk first?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Schedule a free 30-minute consultation call with one of our experts.
            </p>
            <Link href="/get-started" className="btn-secondary inline-flex items-center group">
              Schedule a Call
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}
