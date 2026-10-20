"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./MobileAppGallery.module.css";

interface Variant {
  avif: string;
  webp: string;
  width: number;
  height: number;
}

interface GalleryItem {
  id: string;
  label: string;
  alt: string;
  /** KI-gestaltetes Handy-Mockup um die echte App-Aufnahme (docs/MOBILE-MOCKUPS.md). */
  mockup: Variant;
  /** Unveränderte App-Aufnahme, als AVIF/WebP ≤ 150 KB (scripts/optimize-images.mjs). */
  original: Variant;
}

/** Vollständige, statische Pfade je Ansicht, damit das Medienbudget jede Datei prüfen kann. */
const media: GalleryItem[] = [
  {
    id: "dashboard",
    label: "Überblick",
    alt: "Dashboard der aktuellen CraftOS Mobile-App mit 7:30 Stunden, drei Projekten und zwei offenen Zahlungen. Fiktive Beispieldaten.",
    mockup: {
      avif: "/images/mobile/current/dashboard-display.avif",
      webp: "/images/mobile/current/dashboard-display.webp",
      width: 887,
      height: 1774,
    },
    original: {
      avif: "/images/mobile/current/dashboard-original.avif",
      webp: "/images/mobile/current/dashboard-original.webp",
      width: 1170,
      height: 2532,
    },
  },
  {
    id: "zeiten",
    label: "Zeiterfassung",
    alt: "Zeiterfassung der aktuellen CraftOS Mobile-App mit ruhendem Timer, Arbeits- und Fahrtzeit sowie gefüllter Tagesliste. Fiktive Beispieldaten.",
    mockup: {
      avif: "/images/mobile/current/zeiten-display.avif",
      webp: "/images/mobile/current/zeiten-display.webp",
      width: 887,
      height: 1774,
    },
    original: {
      avif: "/images/mobile/current/zeiten-original.avif",
      webp: "/images/mobile/current/zeiten-original.webp",
      width: 1170,
      height: 2532,
    },
  },
  {
    id: "projekt",
    label: "Projektinfos",
    alt: "Projektinfos der aktuellen CraftOS Mobile-App mit Kunde, Kontakt, Budget und Beschreibung zum fiktiven Bad Bergmann.",
    mockup: {
      avif: "/images/mobile/current/projekt-display.avif",
      webp: "/images/mobile/current/projekt-display.webp",
      width: 887,
      height: 1774,
    },
    original: {
      avif: "/images/mobile/current/projekt-original.avif",
      webp: "/images/mobile/current/projekt-original.webp",
      width: 1170,
      height: 2532,
    },
  },
];

/** Kennzeichnung nach D-04/MEDIA-03 mit Aufnahmedatum (docs/MOBILE-MOCKUPS.md). */
const captions = {
  mockup: "Darstellung, KI-gestaltet: App-Aufnahme vom 9. September 2026 im Handy-Mockup.",
  original: "Originalaufnahme der Mobile-App vom 9. September 2026.",
} as const;

export function MobileAppGallery() {
  const [selected, setSelected] = useState(0);
  const [original, setOriginal] = useState(false);
  const item = media[selected];
  const variant = original ? item.original : item.mockup;
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
        <picture key={variant.avif}>
          <source type="image/avif" srcSet={variant.avif} />
          <Image
            src={variant.webp}
            alt={
              item.alt +
              (original ? " Originalaufnahme." : " Als Handy-Mockup gestaltet.")
            }
            width={variant.width}
            height={variant.height}
            loading="eager"
            unoptimized
            className={styles.image}
          />
        </picture>
        <figcaption aria-live="polite">
          {`${original ? captions.original : captions.mockup} Beispieldaten.`}
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
