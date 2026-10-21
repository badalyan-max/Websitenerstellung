import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TEXT_BUDGET, assertTextBudget, sentenceCount } from "@/components/v2/budgets";
import { DevicePair } from "@/components/v2/DevicePair";
import { SceneContent } from "@/components/v2/SceneContent";
import { hero } from "@/lib/home-content";
import { site } from "@/lib/site";
import s from "./HomeHero.module.css";

/**
 * Hero der Startseite (06-UI-SPEC „Hero (Abschnitt 0)“; D-02, D-20): Keyword-H1, ein Satz Einleitung,
 * Test-CTA auf site.ctaUrl, Sekundärlink und DevicePair compact – oberhalb der Falz in allen fünf
 * Prüfbreiten. Server Component ohne Animation; das H1 ist das LCP-Element.
 */
export function HomeHero() {
  const h1 = hero.h1Keyword + hero.h1Rest;
  assertTextBudget("hero.h1", h1, TEXT_BUDGET.hero.h1);
  assertTextBudget("hero.lead", hero.lead, TEXT_BUDGET.hero.lead);
  const sentences = sentenceCount(hero.lead);
  if (sentences !== 1) {
    throw new Error(`Hero: Lead hat ${sentences} Sätze – genau einen Satz schreiben.`);
  }
  const { browser, phone } = hero.pair;

  return (
    <section className={s.hero} aria-labelledby="startseite-titel" data-home-hero="">
      <div className={`site-container ${s.inner}`}>
        <div className={s.copy}>
          <h1 id="startseite-titel" className={s.title}>
            <span className={s.keyword} data-keyword="">
              {hero.h1Keyword}
            </span>
            {hero.h1Rest}
          </h1>
          <p className={s.lead}>{hero.lead}</p>
          <div className={s.actions}>
            <a href={site.ctaUrl} className="v2-btn-cta" data-track="trial">
              {hero.ctaLabel}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <Link href={hero.secondary.href} className={s.secondary}>
              {hero.secondary.label}
            </Link>
          </div>
        </div>
        <div className={s.product}>
          <DevicePair
            layout="compact"
            tone="dark"
            browser={{ title: browser.title, evidence: browser.screen, children: <SceneContent scene={browser} /> }}
            phone={{
              title: phone.title,
              evidence: phone.screen,
              activeTab: phone.activeTab,
              children: <SceneContent scene={phone} />,
            }}
            description={hero.pairDescription}
          />
        </div>
      </div>
    </section>
  );
}
