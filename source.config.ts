import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { claudeGuideTheme } from "./src/lib/code-theme";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      image: z.string().optional(),
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
