import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, softwareApplicationSchema } from "@/lib/schema";
import { site } from "@/lib/site";

// Brand-Fonts 1:1 aus der App (self-hosted). Geladen werden nur die tragenden Schnitte Clash 600, General 400
// und General 600 (10-UI-SPEC § 7.2): Clash 500 war ungenutzt, Clash 700 und General 500 trug nur der Logo-Schriftzug,
// der jetzt als SVG gezeichnet ist (components/CraftOSLogo.tsx). Die Dateien bleiben in public/fonts (D-04).
const clash = localFont({
  src: [
    {
      path: "../public/fonts/clash-display-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-clash",
});
const general = localFont({
  src: [
    {
      path: "../public/fonts/general-sans-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/general-sans-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-general",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101014",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "CraftOS – Das Betriebssystem für Handwerksbetriebe",
    template: "%s | CraftOS",
  },
  description: site.description,
  keywords: [
    "Handwerkersoftware",
    "Handwerker Software",
    "Handwerk Software",
    "Projektverwaltung Handwerk",
    "Zeiterfassung Handwerk",
    "Angebot Rechnung Handwerk",
    "Plantafel",
    "Handwerkerbüro Software",
  ],
  authors: [{ name: "CraftOS" }],
  creator: "CraftOS",
  publisher: "CraftOS",
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: site.url,
    siteName: "CraftOS",
    title: "CraftOS – Das Betriebssystem für Handwerksbetriebe",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "CraftOS – Das Betriebssystem für Handwerksbetriebe",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${clash.variable} ${general.variable}`}>
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={softwareApplicationSchema()} />
      </head>
      <body className="flex min-h-screen flex-col bg-ink-50 text-ink-900">
        <a className="skip-link" href="#inhalt">
          Zum Inhalt
        </a>
        <Header />
        <main id="inhalt" className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
