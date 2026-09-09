import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ProductDemo } from "../components/product-demo/ProductDemo";
import {
  createDemoState,
  demoReducer,
  getCalculation,
  getNextDemoAction,
  getProjectCosts,
  type DemoAction,
  type DemoState,
  type DemoSceneId,
} from "../lib/demo/machine";

const act = (state: DemoState, action: DemoAction) =>
  demoReducer(state, action);
const advance = (state: DemoState) =>
  act(state, { type: "advance", source: "autoplay" });

describe("Produktdemo: nachvollziehbare Beispielabläufe", () => {
  it("berechnet Nettofläche, Material, Arbeitszeit, Zuschlag und Steuer konsistent", () => {
    const calculation = getCalculation(createDemoState("angebot"));
    expect(calculation).toMatchObject({
      area: 42,
      material: 357,
      hours: 10.5,
      labor: 504,
      unitPrice: 24.6,
      net: 1033.2,
      tax: 196.31,
      gross: 1229.51,
    });
  });

  it("übernimmt bearbeitete Mengen und Preise in dieselbe Kalkulation", () => {
    let state = createDemoState("angebot");
    state = act(state, { type: "measurement", field: "area", value: "36" });
    state = act(state, { type: "measurement", field: "deduction", value: "4" });
    state = act(state, {
      type: "calculation",
      field: "material",
      value: "10,00",
    });
    expect(getCalculation(state)).toMatchObject({
      area: 32,
      material: 320,
      hours: 8,
      unitPrice: 26.4,
      net: 844.8,
    });
  });

  it("blockiert ungültige Maße statt negative oder NaN-Beträge anzuzeigen", () => {
    let state = createDemoState("angebot");
    state = act(state, {
      type: "measurement",
      field: "deduction",
      value: "49",
    });
    expect(getCalculation(state).valid).toBe(false);
    expect(advance(state).step).toBe(0);
    state = act(state, { type: "measurement", field: "area", value: "" });
    expect(getCalculation(state).valid).toBe(false);
    expect(Number.isFinite(getCalculation(state).net)).toBe(true);
  });

  it("vergibt die Rechnungsnummer ausschließlich beim Fertigstellen", () => {
    let state = createDemoState("rechnung");
    expect(act(state, { type: "finalize-invoice" }).invoice.number).toBeNull();
    state = act(state, { type: "create-invoice" });
    expect(state.invoice.number).toBeNull();
    state = act(state, { type: "review-invoice" });
    expect(state.invoice.number).toBeNull();
    state = act(state, { type: "finalize-invoice" });
    expect(state.invoice.number).toBe("RE-2026-0042");
    expect(state.invoice.status).toBe("final");
    expect(act(state, { type: "finalize-invoice" })).toEqual(state);
  });

  it("erzeugt ohne ausgewählten Bericht keinen Rechnungsentwurf", () => {
    const state = act(createDemoState("rechnung"), {
      type: "select-report",
      selected: false,
    });
    expect(act(state, { type: "create-invoice" }).invoice.status).toBe("none");
  });

  it("bucht die mobile Beispieldauer einmalig und aktualisiert die Nachkalkulation", () => {
    let state = createDemoState("planung");
    state = act(state, { type: "save-assignment" });
    state = act(state, { type: "move-assignment", day: "mi", member: "mila" });
    state = act(state, { type: "start-timer" });
    state = act(state, { type: "stop-timer" });
    expect(state.planning.loggedHours).toBe(3.5);
    expect(getProjectCosts(state)).toMatchObject({
      hours: 10.5,
      labor: 504,
      material: 357,
      total: 861,
    });
    expect(act(state, { type: "stop-timer" }).planning.loggedHours).toBe(3.5);
  });

  it("übernimmt eine vom Nutzer gewählte Person, einen Tag und eine Dauer", () => {
    let state = createDemoState("planung");
    state = act(state, {
      type: "planning-field",
      field: "member",
      value: "jonas",
    });
    state = act(state, { type: "planning-field", field: "day", value: "do" });
    state = act(state, { type: "planning-field", field: "hours", value: "2" });
    state = act(state, { type: "save-assignment" });
    expect(state.planning.assignment).toMatchObject({
      member: "jonas",
      day: "do",
      hours: 2,
    });
  });

  it("lässt Autoplay niemals den KI-Entwurf bestätigen", () => {
    let state = createDemoState("ki");
    state = advance(advance(state));
    expect(state.step).toBe(2);
    expect(state.ai.status).toBe("reviewed");
    expect(getNextDemoAction(state)).toBeNull();
    expect(advance(state).ai.savedHours).toBe(0);
    expect(
      act(state, { type: "confirm-ai", source: "autoplay" }).ai.savedHours,
    ).toBe(0);
    state = act(state, { type: "confirm-ai", source: "user" });
    expect(state.ai.status).toBe("confirmed");
    expect(state.ai.savedHours).toBe(3.5);
    expect(
      act(state, { type: "confirm-ai", source: "user" }).ai.savedHours,
    ).toBe(3.5);
  });

  it("verlangt nach Bearbeitung des KI-Entwurfs eine erneute Prüfung", () => {
    let state = advance(advance(createDemoState("ki")));
    state = act(state, { type: "ai-hours", value: "2" });
    expect(state.ai.status).toBe("draft");
    expect(act(state, { type: "confirm-ai" }).ai.savedHours).toBe(0);
    state = act(state, { type: "review-ai" });
    state = act(state, { type: "confirm-ai" });
    expect(state.ai.savedHours).toBe(2);
  });

  it("pausiert bei Eingriffen und setzt die Szene vollständig zurück", () => {
    let state = act(createDemoState("angebot"), { type: "play" });
    expect(state.playing).toBe(true);
    state = act(state, { type: "measurement", field: "area", value: "70" });
    expect(state.playing).toBe(false);
    state = act(state, { type: "reset" });
    expect(state.measurement.area).toBe("48");
    expect(state.step).toBe(0);
    expect(state.playing).toBe(false);
  });

  it("aktiviert bei reduzierter Bewegung kein automatisches Abspielen", () => {
    let state = act(createDemoState("dashboard"), {
      type: "motion-preference",
      reduced: true,
    });
    expect(state.playing).toBe(false);
    state = act(state, { type: "play" });
    expect(state.playing).toBe(false);
    expect(act(state, { type: "advance", source: "user" }).step).toBe(1);
  });

  it("übernimmt korrigierte Belegdaten und die gewählte Projektzuordnung", () => {
    let state = act(createDemoState("beleg"), { type: "scan-receipt" });
    state = act(state, {
      type: "receipt-field",
      field: "net",
      value: "400,50",
    });
    state = act(state, {
      type: "receipt-field",
      field: "supplier",
      value: "Beispielhandel",
    });
    state = act(state, { type: "review-receipt" });
    state = act(state, {
      type: "receipt-field",
      field: "project",
      value: "weber",
    });
    state = act(state, { type: "assign-receipt" });
    expect(state.receipt).toMatchObject({
      net: "400,50",
      supplier: "Beispielhandel",
      project: "weber",
      assigned: true,
    });
    expect(state.step).toBe(3);
  });

  it("verlangt nach einer Belegkorrektur eine neue Prüfung", () => {
    let state = advance(advance(createDemoState("beleg")));
    state = act(state, { type: "receipt-field", field: "net", value: "400" });
    expect(state.step).toBe(1);
    expect(act(state, { type: "assign-receipt" }).receipt.assigned).toBe(false);
  });

  it("benutzt bei Nächster Schritt den manuell vorgemerkten Einsatztag", () => {
    let state = act(createDemoState("planung"), { type: "save-assignment" });
    state = act(state, { type: "planning-field", field: "day", value: "fr" });
    state = advance(state);
    expect(state.planning.assignment?.day).toBe("fr");
  });

  it.each(["dashboard", "angebot", "planung", "rechnung", "beleg"] as const)(
    "führt die Szene %s über die gemeinsamen Transitions bis zum Ende",
    (scene) => {
      let state = act(createDemoState(scene), { type: "play" });
      for (let i = 0; i < 8 && getNextDemoAction(state); i++)
        state = advance(state);
      expect(getNextDemoAction(state)).toBeNull();
      expect(state.playing).toBe(false);
    },
  );

  it("setzt beim Szenenwechsel auch bestätigte Daten der alten Beispieldemo zurück", () => {
    let state = advance(advance(createDemoState("ki")));
    state = act(state, { type: "confirm-ai" });
    state = act(state, { type: "scene", scene: "planung" });
    expect(state.ai.savedHours).toBe(0);
    expect(state.planning.assignment).toBeNull();
    expect(state.step).toBe(0);
  });

  it.each<DemoSceneId>([
    "dashboard",
    "angebot",
    "planung",
    "rechnung",
    "beleg",
    "ki",
  ])("rendert %s serverseitig mit erreichbarer Steuerung", (scene) => {
    const html = renderToStaticMarkup(
      createElement(ProductDemo, { initialScene: scene }),
    );
    expect(html).toContain("Interaktive Beispieldemo");
    expect(html).toContain("Produktdemo auswählen");
    expect(html).toContain("Nächster Schritt");
    expect(html).toContain("Diese Demo wiederholen");
    expect(html).not.toContain("NaN");
  });

  it("öffnet den geprüften KI-Entwurf zur Korrektur und verlangt danach eine erneute Prüfung", () => {
    let state = advance(advance(createDemoState("ki")));
    state = act(state, { type: "edit-ai-draft" });
    expect(state.step).toBe(1);
    expect(state.ai.status).toBe("draft");
    expect(act(state, { type: "confirm-ai" }).ai.savedHours).toBe(0);
    state = act(state, { type: "ai-hours", value: "2" });
    state = advance(state);
    state = act(state, { type: "confirm-ai" });
    expect(state.ai.savedHours).toBe(2);
  });
});
