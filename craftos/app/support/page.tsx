import { BookOpen, Mail, Newspaper } from "lucide-react";
import { ContentKopf } from "@/components/content/ContentKopf";
import { Abschnitt } from "@/components/v2/Abschnitt";
import { CtaBand } from "@/components/v2/CtaBand";
import { LinkKarten } from "@/components/v2/LinkKarten";
import { SectionHeader } from "@/components/v2/SectionHeader";
import { crumbsFor } from "@/lib/breadcrumbs";
import { getContentList } from "@/lib/content";
import { site } from "@/lib/site";
import { metaFor, zielwerte } from "@/lib/seo-meta";

/**
 * /support auf v2 (Phase 10, D-16; 10-UI-SPEC § 2, K5): heller ContentKopf statt des früheren dunklen Seitenkopfs aus
 * components/ui (die Datei bleibt, D-04), danach Kontaktweg (Weiß, Karte Warm), Hilfe und Ratgeber (Warm, Karten Weiß) und das CTA-Band. Alle
 * Bestandssätze bleiben wörtlich und verteilen sich nur auf Bausteine; die E-Mail kommt aus site.email.
 * Async, weil die Mengen der Hilfe- und Ratgeberkarten aus lib/content kommen (K-2: tests/breadcrumbs.test.ts
 * rendert die Seite per await). Title, Description und H1 aus der Keyword-Map (08-04, D-06).
 */
export const metadata = metaFor("/support");

const anleitungen = (n: number) => (n === 1 ? "1 Anleitung" : `${n} Anleitungen`);

export default async function Page() {
  const [hilfe, blog] = await Promise.all([getContentList("hilfe"), getContentList("blog")]);
  return (
    <>
      <ContentKopf
        crumbs={crumbsFor("/support")}
        id="support-titel"
        eyebrow="Kontakt & Support"
        h1={zielwerte("/support").h1}
        lead="Ob Einrichtung, Rechnung oder eine Frage zur Mobile-App: Beschreiben Sie uns kurz, wobei Sie Unterstützung benötigen."
      />

      <Abschnitt id="kontakt" surface="white">
        <SectionHeader
          id="kontakt"
          title="Direkt zum CraftOS Support."
          lead="Nennen Sie die betroffene Ansicht, Ihr Gerät und die Schritte, bei denen die Frage auftritt."
        />
        <LinkKarten
          label="Kontaktweg"
          surface="warm"
          columns={2}
          items={[
            {
              href: "mailto:" + site.email,
              title: site.email,
              label: "E-Mail",
              text: "Eine genaue Fehlermeldung hilft uns bei der Einordnung. Bitte senden Sie keine Passwörter oder vollständigen Zahlungsdaten.",
              icon: <Mail size={24} strokeWidth={1.75} />,
              iconFeld: true,
            },
          ]}
        />
      </Abschnitt>

      <Abschnitt id="hilfe" surface="warm">
        <SectionHeader
          id="hilfe"
          title="Die Antwort ist vielleicht schon da."
          lead="Im Hilfezentrum finden Sie Anleitungen zu Einrichtung, Angeboten, Rechnungen, Zeiten, Lager und Craft AI."
        />
        <LinkKarten
          label="Hilfe und Ratgeber"
          surface="white"
          columns={2}
          items={[
            {
              href: "/hilfe",
              title: "Hilfezentrum öffnen",
              meta: anleitungen(hilfe.length),
              icon: <BookOpen size={24} strokeWidth={1.75} />,
              iconFeld: true,
            },
            {
              href: "/blog",
              title: "Ratgeber für Ihren Betriebsalltag",
              meta: `${blog.length} Artikel`,
              icon: <Newspaper size={24} strokeWidth={1.75} />,
              iconFeld: true,
            },
          ]}
        />
      </Abschnitt>

      <div data-abschnitt="cta">
        <CtaBand title="Machen Sie Platz für Ihr Handwerk." text="Ohne Zahlungsdaten – Sie entscheiden nach dem Test." />
      </div>
    </>
  );
}
