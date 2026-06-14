import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from "fumadocs-mdx/config";
import { z } from "zod";
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
    },
  },
});
