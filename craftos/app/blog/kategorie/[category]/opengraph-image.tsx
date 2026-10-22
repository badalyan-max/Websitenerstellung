import { categories } from "@/lib/content-types";
import { OG_SIZE, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik je Ratgeber (08-05, UI-SPEC § 7): generateStaticParams aus derselben Quelle wie page.tsx,
// damit jedes Bild beim Build entsteht (Pattern 3); Titel = H1 aus der Keyword-Map.
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Ratgeber von CraftOS";
export function generateStaticParams() {
  return Object.keys(categories.blog).map((category) => ({ category }));
}
export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const pfad = "/blog/kategorie/" + category;
  return pageOg({ title: ogTitel(pfad), kind: "Ratgeber", path: pfad });
}
