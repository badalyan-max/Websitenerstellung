import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StoreLinks } from "@/components/ui/StoreLinks";
import { Breadcrumbs } from "@/components/v2/Breadcrumbs";
import { TEXT_BUDGET, assertTextBudget, sentenceCount } from "@/components/v2/budgets";
import { DevicePair } from "@/components/v2/DevicePair";
import { Frame, SceneContent } from "@/components/v2/SceneContent";
import type { Crumb } from "@/lib/breadcrumbs";
import type { KopfVisual } from "@/lib/scenes";
import { site } from "@/lib/site";
import s from "./FunktionsKopf.module.css";

export interface FunktionsKopfProps {
  /** id der H1, z. B. "funktion-titel"; die section verweist per aria-labelledby darauf. */
  id: string;
  /** Gruppenname (≤ 24) bzw. „Mobile-App“. */
  eyebrow: string;
  /** Exakt der Zielwert target.h1 aus keyword-map.json (≤ 60). */
  h1: string;
  /** Kopfwort-Token; steht wörtlich in h1 und wird nie getrennt (nowrap-Span). */
  keyword: string;
  /** Kurznutzen, genau ein Satz ≤ 110 Zeichen. */
  lead: string;
  /** Detailseiten: Pflicht; /app (stores): entfällt. */
  secondary?: { label: string; href: string };
  visual: KopfVisual;
  /** Nur /app: StoreLinks unter dem CTA und QR-Codes ab 1024 px (Abweichung B8). */
  stores?: boolean;
  /** Brotkrumen-Kette aus crumbsFor(path) – erste Zeile des Kopfs (08-UI-SPEC G1/G6). */
  crumbs: Crumb[];
  /** Standard true; false nur auf noindex-Musterseiten (kein JSON-LD). */
  crumbsSchema?: boolean;
}

const QR = [
  { platform: "ios", label: "iPhone und iPad", href: site.iosUrl, alt: "QR-Code zum App Store" },
  { platform: "android", label: "Android", href: site.androidUrl, alt: "QR-Code zum Google Play Store" },
] as const;

/**
 * Seitenkopf der Funktionsdetailseiten und von /app (07-UI-SPEC F1; D-02, D-15, B1, B8).
 * Aufbau wie HomeHero, davor die Brotkrumen-Zeile (08-UI-SPEC G1/G6): Eyebrow, Keyword-H1, ein Satz Kurznutzen, Test-CTA und Sekundärlink, daneben die
 * vereinfachte Produktoberfläche im Geräterahmen. Server Component ohne Animation; die H1 ist das
 * LCP-Element, das Visual wird nicht lazy geladen. Budgets und Kopfwort werden beim Rendern geprüft.
 */
export function FunktionsKopf({
  id,
  eyebrow,
  h1,
  keyword,
  lead,
  secondary,
  visual,
  stores = false,
  crumbs,
  crumbsSchema = true,
}: FunktionsKopfProps) {
  assertTextBudget("pageHead.h1", h1, TEXT_BUDGET.pageHead.h1);
  assertTextBudget("pageHead.eyebrow", eyebrow, TEXT_BUDGET.pageHead.eyebrow);
  const position = keyword ? h1.indexOf(keyword) : -1;
  if (position < 0) {
    throw new Error(`FunktionsKopf: H1 enthält das Kopfwort ‚${keyword}‘ nicht – keyword-map.json oder Datenmodul prüfen.`);
  }
  assertTextBudget("pageHead.kopfLead", lead, TEXT_BUDGET.pageHead.kopfLead);
  const sentences = sentenceCount(lead);
  if (sentences !== 1) {
    throw new Error(`FunktionsKopf: Lead hat ${sentences} Sätze – genau einen Satz schreiben.`);
  }
  if (!stores && !secondary) {
    throw new Error("FunktionsKopf: Sekundärlink fehlt – secondary angeben (nur die /app-Variante mit stores kommt ohne aus).");
  }
  const vor = h1.slice(0, position);
  const nach = h1.slice(position + keyword.length);

  return (
    <section
      className={s.kopf}
      aria-labelledby={id}
      data-funktions-kopf=""
      data-abschnitt="kopf"
      data-tone="dark"
    >
      <div className={`site-container ${s.crumbs}`}>
        <Breadcrumbs items={crumbs} tone="dark" schema={crumbsSchema} />
      </div>
      <div className={`site-container ${s.inner}`}>
        <div className={s.copy}>
          <p className={`v2-eyebrow ${s.eyebrow}`}>{eyebrow}</p>
          <h1 id={id} className={s.title}>
            {vor}
            <span className={s.keyword} data-keyword="">
              {keyword}
            </span>
            {nach}
          </h1>
          <p className={s.lead}>{lead}</p>
          <div className={s.actions}>
            <a href={site.ctaUrl} className="v2-btn-cta" data-track="trial">
              {`${site.trialDays} Tage kostenlos testen`}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            {!stores && secondary ? (
              <Link href={secondary.href} className={s.secondary}>
                {secondary.label}
              </Link>
            ) : null}
          </div>
          {stores ? (
            <div className={s.stores}>
              <StoreLinks />
              <div className={`hidden lg:flex ${s.qr}`}>
                {QR.map((qr) => (
                  <a
                    key={qr.platform}
                    href={qr.href}
                    className={s.qrLink}
                    aria-label={`${qr.label}: Store öffnen oder QR-Code scannen`}
                  >
                    <Image
                      src={`/images/mobile/qr-${qr.platform}.svg`}
                      width={96}
                      height={96}
                      alt={qr.alt}
                      className={s.qrImage}
                    />
                    <span className={s.qrLabel}>{qr.label}</span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className={s.product} data-visual={visual.kind}>
          <KopfVisualRahmen visual={visual} />
        </div>
      </div>
    </section>
  );
}

/** Visual-Varianten: Browser über die volle Spaltenbreite, Phone 240 px zentriert, Paar in Kompaktlage. */
function KopfVisualRahmen({ visual }: { visual: KopfVisual }) {
  if (visual.kind === "pair") {
    const { browser, phone, description } = visual;
    return (
      <DevicePair
        layout="compact"
        tone="dark"
        browser={{ title: browser.title, evidence: browser.screen, children: <SceneContent scene={browser} /> }}
        phone={{
          title: phone.title,
          evidence: phone.screen,
          activeTab: phone.activeTab,
          children: <SceneContent scene={phone} />,
        }}
        description={description}
      />
    );
  }
  if (visual.kind === "browser") {
    return (
      <div className="w-full">
        <Frame visual={{ kind: "browser", scene: visual.scene }} tone="dark" />
      </div>
    );
  }
  return <Frame visual={{ kind: "phone", scene: visual.scene }} width={240} tone="dark" />;
}
