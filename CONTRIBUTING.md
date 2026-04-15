# Contributing to Claude Code Guide

Thanks for wanting to help. Here's how to make it easy for both of us.

## The Fastest Contributions (No Coding)

- **Fix a typo**: edit any `.mdx` file in `content/docs/` and open a PR
- **Suggest a topic**: [open an issue](https://github.com/mshadmanrahman/claudecode-guide/issues/new?template=content-request.md)
- **Share your template**: [submit your CLAUDE.md](https://github.com/mshadmanrahman/claudecode-guide/issues/new?template=template-submission.md)
- **Report a bug**: [open a bug report](https://github.com/mshadmanrahman/claudecode-guide/issues/new?template=bug-report.md)

## Content Structure

```
content/docs/
  foundations/     # Core concepts (CLAUDE.md, sessions, memory, permissions)
  workflows/       # Daily practice, debugging, team adoption, CI/CD
  patterns/        # Advanced features (hooks, agents, MCP, autonomous loops)
  templates/       # Copy-paste CLAUDE.md files
  comparisons/     # Claude Code vs other tools
```

## The Voice (This Is Important)

Every page should sound like a practitioner talking to a friend. Not documentation. Not a textbook.

**Do this:**
- Hook with a real question or hot take
- Take clear stances ("this is great" / "this is a waste of time")
- Short paragraphs, conversational rhythm
- Say "here's the deal" or "let me be real"

**Don't do this:**
- "In this section, we will explore..."
- "It is important to note that..."
- Walls of text without examples
- Feature lists without opinions

## Every Page Needs a DemoCard

No exceptions. Every page must have at least one interactive terminal animation showing the feature in action:

```jsx
<DemoCard title="What you'll see" steps={[
  { type: 'cmd', text: 'claude "your prompt here"' },
  { type: 'out', text: 'Claude Code output...' },
  { type: 'success', text: '✓ Something good happened' },
  { type: 'error', text: '✗ Something went wrong' },
  { type: 'warn', text: '→ The takeaway message' },
]} />
```

Step types: `cmd` (user input), `out` (output), `success` (green), `error` (red), `warn` (amber).

## Adding a New Page

1. Create a `.mdx` file in the right folder
2. Add frontmatter:

```mdx
---
title: Your Page Title
description: "A punchy one-liner. Not a paragraph."
---
```

3. Write content following the voice guide above
4. Add at least one DemoCard
5. Add the page slug to the folder's `meta.json`
6. Open a PR

## Running Locally

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Code of Conduct

Be kind. Be helpful. Everyone starts somewhere. If someone's contribution doesn't match the voice, help them fix it instead of rejecting it.
