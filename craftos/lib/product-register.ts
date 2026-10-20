import "server-only";
import { funktionen, type ProductPlatform } from "./funktionen";
import { site, tarife } from "./site";

/**
 * Produktwahrheit: Jede beworbene Funktion ist mit einem Pfad am
 * Produktions-Release (`origin/release`) beider Produkt-Repositories belegt.
 * Die Datei ist server-only und wird nicht gerendert; die Liste `notLive`
 * dient ausschließlich der internen Abgrenzung.
 */
export const productBasis = {
  checkedAt: "2026-10-20",
  web: {
    ref: "origin/release",
    tag: "v4.0.0-test.238",
    commit: "07cf0645517b81fa39c8644e3c9c84904f789bc4",
  },
  mobile: {
    ref: "origin/release",
    tag: "mobile-v1.0.0-test.93",
    commit: "5610a06415361f5c5a01c90258352ed7f49b7bab",
  },
} as const;

export type Evidence = { repository: ProductPlatform; path: string };

/** App-Sprachen der Mobile-App (Ordner unter src/shared/i18n/locales/ am Release). */
export const mobileLocales: readonly string[] = [
  "bg",
  "bs",
  "cs",
  "de",
  "el",
  "en",
  "es",
  "fr",
  "hr",
  "hu",
  "it",
  "pl",
  "pt",
  "ro",
  "ru",
  "sk",
  "sq",
  "sr-cyrl",
  "sr-latn",
  "tr",
  "uk",
];

const evidence: Record<string, string[]> = {
  dashboard: ["src/pages/Dashboard.tsx", "src/hooks/useDashboardSettings.ts"],
  projektverwaltung: ["src/pages/ProjectDetail.tsx", "src/pages/Projekte.tsx"],
  angebote: [
    "src/pages/DocumentEditorPage.tsx",
    "src/lib/calculationUtils.ts",
    "src/pages/QuoteSigning.tsx",
    "src/components/DocumentEditor/GAEBImportDialog.tsx",
    "src/components/DocumentEditor/GAEBExportDialog.tsx",
    "src/components/documents/DatanormImportDialog.tsx",
  ],
  rechnungen: [
    "src/pages/Rechnungen.tsx",
    "src/pages/settings/MahnwesenSettings.tsx",
    "src/api/reminders.ts",
    "supabase/migrations/20260908020000_finalize_status.sql",
    "supabase/migrations/20260908040000_lock_guard_hardening.sql",
  ],
  buchhaltung: [
    "src/pages/Buchungsjournal.tsx",
    "src/pages/SteuerberaterExport.tsx",
    "src/pages/Bankumsaetze.tsx",
    "src/pages/Zahlungseingaenge.tsx",
    "src/pages/SteuerCockpit.tsx",
  ],
  plantafel: [
    "src/pages/Plantafel.tsx",
    "src/pages/Einsaetze.tsx",
    "src/api/assignments.ts",
    "src/components/plantafel/ProjectGanttView.tsx",
    "src/api/projectPhases.ts",
  ],
  zeiterfassung: [
    "src/pages/Zeiten.tsx",
    "src/components/time/EditTimeEntryDialog.tsx",
    "src/components/projects/EditProjectDialog.tsx",
    "src/api/projects.ts",
  ],
  lager: ["src/pages/Lager.tsx", "src/api/goodsReceipt.ts"],
  baudokumentation: [
    "src/api/constructionReports.ts",
    "src/api/documentReports.ts",
    "src/components/projects/bauakte/ConstructionReportsSection.tsx",
    "src/components/projects/bauakte/AcceptanceSection.tsx",
    "src/pages/DocumentDetail.tsx",
    "src/api/acceptance.ts",
    "src/api/acceptanceScopes.ts",
    "src/api/defects.ts",
    "src/lib/besichtigung.ts",
  ],
  team: ["src/pages/Mitarbeiter.tsx"],
  nachkalkulation: [
    "src/lib/calculationUtils.ts",
    "src/pages/ProjectDetail.tsx",
  ],
  kundenportal: [
    "src/api/customerPortal.ts",
    "src/api/customerPortalInvites.ts",
    "src/components/customers/CustomerPortalInviteDialog.tsx",
    "src/components/customers/CustomerPortalAccessCard.tsx",
    "src/pages/portal/CustomerPortalHome.tsx",
    "src/pages/portal/CustomerQuote.tsx",
    "src/pages/portal/CustomerInvoice.tsx",
    "src/pages/portal/CustomerSchedule.tsx",
    "src/pages/portal/CustomerMessages.tsx",
    "src/components/portal/PortalPaymentNotice.tsx",
  ],
  aufmass: ["src/api/roomMeasurements.ts"],
  eingangsrechnungen: [
    "src/pages/Eingangsrechnungen.tsx",
    "supabase/migrations/20260614140000_eingangsrechnungen_gobd_lock_review_audit.sql",
  ],
  "e-rechnung": [
    "supabase/functions/generate-einvoice/index.ts",
    "supabase/migrations/20260710190000_documents_e_invoice_pdf_writeonce.sql",
  ],
  arbeitsanweisungen: ["src/api/workInstructions.ts"],
};
const mobileEvidence: Record<string, string[]> = {
  dashboard: ["src/features/dashboard/screens/DashboardScreen.tsx"],
  projektverwaltung: [
    "src/features/projects/screens/ProjectDetailScreen.tsx",
    "src/features/projects/screens/ProjectFilesScreen.tsx",
    "src/features/projects/screens/CreateProjectScreen.tsx",
  ],
  angebote: ["src/features/documents/screens/DocumentSignScreen.tsx"],
  eingangsrechnungen: [
    "src/features/supplier-invoices/screens/ScanReceiptScreen.tsx",
  ],
  plantafel: [
    "src/features/assignments/screens/AssignmentsListScreen.tsx",
    "src/features/assignments/screens/DispatchDetailScreen.tsx",
    "src/features/assignments/hooks/useDirections.ts",
  ],
  zeiterfassung: [
    "src/features/time-tracking/screens/TimeTrackingScreen.tsx",
    "src/features/time-tracking/components/TimeEntrySheet.tsx",
    "src/features/time-tracking/hooks/useTimeEntries.ts",
    "src/shared/lib/geo/nearestProject.ts",
    "src/shared/hooks/useGeoRadius.ts",
    "src/shared/hooks/useGeolocation.ts",
  ],
  lager: [
    "src/features/inventory/screens/InventoryScanScreen.tsx",
    "src/features/inventory/screens/InventoryScreen.tsx",
  ],
  baudokumentation: [
    "src/features/construction-reports/screens/DailyReportScreen.tsx",
    "src/features/defects/screens/DefectsScreen.tsx",
    "src/features/defects/screens/DefectDetailScreen.tsx",
    "src/features/acceptance/screens/AcceptanceScreen.tsx",
    "src/features/acceptance/screens/AcceptanceProtocolsScreen.tsx",
    "src/features/site-visit/screens/SiteVisitScreen.tsx",
    "src/features/documents/hooks/useSignDocument.ts",
    "src/shared/components/FullscreenSignatureOverlay.tsx",
    "src/shared/components/SignaturePad.tsx",
  ],
  aufmass: [
    "src/features/room-measurements/screens/RoomMeasurementsScreen.tsx",
  ],
  team: ["src/features/vacation/components/VacationTab.tsx"],
  arbeitsanweisungen: [
    "src/features/work-steps/components/WorkStepsSection.tsx",
  ],
};

const web = (...paths: string[]): Evidence[] =>
  paths.map((path) => ({ repository: "web", path }));
const mobile = (...paths: string[]): Evidence[] =>
  paths.map((path) => ({ repository: "mobile", path }));

/** Live am Release, aber (noch) ohne eigene Funktionsseite. */
const liveExtras: {
  name: string;
  platforms: ProductPlatform[];
  evidence: Evidence[];
  advertised: boolean;
}[] = [
  {
    name: "Mahnwesen",
    platforms: ["web"],
    evidence: web(
      "src/pages/settings/MahnwesenSettings.tsx",
      "src/api/reminders.ts",
      "src/components/invoices/ReminderHistory.tsx",
      "supabase/functions/send-invoice-reminders/index.ts",
    ),
    advertised: true,
  },
  {
    name: "Bankabgleich und Zahlungseingänge",
    platforms: ["web"],
    evidence: web(
      "src/pages/Bankumsaetze.tsx",
      "src/pages/Zahlungseingaenge.tsx",
      "src/components/eingangsrechnungen/ExpensePaymentReconciliationPanel.tsx",
    ),
    advertised: true,
  },
  {
    name: "Terminplanung mit Bauphasen (in der Mobile-App: Arbeitsabschnitte)",
    platforms: ["web"],
    evidence: web(
      "src/components/plantafel/ProjectGanttView.tsx",
      "src/components/plantafel/GanttDependencyLayer.tsx",
      "src/api/projectPhases.ts",
    ),
    advertised: true,
  },
  {
    name: "Abnahme und Teilabnahme",
    platforms: ["web", "mobile"],
    evidence: [
      ...web("src/api/acceptanceScopes.ts", "src/api/acceptanceProtocols.ts"),
      ...mobile(
        "src/features/acceptance/screens/AcceptanceScreen.tsx",
        "src/features/acceptance/screens/AcceptanceProtocolsScreen.tsx",
        "src/features/acceptance/screens/AcceptanceProtocolDetailScreen.tsx",
      ),
    ],
    advertised: true,
  },
  {
    name: "GAEB-Import/-Export und DATANORM-Import",
    platforms: ["web"],
    evidence: web(
      "src/lib/gaeb/gaebParser.ts",
      "src/components/DocumentEditor/GAEBImportDialog.tsx",
      "src/components/DocumentEditor/GAEBExportDialog.tsx",
      "src/components/documents/DatanormImportDialog.tsx",
      "src/api/datanormCatalogs.ts",
    ),
    advertised: true,
  },
  {
    name: "Datenübernahme",
    platforms: ["web"],
    evidence: web("src/pages/Datenimport.tsx"),
    advertised: true,
  },
  {
    name: "Angebotsunterschrift online",
    platforms: ["web"],
    evidence: web("src/pages/QuoteSigning.tsx", "src/api/quoteSigning.ts"),
    advertised: true,
  },
  {
    name: "Lager-Scan und Wareneingang",
    platforms: ["web", "mobile"],
    evidence: [
      ...web("src/api/goodsReceipt.ts", "src/hooks/useAnalyzeGoodsReceipt.ts"),
      ...mobile(
        "src/features/inventory/screens/InventoryScanScreen.tsx",
        "src/features/inventory/screens/InventoryScreen.tsx",
      ),
    ],
    advertised: true,
  },
  {
    name: "Besichtigung",
    platforms: ["web", "mobile"],
    evidence: [
      ...web("src/lib/besichtigung.ts"),
      ...mobile("src/features/site-visit/screens/SiteVisitScreen.tsx"),
    ],
    advertised: true,
  },
  {
    name: "Bautagesbericht",
    platforms: ["mobile"],
    evidence: [
      ...mobile(
        "src/features/construction-reports/screens/DailyReportScreen.tsx",
      ),
      ...web("src/components/projects/bauakte/ConstructionReportsSection.tsx"),
    ],
    advertised: true,
  },
  {
    name: "Mängel",
    platforms: ["web", "mobile"],
    evidence: [
      ...web("src/components/projects/bauakte/DefectsBoard.tsx"),
      ...mobile(
        "src/features/defects/screens/DefectsScreen.tsx",
        "src/features/defects/screens/DefectDetailScreen.tsx",
      ),
    ],
    advertised: true,
  },
  {
    name: "Projekt-Chat und Nachrichten",
    platforms: ["mobile"],
    evidence: mobile(
      "src/features/chat/screens/ChatScreen.tsx",
      "src/features/messages/screens/InboxScreen.tsx",
      "src/features/messages/screens/DirectChatScreen.tsx",
    ),
    advertised: true,
  },
  {
    name: `${mobileLocales.length} Sprachen in der Mobile-App`,
    platforms: ["mobile"],
    evidence: mobile("src/shared/i18n/locales/de/common.json"),
    advertised: true,
  },
  {
    name: "Kunden in der App",
    platforms: ["mobile"],
    evidence: mobile(
      "src/features/customers/screens/CustomersScreen.tsx",
      "src/features/customers/screens/CustomerDetailScreen.tsx",
      "src/features/customers/screens/CustomerEditScreen.tsx",
    ),
    advertised: true,
  },
  {
    // Umfang ungeprüft (RESEARCH Open Question 7): nicht bewerben.
    name: "Vorhersagen",
    platforms: ["web"],
    evidence: web("src/pages/Vorhersagen.tsx"),
    advertised: false,
  },
];

/** Nicht live am Release: nirgends als verfügbar oder angekündigt darstellen. */
const notLive: { name: string; evidence: string }[] = [
  {
    name: "Telefon-Agent",
    evidence:
      "Kein Telefonie-Code in src und supabase/functions am Web-Release; Treffer nur in Abrechnungs-/Sprachassistenz-Hilfen (_shared/elevenLabsBilling.ts, voice-assistant-usage).",
  },
  {
    name: "MCP-Server",
    evidence:
      "Kein MCP-Server-Code am Web-Release; Treffer nur in Tests, embed-text und Kommentaren in warehouse.ts.",
  },
  {
    name: "KI-Agent",
    evidence:
      "src/pages/KiAgent.tsx nur für Plattform-Entwickler, sonst „Bald verfügbar“; AppSidebar.tsx „KI-Agent – Bald verfügbar“.",
  },
  {
    name: "Videoanalyse (Web)",
    evidence:
      "src/lib/ai/availability.ts: isAiFeatureAvailable('video') === false, Label „Bald verfügbar“.",
  },
  {
    name: "Subunternehmer-Portal-Einladungen",
    evidence: "src/lib/featureFlags.ts: subcontractorPortalInvites: false.",
  },
  {
    name: "Portal-Onlinezahlung",
    evidence:
      "src/components/portal/InvoicePayment.tsx: PORTAL_ONLINE_PAYMENT_ENABLED = false; PortalPaymentNotice verweist auf Überweisung.",
  },
];

export function getProductRegister() {
  return {
    basis: productBasis,
    trialDays: site.trialDays,
    licenses: tarife.map((t) => ({
      id: t.id,
      name: t.name,
      monthlyNet: t.monat,
      annualNet: t.jahr,
      mobileIncluded: true,
    })),
    features: funktionen.map((f) => ({
      slug: f.slug,
      name: f.name,
      summary: f.heroIntro,
      platforms: f.platforms,
      access: f.access,
      license: f.platforms.includes("web")
        ? "Voll-Lizenz; mobile Teilfunktionen nach Rolle auch mit App-Lizenz"
        : "App-Lizenz oder Voll-Lizenz",
      availability: f.tier === "heute" ? "implemented" : "under-review",
      notes: f.notes,
      checkedAt: f.checkedAt,
      evidence: [
        ...web(...(evidence[f.slug] || [])),
        ...mobile(...(mobileEvidence[f.slug] || [])),
      ],
    })),
    liveExtras,
    notLive,
    limitations: [
      "Portal-Onlinezahlungen deaktiviert",
      "DATANORM v5 nicht als geprüft zugesagt",
      "Keine vollständige Offline-Zusage",
      "GPS erfasst einzelne Vorgänge, keine dauerhaften Mitarbeiterstandorte",
      "Automatische Projektzuordnung beim Timerstart benötigt Projektkoordinaten im passenden Radius",
      "Keine autonom verbuchende KI",
      "Keine pauschale behördliche GoBD-Zertifizierung",
    ],
  };
}
