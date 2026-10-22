import { AlternativePage } from "@/components/vergleich/AlternativePage";
import { baueAlternative } from "@/lib/seiten/alternativen";
import { metaFor } from "@/lib/seo-meta";

/**
 * HERO-Alternative (08-09; SEO-03, D-01–D-04, D-16): dünne Route. Metadaten aus der Keyword-Map, Inhalt geprüft aus
 * lib/seiten/alternativen (Variante A/B laut Screenshot-Beleg in lib/wettbewerber/hero.ts, mit Quelle und Abrufdatum).
 */
export const metadata = metaFor("/vergleich/hero-alternative");

export default function Page() {
  return <AlternativePage inhalt={baueAlternative("hero")} />;
}
