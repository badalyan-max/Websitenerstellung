/**
 * Belegprüfung der Geräterahmen (06-UI-SPEC E3, D-16, LO-05).
 * Öffentlich erscheint nur die Kurzform "web:<Bildschirm>" bzw. "app:<Bildschirm>";
 * der volle Belegpfad bleibt in lib/scenes.ts und in den Vitest-Belegprüfungen.
 */
export const SCREEN_EVIDENCE = /^(web|app):[^\s/]+$/;

/** Wirft mit den UI-SPEC-Fehlertexten, wenn evidence fehlt oder keine Kurzform ist. */
export function assertScreenEvidence(owner: string, evidence: string): void {
  if (!evidence.trim()) {
    throw new Error(`${owner}: evidence fehlt – Belegpfad aus origin/release angeben.`);
  }
  if (!SCREEN_EVIDENCE.test(evidence)) {
    throw new Error(
      `${owner}: evidence muss die Kurzform web:<Bildschirm> oder app:<Bildschirm> haben – vollen Belegpfad nur in lib/scenes.ts führen.`,
    );
  }
}
