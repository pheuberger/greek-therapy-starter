'use client'

import {useState, FormEvent} from 'react'
import Link from 'next/link'
import {getLocalizedPath} from '@/lib/language'
import type {ContactFormSection, Language} from '@/lib/types'

interface ContactFormProps {
  section: ContactFormSection
  language: Language
}

export function ContactForm({section, language}: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.consent) return

    setStatus('submitting')

    try {
      const form = new FormData(e.currentTarget)

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(form as any).toString(),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({fullName: '', email: '', phone: '', message: '', consent: false})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const privacyPath = getLocalizedPath(section.privacyPolicyPath || '/privacy', language)

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-xl">
          {section.phoneNumber && section.phoneText && (
            <p className="mb-8 text-center text-gray-11">
              {section.phoneText.includes('{{phone_number}}') ? (
                <>
                  {section.phoneText.split('{{phone_number}}')[0]}
                  <a href={`tel:${section.phoneNumber}`} className="font-semibold text-primary hover:text-accent-hover">
                    {section.phoneNumber}
                  </a>
                  {section.phoneText.split('{{phone_number}}')[1]}
                </>
              ) : (
                <>
                  {section.phoneText.split(section.phoneNumber)[0]}
                  <a href={`tel:${section.phoneNumber}`} className="font-semibold text-primary hover:text-accent-hover">
                    {section.phoneNumber}
                  </a>
                  {section.phoneText.split(section.phoneNumber)[1]}
                </>
              )}
            </p>
          )}

          {section.requiredFieldsNote && (
            <p className="mb-6 text-center text-sm text-gray-10">
              {section.requiredFieldsNote}
            </p>
          )}

          {status === 'success' ? (
            <div className="rounded-lg bg-accent-subtle p-6 text-center text-primary">
              {section.successMessage}
            </div>
          ) : (
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />

              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-11">
                  {section.labels?.fullName}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  placeholder={section.placeholders?.fullName}
                  className="w-full rounded-lg border border-sand-6 bg-white px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-11">
                  {section.labels?.email}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder={section.placeholders?.email}
                  className="w-full rounded-lg border border-sand-6 bg-white px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-11">
                  {section.labels?.phone?.includes('{{phone_number}}') && section.phoneNumber ? (
                    <>
                      {section.labels.phone.split('{{phone_number}}')[0]}
                      <a href={`tel:${section.phoneNumber}`} className="text-primary underline hover:text-accent-hover">
                        {section.phoneNumber}
                      </a>
                      {section.labels.phone.split('{{phone_number}}')[1]}
                    </>
                  ) : (
                    section.labels?.phone
                  )}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder={section.placeholders?.phone}
                  className="w-full rounded-lg border border-sand-6 bg-white px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-11">
                  {section.labels?.message}
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder={section.placeholders?.message}
                  className="min-h-[150px] w-full resize-y rounded-lg border border-sand-6 bg-white px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                  className="mt-1 h-4 w-4 rounded border-sand-6 text-primary focus:ring-primary"
                />
                <label htmlFor="consent" className="text-sm text-gray-11">
                  {section.consentText?.includes('{{privacy_policy}}') ? (
                    <>
                      {section.consentText.split('{{privacy_policy}}')[0]}
                      <Link href={privacyPath} className="text-primary underline hover:text-accent-hover">
                        {section.privacyPolicyLinkText || 'Privacy Policy'}
                      </Link>
                      {section.consentText.split('{{privacy_policy}}')[1]}
                    </>
                  ) : (
                    section.consentText
                  )}
                </label>
              </div>

              {status === 'error' && (
                <div className="rounded-lg bg-red-50 p-4 text-center text-red-700">
                  {section.errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting' || !formData.consent}
                className="w-full rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'submitting' ? '...' : section.submitButtonText}
              </button>
            </form>
          )}

          {section.spamNote && status !== 'success' && (
            <p className="mt-6 text-center text-sm text-gray-10">
              {section.spamNote}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
