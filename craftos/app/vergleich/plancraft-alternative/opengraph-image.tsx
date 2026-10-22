import { OG_SIZE, ogAlt, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik /vergleich/plancraft-alternative (08-08, UI-SPEC § 7): statisch beim Build, Titel = H1 aus der Keyword-Map.
const titel = ogTitel("/vergleich/plancraft-alternative");
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = ogAlt("Vergleich", titel);
export default function Image() {
  return pageOg({ title: titel, kind: "Vergleich", path: "/vergleich/plancraft-alternative" });
}
