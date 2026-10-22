import { notFound } from "next/navigation";
import { FunktionsDetail } from "@/components/funktionen/FunktionsDetail";
import { getFunktion, funktionen } from "@/lib/funktionen";
import { getFunktionsdetail } from "@/lib/funktionsdetails";
import { metaFor } from "@/lib/seo-meta";

/**
 * Funktionsdetailseiten (07-UI-SPEC „Vorlage Detailseite“; FEAT-02, SEO-02, D-04, D-10, D-22): dünne Route.
 * Metadaten kommen aus den Keyword-Map-Zielwerten (Title ohne Marke, das Root-Template hängt „ | CraftOS“ an),
 * die Seite rendert die geprüfte v2-Vorlage. Alle 22 URLs bleiben über generateStaticParams erhalten.
 */
export function generateStaticParams() {
  return funktionen.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getFunktion(slug)) return {};
  // Title, Description und Segmentbild /funktionen/{slug}/opengraph-image aus der Keyword-Map (08-05).
  return metaFor("/funktionen/" + slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getFunktion(slug)) notFound();
  return <FunktionsDetail detail={getFunktionsdetail(slug)} />;
}
