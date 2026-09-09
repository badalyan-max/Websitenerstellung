# SEO-Blog Referenz-Implementierung

Diese Dateien stammen aus der SEO-Agent-Session (uncommitted Referenz laut Plan
'the-claude-code-seo-fancy-pinwheel.md'). Sie wurden hierher verschoben, weil
'components/blog/*' (Client) transitiv 'fs' aus lib/blog.ts importierte und damit
jeden Build brach. Inhalt ist unverändert.

Ursprüngliche Pfade:
- app-blog/        → app/blog/
- components-blog/ → components/blog/
- blog.ts          → lib/blog.ts
- markdown.ts      → lib/markdown.ts

Bei der Portierung aufs neue Werkbank-Design: PILLARS/Typen in ein
client-sicheres Modul auslagern (ohne fs-Import).
