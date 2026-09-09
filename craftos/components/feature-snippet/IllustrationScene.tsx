import { ArrowDownLeft, ArrowUpRight, CheckCheck, Package } from "lucide-react";
import type { SnippetVariant } from "./FeatureSnippet";
import type { SnippetExample } from "@/lib/snippet-examples";
import { ConnectedScene } from "./ConnectedScene";
import { SupplementalScene } from "./SupplementalScene";
import { WebFrame } from "./DeviceFrame";
import s from "./IllustrationScene.module.css";

export function IllustrationScene({ variant, example, stage, phase, reduced }: { variant: SnippetVariant; example?: SnippetExample; stage: number; phase: number; reduced: boolean }) {
  const matchingExample = example?.variant === variant ? example : undefined;
  const stock = stage <= 1 ? 24 : stage === 2 ? 18 : 20;
  return <div className={s.scene} data-connected={variant !== "lager"} data-illustration-scene={variant} data-stage={stage} data-reduced={reduced}>
    {variant === "dashboard" || variant === "angebot" || variant === "ki"
      ? <SupplementalScene variant={variant} stage={stage} phase={phase} example={matchingExample} />
      : variant !== "lager"
        ? <ConnectedScene variant={variant} example={matchingExample} stage={stage} phase={phase} />
        : <WebFrame title="Lager und Material">
          <div className={s.stock} data-cursor-target="first" data-active={stage >= 1}><Package size={34} /><span><small>Wandfarbe, 10 Liter</small><strong>{stock}<span>Eimer im Lager</span></strong></span></div>
          <div className={s.stockMovement} data-cursor-target="second" data-active={stage >= 2}><ArrowUpRight size={22} /><span><strong>6 Eimer zur Baustelle</strong><small>Bäckerei Krause</small></span><b>−6</b></div>
          <div className={s.stockMovement} data-cursor-target="third" data-active={stage >= 3}><ArrowDownLeft size={22} /><span><strong>2 Eimer zurück ins Lager</strong><small>Unverbrauchtes Material</small></span><b>+2</b></div>
          <div className={s.result} data-ready={stage >= 3}><CheckCheck size={17} /><span>{stage >= 3 ? "24 − 6 + 2 = 20 Eimer im Lager." : "Entnahme und Rückgabe bleiben nachvollziehbar."}</span></div>
        </WebFrame>}
  </div>;
}
