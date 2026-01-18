'use client'

import {useState, useEffect, useRef} from 'react'
import {usePathname, useRouter} from 'next/navigation'
import {Globe} from 'lucide-react'
import {getLanguageFromPath, getLocalizedPath, DEFAULT_LANGUAGE} from '@/lib/language'
import type {Language} from '@/lib/types'

interface LanguageSelectorProps {
  availableLanguages: Language[]
  className?: string
}

export function LanguageSelector({
  availableLanguages,
  className = '',
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const currentLanguage = getLanguageFromPath(pathname)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleLanguageChange = async (language: Language) => {
    setIsOpen(false)

    // Remove current language prefix from pathname
    let pathWithoutLang = pathname
    if (currentLanguage !== DEFAULT_LANGUAGE) {
      pathWithoutLang = pathname.replace(`/${currentLanguage}`, '') || '/'
    }

    // Build new path with selected language
    const newPath = getLocalizedPath(pathWithoutLang, language)

    // Set cookie for language preference
    try {
      await fetch('/api/set-language', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({language}),
      })
    } catch (error) {
      console.error('Failed to set language cookie:', error)
    }

    // Navigate to new path
    router.push(newPath)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        <Globe className="h-5 w-5" aria-hidden="true" />
        <span className="font-medium uppercase">{currentLanguage}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-full overflow-hidden rounded-lg bg-white shadow-[0_0_12px_rgba(0,0,0,0.15)]"
          role="menu"
          aria-orientation="vertical"
        >
          {availableLanguages.map((language) => (
            <button
              key={language}
              onClick={() => handleLanguageChange(language)}
              className={`block w-full px-4 py-2 text-left text-sm uppercase transition-colors hover:bg-gray-100 ${
                language === currentLanguage
                  ? 'bg-gray-50 font-bold text-gray-900'
                  : 'text-gray-700'
              }`}
              role="menuitem"
            >
              {language}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
