'use client'

import { useState, useRef, useEffect } from 'react'

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
  const [isOpen, setIsOpen] = useState(false)
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
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-vibrant-orange text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110"
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-deep-blue text-white p-4 flex items-center space-x-3">
            <div className="w-10 h-10 bg-vibrant-orange rounded-full flex items-center justify-center">
              <span className="font-bold">G</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Global Digital Prime</h4>
              <p className="text-xs text-gray-300">Enterprise Support</p>
            </div>
            <div className="ml-auto flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
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
    </>
  )
}
