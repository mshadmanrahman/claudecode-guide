import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { DemoCard } from '@/components/demo-card';
import { EmailCapture } from '@/components/email-capture';
import { CopyBlock } from '@/components/guide/copy-block';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface TutorialStep {
  title: string;
  description: string;
  code?: { snippet: string; language?: string };
  demo?: {
    title?: string;
    steps: Array<{
      type: 'cmd' | 'out' | 'success' | 'warn' | 'error';
      text: string;
      delay?: number;
    }>;
  };
}

interface Tutorial {
  title: string;
  slug: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate';
  description: string;
  intro: string;
  steps: TutorialStep[];
  nextLink: { label: string; href: string };
}

/* ------------------------------------------------------------------ */
/*  Tutorial data                                                      */
/* ------------------------------------------------------------------ */

const TUTORIALS: Record<string, Tutorial> = {
  'your-first-claude-md': {
    title: 'Build Your First CLAUDE.md in 5 Minutes',
    slug: 'your-first-claude-md',
    duration: '5 min',
    difficulty: 'beginner',
    description:
      'The single most important thing you can do with Claude Code. Create the file that turns it from generic to personalized.',
    intro:
      'A CLAUDE.md file is like a briefing doc for Claude. It tells Claude who you are, what your project is, and how you like to work. Without it, Claude starts every conversation from scratch. With it, Claude already knows the deal. Let\'s build one.',
    steps: [
      {
        title: 'Open your terminal and navigate to any project',
        description:
          'Pick any project folder you\'re working on. It could be a side project, a work repo, anything. We just need a directory to work in.',
        code: {
          snippet: 'cd ~/my-project',
          language: 'bash',
        },
        demo: {
          title: 'Navigate to your project',
          steps: [
            { type: 'cmd', text: 'cd ~/my-project' },
            { type: 'cmd', text: 'ls', delay: 400 },
            { type: 'out', text: 'README.md  src/  package.json  tsconfig.json' },
            { type: 'success', text: 'You\'re in. Let\'s go.' },
          ],
        },
      },
      {
        title: 'Run claude /init',
        description:
          'This is the magic command. Claude will scan your project structure, figure out your stack, and generate a CLAUDE.md file tailored to what it finds.',
        code: {
          snippet: 'claude /init',
          language: 'bash',
        },
        demo: {
          title: 'Claude scans your project',
          steps: [
            { type: 'cmd', text: 'claude /init' },
            { type: 'out', text: 'Scanning project structure...', delay: 600 },
            { type: 'out', text: 'Detected: Next.js 16, TypeScript, Tailwind CSS' },
            { type: 'out', text: 'Found: 23 source files, 4 config files' },
            { type: 'out', text: 'Analyzing package.json dependencies...' },
            { type: 'success', text: 'Created CLAUDE.md with project context' },
            { type: 'success', text: 'Added build commands: npm run dev, npm run build' },
            { type: 'success', text: 'Added testing setup: vitest detected' },
            { type: 'warn', text: 'Tip: Open CLAUDE.md and add your personal preferences' },
          ],
        },
      },
      {
        title: 'Open the generated CLAUDE.md',
        description:
          'Take a look at what Claude created. It should have your project name, the tech stack it detected, build commands, and some basic context. This is your starting point.',
        code: {
          snippet: 'cat CLAUDE.md',
          language: 'bash',
        },
        demo: {
          title: 'What your CLAUDE.md looks like',
          steps: [
            { type: 'cmd', text: 'cat CLAUDE.md' },
            { type: 'out', text: '# CLAUDE.md', delay: 300 },
            { type: 'out', text: '' },
            { type: 'out', text: '## Project: my-project' },
            { type: 'out', text: 'Stack: Next.js 16, TypeScript, Tailwind CSS' },
            { type: 'out', text: '' },
            { type: 'out', text: '## Build Commands' },
            { type: 'out', text: 'npm run dev    # Start dev server' },
            { type: 'out', text: 'npm run build  # Production build' },
            { type: 'out', text: 'npm run test   # Run tests with vitest' },
            { type: 'out', text: '' },
            { type: 'out', text: '## Project Structure' },
            { type: 'out', text: 'src/app/       # App router pages' },
            { type: 'out', text: 'src/components # Shared components' },
          ],
        },
      },
      {
        title: 'Add your communication preferences',
        description:
          'This is what separates a good CLAUDE.md from a great one. Tell Claude how you like to work. Are you a senior dev who wants terse answers? A beginner who wants explanations? Add a section for it.',
        code: {
          snippet: `# Add this to the bottom of your CLAUDE.md

## Communication Preferences
- Be concise. Skip the preamble.
- When I ask for code, give me the code first, explanation second.
- Use TypeScript. Never suggest JavaScript alternatives.
- When fixing bugs, show me the root cause before the fix.
- Don't ask "would you like me to..." — just do it.`,
          language: 'markdown',
        },
        demo: {
          title: 'Your personalized CLAUDE.md',
          steps: [
            { type: 'cmd', text: 'echo "## Communication Preferences" >> CLAUDE.md' },
            { type: 'success', text: 'Added communication preferences section' },
            { type: 'out', text: 'Your CLAUDE.md is now 24 lines of pure context.' },
            { type: 'warn', text: 'Every conversation with Claude now starts here.' },
          ],
        },
      },
      {
        title: 'Test it — see the difference',
        description:
          'Now start Claude Code and give it a prompt. Notice how it already knows your stack, your build commands, and your preferences. No more explaining yourself.',
        code: {
          snippet: 'claude "add a dark mode toggle to the header"',
          language: 'bash',
        },
        demo: {
          title: 'Claude knows your project now',
          steps: [
            { type: 'cmd', text: 'claude "add a dark mode toggle to the header"' },
            { type: 'out', text: 'Reading CLAUDE.md...', delay: 400 },
            { type: 'out', text: 'Context: Next.js 16, Tailwind CSS, App Router' },
            { type: 'out', text: 'Preference: TypeScript only, concise responses' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Adding dark mode toggle to src/components/header.tsx...' },
            { type: 'success', text: 'Created ThemeToggle component with next-themes' },
            { type: 'success', text: 'Updated header.tsx with toggle button' },
            { type: 'success', text: 'No config changes needed — Tailwind dark mode already enabled' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Read the full CLAUDE.md guide',
      href: '/docs/foundations/claude-md',
    },
  },

  'ship-a-landing-page': {
    title: 'Ship a Landing Page in 30 Minutes',
    slug: 'ship-a-landing-page',
    duration: '30 min',
    difficulty: 'beginner',
    description:
      'Go from empty folder to a live website on the internet. No coding experience required.',
    intro:
      'You don\'t need to know HTML. You don\'t need to know CSS. You don\'t need a framework. You just need Claude Code and an idea. In 30 minutes, you\'ll have a real website live on the internet. Let\'s build it.',
    steps: [
      {
        title: 'Create a new folder',
        description:
          'Start fresh. Create a brand new folder for your project. This is going to be your portfolio site.',
        code: {
          snippet: 'mkdir my-site && cd my-site',
          language: 'bash',
        },
        demo: {
          title: 'Fresh start',
          steps: [
            { type: 'cmd', text: 'mkdir my-site && cd my-site' },
            { type: 'cmd', text: 'ls -la', delay: 400 },
            { type: 'out', text: 'total 0' },
            { type: 'out', text: 'drwxr-xr-x  2 you  staff  64 Mar 29 10:00 .' },
            { type: 'success', text: 'Empty folder. Perfect canvas.' },
          ],
        },
      },
      {
        title: 'Start Claude Code',
        description:
          'Just type claude. That\'s it. You\'re now in a conversation with an AI that can create files, run commands, and build things.',
        code: {
          snippet: 'claude',
          language: 'bash',
        },
        demo: {
          title: 'Claude Code is ready',
          steps: [
            { type: 'cmd', text: 'claude' },
            { type: 'out', text: '', delay: 400 },
            { type: 'success', text: 'Claude Code v1.0' },
            { type: 'out', text: 'Working directory: ~/my-site' },
            { type: 'out', text: 'No CLAUDE.md found (that\'s fine for now)' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Type your first prompt below.' },
          ],
        },
      },
      {
        title: 'Describe what you want',
        description:
          'Here\'s the fun part. Just tell Claude what you want in plain English. Be specific about sections and style. Claude will figure out the code.',
        code: {
          snippet: `Create a beautiful landing page for a personal portfolio with:
- Dark mode by default
- Hero section with my name and a tagline
- About me section with a brief bio
- Projects grid showing 3 placeholder projects
- Contact form with email and message fields
- Responsive design that works on mobile
- Modern, clean aesthetic with subtle animations`,
          language: 'text',
        },
        demo: {
          title: 'Claude builds your site',
          steps: [
            { type: 'cmd', text: '"Create a beautiful landing page for a personal portfolio..."' },
            { type: 'out', text: 'Planning the page structure...', delay: 600 },
            { type: 'out', text: 'Designing: hero, about, projects, contact sections' },
            { type: 'out', text: '' },
            { type: 'success', text: 'Creating index.html...' },
            { type: 'out', text: '  Hero: gradient background, animated entrance' },
            { type: 'out', text: '  About: two-column layout with avatar placeholder' },
            { type: 'out', text: '  Projects: responsive card grid with hover effects' },
            { type: 'out', text: '  Contact: styled form with validation' },
            { type: 'success', text: 'Created index.html (287 lines)' },
            { type: 'success', text: 'Created styles.css (194 lines)' },
            { type: 'success', text: 'Created script.js (42 lines — form handling + animations)' },
          ],
        },
      },
      {
        title: 'Watch Claude create the files',
        description:
          'Claude will create an HTML file, a CSS file, and maybe a small JavaScript file. You\'ll see each file being created in real time. Don\'t worry about understanding the code — you can always ask Claude to explain any part.',
        demo: {
          title: 'Files created',
          steps: [
            { type: 'cmd', text: 'ls -la' },
            { type: 'out', text: 'index.html   — your complete landing page', delay: 300 },
            { type: 'out', text: 'styles.css   — all the visual styling' },
            { type: 'out', text: 'script.js    — smooth scroll + form handling' },
            { type: 'out', text: '' },
            { type: 'success', text: '3 files. That\'s your entire website.' },
            { type: 'warn', text: 'Let\'s see it in the browser.' },
          ],
        },
      },
      {
        title: 'Open it in your browser',
        description:
          'Time for the big reveal. Open the HTML file directly in your browser, or use a quick local server for the full experience.',
        code: {
          snippet: `# Option 1: Open directly
open index.html

# Option 2: Run a local server (recommended)
npx serve .`,
          language: 'bash',
        },
        demo: {
          title: 'Your site is live locally',
          steps: [
            { type: 'cmd', text: 'npx serve .' },
            { type: 'out', text: '', delay: 600 },
            { type: 'out', text: '  Serving!' },
            { type: 'out', text: '' },
            { type: 'success', text: '  Local:    http://localhost:3000' },
            { type: 'success', text: '  Network:  http://192.168.1.42:3000' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Open that URL. Your portfolio is right there.' },
          ],
        },
      },
      {
        title: 'Deploy to Vercel (optional)',
        description:
          'Want it on the real internet with a real URL? One command. Vercel will give you a free .vercel.app domain instantly.',
        code: {
          snippet: 'npx vercel',
          language: 'bash',
        },
        demo: {
          title: 'Deploying to the internet',
          steps: [
            { type: 'cmd', text: 'npx vercel' },
            { type: 'out', text: 'Vercel CLI — deploying ~/my-site', delay: 500 },
            { type: 'out', text: '? Set up and deploy? Yes' },
            { type: 'out', text: '? Which scope? your-username' },
            { type: 'out', text: '? Link to existing project? No' },
            { type: 'out', text: '? Project name? my-site' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Uploading [====================] 100%' },
            { type: 'success', text: 'Deployed to https://my-site.vercel.app' },
            { type: 'warn', text: 'That\'s it. Your site is live. Share the link.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Learn which Claude interface is right for you',
      href: '/docs/foundations/which-interface',
    },
  },

  'your-first-skill': {
    title: 'Create Your First Skill in 10 Minutes',
    slug: 'your-first-skill',
    duration: '10 min',
    difficulty: 'beginner',
    description:
      'Turn a task you do every week into a single command. Copy, paste, done.',
    intro:
      'Skills are markdown files that teach Claude how to do specific tasks. Instead of typing the same instructions over and over, you write them once and Claude follows them every time. Think of it like creating a custom command. Let\'s make a code review skill.',
    steps: [
      {
        title: 'Create the skills directory',
        description:
          'Skills live inside the .claude/skills folder in your project. If it doesn\'t exist yet, create it.',
        code: {
          snippet: 'mkdir -p .claude/skills',
          language: 'bash',
        },
        demo: {
          title: 'Setting up skills',
          steps: [
            { type: 'cmd', text: 'mkdir -p .claude/skills' },
            { type: 'cmd', text: 'ls .claude/', delay: 400 },
            { type: 'out', text: 'skills/' },
            { type: 'success', text: 'Skills directory ready.' },
          ],
        },
      },
      {
        title: 'Create a code review skill',
        description:
          'Create a markdown file that tells Claude exactly how to review code. This is where the magic happens — you define the rules, the format, the tone, everything.',
        code: {
          snippet: `cat > .claude/skills/code-review.md << 'EOF'
# Code Review Skill

When asked to review code, follow this process:

## Steps
1. Read the changed files (use git diff if available)
2. Check for these issues:
   - Security vulnerabilities (SQL injection, XSS, exposed secrets)
   - Performance problems (N+1 queries, missing indexes, memory leaks)
   - Missing error handling
   - Unclear naming or overly complex logic
3. Rate each issue: CRITICAL, HIGH, MEDIUM, or LOW

## Output Format
For each issue found:
- **File**: path/to/file.ts
- **Line**: 42
- **Severity**: HIGH
- **Issue**: Description of the problem
- **Fix**: Suggested solution

## Rules
- Be direct. No sugar-coating.
- If the code is good, say so briefly and move on.
- Always check for hardcoded secrets first.
- Suggest specific fixes, not vague advice.
EOF`,
          language: 'bash',
        },
        demo: {
          title: 'Writing your skill',
          steps: [
            { type: 'cmd', text: 'cat > .claude/skills/code-review.md << \'EOF\'' },
            { type: 'out', text: '# Code Review Skill', delay: 300 },
            { type: 'out', text: '...(writing skill definition)...' },
            { type: 'out', text: 'EOF' },
            { type: 'success', text: 'Created .claude/skills/code-review.md' },
            { type: 'out', text: '' },
            { type: 'warn', text: '36 lines of instructions. That\'s your whole skill.' },
          ],
        },
      },
      {
        title: 'Test it with a real review',
        description:
          'Now use the skill. Ask Claude to review your recent changes and watch it follow your exact format.',
        code: {
          snippet: 'claude "review my recent changes"',
          language: 'bash',
        },
        demo: {
          title: 'Skill in action',
          steps: [
            { type: 'cmd', text: 'claude "review my recent changes"' },
            { type: 'out', text: 'Loading skill: code-review.md', delay: 400 },
            { type: 'out', text: 'Running git diff HEAD~1...', delay: 300 },
            { type: 'out', text: 'Reviewing 4 changed files...' },
            { type: 'out', text: '' },
            { type: 'error', text: 'CRITICAL: src/api/auth.ts:15' },
            { type: 'out', text: '  Issue: API key hardcoded in source' },
            { type: 'out', text: '  Fix: Move to environment variable' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'HIGH: src/db/queries.ts:42' },
            { type: 'out', text: '  Issue: N+1 query in user listing' },
            { type: 'out', text: '  Fix: Use JOIN or batch loading' },
            { type: 'out', text: '' },
            { type: 'success', text: '2 issues found. 1 critical, 1 high.' },
          ],
        },
      },
      {
        title: 'See the skill activate',
        description:
          'Notice how Claude followed your exact format — severity ratings, file paths, specific fixes. That\'s not coincidence. That\'s your skill definition driving the output.',
        demo: {
          title: 'What just happened',
          steps: [
            { type: 'out', text: 'Without skill: "Here are some suggestions..."', delay: 400 },
            { type: 'out', text: '  Generic advice, inconsistent format, misses things' },
            { type: 'out', text: '' },
            { type: 'success', text: 'With skill: Structured review, severity ratings, exact fixes' },
            { type: 'out', text: '  Same format every time. Never misses security checks.' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Skills turn Claude from helpful to reliable.' },
          ],
        },
      },
      {
        title: 'Customize it for your team',
        description:
          'Now make it yours. Add your team\'s specific rules, coding standards, or things that always get missed in reviews. The skill grows with you.',
        code: {
          snippet: `# Add these to your code-review.md:

## Team-Specific Rules
- All API routes must have rate limiting
- Database queries must use the repository pattern
- React components must have error boundaries
- No inline styles — use Tailwind classes only
- All public functions need JSDoc comments`,
          language: 'markdown',
        },
        demo: {
          title: 'Your team\'s rules, automated',
          steps: [
            { type: 'cmd', text: 'echo "## Team-Specific Rules" >> .claude/skills/code-review.md' },
            { type: 'success', text: 'Added 5 team-specific rules', delay: 300 },
            { type: 'out', text: '' },
            { type: 'out', text: 'Next review will check:' },
            { type: 'out', text: '  Rate limiting, repo pattern, error boundaries...' },
            { type: 'out', text: '  Tailwind usage, JSDoc comments...' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Your code review just got a lot more thorough.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Deep dive into skills and custom commands',
      href: '/docs/patterns/skills',
    },
  },

  'meeting-to-jira': {
    title: 'Turn Meeting Notes into Jira Tickets',
    slug: 'meeting-to-jira',
    duration: '15 min',
    difficulty: 'intermediate',
    description:
      'Paste your messy meeting notes. Get structured tickets with acceptance criteria. Never transcribe by hand again.',
    intro:
      'Every PM has been there. You walk out of a meeting with a page of messy notes and spend the next hour turning them into Jira tickets. Let\'s automate that. You\'ll create a skill that takes raw meeting notes and outputs clean, structured tickets ready to file.',
    steps: [
      {
        title: 'Set up a CLAUDE.md with PM context',
        description:
          'Start by giving Claude some context about your work. You don\'t need much — just enough so it knows what kind of tickets you create.',
        code: {
          snippet: `cat > CLAUDE.md << 'EOF'
# CLAUDE.md

## Role
Product Manager workspace. I manage a SaaS product with a web app and mobile app.

## Ticket Format
- All tickets go to Jira project KEY
- Use story points: 1, 2, 3, 5, 8
- Include acceptance criteria as checkboxes
- Tag with team labels: frontend, backend, design, mobile

## My Team
- Frontend: React/Next.js
- Backend: Node.js/PostgreSQL
- Mobile: React Native
EOF`,
          language: 'bash',
        },
        demo: {
          title: 'PM workspace setup',
          steps: [
            { type: 'cmd', text: 'cat > CLAUDE.md << \'EOF\'' },
            { type: 'out', text: '(writing PM context...)', delay: 300 },
            { type: 'success', text: 'Created CLAUDE.md with PM workspace context' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Claude now knows your ticket format and team structure.' },
          ],
        },
      },
      {
        title: 'Create the meeting processor skill',
        description:
          'This skill tells Claude exactly how to parse meeting notes. It extracts action items, decides who owns them, estimates effort, and formats them as tickets.',
        code: {
          snippet: `mkdir -p .claude/skills
cat > .claude/skills/meeting-to-tickets.md << 'EOF'
# Meeting to Tickets Skill

When given meeting notes, extract action items and convert them to structured tickets.

## Process
1. Read the raw meeting notes
2. Identify every action item, decision, and follow-up
3. Group related items into logical tickets
4. Estimate story points based on complexity
5. Assign team labels based on the work involved

## Output Format
For each ticket:

### [TICKET-TITLE]
**Type**: Story | Bug | Task
**Points**: 1 | 2 | 3 | 5 | 8
**Labels**: frontend, backend, design, mobile
**Description**: One paragraph explaining the work.

**Acceptance Criteria**:
- [ ] First criteria
- [ ] Second criteria
- [ ] Third criteria

## Rules
- One ticket per discrete piece of work
- Don't combine unrelated items
- If something is vague, flag it as "needs clarification"
- Default to 3 points if effort is unclear
- Always include at least 3 acceptance criteria
EOF`,
          language: 'bash',
        },
        demo: {
          title: 'Skill created',
          steps: [
            { type: 'cmd', text: 'cat > .claude/skills/meeting-to-tickets.md' },
            { type: 'success', text: 'Created meeting-to-tickets.md', delay: 300 },
            { type: 'out', text: '  Process: extract, group, estimate, format' },
            { type: 'out', text: '  Output: structured tickets with acceptance criteria' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Ready to process some messy notes.' },
          ],
        },
      },
      {
        title: 'Paste messy meeting notes',
        description:
          'Here\'s the real test. Paste some actual messy meeting notes (or use these sample ones) and watch Claude turn chaos into structure.',
        code: {
          snippet: `claude "Process these meeting notes into tickets:

Sprint planning - March 29
---
sarah mentioned the checkout flow is broken on mobile again,
users can't tap the pay button. also we need to add apple pay
before Q2. jake said the API is too slow on the product listing
page - takes 3 seconds. we agreed to add caching. oh and
marketing wants a banner on the homepage for the spring sale,
needs to be up by friday. also someone should update the
onboarding flow - users are dropping off at step 3."`,
          language: 'bash',
        },
        demo: {
          title: 'Messy notes in, clean tickets out',
          steps: [
            { type: 'cmd', text: 'claude "Process these meeting notes into tickets: ..."' },
            { type: 'out', text: 'Loading skill: meeting-to-tickets.md', delay: 400 },
            { type: 'out', text: 'Parsing meeting notes...' },
            { type: 'out', text: 'Found 5 action items across 3 teams' },
            { type: 'out', text: '' },
            { type: 'error', text: '### Fix mobile checkout pay button' },
            { type: 'out', text: '  Type: Bug | Points: 3 | Labels: mobile, frontend' },
            { type: 'out', text: '  AC: tap target size, tested on iOS+Android, regression test' },
            { type: 'out', text: '' },
            { type: 'warn', text: '### Add Apple Pay integration' },
            { type: 'out', text: '  Type: Story | Points: 8 | Labels: backend, mobile' },
            { type: 'out', text: '' },
            { type: 'warn', text: '### Add product listing caching' },
            { type: 'out', text: '  Type: Task | Points: 5 | Labels: backend' },
            { type: 'out', text: '' },
            { type: 'success', text: '5 tickets generated. Ready to file.' },
          ],
        },
      },
      {
        title: 'Review the structured output',
        description:
          'Claude gives you fully formed tickets with types, story points, labels, and acceptance criteria. Each one is ready to paste into Jira. No more staring at your notes trying to remember what was decided.',
        demo: {
          title: 'What you get',
          steps: [
            { type: 'out', text: 'From 6 lines of messy notes:', delay: 400 },
            { type: 'out', text: '' },
            { type: 'success', text: '5 structured tickets' },
            { type: 'success', text: '15 acceptance criteria' },
            { type: 'success', text: '24 story points total' },
            { type: 'success', text: '3 team labels assigned' },
            { type: 'success', text: '1 item flagged for clarification' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Time saved: ~45 minutes of manual ticket writing.' },
          ],
        },
      },
      {
        title: 'Optional: Connect an MCP for auto-creation',
        description:
          'If you want to go further, you can connect a GitHub or Linear MCP server so Claude can create the tickets directly. No copy-paste needed.',
        code: {
          snippet: `# Add to your .mcp.json to enable GitHub Issues:
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-token-here"
      }
    }
  }
}`,
          language: 'json',
        },
        demo: {
          title: 'Auto-creation with MCP',
          steps: [
            { type: 'cmd', text: 'claude "create those tickets in GitHub"' },
            { type: 'out', text: 'Using MCP: github', delay: 500 },
            { type: 'success', text: 'Created issue #142: Fix mobile checkout pay button' },
            { type: 'success', text: 'Created issue #143: Add Apple Pay integration' },
            { type: 'success', text: 'Created issue #144: Add product listing caching' },
            { type: 'success', text: 'Created issue #145: Spring sale homepage banner' },
            { type: 'success', text: 'Created issue #146: Optimize onboarding step 3' },
            { type: 'out', text: '' },
            { type: 'warn', text: '5 tickets filed. Labels and points set. Done.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Explore the full PM workflow guide',
      href: '/docs/workflows/pm-workflow',
    },
  },

  'product-discovery-ost': {
    title: 'Run Product Discovery with Opportunity Solution Trees',
    slug: 'product-discovery-ost',
    duration: '20 min',
    difficulty: 'intermediate',
    description:
      'Use Teresa Torres\' Opportunity Solution Tree framework to go from customer interviews to validated experiments — all inside Claude Code.',
    intro:
      'Product discovery shouldn\'t be a mystery. Teresa Torres\' Opportunity Solution Tree (OST) gives you a clear structure: start with an outcome, map customer opportunities, brainstorm solutions, and design assumption tests. The problem? Building and maintaining an OST takes hours of manual synthesis. Claude Code collapses that into minutes. You\'ll paste raw interview notes and walk away with a structured tree and experiment designs. If you\'re new to OSTs, read Teresa\'s original framework at producttalk.org/opportunity-solution-trees.',
    steps: [
      {
        title: 'Set up your discovery workspace',
        description:
          'Create a CLAUDE.md that gives Claude your product context and discovery goals. This is where you define the outcome you\'re chasing — the top of your OST.',
        code: {
          snippet: `cat > CLAUDE.md << 'EOF'
# CLAUDE.md

## Role
Product Manager running continuous discovery.
Framework: Opportunity Solution Trees (Teresa Torres).
Reference: https://www.producttalk.org/opportunity-solution-trees/

## Product Context
- B2B SaaS project management tool
- 2,400 active teams, 85% retention
- Target outcome: Increase weekly active usage from 3.2 to 4.5 days/week

## Discovery State
- Conducting weekly customer interviews
- 12 interviews completed this cycle
- Focus: why teams stop using the tool mid-week

## Output Preferences
- Structure everything as Outcome → Opportunities → Solutions → Tests
- Use markdown trees for visual hierarchy
- Be specific — no vague opportunity statements
EOF`,
          language: 'bash',
        },
        demo: {
          title: 'Discovery workspace ready',
          steps: [
            { type: 'cmd', text: 'mkdir product-discovery && cd product-discovery' },
            { type: 'cmd', text: 'cat > CLAUDE.md << \'EOF\'', delay: 400 },
            { type: 'success', text: 'Created CLAUDE.md with discovery context' },
            { type: 'out', text: '  Outcome: Increase weekly active usage 3.2 → 4.5 days' },
            { type: 'out', text: '  Framework: Opportunity Solution Trees' },
            { type: 'warn', text: 'Claude now thinks in OSTs. Let\'s feed it data.' },
          ],
        },
      },
      {
        title: 'Create a discovery skill',
        description:
          'This skill teaches Claude the OST framework — how to extract opportunities from interviews, distinguish opportunities from solutions, and structure everything into a tree. This is the engine.',
        code: {
          snippet: `mkdir -p .claude/skills
cat > .claude/skills/discovery-ost.md << 'EOF'
# Product Discovery — OST Skill

Process customer interview data using Teresa Torres'
Opportunity Solution Tree framework.

## Framework Reference
- Source: https://www.producttalk.org/opportunity-solution-trees/
- Book: "Continuous Discovery Habits" by Teresa Torres

## Key Definitions
- **Outcome**: The measurable business/product result we're driving toward
- **Opportunity**: A customer need, pain point, or desire (NOT a solution)
- **Solution**: An idea that addresses one or more opportunities
- **Assumption Test**: A small experiment to validate a risky assumption

## Process
1. Extract raw quotes and observations from interview notes
2. Identify opportunities (needs, pains, desires) — never solutions
3. Group related opportunities into themes
4. For each opportunity, brainstorm 3+ solutions
5. For each promising solution, identify riskiest assumption
6. Design a small experiment to test that assumption

## Opportunity Rules (Critical)
- Opportunities are CUSTOMER problems, not OUR ideas
- "Users want a dashboard" is a SOLUTION, not an opportunity
- "Users can't see their team's progress at a glance" is an opportunity
- Use the customer's language when possible
- Every opportunity must connect to the target outcome

## Output: Markdown Tree
\`\`\`
🎯 OUTCOME: [target metric]
├── 🔍 Opportunity: [customer need]
│   ├── 💡 Solution: [idea 1]
│   │   └── 🧪 Test: [experiment]
│   ├── 💡 Solution: [idea 2]
│   │   └── 🧪 Test: [experiment]
│   └── 💡 Solution: [idea 3]
├── 🔍 Opportunity: [customer need]
│   ├── 💡 Solution: [idea 1]
│   └── 💡 Solution: [idea 2]
\`\`\`
EOF`,
          language: 'bash',
        },
        demo: {
          title: 'Discovery skill loaded',
          steps: [
            { type: 'cmd', text: 'cat > .claude/skills/discovery-ost.md' },
            { type: 'success', text: 'Created discovery-ost.md', delay: 300 },
            { type: 'out', text: '  Framework: Opportunity Solution Trees' },
            { type: 'out', text: '  Process: interviews → opportunities → solutions → tests' },
            { type: 'out', text: '  Guard: distinguishes opportunities from solutions' },
            { type: 'warn', text: 'Claude won\'t confuse "wants a dashboard" with a real need.' },
          ],
        },
      },
      {
        title: 'Feed it raw interview notes',
        description:
          'Here\'s where the magic happens. Paste your messy, unstructured interview notes. Claude extracts opportunities — the customer needs, pains, and desires hidden in the conversation.',
        code: {
          snippet: `claude "Extract opportunities from these interview notes:

Interview: Sarah, PM at a 50-person startup (Mar 25)
---
'We use the tool Monday and Tuesday for sprint planning, but
by Wednesday everyone's back in Slack. The notifications are
overwhelming so people mute them. Then they miss actual updates.
I wish there was a way to see just the things that changed since
I last looked. Also the mobile app is basically useless — I
can't approve anything on my phone so I have to wait until I'm
at my desk. My team in Berlin is 6 hours ahead so by the time
I approve their PRs it's already their end of day.'

Interview: Jake, Eng Lead at a 200-person company (Mar 27)
---
'The weekly view is fine but I need a daily standup view. I
check the tool first thing in the morning but there's no way to
see just what happened overnight. I end up asking people in
Slack anyway. Also the search is terrible — I can never find
old decisions. We started using a separate wiki just for that.'"`,
          language: 'bash',
        },
        demo: {
          title: 'Extracting opportunities from interviews',
          steps: [
            { type: 'cmd', text: 'claude "Extract opportunities from these interview notes..."' },
            { type: 'out', text: 'Loading skill: discovery-ost.md', delay: 400 },
            { type: 'out', text: 'Processing 2 interviews...' },
            { type: 'out', text: 'Extracting customer language...' },
            { type: 'out', text: '' },
            { type: 'success', text: '6 opportunities identified:' },
            { type: 'out', text: '' },
            { type: 'warn', text: '1. Users can\'t distinguish signal from noise in notifications' },
            { type: 'out', text: '   Source: Sarah — "notifications are overwhelming, people mute them"' },
            { type: 'warn', text: '2. No way to see what changed since last visit' },
            { type: 'out', text: '   Source: Sarah — "wish I could see just the things that changed"' },
            { type: 'warn', text: '3. Can\'t take action from mobile' },
            { type: 'out', text: '   Source: Sarah — "can\'t approve anything on my phone"' },
            { type: 'warn', text: '4. Async teams blocked by timezone gaps' },
            { type: 'warn', text: '5. No overnight activity summary for daily standups' },
            { type: 'warn', text: '6. Past decisions are unfindable' },
            { type: 'out', text: '' },
            { type: 'success', text: 'All framed as customer needs, not solutions.' },
          ],
        },
      },
      {
        title: 'Build the full Opportunity Solution Tree',
        description:
          'Now ask Claude to build the complete tree — connecting your outcome to the opportunities, generating solutions for each, and identifying the riskiest assumptions. This is what takes hours manually.',
        code: {
          snippet: 'claude "Build the full OST. For each opportunity, brainstorm 3 solutions and identify the riskiest assumption for the most promising one."',
          language: 'bash',
        },
        demo: {
          title: 'Your Opportunity Solution Tree',
          steps: [
            { type: 'cmd', text: 'claude "Build the full OST..."' },
            { type: 'out', text: 'Structuring tree from 6 opportunities...', delay: 600 },
            { type: 'out', text: '' },
            { type: 'success', text: '🎯 OUTCOME: Weekly active usage 3.2 → 4.5 days/week' },
            { type: 'out', text: '├── 🔍 Can\'t distinguish signal from noise' },
            { type: 'out', text: '│   ├── 💡 Smart notification digest (batched, prioritized)' },
            { type: 'out', text: '│   ├── 💡 "What\'s new" changelog per project' },
            { type: 'out', text: '│   └── 💡 AI summary of overnight activity' },
            { type: 'out', text: '│       └── 🧪 Riskiest: Will users read a daily digest email?' },
            { type: 'out', text: '├── 🔍 Can\'t take action from mobile' },
            { type: 'out', text: '│   ├── 💡 Mobile approval flow (1-tap approve/reject)' },
            { type: 'out', text: '│   ├── 💡 Slack-based approvals (no app needed)' },
            { type: 'out', text: '│   └── 💡 Email-reply approvals' },
            { type: 'out', text: '│       └── 🧪 Riskiest: Is approval actually the main mobile action?' },
            { type: 'out', text: '├── 🔍 Past decisions are unfindable' },
            { type: 'out', text: '│   └── (3 solutions with tests...)' },
            { type: 'out', text: '' },
            { type: 'success', text: 'Full tree: 6 opportunities, 18 solutions, 6 experiments.' },
            { type: 'warn', text: 'Saved to discovery/ost-2026-03-29.md' },
          ],
        },
      },
      {
        title: 'Generate assumption tests for your top solutions',
        description:
          'Pick the solutions you\'re most excited about and have Claude design lightweight experiments. Teresa Torres calls these "assumption tests" — small, fast experiments that reduce risk before you build anything.',
        code: {
          snippet: `claude "Design assumption tests for these two solutions:
1. Smart notification digest (batched, prioritized)
2. Mobile approval flow (1-tap approve/reject)

For each, give me:
- The riskiest assumption
- A test I can run this week
- What 'success' looks like (with a number)
- Estimated effort"`,
          language: 'bash',
        },
        demo: {
          title: 'Experiments designed',
          steps: [
            { type: 'cmd', text: 'claude "Design assumption tests for..."' },
            { type: 'out', text: 'Analyzing riskiest assumptions...', delay: 500 },
            { type: 'out', text: '' },
            { type: 'warn', text: '## Test 1: Smart Notification Digest' },
            { type: 'out', text: 'Assumption: Users will open a daily digest email' },
            { type: 'out', text: 'Test: Send a manual digest email to 50 users for 5 days' },
            { type: 'out', text: 'Success: >40% open rate, >15% click-through to tool' },
            { type: 'out', text: 'Effort: 2 hours (manual email via Mailchimp)' },
            { type: 'out', text: '' },
            { type: 'warn', text: '## Test 2: Mobile Approval Flow' },
            { type: 'out', text: 'Assumption: Approval is the #1 mobile action needed' },
            { type: 'out', text: 'Test: Survey 20 users — "What do you wish you could do on mobile?"' },
            { type: 'out', text: 'Success: >50% mention approvals unprompted' },
            { type: 'out', text: 'Effort: 1 hour (add question to next 20 interviews)' },
            { type: 'out', text: '' },
            { type: 'success', text: 'Both tests runnable this week. Total effort: 3 hours.' },
            { type: 'warn', text: 'Ship experiments, not features.' },
          ],
        },
      },
      {
        title: 'Keep your tree alive as a living document',
        description:
          'An OST isn\'t a one-time exercise — it evolves every week as you learn. Save it to a file and update it after every interview. Claude remembers the context and builds on what\'s there.',
        code: {
          snippet: `# After your next round of interviews:
claude "Update the OST in discovery/ost-2026-03-29.md with these new findings:

Interview: Maria, Designer at a 30-person agency (Apr 1)
---
'I actually love the notifications but they all look the same.
I can't tell if something is urgent or just a comment. Color
coding or priority levels would help. Also, I realized I
only open the app when someone @mentions me — otherwise I
forget it exists.'"`,
          language: 'bash',
        },
        demo: {
          title: 'Living discovery tree',
          steps: [
            { type: 'cmd', text: 'claude "Update the OST with new findings..."' },
            { type: 'out', text: 'Reading existing tree (6 opportunities, 18 solutions)...', delay: 400 },
            { type: 'out', text: 'Processing new interview (Maria, Designer)...' },
            { type: 'out', text: '' },
            { type: 'success', text: 'Updated: "Can\'t distinguish signal from noise"' },
            { type: 'out', text: '  Added evidence: "all look the same, can\'t tell if urgent"' },
            { type: 'out', text: '  New solution: Priority-based notification styling' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'New opportunity discovered:' },
            { type: 'out', text: '  🔍 "No trigger to return to the tool without @mentions"' },
            { type: 'out', text: '  Source: Maria — "I only open when someone @mentions me"' },
            { type: 'out', text: '' },
            { type: 'success', text: 'Tree updated: 7 opportunities, 21 solutions.' },
            { type: 'warn', text: 'Your OST grows smarter after every interview.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Learn about continuous discovery with Teresa Torres',
      href: 'https://www.producttalk.org/opportunity-solution-trees/',
    },
  },

  'weekly-status': {
    title: 'Build a Weekly Status Report Generator',
    slug: 'weekly-status',
    duration: '15 min',
    difficulty: 'intermediate',
    description:
      'Pull from your projects and generate a stakeholder-ready status report in seconds.',
    intro:
      'Nobody likes writing status reports. But everyone needs them. Let\'s build a skill that gathers context from your projects and generates a clean, stakeholder-ready report in seconds. You\'ll go from "I need to write my weekly update" to having it done before your coffee gets cold.',
    steps: [
      {
        title: 'Set up memory with your project context',
        description:
          'First, give Claude the context it needs — your projects, your team, and what stakeholders care about. This goes in your CLAUDE.md.',
        code: {
          snippet: `cat > CLAUDE.md << 'EOF'
# CLAUDE.md

## Role
Product Manager. I report weekly to leadership.

## My Projects
- **Project Alpha**: User authentication redesign (Q2 deadline)
- **Project Beta**: Mobile app v2.0 (in beta testing)
- **Project Gamma**: API performance optimization (ongoing)

## Stakeholders
- VP of Product: wants high-level progress and risks
- Engineering Director: wants technical details and blockers
- CEO: wants one-sentence status per project

## Status Report Format
Weekly status sent every Friday.
Covers: accomplishments, next week, risks, metrics.
EOF`,
          language: 'bash',
        },
        demo: {
          title: 'Context loaded',
          steps: [
            { type: 'cmd', text: 'cat > CLAUDE.md' },
            { type: 'success', text: 'Created CLAUDE.md with project context', delay: 300 },
            { type: 'out', text: '  3 projects tracked' },
            { type: 'out', text: '  3 stakeholder profiles defined' },
            { type: 'out', text: '  Report format specified' },
            { type: 'warn', text: 'Claude knows what your stakeholders care about.' },
          ],
        },
      },
      {
        title: 'Create the weekly-status skill',
        description:
          'This skill defines the exact structure of your status report. It tells Claude what sections to include, what tone to use, and how to handle missing information.',
        code: {
          snippet: `mkdir -p .claude/skills
cat > .claude/skills/weekly-status.md << 'EOF'
# Weekly Status Report Skill

Generate a weekly status report for leadership.

## Process
1. Read project context from CLAUDE.md
2. Ask what was accomplished this week (or check recent files/commits)
3. Structure into the report format below
4. Flag any risks or blockers prominently

## Report Template

# Weekly Status — [Date]

## TL;DR
One sentence per project. Green/Yellow/Red status.

## Project Alpha: [Status Emoji] [One-liner]
**This week**: What got done
**Next week**: What's planned
**Risk**: Any blockers or concerns (or "None")

## Project Beta: [Status Emoji] [One-liner]
(same format)

## Project Gamma: [Status Emoji] [One-liner]
(same format)

## Key Metrics
- Metric 1: value (trend)
- Metric 2: value (trend)

## Decisions Needed
- [ ] Decision 1 (by when, from whom)

## Status Emojis
- On track = green circle
- At risk = yellow circle
- Blocked = red circle

## Rules
- Keep it scannable — leadership reads in 30 seconds
- Lead with the TL;DR
- Put bad news in the Risks section, not hidden in updates
- Use concrete numbers, not vague progress descriptions
- If unsure about something, say so explicitly
EOF`,
          language: 'bash',
        },
        demo: {
          title: 'Skill created',
          steps: [
            { type: 'cmd', text: 'cat > .claude/skills/weekly-status.md' },
            { type: 'success', text: 'Created weekly-status.md', delay: 300 },
            { type: 'out', text: '  Template: TL;DR, per-project status, metrics, decisions' },
            { type: 'out', text: '  Rules: scannable, concrete, honest about risks' },
            { type: 'warn', text: 'Your report format is now locked in.' },
          ],
        },
      },
      {
        title: 'Run it and see the report',
        description:
          'Now just tell Claude what happened this week. You can be as messy as you want — bullet points, half-sentences, whatever. The skill handles the formatting.',
        code: {
          snippet: `claude "Generate my weekly status. Here's what happened:
- Alpha: finished the password reset flow, started on SSO integration. SSO is more complex than expected, might need another sprint.
- Beta: got 200 beta testers this week, crash rate down to 0.3%. One critical bug with push notifications on Android.
- Gamma: reduced API p95 from 800ms to 340ms. Still working on the search endpoint."`,
          language: 'bash',
        },
        demo: {
          title: 'Your status report, generated',
          steps: [
            { type: 'cmd', text: 'claude "Generate my weekly status..."' },
            { type: 'out', text: 'Loading skill: weekly-status.md', delay: 400 },
            { type: 'out', text: 'Processing updates for 3 projects...' },
            { type: 'out', text: '' },
            { type: 'success', text: '# Weekly Status — March 29, 2026' },
            { type: 'out', text: '' },
            { type: 'out', text: '## TL;DR' },
            { type: 'warn', text: 'Alpha: At risk — SSO complexity may push Q2 deadline' },
            { type: 'success', text: 'Beta: On track — 200 testers, 0.3% crash rate' },
            { type: 'success', text: 'Gamma: On track — p95 improved 57%' },
            { type: 'out', text: '' },
            { type: 'out', text: '## Decisions Needed' },
            { type: 'warn', text: '- Add extra sprint for SSO? (need VP approval by Wed)' },
            { type: 'out', text: '' },
            { type: 'success', text: 'Report generated. Ready to send.' },
          ],
        },
      },
      {
        title: 'Customize the output format',
        description:
          'Maybe your team uses Slack. Maybe you want a Confluence-friendly version. Tweak the skill to output in whatever format your team actually reads.',
        code: {
          snippet: `# Add to your weekly-status.md skill:

## Output Variants
When asked for "slack format":
- Use Slack markdown (bold with *, not **)
- Add emoji reactions as status indicators
- Keep it under 500 characters per project
- End with a thread-friendly "questions? reply here"

When asked for "email format":
- Use a professional subject line
- Start with "Hi team,"
- Attach the detailed report as a quote block
- End with "Let me know if you have questions"`,
          language: 'markdown',
        },
        demo: {
          title: 'Multi-format output',
          steps: [
            { type: 'cmd', text: 'claude "send me the slack format"' },
            { type: 'out', text: 'Reformatting for Slack...', delay: 400 },
            { type: 'out', text: '' },
            { type: 'success', text: '*Weekly Status — Mar 29*' },
            { type: 'out', text: '' },
            { type: 'warn', text: ':large_yellow_circle: *Alpha*: SSO integration started, needs extra sprint' },
            { type: 'success', text: ':large_green_circle: *Beta*: 200 testers, crash rate 0.3%' },
            { type: 'success', text: ':large_green_circle: *Gamma*: API p95 down 57% to 340ms' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Questions? Reply in thread.' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Same data. Different format. Same skill.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Build your daily practice with Claude Code',
      href: '/docs/workflows/daily-practice',
    },
  },
};

const ALL_SLUGS = Object.keys(TUTORIALS);

/* ------------------------------------------------------------------ */
/*  Static params for pre-rendering                                    */
/* ------------------------------------------------------------------ */

export function generateStaticParams(): Array<{ slug: string }> {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

/* ------------------------------------------------------------------ */
/*  Dynamic metadata                                                   */
/* ------------------------------------------------------------------ */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = TUTORIALS[slug];
  if (!tutorial) return { title: 'Tutorial not found' };

  return {
    title: `${tutorial.title} | Claude Code Guide`,
    description: tutorial.description,
  };
}

/* ------------------------------------------------------------------ */
/*  Difficulty badge component                                         */
/* ------------------------------------------------------------------ */

function DifficultyBadge({ level }: { level: 'beginner' | 'intermediate' }) {
  const styles =
    level === 'beginner'
      ? 'bg-green-500/10 text-green-600 dark:text-green-400'
      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400';

  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${styles}`}>
      {level}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = TUTORIALS[slug];

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="flex flex-col bg-fd-background">
      <article className="mx-auto w-full max-w-3xl px-6 pt-12 pb-24">
        {/* Back link */}
        <Link
          href="/tutorials"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All tutorials
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 rounded-full bg-fd-accent px-2.5 py-1 text-[11px] font-medium text-fd-muted-foreground">
              <Clock className="h-3 w-3" />
              {tutorial.duration}
            </span>
            <DifficultyBadge level={tutorial.difficulty} />
          </div>

          <h1 className="font-display text-3xl font-normal tracking-tight text-fd-foreground sm:text-4xl">
            {tutorial.title}
          </h1>

          <p className="mt-4 text-lg text-fd-muted-foreground">
            {tutorial.description}
          </p>
        </header>

        {/* Intro */}
        <div className="mb-12 rounded-xl border border-fd-border bg-fd-card p-6">
          <p className="text-sm leading-relaxed text-fd-muted-foreground">
            {tutorial.intro}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          {tutorial.steps.map((step, index) => (
            <section key={index}>
              {/* Step header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-fd-border bg-fd-muted text-sm font-medium text-fd-muted-foreground">
                  {index + 1}
                </div>
                <div>
                  <h2 className="text-lg font-medium text-fd-foreground">
                    {step.title}
                  </h2>
                  <p className="mt-1 text-sm text-fd-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Code block */}
              {step.code && (
                <div className="ml-12 mt-4">
                  <CopyBlock
                    code={step.code.snippet}
                    language={step.code.language}
                  />
                </div>
              )}

              {/* Demo card */}
              {step.demo && (
                <div className="ml-12 mt-4">
                  <DemoCard
                    title={step.demo.title}
                    steps={step.demo.steps}
                    loop={false}
                  />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 space-y-8">
          {/* What's next */}
          <div className="rounded-xl border border-fd-border bg-fd-card p-6">
            <p className="text-sm font-medium text-fd-muted-foreground mb-2">
              What&apos;s next?
            </p>
            <Link
              href={tutorial.nextLink.href}
              className="inline-flex items-center gap-2 text-fd-foreground font-medium hover:underline"
            >
              {tutorial.nextLink.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Email capture */}
          <EmailCapture />
        </div>
      </article>
    </div>
  );
}
