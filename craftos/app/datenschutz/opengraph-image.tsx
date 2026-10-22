import { OG_SIZE, ogAlt, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik /datenschutz (08-05, UI-SPEC § 7, D-20): Standardgrafik „Rechtliches“ mit dem Seitennamen (= H1).
const titel = ogTitel("/datenschutz");
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = ogAlt("Rechtliches", titel);
export default function Image() {
  return pageOg({ title: titel, kind: "Rechtliches", path: "/datenschutz" });
}
