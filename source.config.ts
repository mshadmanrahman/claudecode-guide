import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import { claudeGuideTheme } from './src/lib/code-theme';

export const docs = defineDocs({
  dir: 'content/docs',
});

export const pmPilot = defineDocs({
  dir: 'content/pm-pilot',
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'github-light',
        dark: claudeGuideTheme,
      },
    },
  },
});
