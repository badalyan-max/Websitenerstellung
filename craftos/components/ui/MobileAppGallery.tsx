"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./MobileAppGallery.module.css";

const media = [
  {
    id: "dashboard",
    label: "Überblick",
    alt: "Dashboard der aktuellen CraftOS Mobile-App mit 7:30 Stunden, drei Projekten und zwei offenen Zahlungen. Fiktive Beispieldaten.",
  },
  {
    id: "zeiten",
    label: "Zeiterfassung",
    alt: "Zeiterfassung der aktuellen CraftOS Mobile-App mit ruhendem Timer, Arbeits- und Fahrtzeit sowie gefüllter Tagesliste. Fiktive Beispieldaten.",
  },
  {
    id: "projekt",
    label: "Projektinfos",
    alt: "Projektinfos der aktuellen CraftOS Mobile-App mit Kunde, Kontakt, Budget und Beschreibung zum fiktiven Bad Bergmann.",
  },
];
export function MobileAppGallery() {
  const [selected, setSelected] = useState(0);
  const [original, setOriginal] = useState(false);
  const item = media[selected];
  return (
    <div className={styles.gallery}>
      <link
        rel="preload"
        as="image"
        type="image/avif"
        href="/images/mobile/current/dashboard-display.avif"
      />
      <div
        className={styles.choices}
        role="group"
        aria-label="App-Ansicht auswählen"
      >
        {media.map((m, index) => (
          <button
            key={m.id}
            onClick={() => setSelected(index)}
            aria-pressed={selected === index}
            className={selected === index ? styles.active : ""}
          >
            {m.label}
          </button>
        ))}
      </div>
      <figure className={styles.figure}>
        <picture>
          {!original && (
            <source
              type="image/avif"
              srcSet={"/images/mobile/current/" + item.id + "-display.avif"}
            />
          )}
          <Image
            src={
              "/images/mobile/current/" +
              item.id +
              (original ? "-original.png" : "-display.webp")
            }
            alt={
              item.alt +
              (original ? " Originalaufnahme." : " Als Handy-Mockup gestaltet.")
            }
            width={original ? 1170 : 887}
            height={original ? 2532 : 1774}
            loading="eager"
            unoptimized
            className={styles.image}
          />
        </picture>
        <figcaption aria-live="polite">
          {original
            ? "Originalaufnahme aus der aktuellen Mobile-App."
            : "Aktuelle Appaufnahme im Handy-Mockup."}{" "}
          Beispieldaten.
        </figcaption>
      </figure>
      <button
        className={styles.originalToggle}
        onClick={() => setOriginal(!original)}
        aria-pressed={original}
      >
        {original ? "Handy-Mockup zeigen" : "Originalaufnahme zeigen"}
      </button>
    </div>
  );
}
