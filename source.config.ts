import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { claudeGuideTheme } from "./src/lib/code-theme";

const docsSchema = frontmatterSchema.extend({
  image: z.string().optional(),
  // Search-result title when the visible title is too long for one.
  seoTitle: z.string().optional(),
  // The day the page's facts were last compared with the official pages in
  // `sources`. Set it only after a real check; the docs page prints both.
  checkedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  sources: z.array(z.object({ title: z.string(), url: z.string().url() })).optional(),
});

export const docs = defineDocs({
  dir: "content/docs",
  docs: { schema: docsSchema },
});

// Bangla docs. Each file sits at the same path as its English page in content/docs.
export const docsBn = defineDocs({
  dir: "content/docs-bn",
  docs: {
    schema: docsSchema.extend({
      // Hash of the English file this page was translated from (see src/lib/i18n/bn-docs.ts).
      sourceHash: z.string().regex(/^[0-9a-f]{16}$/),
      translatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    }),
  },
});

export const pmPilot = defineDocs({
  dir: "content/pm-pilot",
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: claudeGuideTheme,
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        {
          // Expose the language so untitled code blocks can label their bar (DocPre)
          name: "ccg-language",
          pre(node) {
            node.properties["data-language"] = this.options.lang;
          },
        },
      ],
    },
  },
});
