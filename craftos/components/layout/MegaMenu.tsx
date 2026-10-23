import Link from "next/link";
import { TEXT_BUDGET, assertTextBudget } from "@/components/v2/budgets";
import type { Funktionsgruppe } from "@/lib/funktionsgruppen";
import { ActiveLink } from "./ActiveLink";
import s from "./MegaMenu.module.css";

/**
 * Mega-Menü „Funktionen“ und einfache Link-Panels der Hauptnavigation (Phase 6, D-05, D-11, D-15, D-17).
 *
 * Server Component: wird im Header gerendert und als Slot an die Client-Hülle `HeaderShell` übergeben,
 * damit lib/funktionsgruppen.ts nicht ins Client-Bundle gelangt. Keine Überschriften, kein Menü-Rollenmodell
 * (Disclosure-Muster), keine Vorschaubilder; Linktexte der Detailfunktionen sind die Funktionsnamen.
 * Zusatzfunktionen (Phase 10, D-21, D-40): je Gruppe mit Extras nach den Detailfunktionen eine kurze Liste
 * „Weitere Funktionen“ (Beschriftung als Absatz, keine Überschrift) mit dem Namen als Link auf `extra.target.href`.
 * Diese Links tragen `data-menu-zusatz` und nie `aria-current`, weil sie auf die Detailseite der Funktion zeigen.
 */
export function MegaMenu({
  groups,
  footerLinks,
}: {
  groups: Funktionsgruppe[];
  footerLinks: readonly { label: string; href: string }[];
}) {
  return (
    <div className={s.menu}>
      <ul className={s.groups}>
        {groups.map((group) => {
          assertTextBudget("menuGroup.description", group.description, TEXT_BUDGET.menuGroup.description);
          const Icon = group.icon;
          return (
            <li key={group.id} className={s.group}>
              <div className={s.head}>
                <span className={s.icon} aria-hidden="true">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div className={s.headText}>
                  <ActiveLink href={group.anchorHref} className={s.groupLink}>
                    {group.label}
                  </ActiveLink>
                  <p className={s.description}>{group.description}</p>
                </div>
              </div>
              <ul className={s.details}>
                {group.details.map((detail) => (
                  <li key={detail.slug}>
                    <ActiveLink href={detail.href} className={s.link}>
                      {detail.name}
                    </ActiveLink>
                  </li>
                ))}
              </ul>
              {group.extras.length > 0 ? (
                <>
                  <p className={s.extrasLabel} id={`menu-weitere-${group.id}`}>
                    Weitere Funktionen
                  </p>
                  <ul className={s.details} aria-labelledby={`menu-weitere-${group.id}`}>
                    {group.extras.flatMap((extra) =>
                      extra.target
                        ? [
                            <li key={extra.id}>
                              {/* tabIndex 0 wie ActiveLink: WebKit nimmt Links sonst nicht in die Tab-Reihenfolge auf. */}
                              <Link href={extra.target.href} prefetch={false} tabIndex={0} className={s.link} data-menu-zusatz={extra.id}>
                                {extra.name}
                              </Link>
                            </li>,
                          ]
                        : [],
                    )}
                  </ul>
                </>
              ) : null}
            </li>
          );
        })}
      </ul>
      <ul className={s.footer}>
        {footerLinks.map((link) => (
          <li key={link.href}>
            <ActiveLink href={link.href} className={s.footerLink}>
              {link.label}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Einfaches Link-Panel (Gewerke, Wissen, Hilfe); `columns={2}` setzt es ab 1121 px zweispaltig. */
export function LinkPanel({ links, columns }: { links: readonly { label: string; href: string }[]; columns: 1 | 2 }) {
  return (
    <ul className={s.linkList} data-columns={columns}>
      {links.map((link) => (
        <li key={link.href}>
          <ActiveLink href={link.href} className={s.link}>
            {link.label}
          </ActiveLink>
        </li>
      ))}
    </ul>
  );
}
