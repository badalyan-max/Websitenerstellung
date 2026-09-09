import { ArrowUp, Check, CheckCheck, ChevronRight, Clock3, FileText, FolderOpen, PenLine, Plus, Sparkles } from "lucide-react";
import { defaultOfferPositions, offerPositionCents, type SnippetExample } from "@/lib/snippet-examples";
import { DeviceBridge, PhoneFrame, WebFrame } from "./DeviceFrame";
import s from "./SupplementalScene.module.css";

type Props = {
  variant: "dashboard" | "angebot" | "ki";
  stage: number;
  phase: number;
  example?: SnippetExample;
};

const money = (cents: number) => (cents / 100).toLocaleString("de-DE", { style: "currency", currency: "EUR" });

function Project({ name }: { name: string }) {
  return <div className={s.project}><FolderOpen size={13} /><strong>{name}</strong></div>;
}

function Signature({ signed }: { signed: boolean }) {
  return <svg className={s.signature} data-signed={signed} viewBox="0 0 160 45" aria-label={signed ? "Kundenunterschrift" : "Unterschriftsfeld"} role="img">
    <path pathLength="1" d="M14 32C30 5 42 6 33 28S28 45 43 20C34 35 40 38 51 27S53 38 64 27C69 17 67 36 73 27S79 20 79 28S84 33 91 25C105 11 99 37 108 26S115 21 115 29S123 29 132 22M36 39C65 33 107 33 145 35" />
  </svg>;
}

function FloorPlan({ visible }: { visible: boolean }) {
  return <div className={s.planPreview} data-visible={visible}>
    <div className={s.planSheet} aria-label="Beispielgrundriss">
      <div className={s.planRooms}><span>Verkauf</span><span>Lager</span><span>Flur</span></div>
      <small>Grundriss · Erdgeschoss</small>
    </div>
  </div>;
}

export function SupplementalScene({ variant, stage, phase, example }: Props) {
  const project = example?.project ?? "Bäckerei Krause";

  if (variant === "dashboard") {
    return <DeviceBridge stage={stage} phase={phase} focusPlatform={phase >= 3 ? "mobile" : "web"}
      captions={[
        "Im Büro wird der Grundriss zur Projektakte hinzugefügt.",
        "Grundriss.pdf ist im Projekt gespeichert.",
        "Auf der Baustelle öffnet das Team die Projektdateien.",
        "Derselbe Grundriss ist in der Mobile-App aufrufbar.",
      ]}
      web={<WebFrame title="Projektübersicht">
        <Project name={project} />
        <div className={s.webTabs}><strong>Übersicht</strong><span>Dateien</span><span>Planung</span></div>
        <div className={s.projectSummary}><span>Aktives Projekt</span><strong>Alles an einem Ort</strong><p>Pläne, Dokumente und Fotos gehören zur gemeinsamen Projektakte.</p></div>
        <div className={s.fileRow} data-ready={stage >= 1}><FileText size={23} /><div><strong>Grundriss.pdf</strong><small>{stage >= 1 ? "Im Projekt gespeichert" : "Zum Projekt hinzufügen"}</small></div><span className={s.fileState}>{stage >= 1 ? <Check size={15} /> : "PDF"}</span></div>
        <span className={s.action} data-cursor-target="first" data-ready={stage >= 1}>{stage >= 1 ? <Check size={13} /> : <Plus size={13} />}{stage >= 1 ? "Datei hinzugefügt" : "Datei hinzufügen"}</span>
      </WebFrame>}
      phone={<PhoneFrame title="Projektdateien">
        <Project name={project} />
        <div className={s.mobileTabs}><span>Belege</span><span data-cursor-target="second" data-ready={stage >= 2}>Dateien</span><span>Fotos</span></div>
        <div className={s.mobileFile} data-cursor-target="third" data-ready={stage >= 2}><FileText size={21} /><span><strong>Grundriss.pdf</strong><small>{stage >= 3 ? "Vorschau geöffnet" : "PDF-Dokument"}</small></span><ChevronRight size={13} /></div>
        <FloorPlan visible={stage >= 3} />
        <p className={s.mobileNote}>{stage >= 3 ? "Der Plan zur Baustelle ist dabei." : "Dokumente direkt beim Projekt."}</p>
      </PhoneFrame>}
    />;
  }

  if (variant === "angebot") {
    const positions = example?.variant === "angebot" ? example.positions : defaultOfferPositions;
    const net = positions.reduce((sum, position) => sum + offerPositionCents(position), 0);
    const tax = Math.round(net * 0.19);
    const documentNumber = "AN-BEISPIEL-001";

    return <DeviceBridge stage={stage} phase={phase} focusPlatform={phase >= 3 && phase < 5 ? "mobile" : "web"}
      captions={[
        "Das Angebot wird im Büro mit den kalkulierten Positionen vorbereitet.",
        "Das fertige Angebot kann in der Mobile-App ausgewählt werden.",
        "Der Kunde unterschreibt das Angebot auf dem Handy.",
        "Die gespeicherte Kundenunterschrift ist auch im Büro sichtbar.",
      ]}
      web={<WebFrame title="Angebot">
        <div className={s.offerPanel}>
          <Project name={project} />
          <div className={s.documentMeta}><span>{stage >= 1 ? documentNumber : "Entwurf"}</span><span data-ready={stage >= 1}>{stage >= 3 ? "Unterschrieben" : stage >= 1 ? "Fertiggestellt" : "In Bearbeitung"}</span></div>
          <div className={s.positions}>{positions.map((position) => <div className={s.position} key={position.title}>
            <div><strong>{position.title}</strong><small>{position.quantity.toLocaleString("de-DE")} {position.unit} × {money(position.unitPriceCents)}</small></div><span>{money(offerPositionCents(position))}</span>
          </div>)}</div>
          <dl className={s.totals}><div><dt>Netto</dt><dd>{money(net)}</dd></div><div><dt>19 % Umsatzsteuer</dt><dd>{money(tax)}</dd></div><div><dt>Gesamt</dt><dd>{money(net + tax)}</dd></div></dl>
          <div className={s.offerActions}>
            <span className={s.action} data-cursor-target="first" data-ready={stage >= 1}>{stage >= 1 ? <Check size={12} /> : <FileText size={12} />}{stage >= 1 ? "Fertiggestellt" : "Fertigstellen"}</span>
            <span className={s.signatureAction} data-cursor-target="third" data-ready={stage >= 3}><PenLine size={12} />{stage >= 3 ? "Unterschrift vorhanden" : "Signatur anzeigen"}</span>
          </div>
          <div className={s.signatureReceipt} data-ready={stage >= 3}><Signature signed={stage >= 3} /><span>{stage >= 3 ? <>Kundenunterschrift gespeichert<small>16.09.2026 · 09:41</small></> : "Noch keine Unterschrift"}</span></div>
        </div>
      </WebFrame>}
      phone={<PhoneFrame title="Unterschrift">
        <Project name={project} />
        <div className={s.mobileDocument}><FileText size={17} /><div><strong>Angebot</strong><span>{stage >= 1 ? documentNumber : "Entwurf"}</span><small>16.09.2026</small></div></div>
        <div className={s.signaturePad} data-ready={stage >= 2}><small>Kundenunterschrift</small><Signature signed={stage >= 2} /><span className={s.signatureLine} /></div>
        <span className={s.mobileAction} data-cursor-target="second" data-ready={stage >= 2}>{stage >= 2 ? <CheckCheck size={13} /> : <PenLine size={13} />}{stage >= 2 ? "Unterschrift gespeichert" : "Unterschrift speichern"}</span>
        <p className={s.mobileNote}>{stage >= 2 ? "Standort erfasst · 09:41" : "Die Unterschrift gehört zu diesem Angebot."}</p>
      </PhoneFrame>}
    />;
  }

  return <DeviceBridge stage={stage} phase={phase} mobileFirst focusPlatform={phase >= 3 ? "web" : "mobile"}
    captions={[
      "Auf der Baustelle wird die Arbeitszeit zum Projekt gespeichert.",
      "3,5 Stunden sind in der Zeiterfassung hinterlegt.",
      "Im Büro fragt Craft AI die erfassten Zeiten ab.",
      "Die Antwort zeigt den gespeicherten Eintrag mit Projekt und Zeitraum.",
    ]}
    phone={<PhoneFrame title="Zeiterfassung" active="Zeit">
      <Project name={project} />
      <div className={s.timeEntry}><span className={s.eyebrow}>Heute · 16. September</span><Clock3 size={23} /><strong>3,5 <small>Stunden</small></strong><span>09:00–12:30</span><p>Wandanstrich</p></div>
      <span className={s.mobileAction} data-cursor-target="first" data-ready={stage >= 1}>{stage >= 1 ? <CheckCheck size={13} /> : <Check size={13} />}{stage >= 1 ? "Zeit gespeichert" : "Zeit speichern"}</span>
      <p className={s.mobileNote}>Arbeitszeit dem Projekt zugeordnet.</p>
    </PhoneFrame>}
    web={<WebFrame title="Craft AI"><div className={s.aiPanel}>
      <div className={s.aiLabel}><Sparkles size={15} /><span>Betriebsdaten abfragen</span></div>
      <div className={s.question}><p>Welche Zeiten wurden heute erfasst?</p><span className={s.send} data-cursor-target="second" data-ready={stage >= 2} aria-label="Anfrage senden"><ArrowUp size={16} /></span></div>
      <div className={s.answer} data-ready={stage >= 2}><span className={s.aiMark}><Sparkles size={14} />Craft AI</span><p>{stage >= 2 ? `3,5 Stunden für ${project}.` : "Die Antwort erscheint nach der Anfrage."}</p></div>
      <div className={s.source} data-cursor-target="third" data-ready={stage >= 3}>
        <div><Clock3 size={14} /><strong>Erfasste Zeiten</strong><ChevronRight size={13} /></div>
        <div className={s.sourceDetails} data-visible={stage >= 3}><span>{project}</span><strong>09:00–12:30 · 3,5 h</strong><small>Wandanstrich</small></div>
      </div>
      <p className={s.webNote}>{stage >= 2 ? "Daten abgefragt. Keine Änderungen vorgenommen." : "Craft AI nutzt die gespeicherten Betriebsdaten."}</p>
    </div></WebFrame>}
  />;
}
