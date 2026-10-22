import { OG_SIZE, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik /impressum (08-05, UI-SPEC § 7, D-20): Standardgrafik „Rechtliches“ mit dem Seitennamen (= H1).
const titel = ogTitel("/impressum");
export const size = OG_SIZE;
export const contentType = "image/png";
export default function Image() {
  return pageOg({ title: titel, kind: "Rechtliches", path: "/impressum" });
}
