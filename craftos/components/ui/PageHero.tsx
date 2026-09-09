import { CraftOSMark } from "@/components/CraftOSLogo";
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
}) {
  return (
    <section className="dark-section craft-page-hero">
      <div className="craft-watermark" aria-hidden="true">
        <CraftOSMark size={360} />
      </div>
      <div className="site-container relative py-12 md:py-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-semibold">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg">{intro}</p>
      </div>
    </section>
  );
}
