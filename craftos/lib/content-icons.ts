/**
 * Kategorie-Icons (09-UI-SPEC § 3, Lucide 0.475.0) für die Themen-Karten der Übersichten und Kategorieseiten.
 * Eigenes Objekt neben `categories` (lib/content-types.ts), das unverändert bleibt (D-18). 09-REVIEW IN-02: Die Icons
 * liegen in diesem reinen Server-Modul, damit die Client-Insel ContentSearch beim Import von `categories` keine
 * Icon-Komponenten mitzieht – unabhängig vom Tree-Shaking.
 */
import "server-only";
import {
  Calculator,
  Camera,
  Clock,
  FileText,
  FolderKanban,
  ListChecks,
  Receipt,
  Settings2,
  Sparkles,
  Users,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import type { ContentKind } from "./content-types";

export const categoryIcons: Record<ContentKind, Record<string, LucideIcon>> = {
  blog: {
    rechnungen: Receipt,
    kalkulation: Calculator,
    softwareauswahl: ListChecks,
    belege: Wallet,
    projekte: FolderKanban,
    team: Users,
  },
  hilfe: {
    einrichtung: Settings2,
    angebote: FileText,
    rechnungen: Receipt,
    belege: Wallet,
    projekte: FolderKanban,
    zeiten: Clock,
    lager: Warehouse,
    baudokumentation: Camera,
    "craft-ai": Sparkles,
  },
};
