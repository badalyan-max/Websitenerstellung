"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { LinkKarten } from "@/components/v2/LinkKarten";
import {
  categories,
  type ContentKind,
  type ContentSummary,
} from "@/lib/content-types";
type SearchItem = Pick<
  ContentSummary,
  "slug" | "title" | "description" | "category" | "readingMinutes"
>;

/** Leerer Zustand (09-UI-SPEC § 5): Überschrift und Text je Bereich; Hilfe verweist zusätzlich auf den Support. */
const LEER = {
  blog: {
    title: "Kein passender Artikel gefunden.",
    text: "Versuchen Sie einen kürzeren Suchbegriff oder wählen Sie alle Themen.",
  },
  hilfe: {
    title: "Keine passende Anleitung gefunden.",
    text: "Versuchen Sie einen kürzeren Suchbegriff, wählen Sie alle Themen oder fragen Sie den ",
  },
} as const;

const KARTE = {
  white: "border-[#e7dcc9] bg-white",
  warm: "border-[#e7dcc9] bg-[#f7f3eb]",
} as const;

/**
 * Suche und Themenfilter der Übersichten und Kategorien (09-UI-SPEC § 3, ContentSearch v2): einzige Client-Insel
 * der Wissensseiten, Filterlogik unverändert (Titel und Beschreibung, Thema). Ergebnisse als LinkKarten mit h3 –
 * dieselbe hookfreie Komponente wie auf den Server-Seiten; Eingaben erscheinen nie als HTML (T-09-11).
 */
export function ContentSearch({
  kind,
  items,
  initialCategory = "",
  surface = "white",
}: {
  kind: ContentKind;
  items: SearchItem[];
  initialCategory?: string;
  /** Kartenfläche – Gegenfläche zum Abschnitt (Übersicht Warm → Karten weiß, Kategorie Weiß → Karten warm). */
  surface?: "white" | "warm";
}) {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState(initialCategory);
  const filtered = useMemo(
    () =>
      items.filter(
        (a) =>
          (!category || a.category === category) &&
          `${a.title} ${a.description}`
            .toLocaleLowerCase("de")
            .includes(query.trim().toLocaleLowerCase("de")),
      ),
    [items, query, category],
  );
  const feld =
    "block min-h-12 w-full rounded-[6px] border border-[#777782] bg-white text-base text-[#17171c] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#bb7609]";
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-[1fr_280px]">
        <div>
          <label
            htmlFor="artikel-suche"
            className="mb-2 block text-sm leading-[1.4] font-semibold text-[#17171c]"
          >
            Artikel suchen
          </label>
          <div className="relative">
            <Search
              size={20}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#62626e]"
            />
            <input
              id="artikel-suche"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                kind === "hilfe"
                  ? "Zum Beispiel: Rechnung fertigstellen"
                  : "Zum Beispiel: Stundensatz"
              }
              className={`${feld} pr-4 pl-12`}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="artikel-kategorie"
            className="mb-2 block text-sm leading-[1.4] font-semibold text-[#17171c]"
          >
            Themenbereich
          </label>
          <div className="relative">
            {/* appearance-none: WebKit malt die native Auswahl sonst grau statt weiß (Sichtprüfung 390 px). */}
            <select
              id="artikel-kategorie"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${feld} appearance-none pr-12 pl-4`}
            >
              <option value="">Alle Themen</option>
              {Object.entries(categories[kind]).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
            <ChevronDown
              size={20}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#62626e]"
            />
          </div>
        </div>
      </div>
      <p role="status" className="my-6 text-sm leading-[1.4] text-[#62626e]">
        {filtered.length} Artikel gefunden
      </p>
      {filtered.length > 0 ? (
        <LinkKarten
          label={kind === "hilfe" ? "Gefundene Anleitungen" : "Gefundene Artikel"}
          surface={surface}
          items={filtered.map((a) => ({
            href: "/" + kind + "/" + a.slug,
            label: categories[kind][a.category],
            title: a.title,
            text: a.description,
            meta: `${a.readingMinutes} Min. Lesezeit`,
          }))}
        />
      ) : (
        <div className={`rounded-2xl border p-4 md:p-6 ${KARTE[surface]}`}>
          <h3 className="font-display text-xl leading-tight font-semibold text-[#17171c]">
            {LEER[kind].title}
          </h3>
          <p className="mt-2 max-w-[60ch] text-base leading-normal text-[#62626e]">
            {LEER[kind].text}
            {kind === "hilfe" ? (
              <>
                <Link href="/support" className="font-semibold text-[#784b10] underline underline-offset-4">
                  Support
                </Link>
                .
              </>
            ) : null}
          </p>
          <button
            type="button"
            className="mt-2 inline-flex min-h-11 items-center text-base font-semibold text-[#17171c] underline underline-offset-4"
            onClick={() => {
              setQuery("");
              setCategory("");
            }}
          >
            Suche zurücksetzen
          </button>
        </div>
      )}
    </div>
  );
}
