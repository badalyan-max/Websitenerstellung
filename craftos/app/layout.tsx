import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { JsonLd } from '@/components/seo/JsonLd'
import { organizationSchema, softwareApplicationSchema } from '@/lib/schema'
import { site } from '@/lib/site'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
  weight: ['400', '500', '600', '700', '800'],
})
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-sans',
  weight: ['400', '500', '600', '700'],
})
const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plex-mono',
  weight: ['400', '500', '600'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6366f1',
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'CraftOS – Das Betriebssystem für Handwerksbetriebe',
    template: '%s | CraftOS',
  },
  description: site.description,
  keywords: [
    'Handwerkersoftware',
    'Handwerker Software',
    'Handwerk Software',
    'Projektverwaltung Handwerk',
    'Zeiterfassung Handwerk',
    'Angebot Rechnung Handwerk',
    'Plantafel',
    'Handwerkerbüro Software',
  ],
  authors: [{ name: 'CraftOS' }],
  creator: 'CraftOS',
  publisher: 'CraftOS',
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: site.url,
    siteName: 'CraftOS',
    title: 'CraftOS – Das Betriebssystem für Handwerksbetriebe',
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CraftOS – Das Betriebssystem für Handwerksbetriebe',
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/icons/icon-192x192.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={softwareApplicationSchema()} />
      </head>
      <body className="flex min-h-screen flex-col bg-ink-50 text-ink-900">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
