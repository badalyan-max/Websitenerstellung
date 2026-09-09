import { getContentList } from "@/lib/content";
import { site } from "@/lib/site";
const esc = (s: string) =>
  s.replace(
    /[<>&"']/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[c]!,
  );
export const dynamic = "force-static";
export async function GET() {
  const articles = await getContentList("blog");
  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?>' +
      '<rss version="2.0"><channel><title>CraftOS Ratgeber</title><link>' +
      site.url +
      "/blog</link><description>Praktisches Wissen für Handwerksbetriebe</description><language>de-de</language>" +
      articles
        .map(
          (a) =>
            "<item><title>" +
            esc(a.title) +
            "</title><link>" +
            site.url +
            "/blog/" +
            a.slug +
            '</link><guid isPermaLink="true">' +
            site.url +
            "/blog/" +
            a.slug +
            "</guid><description>" +
            esc(a.description) +
            "</description><pubDate>" +
            new Date(a.publishedAt + "T12:00:00Z").toUTCString() +
            "</pubDate></item>",
        )
        .join("") +
      "</channel></rss>",
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  );
}
