import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'

// Eine Pipeline für Artikelseite UND RSS-Feed (content:encoded braucht HTML-Strings).
// Plain Markdown statt MDX: maschinell geschriebene Texte mit "<" oder "{" dürfen
// den Build nicht brechen.
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeStringify)

export async function renderMarkdown(md: string): Promise<string> {
  const file = await processor.process(md)
  return String(file)
}
