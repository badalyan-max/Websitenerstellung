import type { Metadata, Viewport } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import { Header, MobileCtaBar } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { JsonLd } from '@/components/seo/json-ld'
import { generateOrganizationSchema, generateLocalBusinessSchema } from '@/lib/schema'

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#3b82f6',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.shinytouchgebaeudereinigung.de'),
  title: {
    default: 'ShinyTouch Gebäudereinigung Bamberg | Professionelle Reinigung',
    template: '%s | ShinyTouch Gebäudereinigung',
  },
  description: 'Professionelle Gebäudereinigung in Bamberg und ganz Deutschland. Büroreinigung, Glasreinigung, Grundreinigung mit 30-Tage-Zufriedenheitsgarantie. ✓ 5.0/5 Bewertungen',
  keywords: ['Gebäudereinigung', 'Büroreinigung', 'Reinigung Bamberg', 'Glasreinigung', 'Unterhaltsreinigung', 'Professionelle Reinigung'],
  authors: [{ name: 'ShinyTouch Gebäudereinigung e.K.' }],
  creator: 'ShinyTouch Gebäudereinigung e.K.',
  publisher: 'ShinyTouch Gebäudereinigung e.K.',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.shinytouchgebaeudereinigung.de',
    siteName: 'ShinyTouch Gebäudereinigung',
    title: 'ShinyTouch Gebäudereinigung Bamberg | Professionelle Reinigung',
    description: 'Professionelle Gebäudereinigung in Bamberg und ganz Deutschland. 30-Tage-Zufriedenheitsgarantie.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ShinyTouch Gebäudereinigung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ShinyTouch Gebäudereinigung Bamberg',
    description: 'Professionelle Gebäudereinigung in Bamberg und ganz Deutschland.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://www.shinytouchgebaeudereinigung.de',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={lexend.variable}>
      <head>
        {/* Organization Schema */}
        <JsonLd data={generateOrganizationSchema()} />
        {/* LocalBusiness Schema */}
        <JsonLd data={generateLocalBusinessSchema()} />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-secondary-900 pb-[72px] sm:pb-0">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  )
}
