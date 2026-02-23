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
    icon: MapPin,
    title: 'Visit Us',
    description: 'Come say hello at our HQ.',
    value: 'New York, NY, United States',
    href: '#'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: 'We\'re here when you need us.',
    value: 'Mon-Fri, 9am - 6pm EST',
    href: '#'
  },
]

const offices = [
  {
    city: 'New York',
    country: 'United States',
    address: 'Financial District, NYC',
    timezone: 'EST (UTC-5)',
    flag: '🇺🇸'
  },
  {
    city: 'Jakarta',
    country: 'Indonesia',
    address: 'Sudirman, Jakarta',
    timezone: 'WIB (UTC+7)',
    flag: '🇮🇩'
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
                Have a project in mind? We&apos;d love to hear about it. 
                Get in touch and let&apos;s discuss how we can help transform your business.
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

      {/* Contact Form & Info */}
      <section className="py-24 bg-soft-gray">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <SlideInLeft>
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm">
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
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all"
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
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all"
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all"
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
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your project *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all resize-none"
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
                <h2 className="text-3xl font-bold text-deep-blue mb-6">Global Presence</h2>
                <p className="text-gray-600 text-lg mb-10 leading-relaxed">
                  With offices across multiple continents, we&apos;re positioned to serve clients 
                  wherever they are, providing local expertise with global capabilities.
                </p>
                
                <div className="space-y-6 mb-10">
                  {offices.map((office) => (
                    <div key={office.city} className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl">{office.flag}</span>
                        <div>
                          <h3 className="text-xl font-bold text-deep-blue">{office.city}</h3>
                          <p className="text-gray-500">{office.country}</p>
                          <p className="text-gray-600 mt-2">{office.address}</p>
                          <p className="text-sm text-vibrant-orange mt-1">{office.timezone}</p>
                        </div>
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
                      <h4 className="font-semibold mb-1">Do you offer ongoing support?</h4>
                      <p className="text-gray-300 text-sm">
                        Yes! We offer flexible support packages including 24/7 monitoring, 
                        maintenance, and continuous improvement.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Can you work with our existing team?</h4>
                      <p className="text-gray-300 text-sm">
                        Absolutely. We can augment your team, work collaboratively, 
                        or handle projects end-to-end.
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
      <section className="py-24 bg-white">
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
