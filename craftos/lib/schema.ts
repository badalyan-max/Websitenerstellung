import { site } from "./site";
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": site.url + "/#organization",
    name: site.name,
    url: site.url,
    logo: site.url + "/icons/icon-512x512.png",
    description: site.description,
    email: site.email,
  };
}
export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": site.url + "/#software",
    name: "CraftOS",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description: site.description,
    url: site.url,
    inLanguage: "de-DE",
    publisher: { "@id": site.url + "/#organization" },
    offers: {
      "@type": "Offer",
      name: "Voll-Lizenz inklusive Web-App und Mobile-App",
      price: "29.95",
      priceCurrency: "EUR",
      url: site.url + "/preise",
      description:
        "Netto pro Person und Monat. Mindestens eine Voll-Lizenz pro Betrieb. Zusatzlizenzen und KI-Verbrauch gesondert.",
    },
  };
}
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, n) => ({
      "@type": "ListItem",
      position: n + 1,
      name: i.name,
      item: site.url + i.path,
    })),
  };
}
