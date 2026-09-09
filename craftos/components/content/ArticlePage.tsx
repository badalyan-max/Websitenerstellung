import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getContentList } from "@/lib/content";
import { categories, type ContentArticle } from "@/lib/content-types";
import { getFunktion } from "@/lib/funktionen";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";
export async function ArticlePage({ article: a }: { article: ContentArticle }) {
  const all = [
    ...(await getContentList("blog")),
    ...(await getContentList("hilfe")),
  ];
  const related = all
    .filter((x) => a.relatedArticles.includes("/" + x.kind + "/" + x.slug))
    .slice(0, 4);
  const url = site.url + "/" + a.kind + "/" + a.slug;
  return (
    <>
      <div className="bg-ink-100 py-12 md:py-20">
        <div className="site-container">
          <Link
            href={"/" + a.kind}
            className="inline-flex items-center gap-2 text-sm text-ink-600"
          >
            <ArrowLeft size={16} />
            {a.kind === "blog" ? "Alle Ratgeber" : "Hilfezentrum"}
          </Link>
          <p className="eyebrow mt-8 block">{categories[a.kind][a.category]}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl max-w-5xl font-semibold">
            {a.title}
          </h1>
          <p className="text-lg text-ink-600 mt-6 max-w-3xl">{a.description}</p>
          <p className="text-xs text-ink-500 mt-6">
            {a.author} · Veröffentlicht:{" "}
            {new Date(a.publishedAt + "T12:00:00Z").toLocaleDateString("de-DE")}{" "}
            · Aktualisiert:{" "}
            {new Date(a.updatedAt + "T12:00:00Z").toLocaleDateString("de-DE")} ·{" "}
            {a.readingMinutes} Min. Lesezeit
          </p>
          {a.platforms.length > 0 && (
            <p className="text-sm mt-4 font-semibold">
              {a.platforms
                .map((p) => (p === "web" ? "Web-App" : "Mobile-App"))
                .join(" · ")}
            </p>
          )}
        </div>
      </div>
      <div className="site-container grid lg:grid-cols-[minmax(0,780px)_1fr] gap-12 lg:gap-20 section-space">
        <article className="min-w-0">
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: a.html }}
          />
          {a.sources.length > 0 && (
            <section className="border-t border-ink-200 mt-12 pt-7">
              <h2 className="text-xl font-semibold">
                Quellen und weiterführende Informationen
              </h2>
              <ul className="mt-4 space-y-3">
                {a.sources.map((s) => (
                  <li key={s.url} className="text-sm">
                    <a
                      href={s.url}
                      className="text-link"
                      rel="noopener noreferrer"
                    >
                      {s.label}
                    </a>
                    <span className="text-ink-500">
                      {" "}
                      · geprüft am {s.checkedAt.split("-").reverse().join(".")}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
        <aside className="row-start-1 lg:row-start-auto">
          <div className="lg:sticky lg:top-8">
            <nav
              aria-label="Inhaltsverzeichnis"
              className="border-t border-ink-200 pt-5"
            >
              <h2 className="font-semibold text-lg mb-4">In diesem Artikel</h2>
              <ol className="space-y-3">
                {a.toc.map((h) => (
                  <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
                    <a
                      href={"#" + h.id}
                      className="text-sm text-ink-600 hover:text-primary-800"
                    >
                      {h.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            {a.relatedFeatures.length > 0 && (
              <div className="mt-8 soft-panel">
                <h2 className="text-xl font-semibold mb-4">
                  Passende Funktionen
                </h2>
                {a.relatedFeatures.map((s) => {
                  const f = getFunktion(s);
                  return f ? (
                    <Link
                      key={s}
                      href={"/funktionen/" + s}
                      className="flex gap-3 justify-between py-3 text-sm font-medium"
                    >
                      {f.name}
                      <ArrowUpRight size={16} />
                    </Link>
                  ) : null;
                })}
              </div>
            )}
          </div>
        </aside>
      </div>
      {related.length > 0 && (
        <section className="section-space bg-ink-100">
          <div className="site-container">
            <h2 className="section-title">Der passende nächste Schritt.</h2>
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              {related.map((r) => (
                <Link
                  className="border-t border-ink-300 pt-6"
                  href={"/" + r.kind + "/" + r.slug}
                  key={r.slug}
                >
                  <p className="text-xs text-primary-800 mb-3">
                    {r.kind === "blog" ? "Ratgeber" : "Hilfe"}
                  </p>
                  <h3 className="text-2xl font-semibold">{r.title}</h3>
                  <p className="mt-3 text-sm text-ink-600">{r.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": a.kind === "blog" ? "Article" : "TechArticle",
          "@id": url + "#article",
          headline: a.title,
          description: a.description,
          datePublished: a.publishedAt,
          dateModified: a.updatedAt,
          inLanguage: "de-DE",
          author: {
            "@type": "Organization",
            name: a.author,
            "@id": site.url + "/#organization",
          },
          publisher: { "@id": site.url + "/#organization" },
          mainEntityOfPage: url,
          image: site.url + "/opengraph-image",
          about: a.relatedFeatures.map((s) => ({
            "@id": site.url + "/funktionen/" + s,
          })),
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          {
            name: a.kind === "blog" ? "Ratgeber" : "Hilfe",
            path: "/" + a.kind,
          },
          {
            name: categories[a.kind][a.category],
            path: "/" + a.kind + "/kategorie/" + a.category,
          },
          { name: a.title, path: "/" + a.kind + "/" + a.slug },
        ])}
      />
    </>
  );
}
