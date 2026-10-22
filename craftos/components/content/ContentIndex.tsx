import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ContentSearch } from "./ContentSearch";
import { getContentList } from "@/lib/content";
import { categories, type ContentKind } from "@/lib/content-types";
import { crumbsFor } from "@/lib/breadcrumbs";
export async function ContentIndex({
  kind,
  category,
}: {
  kind: ContentKind;
  category?: string;
}) {
  const items = await getContentList(kind);
  const title = category
    ? categories[kind][category]
    : kind === "blog"
      ? "Wissen, das im Alltag hilft."
      : "Schnell zur passenden Antwort.";
  return (
    <>
      <PageHero
        crumbs={crumbsFor(
          category ? "/" + kind + "/kategorie/" + category : "/" + kind,
        )}
        eyebrow={kind === "blog" ? "CraftOS Ratgeber" : "CraftOS Hilfezentrum"}
        title={title}
        intro={
          kind === "blog"
            ? "Praktische Beispiele für Rechnungen, Kalkulation, Projekte und Ihr Team, damit Sie den nächsten Schritt mit einem guten Überblick machen."
            : "Konkrete Anleitungen für die Web-App und Mobile-App: von der Einrichtung bis zur fertigen Rechnung."
        }
      />
      <section className="section-space">
        <div className="site-container">
          <nav
            aria-label="Themenbereiche"
            className="flex flex-wrap gap-3 mb-10"
          >
            {Object.entries(categories[kind]).map(([slug, label]) => (
              <Link
                href={"/" + kind + "/kategorie/" + slug}
                key={slug}
                className="border border-ink-200 rounded-full px-4 py-2 text-sm hover:bg-ink-100"
              >
                {label}
              </Link>
            ))}
          </nav>
          <ContentSearch
            kind={kind}
            initialCategory={category}
            items={items.map(
              ({ slug, title, description, category, readingMinutes }) => ({
                slug,
                title,
                description,
                category,
                readingMinutes,
              }),
            )}
          />
          <div className="notice mt-12">
            <h2 className="font-semibold text-xl">
              {kind === "blog"
                ? "Vom Lesen ins Machen."
                : "Ihre Frage ist noch offen?"}
            </h2>
            <p className="mt-2">
              {kind === "blog" ? (
                <>
                  Berechnen Sie Ihren{" "}
                  <Link className="text-link" href="/rechner/stundensatz">
                    Stundensatz
                  </Link>{" "}
                  oder prüfen Sie die{" "}
                  <Link
                    className="text-link"
                    href="/rechner/angebotskalkulation"
                  >
                    Marge Ihres Angebots
                  </Link>{" "}
                  direkt im Browser.
                </>
              ) : (
                <>
                  Unser{" "}
                  <Link className="text-link" href="/support">
                    Support
                  </Link>{" "}
                  hilft Ihnen weiter; die{" "}
                  <Link className="text-link" href="/blog">
                    Ratgeber
                  </Link>{" "}
                  erklären die Hintergründe.
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
