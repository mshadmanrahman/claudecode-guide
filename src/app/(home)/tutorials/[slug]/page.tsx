import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { DemoCard } from '@/components/demo-card';
import { EmailCapture } from '@/components/email-capture';
import { CopyBlock } from '@/components/guide/copy-block';
import { TutorialTracker } from '@/components/tutorial-tracker';
import { TutorialCompleteButton } from '@/components/tutorial-complete-button';
import { TutorialStepDemo } from '@/components/tutorial-step-demo';
import { RouteSwitcher, type TutorialRoute } from '@/components/route-switcher';
import { ShareCard } from '@/components/share-card';

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
  appDemo?: {
    steps: Array<{
      role: 'user' | 'claude';
      text: string;
      delay?: number;
    }>;
  };
  ideDemo?: {
    steps: Array<{
      role: 'user' | 'claude';
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
  /** Routes with authored content. Defaults to ['terminal'] for old tutorials, ['app'] for new. */
  availableRoutes?: TutorialRoute[];
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
    availableRoutes: ['app', 'terminal', 'ide'],
    description:
      'The single most important thing you can do with Claude Code. Create the file that turns it from generic to personalized.',
    intro:
      'A CLAUDE.md file is like a briefing doc for Claude. It tells Claude who you are, what your project is, and how you like to work. Without it, Claude starts every conversation from scratch. With it, Claude already knows the deal. Let\'s build one.',
    steps: [
      {
        title: 'Get to your starting point',
        description:
          'Pick any project you\'re working on — a side project, a work repo, anything. We just need to get Claude looking at the right place.',
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
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to set up a CLAUDE.md file for my project. It\'s a Next.js app with TypeScript. Where do I start?' },
            { role: 'claude', text: 'Perfect starting point. A CLAUDE.md lives in your project root and tells me exactly how to work with your codebase.\n\nTell me a bit more:\n1. What does the project do?\n2. Any specific patterns or conventions your team follows?\n3. What do you want me to always/never do?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I want to set up a CLAUDE.md for this project. Can you look at my files and generate one?' },
            { role: 'claude', text: 'I can see your project structure — Next.js 16, TypeScript, Tailwind, Prisma for the database layer.\n\nI\'ll generate a CLAUDE.md based on what I can see. Give me a second to read through your key files.' },
          ],
        },
      },
      {
        title: 'Generate your CLAUDE.md',
        description:
          'In the terminal, one command does it all. In the app or IDE, you describe your project and Claude writes it for you.',
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
        appDemo: {
          steps: [
            { role: 'user', text: 'My project is a Next.js SaaS app with TypeScript and Tailwind. We use Prisma for the DB, vitest for tests, and prefer functional components. Never use `any` types.' },
            { role: 'claude', text: 'Here\'s your CLAUDE.md:\n\n---\n# CLAUDE.md\n\n## Stack\nNext.js (App Router), TypeScript (strict), Tailwind CSS, Prisma\n\n## Testing\nVitest — run with `npm test`\n\n## Conventions\n- Functional components only\n- No `any` types — use `unknown` and narrow\n- Immutable updates with spread operators\n---\n\nSave this as `CLAUDE.md` in your project root.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Generate a CLAUDE.md for this project based on what you can see.' },
            { role: 'claude', text: 'I\'ve read your package.json, tsconfig.json, and a few component files. Here\'s a CLAUDE.md that reflects what\'s actually in your codebase:\n\n---\n# CLAUDE.md\n\n## Stack\nNext.js 16 (App Router), TypeScript strict mode, Tailwind CSS v4, Prisma ORM\n\n## Commands\n`npm run dev` · `npm run build` · `npm test` (vitest)\n\n## What I noticed\n- All components are functional with explicit prop types\n- No barrel files — import directly from source\n- Prisma schema uses soft deletes (`deletedAt` pattern)\n---\n\nShall I write this to `CLAUDE.md`?' },
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
        appDemo: {
          steps: [
            { role: 'claude', text: 'Here\'s what your CLAUDE.md should contain:\n\n```\n# CLAUDE.md\n\n## Stack\nNext.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma\n\n## Commands\nnpm run dev · npm run build · npm test\n\n## Project Structure\nsrc/app/       — App router pages\nsrc/components — Shared components\n```\n\nCopy this, save it as `CLAUDE.md` in your project root, and then we\'ll add your personal preferences.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'claude', text: 'Done — I\'ve written `CLAUDE.md` to your project root.\n\nI included your actual file structure, the Prisma schema details, and the vitest config I found. You can open it now in the editor and I\'ll help you add your personal preferences next.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Add this to the CLAUDE.md you just wrote:\n\nBe concise. Give code first, explanation second. Use TypeScript always. When fixing bugs, show root cause before fix. Don\'t ask — just do it.' },
            { role: 'claude', text: 'Updated CLAUDE.md with your communication preferences:\n\n```\n## How I Work With You\n- Concise — no preamble\n- Code first, explanation after\n- TypeScript only, no JS alternatives\n- Bug fixes: root cause → fix (in that order)\n- No "would you like me to..." — just act\n```\n\nCopy this and append it to your CLAUDE.md. That\'s your CLAUDE.md done.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Add a section to the CLAUDE.md you just created: be concise, code first, TypeScript only, show root cause before fixing bugs, don\'t ask — just do.' },
            { role: 'claude', text: 'Added `## How I Work With You` section to `CLAUDE.md`. The file is saved and already active — I\'ll follow these preferences for the rest of this session.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Add a dark mode toggle to the header. My stack is Next.js 16, Tailwind, TypeScript.' },
            { role: 'claude', text: 'Here\'s a `ThemeToggle` component using `next-themes`:\n\n```tsx\n\'use client\';\nimport { useTheme } from \'next-themes\';\nimport { Sun, Moon } from \'lucide-react\';\n\nexport function ThemeToggle() {\n  const { theme, setTheme } = useTheme();\n  return (\n    <button onClick={() => setTheme(theme === \'dark\' ? \'light\' : \'dark\')}>\n      {theme === \'dark\' ? <Sun /> : <Moon />}\n    </button>\n  );\n}\n```\n\nAdd `<ThemeToggle />` to your header. Tailwind dark mode should already be configured.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Add a dark mode toggle to the header.' },
            { role: 'claude', text: 'I can see your header in `src/components/header.tsx`. I\'ll add the toggle directly.\n\nCreating `ThemeToggle` component, installing `next-themes`, and updating your header. One second.' },
            { role: 'claude', text: 'Done. I\'ve updated 3 files:\n• `src/components/theme-toggle.tsx` — new component\n• `src/components/header.tsx` — toggle added to nav bar\n• `src/app/layout.tsx` — wrapped with `ThemeProvider`\n\nYour `tailwind.config.ts` already had `darkMode: "class"` so no changes needed there.' },
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
    availableRoutes: ['app', 'terminal', 'ide'],
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
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to build a personal portfolio landing page. What information do you need from me?' },
            { role: 'claude', text: 'Just describe what you want and I\'ll generate the full HTML, CSS, and JS for you.\n\nTell me:\n1. Your name and tagline\n2. What sections you want (about, projects, contact?)\n3. Any style preferences — dark mode, minimal, bold, etc.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create a new portfolio landing page project in this empty folder.' },
            { role: 'claude', text: 'Got it — starting from scratch. I\'ll create `index.html`, `styles.css`, and `script.js` in this folder.\n\nQuick question: any name or tagline you want in the hero section, or should I use placeholders you can fill in later?' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'My name is Alex Rivera. I\'m a UX designer. I want a dark portfolio with a hero, projects grid (3 cards), and a contact section. Minimal and clean.' },
            { role: 'claude', text: 'Here\'s your complete portfolio. Three files to save:\n\n📄 `index.html` — full page structure\n🎨 `styles.css` — dark theme, card grid, hover effects\n⚡ `script.js` — smooth scroll, form handling\n\nI\'ll share each file below. Copy and save them to the same folder, then open `index.html` in your browser.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Build the portfolio now. My name is Alex Rivera, I\'m a UX designer, dark minimal aesthetic, hero + projects grid + contact.' },
            { role: 'claude', text: 'Creating 3 files now...\n\n✓ `index.html` created\n✓ `styles.css` created (dark theme, card grid)\n✓ `script.js` created (smooth scroll + form)\n\nOpen `index.html` in your browser to preview, or I can start a local dev server for you.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'The hero font feels too thin. Make it bolder and increase the tagline font size.' },
            { role: 'claude', text: 'Updated CSS — here\'s the change to make in your `styles.css`:\n\n```css\n.hero h1 {\n  font-weight: 700;  /* was 400 */\n  font-size: clamp(2.5rem, 6vw, 5rem);  /* was 3rem */\n}\n.hero .tagline {\n  font-size: 1.25rem;  /* was 1rem */\n}\n```\n\nJust find these selectors and swap the values.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'The hero font feels too thin. Make it bolder and increase the tagline size.' },
            { role: 'claude', text: 'Updated `styles.css` — changed `font-weight` to 700 and increased the tagline to `1.25rem`. Refresh your browser to see the change.' },
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
        appDemo: {
          steps: [
            { role: 'claude', text: 'You now have 3 files. To preview: drag `index.html` into Chrome, or double-click it in Finder/File Explorer.\n\nReady to put it on the internet? I\'ll walk you through deploying to Vercel — it\'s free and takes 2 minutes.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'claude', text: 'Files are in your workspace. Want me to start a local dev server so you can preview with hot reload?\n\nRun: `npx serve .` — or I can set up a proper live-reload environment.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'How do I preview the files you just gave me?' },
            { role: 'claude', text: 'Two options:\n\n1. **Quickest**: Save all three files to a folder, then drag `index.html` into Chrome/Safari — it opens immediately, no server needed.\n\n2. **Better preview**: Open Terminal, go to that folder, and run `npx serve .` — this starts a local server with proper URL handling.\n\nOnce you can see it, come back and tell me what you\'d like to change.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'claude', text: 'Your files are ready. To preview:\n\n```bash\nnpx serve .\n```\n\nOr I can open it directly — just say the word. Once you see it in the browser, tell me what to tweak. Want me to run the server for you now?' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'I\'m happy with how it looks. How do I put it on the internet?' },
            { role: 'claude', text: 'Easiest free option: **Vercel**. It takes about 2 minutes.\n\n1. Go to vercel.com and sign up with GitHub\n2. Click "Add New Project"\n3. Upload your 3 files (index.html, styles.css, script.js)\n4. Click Deploy\n\nYou\'ll get a free `.vercel.app` URL instantly — shareable, HTTPS, fast worldwide.\n\nAlternately, if you have a terminal open, run: `npx vercel` in your project folder and follow the prompts.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Deploy this to Vercel.' },
            { role: 'claude', text: 'Deploying now...\n\n```bash\nnpx vercel --yes\n```\n\nThis will auto-answer the setup questions. Give it 30 seconds.' },
            { role: 'claude', text: 'Done. Your site is live:\n\nhttps://my-site-abc123.vercel.app\n\nShare that link. It\'s live on the internet right now.' },
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
    availableRoutes: ['app', 'terminal', 'ide'],
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
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to create a reusable code review skill for Claude. How do I set this up in the app?' },
            { role: 'claude', text: 'In the Claude app, skills are just saved prompts — instructions you write once and reuse every session.\n\nFor code review, you\'ll write a prompt that defines:\n1. What to look for (security, performance, readability)\n2. How to format the output (severity ratings, file paths, fixes)\n3. Your team\'s specific rules\n\nReady? Paste the code you want reviewed and I\'ll show you what a structured review looks like — then we\'ll turn the instructions into a reusable prompt you can save.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I want to create a reusable skill for code reviews. Where do I put it?' },
            { role: 'claude', text: 'In VS Code/Cursor, create a file at `.claude/skills/code-review.md` in your project root. I can create it for you right now — just confirm and I\'ll write the skill definition.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Here are the instructions I want you to follow every time I ask for a code review:\n\nCheck for: security vulnerabilities, performance issues, missing error handling, unclear naming.\nRate each issue: CRITICAL, HIGH, MEDIUM, or LOW.\nFormat: file path, line number, severity, issue, fix suggestion.\nBe direct. If the code is good, say so briefly.' },
            { role: 'claude', text: 'Got it — I\'ll follow that format every time you ask for a code review in this conversation.\n\nTo make this permanent across future sessions, save these instructions as your "code review prompt" somewhere (a note, a doc) and paste it at the start of any new conversation when you need a review.\n\nReady to test it? Paste some code and I\'ll run a review using your format.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create `.claude/skills/code-review.md` with a skill that checks for security issues, performance problems, and missing error handling. Rate each CRITICAL/HIGH/MEDIUM/LOW with file, line, and fix.' },
            { role: 'claude', text: 'Creating `.claude/skills/code-review.md` now...\n\nDone. The skill is saved. From now on, any time you ask me to "review recent changes" or invoke `/code-review`, I\'ll follow your format exactly.\n\nWant to test it on your current diff?' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Review this code:\n\nconst API_KEY = "sk-live-abc123";\nasync function getUsers() {\n  const users = await db.query("SELECT * FROM users");\n  return users.map(u => db.query(`SELECT * FROM orders WHERE user_id = ${u.id}`));\n}' },
            { role: 'claude', text: '**File**: api.js\n**Line**: 1\n**Severity**: CRITICAL\n**Issue**: API key hardcoded in source — will be exposed in version control\n**Fix**: Use `process.env.API_KEY` and add to `.env` file\n\n---\n\n**File**: api.js\n**Lines**: 3–5\n**Severity**: HIGH\n**Issue**: N+1 query — fetches orders separately for each user, causing one DB call per user\n**Fix**: Use a JOIN or batch query: `SELECT * FROM orders WHERE user_id IN (...user_ids)`\n\n2 issues. 1 critical (security), 1 high (performance). Fix the CRITICAL before pushing.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Review my recent changes.' },
            { role: 'claude', text: 'Running `git diff HEAD~1` to see what changed...\n\n**src/api/auth.ts:15** — CRITICAL\nAPI key `sk-live-abc123` is hardcoded. Move to `process.env.API_KEY` immediately.\n\n**src/db/queries.ts:42** — HIGH\nN+1 query in `getUsersWithOrders()`. Use a JOIN or `whereIn` batch. Current code makes one DB call per user.\n\n2 issues found. Want me to fix both?' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Why is the output so much better when I give you those instructions upfront?' },
            { role: 'claude', text: 'Without instructions, I optimize for "helpful" — which often means verbose, diplomatic, and inconsistent.\n\nWith your format, I\'m constrained to what actually matters to you: severity, location, and a concrete fix. No padding, no hedging.\n\nThe instructions you wrote are essentially a spec for the output. The more specific the spec, the more predictable and useful the result. That\'s the whole point of skills — they make Claude reliable, not just helpful.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'What\'s the difference between asking with and without the skill?' },
            { role: 'claude', text: 'Without the skill, I give you a general opinion. With it, I follow your exact format — severity ratings, file paths, line numbers, specific fixes.\n\nThe skill is a contract: it defines what a "code review" means in your project. I can\'t drift into vague suggestions or skip your team\'s rules. That consistency is what makes it useful at scale.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Add these rules to my code review instructions:\n- All API routes must have rate limiting\n- Database queries must use the repository pattern\n- React components must have error boundaries\n- No inline styles, Tailwind classes only\n- All public functions need JSDoc' },
            { role: 'claude', text: 'Updated. From now on, every code review in this conversation will also check:\n\n✓ Rate limiting on API routes\n✓ Repository pattern for DB queries\n✓ Error boundaries on React components\n✓ Tailwind-only (flags any inline styles)\n✓ JSDoc on public functions\n\nTo make this permanent, add these to the saved prompt you\'ll use at the start of each session. Want me to give you the complete, updated prompt to save?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Add these team rules to the code review skill: rate limiting on all API routes, repository pattern for DB queries, error boundaries on React components, no inline styles, JSDoc on public functions.' },
            { role: 'claude', text: 'Added a `## Team Rules` section to `.claude/skills/code-review.md` with all five rules.\n\nNext time you run a review, I\'ll check for all of them. The file is updated and saved — it applies to every Claude Code session in this project.' },
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
    availableRoutes: ['app', 'terminal', 'ide'],
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
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to turn meeting notes into Jira tickets. Before I paste notes, here\'s my context: I\'m a PM for a SaaS app, web + mobile. Tickets go in Jira project KEY. Story points: 1, 2, 3, 5, 8. Teams: frontend (React), backend (Node), mobile (React Native). Always include acceptance criteria as checkboxes.' },
            { role: 'claude', text: 'Got it — I\'ll use that context for every ticket I generate in this conversation.\n\nQuick format I\'ll follow:\n• Type: Story / Bug / Task\n• Points: 1, 2, 3, 5, 8\n• Labels: frontend, backend, design, mobile\n• Acceptance criteria: checkboxes\n\nPaste your meeting notes whenever you\'re ready.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create a CLAUDE.md with PM context: SaaS product, web + mobile. Jira project KEY. Story points 1/2/3/5/8. Teams: frontend (React), backend (Node), mobile (React Native). Acceptance criteria as checkboxes.' },
            { role: 'claude', text: 'Created `CLAUDE.md` with your PM workspace context.\n\nI\'ll use this for the rest of the session — any ticket I generate will follow your format and label structure. Ready for the meeting notes.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Here\'s how I want you to process meeting notes into tickets:\n\n1. Extract every action item and decision\n2. Group related items into one ticket each\n3. Estimate story points (1/2/3/5/8) based on complexity\n4. Assign team labels (frontend/backend/mobile/design)\n5. Write at least 3 acceptance criteria per ticket\n6. Flag vague items as "needs clarification"\n\nIs that clear?' },
            { role: 'claude', text: 'Perfectly clear. I\'ll follow that process for every meeting you paste.\n\nOne thing: for step 3, I\'ll default to 3 points when effort is genuinely unclear, and I\'ll explain my reasoning for any 8-point estimate.\n\nPaste your first set of meeting notes.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create `.claude/skills/meeting-to-tickets.md` — a skill that extracts action items from meeting notes, groups them into tickets, estimates story points (1/2/3/5/8), assigns team labels (frontend/backend/mobile/design), writes 3+ acceptance criteria per ticket, and flags vague items.' },
            { role: 'claude', text: 'Created `.claude/skills/meeting-to-tickets.md` with the full process definition.\n\nThe skill includes output formatting, estimation defaults, and the clarification flag rule. Ready to test — paste your meeting notes.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Process these meeting notes into tickets:\n\nSprint planning March 29 — sarah mentioned checkout is broken on mobile, users can\'t tap pay. also add apple pay before Q2. jake said API is too slow on product listing - 3 seconds, add caching. marketing wants spring sale banner on homepage by friday. someone should fix onboarding step 3 dropoff.' },
            { role: 'claude', text: '5 tickets extracted:\n\n### Bug: Fix mobile checkout pay button\n**Type**: Bug | **Points**: 3 | **Labels**: mobile, frontend\n**AC**: - [ ] Tap target meets 44px minimum - [ ] Tested on iOS and Android - [ ] Regression test added\n\n### Story: Add Apple Pay integration\n**Type**: Story | **Points**: 8 | **Labels**: backend, mobile\n**AC**: - [ ] Apple Pay entitlement configured - [ ] Payment flow tested in sandbox - [ ] Fallback to card shown if unsupported\n\n### Task: Add product listing API caching\n**Type**: Task | **Points**: 5 | **Labels**: backend\n**AC**: - [ ] p95 response under 500ms - [ ] Cache invalidation on product update - [ ] Cache hit rate >80% in staging\n\n### Task: Spring sale homepage banner\n**Type**: Task | **Points**: 2 | **Labels**: frontend, design\n⚠️ Deadline: Friday — flag for prioritization\n\n### Story: Reduce onboarding step 3 drop-off\n**Type**: Story | **Points**: 3 | **Labels**: frontend\n⚠️ Needs clarification: which metric defines success?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Process these meeting notes: checkout broken on mobile, add apple pay before Q2, API too slow (3s) needs caching, spring sale banner by Friday, fix onboarding step 3 dropoff.' },
            { role: 'claude', text: 'Using `meeting-to-tickets` skill — extracted 5 tickets:\n\n**BUG** Fix mobile checkout button (3pts, mobile+frontend)\n**STORY** Apple Pay integration (8pts, backend+mobile)\n**TASK** Product listing caching (5pts, backend)\n**TASK** Spring sale banner (2pts, frontend) — ⚠️ Friday deadline\n**STORY** Onboarding step 3 (3pts, frontend) — ⚠️ needs success metric\n\nAll have 3 acceptance criteria. Want me to export as markdown to paste into Jira?' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'That\'s actually really good. How long would this have taken manually?' },
            { role: 'claude', text: 'For 5 tickets with 3 acceptance criteria each, typically 30–45 minutes:\n\n• Reviewing notes to find all action items: 5 min\n• Deciding how to group them: 5 min\n• Writing each ticket title and description: 10 min\n• Writing acceptance criteria: 15 min\n• Assigning points and labels: 5 min\n\nWith this process: about 30 seconds to paste, 20 seconds to read.\n\nThe real saving isn\'t just time — it\'s that nothing gets lost. Meeting notes are messy. Tickets are complete.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'claude', text: 'All 5 tickets are structured and ready.\n\nWant me to export them as a single markdown file you can paste into Jira, or format for a different tool like Linear or GitHub Issues?' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Can Claude actually create the Jira tickets directly, not just write them out?' },
            { role: 'claude', text: 'Not from claude.ai directly — Jira would need to be connected.\n\nYour options:\n1. **Copy-paste**: The markdown I generate is formatted exactly to paste into Jira\'s issue creator. Takes 2 minutes for 5 tickets.\n2. **Zapier/Make**: Set up an automation that reads a Google Doc and creates Jira tickets — no coding required.\n3. **Claude Code + MCP**: If you\'re comfortable with a terminal, Claude Code with a GitHub or Linear MCP server can create issues automatically. That\'s the next level.\n\nFor now, the copy-paste approach saves you 80% of the work. The setup for direct creation is a separate project.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Can you create these tickets in GitHub Issues directly?' },
            { role: 'claude', text: 'Yes — I have the GitHub MCP connected. Creating 5 issues now...\n\n✓ #142: Fix mobile checkout pay button\n✓ #143: Add Apple Pay integration\n✓ #144: Add product listing caching\n✓ #145: Spring sale homepage banner\n✓ #146: Optimize onboarding step 3\n\nAll created with labels, assignees, and acceptance criteria in the description. Check your repo.' },
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
    availableRoutes: ['app', 'terminal', 'ide'],
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
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to run product discovery using Teresa Torres\' Opportunity Solution Tree framework. My product context: B2B SaaS project management tool, 2,400 active teams, 85% retention. Target outcome: increase weekly active usage from 3.2 to 4.5 days/week. I\'ve done 12 customer interviews this cycle.' },
            { role: 'claude', text: 'Great framing — you\'ve already done the hardest part by defining a measurable outcome. Let me make sure I\'m using the OST framework correctly:\n\n🎯 **Outcome**: Weekly active usage 3.2 → 4.5 days/week\n\nFor everything we do in this session, I\'ll distinguish:\n- **Opportunities** = customer problems/needs/desires (what they experience)\n- **Solutions** = our ideas (what we might build)\n- **Assumption tests** = small experiments to validate before building\n\nPaste your first interview when ready. I\'ll extract the opportunities.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create a CLAUDE.md for a product discovery workspace. B2B SaaS, 2400 active teams. Outcome: increase weekly active usage 3.2 → 4.5 days/week. Framework: OST (Teresa Torres). 12 interviews done, focus on why teams stop using mid-week.' },
            { role: 'claude', text: 'Created `CLAUDE.md` with your discovery context and OST framework reference.\n\nI\'ll use this throughout the session — all opportunity extraction will be anchored to your stated outcome. Ready for interview notes.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Here\'s the rule I need you to follow strictly: when extracting from interviews, only identify OPPORTUNITIES (customer needs, pains, desires) — never solutions. If something looks like a solution, reframe it as the underlying need. For example: "wants a dashboard" → "can\'t see team progress at a glance." Can you do that?' },
            { role: 'claude', text: 'Yes — and that\'s the most important discipline in OST work.\n\nThe rule I\'ll follow:\n✓ "I wish I could see who\'s blocked" → Opportunity: No visibility into teammate status\n✗ "We should build a blocker dashboard" → That\'s a solution — I\'ll reframe or flag it\n\nEvery time I identify something, I\'ll phrase it from the customer\'s perspective using their language where possible.\n\nPaste your interviews.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create `.claude/skills/discovery-ost.md` — it should enforce: opportunities are customer needs only (not solutions), use customer language, anchor everything to the outcome in CLAUDE.md, output as markdown tree with 🎯/🔍/💡/🧪 icons.' },
            { role: 'claude', text: 'Created `.claude/skills/discovery-ost.md` with the full OST process.\n\nKey constraint baked in: if I detect a solution masquerading as an opportunity, I\'ll flag it and reframe it as the underlying customer need. Ready for the interview data.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Extract opportunities from these interview notes:\n\nSarah, PM at 50-person startup: "We use the tool Monday and Tuesday but by Wednesday everyone\'s back in Slack. Notifications are overwhelming so people mute them. I wish I could see just what changed since I last looked. Also the mobile app is useless — I can\'t approve anything on my phone so I wait until I\'m at my desk. My team in Berlin is 6 hours ahead so by the time I approve their PRs it\'s already their end of day."' },
            { role: 'claude', text: 'Extracting from Sarah\'s interview — 4 opportunities found:\n\n🔍 **1. Can\'t distinguish signal from noise in notifications**\n→ Source: "notifications are overwhelming, people mute them"\n→ Impact: Tool is abandoned mid-week\n\n🔍 **2. No visibility into what\'s changed since last visit**\n→ Source: "wish I could see just the things that changed"\n\n🔍 **3. Can\'t take action on mobile**\n→ Source: "can\'t approve anything on my phone"\n→ Note: framed as mobile limitation, not "build a better mobile app" (that\'s a solution)\n\n🔍 **4. Async teams blocked by timezone gaps in approval workflows**\n→ Source: "Berlin team — by the time I approve it\'s their end of day"\n\nAll anchored to your outcome (weekly active usage). Ready to continue with more interviews?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Extract OST opportunities from these 2 interview notes: [Sarah, PM — notifications overwhelming, mutes them, can\'t see what changed, mobile useless for approvals, Berlin timezone blocks] [Jake, Eng Lead — needs daily standup view, no overnight summary, search is terrible, team uses a separate wiki]' },
            { role: 'claude', text: 'Using `discovery-ost` skill — extracted 6 opportunities:\n\n🔍 Can\'t distinguish signal from noise in notifications (Sarah)\n🔍 No way to see what changed since last visit (Sarah)\n🔍 Can\'t take action from mobile (Sarah)\n🔍 Async teams blocked by timezone gaps (Sarah)\n🔍 No overnight activity summary for daily standups (Jake)\n🔍 Past decisions are unfindable (Jake)\n\nAll framed as customer needs, anchored to weekly active usage outcome. Ready to build the tree?' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Now build the full OST. For each of the 6 opportunities, brainstorm 3 solutions and identify the riskiest assumption for the most promising one.' },
            { role: 'claude', text: '🎯 **OUTCOME**: Weekly active usage 3.2 → 4.5 days/week\n\n├── 🔍 Can\'t distinguish signal from noise\n│   ├── 💡 Smart notification digest (batched by priority)\n│   ├── 💡 "What\'s new since you left" view\n│   └── 💡 Per-project activity feed\n│       └── 🧪 Riskiest: Will users actually check a digest, or ignore it like email newsletters?\n\n├── 🔍 Can\'t take action from mobile\n│   ├── 💡 1-tap approval in mobile app\n│   ├── 💡 Slack-based approvals (no app needed)\n│   └── 💡 Email-reply approvals\n│       └── 🧪 Riskiest: Is approval the #1 mobile action, or just the most salient one?\n\n├── 🔍 Async teams blocked by timezone gaps\n│   ├── 💡 Async approval with deadline + auto-escalation\n│   ├── 💡 "Pending your approval" Slack nudge at start of day\n│   └── 💡 Delegation: approve on behalf of absent teammate\n\n(+3 more opportunities with solutions...)\n\n**Full tree: 6 opportunities, 18 solutions, 6 assumption tests.**' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Build the full OST from the 6 opportunities we extracted. 3 solutions per opportunity, riskiest assumption for the most promising solution each.' },
            { role: 'claude', text: 'Building full OST...\n\nSaved to `discovery/ost-2026-03-29.md`\n\n6 opportunities → 18 solutions → 6 assumption tests\n\nTop risky assumptions flagged:\n1. Will users read a notification digest or ignore it?\n2. Is mobile approval the primary action, or just the loudest complaint?\n3. Would users search for past decisions if search were better, or have they accepted the wiki?\n\nOpen the file to see the full tree. Ready to design the assumption tests?' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Design assumption tests for the smart notification digest and the mobile approval flow. For each: riskiest assumption, test I can run this week, success criteria with a number, estimated effort.' },
            { role: 'claude', text: '**Test 1: Smart Notification Digest**\n\n*Riskiest assumption*: Users will actually open a digest instead of ignoring it like marketing email\n\n*Test*: Manually curate a daily digest email for 50 active users for 5 days. Send from your personal email, not a tool domain.\n\n*Success*: >40% open rate AND >15% click back into the tool\n\n*Effort*: 2 hours total (1h setup, 20min/day curation)\n\n---\n\n**Test 2: Mobile Approval Flow**\n\n*Riskiest assumption*: Approval is actually the #1 thing people want to do on mobile — not just the most visible complaint\n\n*Test*: Add one question to your next 20 user interviews: "If you could do one thing from your phone that you currently can\'t — what would it be?" Don\'t prompt with approval.\n\n*Success*: >50% mention approvals or action-taking unprompted\n\n*Effort*: 1 hour (drafting the question, scheduling interviews)\n\nBoth runnable this week, no engineering involved.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Design assumption tests for the notification digest and mobile approval solutions. Riskiest assumption, this-week test, success metric, effort estimate.' },
            { role: 'claude', text: 'Saved test designs to `discovery/assumption-tests.md`:\n\n**Digest**: Send manual email to 50 users, 5 days → success if >40% open, >15% click-through\n**Mobile approval**: Add open-ended question to 20 interviews → success if >50% mention approvals unprompted\n\nBoth runnable this week with no engineering. Total effort: ~3 hours.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'New interview: Maria, Designer at a 30-person agency. "I actually love the notifications but they all look the same. I can\'t tell if something is urgent or just a comment. Color coding would help. Also I only open the app when someone @mentions me — otherwise I forget it exists."' },
            { role: 'claude', text: 'Updating the OST with Maria\'s interview:\n\n✅ **Updated** — "Can\'t distinguish signal from noise"\nNew evidence: "all look the same, can\'t tell if urgent"\nNew solution added: Priority-based visual styling (color/icon coding by urgency)\n\n🆕 **New opportunity discovered** — "No trigger to return to the tool without explicit @mentions"\nSource: Maria — "I only open it when someone @mentions me"\nThis is distinct from notification overload — it\'s about lacking a pull mechanism entirely.\n\nTree updated: **7 opportunities, 21 solutions.**\n\nThis is exactly how continuous discovery works — each interview either strengthens existing opportunities or surfaces new ones.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Update the OST with a new interview: Maria, Designer — notifications all look the same, can\'t distinguish urgent from comment, only opens app on @mentions.' },
            { role: 'claude', text: 'Updated `discovery/ost-2026-03-29.md`:\n\n✅ Strengthened: "Can\'t distinguish signal from noise" — added Maria\'s evidence\n✅ New solution: Priority-based notification styling\n🆕 New opportunity: "No re-engagement trigger without explicit @mention"\n\nTree: 7 opportunities, 21 solutions. File saved.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Learn about continuous discovery with Teresa Torres',
      href: 'https://www.producttalk.org/opportunity-solution-trees/',
    },
  },

  'stakeholder-map': {
    title: 'Build a Stakeholder Map in 15 Minutes',
    slug: 'stakeholder-map',
    duration: '15 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'ide'],
    description:
      'Turn a messy list of names and roles into a structured stakeholder map, communication plan, and outreach messages — no spreadsheet required.',
    intro:
      'Every PM, consultant, and white-collar professional builds stakeholder maps manually. You open a doc, start typing names, and two hours later you have a chart nobody reads. Let\'s use Claude to do the thinking. You bring the context, Claude builds the structure.',
    steps: [
      {
        title: 'Open Claude.ai and give it your project context',
        description:
          'Go to claude.ai (or open the Claude desktop app). You\'re going to have a conversation — not run a command. Start by telling Claude what you\'re working on.',
        appDemo: {
          steps: [
            { role: 'user', text: 'I need to build a stakeholder map for a new project. Can you help me?' },
            { role: 'claude', text: 'Absolutely — stakeholder maps are one of my favourite things to help with. To get started, tell me:\n\n1. What\'s the project or initiative?\n2. Who are the people involved? (names + roles, even rough ones)\n3. What\'s your goal — getting decisions made, building buy-in, planning communications?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I need to build a stakeholder map for a new project launch. Can you help me structure it?' },
            { role: 'claude', text: 'Yes — let\'s do this properly. Tell me:\n\n1. What\'s the project?\n2. List the stakeholders you know about (rough names and roles are fine)\n3. What outcome do you need from them — approval, buy-in, information, or resources?\n\nOnce I have that, I\'ll map them by influence/interest and give you a communication plan.' },
          ],
        },
      },
      {
        title: 'Paste your stakeholder list — messy is fine',
        description:
          'Don\'t worry about formatting. Paste emails, org chart screenshots, LinkedIn titles, whatever you have. Claude will make sense of it.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Project: Launching a new employee onboarding tool company-wide.\n\nStakeholders: Sarah Chen (CHRO), Mike Torres (Head of IT), 3 HRBPs (names TBC), Aisha from Finance, CEO needs to approve the budget.' },
            { role: 'claude', text: 'Got it. Here\'s your stakeholder map organized by influence and interest:\n\n🔴 High Influence, High Interest\n• Sarah Chen (CHRO) — Decision maker and champion. Needs regular updates, will present to CEO.\n• CEO — Budget approver. High stakes at approval gates, low day-to-day involvement.\n\n🟡 High Influence, Lower Interest\n• Mike Torres (Head of IT) — Technical gatekeeper for security and integrations. Communicate blockers early.\n• Aisha (Finance) — Controls budget approval. Needs ROI case, not implementation details.\n\n🟢 Lower Influence, High Interest\n• 3 HRBPs — Daily users. High interest in outcomes, low decision power. Keep informed via Sarah.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Project: Company-wide onboarding tool launch. Stakeholders: Sarah Chen (CHRO), Mike Torres (Head of IT), 3 HRBPs (names TBC), Aisha from Finance, CEO for budget approval.' },
            { role: 'claude', text: 'Stakeholder map by influence/interest:\n\n🔴 **High/High** — Sarah Chen (CHRO), CEO\nSarah is your primary champion and gatekeeper. CEO is approval-only; route through Sarah.\n\n🟡 **High/Low** — Mike Torres (IT), Aisha (Finance)\nMike: technical gatekeeper, get him early on integration requirements.\nAisha: budget approver, needs ROI framing not implementation detail.\n\n🟢 **Low/High** — HRBPs (x3)\nDaily users and advocates. Keep them informed, surface their feedback to Sarah.\n\nReady for the communication plan?' },
          ],
        },
      },
      {
        title: 'Ask for a communication plan',
        description:
          'Now turn the map into a practical weekly plan — what to say, to whom, and through which channel.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Create a communication plan from this. Weekly cadence. What should I say to each person and how often?' },
            { role: 'claude', text: 'Communication Plan — Weekly Cadence\n\nSarah Chen (CHRO)\n→ Channel: 1:1 or async Slack\n→ Frequency: Weekly\n→ Content: Progress vs milestones, risks flagged early, wins to celebrate\n\nCEO\n→ Channel: Email summary via Sarah\n→ Frequency: Monthly or at approval gates only\n→ Content: One paragraph — budget burn + key milestone status\n\nMike Torres (IT)\n→ Channel: Bi-weekly sync + async Slack\n→ Content: Integration checklist, security requirements, blockers\n\nAisha (Finance)\n→ Channel: Email\n→ Frequency: Before each approval gate\n→ Content: ROI summary + budget request with business case\n\nHRBPs (x3)\n→ Channel: Group Slack channel\n→ Frequency: Bi-weekly\n→ Content: Progress updates, what\'s changing for them, how to give feedback' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Build a weekly communication plan for each stakeholder. Channel, frequency, what to say.' },
            { role: 'claude', text: 'Communication Plan:\n\n**Sarah (CHRO)** — Weekly 1:1 or Slack\nProgress vs milestones, risks flagged early, wins to share upward\n\n**CEO** — Monthly or approval gates only, via Sarah\nOne paragraph: budget burn + milestone status\n\n**Mike Torres (IT)** — Bi-weekly sync\nIntegration checklist, security requirements, blockers\n\n**Aisha (Finance)** — Email before each approval gate\nROI summary + budget ask with business case\n\n**HRBPs (x3)** — Group Slack, bi-weekly\nWhat\'s changing for them, how to give feedback' },
          ],
        },
      },
      {
        title: 'Draft an outreach message for a key stakeholder',
        description:
          'Pick any stakeholder you haven\'t connected with yet. Ask Claude to draft the first message.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Write an outreach message for Aisha in Finance. I need her to approve our Q3 budget request. She doesn\'t know me well yet.' },
            { role: 'claude', text: 'Here\'s a concise, non-pushy message:\n\n---\nHi Aisha,\n\nI\'m leading the onboarding tool initiative for HR — Sarah Chen suggested you as the right finance contact for the Q3 budget request.\n\nI\'d love 20 minutes to walk you through the business case before the approval cycle opens. I have numbers on time-to-productivity improvements and IT support ticket reduction if that helps.\n\nWould Thursday 2pm or Friday morning work?\n\n— [Your name]\n---\n\nWant me to adjust the tone, add specific numbers, or make it shorter?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Draft a first outreach email to Aisha in Finance. I need Q3 budget approval. She doesn\'t know me yet.' },
            { role: 'claude', text: 'Draft:\n\n---\nHi Aisha,\n\nI\'m leading the onboarding tool initiative — Sarah Chen pointed me your way for the Q3 budget request.\n\nWould you have 20 minutes before the approval cycle opens? I can walk you through the ROI case — we have data on time-to-productivity and IT support ticket reduction.\n\nThursday 2pm or Friday morning work?\n\n— [Your name]\n---\n\nWant a shorter version, or should I add specific ROI numbers?' },
          ],
        },
      },
      {
        title: 'Export as markdown for Notion or Confluence',
        description:
          'Ask Claude to package everything into a clean document you can paste into your team\'s tool.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Format everything as a clean markdown document I can paste into Notion.' },
            { role: 'claude', text: '# Stakeholder Map — Onboarding Tool Launch\n_Last updated: [date]_\n\n## Stakeholder Matrix\n| Name | Role | Influence | Interest | Primary Owner |\n|---|---|---|---|---|\n| Sarah Chen | CHRO | High | High | You |\n| CEO | Executive | High | Medium | Sarah |\n| Mike Torres | Head of IT | High | Low | You |\n| Aisha | Finance Lead | High | Low | You |\n| HRBPs (x3) | HR Business Partners | Low | High | Sarah |\n\n## Communication Cadence\n[Full weekly plan as above...]\n\n## Key Risks\n1. IT approval bottleneck — surface integration requirements by Week 2\n2. CEO approval gate — ensure Sarah has the one-pager by Week 6\n\n✓ Ready to paste into Notion.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Format everything as a clean markdown document for Notion.' },
            { role: 'claude', text: '# Stakeholder Map — Onboarding Tool Launch\n\n## Matrix\n| Name | Role | Influence | Interest | Owner |\n|---|---|---|---|---|\n| Sarah Chen | CHRO | High | High | You |\n| CEO | Executive | High | Med | Sarah |\n| Mike Torres | IT | High | Low | You |\n| Aisha | Finance | High | Low | You |\n| HRBPs (x3) | HR BPs | Low | High | Sarah |\n\n## Communication Cadence\n[weekly plan here]\n\n## Risks\n1. IT approval bottleneck — engage Mike by Week 2\n2. CEO gate — Sarah needs one-pager by Week 6\n\n✓ Paste this into Notion.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Set up a CLAUDE.md for your PM workspace',
      href: '/tutorials/your-first-claude-md',
    },
  },

  'newsletter-automator': {
    title: 'Automate Your Newsletter in 10 Minutes',
    slug: 'newsletter-automator',
    duration: '10 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'ide'],
    description:
      'Feed Claude your sources — URLs, RSS feeds, or topics — and get a fully formatted newsletter draft ready to send.',
    intro:
      'Writing a newsletter is mostly curation: you scan ten tabs, decide what matters, and then spend an hour stitching it into prose. Claude can do the scanning, the summarizing, and the first draft. You do the editing and add your voice at the end.',
    steps: [
      {
        title: 'Tell Claude what your newsletter is about',
        description:
          'Open Claude.ai and describe your newsletter in one message. The more specific, the better the draft.',
        appDemo: {
          steps: [
            { role: 'user', text: 'I run a weekly newsletter for product managers called "PM Pulse." It covers product strategy, interesting frameworks, and one tool worth trying. My audience is mid-to-senior PMs at tech companies. Tone is smart but not stuffy — like a sharp PM friend texting you.' },
            { role: 'claude', text: 'Love the brief — "smart PM friend texting you" is a great editorial voice to lock in.\n\nFor each issue I\'d suggest this structure:\n1. The insight (1 idea worth thinking about this week)\n2. The framework (a mental model or process, explained simply)\n3. The tool (one thing worth trying, with a real use case)\n\nDoes that match how you already run it? And should I write each section as short sharp takes, or longer explanations?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I run a weekly newsletter called "PM Pulse" for mid-to-senior PMs. Smart tone, not stuffy. Structure: The Insight, The Framework, The Tool. Keep this context for our whole session.' },
            { role: 'claude', text: 'Saved — I\'ll use that voice and structure for everything we produce in this session.\n\nWhen you\'re ready, paste your sources for this week (URLs, article titles, or topics you\'ve been thinking about) and I\'ll draft all three sections.' },
          ],
        },
      },
      {
        title: 'Give Claude your sources',
        description:
          'Paste URLs, article titles, or just topics you\'ve been thinking about. Claude will turn them into newsletter content.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Here are my sources for this week:\n\n1. https://www.lennysnewsletter.com/p/the-arc-of-the-pm\n2. Teresa Torres just posted about continuous discovery — something about switching from output to outcome metrics\n3. I\'ve been experimenting with using Granola for meeting notes this week, it\'s been great\n4. Saw a tweet about "shape-up" methodology making a comeback at a few companies' },
            { role: 'claude', text: 'Drafting PM Pulse — Issue [#]...\n\n**The Insight: The PM\'s Arc**\nMost PMs think their job is to ship features. The best ones know it\'s to move metrics. Lenny\'s piece this week maps what the evolution from output-focused to outcome-focused actually looks like in practice — and why so many smart PMs stay stuck at the feature-shipping stage longer than they should.\n\nWorth 10 minutes if you want a mirror to hold up to yourself.\n[link]\n\n**The Framework: Continuous Discovery (Teresa Torres)**\nTeresa\'s been beating the drum on this for years, but this week\'s post gets specific: the switch from "we shipped X" to "we moved Y" as your north star...' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Sources this week: Lenny\'s arc-of-the-PM piece (lennysnewsletter.com), Teresa Torres on outcome vs output metrics, I tried Granola for meeting notes this week (great), tweet about shape-up methodology comeback.' },
            { role: 'claude', text: 'Drafting PM Pulse...\n\n**The Insight**: Most PMs are measured on output, not outcomes — Lenny\'s piece maps why smart people stay stuck there longer than they should.\n\n**The Framework**: Teresa Torres\' continuous discovery — the specific shift from "we shipped X" to "we moved Y" as your north star.\n\n**The Tool**: Granola for meeting notes — what\'s your use case this week? I\'ll write from your experience.\n\nGive me 30 seconds on Granola and I\'ll finish the draft.' },
          ],
        },
      },
      {
        title: 'Ask Claude to add your voice',
        description:
          'The first draft is accurate but probably a bit flat. Ask Claude to punch it up — add a hot take, sharpen the opener, make it sound more like you.',
        appDemo: {
          steps: [
            { role: 'user', text: 'The draft is good but too safe. Make the insight section punchier. Add a hot take. I\'m not afraid of disagreeing with conventional wisdom.' },
            { role: 'claude', text: 'Here\'s the punched-up version:\n\n**The Insight: Most PMs Are Busy Faking Progress**\nLenny\'s new piece is a polite way of saying something blunt: most PMs are activity-oriented, not outcome-oriented. They\'re filling backlogs, running sprint ceremonies, and writing PRDs that nobody re-reads — while the metrics they supposedly own barely move.\n\nThe arc from "good PM" to "great PM" isn\'t about better frameworks. It\'s about tolerating the discomfort of being measured on outcomes you can\'t fully control.\n\nFewer features. More accountability. Most people won\'t do it.\n[link]\n\nWant me to keep this energy across all three sections?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Too safe. Punch it up. Add a hot take to the insight section. I\'m not afraid of being contrarian.' },
            { role: 'claude', text: 'Punched-up Insight:\n\n**Most PMs Are Busy Faking Progress**\nLenny\'s piece is diplomatic about it, but the truth is blunter: most PMs are filling backlogs and running ceremonies while barely moving the metrics they supposedly own. The arc from "good" to "great" isn\'t a framework problem — it\'s about tolerating accountability for outcomes you can\'t fully control.\n\nFewer features. More ownership. Most people won\'t do it.\n\nShould I keep this energy across the framework and tool sections too?' },
          ],
        },
      },
      {
        title: 'Get it formatted for your platform',
        description:
          'Whether you use Substack, Beehiiv, or plain email — ask Claude to format it correctly.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Format this for Substack. Include a subject line, preview text, and proper section headers.' },
            { role: 'claude', text: 'Substack-ready version:\n\n**Subject line:** Most PMs are busy faking progress\n**Preview text:** The uncomfortable truth about output vs. outcome thinking\n\n---\n\nHey [first_name],\n\nThree things worth your attention this week:\n\n## 📌 The Insight\n**Most PMs Are Busy Faking Progress**\n[full section]\n\n## 🧠 The Framework\n**Continuous Discovery: Switching Your North Star**\n[full section]\n\n## 🛠 The Tool\n**Granola: Meeting Notes That Don\'t Suck**\n[full section]\n\n---\nSee you next week,\n[Your name]\n\n_Forwarded by a friend? Subscribe here._' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Format for Substack — subject line, preview text, [first_name] merge tag, section headers.' },
            { role: 'claude', text: '**Subject**: Most PMs are busy faking progress\n**Preview**: The uncomfortable truth about output vs. outcome thinking\n\n---\n\nHey [first_name],\n\n## 📌 The Insight\n**Most PMs Are Busy Faking Progress**\n[full punched-up section]\n\n## 🧠 The Framework\n**Continuous Discovery: Switch Your North Star**\n[Teresa Torres section]\n\n## 🛠 The Tool\n**Granola**\n[your experience this week]\n\n---\nSee you next week,\n[Your name]\n\n_Forwarded by a friend? [Subscribe here.]_' },
          ],
        },
      },
      {
        title: 'Save your newsletter prompt as a reusable template',
        description:
          'The instructions you just gave Claude are now a reusable recipe. Save them as your permanent "newsletter prompt" so you never start from scratch again.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Summarize the instructions I gave you into a reusable prompt I can paste at the start of every future session.' },
            { role: 'claude', text: 'Here\'s your reusable newsletter prompt:\n\n---\nYou are the editor for "PM Pulse," a weekly newsletter for mid-to-senior product managers at tech companies. Tone: smart but not stuffy — like a sharp PM friend texting you.\n\nStructure each issue as:\n1. The Insight — 1 idea with a hot take, not afraid of being contrarian\n2. The Framework — a mental model, explained simply with practical application\n3. The Tool — one product worth trying, with a real use case from my week\n\nWhen I give you source URLs or topics, draft all three sections. Then ask if I want to punch up the tone. Format for Substack: subject line, preview text, [first_name] merge tag, section headers.\n---\n\nSave this. Paste it at the start of every newsletter session.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Summarize all my instructions as a reusable prompt I can paste at the start of every new session.' },
            { role: 'claude', text: 'Your reusable newsletter prompt:\n\n---\nYou are the editor for "PM Pulse" — weekly newsletter for mid-to-senior PMs. Tone: sharp PM friend texting you.\n\nStructure: The Insight (hot take, contrarian OK) / The Framework (mental model, practical) / The Tool (real use case from my week).\n\nWhen I give sources: draft all three sections, ask if I want it punchier. Format for Substack: subject, preview text, [first_name], section headers with emoji.\n---\n\nSave this anywhere. Paste at the start of every newsletter session.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Create your first reusable skill',
      href: '/tutorials/your-first-skill',
    },
  },

  'weekly-status': {
    title: 'Build a Weekly Status Report Generator',
    slug: 'weekly-status',
    duration: '15 min',
    difficulty: 'intermediate',
    availableRoutes: ['app', 'terminal', 'ide'],
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
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to create a weekly status report generator. My context: I\'m a PM reporting to leadership weekly. Projects: Alpha (auth redesign, Q2 deadline), Beta (mobile app v2, in beta), Gamma (API perf, ongoing). Stakeholders: VP Product wants high-level + risks, Engineering Director wants technical detail, CEO wants one sentence per project.' },
            { role: 'claude', text: 'Got your context. I\'ll tailor the reports to your three stakeholder profiles.\n\nFor each project, I\'ll track:\n• What got done this week\n• What\'s planned next week\n• Any risks or blockers (prominently flagged)\n• Status: On track / At risk / Blocked\n\nTell me what the report format should look like — or I can suggest one. Do you send this as Slack, email, or a doc?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create CLAUDE.md: PM workspace, reporting weekly. Projects: Alpha (auth redesign, Q2), Beta (mobile v2, beta), Gamma (API perf). Stakeholders: VP Product (high-level+risks), Eng Director (technical), CEO (one sentence).' },
            { role: 'claude', text: 'Created `CLAUDE.md` with your project and stakeholder context.\n\nReady to generate reports. When you give me your weekly updates, I\'ll structure them per your stakeholder profiles — one format for the CEO one-pager, one for the VP, one for Eng Director.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Here\'s my report format:\n\nWeekly status sent every Friday.\nStructure: TL;DR (one sentence per project with 🟢/🟡/🔴 status), per-project section (this week / next week / risks), decisions needed at the bottom.\nRules: scannable, concrete numbers, no vague progress descriptions, bad news in Risks not buried.' },
            { role: 'claude', text: 'Format locked in. I\'ll use that template every time you ask for a status report in this conversation.\n\nWant to save this as your permanent "status report prompt" for future sessions? I\'ll write the full reusable instructions for you to copy.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create `.claude/skills/weekly-status.md` — template: TL;DR with 🟢/🟡/🔴, per-project (this week / next week / risk), decisions needed. Rules: scannable, concrete numbers, bad news prominent.' },
            { role: 'claude', text: 'Created `.claude/skills/weekly-status.md`.\n\nThe skill is active for this project. Run it by saying "generate my weekly status" and giving me bullet points of what happened. I\'ll handle the formatting.' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Generate my weekly status. Here\'s what happened:\n- Alpha: finished password reset, started SSO. SSO more complex than expected, might need extra sprint.\n- Beta: 200 beta testers, crash rate 0.3%. Critical Android push notification bug.\n- Gamma: p95 reduced from 800ms to 340ms. Still working on search endpoint.' },
            { role: 'claude', text: '# Weekly Status — March 29\n\n## TL;DR\n🟡 **Alpha** — At risk. SSO scope is larger than estimated, Q2 deadline may slip.\n🟢 **Beta** — On track. 200 testers live, crash rate at 0.3%. One critical bug in triage.\n🟢 **Gamma** — On track. API p95 improved 57%.\n\n## Project Alpha\n**This week**: Password reset flow shipped. SSO integration started.\n**Next week**: Continue SSO implementation.\n**Risk**: SSO complexity is higher than scoped — may require an extra sprint. Decision needed from VP by Wednesday.\n\n## Project Beta\n**This week**: 200 beta users onboarded. Crash rate dropped to 0.3%.\n**Next week**: Fix Android push notification bug (critical). Continue beta expansion.\n**Risk**: Android push bug affects notification reliability — prioritizing this week.\n\n## Project Gamma\n**This week**: API p95 reduced from 800ms → 340ms (57% improvement).\n**Next week**: Search endpoint optimization.\n**Risk**: None.\n\n## Decisions Needed\n- [ ] Extra sprint for Alpha SSO? → VP Product, by Wednesday' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Generate weekly status. Alpha: finished password reset, SSO started but more complex, might need extra sprint. Beta: 200 testers, crash 0.3%, Android push bug critical. Gamma: p95 800ms→340ms, search still in progress.' },
            { role: 'claude', text: 'Using `weekly-status` skill — generated report:\n\n🟡 **Alpha** — At risk (SSO scope)\n🟢 **Beta** — On track (200 testers, 0.3% crash)\n🟢 **Gamma** — On track (p95 57% faster)\n\n**Decision needed**: Extra sprint for SSO → VP Product by Wed\n\nFull report formatted and ready. Want me to output the Slack version or email version too?' },
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
        appDemo: {
          steps: [
            { role: 'user', text: 'Give me the same report but formatted for Slack — short, emoji status indicators, under 500 characters per project.' },
            { role: 'claude', text: '*Weekly Status — Mar 29*\n\n:large_yellow_circle: *Alpha*: SSO started, complexity higher than scoped. Extra sprint decision needed from VP by Wed.\n:large_green_circle: *Beta*: 200 testers live, crash rate 0.3%. Android push bug in triage (critical).\n:large_green_circle: *Gamma*: API p95 down 57% → 340ms. Search endpoint in progress.\n\nDecision needed: Alpha extra sprint? → reply in thread or DM me by Wednesday.\n\nQuestions? Reply here.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Now give me the Slack format.' },
            { role: 'claude', text: 'Slack format:\n\n:large_yellow_circle: *Alpha* — SSO scope larger than estimated, Q2 at risk. Need extra sprint decision by Wed.\n:large_green_circle: *Beta* — 200 testers, 0.3% crash rate. Android push bug (critical) in triage.\n:large_green_circle: *Gamma* — p95 57% faster. Search endpoint next.\n\n_Decision needed: Alpha sprint extension → VP Product by Wed_\n\nQuestions? Reply in thread.' },
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
        <TutorialTracker slug={tutorial.slug} title={tutorial.title} />
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

        {/* Route switcher */}
        <RouteSwitcher availableRoutes={tutorial.availableRoutes ?? ['terminal']} />

        {/* Intro */}
        <div data-tutorial-intro className="mb-12 rounded-xl border border-fd-border bg-fd-card p-6">
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

              {/* Demo — renders appropriate variant based on selected route */}
              {(step.demo ?? step.appDemo ?? step.ideDemo) && (
                <div className="ml-12 mt-4">
                  <TutorialStepDemo demo={step.demo} appDemo={step.appDemo} ideDemo={step.ideDemo} />
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer */}
        <div data-tutorial-complete-sentinel className="mt-20 space-y-8">
          {/* Mark as complete */}
          <TutorialCompleteButton slug={tutorial.slug} title={tutorial.title} />

          {/* Share card */}
          <ShareCard
            tutorialTitle={tutorial.title}
            tutorialSlug={tutorial.slug}
            duration={tutorial.duration}
          />

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
