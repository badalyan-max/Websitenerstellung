import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { getFunktion, funktionen } from "@/lib/funktionen";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { ProductDemo } from "@/components/product-demo/ProductDemo";
import { Faq } from "@/components/ui/Faq";
import { TrialCta } from "@/components/ui/TrialCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
export function generateStaticParams() {
  return funktionen.map((f) => ({ slug: f.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = getFunktion(slug);
  return f
    ? pageMetadata(f.seoTitle, f.seoDescription, "/funktionen/" + slug)
    : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params,
    f = getFunktion(slug);
  if (!f) notFound();
  return (
    <>
      <PageHero eyebrow={f.name} title={f.heroTitle} intro={f.heroIntro} />
      <section className="section-space">
        <div className="site-container">
          <div className="flex flex-wrap gap-5 mb-8">
            {f.platforms.map((p) => (
              <span
                key={p}
                className="inline-flex gap-2 items-center text-sm font-semibold"
              >
                {p === "web" ? <Monitor size={18} /> : <Smartphone size={18} />}{" "}
                {p === "web" ? "Web-App" : "Mobile-App"}
              </span>
            ))}
            {f.tier === "launch" && (
              <span className="text-sm font-semibold text-primary-800">
                In Prüfung
              </span>
            )}
          </div>
          {f.demo && <ProductDemo key={slug} initialScene={f.demo} />}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {f.bullets.map((b) => (
              <div key={b.titel} className="border-t border-ink-200 pt-6">
                <Check size={22} className="text-primary-800" />
                <h2 className="text-2xl mt-5 font-semibold">{b.titel}</h2>
                <p className="text-ink-600 mt-4">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space bg-ink-100">
        <div className="site-container grid lg:grid-cols-[.8fr_1fr] gap-12">
          <div>
            <p className="eyebrow">So arbeiten Sie damit</p>
            <h2 className="section-title">
              Vom ersten Schritt
              <br />
              zum Ergebnis.
            </h2>
            <Link href={"/hilfe/" + f.helpSlug} className="text-link mt-7">
              {slug === "arbeitsanweisungen"
                ? "Ergänzend: Projektdateien organisieren"
                : slug === "dashboard"
                  ? "Projekt und Phasen anlegen"
                  : slug === "nachkalkulation"
                    ? "Erfasste Zeiten prüfen"
                    : "Anleitung Schritt für Schritt"}{" "}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <ol className="space-y-7">
            {f.steps.map((s, i) => (
              <li key={s} className="flex gap-5">
                <span className="font-display text-3xl text-primary-800 w-9 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="pt-1">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container split-section items-start">
          <div>
            <p className="eyebrow">Gut vorbereitet</p>
            <h2 className="text-3xl font-semibold">
              Zugriff und Voraussetzungen
            </h2>
            <p className="mt-5 text-ink-600">{f.access}</p>
            {f.notes.map((n) => (
              <p className="notice mt-6 text-sm" key={n}>
                {n}
              </p>
            ))}
            <p className="text-sm mt-5 text-ink-600">
              Die Voll-Lizenz enthält Web-App und Mobile-App für dieselbe
              Person. Mehr zu{" "}
              <Link href="/preise" className="text-link">
                Lizenzen und Preisen
              </Link>
              .
            </p>
            {[
              "rechnungen",
              "buchhaltung",
              "eingangsrechnungen",
              "e-rechnung",
            ].includes(slug) && (
              <Link className="text-link mt-5" href="/gobd">
                GoBD-Festschreibung und Nachvollziehbarkeit erklärt{" "}
                <ArrowUpRight size={17} />
              </Link>
            )}
          </div>
          <Faq items={f.faq} />
        </div>
      </section>
      <section className="section-space bg-ink-100">
        <div className="site-container">
          <h2 className="text-3xl font-semibold">Passt dazu.</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {f.related.map((s) => {
              const r = getFunktion(s);
              return r ? (
                <Link
                  key={s}
                  href={"/funktionen/" + s}
                  className="border-t border-ink-300 pt-6"
                >
                  <h3 className="text-2xl font-semibold">{r.name}</h3>
                  <p className="text-sm text-ink-600 mt-3">{r.kurz}</p>
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </section>
      <JsonLd data={faqSchema(f.faq)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Start", path: "/" },
          { name: "Funktionen", path: "/funktionen" },
          { name: f.name, path: "/funktionen/" + slug },
        ])}
      />
      <TrialCta />
    </>
  );
}
