"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import {
  categories,
  type ContentKind,
  type ContentSummary,
} from "@/lib/content-types";
type SearchItem = Pick<
  ContentSummary,
  "slug" | "title" | "description" | "category" | "readingMinutes"
>;
export function ContentSearch({
  kind,
  items,
  initialCategory = "",
}: {
  kind: ContentKind;
  items: SearchItem[];
  initialCategory?: string;
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
  return (
    <div>
      <div className="grid sm:grid-cols-[1fr_260px] gap-4">
        <div>
          <label
            htmlFor="artikel-suche"
            className="block text-sm font-semibold mb-2"
          >
            Artikel suchen
          </label>
          <div className="relative">
            <Search size={19} className="absolute left-4 top-4 text-ink-500" />
            <input
              id="artikel-suche"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                kind === "hilfe"
                  ? "Zum Beispiel: Rechnung fertigstellen"
                  : "Zum Beispiel: Stundensatz"
              }
              className="w-full rounded-lg border border-ink-300 pl-12 pr-4 py-3.5 bg-white"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="artikel-kategorie"
            className="block text-sm font-semibold mb-2"
          >
            Themenbereich
          </label>
          <select
            id="artikel-kategorie"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-ink-300 p-3.5 bg-white"
          >
            <option value="">Alle Themen</option>
            {Object.entries(categories[kind]).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p role="status" className="my-6 text-sm text-ink-500">
        {filtered.length} {filtered.length === 1 ? "Artikel" : "Artikel"}{" "}
        gefunden
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8">
        {filtered.map((a) => (
          <Link
            href={"/" + kind + "/" + a.slug}
            key={a.slug}
            className="border-t border-ink-200 py-7 group"
          >
            <p className="text-xs text-primary-800 font-semibold">
              {categories[kind][a.category]} · {a.readingMinutes} Min.
            </p>
            <h2 className="text-2xl font-semibold mt-4 group-hover:text-primary-800">
              {a.title}
            </h2>
            <p className="text-sm text-ink-600 mt-4">{a.description}</p>
            <span className="inline-flex gap-2 items-center text-sm font-semibold mt-5">
              {kind === "hilfe" ? "Anleitung öffnen" : "Artikel lesen"}
              <ArrowUpRight size={16} />
            </span>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="soft-panel">
          <h2 className="text-xl">Kein passender Artikel gefunden.</h2>
          <p className="mt-3">
            Versuchen Sie einen kürzeren Suchbegriff oder wählen Sie alle
            Themen.
          </p>
          <button
            className="btn-secondary mt-4"
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
