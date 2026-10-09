'use client'

import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { TurnstileWidget } from '@/components/security/TurnstileWidget'
import { HoneypotField, useFormBotFields } from '@/components/security/FormBotFields'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

const copy = {
  en: {
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    company: 'Company',
    service: 'What do you need?',
    selectService: 'Select an option',
    services: ['AI assistant for website or WhatsApp', 'VisaReadyPro', 'Custom software development', 'Cloud architecture', 'Mobile app development', 'Other'],
    message: 'Tell us about your project',
    messagePlaceholder: 'What should the assistant or software do? Any timeline?',
    send: 'Send message',
    sending: 'Sending…',
    sentTitle: 'Message sent',
    sentBody: 'Thank you. We will reply by email.',
    again: 'Send another message',
    captcha: 'Please complete the human verification check below.',
    failed: 'Unable to send your message. Please try again.',
  },
  id: {
    firstName: 'Nama depan',
    lastName: 'Nama belakang',
    email: 'Email',
    company: 'Perusahaan',
    service: 'Apa yang Anda butuhkan?',
    selectService: 'Pilih salah satu',
    services: ['Chatbot AI untuk website atau WhatsApp', 'Pembuatan website', 'Pembuatan aplikasi', 'Software custom', 'Lainnya'],
    message: 'Ceritakan proyek Anda',
    messagePlaceholder: 'Apa yang perlu dilakukan chatbot atau software Anda? Kapan targetnya?',
    send: 'Kirim pesan',
    sending: 'Mengirim…',
    sentTitle: 'Pesan terkirim',
    sentBody: 'Terima kasih. Kami akan membalas melalui email.',
    again: 'Kirim pesan lain',
    captcha: 'Silakan selesaikan verifikasi di bawah ini.',
    failed: 'Pesan gagal dikirim. Silakan coba lagi.',
  },
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibrant-orange focus:ring-2 focus:ring-vibrant-orange/20 outline-none transition-all bg-white'

export default function ContactForm({ locale = 'en' }: { locale?: 'en' | 'id' }) {
  const t = copy[locale]
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', company: '', service: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const bot = useFormBotFields()
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [captchaAttempt, setCaptchaAttempt] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setError(t.captcha)
      return
    }
    setIsSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind: 'contact',
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          company: formData.company,
          service: formData.service,
          preferredOffice: locale === 'id' ? 'indonesia' : undefined,
          message: formData.message,
          website: bot.honeypot,
          form_started_at: bot.formStartedAt ?? undefined,
          turnstile_token: turnstileToken ?? undefined,
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.success) throw new Error(data.error || t.failed)
      setIsSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : t.failed)
    } finally {
      setIsSubmitting(false)
      setTurnstileToken(null)
      setCaptchaAttempt((n) => n + 1)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-16" role="status">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-deep-blue mb-2">{t.sentTitle}</h3>
        <p className="text-gray-600 mb-6">{t.sentBody}</p>
        <button onClick={() => setIsSubmitted(false)} className="text-vibrant-orange font-semibold hover:underline">
          {t.again}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-2">{t.firstName} *</span>
          <input type="text" name="firstName" required autoComplete="given-name" value={formData.firstName} onChange={handleChange} className={inputClass} />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-2">{t.lastName} *</span>
          <input type="text" name="lastName" required autoComplete="family-name" value={formData.lastName} onChange={handleChange} className={inputClass} />
        </label>
      </div>
      <label className="block">
        <span className="block text-sm font-medium text-gray-700 mb-2">{t.email} *</span>
        <input type="email" name="email" required autoComplete="email" value={formData.email} onChange={handleChange} className={inputClass} />
      </label>
      <div className="grid md:grid-cols-2 gap-6">
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-2">{t.company}</span>
          <input type="text" name="company" autoComplete="organization" value={formData.company} onChange={handleChange} className={inputClass} />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-gray-700 mb-2">{t.service}</span>
          <select name="service" value={formData.service} onChange={handleChange} className={inputClass}>
            <option value="">{t.selectService}</option>
            {t.services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className="block text-sm font-medium text-gray-700 mb-2">{t.message} *</span>
        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          placeholder={t.messagePlaceholder}
        />
      </label>
      <HoneypotField value={bot.honeypot} onChange={bot.setHoneypot} />
      {TURNSTILE_SITE_KEY && (
        <TurnstileWidget key={captchaAttempt} siteKey={TURNSTILE_SITE_KEY} onVerify={setTurnstileToken} theme="light" />
      )}
      {error && (
        <p role="alert" className="text-red-600 text-sm">
          {error}
        </p>
      )}
      <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
        {isSubmitting ? t.sending : t.send}
        {!isSubmitting && <Send className="w-5 h-5" />}
      </button>
    </form>
  )
}
