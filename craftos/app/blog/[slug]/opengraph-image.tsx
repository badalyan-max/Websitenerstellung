import { getContentArticle } from "@/lib/content";
import { articleOg } from "@/lib/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CraftOS Ratgeber";
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getContentArticle("blog", slug);
  return articleOg(a?.title ?? "CraftOS Ratgeber", "Ratgeber");
}
