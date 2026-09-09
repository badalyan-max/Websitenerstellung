"use client";

import {
  useEffect,
  useId,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { PlanningBoard } from "./PlanningBoard";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileText,
  FolderClosed,
  LayoutDashboard,
  MapPin,
  Pause,
  Play,
  Plus,
  ReceiptText,
  RotateCcw,
  Ruler,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import {
  DEMO_DAYS,
  DEMO_MEMBERS,
  DEMO_PROJECT,
  DEMO_PROJECTS,
  REVENUE,
  formatEuro,
  formatNumber,
} from "../../lib/demo/data";
import {
  createDemoState,
  decimal,
  demoReducer,
  DEMO_SCENES,
  getCalculation,
  getNextDemoAction,
  getProjectCosts,
  getPromptHours,
  validPlanningHours,
  type DemoAction,
  type DemoSceneId,
  type DemoState,
} from "../../lib/demo/machine";
import s from "./ProductDemo.module.css";

export type { DemoSceneId } from "../../lib/demo/machine";

type SceneProps = { state: DemoState; send: (action: DemoAction) => void };
const ICONS: Record<DemoSceneId, LucideIcon> = {
  dashboard: LayoutDashboard,
  angebot: Ruler,
  planung: CalendarDays,
  rechnung: FileText,
  beleg: ReceiptText,
  ki: Sparkles,
};
const APP_NAV_LABELS: Record<DemoSceneId, string> = {
  dashboard: "Dashboard",
  angebot: "Angebote",
  planung: "Plantafel",
  rechnung: "Rechnungen",
  beleg: "Belege",
  ki: "Craft AI",
};

const noSubscription = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

const STEP_GUIDANCE: Record<DemoSceneId, { title: string; hint: string }[]> = {
  dashboard: [
    {
      title: "Ihr Betrieb im Überblick",
      hint: "Öffnen Sie das Projekt, um vom Überblick in die konkrete Arbeit zu wechseln.",
    },
    {
      title: "Das Projekt ist geöffnet",
      hint: "Kunde, Termin und Budget gehören zusammen. Sehen Sie sich jetzt die erfassten Kosten an.",
    },
    {
      title: "Die Projektkosten im Blick",
      hint: "Die gebuchten Stunden und das zugeordnete Material bilden die bisher erfassten Kosten.",
    },
  ],
  angebot: [
    {
      title: "Fläche und Abzüge erfassen",
      hint: "Ändern Sie die Beispielwerte. Die Nettofläche wird direkt neu berechnet.",
    },
    {
      title: "Menge übernommen. Jetzt kalkulieren.",
      hint: "Ergänzen Sie die Kostenansätze für diese Angebotsposition.",
    },
    {
      title: "Der Preis ist berechnet",
      hint: "Prüfen Sie die Kosten und öffnen Sie anschließend die Angebotsvorschau.",
    },
    {
      title: "Ihr Angebot ist vorbereitet",
      hint: "Die Vorschau enthält genau die Menge und Preise aus Ihrer Beispielkalkulation.",
    },
  ],
  planung: [
    {
      title: "Einen Einsatz anlegen",
      hint: "Wählen Sie Person, Tag und Dauer für den Wandanstrich.",
    },
    {
      title: "Geplant. Jetzt den Termin ändern.",
      hint: "Ziehen Sie den Einsatz auf einen anderen Tag oder tippen Sie das Ziel an. Bei einer anderen Person entsteht eine Kopie.",
    },
    {
      title: "Der neue Einsatz ist angekommen",
      hint: "Die zugewiesene Person kann jetzt die Zeit in der Mobile-App starten.",
    },
    {
      title: "Die mobile Zeiterfassung läuft",
      hint: "Die Demo spult die geplante Dauer vor. Stoppen Sie den Timer, um diese Zeit zu buchen.",
    },
    {
      title: "Zeit gebucht. Kosten aktualisiert.",
      hint: "Die neue Arbeitszeit ergänzt die bereits vorhandenen Projektstunden.",
    },
  ],
  rechnung: [
    {
      title: "Eine dokumentierte Leistung wählen",
      hint: "Übernehmen Sie die Position aus dem fertigen Bautagesbericht.",
    },
    {
      title: "Rechnungsentwurf erstellt",
      hint: "Prüfen Sie Kunde, Leistung, Menge und Betrag. Der Entwurf hat noch keine Rechnungsnummer.",
    },
    {
      title: "Geprüft und bereit zum Abschluss",
      hint: "Erst „Rechnung fertigstellen“ schreibt die Rechnung fest und vergibt ihre Nummer.",
    },
    {
      title: "Festgeschrieben und nummeriert",
      hint: "Die Beispielrechnung hat jetzt ihre Nummer. Änderungen erfolgen über nachvollziehbare Folgebelege.",
    },
  ],
  beleg: [
    {
      title: "Mit dem Originalbeleg beginnen",
      hint: "Lassen Sie die Demo die Angaben dieses fiktiven Materialbelegs übernehmen.",
    },
    {
      title: "Erkannte Angaben kontrollieren",
      hint: "Vergleichen und korrigieren Sie die Angaben vor der Übernahme.",
    },
    {
      title: "Den geprüften Beleg zuordnen",
      hint: "Wählen Sie das Projekt, zu dem diese Ausgabe gehört.",
    },
    {
      title: "Die Ausgabe ist zugeordnet",
      hint: "In CraftOS folgen Kontierung und DATEV-Export für die Steuerberatung.",
    },
  ],
  ki: [
    {
      title: "Eine konkrete Bitte formulieren",
      hint: "Die lokale Demo versteht eine Dauer bis 12 Stunden und bereitet einen Zeiteintrag vor.",
    },
    {
      title: "Den Vorschlag prüfen",
      hint: "Kontrollieren Sie das Projekt und ändern Sie bei Bedarf die Dauer. Es wurde noch nichts angelegt.",
    },
    {
      title: "Jetzt ausdrücklich entscheiden",
      hint: "Autoplay endet hier. Nur Ihre Bestätigung legt den Zeiteintrag als Entwurf an.",
    },
    {
      title: "Ihr bestätigter Entwurf ist angelegt",
      hint: "Der Zeiteintrag steht als Entwurf zur weiteren Bearbeitung bereit.",
    },
  ],
};

function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "amber";
}) {
  return <span className={`${s.badge} ${s[tone]}`}>{children}</span>;
}

function Action({
  children,
  onClick,
  disabled,
  secondary = false,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  secondary?: boolean;
}) {
  return (
    <button
      type="button"
      className={secondary ? s.secondary : s.action}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function NumberField({
  label,
  value,
  onChange,
  suffix,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className={s.field}>
      <label htmlFor={id}>{label}</label>
      <div className={s.inputGroup}>
        <input
          id={id}
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          autoComplete="off"
        />
        {suffix && <span>{suffix}</span>}
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className={s.field}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <div className={s.field}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function PanelHeading({
  icon: Icon,
  title,
  subtitle,
  badge,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  badge?: ReactNode;
}) {
  return (
    <div className={s.panelHeading}>
      <div className={s.headingIcon}>
        <Icon size={18} aria-hidden="true" />
      </div>
      <div>
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {badge && <div className={s.headingBadge}>{badge}</div>}
    </div>
  );
}

function CostSummary({ state }: { state: DemoState }) {
  const costs = getProjectCosts(state);
  return (
    <div className={s.costSummary}>
      <div>
        <span>Gebuchte Arbeitszeit</span>
        <strong>{formatNumber(costs.hours)} Std.</strong>
      </div>
      <div>
        <span>
          Lohnkosten{" "}
          <small>× {formatEuro(DEMO_PROJECT.hourlyCost, 0)} / Std.</small>
        </span>
        <strong>{formatEuro(costs.labor)}</strong>
      </div>
      <div>
        <span>Zugeordnetes Material</span>
        <strong>{formatEuro(costs.material)}</strong>
      </div>
      <div className={s.costTotal}>
        <span>Bisher erfasste Kosten</span>
        <strong>{formatEuro(costs.total)}</strong>
      </div>
    </div>
  );
}

function RevenueChart({ period }: { period: "half" | "quarter" }) {
  const uid = useId().replace(/:/g, "");
  const values = period === "half" ? REVENUE : REVENUE.slice(-3);
  const width = 560,
    height = 160,
    max = 50000;
  const points = values.map(
    (p, i) =>
      `${24 + (i * (width - 48)) / (values.length - 1)},${height - (p.amount / max) * (height - 20)}`,
  );
  const path = `M ${points.join(" L ")}`;
  return (
    <div className={s.chartWrap}>
      <svg viewBox="0 0 560 188" role="img" aria-labelledby={`${uid}-title`}>
        <title id={`${uid}-title`}>
          {`Umsatz des Beispielbetriebs: ${values.map((p) => `${p.month} ${formatEuro(p.amount, 0)}`).join(", ")}.`}
        </title>
        <defs>
          <linearGradient id={`${uid}-area`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--demo-amber)" stopOpacity=".28" />
            <stop
              offset="100%"
              stopColor="var(--demo-amber)"
              stopOpacity=".02"
            />
          </linearGradient>
        </defs>
        {[34, 76, 118, 160].map((y) => (
          <line
            key={y}
            x1="24"
            y1={y}
            x2="536"
            y2={y}
            stroke="var(--demo-line)"
            strokeDasharray="3 5"
          />
        ))}
        <path d={`${path} L 536,160 L 24,160 Z`} fill={`url(#${uid}-area)`} />
        <path
          d={path}
          stroke="var(--demo-amber-dark)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {values.map((p, i) => (
          <g key={p.month}>
            <circle
              cx={24 + (i * 512) / (values.length - 1)}
              cy={160 - (p.amount / max) * 140}
              r={i === values.length - 1 ? 5 : 3.5}
              fill="var(--demo-amber-dark)"
              stroke="white"
              strokeWidth="2"
            />
            <text
              x={24 + (i * 512) / (values.length - 1)}
              y="184"
              textAnchor="middle"
              fill="var(--demo-muted)"
              fontSize="11"
            >
              {p.month}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function DashboardScene({ state, send }: SceneProps) {
  const projects = DEMO_PROJECTS.filter((p) =>
    `${p.name} ${p.customer}`
      .toLowerCase()
      .includes(state.dashboard.query.toLowerCase()),
  );
  if (state.step > 0) return <ProjectScene state={state} send={send} />;
  return (
    <div className={s.sceneEnter}>
      <div className={s.pageHeading}>
        <div>
          <p className={s.breadcrumb}>Betriebsübersicht</p>
          <h2>Guten Morgen, Alex.</h2>
          <p>Die Arbeit läuft. Hier behalten Sie den Überblick.</p>
        </div>
        <span className={s.datePill}>
          <CalendarDays size={14} /> Mittwoch, 9. September
        </span>
      </div>
      <div className={s.stats}>
        <div className={s.stat}>
          <span>
            <Wallet size={16} /> Umsatz im September
          </span>
          <strong>{formatEuro(42600, 0)}</strong>
          <small className={s.positive}>+34 % zum Vormonat</small>
        </div>
        <div className={s.stat}>
          <span>
            <FolderClosed size={16} /> Aktive Projekte
          </span>
          <strong>12</strong>
          <small>3 Projekte im Überblick</small>
        </div>
        <div className={s.stat}>
          <span>
            <FileText size={16} /> Offene Beträge
          </span>
          <strong>{formatEuro(8640, 0)}</strong>
          <small>5 Rechnungen ausstehend</small>
        </div>
      </div>
      <div className={s.dashboardMiddle}>
        <section className={s.panel}>
          <div className={s.panelTop}>
            <div>
              <h3>Umsatzentwicklung</h3>
              <p>Nettoerlöse des Beispielbetriebs</p>
            </div>
            <div className={s.segmented}>
              <button
                type="button"
                aria-pressed={state.dashboard.period === "half"}
                onClick={() =>
                  send({ type: "dashboard-period", period: "half" })
                }
              >
                6 Monate
              </button>
              <button
                type="button"
                aria-pressed={state.dashboard.period === "quarter"}
                onClick={() =>
                  send({ type: "dashboard-period", period: "quarter" })
                }
              >
                3 Monate
              </button>
            </div>
          </div>
          <RevenueChart period={state.dashboard.period} />
        </section>
        <aside className={`${s.panel} ${s.todayPanel}`}>
          <div className={s.panelTop}>
            <h3>Heute im Betrieb</h3>
            <Badge tone="amber">3 Termine</Badge>
          </div>
          <div className={s.todayItem}>
            <span className={s.time}>08:00</span>
            <div>
              <strong>Verkaufsraum vorbereiten</strong>
              <span>Bäckerei Krause</span>
            </div>
            <i className={s.statusDot} />
          </div>
          <div className={s.todayItem}>
            <span className={s.time}>10:30</span>
            <div>
              <strong>Aufmaß prüfen</strong>
              <span>Familie Weber</span>
            </div>
          </div>
          <div className={s.todayItem}>
            <span className={s.time}>14:00</span>
            <div>
              <strong>Materiallieferung</strong>
              <span>Praxis Sonnenhof</span>
            </div>
          </div>
          <button
            type="button"
            className={s.textButton}
            onClick={() => send({ type: "scene", scene: "planung" })}
          >
            Plantafel öffnen <ArrowRight size={15} />
          </button>
        </aside>
      </div>
      <section className={s.panel}>
        <div className={s.panelTop}>
          <h3>Aktuelle Projekte</h3>
          <label className={s.search}>
            <Search size={15} aria-hidden="true" />
            <span className={s.srOnly}>Projekte durchsuchen</span>
            <input
              placeholder="Projekt suchen"
              value={state.dashboard.query}
              onChange={(e) =>
                send({ type: "dashboard-query", value: e.target.value })
              }
            />
          </label>
        </div>
        <div className={s.projectTable}>
          <div className={s.tableHead}>
            <span>Projekt / Kunde</span>
            <span>Status</span>
            <span>Fällig am</span>
            <span>Budget</span>
            <span />
          </div>
          {projects.map((p) => (
            <button
              type="button"
              className={s.projectRow}
              key={p.id}
              onClick={() => send({ type: "open-project", project: p.id })}
            >
              <span className={s.projectName}>
                <i>
                  <FolderClosed size={17} />
                </i>
                <span>
                  <strong>{p.name}</strong>
                  <small>{p.customer}</small>
                </span>
              </span>
              <span>
                <Badge tone={p.status === "In Arbeit" ? "green" : "neutral"}>
                  {p.status}
                </Badge>
              </span>
              <span className={s.dueDate}>{p.due}</span>
              <strong className={s.budget}>{formatEuro(p.budget, 0)}</strong>
              <ChevronRight size={16} className={s.rowChevron} />
            </button>
          ))}
          {projects.length === 0 && (
            <p className={s.empty}>
              Kein Beispielprojekt gefunden. Suchen Sie etwa nach „Krause“.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function ProjectScene({ state, send }: SceneProps) {
  const project =
    DEMO_PROJECTS.find((p) => p.id === state.dashboard.project) ??
    DEMO_PROJECTS[0];
  const mainProject = project.id === "krause";
  return (
    <div className={s.sceneEnter}>
      <button
        type="button"
        className={s.textButton}
        onClick={() => send({ type: "reset" })}
      >
        <ArrowLeft size={15} /> Zur Betriebsübersicht
      </button>
      <div className={s.pageHeading}>
        <div>
          <p className={s.breadcrumb}>Projekte / {project.customer}</p>
          <h2>{project.name}</h2>
          <p>Von der Vorbereitung bis zur fertigen Arbeit.</p>
        </div>
        <Badge tone="green">{project.status}</Badge>
      </div>
      <div className={s.projectTabs}>
        <button
          type="button"
          aria-pressed={state.dashboard.tab === "overview"}
          onClick={() => send({ type: "project-tab", tab: "overview" })}
        >
          Übersicht
        </button>
        <button
          type="button"
          aria-pressed={state.dashboard.tab === "costs"}
          onClick={() => send({ type: "project-tab", tab: "costs" })}
        >
          Nachkalkulation
        </button>
      </div>
      <div className={s.split}>
        <section className={s.panel}>
          <PanelHeading
            icon={FolderClosed}
            title={
              state.dashboard.tab === "costs"
                ? "Kosten nachvollziehen"
                : "Projektübersicht"
            }
            subtitle={project.name}
          />
          {state.dashboard.tab === "costs" ? (
            mainProject ? (
              <>
                <CostSummary state={state} />
                <p className={s.panelNote}>
                  Leistungsauszug: Wandanstrich im Verkaufsraum. Das gesamte
                  Projektbudget beträgt {formatEuro(project.budget, 0)} netto.
                </p>
              </>
            ) : (
              <>
                <div className={s.largeNumber}>
                  {formatEuro(project.budget, 0)}
                  <span>Geplantes Projektbudget netto</span>
                </div>
                <p className={s.panelNote}>
                  Die detaillierte Kostenbuchung zeigt die Demo am Projekt
                  „Umbau Bäckerei Krause“.
                </p>
                <div className={s.panelBody}>
                  <Action
                    onClick={() =>
                      send({ type: "open-project", project: "krause" })
                    }
                  >
                    Beispielkalkulation öffnen <ArrowRight size={15} />
                  </Action>
                </div>
              </>
            )
          ) : (
            <>
              <div className={s.projectFacts}>
                <div>
                  <span>Kunde</span>
                  <strong>{project.customer}</strong>
                </div>
                <div>
                  <span>Fertigstellung geplant</span>
                  <strong>{project.due}</strong>
                </div>
                <div>
                  <span>Projektbudget netto</span>
                  <strong>{formatEuro(project.budget, 0)}</strong>
                </div>
              </div>
              <div className={s.progressBlock}>
                <div>
                  <span>Projektfortschritt</span>
                  <strong>{project.progress} %</strong>
                </div>
                <div className={s.progressTrack}>
                  <span style={{ width: `${project.progress}%` }} />
                </div>
              </div>
              <div className={s.projectPhases}>
                <span>
                  <CircleCheck size={17} /> Vorbereitung
                </span>
                <span className={s.currentPhase}>
                  <Clock3 size={17} /> Ausführung
                </span>
                <span>
                  <ClipboardCheck size={17} /> Abnahme
                </span>
              </div>
            </>
          )}
        </section>
        <section className={s.panel}>
          <PanelHeading
            icon={FileText}
            title="Alles am Projekt"
            subtitle="Ein durchgehender Arbeitsablauf"
          />
          <div className={s.documentLinks}>
            {(
              [
                {
                  scene: "angebot",
                  title: "Aufmaß & Angebot",
                  sub: "Mengen erfassen und kalkulieren",
                  icon: Ruler,
                },
                {
                  scene: "planung",
                  title: "Einsatz & Arbeitszeit",
                  sub: "Planung bis zur Nachkalkulation",
                  icon: CalendarDays,
                },
                {
                  scene: "rechnung",
                  title: "Bericht & Rechnung",
                  sub: "Dokumentierte Leistung abrechnen",
                  icon: FileText,
                },
              ] as const
            ).map((item) => (
              <button
                type="button"
                key={item.scene}
                onClick={() => send({ type: "scene", scene: item.scene })}
              >
                <item.icon size={20} />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.sub}</small>
                </span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function RoomDrawing({ state }: { state: DemoState }) {
  const calc = getCalculation(state);
  const ratio = calc.measurementValid
    ? Math.min(
        0.8,
        decimal(state.measurement.deduction) / decimal(state.measurement.area),
      )
    : 0.125;
  return (
    <div className={s.roomDrawing}>
      <svg
        viewBox="0 0 420 230"
        role="img"
        aria-label={`Schematisches Wandaufmaß: ${formatNumber(calc.area)} Quadratmeter Nettofläche`}
      >
        <rect
          x="58"
          y="32"
          width="304"
          height="155"
          rx="3"
          fill="var(--demo-amber-soft)"
          stroke="var(--demo-amber-dark)"
          strokeWidth="2"
        />
        <rect
          x={210 - Math.sqrt(ratio) * 140}
          y={187 - Math.sqrt(ratio) * 140}
          width={Math.sqrt(ratio) * 280}
          height={Math.sqrt(ratio) * 140}
          fill="var(--demo-panel)"
          stroke="var(--demo-amber-dark)"
          strokeDasharray="5 4"
        />
        <path
          d="M 58,14 V 22 M 58,18 H 362 M 362,14 V 22 M 38,32 H 46 M 42,32 V 187 M 38,187 H 46"
          stroke="var(--demo-muted)"
          fill="none"
        />
        <text
          x="210"
          y="93"
          textAnchor="middle"
          fill="var(--demo-text)"
          fontSize="19"
          fontWeight="600"
        >
          {formatNumber(calc.area)} m²
        </text>
        <text
          x="210"
          y="114"
          textAnchor="middle"
          fill="var(--demo-muted)"
          fontSize="12"
        >
          Netto-Wandfläche
        </text>
        <text
          x="210"
          y="215"
          textAnchor="middle"
          fill="var(--demo-muted)"
          fontSize="11"
        >
          Verkaufsraum · schematische Ansicht
        </text>
      </svg>
    </div>
  );
}

function DocumentPaper({
  state,
  invoice = false,
}: {
  state: DemoState;
  invoice?: boolean;
}) {
  const calc = getCalculation(state);
  return (
    <div className={s.paper}>
      <div className={s.paperBrand}>
        <span className={s.paperLogo}>K.</span>
        <div>
          <strong>Krause Ausbau</strong>
          <span>Fiktiver Beispielbetrieb</span>
        </div>
        <Badge tone={invoice && state.invoice.number ? "green" : "neutral"}>
          {invoice
            ? state.invoice.number
              ? "Fertiggestellt"
              : "Entwurf"
            : "Vorschau"}
        </Badge>
      </div>
      <div className={s.paperCustomer}>
        <small>Empfänger</small>
        <strong>{DEMO_PROJECT.customer}</strong>
        <span>{DEMO_PROJECT.contact}</span>
        <span>{DEMO_PROJECT.address}</span>
      </div>
      <div className={s.paperTitle}>
        <h3>{invoice ? "Rechnung" : "Angebot"}</h3>
        <span>
          {invoice
            ? (state.invoice.number ?? "Noch keine Rechnungsnummer")
            : "Wandanstrich im Verkaufsraum"}
        </span>
      </div>
      <p className={s.paperSubject}>{DEMO_PROJECT.name}</p>
      <div className={s.paperLineHead}>
        <span>Leistung</span>
        <span>Betrag</span>
      </div>
      <div className={s.paperLine}>
        <div>
          <strong>Wände vorbereiten und beschichten</strong>
          <span>
            {formatNumber(calc.area)} m² × {formatEuro(calc.unitPrice)}
          </span>
        </div>
        <strong>{formatEuro(calc.net)}</strong>
      </div>
      <div className={s.paperTotals}>
        <div>
          <span>Netto</span>
          <span>{formatEuro(calc.net)}</span>
        </div>
        <div>
          <span>Umsatzsteuer 19 %</span>
          <span>{formatEuro(calc.tax)}</span>
        </div>
        <div>
          <strong>Gesamtbetrag</strong>
          <strong>{formatEuro(calc.gross)}</strong>
        </div>
      </div>
      <p className={s.paperFoot}>Beispieldokument zur Produktdarstellung.</p>
    </div>
  );
}

function OfferScene({ state, send }: SceneProps) {
  const calc = getCalculation(state);
  return (
    <div className={s.sceneEnter}>
      <div className={s.pageHeading}>
        <div>
          <p className={s.breadcrumb}>
            Bäckerei Krause / Aufmaß & Massen / Angebot
          </p>
          <h2>Erfasst. Kalkuliert. Angeboten.</h2>
          <p>Eine Menge, die durch den ganzen Ablauf mitgeht.</p>
        </div>
        <Badge tone="amber">{formatNumber(calc.area)} m² netto</Badge>
      </div>
      {state.step === 3 ? (
        <div className={s.documentSplit}>
          <DocumentPaper state={state} />
          <aside className={s.explanationCard}>
            <CircleCheck size={25} />
            <h3>Die Werte sind übernommen.</h3>
            <p>
              Aus {state.measurement.area} m² Wandfläche und{" "}
              {state.measurement.deduction} m² Abzügen werden{" "}
              {formatNumber(calc.area)} m² Angebotsmenge.
            </p>
            <div className={s.costSummary}>
              <div>
                <span>Einheitspreis</span>
                <strong>{formatEuro(calc.unitPrice)} / m²</strong>
              </div>
              <div>
                <span>Nettoangebot</span>
                <strong>{formatEuro(calc.net)}</strong>
              </div>
            </div>
            <Action secondary onClick={() => send({ type: "calculate" })}>
              <ArrowLeft size={15} /> Kalkulation bearbeiten
            </Action>
          </aside>
        </div>
      ) : (
        <div className={s.split}>
          <section
            className={`${s.panel} ${state.step === 0 ? s.highlightPanel : ""}`}
          >
            <PanelHeading
              icon={Ruler}
              title="Raumaufmaß"
              subtitle="Verkaufsraum · manuell erfasst"
            />
            <RoomDrawing state={state} />
            <div className={s.panelBody}>
              <div className={s.fieldsTwo}>
                <NumberField
                  label="Wandfläche"
                  value={state.measurement.area}
                  onChange={(value) =>
                    send({ type: "measurement", field: "area", value })
                  }
                  suffix="m²"
                />
                <NumberField
                  label="Abzüge für Öffnungen"
                  value={state.measurement.deduction}
                  onChange={(value) =>
                    send({ type: "measurement", field: "deduction", value })
                  }
                  suffix="m²"
                />
              </div>
              {!calc.measurementValid && (
                <p className={s.error}>
                  Geben Sie eine positive Wandfläche und kleinere Abzüge ein.
                </p>
              )}
              <div className={s.inlineResult}>
                <span>Nettofläche</span>
                <strong>{formatNumber(calc.area)} m²</strong>
              </div>
              <Action
                onClick={() => send({ type: "save-measurement" })}
                disabled={!calc.measurementValid}
              >
                Als Angebotspositionen <ArrowRight size={16} />
              </Action>
            </div>
          </section>
          <section
            className={`${s.panel} ${state.step > 0 ? s.highlightPanel : ""}`}
          >
            <PanelHeading
              icon={FileText}
              title="Position kalkulieren"
              subtitle="Neuer Angebotsentwurf · Wandanstrich"
              badge={
                state.step > 0 ? (
                  <Badge tone="green">
                    <Check size={12} /> Menge übernommen
                  </Badge>
                ) : undefined
              }
            />
            <div className={s.panelBody}>
              <p className={s.quantityLine}>
                Menge aus Aufmaß{" "}
                <strong>
                  {state.step > 0
                    ? `${formatNumber(calc.area)} m²`
                    : "Noch nicht übernommen"}
                </strong>
              </p>
              <div className={s.fieldsTwo}>
                <NumberField
                  label="Material je m²"
                  value={state.calculation.material}
                  onChange={(value) =>
                    send({ type: "calculation", field: "material", value })
                  }
                  suffix="€"
                  disabled={state.step === 0}
                />
                <NumberField
                  label="Zeitansatz je m²"
                  value={state.calculation.hours}
                  onChange={(value) =>
                    send({ type: "calculation", field: "hours", value })
                  }
                  suffix="Std."
                  disabled={state.step === 0}
                />
                <NumberField
                  label="Lohnkosten je Stunde"
                  value={state.calculation.wage}
                  onChange={(value) =>
                    send({ type: "calculation", field: "wage", value })
                  }
                  suffix="€"
                  disabled={state.step === 0}
                />
                <NumberField
                  label="Zuschlag auf Kosten"
                  value={state.calculation.markup}
                  onChange={(value) =>
                    send({ type: "calculation", field: "markup", value })
                  }
                  suffix="%"
                  disabled={state.step === 0}
                />
              </div>
              {state.step > 0 && !calc.valid && (
                <p className={s.error}>
                  Prüfen Sie die Zahlen: Zeitansatz höchstens 24 Stunden,
                  Zuschlag höchstens 100 %.
                </p>
              )}
              <div className={s.costSummary}>
                <div>
                  <span>Material</span>
                  <strong>
                    {state.step > 0 ? formatEuro(calc.material) : "—"}
                  </strong>
                </div>
                <div>
                  <span>
                    Lohn <small>{formatNumber(calc.hours)} Std.</small>
                  </span>
                  <strong>
                    {state.step > 0 ? formatEuro(calc.labor) : "—"}
                  </strong>
                </div>
                <div>
                  <span>Zuschlag</span>
                  <strong>
                    {state.step > 0 ? formatEuro(calc.markup) : "—"}
                  </strong>
                </div>
                <div className={s.costTotal}>
                  <span>Position netto</span>
                  <strong>{state.step > 0 ? formatEuro(calc.net) : "—"}</strong>
                </div>
              </div>
              <Action
                disabled={state.step === 0 || !calc.valid}
                onClick={() =>
                  send({ type: state.step < 2 ? "calculate" : "preview-offer" })
                }
              >
                {state.step < 2
                  ? "Kalkulation übernehmen"
                  : "Angebotsvorschau öffnen"}{" "}
                <ArrowRight size={16} />
              </Action>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function PlanningScene({ state, send }: SceneProps) {
  const plan = state.planning;
  const member = DEMO_MEMBERS.find(
    (m) => m.id === (plan.assignment?.member ?? plan.member),
  )!;
  const day = DEMO_DAYS.find(
    (d) => d.id === (plan.assignment?.day ?? plan.day),
  )!;
  const minutes = Math.round((plan.assignment?.hours ?? 0) * 60);
  const timerText = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}:00`;
  return (
    <div className={s.sceneEnter}>
      <div className={s.pageHeading}>
        <div>
          <p className={s.breadcrumb}>Plantafel / Kalenderwoche 37</p>
          <h2>Ein Einsatz. Überall im Blick.</h2>
          <p>Planen Sie im Büro. Buchen Sie die Zeit auf der Baustelle.</p>
        </div>
        <Badge tone="amber">7.–11. September</Badge>
      </div>
      <div className={s.planningLayout} data-planning-step={state.step}>
        <section className={s.panel}>
          <PanelHeading
            icon={CalendarDays}
            title="Plantafel"
            subtitle={DEMO_PROJECT.name}
          />
          <div className={s.planningFields}>
            <SelectField
              label="Mitarbeiter"
              value={plan.member}
              onChange={(value) =>
                send({ type: "planning-field", field: "member", value })
              }
              options={DEMO_MEMBERS.map((m) => ({
                value: m.id,
                label: m.name,
              }))}
              disabled={plan.timer !== "idle"}
            />
            <SelectField
              label="Tag"
              value={plan.day}
              onChange={(value) =>
                send({ type: "planning-field", field: "day", value })
              }
              options={DEMO_DAYS.map((d) => ({
                value: d.id,
                label: `${d.short}, ${d.date}`,
              }))}
              disabled={plan.timer !== "idle"}
            />
            <NumberField
              label="Geplante Dauer"
              value={plan.hours}
              onChange={(value) =>
                send({ type: "planning-field", field: "hours", value })
              }
              suffix="Std."
              disabled={plan.timer !== "idle"}
            />
          </div>
          <div className={s.planningAction}>
            <Action
              disabled={
                plan.timer !== "idle" || !validPlanningHours(plan.hours)
              }
              onClick={() =>
                send(
                  plan.assignment
                    ? { type: "update-assignment" }
                    : { type: "save-assignment" },
                )
              }
            >
              {plan.assignment ? "Einsatz aktualisieren" : "Einsatz anlegen"}{" "}
              <Plus size={15} />
            </Action>
            {!validPlanningHours(plan.hours) && (
              <p className={s.error}>
                Die Dauer muss größer als 0 und höchstens 12 Stunden sein.
              </p>
            )}
          </div>
          <div className={s.boardPadding}>
            <PlanningBoard
              key={plan.assignment ? "planned" : "empty"}
              state={state}
              send={send}
            />
          </div>
        </section>
        {state.step >= 2 && (
          <aside className={s.mobileColumn}>
            <div className={s.phone}>
              <div className={s.phoneTop}>
                <span>09:41</span>
                <span className={s.phoneNotch} />
                <span>LTE</span>
              </div>
              <div className={s.phoneContent}>
                <p className={s.mobileGreeting}>
                  Hallo {member.name.split(" ")[0]},
                </p>
                <h3>Dein Arbeitstag</h3>
                <div className={s.mobileProject}>
                  <FolderClosed size={19} />
                  <div>
                    <strong>Bäckerei Krause</strong>
                    <span>
                      {day.short}, {day.date} · Wandanstrich
                    </span>
                  </div>
                </div>
                <div className={s.timerPanel}>
                  <span>
                    {plan.timer === "stopped"
                      ? "Zeit gebucht"
                      : plan.timer === "running"
                        ? "Zeiterfassung läuft"
                        : "Bereit für den Einsatz"}
                  </span>
                  <strong>
                    {plan.timer === "idle" ? "00:00:00" : timerText}
                  </strong>
                  <p>
                    <MapPin size={12} /> Standort im Beispiel verfügbar
                  </p>
                  <Action
                    disabled={!plan.assignment || plan.timer === "stopped"}
                    onClick={() =>
                      send({
                        type:
                          plan.timer === "running"
                            ? "stop-timer"
                            : "start-timer",
                      })
                    }
                  >
                    {plan.timer === "stopped" ? (
                      <>
                        <Check size={15} /> Gebucht
                      </>
                    ) : plan.timer === "running" ? (
                      <>
                        <Pause size={15} /> Stoppen & buchen
                      </>
                    ) : (
                      <>
                        <Play size={15} /> Timer starten
                      </>
                    )}
                  </Action>
                </div>
                <p className={s.timeTravelNote}>
                  Zeitraffer: Die Demo zeigt{" "}
                  {formatNumber(
                    (plan.assignment?.hours ?? decimal(plan.hours)) || 0,
                  )}{" "}
                  Stunden Arbeit.
                </p>
                {plan.timer === "stopped" && (
                  <div className={s.mobileSuccess}>
                    <CircleCheck size={18} />
                    <span>
                      {formatNumber(plan.loggedHours)} Std. dem Projekt
                      zugeordnet.
                    </span>
                  </div>
                )}
              </div>
              <div className={s.phoneHome} />
            </div>
            <span className={s.deviceLabel}>
              Zeiterfassung als Funktionsbeispiel
            </span>
          </aside>
        )}
      </div>
      {plan.timer === "stopped" && (
        <section className={`${s.panel} ${s.resultPanel}`}>
          <PanelHeading
            icon={Wallet}
            title="Die Nachkalkulation ist aktualisiert"
            subtitle={`${formatNumber(DEMO_PROJECT.baseHours)} vorhandene + ${formatNumber(plan.loggedHours)} neue Projektstunden`}
            badge={
              <Badge tone="green">
                <Check size={12} /> Zeit übernommen
              </Badge>
            }
          />
          <CostSummary state={state} />
        </section>
      )}
    </div>
  );
}

function InvoiceScene({ state, send }: SceneProps) {
  const calc = getCalculation(state);
  return (
    <div className={s.sceneEnter}>
      <div className={s.pageHeading}>
        <div>
          <p className={s.breadcrumb}>
            Bäckerei Krause / Bautagesbericht / Abrechnung
          </p>
          <h2>Die Leistung ist schon dokumentiert.</h2>
          <p>Übernehmen Sie sie in die Rechnung, ohne erneut abzutippen.</p>
        </div>
        <Badge tone={state.invoice.number ? "green" : "neutral"}>
          {state.invoice.number ?? "Noch keine Rechnungsnummer"}
        </Badge>
      </div>
      <div className={s.documentSplit}>
        {state.step === 0 ? (
          <section className={s.panel}>
            <PanelHeading
              icon={ClipboardCheck}
              title="Bautagesbericht"
              subtitle="Verkaufsraum · 9. September 2026"
              badge={<Badge tone="green">Abgeschlossen</Badge>}
            />
            <div className={s.reportBody}>
              <div className={s.reportIllustration}>
                <Ruler size={32} />
                <div>
                  <strong>Wandanstrich abgeschlossen</strong>
                  <span>Flächen vorbereitet und zweifach beschichtet.</span>
                </div>
              </div>
              <label className={s.checkRow}>
                <input
                  type="checkbox"
                  checked={state.invoice.selected}
                  onChange={(e) =>
                    send({ type: "select-report", selected: e.target.checked })
                  }
                />
                <span>
                  <strong>Dokumentierte Leistung übernehmen</strong>
                  <small>
                    {formatNumber(calc.area)} m² · {formatEuro(calc.unitPrice)}{" "}
                    je m²
                  </small>
                </span>
                <strong>
                  {formatEuro(state.invoice.selected ? calc.net : 0)}
                </strong>
              </label>
              <p className={s.note}>
                <ShieldCheck size={16} /> Der Bericht bleibt mit der Rechnung
                verbunden.
              </p>
              <Action
                disabled={!state.invoice.selected}
                onClick={() => send({ type: "create-invoice" })}
              >
                Rechnungsentwurf erstellen <ArrowRight size={16} />
              </Action>
            </div>
          </section>
        ) : (
          <DocumentPaper state={state} invoice />
        )}
        <aside className={s.explanationCard}>
          <FileCheck2 size={27} />
          <h3>
            {state.step === 0
              ? "Aus dem Bericht abrechnen"
              : state.step === 1
                ? "Zuerst ein Entwurf."
                : state.step === 2
                  ? "Geprüft und bereit."
                  : "Festgeschrieben und nummeriert."}
          </h3>
          <p>
            {state.step === 0
              ? "Die ausgewählte Position, ihre Menge und ihr Preis werden übernommen."
              : state.step === 1
                ? "Kunde, Projekt und Leistung sind bereits eingetragen. Eine Rechnungsnummer gibt es noch nicht."
                : state.step === 2
                  ? "Sie haben Kunde, Leistung und Betrag geprüft. Erst mit dem nächsten Schritt stellen Sie die Rechnung fertig."
                  : "Beim Fertigstellen wird die Rechnung festgeschrieben. Genau in diesem Schritt erhält sie ihre Nummer."}
          </p>
          <div className={s.invoiceJourney}>
            <span className={state.step >= 1 ? s.journeyDone : ""}>
              <Check size={14} /> Entwurf
            </span>
            <span className={state.step >= 2 ? s.journeyDone : ""}>
              <Check size={14} /> Geprüft
            </span>
            <span className={state.step >= 3 ? s.journeyDone : ""}>
              <Check size={14} /> Fertiggestellt
            </span>
          </div>
          {state.step === 1 && (
            <Action onClick={() => send({ type: "review-invoice" })}>
              Angaben geprüft <Check size={16} />
            </Action>
          )}
          {state.step === 2 && (
            <Action onClick={() => send({ type: "finalize-invoice" })}>
              Rechnung fertigstellen <FileCheck2 size={16} />
            </Action>
          )}
          {state.step === 3 && (
            <div className={s.finalNumber}>
              <CircleCheck size={20} />
              <strong>{state.invoice.number}</strong>
              <span>Beispielrechnung festgeschrieben</span>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function ReceiptScene({ state, send }: SceneProps) {
  const receipt = state.receipt;
  const net = decimal(receipt.net);
  const valid =
    Number.isFinite(net) &&
    net > 0 &&
    net <= 100000 &&
    !!receipt.supplier.trim() &&
    !!receipt.reference.trim();
  const project = DEMO_PROJECTS.find((p) => p.id === receipt.project)!;
  return (
    <div className={s.sceneEnter}>
      <div className={s.pageHeading}>
        <div>
          <p className={s.breadcrumb}>Belege / Eingangsrechnung</p>
          <h2>Vom Beleg zum richtigen Projekt.</h2>
          <p>Die Erkennung bereitet vor. Sie prüfen die Angaben.</p>
        </div>
        <Badge tone={receipt.assigned ? "green" : "amber"}>
          {receipt.assigned ? "Zugeordnet" : "Zur Prüfung"}
        </Badge>
      </div>
      <div className={s.receiptSplit}>
        <div className={s.scanSurface}>
          <div className={s.receiptPaper}>
            <div className={s.receiptLogo}>
              <span>B</span>
              <div>
                <strong>Baukontor Berlin</strong>
                <small>Fiktiver Materiallieferant</small>
              </div>
            </div>
            <div className={s.receiptMeta}>
              <h3>Materialrechnung</h3>
              <span>BK-2084 · 09.09.2026</span>
            </div>
            <p>
              Krause Ausbau
              <br />
              Umbau Bäckerei Krause
            </p>
            <div className={s.receiptItem}>
              <span>
                Beschichtungsmaterial
                <br />
                <small>42 m² × 8,50 €</small>
              </span>
              <strong>357,00 €</strong>
            </div>
            <div className={s.receiptSum}>
              <div>
                <span>Netto</span>
                <span>357,00 €</span>
              </div>
              <div>
                <span>USt. 19 %</span>
                <span>67,83 €</span>
              </div>
              <div>
                <strong>Gesamt</strong>
                <strong>424,83 €</strong>
              </div>
            </div>
            <div className={s.receiptEnd}>
              Beispielbeleg ohne Zahlungswirkung.
            </div>
          </div>
          <div className={s.scanLabel}>
            <ReceiptText size={15} /> Beispielbeleg.pdf
          </div>
        </div>
        <section
          className={`${s.panel} ${state.step > 0 ? s.highlightPanel : ""}`}
        >
          <PanelHeading
            icon={state.step === 3 ? FileCheck2 : ReceiptText}
            title={
              state.step === 3
                ? "Für die Buchhaltung vorbereitet"
                : "Erkannte Angaben"
            }
            subtitle={
              state.step === 0
                ? "Lokales Beispiel · keine Dateiübertragung"
                : state.step === 3
                  ? "Prüfung und Zuordnung abgeschlossen"
                  : "Alle Werte lassen sich korrigieren"
            }
          />
          <div className={s.panelBody}>
            {state.step === 0 ? (
              <>
                <div className={s.scanIntro}>
                  <ReceiptText size={38} />
                  <h3>Beispielbeleg auslesen</h3>
                  <p>
                    Die Demo übernimmt vorbereitete Beispieldaten; in CraftOS
                    benötigt die KI-Erkennung Internet und Credits.
                  </p>
                </div>
                <Action onClick={() => send({ type: "scan-receipt" })}>
                  Erkennung im Beispiel zeigen <ArrowRight size={16} />
                </Action>
              </>
            ) : state.step === 3 ? (
              <>
                <div className={s.successMessage}>
                  <CircleCheck size={20} />
                  <div>
                    <strong>{receipt.supplier}</strong>
                    <span>
                      Beleg {receipt.reference} ist {project.name} zugeordnet.
                    </span>
                  </div>
                </div>
                <div className={s.costSummary}>
                  <div>
                    <span>Belegbetrag netto</span>
                    <strong>{formatEuro(net)}</strong>
                  </div>
                  <div>
                    <span>Umsatzsteuer 19 %</span>
                    <strong>
                      {formatEuro(Math.round(net * 0.19 * 100) / 100)}
                    </strong>
                  </div>
                </div>
                <div className={s.datevNote}>
                  <ArrowDownLeft size={20} />
                  <h3>Der nächste Schritt: DATEV</h3>
                  <p>
                    In CraftOS prüfen Sie die Kontierung und erstellen
                    anschließend den DATEV-Export für die Steuerberatung.
                  </p>
                  <small>
                    Diese Demo übermittelt und exportiert keine Buchungsdaten.
                  </small>
                </div>
              </>
            ) : (
              <>
                <TextField
                  label="Lieferant"
                  value={receipt.supplier}
                  onChange={(value) =>
                    send({ type: "receipt-field", field: "supplier", value })
                  }
                />
                <TextField
                  label="Belegnummer"
                  value={receipt.reference}
                  onChange={(value) =>
                    send({ type: "receipt-field", field: "reference", value })
                  }
                />
                <NumberField
                  label="Nettobetrag"
                  value={receipt.net}
                  onChange={(value) =>
                    send({ type: "receipt-field", field: "net", value })
                  }
                  suffix="€"
                />
                {!valid && (
                  <p className={s.error}>
                    Lieferant, Belegnummer und ein positiver Nettobetrag sind
                    erforderlich.
                  </p>
                )}
                {state.step === 2 && (
                  <>
                    <div className={s.divider} />
                    <SelectField
                      label="Projekt zuordnen"
                      value={receipt.project}
                      onChange={(value) =>
                        send({ type: "receipt-field", field: "project", value })
                      }
                      options={DEMO_PROJECTS.map((p) => ({
                        value: p.id,
                        label: p.name,
                      }))}
                    />
                    <p className={s.note}>
                      <Check size={16} /> Die Angaben sind geprüft.
                    </p>
                  </>
                )}
                <Action
                  disabled={!valid}
                  onClick={() =>
                    send({
                      type:
                        state.step === 1 ? "review-receipt" : "assign-receipt",
                    })
                  }
                >
                  {state.step === 1 ? "Angaben geprüft" : "Beleg zuordnen"}{" "}
                  <Check size={16} />
                </Action>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function AiScene({ state, send }: SceneProps) {
  const promptId = useId();
  const validPrompt = getPromptHours(state.ai.prompt) !== null;
  const confirmed = state.ai.status === "confirmed";
  return (
    <div className={s.sceneEnter}>
      <div className={s.pageHeading}>
        <div>
          <p className={s.breadcrumb}>Craft AI / Beispielbetrieb</p>
          <h2>Aus einer Bitte wird ein prüfbarer Entwurf.</h2>
          <p>Sie sehen die Angaben, bevor Sie etwas übernehmen.</p>
        </div>
        <Badge tone="amber">
          <Sparkles size={12} /> Lokale Beispieldemo
        </Badge>
      </div>
      <div className={s.aiLayout}>
        <section className={s.chatPanel}>
          <div className={s.chatTitle}>
            <span className={s.aiMark}>
              <Sparkles size={20} />
            </span>
            <div>
              <h3>Craft AI</h3>
              <span>Ihr Assistent im Betrieb</span>
            </div>
            <ShieldCheck size={18} />
          </div>
          <div className={s.messages}>
            <div className={s.assistantMessage}>
              <span className={s.aiAvatar}>
                <Sparkles size={14} />
              </span>
              <p>
                Ich kann für das Beispielprojekt einen Zeiteintrag vorbereiten.
                Nennen Sie mir eine Dauer zwischen 0 und 12 Stunden.
              </p>
            </div>
            {state.step > 0 && (
              <>
                <div className={s.userMessage}>{state.ai.prompt}</div>
                <div className={s.assistantMessage}>
                  <span className={s.aiAvatar}>
                    <Sparkles size={14} />
                  </span>
                  <p>
                    {confirmed
                      ? "Der bestätigte Zeiteintrag wurde als Entwurf angelegt."
                      : "Hier ist mein Vorschlag. Prüfen Sie Projekt und Dauer; bisher wurde nichts angelegt."}
                  </p>
                </div>
              </>
            )}
            {confirmed && (
              <div className={s.savedRecord}>
                <CircleCheck size={20} />
                <div>
                  <strong>Zeiteintrag als Entwurf angelegt</strong>
                  <span>
                    {formatNumber(state.ai.savedHours)} Std. · Wandanstrich
                  </span>
                  <small>{DEMO_PROJECT.name}</small>
                </div>
              </div>
            )}
          </div>
          <div className={s.composer}>
            <label htmlFor={promptId}>Ihre Beispielanfrage</label>
            <textarea
              id={promptId}
              rows={3}
              value={state.ai.prompt}
              onChange={(e) =>
                send({ type: "ai-prompt", value: e.target.value })
              }
              disabled={confirmed}
            />
            {!validPrompt && (
              <p className={s.error}>
                Nennen Sie eine Dauer, zum Beispiel „2 Stunden Wandanstrich“.
              </p>
            )}
            <div>
              <small>Fiktive Daten · keine echte KI</small>
              <button
                type="button"
                className={s.action}
                onClick={() => send({ type: "create-ai-draft" })}
                disabled={!validPrompt || state.ai.status !== "idle"}
              >
                Entwurf vorbereiten <Send size={15} />
              </button>
            </div>
          </div>
        </section>
        <aside className={s.aiReview}>
          {state.step === 0 ? (
            <div className={s.draftEmpty}>
              <FileText size={35} />
              <h3>Hier erscheint der Vorschlag.</h3>
              <p>
                Bearbeiten Sie die Anfrage oder starten Sie mit dem
                vorbereiteten Beispiel.
              </p>
              <div className={s.suggestionButtons}>
                {["2", "3,5", "5"].map((hours) => (
                  <button
                    type="button"
                    key={hours}
                    onClick={() =>
                      send({
                        type: "ai-prompt",
                        value: `Bereite ${hours} Stunden Wandanstrich für Umbau Bäckerei Krause als Zeiteintrag vor.`,
                      })
                    }
                  >
                    {hours} Stunden einsetzen
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <section className={`${s.panel} ${s.draftCard}`}>
              <PanelHeading
                icon={Clock3}
                title="Entwurf: Zeiteintrag"
                subtitle="Noch nicht final freigegeben"
                badge={
                  <Badge tone={confirmed ? "green" : "amber"}>
                    {confirmed ? "Angelegt" : "Zur Prüfung"}
                  </Badge>
                }
              />
              <div className={s.panelBody}>
                <div className={s.draftFacts}>
                  <div>
                    <span>Projekt</span>
                    <strong>{DEMO_PROJECT.name}</strong>
                  </div>
                  <div>
                    <span>Tätigkeit</span>
                    <strong>Wandanstrich im Verkaufsraum</strong>
                  </div>
                  <div>
                    <span>Datum</span>
                    <strong>09.09.2026</strong>
                  </div>
                </div>
                <NumberField
                  label="Dauer prüfen oder ändern"
                  value={state.ai.hours}
                  onChange={(value) => send({ type: "ai-hours", value })}
                  suffix="Std."
                  disabled={confirmed}
                />
                {!validPlanningHours(state.ai.hours) && (
                  <p className={s.error}>
                    Die Dauer muss größer als 0 und höchstens 12 Stunden sein.
                  </p>
                )}
                {state.ai.status === "draft" && (
                  <Action
                    disabled={!validPlanningHours(state.ai.hours)}
                    onClick={() => send({ type: "review-ai" })}
                  >
                    Entwurf geprüft <Check size={16} />
                  </Action>
                )}
                {state.ai.status === "reviewed" && (
                  <>
                    <div className={s.confirmNotice}>
                      <ShieldCheck size={20} />
                      <p>
                        Erst Ihre Bestätigung legt den Zeiteintrag als Entwurf
                        an.
                      </p>
                    </div>
                    <Action
                      onClick={() =>
                        send({ type: "confirm-ai", source: "user" })
                      }
                    >
                      Jetzt ausdrücklich bestätigen <Check size={16} />
                    </Action>
                  </>
                )}
                {confirmed && (
                  <div className={s.successMessage}>
                    <CircleCheck size={22} />
                    <p>
                      Bestätigt. Der neue Entwurf ist in der Zeiterfassung
                      verfügbar.
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

function MobileFact({
  label,
  children,
  prominent = false,
}: {
  label: string;
  children: ReactNode;
  prominent?: boolean;
}) {
  return (
    <div
      className={`${s.mobileFact} ${prominent ? s.mobileFactProminent : ""}`}
    >
      <span>{label}</span>
      <strong>{children}</strong>
    </div>
  );
}

function MobileDocument({
  state,
  invoice = false,
}: {
  state: DemoState;
  invoice?: boolean;
}) {
  const calc = getCalculation(state);
  return (
    <div className={s.mobileDocument}>
      <div className={s.mobileDocumentHeader}>
        <FileText size={22} />
        <strong>{invoice ? "Rechnung" : "Angebotsvorschau"}</strong>
        <Badge tone={state.invoice.number ? "green" : "neutral"}>
          {invoice ? (state.invoice.number ? "Fertig" : "Entwurf") : "Beispiel"}
        </Badge>
      </div>
      {invoice && (
        <p className={s.mobileDocumentNumber}>
          {state.invoice.number ?? "Noch keine Rechnungsnummer"}
        </p>
      )}
      <MobileFact label="Kunde">{DEMO_PROJECT.customer}</MobileFact>
      <div className={s.mobileLineItem}>
        <strong>Wände vorbereiten und beschichten</strong>
        <span>
          {formatNumber(calc.area)} m² × {formatEuro(calc.unitPrice)}
        </span>
      </div>
      <MobileFact label="Netto">{formatEuro(calc.net)}</MobileFact>
      <MobileFact label="Umsatzsteuer 19 %">{formatEuro(calc.tax)}</MobileFact>
      <MobileFact label="Gesamtbetrag" prominent>
        {formatEuro(calc.gross)}
      </MobileFact>
    </div>
  );
}

/** One task per screen on a phone; all actions use the desktop state machine. */
function MobileStepContent({ state, send }: SceneProps) {
  const promptId = useId();
  const calc = getCalculation(state);
  const plan = state.planning;
  const assignment = plan.assignment;
  const next = getNextDemoAction(state);
  const assignedMember = DEMO_MEMBERS.find(
    (m) => m.id === (assignment?.member ?? plan.member),
  )!;
  const assignedDay = DEMO_DAYS.find(
    (d) => d.id === (assignment?.day ?? plan.day),
  )!;
  const project =
    DEMO_PROJECTS.find((p) => p.id === state.dashboard.project) ??
    DEMO_PROJECTS[0];
  const selectedReceiptProject =
    DEMO_PROJECTS.find((p) => p.id === state.receipt.project) ??
    DEMO_PROJECTS[0];
  const receiptNet = decimal(state.receipt.net);
  const validReceipt =
    receiptNet > 0 &&
    receiptNet <= 100000 &&
    !!state.receipt.supplier.trim() &&
    !!state.receipt.reference.trim();

  if (state.scene === "dashboard") {
    if (state.step === 0)
      return (
        <>
          <div className={s.mobileMetrics}>
            <div>
              <span>Umsatz September</span>
              <strong>{formatEuro(42600, 0)}</strong>
            </div>
            <div>
              <span>Offene Beträge</span>
              <strong>{formatEuro(8640, 0)}</strong>
            </div>
          </div>
          <p className={s.mobileSectionLabel}>Ihr nächster Blick ins Projekt</p>
          <button
            type="button"
            className={s.mobileProjectButton}
            onClick={() => send({ type: "open-project", project: "krause" })}
          >
            <FolderClosed size={25} />
            <span>
              <strong>{DEMO_PROJECT.name}</strong>
              <small>In Arbeit · fällig am {DEMO_PROJECT.due}</small>
              <b>Projekt öffnen</b>
            </span>
            <ChevronRight size={20} />
          </button>
          <p className={s.mobileFootnote}>
            Ausschnitt aus der Betriebsübersicht mit fiktiven Zahlen.
          </p>
        </>
      );
    if (state.step === 1)
      return (
        <>
          <div className={s.mobileResultBanner}>
            <FolderClosed size={21} />
            <strong>{project.name}</strong>
          </div>
          <MobileFact label="Kunde">{project.customer}</MobileFact>
          <MobileFact label="Geplante Fertigstellung">{project.due}</MobileFact>
          <MobileFact label="Projektbudget netto">
            {formatEuro(project.budget, 0)}
          </MobileFact>
          <div className={s.mobileProgress}>
            <span>Fortschritt: {project.progress} %</span>
            <div>
              <i style={{ width: `${project.progress}%` }} />
            </div>
          </div>
          <Action onClick={() => send({ type: "project-tab", tab: "costs" })}>
            Nachkalkulation öffnen <ArrowRight size={16} />
          </Action>
        </>
      );
    return (
      <>
        <div className={s.mobileResultBanner}>
          <Wallet size={21} />
          <strong>Wandanstrich im Verkaufsraum</strong>
        </div>
        <CostSummary state={state} />
        <p className={s.mobileFootnote}>
          Leistungsauszug aus „Umbau Bäckerei Krause“. Gesamtbudget:{" "}
          {formatEuro(DEMO_PROJECT.budget, 0)} netto.
        </p>
      </>
    );
  }

  if (state.scene === "angebot") {
    if (state.step === 0)
      return (
        <>
          <p className={s.mobileSectionLabel}>
            {DEMO_PROJECT.room} · manuelles Aufmaß
          </p>
          <div className={s.mobileFieldPair}>
            <NumberField
              label="Wandfläche"
              value={state.measurement.area}
              suffix="m²"
              onChange={(value) =>
                send({ type: "measurement", field: "area", value })
              }
            />
            <NumberField
              label="Abzüge für Öffnungen"
              value={state.measurement.deduction}
              suffix="m²"
              onChange={(value) =>
                send({ type: "measurement", field: "deduction", value })
              }
            />
          </div>
          <div className={s.mobileArea}>
            <Ruler size={27} />
            <div>
              <span>Nettofläche</span>
              <strong>{formatNumber(calc.area)} m²</strong>
            </div>
          </div>
          {!calc.measurementValid && (
            <p className={s.error}>
              Wandfläche größer als 0 eingeben; Abzüge müssen kleiner sein.
            </p>
          )}
          <Action
            disabled={!calc.measurementValid}
            onClick={() => send({ type: "save-measurement" })}
          >
            Als Angebotspositionen <ArrowRight size={16} />
          </Action>
        </>
      );
    if (state.step === 1)
      return (
        <>
          <div className={s.mobileResultBanner}>
            <CircleCheck size={21} />
            <strong>
              {formatNumber(calc.area)} m² im neuen Angebotsentwurf
            </strong>
          </div>
          <div className={s.mobileFieldPair}>
            <NumberField
              label="Material je m²"
              value={state.calculation.material}
              suffix="€"
              onChange={(value) =>
                send({ type: "calculation", field: "material", value })
              }
            />
            <NumberField
              label="Zeitansatz je m²"
              value={state.calculation.hours}
              suffix="h"
              onChange={(value) =>
                send({ type: "calculation", field: "hours", value })
              }
            />
            <NumberField
              label="Lohnkosten je Stunde"
              value={state.calculation.wage}
              suffix="€"
              onChange={(value) =>
                send({ type: "calculation", field: "wage", value })
              }
            />
            <NumberField
              label="Kostenaufschlag"
              value={state.calculation.markup}
              suffix="%"
              onChange={(value) =>
                send({ type: "calculation", field: "markup", value })
              }
            />
          </div>
          <MobileFact label="Einheitspreis netto" prominent>
            {formatEuro(calc.unitPrice)} / m²
          </MobileFact>
          {!calc.valid && (
            <p className={s.error}>
              Prüfen Sie die Kostenansätze und den Zuschlag.
            </p>
          )}
          <Action
            disabled={!calc.valid}
            onClick={() => send({ type: "calculate" })}
          >
            Position kalkulieren <ArrowRight size={16} />
          </Action>
        </>
      );
    if (state.step === 2)
      return (
        <>
          <MobileFact label="Materialkosten">
            {formatEuro(calc.material)}
          </MobileFact>
          <MobileFact label={`Lohn · ${formatNumber(calc.hours)} Stunden`}>
            {formatEuro(calc.labor)}
          </MobileFact>
          <MobileFact label="Kalkulierter Zuschlag">
            {formatEuro(calc.markup)}
          </MobileFact>
          <MobileFact label="Angebotssumme netto" prominent>
            {formatEuro(calc.net)}
          </MobileFact>
          <Action onClick={() => send({ type: "preview-offer" })}>
            Angebotsvorschau öffnen <ArrowRight size={16} />
          </Action>
          <button
            type="button"
            className={s.mobileEdit}
            onClick={() => send({ type: "save-measurement" })}
          >
            Kostenansätze bearbeiten
          </button>
        </>
      );
    return <MobileDocument state={state} />;
  }

  if (state.scene === "planung") {
    if (state.step === 1)
      return <PlanningBoard compact state={state} send={send} />;
    if (state.step <= 1)
      return (
        <>
          {assignment && (
            <div className={s.mobileResultBanner}>
              <CircleCheck size={21} />
              <span>
                <strong>Einsatz angelegt</strong>
                <small>
                  {assignedDay.short}, {assignedDay.date} ·{" "}
                  {assignedMember.name}
                </small>
              </span>
            </div>
          )}
          <SelectField
            label="Mitarbeiter"
            value={plan.member}
            onChange={(value) =>
              send({ type: "planning-field", field: "member", value })
            }
            options={DEMO_MEMBERS.map((m) => ({ value: m.id, label: m.name }))}
          />
          <div className={s.mobileFieldPair}>
            <SelectField
              label={assignment ? "Neuer Einsatztag" : "Einsatztag"}
              value={
                assignment && next?.type === "move-assignment"
                  ? next.day
                  : plan.day
              }
              onChange={(value) =>
                send({ type: "planning-field", field: "day", value })
              }
              options={DEMO_DAYS.map((d) => ({
                value: d.id,
                label: `${d.short}, ${d.date}`,
              }))}
            />
            <NumberField
              label="Geplante Dauer"
              value={plan.hours}
              suffix="Std."
              onChange={(value) =>
                send({ type: "planning-field", field: "hours", value })
              }
            />
          </div>
          {!validPlanningHours(plan.hours) && (
            <p className={s.error}>
              Die Dauer muss größer als 0 und höchstens 12 Stunden sein.
            </p>
          )}
          <Action
            disabled={!validPlanningHours(plan.hours)}
            onClick={() =>
              send(
                assignment && next?.type === "move-assignment"
                  ? next
                  : { type: "save-assignment" },
              )
            }
          >
            {assignment ? "Einsatz verschieben" : "Einsatz anlegen"}{" "}
            <ArrowRight size={16} />
          </Action>
        </>
      );
    if (state.step <= 3) {
      const hours = assignment?.hours ?? 0;
      const minutes = Math.round(hours * 60);
      return (
        <>
          {state.step === 2 && plan.lastChange && (
            <>
              <div className={s.mobileResultBanner} role="status">
                <CircleCheck size={21} />
                <span>
                  <strong>
                    {plan.lastChange.kind === "copied"
                      ? "Zusätzlich eingeplant"
                      : "Einsatz verschoben"}
                  </strong>
                  <small>
                    {
                      DEMO_MEMBERS.find(
                        (m) => m.id === plan.lastChange?.to.member,
                      )?.name
                    }{" "}
                    am{" "}
                    {
                      DEMO_DAYS.find((d) => d.id === plan.lastChange?.to.day)
                        ?.label
                    }
                    . {formatNumber(plan.lastChange.to.hours)} Std.
                  </small>
                  {plan.lastChange.kind === "copied" && (
                    <small>Der ursprüngliche Einsatz bleibt bestehen.</small>
                  )}
                </span>
              </div>
              <details className={s.mobileBoardDetails}>
                <summary>Plantafel weiter ausprobieren</summary>
                <PlanningBoard compact state={state} send={send} />
              </details>
            </>
          )}
          <div className={s.mobileResultBanner}>
            <CalendarDays size={21} />
            <span>
              <strong>
                {assignedDay.label}, {assignedDay.date}
              </strong>
              <small>
                {assignedMember.name} · {DEMO_PROJECT.name}
              </small>
            </span>
          </div>
          <div className={s.mobileTimer}>
            <span>
              {plan.timer === "running"
                ? "Zeiterfassung läuft · Zeitraffer"
                : "Mobile-App · Bereit für den Einsatz"}
            </span>
            <strong>
              {plan.timer === "running"
                ? `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}:00`
                : "00:00:00"}
            </strong>
            <p>
              <MapPin size={13} /> Standort im Beispiel verfügbar
            </p>
          </div>
          <Action
            onClick={() =>
              send({
                type: plan.timer === "running" ? "stop-timer" : "start-timer",
              })
            }
          >
            {plan.timer === "running" ? "Stoppen & buchen" : "Timer starten"}{" "}
            {plan.timer === "running" ? (
              <Check size={16} />
            ) : (
              <Play size={16} />
            )}
          </Action>
          <p className={s.mobileFootnote}>
            Die Demo zeigt {formatNumber(hours)} Stunden im Zeitraffer. Es wird
            keine echte Arbeitszeit gespeichert.
          </p>
        </>
      );
    }
    return (
      <>
        <div className={s.mobileResultBanner}>
          <CircleCheck size={21} />
          <strong>{formatNumber(plan.loggedHours)} Stunden neu gebucht</strong>
        </div>
        <CostSummary state={state} />
        <p className={s.mobileFootnote}>
          {formatNumber(DEMO_PROJECT.baseHours)} vorhandene +{" "}
          {formatNumber(plan.loggedHours)} neue Stunden zu{" "}
          {formatEuro(DEMO_PROJECT.hourlyCost)} Lohnkosten je Stunde.
        </p>
      </>
    );
  }

  if (state.scene === "rechnung") {
    if (state.step === 0)
      return (
        <>
          <div className={s.mobileResultBanner}>
            <ClipboardCheck size={22} />
            <span>
              <strong>Bautagesbericht abgeschlossen</strong>
              <small>Verkaufsraum · 09.09.2026</small>
            </span>
          </div>
          <label className={s.mobileCheckbox}>
            <input
              type="checkbox"
              checked={state.invoice.selected}
              onChange={(event) =>
                send({ type: "select-report", selected: event.target.checked })
              }
            />
            <span>
              <strong>Wände vorbereiten und beschichten</strong>
              <small>
                {formatNumber(calc.area)} m² × {formatEuro(calc.unitPrice)}
              </small>
            </span>
          </label>
          <MobileFact label="Ausgewählte Leistung netto" prominent>
            {formatEuro(state.invoice.selected ? calc.net : 0)}
          </MobileFact>
          <Action
            disabled={!state.invoice.selected}
            onClick={() => send({ type: "create-invoice" })}
          >
            Rechnungsentwurf erstellen <ArrowRight size={16} />
          </Action>
        </>
      );
    return (
      <>
        {state.step === 3 && (
          <div className={s.mobileResultBanner}>
            <ShieldCheck size={23} />
            <span>
              <strong>{state.invoice.number}</strong>
              <small>Beispielrechnung festgeschrieben</small>
            </span>
          </div>
        )}
        <MobileDocument state={state} invoice />
        {state.step === 1 && (
          <Action onClick={() => send({ type: "review-invoice" })}>
            Angaben geprüft <Check size={16} />
          </Action>
        )}
        {state.step === 2 && (
          <Action onClick={() => send({ type: "finalize-invoice" })}>
            Rechnung fertigstellen <FileCheck2 size={16} />
          </Action>
        )}
      </>
    );
  }

  if (state.scene === "beleg") {
    if (state.step === 0)
      return (
        <>
          <div className={s.mobileDocument}>
            <div className={s.mobileDocumentHeader}>
              <ReceiptText size={22} />
              <strong>Materialrechnung</strong>
            </div>
            <MobileFact label="Lieferant">Baukontor Berlin</MobileFact>
            <MobileFact label="Belegnummer">BK-2084</MobileFact>
            <div className={s.mobileLineItem}>
              <strong>Beschichtungsmaterial</strong>
              <span>42 m² × 8,50 €</span>
            </div>
            <MobileFact label="Netto" prominent>
              357,00 €
            </MobileFact>
            <MobileFact label="Mit 19 % Umsatzsteuer">424,83 €</MobileFact>
          </div>
          <Action onClick={() => send({ type: "scan-receipt" })}>
            Erkennung im Beispiel zeigen <ArrowRight size={16} />
          </Action>
        </>
      );
    if (state.step === 1)
      return (
        <>
          <p className={s.mobileOriginal}>
            Original: Baukontor Berlin · BK-2084 · 357,00 € netto
          </p>
          <TextField
            label="Lieferant"
            value={state.receipt.supplier}
            onChange={(value) =>
              send({ type: "receipt-field", field: "supplier", value })
            }
          />
          <div className={s.mobileFieldPair}>
            <TextField
              label="Belegnummer"
              value={state.receipt.reference}
              onChange={(value) =>
                send({ type: "receipt-field", field: "reference", value })
              }
            />
            <NumberField
              label="Nettobetrag"
              suffix="€"
              value={state.receipt.net}
              onChange={(value) =>
                send({ type: "receipt-field", field: "net", value })
              }
            />
          </div>
          {!validReceipt && (
            <p className={s.error}>
              Lieferant, Belegnummer und positiver Nettobetrag sind
              erforderlich.
            </p>
          )}
          <Action
            disabled={!validReceipt}
            onClick={() => send({ type: "review-receipt" })}
          >
            Angaben geprüft <Check size={16} />
          </Action>
        </>
      );
    if (state.step === 2)
      return (
        <>
          <div className={s.mobileResultBanner}>
            <CircleCheck size={21} />
            <span>
              <strong>{state.receipt.supplier}</strong>
              <small>
                {state.receipt.reference} · {formatEuro(receiptNet)} netto
                geprüft
              </small>
            </span>
          </div>
          <SelectField
            label="Projekt zuordnen"
            value={state.receipt.project}
            onChange={(value) =>
              send({ type: "receipt-field", field: "project", value })
            }
            options={DEMO_PROJECTS.map((p) => ({ value: p.id, label: p.name }))}
          />
          <Action onClick={() => send({ type: "assign-receipt" })}>
            Beleg zuordnen <Check size={16} />
          </Action>
        </>
      );
    return (
      <>
        <div className={s.mobileResultBanner}>
          <CircleCheck size={22} />
          <span>
            <strong>{selectedReceiptProject.name}</strong>
            <small>Beleg {state.receipt.reference} ist zugeordnet.</small>
          </span>
        </div>
        <MobileFact label="Belegbetrag netto" prominent>
          {formatEuro(receiptNet)}
        </MobileFact>
        <div className={s.mobileNextInfo}>
          <h3>Weiter zur Buchhaltung</h3>
          <p>
            Kontierung prüfen, dann den DATEV-Export für die Steuerberatung
            erstellen.
          </p>
          <small>
            Die Demo exportiert und übermittelt keine Buchungsdaten.
          </small>
        </div>
      </>
    );
  }

  if (state.step === 0)
    return (
      <>
        <label className={s.mobilePromptLabel} htmlFor={promptId}>
          Ihre Beispielanfrage
        </label>
        <textarea
          id={promptId}
          className={s.mobilePrompt}
          rows={3}
          value={state.ai.prompt}
          onChange={(event) =>
            send({ type: "ai-prompt", value: event.target.value })
          }
        />
        <div className={s.mobileSuggestions}>
          {["2", "3,5", "5"].map((hours) => (
            <button
              type="button"
              key={hours}
              onClick={() =>
                send({
                  type: "ai-prompt",
                  value: `Bereite ${hours} Stunden Wandanstrich für Umbau Bäckerei Krause als Zeiteintrag vor.`,
                })
              }
            >
              {hours} Stunden
            </button>
          ))}
        </div>
        <Action
          disabled={getPromptHours(state.ai.prompt) === null}
          onClick={() => send({ type: "create-ai-draft" })}
        >
          Entwurf vorbereiten <Sparkles size={16} />
        </Action>
        <p className={s.mobileFootnote}>Fiktive Daten · keine echte KI</p>
      </>
    );
  if (state.step === 2)
    return (
      <>
        <div className={s.mobileResultBanner}>
          <Clock3 size={22} />
          <span>
            <strong>
              {formatNumber(decimal(state.ai.hours))} Stunden Wandanstrich
            </strong>
            <small>{DEMO_PROJECT.name}</small>
          </span>
        </div>
        <p className={s.mobileConsent}>
          <ShieldCheck size={20} />
          Bisher wurde nichts angelegt. Sie entscheiden jetzt über die
          Übernahme.
        </p>
        <Action onClick={() => send({ type: "confirm-ai", source: "user" })}>
          Jetzt ausdrücklich bestätigen <Check size={16} />
        </Action>
        <button
          type="button"
          className={s.mobileEdit}
          onClick={() => send({ type: "edit-ai-draft" })}
        >
          Entwurf bearbeiten
        </button>
      </>
    );
  return (
    <>
      <div className={s.mobileResultBanner}>
        <Clock3 size={22} />
        <span>
          <strong>
            {state.step === 3
              ? "Zeiteintrag als Entwurf angelegt"
              : "Vorschlag: Zeiteintrag"}
          </strong>
          <small>{DEMO_PROJECT.name}</small>
        </span>
      </div>
      <MobileFact label="Tätigkeit">Wandanstrich im Verkaufsraum</MobileFact>
      {state.step === 1 ? (
        <NumberField
          label="Dauer prüfen oder ändern"
          value={state.ai.hours}
          suffix="Std."
          onChange={(value) => send({ type: "ai-hours", value })}
        />
      ) : (
        <MobileFact label="Dauer" prominent>
          {formatNumber(decimal(state.ai.hours))} Std.
        </MobileFact>
      )}
      {!validPlanningHours(state.ai.hours) && (
        <p className={s.error}>
          Die Dauer muss größer als 0 und höchstens 12 Stunden sein.
        </p>
      )}
      {state.step === 1 && (
        <Action
          disabled={!validPlanningHours(state.ai.hours)}
          onClick={() => send({ type: "review-ai" })}
        >
          Entwurf geprüft <Check size={16} />
        </Action>
      )}
    </>
  );
}

const SCENE_COMPONENTS = {
  dashboard: DashboardScene,
  angebot: OfferScene,
  planung: PlanningScene,
  rechnung: InvoiceScene,
  beleg: ReceiptScene,
  ki: AiScene,
};

export function ProductDemo({
  initialScene = "dashboard",
  compact = false,
}: {
  initialScene?: DemoSceneId;
  compact?: boolean;
}) {
  const [state, dispatch] = useReducer(
    demoReducer,
    initialScene,
    createDemoState,
  );
  const root = useRef<HTMLDivElement>(null);
  const mobileStage = useRef<HTMLFieldSetElement>(null);
  const desktopTitle = useRef<HTMLHeadingElement>(null);
  const mobileTitle = useRef<HTMLHeadingElement>(null);
  const focusAfterAction = useRef(false);
  const hydrationReady = useSyncExternalStore(
    noSubscription,
    clientReady,
    serverReady,
  );
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const labelId = useId();
  const mobilePickerId = useId();
  const disclaimerId = useId();
  const scene = DEMO_SCENES.find((item) => item.id === state.scene)!;
  const mobileGuidance = STEP_GUIDANCE[state.scene][state.step];
  const followingScene =
    DEMO_SCENES[(DEMO_SCENES.indexOf(scene) + 1) % DEMO_SCENES.length];
  const Scene = SCENE_COMPONENTS[state.scene];
  const nextAction = getNextDemoAction(state);
  const canAdvance =
    nextAction !== null &&
    demoReducer(state, { ...nextAction, source: "autoplay" }).step !==
      state.step;
  const isComplete = state.step === scene.steps.length - 1;
  const send = (action: DemoAction) => {
    // Typing keeps the cursor in its field. Deliberate workflow actions reveal
    // the new mobile screen; automatic playback never moves focus or scroll.
    if (
      ![
        "pause",
        "play",
        "dashboard-query",
        "dashboard-period",
        "measurement",
        "calculation",
        "planning-field",
        "planning-mode",
        "receipt-field",
        "ai-prompt",
        "ai-hours",
        "select-report",
      ].includes(action.type)
    ) {
      focusAfterAction.current = true;
    }
    dispatch({ ...action, source: "user" });
  };

  useEffect(() => {
    if (!focusAfterAction.current) return;
    focusAfterAction.current = false;
    const node = mobileStage.current;
    if (!node || !node.getClientRects().length) {
      desktopTitle.current?.focus({ preventScroll: true });
      return;
    }
    mobileTitle.current?.focus({ preventScroll: true });
    node.scrollIntoView({
      block: "start",
      behavior: state.reducedMotion ? "instant" : "smooth",
    });
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () =>
      dispatch({ type: "motion-preference", reduced: media.matches });
    update();
    // On a phone, let the visitor choose when the guided example starts.
    if (root.current && root.current.getBoundingClientRect().width <= 600) {
      dispatch({ type: "pause" });
    }
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[0].isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(node);
    const onVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!state.playing || !visible || !pageVisible || state.reducedMotion)
      return;
    const timeout = window.setTimeout(
      () => dispatch({ type: "advance", source: "autoplay" }),
      5600,
    );
    return () => window.clearTimeout(timeout);
  }, [
    state.playing,
    state.scene,
    state.step,
    state.reducedMotion,
    visible,
    pageVisible,
  ]);

  return (
    <div
      ref={root}
      className={`${s.demo} ${compact ? s.compact : ""}`}
      data-product-demo={state.scene}
      aria-labelledby={labelId}
      aria-describedby={disclaimerId}
      data-demo-playing={state.playing}
    >
      <div className={s.demoIntro}>
        <div>
          <span className={s.demoBadge}>Interaktive Beispieldemo</span>
          <strong id={labelId} className={s.demoIntroTitle}>
            CraftOS Abläufe selbst ausprobieren
          </strong>
          <p id={disclaimerId} className={s.demoDisclaimer}>
            Diese Demo erklärt ausgewählte CraftOS Funktionen mit fiktiven
            Daten. Sie ist keine echte Produktoberfläche; Gestaltung und
            Bedienumfang sind für die Erklärung vereinfacht.
          </p>
        </div>
        <Link href="/app#app-ansichten" className={s.originalLink}>
          Originale App-Ansichten <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <nav className={s.sceneNav} aria-label="Produktdemo auswählen">
        {DEMO_SCENES.map((item) => {
          const Icon = ICONS[item.id];
          return (
            <button
              type="button"
              key={item.id}
              aria-pressed={state.scene === item.id}
              onClick={() => send({ type: "scene", scene: item.id })}
            >
              <Icon size={16} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <fieldset
        ref={mobileStage}
        className={s.mobileView}
        disabled={!hydrationReady}
        data-demo-mobile
        data-demo-active-step={`${state.scene}:${state.step}`}
        onFocusCapture={(event) => {
          if (
            state.playing &&
            !(event.target as Element).closest("[data-demo-playback]")
          )
            dispatch({ type: "pause" });
        }}
        onPointerDownCapture={(event) => {
          if (
            state.playing &&
            !(event.target as Element).closest("[data-demo-playback]")
          )
            dispatch({ type: "pause" });
        }}
      >
        <div className={s.mobileScenePicker}>
          <label htmlFor={mobilePickerId}>Diesen Ablauf ausprobieren</label>
          <select
            id={mobilePickerId}
            aria-label="Produktdemo auswählen"
            value={state.scene}
            onChange={(event) =>
              send({ type: "scene", scene: event.target.value as DemoSceneId })
            }
          >
            {DEMO_SCENES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label} · {item.steps.length} Schritte
              </option>
            ))}
          </select>
        </div>
        <div className={s.mobileGuide}>
          <div className={s.mobileStepCount}>
            <span>
              Schritt {state.step + 1} von {scene.steps.length}
            </span>
            <span aria-current="step">{scene.steps[state.step]}</span>
          </div>
          <div className={s.mobileStepProgress} aria-hidden="true">
            {scene.steps.map((step, index) => (
              <span key={step} data-done={index <= state.step} />
            ))}
          </div>
          <h2 ref={mobileTitle} tabIndex={-1} data-demo-step-title>
            {mobileGuidance.title}
          </h2>
          <p>{mobileGuidance.hint}</p>
          <div className={s.mobilePlayer}>
            <button
              type="button"
              data-demo-playback
              onClick={() =>
                dispatch({ type: state.playing ? "pause" : "play" })
              }
              disabled={state.reducedMotion || !canAdvance}
              aria-label={
                state.playing ? "Demo pausieren" : "Demo automatisch abspielen"
              }
            >
              {state.playing ? <Pause size={17} /> : <Play size={17} />}
              <span>{state.playing ? "Pause" : "Start"}</span>
            </button>
            <button
              type="button"
              className={s.mobileAdvance}
              onClick={() => send({ type: "advance" })}
              disabled={!canAdvance}
            >
              <span>Nächster Schritt</span>
              <ArrowRight size={17} />
            </button>
            <button
              type="button"
              onClick={() => send({ type: "reset" })}
              aria-label="Diese Demo wiederholen"
            >
              <RotateCcw size={17} />
            </button>
          </div>
        </div>
        <div className={s.mobileStepBody} data-demo-step-body>
          <MobileStepContent state={state} send={send} />
          {isComplete && (
            <button
              type="button"
              className={s.mobileContinue}
              onClick={() => send({ type: "scene", scene: followingScene.id })}
            >
              Nächste Demo: {followingScene.label}
              <ArrowRight size={17} />
            </button>
          )}
        </div>
        {state.reducedMotion && (
          <p className={s.mobileMotionNote}>
            Sie steuern jeden Schritt selbst. Automatische Wiedergabe ist
            deaktiviert.
          </p>
        )}
      </fieldset>
      <div className={s.player} data-demo-desktop-guide>
        <div className={s.playerStory}>
          <span className={s.guideStep}>
            Schritt {state.step + 1} von {scene.steps.length}
          </span>
          <h2 ref={desktopTitle} tabIndex={-1}>
            {mobileGuidance.title}
          </h2>
          <p aria-live="polite">{mobileGuidance.hint}</p>
          <ol className={s.stepList} aria-label="Ablauf">
            {scene.steps.map((step, i) => (
              <li
                key={step}
                className={
                  i === state.step
                    ? s.stepCurrent
                    : i < state.step
                      ? s.stepDone
                      : ""
                }
                aria-current={i === state.step ? "step" : undefined}
              >
                <span>{i < state.step ? <Check size={11} /> : i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className={s.playerButtons}>
          <button
            type="button"
            className={s.playerPrimary}
            onClick={() => dispatch({ type: state.playing ? "pause" : "play" })}
            disabled={state.reducedMotion || !canAdvance}
            aria-label={
              state.playing ? "Demo pausieren" : "Demo automatisch abspielen"
            }
          >
            {state.playing ? <Pause size={16} /> : <Play size={16} />}
            <span>{state.playing ? "Pause" : "Vorführen"}</span>
          </button>
          <button
            type="button"
            onClick={() => send({ type: "advance" })}
            disabled={!canAdvance}
          >
            <span>Nächster Schritt</span>
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            onClick={() => send({ type: "reset" })}
            aria-label="Diese Demo wiederholen"
          >
            <RotateCcw size={16} />
            <span>Wiederholen</span>
          </button>
        </div>
        {state.reducedMotion && (
          <p className={s.playerHint}>
            Reduzierte Bewegung ist aktiv. Sie steuern jeden Schritt selbst.
          </p>
        )}
        {state.scene === "ki" && state.step === 2 && (
          <p className={s.playerHint}>
            Die Demo wartet auf „Jetzt ausdrücklich bestätigen“ im Entwurf.
          </p>
        )}
      </div>
      <div
        className={s.appShell}
        onFocusCapture={() => {
          if (state.playing) dispatch({ type: "pause" });
        }}
        onPointerDownCapture={() => {
          if (state.playing) dispatch({ type: "pause" });
        }}
      >
        <aside className={s.sidebar}>
          <div className={s.sidebarBrand}>
            <Image
              src="/icons/icon-192x192.png"
              width={29}
              height={29}
              alt=""
            />
            <strong>CraftOS</strong>
          </div>
          <div className={s.companySwitcher}>
            <span className={s.companyAvatar}>K</span>
            <div>
              <strong>Krause Ausbau</strong>
              <small>Beispielbetrieb</small>
            </div>
          </div>
          <span className={s.navGroup}>Arbeitsplatz</span>
          <nav aria-label="Navigation in der Beispiel-App">
            {DEMO_SCENES.map((item) => {
              const Icon = ICONS[item.id];
              return (
                <button
                  type="button"
                  key={item.id}
                  aria-current={state.scene === item.id ? "page" : undefined}
                  aria-label={APP_NAV_LABELS[item.id]}
                  title={APP_NAV_LABELS[item.id]}
                  onClick={() => send({ type: "scene", scene: item.id })}
                >
                  <Icon size={17} />
                  <span>{APP_NAV_LABELS[item.id]}</span>
                  {state.scene === item.id && <span className={s.navMarker} />}
                </button>
              );
            })}
          </nav>
          <div className={s.sidebarBottom}>
            <div className={s.sidebarConnected}>
              <span />
              <span>Fiktiver Beispielbetrieb</span>
            </div>
            <div className={s.userProfile}>
              <span className={s.userAvatar}>AK</span>
              <div>
                <strong>Alex Krause</strong>
                <small>Administrator · Beispiel</small>
              </div>
            </div>
          </div>
        </aside>
        <div className={s.workspace}>
          <header className={s.appHeader}>
            <div>
              <span className={s.mobileBrand}>
                <Image
                  src="/icons/icon-192x192.png"
                  width={22}
                  height={22}
                  alt=""
                />{" "}
                CraftOS
              </span>
              <span className={s.desktopBreadcrumb}>
                Arbeitsplatz <ChevronRight size={13} />{" "}
                {scene.id === "dashboard" ? "Dashboard" : scene.label}
              </span>
            </div>
            <span className={s.workspaceStatus}>Vereinfachte Demo</span>
          </header>
          <div className={s.content}>
            <Scene state={state} send={send} />
          </div>
        </div>
      </div>

      <div className={s.demoTakeaway}>
        <strong>Das zeigt Ihnen dieses Beispiel</strong>
        <p>{scene.explanations[state.step]}</p>
        <span>
          Alle Änderungen bleiben in dieser Demo. Es werden keine echten
          Projekte, Zeiten oder Belege angelegt.
        </span>
      </div>
    </div>
  );
}
