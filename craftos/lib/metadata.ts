import type { Metadata } from "next";
import { site } from "./site";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  imagePath = "/opengraph-image",
  /** Alternativtext der OG-Grafik (metaFor: „{Seitentyp}: {OG-Titel}“, LO-01); sonst der Seitentitel. */
  imageAlt: string = title,
): Metadata {
  const url = site.url + path;
  const images = [
    { url: site.url + imagePath, width: 1200, height: 630, alt: imageAlt },
  ];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "de_DE",
      siteName: "CraftOS",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map((i) => i.url),
    },
  };
}
