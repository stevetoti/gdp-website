'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const faqResponses: Record<string, string> = {
  'services': 'We offer Enterprise Software Development, AI & Machine Learning, Cloud Infrastructure, Digital Transformation, Cybersecurity, and Data Analytics. Visit our Services page for details.',
  'pricing': 'Our pricing is tailored to each project. Contact us at info@globaldigitalprime.com or fill out our contact form for a custom quote.',
  'contact': 'You can reach us at info@globaldigitalprime.com, or visit our Contact page. We have offices in Dover, Delaware USA and Bali, Indonesia.',
  'locations': 'We operate from two main offices: Dover, Delaware USA and Bali, Indonesia. We serve clients globally across all time zones.',
  'careers': 'We are always looking for talented professionals! Check our Careers page for current openings or send your resume to careers@globaldigitalprime.com.',
  'industries': 'We serve Finance & Banking, Healthcare, Government, E-Commerce, Manufacturing, and Education sectors. Visit our Industries page to learn more.',
  'hello': 'Hello! Welcome to Global Digital Prime. How can I help you today?',
  'hi': 'Hi there! Welcome to Global Digital Prime. I can help you with information about our services, solutions, pricing, or anything else. What would you like to know?',
}

function getResponse(input: string): string {
  const lower = input.toLowerCase()
  for (const [key, value] of Object.entries(faqResponses)) {
    if (lower.includes(key)) return value
  }
  return 'Thank you for your message! For detailed inquiries, please reach out to us at info@globaldigitalprime.com or fill out our contact form. A team member will get back to you within 24 hours.'
}

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showTooltips, setShowTooltips] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: 'Welcome to Global Digital Prime! How can we help you today? You can ask about our services, pricing, locations, or careers.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: messages.length,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    const botMsg: Message = {
      id: messages.length + 1,
      text: getResponse(input),
      sender: 'bot',
      timestamp: new Date(),
    }

    setMessages([...messages, userMsg, botMsg])
    setInput('')
  }

  return (
    <>
      {/* Floating Action Buttons */}
      <div 
        className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3 items-end"
        onMouseEnter={() => setShowTooltips(true)}
        onMouseLeave={() => setShowTooltips(false)}
      >
        {/* Chat Button - Orange */}
        <div className="relative flex items-center">
          {showTooltips && !isChatOpen && (
            <span className="absolute right-16 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg animate-fade-in">
              Chat with us
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-8 border-transparent border-l-gray-900"></span>
            </span>
          )}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl ${
              isChatOpen 
                ? 'bg-gray-600 rotate-0' 
                : 'bg-vibrant-orange hover:bg-orange-500'
            }`}
            aria-label={isChatOpen ? "Close chat" : "Open chat"}
          >
            {isChatOpen ? (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            )}
          </button>
        </div>

        {/* Phone Button - Blue */}
        <div className="relative flex items-center">
          {showTooltips && !isChatOpen && (
            <span className="absolute right-16 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg animate-fade-in">
              Call us now
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-8 border-transparent border-l-gray-900"></span>
            </span>
          )}
          <Link
            href="tel:+16787000000"
            className="w-14 h-14 bg-deep-blue hover:bg-blue-700 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
            aria-label="Call us"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-deep-blue text-white p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-vibrant-orange rounded-full flex items-center justify-center">
              <span className="font-bold text-sm">GDP</span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm">Global Digital Prime</h4>
              <p className="text-xs text-gray-300">Enterprise Support</p>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-deep-blue text-white rounded-br-sm'
                      : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-3 py-2 border-t border-gray-100 bg-white">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button 
                onClick={() => setInput('Tell me about your services')}
                className="flex-shrink-0 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => setInput('What are your pricing options?')}
                className="flex-shrink-0 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => setInput('Where are you located?')}
                className="flex-shrink-0 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
              >
                Locations
              </button>
              <button 
                onClick={() => setInput('Do you have job openings?')}
                className="flex-shrink-0 text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
              >
                Careers
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-gray-50 rounded-full text-sm border border-gray-200 focus:outline-none focus:border-deep-blue focus:ring-1 focus:ring-deep-blue"
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 bg-vibrant-orange text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
