import type { ReactNode } from "react";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { ContentKopf } from "@/components/content/ContentKopf";
import { ABSCHNITT_FLAECHE, Abschnitt, type AbschnittFlaeche } from "@/components/v2/Abschnitt";
import { CtaBand } from "@/components/v2/CtaBand";
import { crumbsFor } from "@/lib/breadcrumbs";
import styles from "./Calculators.module.css";

/** 10-UI-SPEC § 1.1 (K2, J2): Rechnerversprechen [BESTAND] als Hinweis im Kopf. */
const RECHNER_HINWEIS = {
  text: "Kostenlos. Ohne Anmeldung. Ihre Zahlen bleiben im Browser.",
  icon: LockKeyhole,
} as const;

/**
 * Rechnerseiten auf v2 (Phase 10, D-15; 10-UI-SPEC § 1): heller ContentKopf mit Brotkrumen, Eyebrow „Rechner“,
 * H1 aus der Keyword-Map, Bestands-Intro als Lead (Rechner haben keine Antwortregel) und dem Rechnerversprechen als
 * Hinweis. Mit `current` folgt der weiße Abschnitt `rechner` (Rechnernavigation, noscript-Hinweis und die
 * unveränderte Client-Insel aus `werkzeug`), danach die Hilfeabschnitte aus `children` und das CTA-Band.
 * Die Rechner selbst (Rechenlogik, Feldnamen, Beschriftungen) bleiben unverändert; nichts wird gespeichert.
 */
export function CalculatorPage({
  title,
  intro,
  children,
  current,
  werkzeug,
}: {
  /** Exakt zielwerte(pfad).h1 */
  title: string;
  /** Bestands-Intro wörtlich, als Lead im Kopf */
  intro: string;
  children: ReactNode;
  current?: "stundensatz" | "angebotskalkulation";
  /** noscript-Hinweis und Rechner (nur mit current) */
  werkzeug?: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <ContentKopf
        crumbs={crumbsFor(current ? "/rechner/" + current : "/rechner")}
        eyebrow="Rechner"
        h1={title}
        id="rechner-titel"
        lead={intro}
        hinweis={RECHNER_HINWEIS}
      />
      {current && (
        // Keine benannte Region: die Panels des Rechners tragen ihre H2 (10-UI-SPEC § 1.2).
        <section
          data-abschnitt="rechner"
          className={`${ABSCHNITT_FLAECHE.white} py-12 md:py-16 lg:py-24`}
        >
          <div className="site-container">
            <nav className={styles.calculatorNav} aria-label="Rechner auswählen">
              <Link
                href="/rechner/stundensatz"
                aria-current={current === "stundensatz" ? "page" : undefined}
              >
                Stundensatz
              </Link>
              <Link
                href="/rechner/angebotskalkulation"
                aria-current={
                  current === "angebotskalkulation" ? "page" : undefined
                }
              >
                Angebot & Marge
              </Link>
            </nav>
            {werkzeug}
          </div>
        </section>
      )}
      {children}
      <div data-abschnitt="cta">
        <CtaBand
          title="Von der Kalkulation zum Angebot."
          text="Ohne Zahlungsdaten – Sie entscheiden nach dem Test."
          secondary={{ label: "Angebotsfunktionen ansehen", href: "/funktionen/angebote" }}
        />
      </div>
    </div>
  );
}

/**
 * Hilfeabschnitt v2 (10-UI-SPEC § 1.2, J6): section mit `data-abschnitt`, benannt über die H2 mit derselben id,
 * Fläche laut Flächenrhythmus, Inhaltsspalte 720 px. Ohne Lead-Satz, weil die Bestandsabschnitte keinen haben.
 * `notiz` setzt die Bestandsnotiz der früheren CTA-Aside als letztes Element (nur im letzten Abschnitt vor dem CTA-Band).
 */
export function CalculatorHelp({
  id,
  title,
  surface,
  notiz = false,
  children,
}: {
  id: string;
  title: string;
  surface: AbschnittFlaeche;
  notiz?: boolean;
  children: ReactNode;
}) {
  return (
    <Abschnitt id={id} surface={surface}>
      <h2 id={id} className={styles.helpTitle}>
        {title}
      </h2>
      <div className={styles.helpContent} data-surface={surface}>
        {children}
      </div>
      {notiz ? <CalculatorNotiz /> : null}
    </Abschnitt>
  );
}

/**
 * Bestandssatz der früheren CTA-Aside (K6, J8), wörtlich und ohne Link direkt über dem CTA-Band; das Ziel
 * /funktionen/angebote trägt der Sekundärlink des CTA-Bands.
 */
export function CalculatorNotiz() {
  return (
    <p data-notiz="" className={styles.notiz}>
      Lernen Sie die Angebotsfunktionen von CraftOS kennen und bringen Sie
      Ihre Aufträge ins System.
    </p>
  );
}

/**
 * Frühere CTA-Aside der Rechner. Seit Phase 10 nicht mehr gerendert (CtaBand + CalculatorNotiz); bleibt bis zur
 * Inhaberfreigabe erhalten (10-UI-SPEC § 12, Inhaberliste „Freigabe zum Entfernen nötig“).
 */
export function CalculatorCta() {
  return (
    <aside className={styles.ctaSection} aria-labelledby="calculator-cta-title">
      <div>
        <h2 id="calculator-cta-title">Von der Kalkulation zum Angebot.</h2>
        <p>
          Lernen Sie die Angebotsfunktionen von CraftOS kennen und bringen Sie
          Ihre Aufträge ins System.
        </p>
      </div>
      <Link href="/funktionen/angebote" className={styles.primaryLink}>
        Angebotsfunktionen ansehen
      </Link>
    </aside>
  );
}
