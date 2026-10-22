import { funktionen } from "@/lib/funktionen";
import { OG_SIZE, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik je Funktion (08-05, UI-SPEC § 7): generateStaticParams aus derselben Quelle wie page.tsx,
// damit jedes Bild beim Build entsteht (Pattern 3); Titel = H1 aus der Keyword-Map.
export const size = OG_SIZE;
export const contentType = "image/png";
// LO-03: nur die per generateStaticParams erzeugten Bilder; unbekannte Parameter liefern 404 statt 500.
export const dynamicParams = false;
export const alt = "Funktion von CraftOS";
export function generateStaticParams() {
  return funktionen.map((f) => ({ slug: f.slug }));
}
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pfad = "/funktionen/" + slug;
  return pageOg({ title: ogTitel(pfad), kind: "Funktion", path: pfad });
}
