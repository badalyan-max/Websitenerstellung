import { notFound } from "next/navigation";
import { getContentArticle, getContentList } from "@/lib/content";
import { ArticlePage } from "@/components/content/ArticlePage";
import { pageMetadata } from "@/lib/metadata";
export async function generateStaticParams() {
  return (await getContentList("hilfe")).map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getContentArticle("hilfe", slug);
  if (!a) return {};
  const base = pageMetadata(
    a.title,
    a.description,
    "/hilfe/" + slug,
    "/hilfe/" + slug + "/opengraph-image",
  );
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
  const a = await getContentArticle("hilfe", slug);
  if (!a) notFound();
  return <ArticlePage article={a} />;
}
