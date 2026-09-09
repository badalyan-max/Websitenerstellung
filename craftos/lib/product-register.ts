import "server-only";
import { funktionen, upcomingFeatures } from "./funktionen";
import { site, tarife } from "./site";
export const productBasis = {
  checkedAt: "2026-09-09",
  web: {
    branch: "main",
    head: "179cef55583e67b2853f1154ed1efe68a418bb3f",
    includesWorkingTree: true,
  },
  mobile: {
    branch: "master",
    head: "9e6260d3c1bb9b50139c87777a72806b3499c4a8",
    includesWorkingTree: true,
  },
  publicationDeploymentVerified: true,
  publishedWebHead: "e91428111a0e020c767a85b0cf53803ef8de3ade",
  publishedMobileHead: "9e6260d3c1bb9b50139c87777a72806b3499c4a8",
};
const evidence: Record<string, string[]> = {
  dashboard: ["src/pages/Dashboard.tsx", "src/hooks/useDashboardSettings.ts"],
  projektverwaltung: ["src/pages/ProjectDetail.tsx", "src/pages/Projekte.tsx"],
  angebote: ["src/pages/DocumentEditorPage.tsx", "src/lib/calculationUtils.ts"],
  rechnungen: [
    "src/pages/Rechnungen.tsx",
    "supabase/migrations/20260908020000_finalize_status.sql",
    "supabase/migrations/20260908040000_lock_guard_hardening.sql",
  ],
  buchhaltung: [
    "src/pages/Buchungsjournal.tsx",
    "src/pages/SteuerberaterExport.tsx",
  ],
  plantafel: [
    "src/pages/Plantafel.tsx",
    "src/pages/Einsaetze.tsx",
    "src/api/assignments.ts",
  ],
  zeiterfassung: [
    "src/pages/Zeiten.tsx",
    "src/components/time/EditTimeEntryDialog.tsx",
    "src/components/projects/EditProjectDialog.tsx",
    "src/api/projects.ts",
  ],
  lager: ["src/pages/Lager.tsx"],
  baudokumentation: [
    "src/api/constructionReports.ts",
    "src/api/documentReports.ts",
    "src/components/projects/bauakte/ConstructionReportsSection.tsx",
    "src/components/projects/bauakte/AcceptanceSection.tsx",
    "src/pages/DocumentDetail.tsx",
  ],
  team: ["src/pages/Mitarbeiter.tsx"],
  nachkalkulation: [
    "src/lib/calculationUtils.ts",
    "src/pages/ProjectDetail.tsx",
  ],
  kundenportal: [
    "src/api/customerPortal.ts",
    "src/components/portal/InvoicePayment.tsx",
    "supabase/functions/create-invoice-payment/index.ts",
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
  projektverwaltung: [
    "src/features/projects/screens/ProjectDetailScreen.tsx",
    "src/features/projects/screens/ProjectFilesScreen.tsx",
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
  baudokumentation: [
    "src/features/construction-reports/screens/DailyReportScreen.tsx",
    "src/features/defects/screens/DefectDetailScreen.tsx",
    "src/features/acceptance/screens/AcceptanceScreen.tsx",
    "src/features/documents/hooks/useSignDocument.ts",
    "src/shared/components/FullscreenSignatureOverlay.tsx",
    "src/shared/components/SignaturePad.tsx",
  ],
  aufmass: [
    "src/features/room-measurements/screens/RoomMeasurementsScreen.tsx",
  ],
  team: ["src/features/vacation/components/VacationTab.tsx"],
};
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
        ...(evidence[f.slug] || []).map((path) => ({
          repository: "web",
          path,
        })),
        ...(mobileEvidence[f.slug] || []).map((path) => ({
          repository: "mobile",
          path,
        })),
      ],
    })),
    upcoming: upcomingFeatures.map((f) => ({
      ...f,
      availability: "announced",
      evidence:
        "Ausdrückliche Termin- und Umfangsangabe des Produktinhabers in dieser Sitzung",
    })),
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
