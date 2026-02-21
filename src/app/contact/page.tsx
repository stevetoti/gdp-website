'use client'

import { useState } from 'react'
import { 
  FadeInUp, 
  SlideInLeft, 
  SlideInRight,
  GradientBlob 
} from '@/components/animations'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Calendar
} from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['New York, USA', 'Jakarta, Indonesia'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (234) 567-890', '+62 21 1234 5678'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@globaldigitalprime.com', 'support@globaldigitalprime.com'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Weekend: By Appointment'],
  },
]

const services = [
  'Website Design',
  'Video Production',
  'Email Marketing',
  'SEO Strategies',
  'PPC Advertising',
  'Social Media Marketing',
  'Other',
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
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

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden gradient-hero">
        <GradientBlob className="w-[600px] h-[600px] bg-vibrant-orange/20 -top-40 -right-40" />
        
        <div className="container-custom relative">
          <FadeInUp>
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 glass rounded-full text-white/90 text-sm mb-6">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Let&apos;s Start a
                <span className="block gradient-text text-glow mt-2">Conversation</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Ready to grow your business? Get in touch with our team and let&apos;s discuss 
                how we can help you achieve your digital marketing goals.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white relative -mt-10 z-10">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, index) => (
              <FadeInUp key={item.title} delay={index * 0.1}>
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow border border-gray-100"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-vibrant-orange to-orange-400 rounded-2xl flex items-center justify-center text-white mb-4">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-deep-blue mb-2">{item.title}</h3>
                  {item.details.map((detail, i) => (
                    <p key={i} className="text-gray-600">{detail}</p>
                  ))}
                </motion.div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-soft-gray">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <SlideInLeft>
              <span className="text-vibrant-orange font-semibold text-sm uppercase tracking-wider">Get In Touch</span>
              <h2 className="section-title mt-2 mb-6">
                Free Consultation Available
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Fill out the form and our team will get back to you within 24 hours. 
                We&apos;re excited to learn about your business and discuss how we can help you grow.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-vibrant-orange shadow-sm">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-deep-blue mb-1">24/7 Support</h4>
                    <p className="text-gray-600">We&apos;re always here to help with your questions.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-vibrant-orange shadow-sm">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-deep-blue mb-1">Free Strategy Session</h4>
                    <p className="text-gray-600">Get a complimentary 30-minute consultation.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-vibrant-orange shadow-sm">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-deep-blue mb-1">No Obligations</h4>
                    <p className="text-gray-600">Explore your options with no commitment required.</p>
                  </div>
                </div>
              </div>
            </SlideInLeft>
            
            <SlideInRight>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-12 shadow-xl text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-deep-blue mb-4">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormState({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        service: '',
                        message: '',
                      })
                    }}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-vibrant-orange transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-vibrant-orange transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-vibrant-orange transition-colors"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-vibrant-orange transition-colors"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interested In *
                    </label>
                    <select
                      required
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-vibrant-orange transition-colors"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-vibrant-orange transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
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
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="h-96 bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center bg-deep-blue/10">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-deep-blue mx-auto mb-4" />
            <p className="text-deep-blue font-medium">Map integration coming soon</p>
          </div>
        </div>
      </section>
    </>
  )
}
