'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Mail, Phone, MapPin} from 'lucide-react'
import {getLocalizedPath, getNavLabel, getLanguageFromPath} from '@/lib/language'
import type {SiteSettings} from '@/lib/types'

interface FooterProps {
  settings: SiteSettings
}

export function Footer({settings}: FooterProps) {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const language = getLanguageFromPath(pathname)

  return (
    <footer className="border-t border-gray-200 bg-gray-50 [&_a]:!text-gray-900 [&_a:hover]:!text-gray-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">{settings.title[language]}</h3>
            {settings.description && (
              <p className="mb-6 text-sm text-gray-600">{settings.description[language]}</p>
            )}
            {settings.contactInfo && (
              <div className="grid gap-4 text-sm text-gray-900 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-4">
                {settings.contactInfo.email && (
                  <a
                    href={`mailto:${settings.contactInfo.email}`}
                    className="flex items-start gap-3 transition-colors hover:text-gray-700"
                  >
                    <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span className="break-all">{settings.contactInfo.email}</span>
                  </a>
                )}
                {settings.contactInfo.phone && (
                  <a
                    href={`tel:${settings.contactInfo.phone}`}
                    className="flex items-start gap-3 transition-colors hover:text-gray-700"
                  >
                    <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span>{settings.contactInfo.phone}</span>
                  </a>
                )}
                {settings.contactInfo.officeAddress && (
                  <div className="sm:col-span-2">
                    {settings.contactInfo.mapsUrl ? (
                      <a
                        href={settings.contactInfo.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 transition-colors hover:text-gray-700"
                      >
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <span className="whitespace-pre-line">
                          {settings.contactInfo.officeAddress}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        <p className="whitespace-pre-line">
                          {settings.contactInfo.officeAddress}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {settings.footerLinks && settings.footerLinks.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {settings.footerLabels?.quickLinksTitle?.[language] || (language === 'el' ? 'Σύνδεσμοι' : 'Quick Links')}
              </h3>
              <ul className="space-y-2">
                {settings.footerLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={getLocalizedPath(link.href, language)}
                      className="text-sm text-gray-900 transition-colors hover:text-gray-700"
                    >
                      {getNavLabel(link, language)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {settings.bookingUrl && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {settings.footerLabels?.getStartedTitle?.[language] || (language === 'el' ? 'Ξεκινήστε' : 'Get Started')}
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                {settings.footerLabels?.getStartedText?.[language] || (language === 'el'
                  ? 'Έτοιμοι να ξεκινήσετε το ταξίδι σας;'
                  : 'Ready to begin your therapy journey?')}
              </p>
              <a
                href={settings.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-gray-900 px-6 py-2 text-sm text-white transition-transform hover:scale-105"
              >
                {settings.footerLabels?.bookingButtonText?.[language] || (language === 'el' ? 'Κλείστε Ραντεβού' : 'Schedule a Session')}
              </a>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
          <p>
            © {currentYear} {settings.title[language]}.{' '}
            {settings.footerLabels?.copyright?.[language] || (language === 'el' ? 'Με επιφύλαξη παντός δικαιώματος.' : 'All rights reserved.')}
          </p>
        </div>
      </div>
    </footer>
  )
}
