# Contributing to Claude Code Guide

Thanks for wanting to help make Claude Code more accessible.

## Quick contributions (no coding needed)

- **Fix a typo** - Edit any `.mdx` file in `content/docs/` and open a PR
- **Suggest a topic** - Open an issue with the `content-request` label
- **Share your experience** - Tell us what confused you when starting with Claude Code

## Content contributions

All guide content lives in `content/docs/` as MDX files. MDX is just Markdown with a few extras.

### Structure

```
content/docs/
  foundations/     # Getting started, core concepts
  workflows/       # Daily practice, debugging, team adoption
  patterns/        # Advanced features (hooks, agents, MCP)
  templates/       # Copy-paste CLAUDE.md files
  comparisons/     # Claude Code vs other tools
```

### Writing style

- Write like you're explaining to a smart friend who's never used a terminal
- No jargon without explanation
- Short sentences. Short paragraphs.
- Show what things look like (screenshots welcome)
- When in doubt, simpler is better

### Adding a new page

1. Create a new `.mdx` file in the appropriate folder
2. Add frontmatter at the top:

```mdx
---
title: Your Page Title
description: A one-line description
---
```

3. Write your content in Markdown
4. Open a PR

## Running locally

```bash
npm install
npm run dev
```

## Code of conduct

Be kind. Be helpful. Remember that everyone starts somewhere.
