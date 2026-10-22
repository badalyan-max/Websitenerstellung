import { OG_SIZE, pageOg } from "@/lib/og";
import { ogTitel } from "@/lib/seo-meta";

// OG-Grafik /vergleich/handwerkersoftware-kleine-betriebe (08-11, UI-SPEC § 7): statisch beim Build, Titel = H1 aus der Keyword-Map.
const titel = ogTitel("/vergleich/handwerkersoftware-kleine-betriebe");
export const size = OG_SIZE;
export const contentType = "image/png";
export default function Image() {
  return pageOg({ title: titel, kind: "Vergleich", path: "/vergleich/handwerkersoftware-kleine-betriebe" });
}
