import type { ReactNode } from "react";
import {
  ArrowDownLeft, ArrowRight, ArrowUpRight, Check, CheckCheck, Clock3,
  FileCheck2, FileText, FolderOpen, LockKeyhole, Package, Plus, Ruler,
  ScanLine, Sparkles,
} from "lucide-react";
import type { SnippetVariant } from "./FeatureSnippet";
import {
  defaultOfferPositions, offerPositionCents, type SnippetExample,
} from "@/lib/snippet-examples";
import s from "./IllustrationScene.module.css";

interface IllustrationSceneProps {
  variant: SnippetVariant;
  example?: SnippetExample;
  stage: number;
  phase: number;
  reduced: boolean;
}

const eur = (cents: number) => (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });
const num = (value: number) => value.toLocaleString("de-DE", { maximumFractionDigits: 2 });

function Result({ children, ready, target }: { children: ReactNode; ready: boolean; target?: "third" }) {
  return <div className={s.result} data-ready={ready} data-cursor-target={target}>
    <CheckCheck size={17} aria-hidden="true" />
    <span>{children}</span>
  </div>;
}

export function IllustrationScene({ variant, example, stage, phase, reduced }: IllustrationSceneProps) {
  const matchingExample = example?.variant === variant ? example : undefined;
  const project = matchingExample?.project ?? "Bäckerei Krause";
  let content: ReactNode;

  switch (variant) {
    case "angebot": {
      const positions = matchingExample?.variant === "angebot" ? matchingExample.positions : defaultOfferPositions;
      const total = positions.slice(0, stage).reduce((sum, position) => sum + offerPositionCents(position), 0);
      const tax = Math.round(total * .19);
      content = <>
        <div className={s.heading}><FileText size={19} aria-hidden="true" /><strong>{project}</strong><span>Angebot</span></div>
        <div className={s.positions}>
          {positions.map((position, index) => <div
            className={s.position} key={position.title} data-active={stage > index}
            data-cursor-target={(["first", "second", "third"] as const)[index]}
          >
            <span className={s.selection}>{stage > index ? <Check size={15} /> : <Plus size={15} />}</span>
            <span><strong>{position.title}</strong><small>{num(position.quantity)} {position.unit} × {eur(position.unitPriceCents)}</small></span>
            <b>{eur(offerPositionCents(position))}</b>
          </div>)}
        </div>
        <dl className={s.offerTotal}>
          <div><dt>Netto</dt><dd>{eur(total)}</dd></div>
          <div><dt>19 % Umsatzsteuer</dt><dd>{eur(tax)}</dd></div>
          <div><dt>Gesamt</dt><dd>{eur(total + tax)}</dd></div>
        </dl>
      </>;
      break;
    }
    case "planung": {
      const activity = matchingExample?.variant === "planung" ? matchingExample.activity : "Wand streichen";
      const moved = phase >= 3 || stage >= 2;
      content = <>
        <div className={s.planAndPhone}>
          <div className={s.webPlan} data-illustration-platform="web">
            <div className={s.planHeading}><span>Planung im Büro</span><span>Lena Müller <b>3,5 h</b></span></div>
            <div className={s.plan}>
              <div className={s.planDay}><span>Di<strong>15.</strong></span><div className={s.planTarget} data-cursor-target="first" /></div>
              <div className={s.planDay} data-destination={phase >= 3}><span>Mi<strong>16.</strong></span><div className={s.planTarget} data-cursor-target="second" /></div>
              <div className={s.assignment} data-moved={moved} data-held={phase === 2 || phase === 3}>
                <small>{project}</small><strong>{activity}</strong><span>09:00–12:30 <b>3,5 h</b></span>
              </div>
            </div>
          </div>
          <div className={s.transfer} data-transfer-phase={phase} data-transfer-active={phase >= 3 && phase <= 6} aria-hidden="true">
            <svg className={s.transferPath} viewBox="0 0 90 85" fill="none">
              <path d="M12 8V42Q12 60 30 60H76" className={s.transferLine} />
              <path d="m68 52 8 8-8 8" className={s.transferArrow} />
              <circle r="4" className={s.transferPulse} style={{ transform: `translate(${phase >= 5 ? 76 : phase >= 4 ? 42 : 12}px, ${phase >= 4 ? 60 : phase >= 3 ? 42 : 8}px)` }} />
            </svg>
            <span>Im Büro geplant.<br />Unterwegs dabei.</span>
          </div>
          <div className={s.phone} data-illustration-platform="mobile" data-cursor-target="third" data-ready={stage >= 3}>
            <span className={s.phoneCamera} aria-hidden="true" />
            <div className={s.phoneHeader}><span>Einsätze</span><small>Ab heute</small></div>
            <div className={s.phoneContent}><span className={s.phoneDate}>{stage >= 3 ? "Mittwoch, 16.09." : "Dienstag, 15.09."}</span><strong>{project}</strong><span className={s.phoneActivity}>{activity}</span><div className={s.phoneTime}><Clock3 size={13} aria-hidden="true" />09:00–12:30</div></div>
            <span className={s.phoneHome} aria-hidden="true" />
          </div>
        </div>
      </>;
      break;
    }
    case "dashboard": {
      content = <>
        <div className={s.stats}><div><small>Aktive Projekte</small><strong>3</strong></div><div><small>Offene Beträge</small><strong>7.200 €</strong></div></div>
        <div className={s.projectRow} data-cursor-target="first" data-active={stage >= 1}><FolderOpen size={21} aria-hidden="true" /><span><strong>Bäckerei Krause</strong><small>Innenausbau</small></span><ArrowRight size={17} aria-hidden="true" /></div>
        <div className={s.dashboardDetails} data-active={stage >= 1}>
          <div className={s.fileRow}><FileCheck2 size={17} aria-hidden="true" /><span>Angebot angenommen</span><Check size={15} aria-hidden="true" /></div>
          <div className={s.costRow} data-cursor-target="second" data-active={stage >= 2}><span>Material <b>1.200 €</b></span><span>Erfasste Zeit <b>600 €</b></span></div>
        </div>
        <div className={s.bottomTotal} data-cursor-target="third" data-ready={stage >= 3}><span>Bisherige Projektkosten</span><strong>{stage >= 3 ? "1.800 €" : "—"}</strong></div>
      </>;
      break;
    }
    case "rechnung": {
      content = <>
        <div className={s.heading}><FileText size={19} aria-hidden="true" /><strong>{stage >= 3 ? "Rechnung" : "Rechnungsentwurf"}</strong><span>{stage >= 3 ? "Festgeschrieben" : "Bearbeitbar"}</span></div>
        <div className={s.invoiceRecipient} data-cursor-target="first" data-active={stage >= 1}><small>Rechnung an</small><strong>Bäckerei Krause</strong><span>{stage >= 1 ? "Empfänger geprüft" : "Empfänger im Entwurf"}</span></div>
        <div className={s.invoiceAmounts} data-cursor-target="second" data-active={stage >= 2}><span>Wandanstrich und Vorbereitung<small>3 Positionen</small></span><dl><div><dt>Netto</dt><dd>563,50 €</dd></div><div><dt>Mit 19 % USt.</dt><dd>670,57 €</dd></div></dl></div>
        <div className={s.invoiceSeal} data-cursor-target="third" data-ready={stage >= 3}>{stage >= 3 ? <LockKeyhole size={21} aria-hidden="true" /> : <FileCheck2 size={21} aria-hidden="true" />}<span><strong>{stage >= 3 ? "RE-BEISPIEL-001" : "Noch ohne Rechnungsnummer"}</strong><small>{stage >= 3 ? "Nummer vergeben. Inhalt gesperrt." : stage >= 2 ? "Angaben geprüft. Bereit zum Fertigstellen." : "Der Inhalt ist noch veränderbar."}</small></span></div>
      </>;
      break;
    }
    case "beleg": {
      content = <>
        <div className={s.receipt} data-cursor-target="first" data-active={stage >= 1}><ScanLine size={28} aria-hidden="true" /><span><strong>Baustoffhandel Muster</strong><small>Materialbeleg</small></span><b>119,00 €</b></div>
        <div className={s.receiptDetails} data-cursor-target="second" data-active={stage >= 2}>
          <div className={s.detailHeading}><span>Erkannte Angaben</span><span>{stage >= 2 ? "Geprüft" : stage >= 1 ? "Ausgelesen" : "Auslesen folgt"}</span></div>
          <dl><div><dt>Nettobetrag</dt><dd>{stage >= 1 ? "100,00 €" : "—"}</dd></div><div><dt>Umsatzsteuer</dt><dd>{stage >= 1 ? "19,00 €" : "—"}</dd></div><div><dt>Gesamt</dt><dd>{stage >= 1 ? "119,00 €" : "—"}</dd></div></dl>
        </div>
        <div className={s.assignmentResult} data-cursor-target="third" data-ready={stage >= 3}><FolderOpen size={20} aria-hidden="true" /><span><small>Projektzuordnung</small><strong>{stage >= 3 ? "Bäckerei Krause" : "Noch nicht zugeordnet"}</strong></span>{stage >= 3 && <Check size={19} aria-hidden="true" />}</div>
      </>;
      break;
    }
    case "ki": {
      content = <>
        <div className={s.question} data-cursor-target="first" data-active={stage >= 1}>Welche Rechnungen sind noch offen?<Sparkles size={17} aria-hidden="true" /></div>
        <div className={s.answer} data-cursor-target="second" data-active={stage >= 2}><Sparkles size={22} aria-hidden="true" /><span><small>Craft AI</small><strong>{stage >= 1 ? "3 Rechnungen. 7.200 € offen." : "Betriebsdaten im Zusammenhang"}</strong><p>{stage >= 2 ? "Die Antwort bezieht sich auf diese Beispielrechnungen." : stage >= 1 ? "Die offenen Beträge sind zusammengefasst." : "Eine vorbereitete Frage im Musterbetrieb."}</p></span></div>
        <div className={s.sources} data-cursor-target="third" data-active={stage >= 3}><div><span>Krause</span><b>2.400 €</b></div><div><span>Weber</span><b>1.800 €</b></div><div><span>Schmidt</span><b>3.000 €</b></div></div>
        <span className={s.quietNote}>Informationen abgefragt. Keine Daten verändert.</span>
      </>;
      break;
    }
    case "zeit": {
      const displayTime = stage === 0 ? "00:00" : stage === 1 ? "00:01" : stage === 2 ? "01:30" : "03:30";
      content = <>
        <div className={s.projectRow} data-cursor-target="first" data-active={stage >= 1}><FolderOpen size={21} aria-hidden="true" /><span><strong>Bäckerei Krause</strong><small>Wandanstrich</small></span>{stage >= 1 && <Check size={18} aria-hidden="true" />}</div>
        <div className={s.timer} data-cursor-target="second" data-active={stage >= 2}><span className={s.timerStatus}><Clock3 size={15} aria-hidden="true" />{stage === 0 ? "Timer bereit" : stage < 3 ? "Zeit läuft im Beispiel" : "Zeit erfasst"}</span><strong>{displayTime}</strong><small>Stunden : Minuten</small><div className={s.progress}><span style={{ transform: `scaleX(${stage / 3})` }} /></div></div>
        <Result ready={stage >= 3} target="third">{stage >= 3 ? "3,5 Stunden dem Auftrag zugeordnet." : "Beispielablauf mit beschleunigter Zeitanzeige."}</Result>
      </>;
      break;
    }
    case "lager": {
      const stock = stage <= 1 ? 24 : stage === 2 ? 18 : 20;
      content = <>
        <div className={s.stock} data-cursor-target="first" data-active={stage >= 1}><Package size={34} aria-hidden="true" /><span><small>Wandfarbe, 10 Liter</small><strong>{stock}<span>Eimer im Lager</span></strong></span></div>
        <div className={s.stockMovement} data-cursor-target="second" data-active={stage >= 2}><ArrowUpRight size={22} aria-hidden="true" /><span><strong>6 Eimer zur Baustelle</strong><small>Bäckerei Krause</small></span><b>−6</b></div>
        <div className={s.stockMovement} data-cursor-target="third" data-active={stage >= 3}><ArrowDownLeft size={22} aria-hidden="true" /><span><strong>2 Eimer zurück ins Lager</strong><small>Unverbrauchtes Material</small></span><b>+2</b></div>
        <Result ready={stage >= 3}>{stage >= 3 ? "24 − 6 + 2 = 20 Eimer im Lager." : "Entnahme und Rückgabe bleiben nachvollziehbar."}</Result>
      </>;
      break;
    }
    case "aufmass": {
      content = <>
        <div className={s.heading}><Ruler size={20} aria-hidden="true" /><strong>Wandaufmaß</strong><span>Bäckerei Krause</span></div>
        <div className={s.measure}>
          <span className={s.widthLabel}>7 m</span><span className={s.heightLabel}>5 m</span>
          <div className={s.wall} data-cursor-target="first" data-active={stage >= 1}><strong>{stage >= 1 ? "35 m²" : "7 × 5 m"}</strong><div className={s.opening} data-cursor-target="second" data-active={stage >= 2}><span>−2 m²</span></div></div>
        </div>
        <div className={s.areaResult} data-cursor-target="third" data-ready={stage >= 3}><span>{stage >= 3 ? "Menge fürs Angebot" : stage >= 2 ? "Nettofläche nach Abzug" : "Bruttofläche"}<small>{stage >= 2 ? "35 m² − 2 m²" : "7 m × 5 m"}</small></span><strong>{stage >= 2 ? "33" : "35"} <small>m²</small></strong></div>
      </>;
      break;
    }
  }

  return <div className={s.scene} data-illustration-scene={variant} data-stage={stage} data-reduced={reduced}>{content}</div>;
}
