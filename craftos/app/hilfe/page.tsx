import { ContentIndex } from "@/components/content/ContentIndex";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Hilfezentrum für Web-App und Mobile-App",
  "Schrittweise Anleitungen für CraftOS: Einrichtung, Angebote, Rechnungen, Planung, Zeiten, Lager und Craft AI.",
  "/hilfe",
);
export default function Page() {
  return <ContentIndex kind="hilfe" />;
}
