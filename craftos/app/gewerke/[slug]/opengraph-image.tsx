import { gewerke } from "@/lib/gewerke";
import { OG_SIZE, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik je Gewerk (08-05, UI-SPEC § 7): generateStaticParams aus derselben Quelle wie page.tsx,
// damit jedes Bild beim Build entsteht (Pattern 3); Titel = H1 aus der Keyword-Map.
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Gewerk: Handwerkersoftware von CraftOS";
export function generateStaticParams() {
  return gewerke.map((g) => ({ slug: g.slug }));
}
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pfad = "/gewerke/" + slug;
  return pageOg({ title: ogTitel(pfad), kind: "Gewerk", path: pfad });
}
