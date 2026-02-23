'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function ChatWidget() {
  const [showTooltips, setShowTooltips] = useState(false)
  const [isElevenLabsOpen, setIsElevenLabsOpen] = useState(false)
  const elevenLabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load ElevenLabs convai widget script
    const script = document.createElement('script')
    script.src = 'https://elevenlabs.io/convai-widget/index.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      const existingScript = document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')
      if (existingScript) {
        existingScript.remove()
      }
    }
  }, [])

  const toggleElevenLabs = () => {
    setIsElevenLabsOpen(!isElevenLabsOpen)
    
    // Try to programmatically open/close the ElevenLabs widget
    const widget = document.querySelector('elevenlabs-convai')
    if (widget) {
      // ElevenLabs widget typically has a shadow DOM, try to trigger it
      const shadowRoot = (widget as HTMLElement).shadowRoot
      if (shadowRoot) {
        const button = shadowRoot.querySelector('button')
        if (button) {
          button.click()
        }
      }
    }
  }

  return (
    <>
      {/* Floating Action Buttons */}
      <div 
        className="fixed bottom-6 right-6 z-[60] flex flex-col-reverse gap-3 items-end"
        onMouseEnter={() => setShowTooltips(true)}
        onMouseLeave={() => setShowTooltips(false)}
      >
        {/* Chat Button - Orange - Triggers ElevenLabs */}
        <div className="relative flex items-center">
          {showTooltips && (
            <span className="absolute right-16 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg animate-fade-in">
              Chat with us
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 border-8 border-transparent border-l-gray-900"></span>
            </span>
          )}
          <button
            onClick={toggleElevenLabs}
            className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl ${
              isElevenLabsOpen 
                ? 'bg-gray-600' 
                : 'bg-vibrant-orange hover:bg-orange-500'
            }`}
            aria-label={isElevenLabsOpen ? "Close chat" : "Open chat"}
          >
            {isElevenLabsOpen ? (
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
          {showTooltips && (
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

      {/* Hidden ElevenLabs Widget - positioned behind our buttons */}
      <div 
        ref={elevenLabsRef}
        className={`fixed bottom-24 right-6 z-[55] transition-all duration-300 ${
          isElevenLabsOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* @ts-expect-error - Custom element from ElevenLabs */}
        <elevenlabs-convai agent-id="agent_4501kgqzyj13fjav2d5yw54fs4m5" />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  )
}
