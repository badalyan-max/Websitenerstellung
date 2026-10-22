import { OG_SIZE, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik /vergleich/craftnote-alternative (08-08, UI-SPEC § 7): statisch beim Build, Titel = H1 aus der Keyword-Map.
const titel = ogTitel("/vergleich/craftnote-alternative");
export const size = OG_SIZE;
export const contentType = "image/png";
export default function Image() {
  return pageOg({ title: titel, kind: "Vergleich", path: "/vergleich/craftnote-alternative" });
}
