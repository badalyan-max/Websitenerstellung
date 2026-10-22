import { OG_SIZE, ogAlt, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik /fakten-ueber-craftos (08-05, UI-SPEC § 7): statisch beim Build, Titel = H1 aus der Keyword-Map.
const titel = ogTitel("/fakten-ueber-craftos");
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = ogAlt("Fakten", titel);
export default function Image() {
  return pageOg({ title: titel, kind: "Fakten", path: "/fakten-ueber-craftos" });
}
