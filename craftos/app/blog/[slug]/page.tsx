import { notFound } from "next/navigation";
import { getContentArticle, getContentList } from "@/lib/content";
import { ArticlePage } from "@/components/content/ArticlePage";
import { metaFor } from "@/lib/seo-meta";
export async function generateStaticParams() {
  return (await getContentList("blog")).map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getContentArticle("blog", slug);
  if (!a) return {};
  // Title und Description aus der Keyword-Map (08-04, D-06); Artikeltitel aus dem Frontmatter bleibt für Listen und Feed.
  const pfad = "/blog/" + slug;
  const base = metaFor(pfad, { imagePath: pfad + "/opengraph-image" });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt,
      authors: [a.author],
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getContentArticle("blog", slug);
  if (!a) notFound();
  return <ArticlePage article={a} />;
}
