'use client'

import {useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import Image from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import {LanguageSelector} from './LanguageSelector'
import {getLocalizedPath, getNavLabel, getLanguageFromPath, AVAILABLE_LANGUAGES} from '@/lib/language'
import type {SiteSettings} from '@/lib/types'

interface HeaderProps {
  settings: SiteSettings
}

export function Header({settings}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const language = getLanguageFromPath(pathname)

  const availableLanguages = AVAILABLE_LANGUAGES

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href={getLocalizedPath('/', language)}
          className="flex items-center gap-3 hover:opacity-80"
        >
          {settings.logo?.asset ? (
            <Image
              src={urlFor(settings.logo).width(120).height(60).url()}
              alt={settings.logo.alt || settings.title[language]}
              width={120}
              height={60}
              className="h-12 w-auto object-contain"
            />
          ) : (
            <span className="text-2xl font-bold text-gray-900">{settings.title[language]}</span>
          )}
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {settings.navigation && settings.navigation.length > 0 && (
            <nav>
              <ul className="flex items-center gap-8">
                {settings.navigation.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={getLocalizedPath(item.href, language)}
                      className="font-medium text-gray-700 transition-colors hover:text-gray-900"
                    >
                      {getNavLabel(item, language)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <LanguageSelector availableLanguages={availableLanguages} />
          {settings.bookingButton && (
            <Link
              href={getLocalizedPath(settings.bookingButton.href || '/contact', language)}
              className="ml-4 inline-flex items-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              {settings.bookingButton.labels[language]}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector availableLanguages={availableLanguages} />
          {settings.navigation && settings.navigation.length > 0 && (
            <button
              className="text-gray-700"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      {settings.navigation && settings.navigation.length > 0 && (
        <nav
          className={`border-t border-gray-200 bg-white overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="container mx-auto space-y-4 px-6 py-4">
            {settings.navigation.map((item, index) => (
              <li key={index}>
                <Link
                  href={getLocalizedPath(item.href, language)}
                  className="block py-2 font-medium text-gray-700 transition-colors hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {getNavLabel(item, language)}
                </Link>
              </li>
            ))}
            {settings.bookingButton && (
              <li>
                <Link
                  href={getLocalizedPath(settings.bookingButton.href || '/contact', language)}
                  className="mt-4 block w-full rounded-full bg-primary px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-accent-hover"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {settings.bookingButton.labels[language]}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  )
}
