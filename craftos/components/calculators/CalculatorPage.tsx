import type { ReactNode } from "react";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { Breadcrumbs } from "@/components/v2/Breadcrumbs";
import { crumbsFor } from "@/lib/breadcrumbs";
import styles from "./Calculators.module.css";

export function CalculatorPage({
  title,
  intro,
  children,
  current,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  current?: "stundensatz" | "angebotskalkulation";
}) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.hero}>
          {/* Brotkrumen-Baustein (08-UI-SPEC § 1, C10): einzige BreadcrumbList der Rechnerseiten */}
          <div className={styles.crumbs}>
            <Breadcrumbs
              items={crumbsFor(current ? "/rechner/" + current : "/rechner")}
              tone="light"
            />
          </div>
          <h1>{title}</h1>
          <p className={styles.intro}>{intro}</p>
          <p className={styles.localPromise}>
            <LockKeyhole size={16} aria-hidden="true" />
            Kostenlos. Ohne Anmeldung. Ihre Zahlen bleiben im Browser.
          </p>
        </header>
        {current && (
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
        )}
        {children}
      </div>
    </div>
  );
}

export function CalculatorHelp({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.helpSection}>
      <h2>{title}</h2>
      <div className={styles.helpContent}>{children}</div>
    </section>
  );
}

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
