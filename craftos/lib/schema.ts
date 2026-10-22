import { mobileLocales } from "./product-register";
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
    // D-25: sachliche Abgrenzung zu gleichnamigen Projekten (ohne Links auf diese Projekte).
    disambiguatingDescription:
      "CraftOS (craftos.eu) ist der Anbieter der gleichnamigen Handwerkersoftware für Handwerksbetriebe in Deutschland; nicht verbunden mit CraftOS-PC oder ComputerCraft.",
    email: site.email,
    // Nur geprüfte offizielle Profile (D-25, T-08-31): App Store und Google Play.
    sameAs: storeUrls,
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
/**
 * WebPage einer Funktionsdetailseite (07 D-11). Verweist per @id auf die globalen Knoten aus
 * app/layout.tsx (#software, #organization). Kein isPartOf, solange das Layout keinen WebSite-Knoten ausgibt.
 */
export function webPageSchema(p: { path: string; name: string; description: string }) {
  const url = site.url + p.path;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url + "#webpage",
    url,
    name: p.name,
    description: p.description,
    inLanguage: "de-DE",
    about: { "@id": site.url + "/#software" },
    publisher: { "@id": site.url + "/#organization" },
  };
}
/**
 * MobileApplication für /app (07 D-11): eigene @id neben der globalen SoftwareApplication,
 * Angebot = App-Lizenz netto aus tarife. Keine Bewertungsfelder – Sterne oder Rezensionen werden nie erfunden.
 */
export function mobileApplicationSchema() {
  const app = tarife.find((t) => t.id === "app");
  const voll = tarife.find((t) => t.id === "voll");
  if (!app || !voll) {
    throw new Error("lib/schema.ts: Tarif „app“ oder „voll“ fehlt in lib/site.ts (tarife) – mobileApplicationSchema braucht beide.");
  }
  const price = app.monat.toFixed(2);
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": site.url + "/app#mobile-app",
    name: "CraftOS Mobile-App",
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS, Android",
    url: site.url + "/app",
    // IN-04: alle belegten App-Sprachen (mobileLocales) als BCP-47, Schriftsubtag großgeschrieben (sr-Cyrl, sr-Latn).
    inLanguage: mobileLocales.map((code) => code.replace(/-([a-z])([a-z]{3})$/, (_, a: string, rest: string) => `-${a.toUpperCase()}${rest}`)),
    sameAs: storeUrls,
    installUrl: storeUrls,
    publisher: { "@id": site.url + "/#organization" },
    offers: {
      "@type": "Offer",
      // IN-04: „App-Lizenz“ statt „App-Lizenz (App)“; Voraussetzung wie in der sichtbaren FAQ.
      name: app.name,
      description: `Ergänzt die ${voll.name}; mindestens eine ${voll.name} pro Betrieb ist erforderlich.`,
      price,
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price,
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
        referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        unitText: "pro Person und Monat",
      },
      url: site.url + "/preise",
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
/** ItemList mit absoluten URLs, z. B. die Detailseiten der Funktionsübersicht (D-10). */
export function itemListSchema(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((i, n) => ({
      "@type": "ListItem",
      position: n + 1,
      name: i.name,
      url: site.url + i.path,
    })),
  };
}
