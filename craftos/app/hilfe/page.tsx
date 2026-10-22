import { ContentIndex } from "@/components/content/ContentIndex";
import { metaFor } from "@/lib/seo-meta";
// Title und Description aus der Keyword-Map (08-04, D-06).
export const metadata = metaFor("/hilfe");
export default function Page() {
  return <ContentIndex kind="hilfe" />;
}
