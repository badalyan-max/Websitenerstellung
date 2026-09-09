import { notFound } from "next/navigation";
import { ContentIndex } from "@/components/content/ContentIndex";
import { categories } from "@/lib/content-types";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return Object.keys(categories.hilfe).map((category) => ({ category }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const label = Object.hasOwn(categories.hilfe, category)
    ? categories.hilfe[category]
    : undefined;
  return label
    ? pageMetadata(
        label + " – Hilfe",
        "Anleitungen zum Thema " + label + " für Handwerksbetriebe.",
        "/hilfe/kategorie/" + category,
      )
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!Object.hasOwn(categories.hilfe, category)) notFound();
  return <ContentIndex kind="hilfe" category={category} />;
}
