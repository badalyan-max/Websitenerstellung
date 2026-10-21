import { BrowserFrame } from "@/components/v2/BrowserFrame";
import { MiniList, MiniRow, MiniStatus, MiniTimer, MiniWeek } from "@/components/v2/mini/MiniUi";
import { PhoneFrame } from "@/components/v2/PhoneFrame";
import type { FrameScene, FrameVisual } from "@/lib/scenes";

/**
 * Inhalt einer Mini-UI-Szene (Timer, Wochenraster, Zeilenliste) aus lib/scenes.ts.
 * Server Component; genutzt von Musterseite, Startseite und /funktionen.
 */
export function SceneContent({ scene }: { scene: FrameScene }) {
  return (
    <>
      {scene.timer ? <MiniTimer label={scene.timer.label} value={scene.timer.value} /> : null}
      {scene.week ? <MiniWeek entries={scene.week} /> : null}
      {scene.rows ? (
        <MiniList>
          {scene.rows.map((row, index) => (
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
 */
export function Frame({
  visual,
  width,
  tone = "light",
}: {
  visual: FrameVisual;
  width?: 160 | 194 | 240;
  tone?: "light" | "dark";
}) {
  const { scene } = visual;
  if (visual.kind === "browser") {
    return (
      <BrowserFrame title={scene.title} evidence={scene.screen} description={scene.description} tone={tone}>
        <SceneContent scene={scene} />
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
