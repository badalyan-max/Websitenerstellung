/**
 * Zitatprüfung von scripts/content-pruefen.mjs (09-REVIEW HI-01): Ein Zitat gilt nur als belegt, wenn es in einem
 * Nutzer-Oberflächentext des Releases steht – JSX-Text, String-Literal einer Quelldatei oder Wert einer deutschen
 * Sprachdatei. Kommentare, Tests, Mocks und Fixtures zählen nicht. Menüpfade mit „→“ werden je Segment als ganzes
 * Label geprüft.
 */
import { describe, expect, it } from "vitest";
import {
  FREISCHALTUNG,
  istUiQuelle,
  uiTexte,
  zitatBelegt,
  zitateAus,
} from "../scripts/lib/zitat-belege.mjs";

describe("istUiQuelle", () => {
  it("nimmt Quelltexte und deutsche Sprachdateien, keine Tests, Mocks, Fixtures oder Stories", () => {
    expect(istUiQuelle("src/pages/Kassenbuch.tsx")).toBe(true);
    expect(istUiQuelle("src/lib/cashBook.ts")).toBe(true);
    expect(istUiQuelle("src/shared/i18n/locales/de/time.json")).toBe(true);
    expect(istUiQuelle("supabase/functions/send-email/index.ts")).toBe(true);
    expect(istUiQuelle("src/shared/i18n/locales/en/time.json")).toBe(false);
    expect(istUiQuelle("src/shared/backend/edge-functions.generated.json")).toBe(false);
    expect(istUiQuelle("src/pages/Kassenbuch.test.tsx")).toBe(false);
    expect(istUiQuelle("src/pages/__tests__/Kassenbuch.tsx")).toBe(false);
    expect(istUiQuelle("src/pages/__mocks__/Kassenbuch.tsx")).toBe(false);
    expect(istUiQuelle("src/lib/__fixtures__/a.ts")).toBe(false);
    expect(istUiQuelle("src/test/fixtures/x/DemoBadge.tsx.txt")).toBe(false);
    expect(istUiQuelle("src/components/Button.stories.tsx")).toBe(false);
    expect(istUiQuelle("src/types/global.d.ts")).toBe(false);
    expect(istUiQuelle("src/components/projects/ProjectDialog.tsx.template")).toBe(false);
  });
});

describe("uiTexte", () => {
  it("liest JSX-Text, Attribut- und String-Literale, aber keine Kommentare und kein JSDoc", () => {
    const quelle = [
      "/**",
      " * Aktionsleiste, z. B. „Zeiteintrag speichern“.",
      " */",
      "// Kasse eröffnen (Kommentar)",
      'import { Button } from "@/components/ui/button";',
      "export function Leiste({ n }: { n: number }) {",
      '  const titel = "Kassensturz";',
      "  return (",
      '    <Button aria-label="Zählprotokoll (Stückzahl)">',
      "      Mehr als in der",
      "      Kasse ist.",
      "      {`Noch ${n} Einträge`}",
      "    </Button>",
      "  );",
      "}",
    ].join("\n");
    const texte = uiTexte("src/components/Leiste.tsx", quelle);
    expect(texte).toContain("Kassensturz");
    expect(texte).toContain("Zählprotokoll (Stückzahl)");
    expect(texte).toContain("Mehr als in der Kasse ist.");
    expect(texte).toContain("Noch ");
    expect(texte.join("\n")).not.toContain("Zeiteintrag speichern");
    expect(texte.join("\n")).not.toContain("Kasse eröffnen");
    expect(texte).not.toContain("@/components/ui/button");
  });

  it("liest TypeScript-Dateien ohne JSX (Typumwandlungen mit spitzen Klammern bleiben gültig)", () => {
    const quelle = 'const a = <string>wert;\nexport const LABEL = "Kasse eröffnen"; // Kommentar „Bank“';
    expect(uiTexte("src/lib/cashBook.ts", quelle)).toEqual(["Kasse eröffnen"]);
  });

  it("liest Werte deutscher Sprachdateien, keine Schlüssel", () => {
    const json = JSON.stringify({ entry: { save: "Zeiteintrag speichern", nested: { title: "Zeiten" } } });
    const texte = uiTexte("src/shared/i18n/locales/de/time.json", json);
    expect(texte).toEqual(["Zeiteintrag speichern", "Zeiten"]);
    expect(texte).not.toContain("save");
  });

  it("liefert für kaputtes JSON und fremde Dateitypen nichts", () => {
    expect(uiTexte("src/shared/i18n/locales/de/x.json", "{kaputt")).toEqual([]);
    expect(uiTexte("src/styles/app.css", '.a::after { content: "Kasse"; }')).toEqual([]);
  });
});

describe("zitateAus", () => {
  it("liest „…“-Zitate und erkennt Menüpfade", () => {
    expect(zitateAus("Öffnen Sie „Bank → Kasse“ und tippen Sie „Kasse eröffnen“.")).toEqual([
      { ganz: "Bank → Kasse", teile: ["Bank", "Kasse"] },
      { ganz: "Kasse eröffnen", teile: ["Kasse eröffnen"] },
    ]);
  });
});

describe("zitatBelegt", () => {
  const texte = ["Bank", "Kasse", "Kasse eröffnen", "Kassenbuch", "Mehr als in der Kasse ist."];

  it("einfaches Zitat: Teil eines Oberflächentexts genügt", () => {
    expect(zitatBelegt({ ganz: "Kasse eröffnen", teile: ["Kasse eröffnen"] }, texte)).toBe(true);
    expect(zitatBelegt({ ganz: "in der Kasse", teile: ["in der Kasse"] }, texte)).toBe(true);
    expect(zitatBelegt({ ganz: "Kasse schließen", teile: ["Kasse schließen"] }, texte)).toBe(false);
  });

  it("Menüpfad: jedes Segment muss ein ganzes Label sein", () => {
    expect(zitatBelegt({ ganz: "Bank → Kasse", teile: ["Bank", "Kasse"] }, texte)).toBe(true);
    // „Kassenbu“ steht nur als Teil von „Kassenbuch“ – kein ganzes Label
    expect(zitatBelegt({ ganz: "Bank → Kassenbu", teile: ["Bank", "Kassenbu"] }, texte)).toBe(false);
    expect(zitatBelegt({ ganz: "Ban → Kasse", teile: ["Ban", "Kasse"] }, texte)).toBe(false);
  });

  it("Menüpfad, der selbst als Ganzes ein Text ist, gilt als belegt", () => {
    expect(zitatBelegt({ ganz: "Datei → Export", teile: ["Datei", "Export"] }, ["Datei → Export"])).toBe(true);
  });

  it("Leerraum wird wie auf der Seite zusammengefasst", () => {
    expect(zitatBelegt({ ganz: "Kasse eröffnen", teile: ["Kasse eröffnen"] }, ["Kasse\n   eröffnen"])).toBe(true);
  });
});

describe("FREISCHALTUNG (Heuristik)", () => {
  it("erkennt Entwickler- und Feature-Abfragen im Dateiinhalt", () => {
    expect(FREISCHALTUNG.test("const { isDeveloper } = useAuth();")).toBe(true);
    expect(FREISCHALTUNG.test("if (usePlatformDeveloper()) {")).toBe(true);
    expect(FREISCHALTUNG.test("isFeatureEnabled('ai')")).toBe(true);
    expect(FREISCHALTUNG.test("const developerMode = false;")).toBe(false);
  });
});
