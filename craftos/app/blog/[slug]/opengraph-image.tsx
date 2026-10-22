import { getContentList } from "@/lib/content";
import { OG_SIZE, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik je Artikel (08-05, UI-SPEC § 7): statisch beim Build, Titel = H1 aus der Keyword-Map.
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Ratgeber von CraftOS";
export async function generateStaticParams() {
  return (await getContentList("blog")).map((a) => ({ slug: a.slug }));
}
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pfad = "/blog/" + slug;
  return pageOg({ title: ogTitel(pfad), kind: "Ratgeber", path: pfad });
}
