"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Laptop, Smartphone } from "lucide-react";
import { tarife, site } from "@/lib/site";
import styles from "./PricingTable.module.css";

const euro = (value: number) =>
  new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

function displayCopy(value: string) {
  const text = value
    .replaceAll("Web-App", "Webapp")
    .replaceAll("Mobile-App", "mobile App")
    .replaceAll("Handy-App", "mobile App")
    .replaceAll("Voll-Lizenz", "Volllizenz")
    .replaceAll("App-Lizenz", "mobile Lizenz");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function PricingTable() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className={styles.pricing}>
      <div className={styles.billingHeader}>
        <div
          className={styles.toggle}
          role="group"
          aria-label="Abrechnung wählen"
        >
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={!annual ? styles.selected : undefined}
          >
            Monatlich
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={annual ? styles.selected : undefined}
          >
            Jährlich
          </button>
        </div>
        <p className={styles.saving}>
          <span>Rund 17 % sparen</span>mit jährlicher Abrechnung
        </p>
      </div>

      <div className={styles.cards}>
        {[...tarife].reverse().map((tariff) => {
          const isFull = tariff.id === "voll";
          const name = isFull ? "Volllizenz" : "Mobile Lizenz";

          return (
            <article
              key={tariff.id}
              className={`${styles.card} ${isFull ? styles.fullCard : styles.mobileCard}`}
              aria-labelledby={`tariff-${tariff.id}`}
            >
              <header className={styles.cardHeader}>
                <div className={styles.platform}>
                  <span className={styles.platformIcon} aria-hidden="true">
                    {isFull ? (
                      <Laptop size={23} strokeWidth={1.7} />
                    ) : (
                      <Smartphone size={23} strokeWidth={1.7} />
                    )}
                  </span>
                  <span>
                    {isFull
                      ? "Webapp und mobile App inklusive"
                      : "Für Ihr Team auf der Baustelle"}
                  </span>
                </div>
                <h3 id={`tariff-${tariff.id}`}>{name}</h3>
                <p className={styles.audience}>{displayCopy(tariff.fuer)}</p>
              </header>

              <div className={styles.priceBlock}>
                <div
                  className={styles.price}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <strong>
                    {euro(annual ? tariff.jahr / 12 : tariff.monat)}
                    <span className={styles.currency}>€</span>
                  </strong>
                  <span className={styles.priceUnit}>
                    pro Person
                    <br />
                    und Monat
                  </span>
                  <span className={styles.srOnly}>
                    {annual
                      ? ", bei jährlicher Abrechnung"
                      : ", bei monatlicher Abrechnung"}
                  </span>
                </div>
                <p className={styles.billingDetail}>
                  {annual ? (
                    <>
                      <strong>{euro(tariff.jahr)} €</strong> jährlich im Voraus
                    </>
                  ) : (
                    <>
                      Oder <strong>{euro(tariff.jahr)} €</strong> jährlich im
                      Voraus
                    </>
                  )}
                </p>
                <p className={styles.tax}>
                  Alle Preise netto, zzgl. gesetzlicher Umsatzsteuer.
                </p>
              </div>

              <ul className={styles.features}>
                {tariff.highlights.map((highlight) => (
                  <li key={highlight}>
                    <Check size={17} strokeWidth={2.4} aria-hidden="true" />
                    <span>{displayCopy(highlight)}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.cardFooter}>
                <a href={site.ctaUrl} className={styles.cta}>
                  10 Tage kostenlos testen
                  <ArrowUpRight size={19} aria-hidden="true" />
                </a>
                <p>Ohne Zahlungsdaten</p>
              </div>
            </article>
          );
        })}
      </div>

      <p className={styles.terms}>
        Ein Betrieb benötigt mindestens eine Volllizenz für die Administration.
        Zugriffsrechte werden je Rolle vergeben. Craft AI und Belegscans mit KI
        werden nach Verbrauch über Credits abgerechnet; erweiterter Speicher
        kann zusätzlich kosten.
      </p>
    </div>
  );
}
