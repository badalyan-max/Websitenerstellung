import { notFound } from "next/navigation";
import { ContentIndex } from "@/components/content/ContentIndex";
import { categories } from "@/lib/content-types";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return Object.keys(categories.blog).map((category) => ({ category }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const label = Object.hasOwn(categories.blog, category)
    ? categories.blog[category]
    : undefined;
  return label
    ? pageMetadata(
        label + " – Ratgeber",
        "Ratgeber zum Thema " + label + " für Handwerksbetriebe.",
        "/blog/kategorie/" + category,
      )
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
