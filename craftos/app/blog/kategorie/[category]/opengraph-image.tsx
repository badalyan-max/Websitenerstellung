import { categories } from "@/lib/content-types";
import { OG_SIZE, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik je Ratgeber (08-05, UI-SPEC § 7): generateStaticParams aus derselben Quelle wie page.tsx,
// damit jedes Bild beim Build entsteht (Pattern 3); Titel = H1 aus der Keyword-Map.
export const size = OG_SIZE;
export const contentType = "image/png";
// LO-03: nur die per generateStaticParams erzeugten Bilder; unbekannte Parameter liefern 404 statt 500.
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(categories.blog).map((category) => ({ category }));
}
export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const pfad = "/blog/kategorie/" + category;
  return pageOg({ title: ogTitel(pfad), kind: "Ratgeber", path: pfad });
}
