'use client'

import { useState } from 'react'

export default function VoiceWidget() {
  const [isListening, setIsListening] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const toggleListening = () => {
    setIsListening(!isListening)
    // ElevenLabs TTS integration placeholder
    // Will use NEXT_PUBLIC_ELEVENLABS_API_KEY environment variable
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000)
    }
  }

  return (
    <div className="fixed bottom-6 right-24 z-50">
      <div className="relative">
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-deep-blue text-white text-xs rounded-lg whitespace-nowrap shadow-lg">
            Voice Assistant (Coming Soon)
            <div className="absolute top-full right-4 w-2 h-2 bg-deep-blue transform rotate-45 -mt-1"></div>
          </div>
        )}
        <button
          onClick={toggleListening}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isListening
              ? 'bg-red-500 animate-pulse'
              : 'bg-deep-blue hover:bg-dark-navy'
          } text-white`}
          aria-label="Voice assistant"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
        {isListening && (
          <div className="absolute -inset-2 rounded-full border-2 border-red-400 animate-ping"></div>
        )}
      </div>
    </div>
  )
}
