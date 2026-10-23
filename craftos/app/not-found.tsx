import { BookOpen, House, LayoutGrid } from "lucide-react";
import { ContentKopf } from "@/components/content/ContentKopf";
import { Abschnitt } from "@/components/v2/Abschnitt";
import { LinkKarten } from "@/components/v2/LinkKarten";
import { SectionHeader } from "@/components/v2/SectionHeader";

/**
 * 404-Seite auf v2 (Phase 10, D-18; 10-UI-SPEC § 4, K1, J1, J10): heller Kopf ohne Brotkrumen (`crumbs={null}` –
 * die Seite ist nicht indexiert und hat keinen Ort in der Seitenhierarchie), danach drei Einstiege als LinkKarten.
 * Kein CtaBand, keine Altklassen, kein Amber. HTTP-Status 404 und `noindex` setzt Next selbst.
 * Flächen: Kopf Warm → Einstiege Weiß (Karten Warm) → Fußleiste.
 */
export default function NotFound() {
  return (
    <>
      <ContentKopf
        crumbs={null}
        id="fehler-titel"
        eyebrow="Seite nicht gefunden"
        h1="Hier geht es nicht weiter. An anderer Stelle schon."
        lead="Diese Adresse ist nicht verfügbar. Über die Startseite oder das Hilfezentrum finden Sie den passenden Einstieg."
      />

      <Abschnitt id="einstiege" surface="white">
        <SectionHeader id="einstiege" title="So geht es weiter" lead="Wählen Sie den Einstieg, der zu Ihrer Frage passt." />
        <LinkKarten
          label="Einstiege"
          surface="warm"
          columns={3}
          items={[
            {
              href: "/",
              title: "Startseite",
              text: "CraftOS im Überblick: Angebot, Planung, Baustelle und Rechnung in einer Software.",
              icon: <House size={24} strokeWidth={1.75} />,
              iconFeld: true,
            },
            {
              href: "/hilfe",
              title: "Hilfezentrum",
              text: "Anleitungen Schritt für Schritt, von der Einrichtung bis zur Rechnung.",
              icon: <BookOpen size={24} strokeWidth={1.75} />,
              iconFeld: true,
            },
            {
              href: "/funktionen",
              title: "Funktionen",
              text: "Alle Funktionen von Angebot bis Buchhaltung mit Plattformen und Lizenzen im Überblick.",
              icon: <LayoutGrid size={24} strokeWidth={1.75} />,
              iconFeld: true,
            },
          ]}
        />
      </Abschnitt>
    </>
  );
}
