import { AlternativePage } from "@/components/vergleich/AlternativePage";
import { baueAlternative } from "@/lib/seiten/alternativen";
import { metaFor } from "@/lib/seo-meta";

/**
 * Craftnote-Alternative (08-08; SEO-03, D-01–D-04): dünne Route. Metadaten aus der Keyword-Map, Inhalt geprüft aus
 * lib/seiten/alternativen (Wettbewerberwerte aus lib/wettbewerber/craftnote.ts mit Quelle und Abrufdatum).
 */
export const metadata = metaFor("/vergleich/craftnote-alternative");

export default function Page() {
  return <AlternativePage inhalt={baueAlternative("craftnote")} />;
}
