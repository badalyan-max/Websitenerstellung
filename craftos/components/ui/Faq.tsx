export interface FaqItem {
  q: string;
  a: string;
}
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-ink-200">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-ink-200">
          <summary className="flex list-none justify-between gap-6 py-6 font-semibold text-lg">
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className="group-open:rotate-45 text-primary-800 text-2xl"
            >
              +
            </span>
          </summary>
          <p className="pb-6 max-w-3xl text-ink-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
