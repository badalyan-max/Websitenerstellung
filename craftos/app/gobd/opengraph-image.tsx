import { OG_SIZE, ogAlt, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik /gobd (08-05, UI-SPEC § 7): statisch beim Build, Titel = H1 aus der Keyword-Map.
const titel = ogTitel("/gobd");
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = ogAlt("GoBD", titel);
export default function Image() {
  return pageOg({ title: titel, kind: "GoBD", path: "/gobd" });
}
