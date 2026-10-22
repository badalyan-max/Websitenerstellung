import { OG_SIZE, ogAlt, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik /vergleich/tooltime-alternative (08-09, UI-SPEC § 7): statisch beim Build, Titel = H1 aus der Keyword-Map.
const titel = ogTitel("/vergleich/tooltime-alternative");
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = ogAlt("Vergleich", titel);
export default function Image() {
  return pageOg({ title: titel, kind: "Vergleich", path: "/vergleich/tooltime-alternative" });
}
