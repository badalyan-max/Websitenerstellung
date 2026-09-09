/** Deliberately fictional fixtures. No customer or production data is used. */
export const DEMO_PROJECT = {
  id: "krause",
  name: "Umbau Bäckerei Krause",
  customer: "Bäckerei Krause",
  contact: "Clara Krause",
  address: "Beispielstraße 12, Berlin",
  budget: 18450,
  due: "18.09.2026",
  work: "Wandanstrich im Verkaufsraum",
  room: "Verkaufsraum",
  baseHours: 7,
  hourlyCost: 48,
  materialCost: 357,
} as const;

export const DEMO_PROJECTS = [
  { ...DEMO_PROJECT, status: "In Arbeit", progress: 68 },
  {
    id: "weber",
    name: "Badmodernisierung Weber",
    customer: "Familie Weber",
    budget: 12680,
    due: "24.09.2026",
    status: "Geplant",
    progress: 22,
  },
  {
    id: "sonnenhof",
    name: "Ausbau Praxis Sonnenhof",
    customer: "Praxis Sonnenhof",
    budget: 26900,
    due: "30.09.2026",
    status: "In Arbeit",
    progress: 46,
  },
] as const;

export const DEMO_MEMBERS = [
  {
    id: "mila",
    name: "Mila Schneider",
    initials: "MS",
    role: "Malermeisterin",
  },
  { id: "jonas", name: "Jonas Weber", initials: "JW", role: "Geselle" },
  { id: "emre", name: "Emre Yilmaz", initials: "EY", role: "Geselle" },
] as const;

export const DEMO_DAYS = [
  { id: "mo", label: "Montag", short: "Mo", date: "07.09." },
  { id: "di", label: "Dienstag", short: "Di", date: "08.09." },
  { id: "mi", label: "Mittwoch", short: "Mi", date: "09.09." },
  { id: "do", label: "Donnerstag", short: "Do", date: "10.09." },
  { id: "fr", label: "Freitag", short: "Fr", date: "11.09." },
] as const;

export type DemoDay = (typeof DEMO_DAYS)[number]["id"];
export type DemoMember = (typeof DEMO_MEMBERS)[number]["id"];

export const REVENUE = [
  { month: "Apr", amount: 17200 },
  { month: "Mai", amount: 18900 },
  { month: "Jun", amount: 24600 },
  { month: "Jul", amount: 22100 },
  { month: "Aug", amount: 31800 },
  { month: "Sep", amount: 42600 },
] as const;

export function formatEuro(value: number, digits = 2): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatNumber(value: number, digits = 2): string {
  return new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: digits,
  }).format(value);
}
