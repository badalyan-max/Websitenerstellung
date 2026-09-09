import type { SnippetExample } from "./snippet-examples";

// Fictional excerpts illustrating software interactions, not complete quotations
// or recommended trade prices. The project and work match the adjacent trade story.
export const tradeSnippetExamples: Record<string, SnippetExample | undefined> = {
  elektriker: {
    id: "elektriker", variant: "planung", project: "Elektroanlage Familie Braun",
    activity: "Zählerschrank montieren",
  },
  shk: {
    id: "shk", variant: "planung", project: "Bad Familie Weber",
    activity: "Sanitärobjekte montieren",
  },
  maler: {
    id: "maler", variant: "angebot", project: "Altbauwohnung Familie Becker",
    positions: [
      { title: "Wände streichen", quantity: 35, unit: "m²", unitPriceCents: 1050 },
      { title: "Untergrund vorbereiten", quantity: 35, unit: "m²", unitPriceCents: 400 },
      { title: "Decken streichen", quantity: 20, unit: "m²", unitPriceCents: 1200 },
    ],
  },
  "tischler-schreiner": {
    id: "tischler-schreiner", variant: "planung", project: "Einbauschrank Familie Hoffmann",
    activity: "Einbauschrank montieren",
  },
  dachdecker: {
    id: "dachdecker", variant: "planung", project: "Dachsanierung Familie Schulz",
    activity: "Dachziegel verlegen",
  },
  fliesenleger: {
    id: "fliesenleger", variant: "angebot", project: "Bad Familie Weber",
    positions: [
      { title: "Wandfliesen verlegen", quantity: 12, unit: "m²", unitPriceCents: 4800 },
      { title: "Abdichtung im Duschbereich", quantity: 6, unit: "m²", unitPriceCents: 2200 },
      { title: "Fliesen verfugen", quantity: 12, unit: "m²", unitPriceCents: 900 },
    ],
  },
  zimmerer: {
    id: "zimmerer", variant: "planung", project: "Dachstuhl Familie Berger",
    activity: "Sparren montieren",
  },
  galabau: {
    id: "galabau", variant: "planung", project: "Hofeinfahrt Familie Neumann",
    activity: "Pflastersteine verlegen",
  },
  trockenbau: {
    id: "trockenbau", variant: "angebot", project: "Büroumbau Muster GmbH",
    positions: [
      { title: "Ständerwand montieren", quantity: 20, unit: "m²", unitPriceCents: 4500 },
      { title: "Dämmung einlegen", quantity: 20, unit: "m²", unitPriceCents: 1200 },
      { title: "Fugen verspachteln", quantity: 40, unit: "m²", unitPriceCents: 800 },
    ],
  },
  metallbau: {
    id: "metallbau", variant: "planung", project: "Treppenhaus Familie Wolf",
    activity: "Geländer montieren",
  },
  bauunternehmen: {
    id: "bauunternehmen", variant: "planung", project: "Gewerbeumbau Muster GmbH",
    activity: "Baustelleneinrichtung aufbauen",
  },
  allrounder: {
    id: "allrounder", variant: "planung", project: "Wohnanlage Lindenhof",
    activity: "Türbeschläge instand setzen",
  },
};
