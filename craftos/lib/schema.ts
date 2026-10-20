import { site, tarife } from "./site";
// Abgrenzung zu gleichnamigen Produkten für Suchmaschinen und KI-Suchen
const brandName = "CraftOS Handwerkersoftware";
const storeUrls = [site.iosUrl, site.androidUrl];
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": site.url + "/#organization",
    name: site.name,
    alternateName: [brandName],
    url: site.url,
    logo: site.url + "/icons/icon-512x512.png",
    description: site.description,
    disambiguatingDescription:
      "CraftOS (craftos.eu) ist der Anbieter der gleichnamigen Handwerkersoftware für Handwerksbetriebe in Deutschland.",
    email: site.email,
  };
}
export function softwareApplicationSchema() {
  const voll = tarife.find((t) => t.id === "voll")!;
  const price = voll.monat.toFixed(2);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": site.url + "/#software",
    name: "CraftOS",
    alternateName: brandName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    description: site.description,
    url: site.url,
    inLanguage: "de-DE",
    sameAs: storeUrls,
    publisher: { "@id": site.url + "/#organization" },
    offers: {
      "@type": "Offer",
      name: `${voll.name} (${voll.produktlizenz}) inklusive Web-App und Mobile-App`,
      price,
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price,
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
        // Abo-Preis je Person und Monat (UN/CEFACT „MON“), nicht als Einmalpreis lesbar (LO-02).
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        unitText: "pro Person und Monat",
      },
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
