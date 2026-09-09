import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section-space">
      <div className="site-container max-w-3xl">
        <p className="eyebrow">404 · Seite nicht gefunden</p>
        <h1 className="text-5xl font-semibold">
          Hier geht es nicht weiter.
          <br />
          An anderer Stelle schon.
        </h1>
        <p className="section-intro">
          Diese Adresse ist nicht verfügbar. Über die Startseite oder das
          Hilfezentrum finden Sie den passenden Einstieg.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link href="/" className="btn-cta">
            Zur Startseite
          </Link>
          <Link href="/hilfe" className="btn-secondary">
            Zum Hilfezentrum
          </Link>
        </div>
      </div>
    </section>
  );
}
