import { OG_SIZE, ogAlt, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik /craft-ai (08-05, UI-SPEC § 7): statisch beim Build, Titel = H1 aus der Keyword-Map.
const titel = ogTitel("/craft-ai");
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = ogAlt("Craft AI", titel);
export default function Image() {
  return pageOg({ title: titel, kind: "Craft AI", path: "/craft-ai" });
}
