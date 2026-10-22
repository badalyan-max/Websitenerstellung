import { OG_SIZE, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik der Startseite (08-05, UI-SPEC § 7): Titel = H1 aus der Keyword-Map.
const titel = ogTitel("/");
export const size = OG_SIZE;
export const contentType = "image/png";
export default function Image() {
  return pageOg({ title: titel, kind: "Handwerkersoftware", path: "/" });
}
