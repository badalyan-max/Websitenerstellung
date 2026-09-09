import { ContentIndex } from "@/components/content/ContentIndex";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Ratgeber für Handwerksbetriebe",
  "Praktische Ratgeber zu Rechnungen, Kalkulation, Projekten und Teamplanung – mit Beispielen, Quellen und kostenlosen Rechnern.",
  "/blog",
);
export default function Page() {
  return <ContentIndex kind="blog" />;
}
