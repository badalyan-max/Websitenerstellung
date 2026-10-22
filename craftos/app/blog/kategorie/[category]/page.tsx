import { notFound } from "next/navigation";
import { ContentIndex } from "@/components/content/ContentIndex";
import { categories } from "@/lib/content-types";
import { metaFor } from "@/lib/seo-meta";
export function generateStaticParams() {
  return Object.keys(categories.blog).map((category) => ({ category }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  // Title und Description aus der Keyword-Map (08-04, D-06); die H1 setzt ContentIndex aus derselben Quelle.
  return Object.hasOwn(categories.blog, category)
    ? metaFor("/blog/kategorie/" + category)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!Object.hasOwn(categories.blog, category)) notFound();
  return <ContentIndex kind="blog" category={category} />;
}
