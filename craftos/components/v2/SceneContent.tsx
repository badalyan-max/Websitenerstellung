import { BrowserFrame } from "@/components/v2/BrowserFrame";
import { MiniList, MiniRow, MiniStatus, MiniTimer, MiniWeek } from "@/components/v2/mini/MiniUi";
import { PhoneFrame } from "@/components/v2/PhoneFrame";
import type { FrameScene, FrameVisual } from "@/lib/scenes";

/**
 * Zeilen einer Browser-Szene in der Kartenvariante (FeatureCard-Bühne auf /funktionen und „Passende Funktionen“).
 * Der Kartenrahmen hat die Mindestbreite 280 px (16:10) und damit Platz für genau zwei Zeilen; die übrigen
 * Zeilen zeigt nur das größere Kopf-Visual der Detailseite. Szenen führen deshalb ihre aussagekräftigsten
 * Zeilen zuerst (07-04, Befund 07-03).
 */
export const KARTEN_ZEILEN = 2;

/**
 * Inhalt einer Mini-UI-Szene (Timer, Wochenraster, Zeilenliste) aus lib/scenes.ts.
 * Server Component; genutzt von Musterseite, Startseite und /funktionen. `maxRows` kürzt die Zeilenliste
 * (Kartenvariante), die Szene selbst bleibt unverändert.
 */
export function SceneContent({ scene, maxRows }: { scene: FrameScene; maxRows?: number }) {
  const rows = scene.rows && maxRows !== undefined ? scene.rows.slice(0, maxRows) : scene.rows;
  return (
    <>
      {scene.timer ? <MiniTimer label={scene.timer.label} value={scene.timer.value} /> : null}
      {scene.week ? <MiniWeek entries={scene.week} /> : null}
      {rows ? (
        <MiniList>
          {rows.map((row, index) => (
            <MiniRow
              key={index}
              primary={row.primary}
              secondary={row.secondary}
              value={row.value}
              status={row.status ? <MiniStatus status={row.status} /> : undefined}
            />
          ))}
        </MiniList>
      ) : null}
    </>
  );
}

/**
 * Szene im passenden Geräterahmen (BrowserFrame bzw. PhoneFrame). Als Beleg geht nur
 * scene.screen (Kurzform) ins HTML; scene.evidence bleibt intern (06-UI-SPEC E3).
 * `karte`: Kartenvariante – Browser-Szenen zeigen höchstens KARTEN_ZEILEN Zeilen, damit im 280-px-Rahmen
 * keine Zeile angeschnitten wird. Das Phone der Karte ist bewusst unten angeschnitten und bleibt unverändert.
 */
export function Frame({
  visual,
  width,
  tone = "light",
  karte = false,
}: {
  visual: FrameVisual;
  width?: 160 | 194 | 240;
  tone?: "light" | "dark";
  karte?: boolean;
}) {
  const { scene } = visual;
  if (visual.kind === "browser") {
    return (
      <BrowserFrame title={scene.title} evidence={scene.screen} description={scene.description} tone={tone}>
        <SceneContent scene={scene} maxRows={karte ? KARTEN_ZEILEN : undefined} />
      </BrowserFrame>
    );
  }
  return (
    <PhoneFrame
      title={scene.title}
      evidence={scene.screen}
      description={scene.description}
      activeTab={scene.activeTab}
      width={width}
    >
      <SceneContent scene={scene} />
    </PhoneFrame>
  );
}
