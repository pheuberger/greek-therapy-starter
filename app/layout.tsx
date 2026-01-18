import type {Metadata} from 'next'
import {Inter, EB_Garamond} from 'next/font/google'
import {headers} from 'next/headers'
import {sanityFetch} from '@/sanity/lib/fetch'
import {SITE_SETTINGS_QUERY} from '@/lib/queries'
import {generateBaseMetadata} from '@/lib/metadata'
import {Header} from '@/components/Header'
import {Footer} from '@/components/Footer'
import {VisualEditing} from '@/components/VisualEditing'
import type {SiteSettings} from '@/lib/types'
import './globals.css'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin', 'greek'],
  display: 'swap',
})

const ebGaramond = EB_Garamond({
  variable: '--font-serif',
  subsets: ['latin', 'greek'],
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  return generateBaseMetadata()
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [settings, headersList] = await Promise.all([
    sanityFetch<SiteSettings>({
      query: SITE_SETTINGS_QUERY,
      tags: ['site'],
    }),
    headers(),
  ])

  const language = headersList.get('x-language') || 'el'
  const htmlLang = language === 'el' ? 'el' : 'en'
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <html lang={htmlLang}>
      <body
        className={`${inter.variable} ${ebGaramond.variable} flex min-h-screen flex-col antialiased`}
      >
        {settings && <Header settings={settings} />}
        <main className="flex-1">{children}</main>
        {settings && <Footer settings={settings} />}
        {isDevelopment && <VisualEditing />}
      </body>
    </html>
  )
}
