import {
  DEMO_DAYS,
  DEMO_MEMBERS,
  DEMO_PROJECT,
  DEMO_PROJECTS,
  type DemoDay,
  type DemoMember,
} from "./data";

export type DemoSceneId =
  | "dashboard"
  | "angebot"
  | "planung"
  | "rechnung"
  | "beleg"
  | "ki";

export const DEMO_SCENES: {
  id: DemoSceneId;
  label: string;
  title: string;
  steps: string[];
  explanations: string[];
}[] = [
  {
    id: "dashboard",
    label: "Überblick",
    title: "Ihr Betrieb auf einen Blick",
    steps: ["Überblick", "Projekt", "Kosten"],
    explanations: [
      "Umsatz, offene Aufgaben und laufende Projekte stehen im selben Überblick.",
      "Ein Projekt bündelt Kunde, Termine, Dokumente und den Stand der Arbeiten.",
      "Erfasste Zeiten und zugeordnetes Material machen die Kosten nachvollziehbar.",
    ],
  },
  {
    id: "angebot",
    label: "Kalkulation",
    title: "Vom Aufmaß zum Angebot",
    steps: ["Aufmaß", "Menge", "Kalkulation", "Vorschau"],
    explanations: [
      "Erfassen Sie eine Wandfläche und die abzuziehenden Öffnungen.",
      "Die Nettofläche wird als Menge der Angebotsposition übernommen.",
      "Material, Zeitansatz, Lohn und Zuschlag ergeben den kalkulierten Einheitspreis.",
      "Die Angebotsvorschau verwendet genau die erfasste Menge und Kalkulation.",
    ],
  },
  {
    id: "planung",
    label: "Planung",
    title: "Büro und Baustelle arbeiten zusammen",
    steps: ["Einsatz", "Zuordnung", "Verschieben", "Mobile Zeit", "Kosten"],
    explanations: [
      "Planen Sie einen Einsatz mit Person, Tag und Dauer.",
      "Der Einsatz steht bei der zugewiesenen Person in der Plantafel.",
      "Verschieben Sie den Einsatz über die Felder oder per Drag & Drop.",
      "Die mobile Zeiterfassung ordnet Arbeitszeit dem Projekt zu; die Uhr ist hier vorgespult.",
      "Die gebuchte Beispieldauer ergänzt die bereits erfassten Projektstunden.",
    ],
  },
  {
    id: "rechnung",
    label: "Rechnung",
    title: "Aus dokumentierter Arbeit wird eine Rechnung",
    steps: ["Bericht", "Entwurf", "Prüfen", "Fertigstellen"],
    explanations: [
      "Wählen Sie die dokumentierte Leistung aus dem fertigen Bautagesbericht.",
      "Aus den ausgewählten Leistungen entsteht ein Rechnungsentwurf ohne Rechnungsnummer.",
      "Prüfen Sie Kunde, Leistung, Menge und Betrag vor dem Fertigstellen.",
      "Erst beim Fertigstellen erhält die Rechnung ihre eindeutige Nummer.",
    ],
  },
  {
    id: "beleg",
    label: "Belegscan",
    title: "Belege erfassen, Angaben prüfen",
    steps: ["Beleg", "Angaben", "Projekt", "Buchhaltung"],
    explanations: [
      "Der fiktive Materialbeleg bildet den Eingang für dieses Beispiel.",
      "Prüfen und korrigieren Sie die erkannten Angaben, bevor etwas übernommen wird.",
      "Ordnen Sie den geprüften Beleg dem passenden Projekt zu.",
      "Der zugeordnete Beleg kann in der Buchhaltung kontiert und für DATEV vorbereitet werden.",
    ],
  },
  {
    id: "ki",
    label: "Craft AI",
    title: "Die KI bereitet vor. Sie entscheiden.",
    steps: ["Anfrage", "Entwurf", "Prüfen", "Bestätigt"],
    explanations: [
      "Diese lokale Beispieldemo versteht Zeitanfragen mit einer Stundenangabe; sie verwendet keine echte KI.",
      "Craft AI schlägt einen Zeiteintrag vor. Es wurde noch nichts angelegt.",
      "Prüfen Sie den Vorschlag; Autoplay wartet hier auf Ihre ausdrückliche Bestätigung.",
      "Ihr bestätigter Zeiteintrag ist als Entwurf angelegt und kann in CraftOS weiterbearbeitet werden.",
    ],
  },
];

export interface DemoState {
  scene: DemoSceneId;
  step: number;
  playing: boolean;
  reducedMotion: boolean;
  motionReady: boolean;
  dashboard: {
    query: string;
    period: "half" | "quarter";
    project: string;
    tab: "overview" | "costs";
  };
  measurement: { area: string; deduction: string };
  calculation: {
    material: string;
    hours: string;
    wage: string;
    markup: string;
  };
  planning: {
    member: DemoMember;
    day: DemoDay;
    hours: string;
    assignment: { member: DemoMember; day: DemoDay; hours: number } | null;
    timer: "idle" | "running" | "stopped";
    loggedHours: number;
  };
  invoice: {
    selected: boolean;
    status: "none" | "draft" | "reviewed" | "final";
    number: string | null;
  };
  receipt: {
    supplier: string;
    reference: string;
    net: string;
    project: string;
    assigned: boolean;
  };
  ai: {
    prompt: string;
    hours: string;
    status: "idle" | "draft" | "reviewed" | "confirmed";
    savedHours: number;
  };
}

type Source = { source?: "user" | "autoplay" };
export type DemoAction = Source &
  (
    | { type: "scene"; scene: DemoSceneId }
    | { type: "reset" | "play" | "pause" | "advance" }
    | { type: "motion-preference"; reduced: boolean }
    | { type: "dashboard-query"; value: string }
    | { type: "dashboard-period"; period: "half" | "quarter" }
    | { type: "open-project"; project: string }
    | { type: "project-tab"; tab: "overview" | "costs" }
    | {
        type: "measurement";
        field: keyof DemoState["measurement"];
        value: string;
      }
    | {
        type: "calculation";
        field: keyof DemoState["calculation"];
        value: string;
      }
    | { type: "save-measurement" | "calculate" | "preview-offer" }
    | {
        type: "planning-field";
        field: "member" | "day" | "hours";
        value: string;
      }
    | { type: "save-assignment" | "start-timer" | "stop-timer" }
    | { type: "move-assignment"; day: DemoDay; member: DemoMember }
    | { type: "select-report"; selected: boolean }
    | { type: "create-invoice" | "review-invoice" | "finalize-invoice" }
    | { type: "scan-receipt" | "review-receipt" | "assign-receipt" }
    | {
        type: "receipt-field";
        field: "supplier" | "reference" | "net" | "project";
        value: string;
      }
    | { type: "ai-prompt" | "ai-hours"; value: string }
    | { type: "create-ai-draft" | "review-ai" | "confirm-ai" | "edit-ai-draft" }
  );

export function createDemoState(scene: DemoSceneId = "dashboard"): DemoState {
  return {
    scene,
    step: 0,
    playing: false,
    reducedMotion: false,
    motionReady: false,
    dashboard: {
      query: "",
      period: "half",
      project: "krause",
      tab: "overview",
    },
    measurement: { area: "48", deduction: "6" },
    calculation: { material: "8,50", hours: "0,25", wage: "48", markup: "20" },
    planning: {
      member: "mila",
      day: "di",
      hours: "3,5",
      assignment: null,
      timer: "idle",
      loggedHours: 0,
    },
    invoice: { selected: true, status: "none", number: null },
    receipt: {
      supplier: "Baukontor Berlin",
      reference: "BK-2084",
      net: "357,00",
      project: "krause",
      assigned: false,
    },
    ai: {
      prompt:
        "Bereite 3,5 Stunden Wandanstrich für Umbau Bäckerei Krause als Zeiteintrag vor.",
      hours: "3,5",
      status: "idle",
      savedHours: 0,
    },
  };
}

export function decimal(value: string): number {
  if (!value.trim() || !/^\d+(?:[.,]\d*)?$/.test(value.trim()))
    return Number.NaN;
  return Number(value.trim().replace(",", "."));
}

const money = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
const usable = (n: number) => Number.isFinite(n) && n >= 0 && n <= 100000;

export function getCalculation(state: DemoState) {
  const grossArea = decimal(state.measurement.area);
  const deduction = decimal(state.measurement.deduction);
  const materialRate = decimal(state.calculation.material);
  const timeRate = decimal(state.calculation.hours);
  const wage = decimal(state.calculation.wage);
  const markup = decimal(state.calculation.markup);
  const measurementValid =
    usable(grossArea) &&
    grossArea > 0 &&
    usable(deduction) &&
    deduction < grossArea;
  const valid =
    measurementValid &&
    [materialRate, timeRate, wage, markup].every(usable) &&
    markup <= 100 &&
    timeRate <= 24 &&
    wage > 0;
  const area = measurementValid ? money(grossArea - deduction) : 0;
  const material = valid ? money(area * materialRate) : 0;
  const hours = valid ? money(area * timeRate) : 0;
  const labor = valid ? money(hours * wage) : 0;
  const unitPrice = valid
    ? money((materialRate + timeRate * wage) * (1 + markup / 100))
    : 0;
  const net = money(area * unitPrice);
  const tax = money(net * 0.19);
  return {
    valid,
    measurementValid,
    area,
    material,
    hours,
    labor,
    unitPrice,
    net,
    tax,
    gross: money(net + tax),
    markup: money(net - material - labor),
  };
}

export function getProjectCosts(state: DemoState) {
  const hours = money(
    DEMO_PROJECT.baseHours + state.planning.loggedHours + state.ai.savedHours,
  );
  const labor = money(hours * DEMO_PROJECT.hourlyCost);
  return {
    hours,
    labor,
    material: DEMO_PROJECT.materialCost,
    total: money(labor + DEMO_PROJECT.materialCost),
  };
}

export function validPlanningHours(value: string): boolean {
  const hours = decimal(value);
  return Number.isFinite(hours) && hours > 0 && hours <= 12;
}

export function getPromptHours(prompt: string): string | null {
  const match = prompt.match(/(\d+(?:[.,]\d+)?)\s*(?:stunden?|std\.?|h\b)/i);
  return match && validPlanningHours(match[1]) ? match[1] : null;
}

export function getNextDemoAction(state: DemoState): DemoAction | null {
  switch (state.scene) {
    case "dashboard":
      return state.step === 0
        ? { type: "open-project", project: "krause" }
        : state.step === 1
          ? { type: "project-tab", tab: "costs" }
          : null;
    case "angebot":
      return (
        ([
          { type: "save-measurement" },
          { type: "calculate" },
          { type: "preview-offer" },
        ][state.step] as DemoAction | undefined) ?? null
      );
    case "planung":
      return (
        ([
          { type: "save-assignment" },
          {
            type: "move-assignment",
            day:
              state.planning.day !== state.planning.assignment?.day
                ? state.planning.day
                : state.planning.day === "mi"
                  ? "do"
                  : "mi",
            member: state.planning.member,
          },
          { type: "start-timer" },
          { type: "stop-timer" },
        ][state.step] as DemoAction | undefined) ?? null
      );
    case "rechnung":
      return (
        ([
          { type: "create-invoice" },
          { type: "review-invoice" },
          { type: "finalize-invoice" },
        ][state.step] as DemoAction | undefined) ?? null
      );
    case "beleg":
      return (
        ([
          { type: "scan-receipt" },
          { type: "review-receipt" },
          { type: "assign-receipt" },
        ][state.step] as DemoAction | undefined) ?? null
      );
    // Confirmation is intentionally absent: neither Autoplay nor Next can consent.
    case "ki":
      return state.step === 0
        ? { type: "create-ai-draft" }
        : state.step === 1
          ? { type: "review-ai" }
          : null;
  }
}

function transition(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "scene":
      return {
        ...createDemoState(action.scene),
        reducedMotion: state.reducedMotion,
        motionReady: state.motionReady,
      };
    case "reset":
      return {
        ...createDemoState(state.scene),
        reducedMotion: state.reducedMotion,
        motionReady: state.motionReady,
      };
    case "pause":
      return { ...state, playing: false };
    case "play":
      return {
        ...state,
        playing: !state.reducedMotion && getNextDemoAction(state) !== null,
      };
    case "motion-preference":
      return {
        ...state,
        motionReady: true,
        reducedMotion: action.reduced,
        playing: action.reduced
          ? false
          : state.motionReady
            ? state.playing
            : true,
      };
    case "advance": {
      const next = getNextDemoAction(state);
      return next
        ? transition(state, { ...next, source: action.source })
        : { ...state, playing: false };
    }
    case "dashboard-query":
      return {
        ...state,
        dashboard: { ...state.dashboard, query: action.value },
      };
    case "dashboard-period":
      return {
        ...state,
        dashboard: { ...state.dashboard, period: action.period },
      };
    case "open-project":
      return state.scene === "dashboard" &&
        DEMO_PROJECTS.some((p) => p.id === action.project)
        ? {
            ...state,
            step: 1,
            dashboard: {
              ...state.dashboard,
              project: action.project,
              tab: "overview",
            },
          }
        : state;
    case "project-tab":
      return state.scene === "dashboard" && state.step > 0
        ? {
            ...state,
            step: action.tab === "costs" ? 2 : 1,
            dashboard: { ...state.dashboard, tab: action.tab },
          }
        : state;
    case "measurement":
      return {
        ...state,
        step: 0,
        measurement: { ...state.measurement, [action.field]: action.value },
      };
    case "calculation":
      return {
        ...state,
        step: Math.min(2, state.step),
        calculation: { ...state.calculation, [action.field]: action.value },
      };
    case "save-measurement":
      return state.scene === "angebot" && getCalculation(state).measurementValid
        ? { ...state, step: 1 }
        : state;
    case "calculate":
      return state.scene === "angebot" &&
        state.step >= 1 &&
        getCalculation(state).valid
        ? { ...state, step: 2 }
        : state;
    case "preview-offer":
      return state.scene === "angebot" &&
        state.step >= 2 &&
        getCalculation(state).valid
        ? { ...state, step: 3 }
        : state;
    case "planning-field": {
      if (
        action.field === "member" &&
        !DEMO_MEMBERS.some((m) => m.id === action.value)
      )
        return state;
      if (
        action.field === "day" &&
        !DEMO_DAYS.some((d) => d.id === action.value)
      )
        return state;
      if (state.planning.timer !== "idle") return state;
      return {
        ...state,
        planning: { ...state.planning, [action.field]: action.value },
      };
    }
    case "save-assignment":
      return state.scene === "planung" &&
        state.step === 0 &&
        validPlanningHours(state.planning.hours)
        ? {
            ...state,
            step: 1,
            planning: {
              ...state.planning,
              assignment: {
                member: state.planning.member,
                day: state.planning.day,
                hours: decimal(state.planning.hours),
              },
            },
          }
        : state;
    case "move-assignment":
      return state.scene === "planung" &&
        state.planning.assignment &&
        state.planning.timer === "idle" &&
        DEMO_DAYS.some((d) => d.id === action.day) &&
        DEMO_MEMBERS.some((m) => m.id === action.member) &&
        validPlanningHours(state.planning.hours)
        ? {
            ...state,
            step: 2,
            planning: {
              ...state.planning,
              day: action.day,
              member: action.member,
              assignment: {
                day: action.day,
                member: action.member,
                hours: decimal(state.planning.hours),
              },
            },
          }
        : state;
    case "start-timer":
      return state.scene === "planung" &&
        state.step >= 1 &&
        state.planning.assignment &&
        state.planning.timer === "idle"
        ? {
            ...state,
            step: 3,
            planning: { ...state.planning, timer: "running" },
          }
        : state;
    case "stop-timer":
      return state.scene === "planung" &&
        state.planning.timer === "running" &&
        state.planning.assignment
        ? {
            ...state,
            step: 4,
            planning: {
              ...state.planning,
              timer: "stopped",
              loggedHours: state.planning.assignment.hours,
            },
          }
        : state;
    case "select-report":
      return state.invoice.status === "none"
        ? { ...state, invoice: { ...state.invoice, selected: action.selected } }
        : state;
    case "create-invoice":
      return state.scene === "rechnung" &&
        state.invoice.selected &&
        state.invoice.status === "none"
        ? { ...state, step: 1, invoice: { ...state.invoice, status: "draft" } }
        : state;
    case "review-invoice":
      return state.scene === "rechnung" && state.invoice.status === "draft"
        ? {
            ...state,
            step: 2,
            invoice: { ...state.invoice, status: "reviewed" },
          }
        : state;
    case "finalize-invoice":
      return state.scene === "rechnung" && state.invoice.status === "reviewed"
        ? {
            ...state,
            step: 3,
            invoice: {
              ...state.invoice,
              status: "final",
              number: "RE-2026-0042",
            },
          }
        : state;
    case "scan-receipt":
      return state.scene === "beleg" && state.step === 0
        ? { ...state, step: 1 }
        : state;
    case "receipt-field":
      return state.receipt.assigned
        ? state
        : {
            ...state,
            step:
              action.field === "project" ? state.step : Math.min(state.step, 1),
            receipt: { ...state.receipt, [action.field]: action.value },
          };
    case "review-receipt":
      return state.scene === "beleg" &&
        state.step === 1 &&
        state.receipt.supplier.trim() &&
        state.receipt.reference.trim() &&
        usable(decimal(state.receipt.net)) &&
        decimal(state.receipt.net) > 0
        ? { ...state, step: 2 }
        : state;
    case "assign-receipt":
      return state.scene === "beleg" &&
        state.step === 2 &&
        DEMO_PROJECTS.some((p) => p.id === state.receipt.project)
        ? { ...state, step: 3, receipt: { ...state.receipt, assigned: true } }
        : state;
    case "ai-prompt":
      return state.ai.status === "confirmed"
        ? state
        : {
            ...state,
            step: 0,
            ai: { ...state.ai, prompt: action.value, status: "idle" },
          };
    case "ai-hours":
      return state.ai.status === "confirmed"
        ? state
        : {
            ...state,
            step: 1,
            ai: { ...state.ai, hours: action.value, status: "draft" },
          };
    case "create-ai-draft": {
      const hours = getPromptHours(state.ai.prompt);
      return state.scene === "ki" && state.ai.status === "idle" && hours
        ? { ...state, step: 1, ai: { ...state.ai, hours, status: "draft" } }
        : state;
    }
    case "review-ai":
      return state.scene === "ki" &&
        state.ai.status === "draft" &&
        validPlanningHours(state.ai.hours)
        ? {
            ...state,
            step: 2,
            playing: false,
            ai: { ...state.ai, status: "reviewed" },
          }
        : state;
    case "edit-ai-draft":
      return state.scene === "ki" && state.ai.status === "reviewed"
        ? { ...state, step: 1, ai: { ...state.ai, status: "draft" } }
        : state;
    case "confirm-ai":
      return state.scene === "ki" &&
        action.source !== "autoplay" &&
        state.ai.status === "reviewed" &&
        validPlanningHours(state.ai.hours)
        ? {
            ...state,
            step: 3,
            ai: {
              ...state.ai,
              status: "confirmed",
              savedHours: decimal(state.ai.hours),
            },
          }
        : state;
  }
}

/** All UI actions and the guided timeline enter through this single reducer. */
export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  let next = transition(state, action);
  if (
    !["play", "motion-preference"].includes(action.type) &&
    action.source !== "autoplay"
  )
    next = { ...next, playing: false };
  if (next.playing && getNextDemoAction(next) === null)
    next = { ...next, playing: false };
  // Invalid input must not leave a perpetual autoplay timer running in place.
  if (
    action.source === "autoplay" &&
    action.type === "advance" &&
    next.step === state.step
  )
    next = { ...next, playing: false };
  return next;
}
