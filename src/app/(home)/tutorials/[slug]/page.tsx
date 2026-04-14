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
          'Pick any project you\'re working on, a side project, a work repo, anything. We just need to get Claude looking at the right place.',
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
            { role: 'claude', text: 'I can see your project structure. Next.js 16, TypeScript, Tailwind, Prisma for the database layer.\n\nI\'ll generate a CLAUDE.md based on what I can see. Give me a second to read through your key files.' },
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
            { role: 'claude', text: 'Here\'s your CLAUDE.md:\n\n---\n# CLAUDE.md\n\n## Stack\nNext.js (App Router), TypeScript (strict), Tailwind CSS, Prisma\n\n## Testing\nVitest : run with `npm test`\n\n## Conventions\n- Functional components only\n- No `any` types : use `unknown` and narrow\n- Immutable updates with spread operators\n---\n\nSave this as `CLAUDE.md` in your project root.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Generate a CLAUDE.md for this project based on what you can see.' },
            { role: 'claude', text: 'I\'ve read your package.json, tsconfig.json, and a few component files. Here\'s a CLAUDE.md that reflects what\'s actually in your codebase:\n\n---\n# CLAUDE.md\n\n## Stack\nNext.js 16 (App Router), TypeScript strict mode, Tailwind CSS v4, Prisma ORM\n\n## Commands\n`npm run dev` · `npm run build` · `npm test` (vitest)\n\n## What I noticed\n- All components are functional with explicit prop types\n- No barrel files : import directly from source\n- Prisma schema uses soft deletes (`deletedAt` pattern)\n---\n\nShall I write this to `CLAUDE.md`?' },
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
            { role: 'claude', text: 'Here\'s what your CLAUDE.md should contain:\n\n```\n# CLAUDE.md\n\n## Stack\nNext.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma\n\n## Commands\nnpm run dev · npm run build · npm test\n\n## Project Structure\nsrc/app/       : App router pages\nsrc/components : Shared components\n```\n\nCopy this, save it as `CLAUDE.md` in your project root, and then we\'ll add your personal preferences.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'claude', text: 'Done. I\'ve written `CLAUDE.md` to your project root.\n\nI included your actual file structure, the Prisma schema details, and the vitest config I found. You can open it now in the editor and I\'ll help you add your personal preferences next.' },
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
- Don't ask "would you like me to...". Just do it.`,
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
            { role: 'user', text: 'Add this to the CLAUDE.md you just wrote:\n\nBe concise. Give code first, explanation second. Use TypeScript always. When fixing bugs, show root cause before fix. Don\'t ask. Just do it.' },
            { role: 'claude', text: 'Updated CLAUDE.md with your communication preferences:\n\n```\n## How I Work With You\n- Concise : no preamble\n- Code first, explanation after\n- TypeScript only, no JS alternatives\n- Bug fixes: root cause → fix (in that order)\n- No "would you like me to..." : just act\n```\n\nCopy this and append it to your CLAUDE.md. That\'s your CLAUDE.md done.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Add a section to the CLAUDE.md you just created: be concise, code first, TypeScript only, show root cause before fixing bugs, don\'t ask, just do.' },
            { role: 'claude', text: 'Added `## How I Work With You` section to `CLAUDE.md`. The file is saved and already active. I\'ll follow these preferences for the rest of this session.' },
          ],
        },
      },
      {
        title: 'Test it and see the difference',
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
            { type: 'success', text: 'No config changes needed. Tailwind dark mode already enabled.' },
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
            { role: 'claude', text: 'Done. I\'ve updated 3 files:\n• `src/components/theme-toggle.tsx` : new component\n• `src/components/header.tsx` : toggle added to nav bar\n• `src/app/layout.tsx` : wrapped with `ThemeProvider`\n\nYour `tailwind.config.ts` already had `darkMode: "class"` so no changes needed there.' },
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
            { role: 'claude', text: 'Just describe what you want and I\'ll generate the full HTML, CSS, and JS for you.\n\nTell me:\n1. Your name and tagline\n2. What sections you want (about, projects, contact?)\n3. Any style preferences : dark mode, minimal, bold, etc.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create a new portfolio landing page project in this empty folder.' },
            { role: 'claude', text: 'Got it. Starting from scratch. I\'ll create `index.html`, `styles.css`, and `script.js` in this folder.\n\nQuick question: any name or tagline you want in the hero section, or should I use placeholders you can fill in later?' },
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
            { role: 'claude', text: 'Here\'s your complete portfolio. Three files to save:\n\n📄 `index.html` : full page structure\n🎨 `styles.css` : dark theme, card grid, hover effects\n⚡ `script.js` : smooth scroll, form handling\n\nI\'ll share each file below. Copy and save them to the same folder, then open `index.html` in your browser.' },
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
            { type: 'success', text: 'Created script.js (42 lines : form handling + animations)' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'The hero font feels too thin. Make it bolder and increase the tagline font size.' },
            { role: 'claude', text: 'Updated CSS. Here\'s the change to make in your `styles.css`:\n\n```css\n.hero h1 {\n  font-weight: 700;  /* was 400 */\n  font-size: clamp(2.5rem, 6vw, 5rem);  /* was 3rem */\n}\n.hero .tagline {\n  font-size: 1.25rem;  /* was 1rem */\n}\n```\n\nJust find these selectors and swap the values.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'The hero font feels too thin. Make it bolder and increase the tagline size.' },
            { role: 'claude', text: 'Updated `styles.css`. Changed `font-weight` to 700 and increased the tagline to `1.25rem`. Refresh your browser to see the change.' },
          ],
        },
      },
      {
        title: 'Watch Claude create the files',
        description:
          'Claude will create an HTML file, a CSS file, and maybe a small JavaScript file. You\'ll see each file being created in real time. Don\'t worry about understanding the code, you can always ask Claude to explain any part.',
        demo: {
          title: 'Files created',
          steps: [
            { type: 'cmd', text: 'ls -la' },
            { type: 'out', text: 'index.html   : your complete landing page', delay: 300 },
            { type: 'out', text: 'styles.css   : all the visual styling' },
            { type: 'out', text: 'script.js    : smooth scroll + form handling' },
            { type: 'out', text: '' },
            { type: 'success', text: '3 files. That\'s your entire website.' },
            { type: 'warn', text: 'Let\'s see it in the browser.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'claude', text: 'You now have 3 files. To preview: drag `index.html` into Chrome, or double-click it in Finder/File Explorer.\n\nReady to put it on the internet? I\'ll walk you through deploying to Vercel. It\'s free and takes 2 minutes.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'claude', text: 'Files are in your workspace. Want me to start a local dev server so you can preview with hot reload?\n\nRun: `npx serve .`, or I can set up a proper live-reload environment.' },
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
            { role: 'claude', text: 'Two options:\n\n1. **Quickest**: Save all three files to a folder, then drag `index.html` into Chrome/Safari. It opens immediately, no server needed.\n\n2. **Better preview**: Open Terminal, go to that folder, and run `npx serve .`. This starts a local server with proper URL handling.\n\nOnce you can see it, come back and tell me what you\'d like to change.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'claude', text: 'Your files are ready. To preview:\n\n```bash\nnpx serve .\n```\n\nOr I can open it directly, just say the word. Once you see it in the browser, tell me what to tweak. Want me to run the server for you now?' },
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
            { type: 'out', text: 'Vercel CLI : deploying ~/my-site', delay: 500 },
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
            { role: 'claude', text: 'Easiest free option: **Vercel**. It takes about 2 minutes.\n\n1. Go to vercel.com and sign up with GitHub\n2. Click "Add New Project"\n3. Upload your 3 files (index.html, styles.css, script.js)\n4. Click Deploy\n\nYou\'ll get a free `.vercel.app` URL instantly, shareable, HTTPS, fast worldwide.\n\nAlternately, if you have a terminal open, run: `npx vercel` in your project folder and follow the prompts.' },
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
            { role: 'claude', text: 'In the Claude app, skills are just saved prompts, instructions you write once and reuse every session.\n\nFor code review, you\'ll write a prompt that defines:\n1. What to look for (security, performance, readability)\n2. How to format the output (severity ratings, file paths, fixes)\n3. Your team\'s specific rules\n\nReady? Paste the code you want reviewed and I\'ll show you what a structured review looks like. Then we\'ll turn the instructions into a reusable prompt you can save.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I want to create a reusable skill for code reviews. Where do I put it?' },
            { role: 'claude', text: 'In VS Code/Cursor, create a file at `.claude/skills/code-review.md` in your project root. I can create it for you right now, just confirm and I\'ll write the skill definition.' },
          ],
        },
      },
      {
        title: 'Create a code review skill',
        description:
          'Create a markdown file that tells Claude exactly how to review code. This is where the magic happens. You define the rules, the format, the tone, everything.',
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
            { role: 'claude', text: 'Got it. I\'ll follow that format every time you ask for a code review in this conversation.\n\nTo make this permanent across future sessions, save these instructions as your "code review prompt" somewhere (a note, a doc) and paste it at the start of any new conversation when you need a review.\n\nReady to test it? Paste some code and I\'ll run a review using your format.' },
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
            { role: 'claude', text: '**File**: api.js\n**Line**: 1\n**Severity**: CRITICAL\n**Issue**: API key hardcoded in source, will be exposed in version control\n**Fix**: Use `process.env.API_KEY` and add to `.env` file\n\n---\n\n**File**: api.js\n**Lines**: 3–5\n**Severity**: HIGH\n**Issue**: N+1 query. Fetches orders separately for each user, causing one DB call per user\n**Fix**: Use a JOIN or batch query: `SELECT * FROM orders WHERE user_id IN (...user_ids)`\n\n2 issues. 1 critical (security), 1 high (performance). Fix the CRITICAL before pushing.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Review my recent changes.' },
            { role: 'claude', text: 'Running `git diff HEAD~1` to see what changed...\n\n**src/api/auth.ts:15** : CRITICAL\nAPI key `sk-live-abc123` is hardcoded. Move to `process.env.API_KEY` immediately.\n\n**src/db/queries.ts:42** : HIGH\nN+1 query in `getUsersWithOrders()`. Use a JOIN or `whereIn` batch. Current code makes one DB call per user.\n\n2 issues found. Want me to fix both?' },
          ],
        },
      },
      {
        title: 'See the skill activate',
        description:
          'Notice how Claude followed your exact format, with severity ratings, file paths, and specific fixes. That\'s not coincidence. That\'s your skill definition driving the output.',
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
            { role: 'claude', text: 'Without instructions, I optimize for "helpful," which often means verbose, diplomatic, and inconsistent.\n\nWith your format, I\'m constrained to what actually matters to you: severity, location, and a concrete fix. No padding, no hedging.\n\nThe instructions you wrote are essentially a spec for the output. The more specific the spec, the more predictable and useful the result. That\'s the whole point of skills. They make Claude reliable, not just helpful.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'What\'s the difference between asking with and without the skill?' },
            { role: 'claude', text: 'Without the skill, I give you a general opinion. With it, I follow your exact format : severity ratings, file paths, line numbers, specific fixes.\n\nThe skill is a contract: it defines what a "code review" means in your project. I can\'t drift into vague suggestions or skip your team\'s rules. That consistency is what makes it useful at scale.' },
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
- No inline styles, use Tailwind classes only
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
            { role: 'claude', text: 'Added a `## Team Rules` section to `.claude/skills/code-review.md` with all five rules.\n\nNext time you run a review, I\'ll check for all of them. The file is updated and saved. It applies to every Claude Code session in this project.' },
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
          'Start by giving Claude some context about your work. You don\'t need much, just enough so it knows what kind of tickets you create.',
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
            { role: 'claude', text: 'Got it. I\'ll use that context for every ticket I generate in this conversation.\n\nQuick format I\'ll follow:\n• Type: Story / Bug / Task\n• Points: 1, 2, 3, 5, 8\n• Labels: frontend, backend, design, mobile\n• Acceptance criteria: checkboxes\n\nPaste your meeting notes whenever you\'re ready.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create a CLAUDE.md with PM context: SaaS product, web + mobile. Jira project KEY. Story points 1/2/3/5/8. Teams: frontend (React), backend (Node), mobile (React Native). Acceptance criteria as checkboxes.' },
            { role: 'claude', text: 'Created `CLAUDE.md` with your PM workspace context.\n\nI\'ll use this for the rest of the session. Any ticket I generate will follow your format and label structure. Ready for the meeting notes.' },
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
            { role: 'user', text: 'Create `.claude/skills/meeting-to-tickets.md` : a skill that extracts action items from meeting notes, groups them into tickets, estimates story points (1/2/3/5/8), assigns team labels (frontend/backend/mobile/design), writes 3+ acceptance criteria per ticket, and flags vague items.' },
            { role: 'claude', text: 'Created `.claude/skills/meeting-to-tickets.md` with the full process definition.\n\nThe skill includes output formatting, estimation defaults, and the clarification flag rule. Ready to test. Paste your meeting notes.' },
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
            { role: 'user', text: 'Process these meeting notes into tickets:\n\nSprint planning March 29. Sarah mentioned checkout is broken on mobile, users can\'t tap pay. Also add apple pay before Q2. Jake said API is too slow on product listing - 3 seconds, add caching. Marketing wants spring sale banner on homepage by friday. Someone should fix onboarding step 3 dropoff.' },
            { role: 'claude', text: '5 tickets extracted:\n\n### Bug: Fix mobile checkout pay button\n**Type**: Bug | **Points**: 3 | **Labels**: mobile, frontend\n**AC**: - [ ] Tap target meets 44px minimum - [ ] Tested on iOS and Android - [ ] Regression test added\n\n### Story: Add Apple Pay integration\n**Type**: Story | **Points**: 8 | **Labels**: backend, mobile\n**AC**: - [ ] Apple Pay entitlement configured - [ ] Payment flow tested in sandbox - [ ] Fallback to card shown if unsupported\n\n### Task: Add product listing API caching\n**Type**: Task | **Points**: 5 | **Labels**: backend\n**AC**: - [ ] p95 response under 500ms - [ ] Cache invalidation on product update - [ ] Cache hit rate >80% in staging\n\n### Task: Spring sale homepage banner\n**Type**: Task | **Points**: 2 | **Labels**: frontend, design\n⚠️ Deadline: Friday (flag for prioritization)\n\n### Story: Reduce onboarding step 3 drop-off\n**Type**: Story | **Points**: 3 | **Labels**: frontend\n⚠️ Needs clarification: which metric defines success?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Process these meeting notes: checkout broken on mobile, add apple pay before Q2, API too slow (3s) needs caching, spring sale banner by Friday, fix onboarding step 3 dropoff.' },
            { role: 'claude', text: 'Using `meeting-to-tickets` skill. Extracted 5 tickets:\n\n**BUG** Fix mobile checkout button (3pts, mobile+frontend)\n**STORY** Apple Pay integration (8pts, backend+mobile)\n**TASK** Product listing caching (5pts, backend)\n**TASK** Spring sale banner (2pts, frontend) ⚠️ Friday deadline\n**STORY** Onboarding step 3 (3pts, frontend) ⚠️ needs success metric\n\nAll have 3 acceptance criteria. Want me to export as markdown to paste into Jira?' },
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
            { role: 'claude', text: 'For 5 tickets with 3 acceptance criteria each, typically 30–45 minutes:\n\n• Reviewing notes to find all action items: 5 min\n• Deciding how to group them: 5 min\n• Writing each ticket title and description: 10 min\n• Writing acceptance criteria: 15 min\n• Assigning points and labels: 5 min\n\nWith this process: about 30 seconds to paste, 20 seconds to read.\n\nThe real saving isn\'t just time. It\'s that nothing gets lost. Meeting notes are messy. Tickets are complete.' },
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
            { role: 'claude', text: 'Not from claude.ai directly. Jira would need to be connected.\n\nYour options:\n1. **Copy-paste**: The markdown I generate is formatted exactly to paste into Jira\'s issue creator. Takes 2 minutes for 5 tickets.\n2. **Zapier/Make**: Set up an automation that reads a Google Doc and creates Jira tickets, no coding required.\n3. **Claude Code + MCP**: If you\'re comfortable with a terminal, Claude Code with a GitHub or Linear MCP server can create issues automatically. That\'s the next level.\n\nFor now, the copy-paste approach saves you 80% of the work. The setup for direct creation is a separate project.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Can you create these tickets in GitHub Issues directly?' },
            { role: 'claude', text: 'Yes. I have the GitHub MCP connected. Creating 5 issues now...\n\n✓ #142: Fix mobile checkout pay button\n✓ #143: Add Apple Pay integration\n✓ #144: Add product listing caching\n✓ #145: Spring sale homepage banner\n✓ #146: Optimize onboarding step 3\n\nAll created with labels, assignees, and acceptance criteria in the description. Check your repo.' },
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
      'Use Teresa Torres\' Opportunity Solution Tree framework to go from customer interviews to validated experiments, all inside Claude Code.',
    intro:
      'Product discovery shouldn\'t be a mystery. Teresa Torres\' Opportunity Solution Tree (OST) gives you a clear structure: start with an outcome, map customer opportunities, brainstorm solutions, and design assumption tests. The problem? Building and maintaining an OST takes hours of manual synthesis. Claude Code collapses that into minutes. You\'ll paste raw interview notes and walk away with a structured tree and experiment designs. If you\'re new to OSTs, read Teresa\'s original framework at producttalk.org/opportunity-solution-trees.',
    steps: [
      {
        title: 'Set up your discovery workspace',
        description:
          'Create a CLAUDE.md that gives Claude your product context and discovery goals. This is where you define the outcome you\'re chasing, the top of your OST.',
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
- Be specific, no vague opportunity statements
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
            { role: 'claude', text: 'Great framing. You\'ve already done the hardest part by defining a measurable outcome. Let me make sure I\'m using the OST framework correctly:\n\n🎯 **Outcome**: Weekly active usage 3.2 → 4.5 days/week\n\nFor everything we do in this session, I\'ll distinguish:\n- **Opportunities** = customer problems/needs/desires (what they experience)\n- **Solutions** = our ideas (what we might build)\n- **Assumption tests** = small experiments to validate before building\n\nPaste your first interview when ready. I\'ll extract the opportunities.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create a CLAUDE.md for a product discovery workspace. B2B SaaS, 2400 active teams. Outcome: increase weekly active usage 3.2 → 4.5 days/week. Framework: OST (Teresa Torres). 12 interviews done, focus on why teams stop using mid-week.' },
            { role: 'claude', text: 'Created `CLAUDE.md` with your discovery context and OST framework reference.\n\nI\'ll use this throughout the session. All opportunity extraction will be anchored to your stated outcome. Ready for interview notes.' },
          ],
        },
      },
      {
        title: 'Create a discovery skill',
        description:
          'This skill teaches Claude the OST framework, covering how to extract opportunities from interviews, distinguish opportunities from solutions, and structure everything into a tree. This is the engine.',
        code: {
          snippet: `mkdir -p .claude/skills
cat > .claude/skills/discovery-ost.md << 'EOF'
# Product Discovery : OST Skill

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
2. Identify opportunities (needs, pains, desires), never solutions
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
            { role: 'user', text: 'Here\'s the rule I need you to follow strictly: when extracting from interviews, only identify OPPORTUNITIES (customer needs, pains, desires), never solutions. If something looks like a solution, reframe it as the underlying need. For example: "wants a dashboard" → "can\'t see team progress at a glance." Can you do that?' },
            { role: 'claude', text: 'Yes, and that\'s the most important discipline in OST work.\n\nThe rule I\'ll follow:\n✓ "I wish I could see who\'s blocked" → Opportunity: No visibility into teammate status\n✗ "We should build a blocker dashboard" → That\'s a solution. I\'ll reframe or flag it.\n\nEvery time I identify something, I\'ll phrase it from the customer\'s perspective using their language where possible.\n\nPaste your interviews.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create `.claude/skills/discovery-ost.md`. It should enforce: opportunities are customer needs only (not solutions), use customer language, anchor everything to the outcome in CLAUDE.md, output as markdown tree with 🎯/🔍/💡/🧪 icons.' },
            { role: 'claude', text: 'Created `.claude/skills/discovery-ost.md` with the full OST process.\n\nKey constraint baked in: if I detect a solution masquerading as an opportunity, I\'ll flag it and reframe it as the underlying customer need. Ready for the interview data.' },
          ],
        },
      },
      {
        title: 'Feed it raw interview notes',
        description:
          'Here\'s where the magic happens. Paste your messy, unstructured interview notes. Claude extracts opportunities, the customer needs, pains, and desires hidden in the conversation.',
        code: {
          snippet: `claude "Extract opportunities from these interview notes:

Interview: Sarah, PM at a 50-person startup (Mar 25)
---
'We use the tool Monday and Tuesday for sprint planning, but
by Wednesday everyone's back in Slack. The notifications are
overwhelming so people mute them. Then they miss actual updates.
I wish there was a way to see just the things that changed since
I last looked. Also the mobile app is basically useless. I
can't approve anything on my phone so I have to wait until I'm
at my desk. My team in Berlin is 6 hours ahead so by the time
I approve their PRs it's already their end of day.'

Interview: Jake, Eng Lead at a 200-person company (Mar 27)
---
'The weekly view is fine but I need a daily standup view. I
check the tool first thing in the morning but there's no way to
see just what happened overnight. I end up asking people in
Slack anyway. Also the search is terrible. I can never find
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
            { type: 'out', text: '   Source: Sarah, "notifications are overwhelming, people mute them"' },
            { type: 'warn', text: '2. No way to see what changed since last visit' },
            { type: 'out', text: '   Source: Sarah, "wish I could see just the things that changed"' },
            { type: 'warn', text: '3. Can\'t take action from mobile' },
            { type: 'out', text: '   Source: Sarah, "can\'t approve anything on my phone"' },
            { type: 'warn', text: '4. Async teams blocked by timezone gaps' },
            { type: 'warn', text: '5. No overnight activity summary for daily standups' },
            { type: 'warn', text: '6. Past decisions are unfindable' },
            { type: 'out', text: '' },
            { type: 'success', text: 'All framed as customer needs, not solutions.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Extract opportunities from these interview notes:\n\nSarah, PM at 50-person startup: "We use the tool Monday and Tuesday but by Wednesday everyone\'s back in Slack. Notifications are overwhelming so people mute them. I wish I could see just what changed since I last looked. Also the mobile app is useless. I can\'t approve anything on my phone so I wait until I\'m at my desk. My team in Berlin is 6 hours ahead so by the time I approve their PRs it\'s already their end of day."' },
            { role: 'claude', text: 'Extracting from Sarah\'s interview. 4 opportunities found:\n\n🔍 **1. Can\'t distinguish signal from noise in notifications**\n→ Source: "notifications are overwhelming, people mute them"\n→ Impact: Tool is abandoned mid-week\n\n🔍 **2. No visibility into what\'s changed since last visit**\n→ Source: "wish I could see just the things that changed"\n\n🔍 **3. Can\'t take action on mobile**\n→ Source: "can\'t approve anything on my phone"\n→ Note: framed as mobile limitation, not "build a better mobile app" (that\'s a solution)\n\n🔍 **4. Async teams blocked by timezone gaps in approval workflows**\n→ Source: "Berlin team, by the time I approve it\'s their end of day"\n\nAll anchored to your outcome (weekly active usage). Ready to continue with more interviews?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Extract OST opportunities from these 2 interview notes: [Sarah, PM, notifications overwhelming, mutes them, can\'t see what changed, mobile useless for approvals, Berlin timezone blocks] [Jake, Eng Lead, needs daily standup view, no overnight summary, search is terrible, team uses a separate wiki]' },
            { role: 'claude', text: 'Using `discovery-ost` skill. Extracted 6 opportunities:\n\n🔍 Can\'t distinguish signal from noise in notifications (Sarah)\n🔍 No way to see what changed since last visit (Sarah)\n🔍 Can\'t take action from mobile (Sarah)\n🔍 Async teams blocked by timezone gaps (Sarah)\n🔍 No overnight activity summary for daily standups (Jake)\n🔍 Past decisions are unfindable (Jake)\n\nAll framed as customer needs, anchored to weekly active usage outcome. Ready to build the tree?' },
          ],
        },
      },
      {
        title: 'Build the full Opportunity Solution Tree',
        description:
          'Now ask Claude to build the complete tree, connecting your outcome to the opportunities, generating solutions for each, and identifying the riskiest assumptions. This is what takes hours manually.',
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
          'Pick the solutions you\'re most excited about and have Claude design lightweight experiments. Teresa Torres calls these "assumption tests," small, fast experiments that reduce risk before you build anything.',
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
            { type: 'out', text: 'Test: Survey 20 users. "What do you wish you could do on mobile?"' },
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
            { role: 'claude', text: '**Test 1: Smart Notification Digest**\n\n*Riskiest assumption*: Users will actually open a digest instead of ignoring it like marketing email\n\n*Test*: Manually curate a daily digest email for 50 active users for 5 days. Send from your personal email, not a tool domain.\n\n*Success*: >40% open rate AND >15% click back into the tool\n\n*Effort*: 2 hours total (1h setup, 20min/day curation)\n\n---\n\n**Test 2: Mobile Approval Flow**\n\n*Riskiest assumption*: Approval is actually the #1 thing people want to do on mobile, not just the most visible complaint\n\n*Test*: Add one question to your next 20 user interviews: "If you could do one thing from your phone that you currently can\'t, what would it be?" Don\'t prompt with approval.\n\n*Success*: >50% mention approvals or action-taking unprompted\n\n*Effort*: 1 hour (drafting the question, scheduling interviews)\n\nBoth runnable this week, no engineering involved.' },
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
          'An OST isn\'t a one-time exercise. It evolves every week as you learn. Save it to a file and update it after every interview. Claude remembers the context and builds on what\'s there.',
        code: {
          snippet: `# After your next round of interviews:
claude "Update the OST in discovery/ost-2026-03-29.md with these new findings:

Interview: Maria, Designer at a 30-person agency (Apr 1)
---
'I actually love the notifications but they all look the same.
I can't tell if something is urgent or just a comment. Color
coding or priority levels would help. Also, I realized I
only open the app when someone @mentions me, otherwise I
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
            { type: 'out', text: '  Source: Maria, "I only open when someone @mentions me"' },
            { type: 'out', text: '' },
            { type: 'success', text: 'Tree updated: 7 opportunities, 21 solutions.' },
            { type: 'warn', text: 'Your OST grows smarter after every interview.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'New interview: Maria, Designer at a 30-person agency. "I actually love the notifications but they all look the same. I can\'t tell if something is urgent or just a comment. Color coding would help. Also I only open the app when someone @mentions me, otherwise I forget it exists."' },
            { role: 'claude', text: 'Updating the OST with Maria\'s interview:\n\n✅ **Updated**: "Can\'t distinguish signal from noise"\nNew evidence: "all look the same, can\'t tell if urgent"\nNew solution added: Priority-based visual styling (color/icon coding by urgency)\n\n🆕 **New opportunity discovered**: "No trigger to return to the tool without explicit @mentions"\nSource: Maria, "I only open it when someone @mentions me"\nThis is distinct from notification overload. It\'s about lacking a pull mechanism entirely.\n\nTree updated: **7 opportunities, 21 solutions.**\n\nThis is exactly how continuous discovery works. Each interview either strengthens existing opportunities or surfaces new ones.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Update the OST with a new interview: Maria, Designer : notifications all look the same, can\'t distinguish urgent from comment, only opens app on @mentions.' },
            { role: 'claude', text: 'Updated `discovery/ost-2026-03-29.md`:\n\n✅ Strengthened: "Can\'t distinguish signal from noise." Added Maria\'s evidence.\n✅ New solution: Priority-based notification styling\n🆕 New opportunity: "No re-engagement trigger without explicit @mention"\n\nTree: 7 opportunities, 21 solutions. File saved.' },
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
      'Turn a messy list of names and roles into a structured stakeholder map, communication plan, and outreach messages. No spreadsheet required.',
    intro:
      'Every PM, consultant, and white-collar professional builds stakeholder maps manually. You open a doc, start typing names, and two hours later you have a chart nobody reads. Let\'s use Claude to do the thinking. You bring the context, Claude builds the structure.',
    steps: [
      {
        title: 'Open Claude.ai and give it your project context',
        description:
          'Go to claude.ai (or open the Claude desktop app). You\'re going to have a conversation, not run a command. Start by telling Claude what you\'re working on.',
        appDemo: {
          steps: [
            { role: 'user', text: 'I need to build a stakeholder map for a new project. Can you help me?' },
            { role: 'claude', text: 'Absolutely. Stakeholder maps are one of my favourite things to help with. To get started, tell me:\n\n1. What\'s the project or initiative?\n2. Who are the people involved? (names + roles, even rough ones)\n3. What\'s your goal: getting decisions made, building buy-in, planning communications?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I need to build a stakeholder map for a new project launch. Can you help me structure it?' },
            { role: 'claude', text: 'Yes. Let\'s do this properly. Tell me:\n\n1. What\'s the project?\n2. List the stakeholders you know about (rough names and roles are fine)\n3. What outcome do you need from them: approval, buy-in, information, or resources?\n\nOnce I have that, I\'ll map them by influence/interest and give you a communication plan.' },
          ],
        },
      },
      {
        title: 'Paste your stakeholder list (messy is fine)',
        description:
          'Don\'t worry about formatting. Paste emails, org chart screenshots, LinkedIn titles, whatever you have. Claude will make sense of it.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Project: Launching a new employee onboarding tool company-wide.\n\nStakeholders: Sarah Chen (CHRO), Mike Torres (Head of IT), 3 HRBPs (names TBC), Aisha from Finance, CEO needs to approve the budget.' },
            { role: 'claude', text: 'Got it. Here\'s your stakeholder map organized by influence and interest:\n\n🔴 High Influence, High Interest\n• Sarah Chen (CHRO) : Decision maker and champion. Needs regular updates, will present to CEO.\n• CEO : Budget approver. High stakes at approval gates, low day-to-day involvement.\n\n🟡 High Influence, Lower Interest\n• Mike Torres (Head of IT) : Technical gatekeeper for security and integrations. Communicate blockers early.\n• Aisha (Finance) : Controls budget approval. Needs ROI case, not implementation details.\n\n🟢 Lower Influence, High Interest\n• 3 HRBPs : Daily users. High interest in outcomes, low decision power. Keep informed via Sarah.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Project: Company-wide onboarding tool launch. Stakeholders: Sarah Chen (CHRO), Mike Torres (Head of IT), 3 HRBPs (names TBC), Aisha from Finance, CEO for budget approval.' },
            { role: 'claude', text: 'Stakeholder map by influence/interest:\n\n🔴 **High/High** : Sarah Chen (CHRO), CEO\nSarah is your primary champion and gatekeeper. CEO is approval-only; route through Sarah.\n\n🟡 **High/Low** : Mike Torres (IT), Aisha (Finance)\nMike: technical gatekeeper, get him early on integration requirements.\nAisha: budget approver, needs ROI framing not implementation detail.\n\n🟢 **Low/High** : HRBPs (x3)\nDaily users and advocates. Keep them informed, surface their feedback to Sarah.\n\nReady for the communication plan?' },
          ],
        },
      },
      {
        title: 'Ask for a communication plan',
        description:
          'Now turn the map into a practical weekly plan covering what to say, to whom, and through which channel.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Create a communication plan from this. Weekly cadence. What should I say to each person and how often?' },
            { role: 'claude', text: 'Communication Plan : Weekly Cadence\n\nSarah Chen (CHRO)\n→ Channel: 1:1 or async Slack\n→ Frequency: Weekly\n→ Content: Progress vs milestones, risks flagged early, wins to celebrate\n\nCEO\n→ Channel: Email summary via Sarah\n→ Frequency: Monthly or at approval gates only\n→ Content: One paragraph covering budget burn and key milestone status\n\nMike Torres (IT)\n→ Channel: Bi-weekly sync + async Slack\n→ Content: Integration checklist, security requirements, blockers\n\nAisha (Finance)\n→ Channel: Email\n→ Frequency: Before each approval gate\n→ Content: ROI summary + budget request with business case\n\nHRBPs (x3)\n→ Channel: Group Slack channel\n→ Frequency: Bi-weekly\n→ Content: Progress updates, what\'s changing for them, how to give feedback' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Build a weekly communication plan for each stakeholder. Channel, frequency, what to say.' },
            { role: 'claude', text: 'Communication Plan:\n\n**Sarah (CHRO)** : Weekly 1:1 or Slack\nProgress vs milestones, risks flagged early, wins to share upward\n\n**CEO** : Monthly or approval gates only, via Sarah\nOne paragraph: budget burn + milestone status\n\n**Mike Torres (IT)** : Bi-weekly sync\nIntegration checklist, security requirements, blockers\n\n**Aisha (Finance)** : Email before each approval gate\nROI summary + budget ask with business case\n\n**HRBPs (x3)** : Group Slack, bi-weekly\nWhat\'s changing for them, how to give feedback' },
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
            { role: 'claude', text: 'Here\'s a concise, non-pushy message:\n\n---\nHi Aisha,\n\nI\'m leading the onboarding tool initiative for HR. Sarah Chen suggested you as the right finance contact for the Q3 budget request.\n\nI\'d love 20 minutes to walk you through the business case before the approval cycle opens. I have numbers on time-to-productivity improvements and IT support ticket reduction if that helps.\n\nWould Thursday 2pm or Friday morning work?\n\n[Your name]\n---\n\nWant me to adjust the tone, add specific numbers, or make it shorter?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Draft a first outreach email to Aisha in Finance. I need Q3 budget approval. She doesn\'t know me yet.' },
            { role: 'claude', text: 'Draft:\n\n---\nHi Aisha,\n\nI\'m leading the onboarding tool initiative. Sarah Chen pointed me your way for the Q3 budget request.\n\nWould you have 20 minutes before the approval cycle opens? I can walk you through the ROI case. We have data on time-to-productivity and IT support ticket reduction.\n\nThursday 2pm or Friday morning work?\n\n[Your name]\n---\n\nWant a shorter version, or should I add specific ROI numbers?' },
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
            { role: 'claude', text: '# Stakeholder Map : Onboarding Tool Launch\n_Last updated: [date]_\n\n## Stakeholder Matrix\n| Name | Role | Influence | Interest | Primary Owner |\n|---|---|---|---|---|\n| Sarah Chen | CHRO | High | High | You |\n| CEO | Executive | High | Medium | Sarah |\n| Mike Torres | Head of IT | High | Low | You |\n| Aisha | Finance Lead | High | Low | You |\n| HRBPs (x3) | HR Business Partners | Low | High | Sarah |\n\n## Communication Cadence\n[Full weekly plan as above...]\n\n## Key Risks\n1. IT approval bottleneck. Surface integration requirements by Week 2.\n2. CEO approval gate. Ensure Sarah has the one-pager by Week 6.\n\n✓ Ready to paste into Notion.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Format everything as a clean markdown document for Notion.' },
            { role: 'claude', text: '# Stakeholder Map : Onboarding Tool Launch\n\n## Matrix\n| Name | Role | Influence | Interest | Owner |\n|---|---|---|---|---|\n| Sarah Chen | CHRO | High | High | You |\n| CEO | Executive | High | Med | Sarah |\n| Mike Torres | IT | High | Low | You |\n| Aisha | Finance | High | Low | You |\n| HRBPs (x3) | HR BPs | Low | High | Sarah |\n\n## Communication Cadence\n[weekly plan here]\n\n## Risks\n1. IT approval bottleneck. Engage Mike by Week 2.\n2. CEO gate. Sarah needs one-pager by Week 6.\n\n✓ Paste this into Notion.' },
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
      'Feed Claude your sources (URLs, RSS feeds, or topics) and get a fully formatted newsletter draft ready to send.',
    intro:
      'Writing a newsletter is mostly curation: you scan ten tabs, decide what matters, and then spend an hour stitching it into prose. Claude can do the scanning, the summarizing, and the first draft. You do the editing and add your voice at the end.',
    steps: [
      {
        title: 'Tell Claude what your newsletter is about',
        description:
          'Open Claude.ai and describe your newsletter in one message. The more specific, the better the draft.',
        appDemo: {
          steps: [
            { role: 'user', text: 'I run a weekly newsletter for product managers called "PM Pulse." It covers product strategy, interesting frameworks, and one tool worth trying. My audience is mid-to-senior PMs at tech companies. Tone is smart but not stuffy, like a sharp PM friend texting you.' },
            { role: 'claude', text: 'Love the brief. "Smart PM friend texting you" is a great editorial voice to lock in.\n\nFor each issue I\'d suggest this structure:\n1. The insight (1 idea worth thinking about this week)\n2. The framework (a mental model or process, explained simply)\n3. The tool (one thing worth trying, with a real use case)\n\nDoes that match how you already run it? And should I write each section as short sharp takes, or longer explanations?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I run a weekly newsletter called "PM Pulse" for mid-to-senior PMs. Smart tone, not stuffy. Structure: The Insight, The Framework, The Tool. Keep this context for our whole session.' },
            { role: 'claude', text: 'Saved. I\'ll use that voice and structure for everything we produce in this session.\n\nWhen you\'re ready, paste your sources for this week (URLs, article titles, or topics you\'ve been thinking about) and I\'ll draft all three sections.' },
          ],
        },
      },
      {
        title: 'Give Claude your sources',
        description:
          'Paste URLs, article titles, or just topics you\'ve been thinking about. Claude will turn them into newsletter content.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Here are my sources for this week:\n\n1. https://www.lennysnewsletter.com/p/the-arc-of-the-pm\n2. Teresa Torres just posted about continuous discovery, something about switching from output to outcome metrics\n3. I\'ve been experimenting with using Granola for meeting notes this week, it\'s been great\n4. Saw a tweet about "shape-up" methodology making a comeback at a few companies' },
            { role: 'claude', text: 'Drafting PM Pulse, Issue [#]...\n\n**The Insight: The PM\'s Arc**\nMost PMs think their job is to ship features. The best ones know it\'s to move metrics. Lenny\'s piece this week maps what the evolution from output-focused to outcome-focused actually looks like in practice, and why so many smart PMs stay stuck at the feature-shipping stage longer than they should.\n\nWorth 10 minutes if you want a mirror to hold up to yourself.\n[link]\n\n**The Framework: Continuous Discovery (Teresa Torres)**\nTeresa\'s been beating the drum on this for years, but this week\'s post gets specific: the switch from "we shipped X" to "we moved Y" as your north star...' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Sources this week: Lenny\'s arc-of-the-PM piece (lennysnewsletter.com), Teresa Torres on outcome vs output metrics, I tried Granola for meeting notes this week (great), tweet about shape-up methodology comeback.' },
            { role: 'claude', text: 'Drafting PM Pulse...\n\n**The Insight**: Most PMs are measured on output, not outcomes. Lenny\'s piece maps why smart people stay stuck there longer than they should.\n\n**The Framework**: Teresa Torres\' continuous discovery. The specific shift from "we shipped X" to "we moved Y" as your north star.\n\n**The Tool**: Granola for meeting notes. What\'s your use case this week? I\'ll write from your experience.\n\nGive me 30 seconds on Granola and I\'ll finish the draft.' },
          ],
        },
      },
      {
        title: 'Ask Claude to add your voice',
        description:
          'The first draft is accurate but probably a bit flat. Ask Claude to punch it up, add a hot take, sharpen the opener, make it sound more like you.',
        appDemo: {
          steps: [
            { role: 'user', text: 'The draft is good but too safe. Make the insight section punchier. Add a hot take. I\'m not afraid of disagreeing with conventional wisdom.' },
            { role: 'claude', text: 'Here\'s the punched-up version:\n\n**The Insight: Most PMs Are Busy Faking Progress**\nLenny\'s new piece is a polite way of saying something blunt: most PMs are activity-oriented, not outcome-oriented. They\'re filling backlogs, running sprint ceremonies, and writing PRDs that nobody re-reads, while the metrics they supposedly own barely move.\n\nThe arc from "good PM" to "great PM" isn\'t about better frameworks. It\'s about tolerating the discomfort of being measured on outcomes you can\'t fully control.\n\nFewer features. More accountability. Most people won\'t do it.\n[link]\n\nWant me to keep this energy across all three sections?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Too safe. Punch it up. Add a hot take to the insight section. I\'m not afraid of being contrarian.' },
            { role: 'claude', text: 'Punched-up Insight:\n\n**Most PMs Are Busy Faking Progress**\nLenny\'s piece is diplomatic about it, but the truth is blunter: most PMs are filling backlogs and running ceremonies while barely moving the metrics they supposedly own. The arc from "good" to "great" isn\'t a framework problem. It\'s about tolerating accountability for outcomes you can\'t fully control.\n\nFewer features. More ownership. Most people won\'t do it.\n\nShould I keep this energy across the framework and tool sections too?' },
          ],
        },
      },
      {
        title: 'Get it formatted for your platform',
        description:
          'Whether you use Substack, Beehiiv, or plain email, ask Claude to format it correctly.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Format this for Substack. Include a subject line, preview text, and proper section headers.' },
            { role: 'claude', text: 'Substack-ready version:\n\n**Subject line:** Most PMs are busy faking progress\n**Preview text:** The uncomfortable truth about output vs. outcome thinking\n\n---\n\nHey [first_name],\n\nThree things worth your attention this week:\n\n## 📌 The Insight\n**Most PMs Are Busy Faking Progress**\n[full section]\n\n## 🧠 The Framework\n**Continuous Discovery: Switching Your North Star**\n[full section]\n\n## 🛠 The Tool\n**Granola: Meeting Notes That Don\'t Suck**\n[full section]\n\n---\nSee you next week,\n[Your name]\n\n_Forwarded by a friend? Subscribe here._' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Format for Substack. Subject line, preview text, [first_name] merge tag, section headers.' },
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
            { role: 'claude', text: 'Here\'s your reusable newsletter prompt:\n\n---\nYou are the editor for "PM Pulse," a weekly newsletter for mid-to-senior product managers at tech companies. Tone: smart but not stuffy, like a sharp PM friend texting you.\n\nStructure each issue as:\n1. The Insight: 1 idea with a hot take, not afraid of being contrarian\n2. The Framework: a mental model, explained simply with practical application\n3. The Tool: one product worth trying, with a real use case from my week\n\nWhen I give you source URLs or topics, draft all three sections. Then ask if I want to punch up the tone. Format for Substack: subject line, preview text, [first_name] merge tag, section headers.\n---\n\nSave this. Paste it at the start of every newsletter session.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Summarize all my instructions as a reusable prompt I can paste at the start of every new session.' },
            { role: 'claude', text: 'Your reusable newsletter prompt:\n\n---\nYou are the editor for "PM Pulse," a weekly newsletter for mid-to-senior PMs. Tone: sharp PM friend texting you.\n\nStructure: The Insight (hot take, contrarian OK) / The Framework (mental model, practical) / The Tool (real use case from my week).\n\nWhen I give sources: draft all three sections, ask if I want it punchier. Format for Substack: subject, preview text, [first_name], section headers with emoji.\n---\n\nSave this anywhere. Paste at the start of every newsletter session.' },
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
          'First, give Claude the context it needs, including your projects, your team, and what stakeholders care about. This goes in your CLAUDE.md.',
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
            { role: 'claude', text: 'Got your context. I\'ll tailor the reports to your three stakeholder profiles.\n\nFor each project, I\'ll track:\n• What got done this week\n• What\'s planned next week\n• Any risks or blockers (prominently flagged)\n• Status: On track / At risk / Blocked\n\nTell me what the report format should look like, or I can suggest one. Do you send this as Slack, email, or a doc?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create CLAUDE.md: PM workspace, reporting weekly. Projects: Alpha (auth redesign, Q2), Beta (mobile v2, beta), Gamma (API perf). Stakeholders: VP Product (high-level+risks), Eng Director (technical), CEO (one sentence).' },
            { role: 'claude', text: 'Created `CLAUDE.md` with your project and stakeholder context.\n\nReady to generate reports. When you give me your weekly updates, I\'ll structure them per your stakeholder profiles. One format for the CEO one-pager, one for the VP, one for Eng Director.' },
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

# Weekly Status : [Date]

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
- Keep it scannable, leadership reads in 30 seconds
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
            { role: 'user', text: 'Create `.claude/skills/weekly-status.md`. Template: TL;DR with 🟢/🟡/🔴, per-project (this week / next week / risk), decisions needed. Rules: scannable, concrete numbers, bad news prominent.' },
            { role: 'claude', text: 'Created `.claude/skills/weekly-status.md`.\n\nThe skill is active for this project. Run it by saying "generate my weekly status" and giving me bullet points of what happened. I\'ll handle the formatting.' },
          ],
        },
      },
      {
        title: 'Run it and see the report',
        description:
          'Now just tell Claude what happened this week. You can be as messy as you want, bullet points, half-sentences, whatever. The skill handles the formatting.',
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
            { type: 'success', text: '# Weekly Status : March 29, 2026' },
            { type: 'out', text: '' },
            { type: 'out', text: '## TL;DR' },
            { type: 'warn', text: 'Alpha: At risk. SSO complexity may push Q2 deadline.' },
            { type: 'success', text: 'Beta: On track. 200 testers, 0.3% crash rate.' },
            { type: 'success', text: 'Gamma: On track. p95 improved 57%.' },
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
            { role: 'claude', text: '# Weekly Status : March 29\n\n## TL;DR\n🟡 **Alpha** : At risk. SSO scope is larger than estimated, Q2 deadline may slip.\n🟢 **Beta** : On track. 200 testers live, crash rate at 0.3%. One critical bug in triage.\n🟢 **Gamma** : On track. API p95 improved 57%.\n\n## Project Alpha\n**This week**: Password reset flow shipped. SSO integration started.\n**Next week**: Continue SSO implementation.\n**Risk**: SSO complexity is higher than scoped, may require an extra sprint. Decision needed from VP by Wednesday.\n\n## Project Beta\n**This week**: 200 beta users onboarded. Crash rate dropped to 0.3%.\n**Next week**: Fix Android push notification bug (critical). Continue beta expansion.\n**Risk**: Android push bug affects notification reliability. Prioritizing this week.\n\n## Project Gamma\n**This week**: API p95 reduced from 800ms → 340ms (57% improvement).\n**Next week**: Search endpoint optimization.\n**Risk**: None.\n\n## Decisions Needed\n- [ ] Extra sprint for Alpha SSO? → VP Product, by Wednesday' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Generate weekly status. Alpha: finished password reset, SSO started but more complex, might need extra sprint. Beta: 200 testers, crash 0.3%, Android push bug critical. Gamma: p95 800ms→340ms, search still in progress.' },
            { role: 'claude', text: 'Using `weekly-status` skill. Generated report:\n\n🟡 **Alpha**: At risk (SSO scope)\n🟢 **Beta**: On track (200 testers, 0.3% crash)\n🟢 **Gamma**: On track (p95 57% faster)\n\n**Decision needed**: Extra sprint for SSO → VP Product by Wed\n\nFull report formatted and ready. Want me to output the Slack version or email version too?' },
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
            { type: 'success', text: '*Weekly Status : Mar 29*' },
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
            { role: 'user', text: 'Give me the same report but formatted for Slack. Short, emoji status indicators, under 500 characters per project.' },
            { role: 'claude', text: '*Weekly Status : Mar 29*\n\n:large_yellow_circle: *Alpha*: SSO started, complexity higher than scoped. Extra sprint decision needed from VP by Wed.\n:large_green_circle: *Beta*: 200 testers live, crash rate 0.3%. Android push bug in triage (critical).\n:large_green_circle: *Gamma*: API p95 down 57% → 340ms. Search endpoint in progress.\n\nDecision needed: Alpha extra sprint? → reply in thread or DM me by Wednesday.\n\nQuestions? Reply here.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Now give me the Slack format.' },
            { role: 'claude', text: 'Slack format:\n\n:large_yellow_circle: *Alpha* : SSO scope larger than estimated, Q2 at risk. Need extra sprint decision by Wed.\n:large_green_circle: *Beta* : 200 testers, 0.3% crash rate. Android push bug (critical) in triage.\n:large_green_circle: *Gamma* : p95 57% faster. Search endpoint next.\n\n_Decision needed: Alpha sprint extension → VP Product by Wed_\n\nQuestions? Reply in thread.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Build your daily practice with Claude Code',
      href: '/docs/workflows/daily-practice',
    },
  },

  'performance-review': {
    title: 'Write a Performance Review in 20 Minutes',
    slug: 'performance-review',
    duration: '20 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'ide'],
    description:
      'Paste your messy notes about a team member. Walk away with a structured, balanced, specific review ready to submit.',
    intro:
      'Performance reviews are painful because they require translating months of memory into structured written feedback, fairly, specifically, and constructively. Most managers either write something vague ("great collaborator!") or spend two hours agonising over phrasing. Claude handles the structure. You provide the truth.',
    steps: [
      {
        title: 'Give Claude the context',
        description:
          'Start by telling Claude who you\'re reviewing, what level they are, and what dimensions matter. The more specific, the more useful the output.',
        appDemo: {
          steps: [
            { role: 'user', text: 'I need to write an annual performance review for a direct report. Can you help me structure this?' },
            { role: 'claude', text: 'Yes. Let\'s do this properly. To write something fair and useful, tell me:\n\n1. Their role and level (e.g. Senior PM, L5 Engineer)\n2. Review period (6-month, annual)\n3. What dimensions your company uses (impact, execution, collaboration, growth, or your company\'s rubric)\n4. Overall: are they a high performer, meeting expectations, or is this a difficult conversation?\n\nThe more you give me, the less I\'ll need to make up.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Help me write a performance review for my direct report. Senior PM, annual review, company rubric: impact / execution / collaboration / growth.' },
            { role: 'claude', text: 'Got the structure. I\'ll need your raw observations before I draft anything. Paste your notes (bullet points are fine, messy is fine) and I\'ll turn them into a structured review across those four dimensions.' },
          ],
        },
      },
      {
        title: 'Paste your raw observations',
        description:
          'Don\'t filter yourself here. Paste messy notes, bullet points, Slack messages, whatever you have. Claude will synthesise it.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Her name is Priya, Senior PM. Strong: led the onboarding redesign, 40% improvement in activation, shipped on time. Weak: changed requirements late in sprints twice without using change control. Engineering flagged it. She\'s technically strong but needs to grow as a collaborator with engineering.' },
            { role: 'claude', text: 'Good material. Here\'s what I\'m working with:\n\n✅ Strong: High-impact delivery (onboarding, 40% activation), meets deadlines, technical depth\n⚠️ Growth area: Late-stage requirement changes without process, created friction with engineering\n\nOne question before I draft: was the activation improvement attributed directly to her project, and do you have a timeframe for the sprint incidents? Specifics make reviews credible and defensible. I\'ll draft with or without them.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Priya\'s highlights: onboarding redesign shipped Q3, 40% activation improvement. Issues: changed requirements twice mid-sprint without change control, engineering team flagged tension both times. Strong technically, needs to grow cross-functionally.' },
            { role: 'claude', text: 'Understood. I have enough to draft across all four dimensions. The collaboration section will specifically name the change-control incidents. That\'s fair and actionable. Ready to generate the full draft.' },
          ],
        },
      },
      {
        title: 'Generate the structured draft',
        description:
          'Claude writes the full review: overall summary, per-dimension ratings and commentary, and a forward-looking closing.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Draft the full review.' },
            { role: 'claude', text: '**Performance Review : Priya [Last Name]**\nPeriod: Jan–Dec 2025\n\n**Overall**: Strong year on delivery and product impact. Clear development area in cross-functional process discipline.\n\n**Impact : Exceeds**\nPriya\'s signature achievement this year was leading the onboarding redesign end-to-end. A 40% improvement in activation is a meaningful business outcome, not a vanity metric. She identified the problem, drove alignment on the solution, and shipped on time against a Q3 deadline.\n\n**Execution : Meets**\nDelivers on her commitments. The opportunity is proactive communication when timelines or scope shift, before the impact lands on partners.\n\n**Collaboration : Developing**\nTwo incidents during the onboarding project where requirements changed late in the sprint without going through change control left the engineering team feeling blindsided. This created rework and eroded trust. The behaviour likely came from strong user instincts, but process matters. Expectation for next year: scope changes during development go through the agreed channel regardless of urgency.\n\n**Growth : Meets**\nPriya\'s technical depth is an asset. The growth edge is using it to bring partners along, not just to move faster alone.\n\n**Looking ahead**: Priya is ready for increased scope. The work to support it is specific and achievable.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Generate the full review.' },
            { role: 'claude', text: '**Performance Review : Priya [Last Name]** · Annual · Reviewer: [You]\n\n**Overall**: Strong on delivery and impact. Collaboration is the targeted growth area.\n\n**Impact** : Exceeds\nLed onboarding redesign. 40% activation improvement, shipped Q3 on time. High business value.\n\n**Execution** : Meets\nReliable on commitments. Opportunity: proactive comms when scope shifts, before it hits partners.\n\n**Collaboration** : Developing\nTwo mid-sprint requirement changes without change control, both flagged by engineering. Root cause: strong product instincts operating without process discipline. Specific, fixable.\n\n**Growth** : Meets\nTechnical depth is an asset. Growth edge: using it to bring partners along.\n\n**Forward**: Ready for more scope. Development work is clear and bounded.\n\nWant me to expand any section or adjust ratings?' },
          ],
        },
      },
      {
        title: 'Sharpen with specifics',
        description:
          'Generic feedback feels unfair. Ask Claude to strengthen any section with more concrete language tied to real outcomes.',
        appDemo: {
          steps: [
            { role: 'user', text: 'The Impact section is good but make it more narrative. I want leadership to understand why this was hard, not just that the outcome was good.' },
            { role: 'claude', text: 'Updated Impact section:\n\n**Impact: Exceeds**\nThe onboarding redesign was Priya\'s defining achievement this year, and it wasn\'t a straightforward win. The project started with significant scope ambiguity, hit an engineering constraint in week six that threatened the timeline, and had at least one round of stakeholder pressure to reduce scope. Priya navigated all three without escalating to leadership.\n\nThe 40% activation improvement is the headline. But what it reflects is her ability to hold a complex, cross-functional project together under pressure, identifying the problem through user research, driving alignment on a non-obvious solution, and shipping on time. That\'s the kind of independent ownership we expect at the Senior PM level, and she delivered it.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Expand the Impact section. More narrative, explain why this was hard, not just what the outcome was.' },
            { role: 'claude', text: 'Expanded:\n\nThe onboarding redesign wasn\'t a clean project. Scope was ambiguous at kick-off, an engineering constraint threatened the timeline at week six, and stakeholders pushed to reduce scope twice. Priya absorbed all of that without escalating. The 40% activation improvement reflects not just good product instincts but the kind of composure and independent ownership we need at Senior PM. She ran a hard project well.' },
          ],
        },
      },
      {
        title: 'Calibrate the tone',
        description:
          'Ask Claude to adjust the balance. Softer for a fragile conversation, more direct for a high performer who needs honest feedback to grow.',
        appDemo: {
          steps: [
            { role: 'user', text: 'The collaboration section feels too harsh given how strong the rest of the review is. She\'s a high performer overall. I want the tone to reflect that while still being honest about the growth area.' },
            { role: 'claude', text: 'Here\'s a rebalanced version, same feedback, different framing:\n\n**Collaboration: Developing**\nPriya pushes hard on quality, and that\'s a feature, not a bug. The thing to sharpen is how she does it in the context of a sprint in motion. Two instances where requirements changed late without going through change control created rework for engineering and eroded some trust. This isn\'t a broad collaboration problem, it\'s a specific process habit that typically resolves as PMs take on larger, more visible projects where stakeholder trust becomes the resource that\'s hardest to rebuild.\n\nThe expectation for next year: when user insights demand a scope change mid-sprint, bring it through the process. The instinct is right; the timing and channel need to catch up.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Soften the collaboration section slightly. She\'s a strong performer overall, I don\'t want this to overshadow the rest.' },
            { role: 'claude', text: 'Rebalanced:\n\n**Collaboration: Developing**\nPriya\'s instincts are right. She\'s pushing for the best product outcome. The habit to build is running those instincts through the process when it matters: two mid-sprint scope changes without change control created avoidable rework for engineering. This is a specific, bounded thing to fix, not a signal about her broader ability to work cross-functionally. Expectation for next year: when insights demand a change mid-sprint, bring it through the agreed channel.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Build a weekly status report generator',
      href: '/tutorials/weekly-status',
    },
  },

  'decision-memo': {
    title: 'Turn Any Decision into a Clear Memo in 15 Minutes',
    slug: 'decision-memo',
    duration: '15 min',
    difficulty: 'intermediate',
    availableRoutes: ['app', 'ide'],
    description:
      'Brain dump a messy decision. Walk away with a structured memo: problem, options, recommendation, risks, and next steps.',
    intro:
      'Most decisions fail to land not because the thinking was wrong, but because it was never written down clearly. A decision memo forces the logic out of your head and into a form other people can challenge, approve, and act on. Claude handles the structure. You just need to brain dump what you actually know.',
    steps: [
      {
        title: 'Brain dump the decision',
        description:
          'Start messy. Type everything you know : the situation, what you\'re leaning toward, what\'s blocking you. Don\'t structure it yet.',
        appDemo: {
          steps: [
            { role: 'user', text: 'I need to decide whether to rebuild our authentication system from scratch or migrate to Auth0. We\'ve been on a custom system for 4 years. It\'s getting fragile and the team hates maintaining it. Auth0 costs ~$2k/month at our scale. A rebuild would take 3–4 months and we\'d probably make the same mistakes again. But Auth0 feels like giving up control of a core system. We have a board review in 3 weeks and need a decision before then.' },
            { role: 'claude', text: 'Good starting material. I can see the core tension: cost/control vs. maintenance drag + risk.\n\nBefore I structure this into a memo, two quick questions that will shape the recommendation:\n1. What\'s the current cost of maintaining the custom system? (Eng time, incidents, oncall burden)\n2. Are there any compliance or data residency requirements that would constrain Auth0?\n\nIf you don\'t have those numbers, I\'ll flag them as assumptions in the memo, but they\'re the crux of the financial case.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I need a decision memo on auth system: rebuild from scratch vs. migrate to Auth0. Custom system is 4 years old, fragile, team hates it. Auth0 costs ~$2k/month. Rebuild = 3-4 months, same risks. Board review in 3 weeks.' },
            { role: 'claude', text: 'I have enough to structure this. The core tension is control/cost vs. maintenance drag. I\'ll build the memo with: problem statement, three options (rebuild, Auth0, hybrid), tradeoffs, and a recommendation.\n\nDo you want me to include a financial comparison, or keep it qualitative for now?' },
          ],
        },
      },
      {
        title: 'Define the problem statement',
        description:
          'Claude will sharpen your brain dump into a crisp one-paragraph problem statement, the most important part of any memo.',
        appDemo: {
          steps: [
            { role: 'user', text: 'No compliance constraints. Auth0 is fine on that front. Current maintenance cost is hard to quantify but it\'s probably 15–20% of one senior engineer\'s time across incidents and debt work.' },
            { role: 'claude', text: 'Good. Here\'s the sharpened problem statement:\n\n---\n**Problem Statement**\nOur authentication system, built in-house four years ago, has accumulated significant technical debt and now consumes an estimated 15–20% of a senior engineer\'s capacity in maintenance and incident response. As we scale, this drag will increase. We need to decide whether to invest in a rebuild, migrate to a managed solution (Auth0), or find a hybrid path, with a decision before the board review in three weeks.\n\n**Decision owner**: [You]\n**Deadline**: [Date of board review]\n**Stakeholders**: Engineering, Product, Finance\n---\n\nDoes that capture it? I can adjust the framing before we move to options.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Draft the problem statement.' },
            { role: 'claude', text: '**Problem Statement**\nThe in-house auth system (built 2021) carries significant technical debt and absorbs ~15–20% of a senior engineer\'s capacity in maintenance and incidents. This drag increases as we scale. We need a decision between rebuild, managed migration (Auth0), or hybrid, before the board review in three weeks.\n\n**Decision owner**: [You] | **Stakeholders**: Eng, Product, Finance\n\nReady to generate options.' },
          ],
        },
      },
      {
        title: 'Generate options with tradeoffs',
        description:
          'A good decision memo never presents one option. Claude will generate three paths and lay out the honest tradeoffs for each.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Now generate the options section with honest tradeoffs.' },
            { role: 'claude', text: '**Options**\n\n**Option A: Migrate to Auth0**\n→ Cost: ~$2,000/month (~$24k/year)\n→ Timeline: 6–8 weeks migration\n→ Pros: Eliminates maintenance burden immediately, gets MFA, SSO, SOC2 compliance baked in, frees the engineer\n→ Cons: Ongoing cost, vendor dependency, some customisation limits\n→ Risk: Migration bugs; mitigated by phased rollout\n\n**Option B: Full rebuild in-house**\n→ Cost: 3–4 months of 1–2 engineers (~$80–120k in eng time at market rate)\n→ Timeline: Q3 at earliest\n→ Pros: Full control, no vendor cost, built to your spec\n→ Cons: High opportunity cost, same risk of accruing debt again, no guarantee it\'s better\n→ Risk: Scope creep, timeline slip, team builds the same mistakes\n\n**Option C: Incremental hardening (do nothing differently)**\n→ Cost: Current ~15–20% eng time ongoing\n→ Timeline: N/A\n→ Pros: No migration risk, no upfront cost\n→ Cons: Problem compounds; incidents will increase with scale\n→ Risk: Auth incident in production, highest tail risk of the three options' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Generate three options with honest tradeoffs.' },
            { role: 'claude', text: '**Option A: Migrate to Auth0**: $24k/year, 6–8 week migration, eliminates debt immediately. Vendor dependency tradeoff.\n\n**Option B: Full rebuild**: ~$80–120k eng time, 3–4 months, full control. High opportunity cost, same risk of re-accruing debt.\n\n**Option C: Status quo (incremental hardening)**: Current ~15–20% eng cost, no migration risk, but problem compounds at scale. Highest tail risk (auth incident).\n\nReady to write the recommendation?' },
          ],
        },
      },
      {
        title: 'Write the recommendation',
        description:
          'The memo needs a clear recommendation with rationale, not "it depends." Claude will make the call based on the options.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Write the recommendation. I\'m leaning toward Auth0 but I\'m not 100% sure.' },
            { role: 'claude', text: '**Recommendation: Option A : Migrate to Auth0**\n\nAt $24k/year, Auth0 costs approximately 20–30% of what a full rebuild would cost in engineering time alone, and it delivers the outcome immediately rather than in four months. The rebuild\'s core appeal (control) is largely theoretical: we didn\'t build a better system last time, and there\'s no structural reason we would now.\n\nThe maintenance drag will only grow as user volume increases. An auth incident at scale is a company-risk event. Paying $2k/month to remove that risk and free a senior engineer is straightforwardly good economics.\n\nThe migration is not zero-risk. Rollout bugs are the primary concern, but a phased migration (5% → 20% → 100% of traffic over three weeks) manages that exposure well.\n\n**Recommended path**: Approve Auth0 migration. Assign lead engineer. Begin phased rollout within two weeks of approval.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Write the recommendation. Lean toward Auth0.' },
            { role: 'claude', text: '**Recommendation: Migrate to Auth0 (Option A)**\n\nAt $24k/year, Auth0 costs 20–30% of a rebuild in eng time alone, and delivers the outcome now rather than in Q3. The rebuild\'s main appeal (control) is largely theoretical; we didn\'t build a better system last time.\n\nMaintenance drag grows with scale. An auth incident is a company-risk event. $2k/month to eliminate it and free a senior engineer is good economics.\n\n**Path**: Approve migration, assign lead, phased rollout (5→20→100% over 3 weeks) to manage risk.' },
          ],
        },
      },
      {
        title: 'Add risks and get sign-off ready',
        description:
          'Every memo needs a risk register and a clear ask. Claude will finish with the risks, mitigations, and the exact decision you need.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Add a risk register and a sign-off section.' },
            { role: 'claude', text: '**Risks & Mitigations**\n\n| Risk | Likelihood | Impact | Mitigation |\n|---|---|---|---|\n| Migration bugs cause auth failures | Medium | High | Phased rollout; feature flag to revert |\n| Auth0 raises prices significantly | Low | Medium | Annual contract lock-in; review at renewal |\n| Team loses auth system knowledge | Low | Low | Internal docs before migration; not a critical risk |\n| Auth0 outage affects our availability | Low | High | Auth0 SLA is 99.99%; current system has no SLA |\n\n---\n\n**Decision Required**\n\nApprove migration to Auth0 at ~$2,000/month.\n\n**Decision owner**: [Your name]\n**Needed by**: [3 days before board review]\n**If approved**: Engineering begins migration planning immediately\n**If not approved**: Schedule a working session to revisit Option B scoping\n\n---\n\nThis memo is ready to send. Want me to write a one-paragraph executive summary for the top?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Add risks, mitigations, and sign-off section.' },
            { role: 'claude', text: '**Risks**\n• Migration bugs → phased rollout + revert flag (Medium likelihood, mitigated)\n• Auth0 price increase → annual contract (Low, mitigated)\n• Auth0 outage → 99.99% SLA, better than current (Low)\n\n**Decision Required**\nApprove Auth0 migration at ~$2k/month.\nDecision owner: [You] | Needed by: [date]\n\nMemo is complete. Want an exec summary paragraph for the top?' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Build a stakeholder map for your project',
      href: '/tutorials/stakeholder-map',
    },
  },

  'competitive-analysis': {
    title: 'Run a Competitive Analysis in 30 Minutes',
    slug: 'competitive-analysis',
    duration: '30 min',
    difficulty: 'intermediate',
    availableRoutes: ['app', 'ide'],
    description:
      'Feed Claude your product and competitor info. Walk away with a structured comparison matrix and clear positioning gaps.',
    intro:
      'Most competitive analyses are either a 40-tab Notion graveyard nobody updates, or a vibes-based "we\'re different because we focus on the customer." Neither helps you make decisions. A useful competitive analysis is specific, structured, and tells you where you can win, not just who else is in the market. Let\'s build one.',
    steps: [
      {
        title: 'Define what you\'re comparing and why',
        description:
          'The scope of the analysis determines its usefulness. Start by telling Claude your product, the decision you\'re trying to make, and who the relevant competitors are.',
        appDemo: {
          steps: [
            { role: 'user', text: 'I need a competitive analysis. I\'m a PM at a B2B project management tool for agencies. We want to understand whether to build native time tracking or stay focused on project management. Main competitors: Asana, Monday.com, ClickUp, Teamwork (which has time tracking built in).' },
            { role: 'claude', text: 'Good framing. This is a build vs. differentiate question, not just a landscape survey. That makes the analysis much more useful.\n\nTo do this right, I need two things:\n1. A quick description of your product (what you\'re known for, who your typical customer is, your current positioning)\n2. What you know about each competitor\'s time tracking implementation (even rough notes: pricing tier it\'s on, how it\'s positioned, any feedback you\'ve heard)\n\nIf you don\'t have competitor details, I can work from general knowledge and you can correct what\'s wrong.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Competitive analysis for a B2B project management tool for agencies. Decision: build native time tracking or stay focused? Competitors: Asana, Monday.com, ClickUp, Teamwork (has time tracking).' },
            { role: 'claude', text: 'Understood. Paste what you know about your product and each competitor, or I can start from general knowledge and you correct the gaps. What dimensions matter most for this decision: feature depth, pricing, target customer, or positioning?' },
          ],
        },
      },
      {
        title: 'Describe your product and the competitors',
        description:
          'Give Claude the raw material, your positioning, pricing, and anything you know about competitors. Messy is fine.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Our product: project management for creative agencies. Strong on client portals and approval workflows, that\'s our differentiator. Mid-market, $25–50/user/month. No time tracking currently. Asana: general purpose, no native time tracking (integrations only). Monday: has basic time tracking as a column type, not agency-focused. ClickUp: has time tracking, very feature-dense, confusing for non-technical users. Teamwork: specifically for agencies, has full time tracking, strong on invoicing too.' },
            { role: 'claude', text: 'That\'s a clear picture. A few things stand out before I build the matrix:\n\n• Teamwork is your most direct overlap. Same ICP (agencies), has time tracking, has invoicing. That\'s your main competitive threat if you stay put.\n• ClickUp has time tracking but it\'s positioned as an "everything tool." Complexity is your opening.\n• Your moat (client portals + approvals) is not something Teamwork or ClickUp does well.\n\nThis framing will shape the recommendation. Building the matrix now.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Our product: project mgmt for creative agencies. Differentiator: client portals + approval workflows. $25-50/user. No time tracking. Asana: no native time tracking. Monday: basic time tracking column. ClickUp: time tracking, feature-dense, confusing. Teamwork: agency-focused, full time tracking + invoicing.' },
            { role: 'claude', text: 'Key signal: Teamwork is the only direct competitor on both ICP (agencies) and time tracking. ClickUp has the feature but not the positioning. Your moat (client portals) is underserved by all four competitors.\n\nBuilding comparison matrix now across: target customer, time tracking depth, client collaboration, pricing, positioning.' },
          ],
        },
      },
      {
        title: 'Generate the comparison matrix',
        description:
          'Claude builds a structured side-by-side across the dimensions that matter for your decision.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Build the comparison matrix.' },
            { role: 'claude', text: '| Dimension | Your Product | Asana | Monday.com | ClickUp | Teamwork |\n|---|---|---|---|---|---|\n| **Target ICP** | Creative agencies | General B2B | General B2B | SMB/General | Agencies |\n| **Time Tracking** | ❌ None | ❌ Integration only | ⚠️ Basic (column) | ✅ Full, native | ✅ Full + invoicing |\n| **Client Portals** | ✅ Core feature | ❌ | ⚠️ Limited | ❌ | ⚠️ Basic |\n| **Approval Workflows** | ✅ Core feature | ⚠️ Basic | ⚠️ Basic | ⚠️ Basic | ❌ |\n| **Invoicing** | ❌ | ❌ | ❌ | ❌ | ✅ |\n| **Pricing (per user)** | $25–50 | $13–25 | $12–24 | $7–19 | $13–18 |\n| **Complexity** | Medium | Medium | Medium | High | Medium |\n| **Positioning** | Agency-specific | General | Flexible | Everything | Agency-specific |\n\n**Reading this**: You\'re competing directly with Teamwork on ICP but winning on client collaboration. ClickUp has time tracking but is losing on clarity. Monday/Asana are general-purpose, less relevant to your agency customers.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Generate the comparison matrix.' },
            { role: 'claude', text: '| | Your Product | Asana | Monday | ClickUp | Teamwork |\n|---|---|---|---|---|---|\n| ICP | Agencies ✅ | General | General | SMB | Agencies ✅ |\n| Time tracking | None ❌ | Integration | Basic ⚠️ | Full ✅ | Full+invoicing ✅ |\n| Client portals | Core ✅ | None | Limited ⚠️ | None | Basic ⚠️ |\n| Approval flows | Core ✅ | Basic | Basic | Basic | None ❌ |\n| Invoicing | None ❌ | None | None | None | Full ✅ |\n| Price/user | $25–50 | $13–25 | $12–24 | $7–19 | $13–18 |\n\nKey gap: Teamwork wins on time tracking + invoicing, you win on client collaboration. ClickUp has the feature but wrong ICP. Ready to extract positioning gaps.' },
          ],
        },
      },
      {
        title: 'Extract positioning gaps',
        description:
          'The matrix is data. Now ask Claude to tell you what it means, where you can win that nobody else owns.',
        appDemo: {
          steps: [
            { role: 'user', text: 'What are the positioning gaps? Where can we actually win?' },
            { role: 'claude', text: '**Positioning Gaps : Where You Can Win**\n\n**1. The client-facing PM tool for agencies (nobody owns this cleanly)**\nAsana and Monday are internal tools. Teamwork is agency-PM but not client-forward. Your client portal + approval workflow combination is the strongest "client-in-the-room" positioning in the space. Doubling down here is more defensible than adding time tracking.\n\n**2. Simplicity for agency ops (ClickUp\'s weakness)**\nClickUp has time tracking but its complexity alienates exactly the non-technical project managers and account managers who run agency operations. A clean, opinionated tool with built-in time tracking could take ClickUp customers.\n\n**3. Time tracking as the agency workflow gap**\nIf you add time tracking, you\'re one step away from invoicing. At that point you\'re Teamwork with better client collaboration. That\'s a legitimate land-and-expand strategy. The question is whether time tracking is a distraction from your real moat or the next logical extension of it.\n\n**The uncomfortable truth**: Teamwork is the competitor to watch. They have your ICP, they have time tracking, and they\'re adding client features. If you don\'t build time tracking, your differentiator needs to be strong enough that agencies choose you and integrate a separate time tracker.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Extract the positioning gaps. Where can we actually win?' },
            { role: 'claude', text: '**Where you can win:**\n\n1. **Client-forward agency PM** : nobody owns this cleanly. Your portals + approvals are the strongest "client-in-the-room" story in the space. Most defensible position.\n\n2. **Anti-ClickUp for agencies** : ClickUp has the features but the complexity is a liability with non-technical agency ops people. Clean + opinionated wins here.\n\n3. **Time tracking as the logical next step** : build it and you\'re one step from invoicing, which makes you Teamwork with better client collab. That\'s a real land-and-expand play.\n\n**The risk**: Teamwork is your most dangerous competitor. Same ICP, has time tracking, adding client features. Your moat needs to outpace their roadmap.' },
          ],
        },
      },
      {
        title: 'Write the strategic summary',
        description:
          'Turn the analysis into a one-page summary you can share with leadership, with a clear recommendation on the original decision.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Write the strategic summary with a recommendation on whether to build time tracking.' },
            { role: 'claude', text: '**Competitive Analysis Summary : Time Tracking Decision**\n\n**Context**: We evaluated four competitors (Asana, Monday.com, ClickUp, Teamwork) across target customer, feature depth, positioning, and pricing to inform whether to build native time tracking.\n\n**Key findings**:\n• Teamwork is the only direct competitor on both ICP and time tracking. They\'re the threat.\n• ClickUp has time tracking but loses on complexity. Our market to take if we stay clean and opinionated.\n• Our client portal + approval workflow is our strongest differentiator and currently underserved across the market.\n\n**Recommendation: Build time tracking, but phase it.**\n\nPhase 1 (this quarter): Basic time logging tied to tasks. Enough to stop losing deals to Teamwork on this feature.\nPhase 2 (next quarter): Connect time to project budgets. Unique combination with our existing project structure.\nDon\'t build invoicing yet. That\'s Teamwork\'s territory, and competing there takes us away from our positioning.\n\n**What this doesn\'t do**: It doesn\'t make us "feature complete." It makes us the best tool for agencies who need client collaboration and basic time accountability, which is a more defensible position than out-Teamworking Teamwork.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Write the strategic summary with a recommendation on building time tracking.' },
            { role: 'claude', text: '**Competitive Analysis: Time Tracking Decision**\n\n**Recommendation: Build it, phased.**\n\nPhase 1: Basic time logging on tasks, stops losing Teamwork deals on this gap.\nPhase 2: Time-to-budget reporting, unique with our project structure, no competitor does this for client-facing work.\nHold on invoicing. That\'s Teamwork\'s game, not ours.\n\n**Strategic logic**: Our moat is client collaboration. Time tracking extends it without replacing it. Trying to out-Teamwork Teamwork is a worse bet than being the best client-forward PM tool with time accountability baked in.\n\n**Risk**: Teamwork is accelerating on client features. Phase 1 needs to ship this quarter.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Turn meeting notes into structured tickets',
      href: '/tutorials/meeting-to-jira',
    },
  },

  'research-briefing': {
    title: 'Turn 5 Articles into a Research Briefing Doc',
    slug: 'research-briefing',
    duration: '15 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'ide'],
    description:
      'Paste your sources (links, PDFs, copied text) and get a structured briefing doc with key insights, tensions, and implications.',
    intro:
      'Reading five articles and synthesising them into a coherent brief used to take two hours. The scanning, the note-taking, the "what does this mean for us" thinking. Claude can do the synthesis in minutes. You spend your time on the thinking that only you can do.',
    steps: [
      {
        title: 'Define your research question',
        description:
          'Before you paste anything, tell Claude what you\'re trying to answer. A focused research question produces a much sharper brief than "summarise these links."',
        appDemo: {
          steps: [
            { role: 'user', text: 'I need a research briefing on how AI is changing product management roles. I\'m presenting to our leadership team next week to make the case for investing in AI tooling for our PM team.' },
            { role: 'claude', text: 'Good framing. That\'s a specific question with a specific audience and goal. That shapes the brief significantly.\n\nFor a leadership audience making an investment decision, I\'ll structure the output around:\n1. What\'s actually changing (evidence-based, not hype)\n2. What the early adopters are doing and seeing\n3. The risk of not acting\n4. Practical implications / what investment looks like\n\nPaste your sources whenever you\'re ready. Links, copied text, or both.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I\'m building a research brief on AI\'s impact on product management roles. Audience: leadership, making an investment case for PM AI tooling.' },
            { role: 'claude', text: 'Understood. I\'ll structure the brief for a leadership investment decision. Evidence, early adopter signals, risk of inaction, and a practical recommendation. Paste your sources.' },
          ],
        },
      },
      {
        title: 'Paste your sources',
        description:
          'Paste article text, copy URLs for Claude to reference, or describe articles you\'ve read. Don\'t worry about formatting, Claude will extract what matters.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Here are my sources:\n\n1. Lenny\'s Newsletter piece on AI-native PMs : argues that PMs who use AI are 2–3x more productive on research and synthesis tasks, but the "judgment" work (prioritisation, stakeholder management) hasn\'t changed.\n\n2. McKinsey report on generative AI in knowledge work : 40% of knowledge work tasks can be partially automated; synthesis and summarisation are the highest-impact use cases.\n\n3. A16z essay on the "10x PM" : PMs who use AI tools are shipping faster discovery cycles and managing more surface area per person.\n\n4. LinkedIn article by a Head of Product at Intercom : they rolled out AI tooling for PMs, saw 30% reduction in time spent on research and reporting, reinvested into more customer interviews.\n\n5. HBR piece on AI and professional skills : knowledge workers who integrate AI maintain a learning advantage; those who don\'t face skills erosion over 3–5 years.' },
            { role: 'claude', text: 'Good sources. Strong signal across practitioner, consulting, and academic perspectives. Reading now...\n\nOne thing I notice before synthesising: there\'s an interesting tension across your sources. Lenny and A16z are bullish on AI for PMs; the HBR piece introduces a skills-erosion risk that cuts against naive adoption. That tension is actually useful for a leadership audience. It makes the argument more credible than pure advocacy. I\'ll surface it explicitly in the brief.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Sources: (1) Lenny\'s Newsletter : AI PMs 2-3x more productive on synthesis, judgment unchanged. (2) McKinsey : 40% of knowledge tasks automatable, synthesis highest impact. (3) A16z : "10x PM", faster discovery cycles. (4) Intercom Head of Product : 30% time savings on research/reporting, reinvested in customer interviews. (5) HBR : AI adopters gain learning advantage, non-adopters face skills erosion in 3-5 years.' },
            { role: 'claude', text: 'Good set. Practitioner, consulting, and academic perspectives covered. There\'s a useful tension: most sources are bullish on productivity, but HBR introduces a skills-erosion risk that makes the case more nuanced and credible. I\'ll surface that in the brief. Synthesising now.' },
          ],
        },
      },
      {
        title: 'Extract key insights per source',
        description:
          'Claude reads each source and extracts the most relevant findings for your research question, removing noise and keeping signal.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Extract the key insight from each source.' },
            { role: 'claude', text: '**Source-by-Source Insights**\n\n**1. Lenny\'s Newsletter**\n→ Key insight: AI amplifies execution (research, synthesis, writing) but not judgment. PMs who use AI are faster at the "doing," not necessarily better at the "deciding." This is a crucial distinction for setting expectations.\n\n**2. McKinsey Report**\n→ Key insight: 40% automation figure is often cited but the nuance is "partially automated." Synthesis is highest-impact because the cognitive load is high and the output is relatively structured. Quantifiable ROI exists.\n\n**3. A16z Essay**\n→ Key insight: The PM-to-surface-area ratio is changing. AI-enabled PMs are managing broader product scope per person. This has hiring and org design implications, not just productivity ones.\n\n**4. Intercom Head of Product**\n→ Key insight: The real win wasn\'t the time saved. It was where the time went. They reinvested research/reporting savings into more customer contact. Output quality improved because the savings were intentional.\n\n**5. HBR**\n→ Key insight: Skills erosion is real. PMs who outsource cognitive work to AI without staying engaged with the underlying thinking lose craft over time. The risk isn\'t AI replacing PMs; it\'s PMs becoming dependent without staying sharp.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Extract key insight per source.' },
            { role: 'claude', text: '1. **Lenny\'s**: AI amplifies execution, not judgment. Faster doing, not better deciding.\n2. **McKinsey**: Synthesis is highest-impact use case. ROI is quantifiable.\n3. **A16z**: PM-to-surface-area ratio changing. Org design implications, not just productivity.\n4. **Intercom**: The win wasn\'t time saved. It was where the savings went (more customer contact).\n5. **HBR**: Skills erosion risk if cognitive work is outsourced without staying engaged. The risk isn\'t replacement; it\'s dependency.' },
          ],
        },
      },
      {
        title: 'Synthesise across sources',
        description:
          'Individual insights are useful; what\'s more useful is what they mean together. Ask Claude to synthesise and find the consensus, the tensions, and the implications.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Now synthesise across all five sources. What\'s the consensus, what are the tensions, and what does it mean for us?' },
            { role: 'claude', text: '**Synthesis**\n\n**Where sources agree**\n• AI saves meaningful time on research, synthesis, and reporting (2–3x productivity gains are consistent)\n• The savings are real, but only valuable if reinvested intentionally\n• Judgment-intensive work (prioritisation, stakeholder management, strategy) remains human\n\n**Where sources disagree or introduce tension**\n• A16z and McKinsey focus on output gains; HBR raises the long-term skills erosion question. Both can be true simultaneously. Short-term gains, long-term risk if not managed carefully.\n• "Reinvest in customer interviews" (Intercom) and "don\'t outsource your thinking" (HBR) are actually the same idea: AI works best when it frees humans for more human work, not less\n\n**Implications for your team**\n• The case for investment is evidence-backed: 30–40% time savings on lower-value tasks, with quantifiable reallocation potential\n• The risk is not investing and watching AI-enabled competitors run faster discovery cycles while your PMs spend time on reports\n• The right framing for leadership: this isn\'t about replacing judgment with AI. It\'s about protecting your PMs\' time for the work only they can do' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Synthesise. Consensus, tensions, implications.' },
            { role: 'claude', text: '**Consensus**: AI saves 2-3x time on synthesis/research/reporting. Real gains, real if reinvested.\n\n**Tension**: A16z/McKinsey focus on output gains; HBR surfaces skills-erosion risk. Both are true. Short-term wins, long-term risk if managed poorly.\n\n**The insight that ties it together**: AI works best when it frees humans for more human work (Intercom\'s customer interview reinvestment = HBR\'s "don\'t outsource your thinking").\n\n**Implication**: The case for investment is solid. The risk of not acting is watching competitors run faster discovery cycles. The framing: protect PM time for judgment work, not reduce PM headcount.' },
          ],
        },
      },
      {
        title: 'Format as a briefing doc',
        description:
          'Package everything into a clean document ready to share with leadership.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Format this as a briefing doc I can share with leadership. One page, tight.' },
            { role: 'claude', text: '# Research Briefing: AI in Product Management\n_Prepared for: [Leadership team] | Date: [Date]_\n\n## The Question\nHow is AI changing product management, and should we invest in AI tooling for our PM team?\n\n## What the Evidence Shows\nAcross five practitioner and research sources, the signal is consistent: AI tools reduce time spent on research, synthesis, and reporting by 30–40%. The highest-impact use case is synthesis, turning raw inputs into structured outputs.\n\nThe more important finding: the teams seeing the biggest gains aren\'t just saving time. They\'re reinvesting it in higher-value work, specifically more customer contact and more strategic thinking.\n\n## The Tension Worth Naming\nHBR surfaces a real risk: PMs who outsource cognitive work to AI without staying engaged lose craft over time. This argues for thoughtful adoption (AI-assisted synthesis, human-led judgment) rather than wholesale delegation.\n\n## What This Means for Us\n- **The opportunity**: 30–40% time savings on lower-value tasks, reallocated to discovery and customer interviews\n- **The competitive risk**: Teams that adopt now build faster discovery cycles and manage more surface area per PM\n- **The downside risk of not acting**: Skills and speed gap widens over 12–24 months\n\n## Recommendation\nInvest in AI tooling for PMs, with a clear reinvestment mandate: time saved goes to customer contact, not capacity reduction.\n\n_Sources: Lenny\'s Newsletter, McKinsey (GenAI in Knowledge Work), A16z, Intercom (internal study), Harvard Business Review_' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Format as a tight one-page briefing doc for leadership.' },
            { role: 'claude', text: '# AI in Product Management : Research Briefing\n\n**The question**: Should we invest in AI tooling for our PM team?\n\n**What 5 sources say**: 30–40% time savings on research/synthesis/reporting. Judgment work unchanged. Teams reinvesting savings in customer contact see the biggest gains (Intercom). Skills erosion is a real risk if adoption is passive (HBR).\n\n**The synthesis**: AI works best when it frees PMs for more human work, not less. The competitive risk of not acting is a widening discovery-speed gap.\n\n**Recommendation**: Invest. Define a reinvestment mandate: time saved → customer interviews, not headcount reduction.\n\n_Sources: Lenny, McKinsey, A16z, Intercom, HBR_' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Run a competitive analysis in 30 minutes',
      href: '/tutorials/competitive-analysis',
    },
  },

  'slide-deck-outline': {
    title: 'Build a Slide Deck Outline in 15 Minutes',
    slug: 'slide-deck-outline',
    duration: '15 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'ide'],
    description:
      'Tell Claude your goal, audience, and content. Get a narrative arc, a slide-by-slide outline, and speaker notes before you open PowerPoint.',
    intro:
      'The hardest part of any presentation isn\'t the design, it\'s the structure. Most people open PowerPoint or Keynote and start filling slides with bullets, only to realise halfway through that the story doesn\'t land. Claude helps you build the narrative first, so by the time you open your design tool, you know exactly what goes where.',
    steps: [
      {
        title: 'Define your goal, audience, and time slot',
        description:
          'A deck for a 5-minute investor update and a deck for a 45-minute team workshop are completely different animals. Start by being specific.',
        appDemo: {
          steps: [
            { role: 'user', text: 'I need to build a deck for a board update. 20 minutes, 8 board members (mix of operators and investors). Topic: our Q1 results and Q2 priorities. I want them to leave feeling confident about the business and clear on where we\'re investing next quarter.' },
            { role: 'claude', text: 'Good brief. A few things I\'m noting:\n\n• Board audiences want signal, not detail. They\'ll ask questions for the nuance.\n• "Confident about the business + clear on investment direction" = two distinct jobs: Q1 needs to earn credibility, Q2 needs to be crisp and arguable\n• 20 minutes for 8 people means interruptions are likely, so you want a deck that still lands if you get pulled off script at slide 3\n\nBefore I build the narrative arc, tell me: is this a good quarter you\'re reporting, a mixed one, or a difficult one? The narrative structure changes significantly.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Board update deck. 20 minutes, 8 board members (operators + investors). Q1 results + Q2 priorities. Goal: confidence in business, clarity on next quarter investment.' },
            { role: 'claude', text: 'Got it. Two questions before I build the outline: (1) Is this a strong, mixed, or difficult quarter? The narrative arc changes completely. (2) Any politically sensitive topics to handle carefully (e.g. a miss, a leadership change, a strategic pivot)?' },
          ],
        },
      },
      {
        title: 'Brain dump your content',
        description:
          'Don\'t structure yet. Just tell Claude everything you want to cover. The good news, the bad news, the decisions you need, all of it.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Mixed quarter. Revenue hit plan ($2.4M, +18% YoY). But NRR was below target (102% vs 115% target). We lost two mid-market accounts to a competitor. New product launch went well, 60 beta customers, strong NPS. Team is at full strength after a rocky H2 last year. Q2 priorities: double down on enterprise segment, fix the mid-market retention issue, keep the product momentum going. We need board approval for an additional $300k in sales headcount.' },
            { role: 'claude', text: 'That\'s a clear picture. Here\'s what I see in the story:\n\n**The honest narrative**: Strong top-line, one visible miss, proactive response already in motion. That\'s a credible board story, not a great quarter, but a managed one.\n\n**The structural challenge**: You need to address the NRR miss without letting it become the entire conversation. The sequence matters: surface it before they ask, own it, frame the response, and pivot to what Q2 is actually about (enterprise + momentum).\n\n**The ask**: The $300k headcount approval needs to come after you\'ve built confidence, not before. I\'ll sequence it at the end as the logical conclusion of the strategy, not as a standalone budget request.\n\nBuilding the narrative arc now.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Mixed quarter. Revenue: $2.4M +18% YoY (hit plan). NRR: 102% vs 115% target. Lost 2 mid-market accounts to competitor. New product: 60 beta customers, strong NPS. Team: full strength. Q2: enterprise focus, fix mid-market retention, maintain product momentum. Need board approval: +$300k sales headcount.' },
            { role: 'claude', text: 'Key story: strong top-line, one visible miss, response already framed. Classic "managed quarter" narrative.\n\nStructural note: surface the NRR miss proactively before they ask. Own it, frame the cause, pivot to Q2 response. The $300k ask lands best at the end as the logical conclusion of strategy, not as a standalone line item.\n\nBuilding narrative arc.' },
          ],
        },
      },
      {
        title: 'Generate the narrative arc',
        description:
          'Before building slides, Claude structures the story, the emotional journey you want the audience to take from open to close.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Build the narrative arc first, before the slides.' },
            { role: 'claude', text: '**Narrative Arc : Q1 Board Update**\n\n1. **Open with confidence, not caveats** : Lead with the revenue number. Set the tone as "we\'re in control of this business" before introducing nuance.\n\n2. **Surface the miss proactively** : Bring up NRR before anyone asks. Frame it: "Here\'s what we saw, here\'s why, and here\'s what we\'re already doing about it." Owning a miss is more confidence-building than being asked about it.\n\n3. **Show the product momentum as the counterweight** : 60 beta customers + strong NPS is your signal that the investment thesis is still intact. This is the "despite the NRR headwind, we\'re building something" moment.\n\n4. **Q2 strategy flows from the Q1 story** : Enterprise focus + mid-market retention + product momentum aren\'t three separate things. They\'re a coherent response to what Q1 taught you.\n\n5. **Close with the ask as a logical conclusion** : $300k in sales headcount isn\'t a budget request; it\'s the resource needed to execute the Q2 strategy you just outlined. Sequence matters: strategy first, then the investment.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Build the narrative arc.' },
            { role: 'claude', text: '**Arc**: Open strong (revenue) → own the miss proactively (NRR) → pivot to momentum (product beta) → frame Q2 as the coherent response → close with headcount ask as logical conclusion.\n\nThe goal: board leaves thinking "they know their business, they have a plan, the ask makes sense" and not "what happened to NRR?"' },
          ],
        },
      },
      {
        title: 'Build the slide-by-slide outline',
        description:
          'Now Claude turns the narrative arc into a concrete slide structure, with a title, key message, and supporting content for each slide.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Now build the slide-by-slide outline.' },
            { role: 'claude', text: '**Slide Deck Outline : Q1 Board Update**\n\n**Slide 1: Title** : Q1 2026 Business Update | [Date]\n\n**Slide 2: Q1 in One Slide** : Key message: "Solid quarter with one clear learning."\n• Revenue: $2.4M (+18% YoY) ✅\n• NRR: 102% (target 115%) ⚠️\n• Beta customers: 60 | NPS: [score] ✅\n• Team: Fully staffed ✅\n\n**Slide 3: Revenue Deep Dive** : Key message: "Top line is healthy and growing."\n• MoM trend, YoY comparison, new vs. expansion breakdown\n\n**Slide 4: The NRR Story** : Key message: "We know why, and we\'re already fixing it."\n• 2 mid-market churns, competitor named\n• Root cause: [your analysis]\n• Response already underway: [action taken]\n\n**Slide 5: Product Momentum** : Key message: "The new product is working."\n• 60 beta customers, NPS score, 3 customer quotes\n• What we\'re learning, what\'s next\n\n**Slide 6: Q2 Strategy** : Key message: "Three bets, clear logic."\n• Enterprise: [why, how, target]\n• Mid-market retention: [fix plan]\n• Product: [next milestone]\n\n**Slide 7: The Investment Case** : Key message: "To execute Q2, we need one thing."\n• $300k headcount: 2 enterprise AEs\n• Revenue model: payback period at current ACV\n• Ask: approve by [date]\n\n**Slide 8: Q&A / Appendix pointer**' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Build the slide-by-slide outline.' },
            { role: 'claude', text: '8 slides:\n\n1. **Title** : Q1 2026 Board Update\n2. **Q1 snapshot** : Revenue ✅, NRR ⚠️, Product ✅, Team ✅\n3. **Revenue** : Top line healthy, MoM/YoY trend\n4. **NRR story** : Own the miss, name the cause, show the fix\n5. **Product momentum** : 60 beta customers, NPS, 3 customer quotes\n6. **Q2 strategy** : Enterprise / retention / product (coherent response to Q1)\n7. **Investment case** : $300k headcount, payback model, formal ask\n8. **Q&A + appendix pointer**' },
          ],
        },
      },
      {
        title: 'Write speaker notes for the hardest slides',
        description:
          'The NRR slide and the ask slide are where presenters get into trouble. Ask Claude to write the speaker notes for those two.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Write speaker notes for slide 4 (the NRR slide) and slide 7 (the ask). Those are the two I\'m most nervous about.' },
            { role: 'claude', text: '**Slide 4 : Speaker Notes (NRR)**\n\n*What to say*: "NRR came in at 102% against a 115% target. That\'s a miss, and I want to address it directly. We lost two mid-market accounts. In both cases, [competitor name] came in at a lower price point with a good-enough feature set for that segment. We saw the risk; we were too slow to respond.\n\nWhat we\'ve already done: [specific action, e.g., we\'ve repriced our mid-market tier, we\'ve assigned a dedicated CSM]. The accounts we\'ve retained in this segment since [date] are trending at [metric].\n\nThe reason I\'m not more worried: our enterprise accounts are at [NRR %] and the product bets we\'re making are aimed at the customer profile where we win. But mid-market retention is a real problem and Q2 has a specific plan for it."\n\n*What not to say*: Don\'t minimise it ("it\'s just two accounts"). Don\'t over-explain it. Own it and move through it.\n\n---\n\n**Slide 7 : Speaker Notes (The Ask)**\n\n*What to say*: "To execute the enterprise strategy I just walked you through, we need two enterprise AEs. At our current ACV and ramp time, the payback period is [X months], well inside our planning horizon.\n\nI\'m asking the board to approve $300k in headcount. We\'ve identified two candidates we\'d move quickly on. The alternative is a slower Q2 while we stay capacity-constrained in the segment where we\'re winning."\n\n*Tone*: Confident, not apologetic. You\'ve built the case across the previous six slides. This is the logical conclusion, not a surprise.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Write speaker notes for slide 4 (NRR) and slide 7 (the ask).' },
            { role: 'claude', text: '**Slide 4 notes**: Lead with "I want to address this directly." Name the cause, name the action already taken, give a forward-looking metric. Don\'t minimise, don\'t over-explain. Own it and move through it in under 90 seconds.\n\n**Slide 7 notes**: "To execute what I just outlined, we need two enterprise AEs. Payback at current ACV is [X months]. I\'m asking for $300k approval. We have candidates ready to move quickly. The alternative is running Q2 capacity-constrained in the segment where we\'re winning." Confident, not apologetic. The previous six slides built this case.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Turn a decision into a clear memo',
      href: '/tutorials/decision-memo',
    },
  },

  'job-application-assistant': {
    title: 'Build a Job Application Assistant in 20 Minutes',
    slug: 'job-application-assistant',
    duration: '20 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'ide'],
    description:
      'Paste the job description and your background. Get a match analysis, a tailored cover letter, and interview prep, for any role.',
    intro:
      'Most cover letters are generic because tailoring them properly takes an hour per application. Claude can do the matching, gap analysis, and first draft in minutes, so you spend your time on the interviews, not the paperwork. This works for any role, at any level.',
    steps: [
      {
        title: 'Paste the job description',
        description:
          'Copy the full job description : including requirements, responsibilities, and any "about us" section. The more Claude has, the better the match analysis.',
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to apply for a Senior Product Manager role. Can you help me tailor my application?' },
            { role: 'claude', text: 'Yes. Let\'s do this properly rather than just polishing your existing CV.\n\nPaste the full job description first (including the "about the company" section if there is one). I\'ll identify the key signals they\'re looking for before you paste your background, that way I\'m matching rather than just summarising.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Help me apply for a Senior PM role. Starting with the job description.' },
            { role: 'claude', text: 'Paste the full JD : requirements, responsibilities, about the company. I\'ll extract what they\'re actually looking for before we look at your background.' },
          ],
        },
      },
      {
        title: 'Let Claude decode the job description',
        description:
          'Before you share your CV, Claude reads the JD and extracts what the hiring manager actually cares about, the signals hidden between the bullet points.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Senior PM role at a Series B fintech. JD says: 5+ years PM experience, experience with B2B SaaS products, led 0→1 product launches, comfortable with data and SQL basics, strong stakeholder management, experience working with financial services clients a plus. Company is 80 people, recently raised $30M, described as "fast-moving and scrappy."' },
            { role: 'claude', text: 'Here\'s what I\'m reading between the lines:\n\n**What they\'re really asking for**:\n• "Led 0→1 launches" = they need someone who can handle ambiguity and doesn\'t need a playbook. This will be a theme in interviews.\n• "Comfortable with SQL basics" = they want a PM who won\'t be a bottleneck for data questions. You don\'t need to be an analyst, but you need to be self-sufficient.\n• "Stakeholder management" at an 80-person fintech = this likely means managing engineers and founders with strong opinions, not navigating a big corp hierarchy.\n• "Financial services clients a plus" = they\'re worried about domain knowledge. If you have any, lead with it. If you don\'t, address it proactively rather than hoping they don\'t notice.\n\n**The vibe**: "Fast-moving and scrappy" at Series B means they\'re in growth mode but not yet process-heavy. They want someone who ships, not someone who governs.\n\nNow paste your background. I\'ll match against these specific signals.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'JD: Senior PM at Series B fintech, 80 people, $30M raised. Requirements: 5+ years PM, B2B SaaS, led 0→1 launches, SQL basics, stakeholder management, fintech experience a plus. "Fast-moving and scrappy."' },
            { role: 'claude', text: 'Reading between the lines:\n\n• **0→1 launches** = handle ambiguity, no playbook needed\n• **SQL basics** = data self-sufficiency, won\'t block engineers on queries\n• **Stakeholder mgmt at 80 people** = manage opinionated founders/engineers, not corp hierarchy\n• **Fintech a plus** = domain anxiety, address proactively if you don\'t have it\n• **"Scrappy"** = ships over governs\n\nPaste your background. I\'ll match against these signals.' },
          ],
        },
      },
      {
        title: 'Paste your background',
        description:
          'Share your CV, LinkedIn summary, or just a list of your roles and key achievements. Claude will identify what matches strongly and what gaps to address.',
        appDemo: {
          steps: [
            { role: 'user', text: 'My background: 7 years in product. Currently Senior PM at a B2B HR tech company (300 people). Led the launch of a new employee engagement module from scratch, 0 to $2M ARR in 18 months. Comfortable with data, use Mixpanel and Amplitude daily, have done basic SQL for ad hoc queries. No fintech experience specifically, but worked with enterprise HR clients (CHRO-level stakeholders). Previous role was PM at a SaaS startup (40 people).' },
            { role: 'claude', text: '**Match Analysis**\n\n✅ Strong matches:\n• 7 years PM experience (requirement: 5+)\n• 0→1 launch with real metrics ($2M ARR in 18 months), this is your headline story\n• Data comfort (Mixpanel, Amplitude, SQL), directly addresses the data requirement\n• Previous startup experience (40 people), directly relevant to "scrappy" culture\n\n⚠️ Partial matches:\n• Stakeholder management: CHRO-level experience is great but it\'s HR, not fintech. Reframe as "selling complex software internally to senior, non-technical buyers," that\'s transferable.\n\n❌ Gap to address:\n• No fintech experience: this is their only "a plus" that you\'re missing. Address it proactively in the cover letter: frame your enterprise client experience as evidence you can navigate regulated, risk-averse buyers. Don\'t pretend it\'s the same. Show you understand the dynamic.\n\n**Overall**: Strong candidate. The 0→1 story is the anchor. Lead with it.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'My background: 7 years PM. Currently Sr PM at B2B HR tech (300 people). Led new module launch 0→1, $2M ARR in 18 months. Use Mixpanel/Amplitude/basic SQL. No fintech but worked with CHRO-level enterprise clients. Previous: PM at 40-person SaaS startup.' },
            { role: 'claude', text: '**Match**:\n✅ 7 years (req: 5+)\n✅ 0→1 with metrics ($2M ARR 18 months), your headline\n✅ Data comfort (Mixpanel, SQL)\n✅ Small startup experience (scrappy culture fit)\n⚠️ CHRO stakeholders = senior, non-technical buyers, transferable but needs reframing\n❌ No fintech: address proactively, don\'t ignore it\n\n**Lead with the 0→1 story. It\'s your strongest card.**' },
          ],
        },
      },
      {
        title: 'Generate the tailored cover letter',
        description:
          'Claude writes a cover letter that matches your strongest signals to what they\'re specifically looking for, not a generic introduction.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Write the cover letter.' },
            { role: 'claude', text: 'Hi [Hiring Manager],\n\nI\'ve spent seven years building B2B SaaS products, the last four leading product at a 300-person HR tech company. In that time, the work I\'m most proud of is taking an employee engagement module from a blank whiteboard to $2M ARR in 18 months. That journey (figuring out the right thing to build, then building the right team to build it) is exactly the kind of work I want to do at [Company].\n\nA few specific things that make me confident about this role:\n\n**0→1 in a fast-moving environment**: The engagement module didn\'t have a playbook. We ran rapid discovery, killed two feature directions that weren\'t working, and shipped an MVP that 40 enterprise clients adopted in the first quarter. I\'m comfortable with ambiguity and I know what "done" looks like when there\'s no precedent.\n\n**Data-driven without being analyst-dependent**: I run my own Mixpanel and Amplitude analyses daily, write basic SQL for ad hoc questions, and rarely wait for a data pull to inform a prioritisation decision. I know the difference between using data to make a decision and using data to justify one you\'ve already made.\n\n**Enterprise client experience**: I\'ve worked with CHRO-level buyers at large enterprises, risk-averse, compliance-conscious, with long procurement cycles. I haven\'t done this in fintech specifically, but the dynamics translate: building trust with regulated-industry buyers is a skill, and it\'s one I\'ve developed.\n\nI\'d love to talk about how I can bring this to [Company]. I\'m available [dates/times].\n\n[Your name]' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Write the cover letter.' },
            { role: 'claude', text: 'Hi [Hiring Manager],\n\nSeven years in B2B SaaS product, most recently leading a 0→1 module launch from concept to $2M ARR in 18 months. That\'s the kind of work I want to do at [Company].\n\nThree things I bring directly to this role:\n\n**0→1 experience**: No playbook, two killed directions before we found the right one, 40 enterprise clients in the first quarter of launch. I know how to build when there\'s no precedent.\n\n**Data self-sufficiency**: Mixpanel and Amplitude daily, SQL for ad hoc queries. I don\'t wait for data pulls to make decisions.\n\n**Enterprise buyer experience**: CHRO-level stakeholders, risk-averse, compliance-conscious, long cycles. No fintech specifically, but the dynamic translates.\n\nI\'d love to talk. Available [dates].\n\n[Your name]' },
          ],
        },
      },
      {
        title: 'Prep your top 3 interview answers',
        description:
          'Ask Claude to predict the questions you\'ll definitely get asked and help you structure strong answers using your actual experience.',
        appDemo: {
          steps: [
            { role: 'user', text: 'What are the top 3 interview questions I\'ll definitely get asked, and how should I answer them?' },
            { role: 'claude', text: '**Question 1: "Tell me about a 0→1 product you launched."**\nThis is your strongest card. Use it fully. Structure: Situation (blank whiteboard, no playbook) → Discovery (what you learned, what you killed) → Launch (how you shipped) → Outcome ($2M ARR, 40 clients). The key detail to include: what you killed and why. That signals judgment, not just execution.\n\n---\n\n**Question 2: "How do you handle stakeholder pushback when you believe you\'re right?"**\nThis is really asking: "Can you manage founders and engineers with strong opinions?" Answer with a specific story. The best answer acknowledges that you don\'t always know you\'re right, you know how to make the decision rigorous. Talk about how you use data and user evidence to defuse opinion-based arguments without making it personal.\n\n---\n\n**Question 3: "You don\'t have fintech experience : how will you get up to speed quickly?"**\nThey will ask this. Don\'t be defensive. Answer: "I\'ve already started, [specific thing you\'ve done, e.g., read about [regulation], talked to [person]]. More importantly, my experience with regulated-industry enterprise buyers means I understand the dynamics. I know how risk-averse buyers evaluate software, and I know not to assume fintech customers work the same way HR clients do. I\'ll be wrong about specific things early; I won\'t be wrong about the fundamentals."' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Top 3 interview questions I\'ll definitely get, and how to answer them.' },
            { role: 'claude', text: '**Q1: "Walk me through a 0→1 launch."**\nUse the engagement module. Hit: blank slate → what you killed → how you shipped → $2M ARR. Include what you killed. That\'s the judgment signal.\n\n**Q2: "How do you handle pushback from engineers/founders?"**\nThey\'re asking if you can manage opinionated people without a hierarchy to hide behind. Answer: story + data/evidence as the defuser + making it rigorous not personal.\n\n**Q3: "You don\'t have fintech experience."**\nThey will say this. Don\'t be defensive. "I\'ve already started [specific action]. My enterprise client experience means I understand regulated-industry buyers. I\'ll be wrong about specifics early. I won\'t be wrong about the fundamentals."' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Build your first CLAUDE.md for your workflow',
      href: '/tutorials/your-first-claude-md',
    },
  },

  'personal-finance-manager': {
    title: 'Build a Personal Finance Manager in 20 Minutes',
    slug: 'personal-finance-manager',
    duration: '20 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'ide'],
    description:
      'Paste your spending data. Get a breakdown, an honest analysis, a savings plan, and a monthly review template, no spreadsheet required.',
    intro:
      'Most people have a vague sense that they spend too much on certain things and not enough on others. A personal finance review makes that vague sense concrete. Claude can analyse your spending, find the patterns you\'ve been ignoring, and help you build a plan, without judging you and without needing a finance degree.',
    steps: [
      {
        title: 'Set your financial context',
        description:
          'Start by giving Claude the basics (income, fixed costs, what you\'re trying to achieve). This isn\'t for a bank; it\'s so Claude can give you relevant advice rather than generic budgeting platitudes.',
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to get a handle on my personal finances. Can you help me analyse my spending and build a savings plan?' },
            { role: 'claude', text: 'Yes, let\'s make this actually useful rather than generic.\n\nTo give you relevant advice, I need a few basics:\n1. Your approximate monthly take-home income (after tax)\n2. Your fixed monthly costs that don\'t change (rent/mortgage, loan repayments, subscriptions)\n3. What you\'re trying to achieve (emergency fund, saving for something specific, paying down debt, or just "spend less, have more money")\n\nWe\'ll treat this like a real financial review, not a guilt trip. Numbers only, no judgment.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'I want a personal finance review. Analyse my spending, find the leaks, build a savings plan.' },
            { role: 'claude', text: 'Let\'s do this properly. I need:\n1. Monthly take-home income\n2. Fixed costs (rent, loans, standing orders)\n3. What you\'re trying to achieve (emergency fund, specific goal, debt paydown, general control)\n\nThen paste your spending data and I\'ll build the analysis.' },
          ],
        },
      },
      {
        title: 'Share your spending data',
        description:
          'Copy your bank statement, paste a list of transactions, or just estimate by category. Claude will work with whatever level of detail you have.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Take-home: £3,800/month. Fixed costs: rent £1,200, student loan £180, phone £45, gym £45. Goal: save £500/month. I want a house deposit in 3 years.\n\nLast month\'s spending roughly: Groceries £320, Eating out/takeaways £380, Coffee shops £95, Uber/transport £140, Amazon/online shopping £260, Streaming services £48, Nights out £220, Clothing £180, Other/random £150.' },
            { role: 'claude', text: 'Running the numbers...\n\n**Income after fixed costs**: £3,800 - £1,470 (fixed) = **£2,330 available**\n**Actual spending last month**: £1,793\n**Surplus**: £537 (technically you\'re already near your £500 target)\n\nBut here\'s the honest picture:\n\n| Category | Last month | % of available | Flag |\n|---|---|---|---|\n| Groceries | £320 | 14% | Normal |\n| Eating out / takeaways | £380 | 16% | ⚠️ High |\n| Coffee shops | £95 | 4% | Worth examining |\n| Transport | £140 | 6% | Normal |\n| Amazon/online shopping | £260 | 11% | ⚠️ High |\n| Streaming | £48 | 2% | Fine |\n| Nights out | £220 | 9% | Lifestyle choice |\n| Clothing | £180 | 8% | ⚠️ High if recurring |\n| Other/random | £150 | 6% | Worth tracking |\n\n**The uncomfortable truth**: Your food spend (groceries + eating out + coffee) is £795/month, 34% of your available income. That\'s where most of the money is going.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Take-home: £3,800. Fixed costs: rent £1,200, loan £180, phone £45, gym £45. Goal: save £500/month for house deposit in 3 years. Spending: groceries £320, eating out £380, coffee £95, Uber £140, Amazon £260, streaming £48, nights out £220, clothing £180, other £150.' },
            { role: 'claude', text: 'Numbers crunched:\n\nAvailable after fixed costs: £2,330\nTotal variable spending: £1,793\nSurplus: £537 (you\'re close to your target already)\n\n⚠️ High-flag categories:\n• Food total (grocery + eating out + coffee): £795, 34% of available income\n• Amazon/online: £260, often the easiest to reduce\n• Clothing: £180, high if recurring\n\nThe deposit math: £500/month × 36 months = £18,000 in 3 years before interest. Reality check: is that the deposit size you need? Let\'s validate before building the plan.' },
          ],
        },
      },
      {
        title: 'Get the honest analysis',
        description:
          'Claude tells you what\'s actually happening with your money, not what you want to hear, but what the data shows.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Give me the honest analysis. Where am I leaking money?' },
            { role: 'claude', text: '**The Honest Analysis**\n\n**The real problem is food spending, not the obvious suspects**\nYou\'re spending £795/month on food (groceries + eating out + coffee). That\'s almost exactly a third of your available income. Eating out at £380 is particularly high. That\'s essentially a second grocery bill, but for restaurant margins. This isn\'t a moral judgment; it\'s just the biggest number.\n\n**Amazon is a slow leak, not a big purchase**\n£260 on Amazon suggests regular small purchases that feel insignificant individually but compound. This is classic "invisible spend." Worth auditing what you actually bought.\n\n**You\'re already near your savings target, barely**\nYour £537 surplus sounds good, but "other/random £150" almost certainly means your actual deficit months are breaking this. Real-world budgets have surprise costs every 2–3 months (car, travel, birthday gifts, etc.).\n\n**The clothing number needs context**\nIf this is one month that happened to have a clothing purchase, it\'s fine. If this is every month, that\'s £2,160/year, a significant number.\n\n**What this means**: You don\'t need to cut everything. You need to cut one thing meaningfully. Food is the lever.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Give me the honest analysis. Where\'s the money going?' },
            { role: 'claude', text: '**The Honest Picture**\n\n1. **Food is the main leak**: £795/month total (groceries + eating out + coffee) = 34% of available income. Eating out at £380 is a second grocery bill at restaurant margins.\n\n2. **Amazon is invisible spend**: £260 in small purchases that don\'t feel like spending. Classic accumulation pattern.\n\n3. **Your surplus is fragile**: £537 looks good but "other £150" means real-world months with surprises (travel, gifts, repairs) will break this regularly.\n\n4. **You don\'t need to cut everything.** You need to cut food spend by ~£150–200/month. That\'s the difference between fragile and solid.' },
          ],
        },
      },
      {
        title: 'Build the savings plan',
        description:
          'Turn the analysis into a concrete monthly plan with realistic targets, not aspirational ones.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Build me a realistic savings plan. I want to hit £500/month consistently, not just in good months.' },
            { role: 'claude', text: '**Your Savings Plan**\n\n**Target**: £500/month saved, consistently (not just good months)\n\n**The three changes that get you there**:\n\n1. **Eating out + takeaways: £380 → £220** (-£160)\nThis is the single highest-leverage change. You don\'t have to stop eating out, you have to halve it. Two fewer meals out per week. Still leaves room for one or two a week.\n\n2. **Amazon: £260 → £150** (-£110)\nAdd everything to your cart. Wait 48 hours. Buy half of it. This one change has the highest ROI per minute of effort.\n\n3. **Build a £300 buffer**: The "other/random £150" category will spike some months. Keep £300 in a separate current account as a monthly float. Anything unspent at month end goes to the deposit fund.\n\n**The revised numbers**:\n• Available: £2,330\n• Revised spending: £1,793 - £270 (cuts) = £1,523\n• Surplus: £807\n• To savings (after buffer): **£507/month** ✅\n\n**The 3-year maths**: £507 × 36 = **£18,252** + interest. Does that match your deposit target?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Build a realistic savings plan. £500/month consistently, not just good months.' },
            { role: 'claude', text: '**3-Change Plan to £500+/month**\n\n1. **Eating out: £380 → £220** (-£160), halve it, not eliminate it\n2. **Amazon: £260 → £150** (-£110), 48-hour cart rule\n3. **£300 float buffer**, keeps surprise months from wiping the surplus\n\nRevised surplus: £2,330 - £1,523 = **£807**\nAfter buffer: **~£507/month to deposit fund** ✅\n\n3 years: £507 × 36 = **£18,252** before interest.\n\nIs that the deposit size you need?' },
          ],
        },
      },
      {
        title: 'Create your monthly review template',
        description:
          'The plan only works if you check in. Ask Claude to build a 10-minute monthly review template you\'ll actually use.',
        appDemo: {
          steps: [
            { role: 'user', text: 'Build me a monthly review template, something I\'ll actually do in 10 minutes, not a 2-hour spreadsheet session.' },
            { role: 'claude', text: '**Your Monthly Finance Review (10 minutes, first weekend of the month)**\n\n**Step 1: Run the numbers (3 min)**\nOpen your banking app. Write down:\n• Total variable spending last month: £___\n• Eating out + takeaways total: £___\n• Amazon / online total: £___\n• Amount transferred to savings: £___\n\n**Step 2: Compare to plan (2 min)**\n• Was eating out under £220? ✅ / ❌\n• Was Amazon under £150? ✅ / ❌\n• Did I transfer £500+ to savings? ✅ / ❌\n\n**Step 3: One honest sentence (2 min)**\nWrite one sentence about what happened. "Had two work dinners that I didn\'t track" is useful. "I don\'t know where it went" means you need to check the app.\n\n**Step 4: Adjust next month (3 min)**\n• If you hit all three: do nothing different\n• If eating out was over: decide now which week this month you\'re cooking instead\n• If Amazon was over: check your order history, name the stuff you regret\n\n**The rule**: If you miss two months in a row, don\'t adjust the target downward. Investigate what changed.\n\n---\n\nPaste this into a note in your phone. Set a recurring reminder for the first Saturday of every month. That\'s the whole system.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create a monthly review template. 10 minutes, realistic, something I\'ll actually do.' },
            { role: 'claude', text: '**Monthly Review (10 min, first weekend)**\n\n**3 min: Run the numbers**\n• Variable spending: £___\n• Eating out total: £___\n• Amazon total: £___\n• Transferred to savings: £___\n\n**2 min: Check the plan**\n• Eating out < £220? ✅❌\n• Amazon < £150? ✅❌\n• Savings ≥ £500? ✅❌\n\n**2 min: One honest sentence** about what happened\n\n**3 min: One adjustment** for next month (or nothing if all green)\n\n**Rule**: Miss two months in a row → investigate, don\'t lower the target.\n\nSave this to your phone. Set a monthly reminder.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Build your first skill for reusable workflows',
      href: '/tutorials/your-first-skill',
    },
  },
  'computer-use': {
    title: 'Let Claude See Your Screen in 5 Minutes',
    slug: 'computer-use',
    duration: '5 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'terminal', 'ide'],
    description:
      'Claude Code can now see your screen, click buttons, and navigate apps. No setup needed. This is the feature that makes non-coders say "wait, WHAT?"',
    intro:
      'In March 2026, Anthropic shipped Computer Use for Claude Code. It means Claude can literally see what\'s on your screen, move the mouse, click things, type into forms, and navigate apps. You don\'t install anything extra. You just say "look at my screen" and it does. This changes everything for non-technical users because you can point at something and say "fix that."',
    steps: [
      {
        title: 'Make sure Computer Use is enabled',
        description:
          'Computer Use is available on Claude Pro and Max plans. It works in the desktop app, terminal, and IDE extensions. No extra installation needed.',
        demo: {
          title: 'Check your setup',
          steps: [
            { type: 'cmd', text: 'claude' },
            { type: 'success', text: 'Claude Code v4.6 ready' },
            { type: 'cmd', text: '"Can you see my screen right now?"', delay: 400 },
            { type: 'out', text: 'Let me check... Activating computer use...' },
            { type: 'success', text: '✓ I can see your screen. You\'re on the macOS desktop with Chrome and VS Code open.' },
            { type: 'warn', text: '→ That\'s it. No setup, no config. It just works.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Can you see my screen?' },
            { role: 'claude', text: 'Yes! I can see your screen right now. You\'re on your desktop with a browser open showing Gmail and a Notion page in another tab.\n\nI can:\n- Click on things\n- Type into fields\n- Scroll through pages\n- Take screenshots for reference\n\nWhat would you like me to help with?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Can you see my screen? I need help with something visual.' },
            { role: 'claude', text: 'Yes, I can see your screen. You have VS Code open with a React component, and there\'s a browser preview showing what looks like a broken layout - the sidebar is overlapping the main content.\n\nWant me to fix the CSS issue I can see?' },
          ],
        },
      },
      {
        title: 'Ask Claude to do something visual',
        description:
          'The real power: point Claude at something on screen and ask it to interact with it. Fill a form, navigate an app, debug a visual bug.',
        demo: {
          title: 'Claude fills out a form for you',
          steps: [
            { type: 'cmd', text: '"I have a Jira ticket open in my browser. Can you read it and create a summary?"' },
            { type: 'out', text: 'Looking at your screen...' },
            { type: 'out', text: 'I can see JIRA-1234: "User authentication fails on mobile Safari"', delay: 400 },
            { type: 'out', text: 'Reading the description and comments...', delay: 300 },
            { type: 'success', text: '✓ Here\'s the summary:', delay: 500 },
            { type: 'out', text: '  Bug: Safari mobile drops auth cookies after 30min idle' },
            { type: 'out', text: '  Impact: ~2,400 mobile users/day affected' },
            { type: 'out', text: '  Root cause: SameSite=Strict + Safari ITP' },
            { type: 'out', text: '  Fix: Switch to SameSite=Lax with secure flag' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I have a spreadsheet open in Google Sheets. Can you read the data in columns A through D and tell me the top 3 spenders?' },
            { role: 'claude', text: 'Looking at your screen...\n\nI can see a Google Sheet with expense data. Here are the top 3 spenders from columns A-D:\n\n1. **Marketing Dept** - $24,500 (Q1 campaigns)\n2. **Engineering** - $18,200 (cloud infrastructure)\n3. **Sales** - $12,800 (travel + events)\n\nMarketing is 35% of total spend. Want me to create a chart or identify any unusual line items?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Look at the browser preview on the right. The button is cut off on mobile. Can you fix it?' },
            { role: 'claude', text: 'I can see the issue - the "Submit" button is overflowing its container on the mobile viewport. The problem is a fixed width on the button that doesn\'t account for padding.\n\nLet me fix this in your component...\n\n```tsx\n// Before: w-[200px] causes overflow\n// After: w-full sm:w-auto\n<button className="w-full sm:w-auto px-6 py-3">\n```\n\nThe button will now be full-width on mobile and auto-sized on desktop. Check your preview - it should update.' },
          ],
        },
      },
      {
        title: 'Navigate between apps',
        description:
          'Claude can switch between apps, open new tabs, and work across multiple windows. Great for workflows that span several tools.',
        demo: {
          title: 'Cross-app workflow',
          steps: [
            { type: 'cmd', text: '"Open Chrome, go to our Figma file, screenshot the new design, then come back here and implement it"' },
            { type: 'out', text: 'Opening Chrome...' },
            { type: 'out', text: 'Navigating to figma.com/file/abc123...', delay: 500 },
            { type: 'out', text: 'Taking screenshot of the header component...', delay: 400 },
            { type: 'success', text: '✓ Got the design reference', delay: 300 },
            { type: 'out', text: 'Switching back to the terminal...' },
            { type: 'out', text: 'Implementing the header based on the Figma design...' },
            { type: 'success', text: '✓ Created src/components/Header.tsx matching the design' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I need you to check my calendar for tomorrow, then draft an email declining the 2pm meeting because it conflicts with my 1:1.' },
            { role: 'claude', text: 'Looking at your screen... I can see Google Calendar is open.\n\nTomorrow\'s schedule:\n- 10am: Sprint Planning\n- 1pm: 1:1 with Sarah (recurring)\n- 2pm: "Q2 Budget Review" (new invite)\n- 4pm: Design Review\n\nYou\'re right, the 2pm conflicts with your 1:1 wrap-up time. Here\'s a draft decline:\n\n---\n**To:** finance-team@company.com\n**Subject:** Re: Q2 Budget Review\n\nHi team, I have a scheduling conflict at 2pm tomorrow. Could we find a slot on Thursday instead? Happy to review the doc async in the meantime.\n\n---\n\nWant me to click "Decline" on the calendar event and paste this into Gmail?' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Compare the Figma design in my browser with what\'s rendering in the preview. What\'s different?' },
            { role: 'claude', text: 'I can see both - the Figma design on the left and your browser preview on the right.\n\n**Differences I spotted:**\n1. **Font size**: Figma shows 18px for body text, your preview is 16px\n2. **Spacing**: The card gap is 24px in Figma but 16px in your code\n3. **Border radius**: Figma cards have 12px radius, yours have 8px\n4. **Color**: The CTA button is `#2563EB` in Figma but you\'re using `#3B82F6` (lighter shade)\n\nWant me to fix all four? I can update the Tailwind classes right now.' },
          ],
        },
      },
      {
        title: 'Use it for everyday tasks',
        description:
          'Computer Use shines for tasks that used to require you to describe what you\'re seeing. Now you just say "look at this" and Claude gets it instantly.',
        demo: {
          title: 'Real-world examples',
          steps: [
            { type: 'out', text: '── Things people actually do with Computer Use ──' },
            { type: 'success', text: '"Read this error message on screen and fix it"' },
            { type: 'success', text: '"Fill out this form with my saved info"', delay: 300 },
            { type: 'success', text: '"Compare these two browser tabs side by side"', delay: 300 },
            { type: 'success', text: '"Take a screenshot of this bug and file an issue"', delay: 300 },
            { type: 'success', text: '"Read the chart in this dashboard and summarize trends"', delay: 300 },
            { type: 'success', text: '"Navigate to Settings > Privacy and turn off tracking"', delay: 300 },
            { type: 'warn', text: '→ If you can see it on screen, Claude can see it too.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'What are some cool things I can do with computer use?' },
            { role: 'claude', text: 'Here are the things people love most:\n\n**Visual debugging**\n"Look at my app and tell me what\'s wrong" - Claude sees the broken layout, reads the error, and fixes the code.\n\n**Form filling**\n"Fill out this expense report with last week\'s receipts" - Claude reads your data and fills fields for you.\n\n**Cross-app workflows**\n"Read this Slack message, create a Jira ticket, and link it to the sprint" - Claude navigates between apps.\n\n**Design-to-code**\n"Match my code to this Figma design" - Claude compares pixels and fixes differences.\n\n**Dashboard analysis**\n"Read these charts and tell me what\'s trending" - Claude reads graphs, tables, and dashboards.\n\nThe best part: you don\'t explain what you see anymore. You just say "look at my screen" and Claude gets the full picture.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'What\'s the most useful thing I can do with computer use in my IDE?' },
            { role: 'claude', text: 'The killer feature: **visual debugging**.\n\nInstead of describing a bug in words, just say "look at the preview" and I can:\n\n1. **See the broken layout** and identify the exact CSS property causing it\n2. **Compare with the design** if you have Figma open alongside\n3. **Read error overlays** from React/Next.js and trace them to your code\n4. **Check responsive views** by looking at different viewport sizes\n5. **Spot accessibility issues** visible in the rendered page\n\nThe workflow: open your preview, point at the problem, I fix the code. No more "the button is kind of overlapping the thing on the left side when the screen is small" explanations.\n\nJust: "Look at this. Fix it."' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Build your first custom skill',
      href: '/tutorials/your-first-skill',
    },
  },

  'coming-from-chatgpt': {
    title: "Coming from ChatGPT? Here's What's Different",
    slug: 'coming-from-chatgpt',
    duration: '10 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'terminal'],
    description:
      'Claude feels different from ChatGPT. Here is why that happens, and how to set it up so it works the way you expect.',
    intro:
      "ChatGPT is great. This is not a competition. But if you have tried Claude and walked away thinking \"it doesn't remember me\" or \"my preferences never stick\", you are not imagining things. Claude works differently by design, and once you understand why, the fix takes about five minutes. Let's walk through it together.",
    steps: [
      {
        title: 'The biggest difference: where Claude lives',
        description:
          "ChatGPT lives in your browser. It keeps a list of your past conversations and can build on them across sessions. Claude Code lives on your machine. It runs in your terminal (or the Claude.ai web app), but it does not have a built-in memory system that follows you around. Every new session starts fresh. This is not a bug. It is actually what makes Claude powerful for real work: it operates directly on your files, your folders, and your code. But it does mean you need to tell it who you are. The good news: you only do this once.",
        demo: {
          title: 'What a fresh Claude session looks like',
          steps: [
            { type: 'cmd', text: 'claude' },
            { type: 'success', text: 'Claude Code ready', delay: 300 },
            { type: 'out', text: 'Working directory: ~/my-project' },
            { type: 'out', text: 'No CLAUDE.md found' },
            { type: 'warn', text: 'Claude does not know you yet. Let us fix that.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I just switched from ChatGPT. Why does Claude feel like it starts from scratch every time?' },
            { role: 'claude', text: "That is a really common first impression, and it is accurate. Claude does not have a built-in memory that follows you from one conversation to the next.\n\nThe fix is a file called CLAUDE.md. You write it once, and Claude reads it at the start of every session. It is like leaving yourself a briefing doc that Claude picks up automatically.\n\nWant me to help you build one? It takes about five minutes." },
          ],
        },
      },
      {
        title: 'Making Claude remember you: meet CLAUDE.md',
        description:
          "The answer to \"why does Claude keep forgetting me?\" is a file called CLAUDE.md. Place it in your project folder (or your home directory for global preferences), and Claude reads it automatically at the start of every session. No plugin, no setting, no subscription upgrade. Just a text file. Here is how to create one right now.",
        code: {
          snippet: `# Create a CLAUDE.md in your home directory
# This applies to every Claude session on your machine

cat > ~/CLAUDE.md << 'EOF'
# About Me
I am a product manager at a SaaS company.
I prefer concise answers. No preamble.
Always use British English spelling.

# My Work Context
I mostly work on roadmaps, user research, and Jira tickets.
When I ask for writing help, match the tone of what I paste.

# Preferences
- Bullet points over long paragraphs
- Give the answer first, reasoning after
- Never use filler phrases like "Certainly!" or "Great question!"
EOF`,
          language: 'bash',
        },
        demo: {
          title: 'Creating your first CLAUDE.md',
          steps: [
            { type: 'cmd', text: 'nano ~/CLAUDE.md' },
            { type: 'out', text: 'Opening editor...', delay: 400 },
            { type: 'out', text: '  # About Me' },
            { type: 'out', text: '  I am a product manager. I prefer concise answers.' },
            { type: 'out', text: '  Always use British English spelling.' },
            { type: 'out', text: '' },
            { type: 'out', text: '  # Preferences' },
            { type: 'out', text: '  - Bullet points over paragraphs' },
            { type: 'out', text: '  - Answer first, reasoning after' },
            { type: 'success', text: 'Saved ~/CLAUDE.md' },
            { type: 'warn', text: 'Every future session will start with this context.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: "Yes, help me build a CLAUDE.md. I'm a product manager. I want concise answers, British English spelling, bullet points over paragraphs, and no filler phrases like 'Certainly!'." },
            { role: 'claude', text: "Here is your CLAUDE.md. Save this as a file called `CLAUDE.md` in your home directory (or project folder):\n\n```\n# About Me\nI am a product manager.\nI prefer concise, direct answers with no preamble.\nAlways use British English spelling.\n\n# Communication Style\n- Bullet points over long paragraphs\n- Give the answer first, reasoning after\n- No filler phrases: skip 'Certainly!', 'Great question!', 'Of course!'\n```\n\nOnce this file exists, Claude reads it at the start of every new session. Your preferences stick automatically." },
          ],
        },
      },
      {
        title: 'Your preferences stick now',
        description:
          "Once your CLAUDE.md exists, try starting a fresh session. Claude will read it before you type your first message. You do not need to say \"remember, I prefer concise answers\" ever again. Test it now by asking Claude to write something and see whether it matches the style you specified.",
        code: {
          snippet: `# Start a new Claude session and test it
claude "write a three-bullet summary of what a product roadmap is"`,
          language: 'bash',
        },
        demo: {
          title: 'Claude knows your preferences from the start',
          steps: [
            { type: 'cmd', text: 'claude "write a three-bullet summary of what a product roadmap is"' },
            { type: 'out', text: 'Reading ~/CLAUDE.md...', delay: 500 },
            { type: 'out', text: 'Context: PM, concise, British English, bullets first' },
            { type: 'out', text: '' },
            { type: 'out', text: 'A product roadmap is:' },
            { type: 'out', text: '- A prioritised plan of what to build and when' },
            { type: 'out', text: '- A communication tool for aligning stakeholders on direction' },
            { type: 'out', text: '- A living document, not a promise' },
            { type: 'success', text: 'British English. Bullets first. No preamble. Done.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Write a three-bullet summary of what a product roadmap is.' },
            { role: 'claude', text: "A product roadmap is:\n- A prioritised plan of what to build and when, tied to strategic goals\n- A communication tool for aligning stakeholders on direction without over-committing to dates\n- A living document that should be updated as priorities shift, not a fixed delivery schedule" },
          ],
        },
      },
      {
        title: 'Projects that persist: using project-level CLAUDE.md files',
        description:
          "Your home directory CLAUDE.md covers your global preferences. But for specific projects, you can add a second CLAUDE.md right inside the project folder. Claude merges both: global preferences from your home directory, project context from your project folder. This is how you get ChatGPT-style continuity, without needing a cloud service to store your context.",
        code: {
          snippet: `# Inside your project folder, create a project-specific CLAUDE.md

cd ~/my-product-work
cat > CLAUDE.md << 'EOF'
# Project: Roadmap Q3 Planning
This is a quarterly roadmap planning workspace.

## Key Files
- roadmap-draft.md : current working draft
- user-research-notes.md : interview summaries from April
- competitor-analysis.csv : last updated March 2025

## Context
We are deciding between three strategic bets for Q3.
The decision needs to go to leadership by Friday.

## Decisions Already Made
- Mobile-first is the priority
- We are not building native apps this cycle
EOF`,
          language: 'bash',
        },
        demo: {
          title: 'Project context loaded automatically',
          steps: [
            { type: 'cmd', text: 'cd ~/my-product-work && claude' },
            { type: 'out', text: 'Reading ~/CLAUDE.md (global)...', delay: 400 },
            { type: 'out', text: 'Reading ./CLAUDE.md (project)...', delay: 300 },
            { type: 'success', text: 'Loaded: PM preferences + Q3 roadmap context' },
            { type: 'out', text: 'Claude knows: your key files, the deadline, what is already decided.' },
            { type: 'warn', text: 'No need to explain the project again.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I want Claude to know this project context automatically: we are deciding between three Q3 bets, the decision is due Friday, mobile-first is already locked in, no native apps this cycle.' },
            { role: 'claude', text: "Add this to a `CLAUDE.md` file inside your project folder:\n\n```\n# Project: Q3 Strategy Decision\n\n## Context\nDeciding between three strategic bets for Q3.\nDecision due: Friday.\n\n## Already Decided\n- Mobile-first is the priority\n- No native apps this cycle\n\n## Files to Reference\n- roadmap-draft.md\n- user-research-notes.md\n```\n\nEvery time you open a new Claude session inside this folder, it will read this context first. You will never need to re-explain the situation." },
          ],
        },
      },
      {
        title: 'The honest comparison: when to use which tool',
        description:
          "Neither tool is better. They are built for different kinds of work. Here is a clear breakdown so you can use each one where it shines, without guilt or switching anxiety.",
        demo: {
          title: 'Claude vs ChatGPT: when to reach for each',
          steps: [
            { type: 'out', text: 'Use ChatGPT when:', delay: 200 },
            { type: 'out', text: '  - You want fast, conversational back-and-forth' },
            { type: 'out', text: '  - You are browsing or on a phone' },
            { type: 'out', text: '  - You want cross-session memory without setup' },
            { type: 'out', text: '  - You are using GPT plugins or DALL-E image generation' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Use Claude Code when:', delay: 300 },
            { type: 'out', text: '  - You are working inside a real project or folder' },
            { type: 'out', text: '  - You want Claude to read, write, and edit actual files' },
            { type: 'out', text: '  - You want repeatable workflows (skills, automations)' },
            { type: 'out', text: '  - You want context that loads from your own machine' },
            { type: 'success', text: 'You do not have to choose one forever. Use both.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Honestly, when should I use ChatGPT vs Claude? I do not want a biased answer.' },
            { role: 'claude', text: "Fair question. Here is the honest breakdown:\n\nReach for ChatGPT when:\n- You want memory that just works, without any setup\n- You are on your phone or in a browser, not at a desk\n- You use GPT-4o for image generation or browsing\n- You want quick conversational help with no project context needed\n\nReach for Claude when:\n- You are working inside a project folder with real files\n- You want Claude to read and write files, not just generate text\n- You want preferences and project context to load automatically via CLAUDE.md\n- You are building repeatable workflows (skills, automations, structured outputs)\n\nThe short version: ChatGPT is great for chat. Claude Code is great for work that lives on your machine. Many people use both." },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Build your first CLAUDE.md',
      href: '/tutorials/your-first-claude-md',
    },
  },

  'debug-and-refactor': {
    title: 'Debug and Refactor Like a Senior Dev',
    slug: 'debug-and-refactor',
    duration: '15 min',
    difficulty: 'intermediate',
    availableRoutes: ['terminal', 'ide'],
    description:
      'Use Claude Code the way senior engineers actually do. Feed it real stack traces, refactor components with tests staying green, and build a systematic debugging habit that scales.',
    intro:
      'Claude Code is not a magic wand. It is a pair programmer who reads your codebase, traces data flow, checks your git history, and forms one hypothesis at a time. This tutorial shows you how to drive that process deliberately, the way you would with a senior engineer who just joined the team.',
    steps: [
      {
        title: 'Set up your project context',
        description:
          'The difference between useful Claude output and generic Claude output is almost always the CLAUDE.md. For a React/TypeScript project, you want build commands, test commands, key patterns, and any non-obvious conventions. Claude will use this on every request without you repeating yourself.',
        code: {
          snippet: `# CLAUDE.md for a React/Next.js/TypeScript project

## Stack
Next.js 15 (App Router), TypeScript strict, Tailwind CSS, Prisma, Vitest

## Commands
npm run dev          # Dev server
npm run build        # Production build (runs tsc + next build)
npm test             # Vitest unit tests
npm run test:e2e     # Playwright end-to-end tests
npx tsc --noEmit    # Type check only

## Key Patterns
- Functional components only, explicit prop interfaces
- No barrel files (import directly from source)
- Server Components by default, 'use client' only when needed
- Zod for all external input validation
- Error boundaries on every major route segment

## Testing Rules
- Always run tests after refactoring
- Never mock the database layer in unit tests (use Prisma test DB)
- Co-locate test files: UserCard.tsx lives next to UserCard.test.tsx

## Never
- No any types
- No console.log in production code
- No default exports from component files`,
          language: 'markdown',
        },
        demo: {
          title: 'Claude reads your context before every request',
          steps: [
            { type: 'cmd', text: 'cat CLAUDE.md' },
            { type: 'out', text: '# CLAUDE.md for KAS React App', delay: 200 },
            { type: 'out', text: '' },
            { type: 'out', text: '## Stack' },
            { type: 'out', text: 'Next.js 15, TypeScript strict, Tailwind, Prisma, Vitest' },
            { type: 'out', text: '' },
            { type: 'out', text: '## Commands' },
            { type: 'out', text: 'npm test   npm run build   npx tsc --noEmit' },
            { type: 'out', text: '' },
            { type: 'out', text: '## Testing Rules' },
            { type: 'out', text: 'Always run tests after refactoring.' },
            { type: 'success', text: 'Context loaded. Claude will use this on every request.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Generate a CLAUDE.md for this Next.js TypeScript project. We use Vitest, Prisma, and Tailwind. Always run tests after refactoring. No any types. No console.log in production.' },
            { role: 'claude', text: 'I can see your project layout. Here is a CLAUDE.md that reflects your actual setup:\n\n```markdown\n## Stack\nNext.js 15 (App Router), TypeScript strict, Tailwind CSS, Prisma, Vitest\n\n## Commands\nnpm run dev   npm run build   npm test   npx tsc --noEmit\n\n## Conventions\n- Functional components, explicit prop interfaces\n- Server Components by default, use client only when needed\n- No any types, no console.log in production\n\n## Testing Rules\n- Run npm test after every refactor\n- Co-locate test files next to source\n```\n\nShall I write this to CLAUDE.md?' },
          ],
        },
      },
      {
        title: 'Debug a real error',
        description:
          'Stop describing bugs in prose. Paste the exact stack trace. Claude will trace through the actual files, check recent git changes, and give you a root cause before suggesting a fix. The key: let it look at the code before forming a hypothesis.',
        code: {
          snippet: `# Paste the full stack trace, not a summary
claude "Fix this error:

TypeError: Cannot read properties of undefined (reading 'userId')
    at getEnrollmentStatus (src/lib/enrollment.ts:47:28)
    at EnrollmentButton (src/components/EnrollmentButton.tsx:23:18)
    at renderWithHooks (react-dom/cjs/react-dom.development.js:14985:18)

This happens when a user visits /courses/[id] without being logged in."`,
          language: 'bash',
        },
        demo: {
          title: 'Claude traces the bug instead of guessing',
          steps: [
            { type: 'cmd', text: 'claude "Fix this TypeError in enrollment.ts:47"' },
            { type: 'out', text: 'Reading CLAUDE.md...', delay: 300 },
            { type: 'out', text: 'Reading src/lib/enrollment.ts...', delay: 500 },
            { type: 'out', text: 'Reading src/components/EnrollmentButton.tsx...', delay: 400 },
            { type: 'out', text: 'Checking git log -- src/lib/enrollment.ts...', delay: 400 },
            { type: 'out', text: '' },
            { type: 'out', text: 'Root cause: session?.user is optional but line 47 accesses' },
            { type: 'out', text: 'userId directly. Pattern introduced in commit a3f92c1 (3 days ago).' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Fix: guard with early return when session is null.' },
            { type: 'success', text: 'Updated enrollment.ts:47 with null check' },
            { type: 'success', text: 'Running npm test...' },
            { type: 'success', text: '14 passed, 0 failed' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: "Fix this:\n\nTypeError: Cannot read properties of undefined (reading 'userId')\n    at getEnrollmentStatus (src/lib/enrollment.ts:47:28)\n    at EnrollmentButton (src/components/EnrollmentButton.tsx:23:18)\n\nHappens when visiting /courses/[id] without being logged in." },
            { role: 'claude', text: "Reading enrollment.ts and EnrollmentButton.tsx now.\n\nRoot cause: `getEnrollmentStatus` calls `session.user.userId` on line 47 without checking if `session` is defined. The function assumes authenticated context, but this route is accessible to unauthenticated users.\n\nChecked git history: this line was changed 3 days ago in a refactor that moved session access into the function. The caller used to guard it.\n\nFix:\n\n```typescript\n// Before\nconst { userId } = session.user;\n\n// After\nif (!session?.user) return null;\nconst { userId } = session.user;\n```\n\nApplied. Want me to run your tests now?" },
          ],
        },
      },
      {
        title: 'Refactor with confidence',
        description:
          'Tell Claude what you want to change, tell it the tests must stay green, and let it work. The CLAUDE.md "always run tests after refactoring" rule means Claude runs the suite automatically and reports if anything breaks. You review the diff, not the process.',
        code: {
          snippet: `# Good refactoring prompt: scope + constraint
claude "Refactor the UserCard component to extract the avatar logic
into a separate AvatarWithFallback component. Keep all existing
tests passing. Do not change any external props interface."`,
          language: 'bash',
        },
        demo: {
          title: 'Refactor with tests as the safety net',
          steps: [
            { type: 'cmd', text: 'claude "Refactor UserCard: extract avatar into AvatarWithFallback"' },
            { type: 'out', text: 'Reading src/components/UserCard.tsx...', delay: 300 },
            { type: 'out', text: 'Reading src/components/UserCard.test.tsx...', delay: 300 },
            { type: 'out', text: '' },
            { type: 'out', text: 'Plan:' },
            { type: 'out', text: '  1. Extract avatar JSX into AvatarWithFallback.tsx' },
            { type: 'out', text: '  2. Update UserCard to import AvatarWithFallback' },
            { type: 'out', text: '  3. Keep UserCard props interface unchanged' },
            { type: 'out', text: '  4. Run tests to verify' },
            { type: 'success', text: 'Created src/components/AvatarWithFallback.tsx' },
            { type: 'success', text: 'Updated src/components/UserCard.tsx' },
            { type: 'out', text: 'Running npm test...', delay: 400 },
            { type: 'success', text: '22 passed, 0 failed. Refactor complete.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Refactor UserCard.tsx to extract the avatar logic into a separate AvatarWithFallback component. Keep all existing tests passing. Do not change the external props interface.' },
            { role: 'claude', text: 'Reading UserCard.tsx and UserCard.test.tsx.\n\nThe avatar block covers lines 34-58: image load, error fallback to initials, and the size variants. I will extract that into `AvatarWithFallback.tsx` with its own props interface.\n\nUserCard will import it and pass the same values it currently computes inline. External API unchanged.\n\nCreating files now.' },
            { role: 'claude', text: 'Done. Created `AvatarWithFallback.tsx`, updated `UserCard.tsx`.\n\nRunning tests now (per CLAUDE.md rules).\n\n22 passed, 0 failed.\n\nDiff is clean. The only change to UserCard.tsx is the import and the extracted JSX block. Props interface untouched.' },
          ],
        },
      },
      {
        title: 'The systematic approach',
        description:
          'Senior engineers do not guess. They trace data flow backward from the symptom, check what changed recently, and form one hypothesis at a time. You can ask Claude to do exactly this. Prompt it explicitly and it will show its work before touching any code.',
        code: {
          snippet: `# Ask Claude to trace before it fixes
claude "The CourseProgress component is showing stale data after
a user completes a lesson. Do NOT suggest fixes yet.

First: trace the data flow from the API call through to the UI
render. Check git history for recent changes to this path.
Identify the most likely cause. Then wait for my confirmation."`,
          language: 'bash',
        },
        demo: {
          title: 'Trace first, fix second',
          steps: [
            { type: 'cmd', text: 'claude "Stale data in CourseProgress. Trace the data flow first."' },
            { type: 'out', text: 'Reading src/components/CourseProgress.tsx...', delay: 300 },
            { type: 'out', text: 'Reading src/hooks/useCourseProgress.ts...', delay: 300 },
            { type: 'out', text: 'Reading src/lib/api/progress.ts...', delay: 300 },
            { type: 'out', text: 'Checking git log -- src/lib/api/progress.ts...', delay: 400 },
            { type: 'out', text: '' },
            { type: 'out', text: 'Data flow:' },
            { type: 'out', text: '  API call -> useCourseProgress -> CourseProgress render' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Recent change (2 days ago): added staleTime: Infinity' },
            { type: 'out', text: 'to React Query config in useCourseProgress.ts' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Most likely cause: staleTime prevents refetch after mutation.' },
            { type: 'warn', text: 'Waiting for your confirmation before applying fix.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'CourseProgress shows stale data after a lesson completion. Do NOT suggest fixes yet. Trace the data flow from the API through to the render. Check git history for recent changes on this path. Tell me the most likely cause.' },
            { role: 'claude', text: 'Tracing now. Reading CourseProgress.tsx, useCourseProgress.ts, and the API layer.\n\nData flow: lesson completion mutation fires, React Query invalidateQueries is called, useCourseProgress re-fetches, CourseProgress re-renders.\n\nGit history on useCourseProgress.ts: 2 days ago a commit added `staleTime: Infinity` to the query config. This prevents React Query from ever marking the data as stale, so even after the mutation invalidation, the cache does not refetch.\n\nMost likely cause: `staleTime: Infinity` is blocking the refetch triggered by your mutation. The invalidation fires but the query ignores it.\n\nWant me to apply a fix?' },
          ],
        },
      },
      {
        title: 'Make it stick',
        description:
          'The best thing you can do after a debugging session is add what you learned to CLAUDE.md. Every project has patterns that trip people up. Document them once, and Claude will avoid the same mistakes automatically on every future request in this codebase.',
        code: {
          snippet: `# Append to CLAUDE.md after each session

## Known Gotchas
- React Query: never set staleTime: Infinity on mutation-dependent
  queries. Use staleTime: 0 or omit it (React Query defaults are fine).
- session?.user can be undefined on public routes even if the page is
  not in the (auth) route group. Always guard before accessing userId.
- AvatarWithFallback requires explicit width/height props.
  It does not inherit size from the parent via CSS alone.

## Debugging Preferences
- Trace data flow before suggesting a fix
- Check git log for recent changes on the affected file
- Run npm test after every refactor
- Show root cause plus one-line explanation before the code change`,
          language: 'markdown',
        },
        demo: {
          title: 'CLAUDE.md becomes institutional memory',
          steps: [
            { type: 'cmd', text: '# After every debugging session:' },
            { type: 'cmd', text: 'claude "Add what we learned about staleTime to CLAUDE.md"' },
            { type: 'out', text: 'Appending to CLAUDE.md...', delay: 400 },
            { type: 'success', text: 'Added: ## Known Gotchas section' },
            { type: 'success', text: 'Added: React Query staleTime warning' },
            { type: 'success', text: 'Added: session?.user guard reminder' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Next time Claude sees a React Query query in this repo,' },
            { type: 'warn', text: 'it already knows your staleTime rules.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Add what we just learned to CLAUDE.md: the staleTime issue, the session?.user guard pattern, and a preference to always trace data flow before suggesting fixes.' },
            { role: 'claude', text: 'Appended to CLAUDE.md:\n\n```markdown\n## Known Gotchas\n- React Query: never set staleTime: Infinity on mutation-dependent queries\n- session?.user can be undefined on public routes: always guard before accessing userId\n\n## Debugging Preferences\n- Trace data flow first, suggest fix second\n- Check git log on affected file before forming hypothesis\n- Run npm test after every refactor\n```\n\nThis is now active context for all future sessions in this project.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Next: PR Review Workflow',
      href: '/tutorials/pr-review-workflow',
    },
  },

  'nextjs-with-claude': {
    title: 'Start a Next.js Project with Claude Code',
    slug: 'nextjs-with-claude',
    duration: '20 min',
    difficulty: 'intermediate',
    availableRoutes: ['terminal', 'ide'],
    description:
      'Scaffold, configure, build, test, and deploy a production-ready Next.js 16 App Router project using Claude Code as your development partner.',
    intro:
      "Claude Code is not a code generator you paste from. It is a development partner that reads your project, understands context, and keeps your conventions consistent from the first file to the last commit. This tutorial walks through a full Next.js workflow: scaffold with one prompt, configure a proper CLAUDE.md, build a real feature with data fetching, lock in TypeScript strict mode and tests, then ship to Vercel. By the end you will have a live project and a repeatable process for every Next.js project after this.",
    steps: [
      {
        title: 'Scaffold with one prompt',
        description:
          "One prompt creates the full project. Specify App Router, TypeScript strict mode, Tailwind CSS 4, and your preferred src layout. Claude handles the scaffolding, installs dependencies, and confirms the dev server starts.",
        code: {
          snippet: `claude "Create a Next.js 16 project called 'dashboard-app' with:
- App Router (not Pages Router)
- TypeScript in strict mode
- Tailwind CSS 4
- src/ directory layout
- ESLint and Prettier configured
- A basic home page at app/page.tsx that just says Hello

After creating it, run npm run dev to confirm it starts."`,
          language: 'bash',
        },
        demo: {
          title: 'Claude scaffolds your Next.js project',
          steps: [
            { type: 'cmd', text: 'claude "Create a Next.js 16 project called dashboard-app..."' },
            { type: 'out', text: 'Running: npx create-next-app@latest dashboard-app ...', delay: 400 },
            { type: 'out', text: '  TypeScript: yes (strict mode)' },
            { type: 'out', text: '  Tailwind CSS: yes (v4)' },
            { type: 'out', text: '  App Router: yes' },
            { type: 'out', text: '  src/ directory: yes' },
            { type: 'out', text: 'Installing dependencies...' },
            { type: 'success', text: 'Created dashboard-app/' },
            { type: 'success', text: 'Configured tsconfig.json with strict: true' },
            { type: 'success', text: 'Added prettier.config.ts with Tailwind plugin' },
            { type: 'cmd', text: 'npm run dev', delay: 600 },
            { type: 'success', text: 'Ready on http://localhost:3000' },
            { type: 'warn', text: 'Scaffold confirmed. Move to CLAUDE.md setup.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Create a Next.js 16 App Router project called dashboard-app. TypeScript strict mode, Tailwind CSS 4, src/ layout. Start with a minimal home page. Run dev and confirm it starts.' },
            { role: 'claude', text: "Running `create-next-app` with your settings now.\n\nUsing:\n- App Router (not Pages)\n- `strict: true` in tsconfig\n- Tailwind v4 with the new CSS-based config\n- `src/app/` directory structure\n\nI will also add Prettier with the Tailwind class sort plugin since that pairs well with this setup." },
            { role: 'claude', text: "Done. Dev server confirmed at `localhost:3000`.\n\nProject structure:\n```\nsrc/\n  app/\n    layout.tsx\n    page.tsx\n    globals.css\n  components/   (empty, ready for your components)\n```\n\nNext: set up CLAUDE.md so I know your conventions for this project." },
          ],
        },
      },
      {
        title: 'Set up your CLAUDE.md',
        description:
          "A project CLAUDE.md tells Claude your conventions so it applies them consistently across every file it touches. Cover build commands, naming conventions, component patterns, and import style. This is the single biggest leverage point for a clean codebase.",
        code: {
          snippet: `cat > CLAUDE.md << 'EOF'
# CLAUDE.md - dashboard-app

## Stack
Next.js 16 (App Router), TypeScript (strict), Tailwind CSS 4, Vercel

## Commands
npm run dev      # Dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint
npm run test     # Vitest (once added)

## File Naming
- Components: PascalCase files, e.g. UserCard.tsx
- Utilities: camelCase files, e.g. formatDate.ts
- Route segments: lowercase with hyphens, e.g. app/user-settings/page.tsx

## Component Patterns
- Prefer Server Components by default
- Add 'use client' only when you need interactivity or browser APIs
- Props interface named [ComponentName]Props, defined above the component
- No default exports for shared components (named exports only)
- No React.FC type annotation

## Import Style
- Absolute imports via @/ alias (configured in tsconfig)
- Group: 1) React/Next, 2) third-party, 3) internal (@/), 4) relative
- No barrel files (index.ts re-exports): import directly from the source file

## TypeScript Rules
- No any. Use unknown and narrow with type guards.
- Infer simple local variable types. Add explicit types on all exported functions.
- Use interface for object shapes, type for unions and mapped types.

## Styling
- Tailwind utility classes only. No CSS modules, no inline styles.
- Class variants via clsx or cn helper.
- Dark mode via dark: prefix (class strategy).

## What NOT to do
- Do not use Pages Router patterns (getServerSideProps, _app.tsx, etc.)
- Do not add console.log to production code
- Do not create new dependencies without flagging it first
EOF`,
          language: 'bash',
        },
        demo: {
          title: 'CLAUDE.md written and active',
          steps: [
            { type: 'cmd', text: "cat > CLAUDE.md << 'EOF'" },
            { type: 'out', text: '(writing conventions...)', delay: 300 },
            { type: 'success', text: 'Created CLAUDE.md (48 lines)' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Conventions locked in:' },
            { type: 'out', text: '  File naming: PascalCase components, camelCase utils' },
            { type: 'out', text: '  Components: Server Components by default' },
            { type: 'out', text: '  Imports: @/ alias, no barrel files' },
            { type: 'out', text: '  TypeScript: strict, no any' },
            { type: 'warn', text: 'Claude reads this at the start of every session.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Generate a CLAUDE.md for this project. Conventions: Server Components by default, named exports only, PascalCase component files, no barrel files, @/ imports, strict TypeScript, Tailwind only for styling.' },
            { role: 'claude', text: "Writing `CLAUDE.md` to the project root now.\n\nI will include:\n- Build/test/lint commands from your package.json\n- The naming and component conventions you specified\n- Import grouping order\n- TypeScript rules derived from your tsconfig\n- Explicit do-not-do list to prevent common mistakes\n\nI will also note that this project uses App Router so I know to avoid any Pages Router patterns." },
            { role: 'claude', text: "Done. `CLAUDE.md` is saved and active for this session.\n\nKey things I noted: Server Components by default, named exports, `@/` absolute imports, no barrel files, no `any`. These will apply to every file I touch from here." },
          ],
        },
      },
      {
        title: 'Build your first feature',
        description:
          "Build a dashboard page that fetches data server-side. This covers the core App Router pattern: async Server Component, loading state with Suspense, and a reusable card component with typed props.",
        code: {
          snippet: `claude "Build a dashboard page at app/dashboard/page.tsx that:
1. Is an async Server Component (no 'use client')
2. Fetches user stats from a mock async function in lib/data.ts
3. Displays the stats in a grid of StatCard components
4. Has a Suspense boundary with a loading skeleton
5. Uses named exports for all components
6. Types everything properly with TypeScript interfaces"`,
          language: 'bash',
        },
        demo: {
          title: 'Claude builds the dashboard feature',
          steps: [
            { type: 'cmd', text: 'claude "Build a dashboard page with async data fetching..."' },
            { type: 'out', text: 'Reading CLAUDE.md...', delay: 400 },
            { type: 'out', text: 'Context: Server Components by default, named exports' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Creating files:' },
            { type: 'success', text: 'Created src/lib/data.ts (mock async fetch with type)' },
            { type: 'success', text: 'Created src/components/StatCard.tsx (named export, typed props)' },
            { type: 'success', text: 'Created src/components/StatCardSkeleton.tsx (loading state)' },
            { type: 'success', text: 'Created src/app/dashboard/loading.tsx (Suspense fallback)' },
            { type: 'success', text: 'Created src/app/dashboard/page.tsx (async Server Component)' },
            { type: 'warn', text: 'No client components needed. Pure server rendering.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Build a dashboard page at app/dashboard/page.tsx. Async Server Component, fetches user stats from a mock function in lib/data.ts, displays stats in a StatCard grid, Suspense with loading skeleton, all TypeScript typed.' },
            { role: 'claude', text: "Building this now. Following your CLAUDE.md conventions:\n\n- `page.tsx` will be an `async` Server Component (no `use client`)\n- `StatCard` will be a named export in `src/components/StatCard.tsx`\n- `lib/data.ts` will export a typed `getUserStats()` async function\n- Loading state via `app/dashboard/loading.tsx` (Next.js file convention)\n- All props typed with interfaces above each component\n\nNo barrel files, `@/` imports throughout." },
            { role: 'claude', text: "Done. Five files created.\n\nThe data flow:\n1. `page.tsx` calls `await getUserStats()` at the top level\n2. Next.js suspends during the fetch and shows `loading.tsx`\n3. Once resolved, renders the `StatCard` grid\n\nRun `npm run dev` and visit `/dashboard` to see it. The mock function has a 1.2s delay so you can see the skeleton in action." },
          ],
        },
      },
      {
        title: 'Add tests and types',
        description:
          "Claude writes Vitest tests for the components and utility functions, verifies TypeScript strict mode passes with zero errors, and flags any type gaps it finds. No untested code ships.",
        code: {
          snippet: `claude "Add tests to this project:
1. Install Vitest and @testing-library/react
2. Write unit tests for getUserStats() in lib/data.test.ts
3. Write component tests for StatCard in StatCard.test.tsx
4. Run the tests and fix any failures
5. Then run: npx tsc --noEmit and fix any TypeScript errors"`,
          language: 'bash',
        },
        demo: {
          title: 'Tests written and TypeScript verified',
          steps: [
            { type: 'cmd', text: 'claude "Add Vitest tests and verify TypeScript..."' },
            { type: 'out', text: 'Installing: vitest @testing-library/react @vitejs/plugin-react', delay: 400 },
            { type: 'success', text: 'Added vitest.config.ts' },
            { type: 'success', text: 'Created src/lib/data.test.ts (4 tests)' },
            { type: 'success', text: 'Created src/components/StatCard.test.tsx (3 tests)' },
            { type: 'cmd', text: 'npm run test', delay: 400 },
            { type: 'success', text: 'PASS  src/lib/data.test.ts (4 tests)' },
            { type: 'success', text: 'PASS  src/components/StatCard.test.tsx (3 tests)' },
            { type: 'cmd', text: 'npx tsc --noEmit', delay: 300 },
            { type: 'success', text: 'TypeScript: 0 errors' },
            { type: 'warn', text: 'All tests green. Strict mode clean. Ready to deploy.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Add Vitest and Testing Library. Write tests for getUserStats and StatCard. Run them. Then run tsc --noEmit and fix any TypeScript errors.' },
            { role: 'claude', text: "Installing testing dependencies and configuring Vitest now.\n\nTest plan:\n- `data.test.ts`: test return shape, test that the async delay resolves, test edge cases on the data\n- `StatCard.test.tsx`: renders with required props, handles missing optional props, applies correct Tailwind classes for each variant\n\nI will write tests first, then run them, then fix any failures before moving to TypeScript." },
            { role: 'claude', text: "7 tests passing. 0 TypeScript errors.\n\nOne thing I fixed: `StatCardSkeleton` had an implicit `any` on the `className` prop. Changed to `string | undefined` with a default of `\"\"`. Strict mode is clean.\n\nTest coverage: `lib/data.ts` at 100%, `StatCard.tsx` at 87% (the loading state path is covered by the skeleton test)." },
          ],
        },
      },
      {
        title: 'Deploy to Vercel',
        description:
          "One command ships the project live. Vercel detects Next.js automatically, builds with the right settings, and gives you a production URL. No configuration file needed for a standard Next.js 16 App Router project.",
        code: {
          snippet: `# Commit your work first
git add -A && git commit -m "feat: initial dashboard with tests"

# Deploy to production
vercel --prod`,
          language: 'bash',
        },
        demo: {
          title: 'Deployed to production',
          steps: [
            { type: 'cmd', text: 'git add -A && git commit -m "feat: initial dashboard with tests"' },
            { type: 'success', text: '[main abc1234] feat: initial dashboard with tests' },
            { type: 'out', text: ' 8 files changed, 312 insertions(+)' },
            { type: 'cmd', text: 'vercel --prod', delay: 400 },
            { type: 'out', text: 'Detected Next.js 16 (App Router)', delay: 500 },
            { type: 'out', text: 'Building...' },
            { type: 'out', text: 'Build completed in 18s' },
            { type: 'success', text: 'Deployed to https://dashboard-app-abc.vercel.app' },
            { type: 'warn', text: 'Your app is live. Share the URL.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Commit everything and deploy to Vercel production.' },
            { role: 'claude', text: "Running the deploy sequence:\n\n1. `git add -A` to stage all files\n2. Commit with a conventional message\n3. `vercel --prod` to deploy\n\nVercel will auto-detect Next.js 16 and use the correct build settings. No `vercel.json` needed for a standard App Router project." },
            { role: 'claude', text: "Deployed.\n\nProduction URL: `https://dashboard-app-abc.vercel.app`\n\nBuild summary:\n- 5 routes pre-rendered\n- `/dashboard` renders server-side per request\n- Build time: 18s\n\nYour CLAUDE.md, tests, and TypeScript config are all committed. The next developer (or Claude session) that opens this project will have full context." },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Debug and refactor with Claude Code',
      href: '/tutorials/debug-and-refactor',
    },
  },

  'pr-review-workflow': {
    title: 'PR Reviews That Actually Find Bugs',
    slug: 'pr-review-workflow',
    duration: '15 min',
    difficulty: 'intermediate',
    availableRoutes: ['terminal', 'ide'],
    description:
      'Stop rubber-stamping PRs. Use Claude to catch real bugs, identify untested code paths, and write review comments that actually help.',
    intro:
      "Most PR reviews miss the bugs that matter. Reviewers skim for style issues and obvious mistakes, but miss the subtle logic errors, the missing edge case handling, and the code paths that have zero test coverage. This tutorial shows you how to use Claude as a second pair of eyes that reads the diff, understands the context, and flags the things humans routinely miss.",
    steps: [
      {
        title: 'Pull down a PR',
        description:
          'Use the gh CLI to check out the PR branch locally. This gives Claude access to the full file context, not just the diff. You want Claude reading real code, not a stripped-down patch.',
        code: {
          snippet: `# List open PRs and pick one
gh pr list

# Check out a specific PR by number
gh pr checkout 247

# Or check out by branch name
gh pr checkout feature/user-auth-refactor

# See the PR description and file list before starting
gh pr view
gh pr diff 247 --name-only`,
          language: 'bash',
        },
        demo: {
          title: 'Check out a PR branch',
          steps: [
            { type: 'cmd', text: 'gh pr list' },
            { type: 'out', text: '#247  Refactor user authentication flow   feature/user-auth-refactor  OPEN' },
            { type: 'out', text: '#251  Add payment webhook handler          feature/stripe-webhooks      OPEN' },
            { type: 'out', text: '#253  Fix dashboard loading state           fix/dashboard-skeleton       OPEN' },
            { type: 'cmd', text: 'gh pr checkout 247', delay: 600 },
            { type: 'out', text: 'remote: Enumerating objects: 18, done.' },
            { type: 'out', text: "Switched to branch 'feature/user-auth-refactor'" },
            { type: 'success', text: "Branch checked out. You're now on the PR branch with full file context." },
            { type: 'warn', text: 'Tip: run `gh pr view` to read the description before asking Claude to review.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: "I've checked out PR #247 (feature/user-auth-refactor). Before I start reviewing, what context should I pull together?" },
            { role: 'claude', text: "Good instinct to gather context first. I'd suggest:\n\n1. PR description: run `gh pr view 247` to read the stated intent\n2. File list: `gh pr diff 247 --name-only` to see what changed\n3. Commit history: `git log main..HEAD --oneline` to understand the sequence of changes\n\nOnce I can see those, I'll know whether to focus on the auth logic itself, the token handling, the session management, or something else. Which files changed?" },
          ],
        },
      },
      {
        title: 'Ask Claude to review',
        description:
          'With the branch checked out, ask Claude to review the PR. Give it the diff plus context about what the PR is trying to do. The more specific your prompt, the more useful the review.',
        code: {
          snippet: `# Get the full diff and pipe it to Claude
gh pr diff 247 | claude "Review this PR diff. Focus on: correctness,
security issues, missing error handling, and edge cases.
The PR description says: Refactor user authentication to use JWT tokens
instead of session cookies."

# Or work interactively inside a Claude session
claude
# Then paste the diff and ask:
# The author says this refactors auth from sessions to JWTs.
# What are the biggest risks in this change?`,
          language: 'bash',
        },
        demo: {
          title: 'Claude reads the PR',
          steps: [
            { type: 'cmd', text: 'gh pr diff 247 | claude "Review this PR. Focus on security and correctness. Refactor: sessions to JWTs."' },
            { type: 'out', text: 'Reading diff... (18 files, +847 -312 lines)', delay: 800 },
            { type: 'out', text: 'Analyzing: src/auth/jwt.ts, src/middleware/auth.ts, src/api/login.ts...' },
            { type: 'warn', text: 'ISSUE: JWT secret read from process.env without a defined-check at startup' },
            { type: 'warn', text: 'ISSUE: Token expiry set to 30 days, no refresh token logic implemented' },
            { type: 'warn', text: 'ISSUE: logout() clears cookie but JWT stays valid until expiry' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Also noted: 4 API routes updated but 2 still use old session middleware' },
            { type: 'success', text: 'Full review complete. 3 blocking issues, 4 suggestions.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Review this PR. It refactors auth from session cookies to JWTs. What are the biggest risks?\n\n[paste of gh pr diff 247 output]' },
            { role: 'claude', text: "I've read the diff. Three things stand out as blocking issues:\n\n**1. JWT invalidation gap (critical)**\n`logout()` in `src/auth/session.ts` clears the cookie, but the JWT itself stays valid until expiry. If a token is stolen after logout, it works for another 30 days. You need either a token blocklist or short-lived access tokens with a refresh token.\n\n**2. Missing startup validation**\n`src/auth/jwt.ts` line 12 reads `process.env.JWT_SECRET` but never checks it's defined. If it's missing in production, the first request that hits auth will throw an unhandled error instead of a clear startup failure.\n\n**3. Incomplete migration**\n`src/api/payments/route.ts` and `src/api/admin/route.ts` still import `withSession` from the old middleware. They'll silently bypass the JWT auth check in production.\n\nWant me to draft the review comments for these?" },
          ],
        },
      },
      {
        title: 'Go deeper on suspicious code',
        description:
          'When Claude flags something, follow up. Ask it to read the specific file, trace the data flow, and explain exactly what could go wrong. This is where the real bugs surface.',
        code: {
          snippet: `# Trace what happens with an expired token
claude "Read src/auth/jwt.ts and src/middleware/auth.ts together.
Trace what happens when a JWT token is expired: does the middleware
return a 401, silently continue, or redirect? Show me the code path."

# Check a pattern across the whole codebase
claude "Find every place we check authentication in the API routes.
Are they all using the new JWT middleware or are some still on sessions?"

# Think through the deployment impact
claude "What happens to users currently logged in when this PR deploys?
Their existing session cookies will not be valid. What is the transition path?"`,
          language: 'bash',
        },
        demo: {
          title: 'Drilling into a specific issue',
          steps: [
            { type: 'cmd', text: 'claude "Read src/auth/jwt.ts. What happens when a token is expired?"' },
            { type: 'out', text: 'Reading src/auth/jwt.ts...', delay: 500 },
            { type: 'out', text: 'Line 34: verifyToken() catches JsonWebTokenError and TokenExpiredError' },
            { type: 'out', text: 'Line 41: Both errors return null (no distinction between expired vs invalid)' },
            { type: 'out', text: 'Line 52: Middleware checks for null and calls next() with req.user = undefined' },
            { type: 'warn', text: 'PROBLEM: Expired token treated same as unauthenticated. No 401 returned.' },
            { type: 'warn', text: 'PROBLEM: req.user = undefined. Routes that skip the null check will crash.' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Checking downstream consumers of req.user...', delay: 600 },
            { type: 'warn', text: 'src/api/profile/route.ts line 8: req.user.id accessed without null check' },
            { type: 'success', text: 'Root cause traced. This explains the 500 errors seen in staging.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'You flagged the logout issue. Trace the full data flow: what actually happens between a user clicking "logout" and the JWT becoming invalid? Read the actual files.' },
            { role: 'claude', text: "I've read `src/auth/session.ts`, `src/api/auth/logout/route.ts`, and `src/middleware/auth.ts`. Here's the actual flow:\n\n1. User clicks logout\n2. `POST /api/auth/logout` calls `clearAuthCookie()`, sets cookie to expired, returns 200\n3. Browser deletes the cookie\n4. The JWT is not invalidated anywhere. No blocklist, no token revocation, no deny list.\n5. If an attacker has the JWT string (from a log, a proxy, a compromised machine), they can use it directly in the `Authorization: Bearer` header without the cookie.\n6. That token works for 30 days from issue time.\n\nThe fix options are: (a) short-lived access tokens (15 min) with a refresh token flow, (b) a Redis-backed blocklist that logout adds to, or (c) a session ID inside the JWT payload validated against the DB on each request.\n\nOption (b) is the quickest given your existing Redis instance in `src/lib/redis.ts`. Want me to sketch the implementation?" },
          ],
        },
      },
      {
        title: 'Write missing tests',
        description:
          'Claude can identify which code paths have no test coverage and write the tests. This is faster than hunting for gaps manually and produces tests that reflect real failure modes, not just happy paths.',
        code: {
          snippet: `# Ask Claude to find untested paths first
claude "Look at src/auth/jwt.ts and the existing tests in __tests__/auth/.
Which code paths have no test coverage? List them."

# Then ask Claude to write the tests
claude "Write vitest tests for the expired token case in src/auth/jwt.ts.
Cover: token expired, invalid signature, missing token, token with wrong audience.
Use the existing test setup in __tests__/auth/session.test.ts as the pattern."

# Run the new tests to confirm they catch the real bugs
npm test -- --testPathPattern auth/jwt`,
          language: 'bash',
        },
        demo: {
          title: 'Finding and filling coverage gaps',
          steps: [
            { type: 'cmd', text: "claude \"What's not tested in __tests__/auth/ that should be?\"" },
            { type: 'out', text: 'Reading __tests__/auth/... 3 test files found', delay: 500 },
            { type: 'out', text: 'Comparing to src/auth/jwt.ts coverage...' },
            { type: 'warn', text: 'Untested: expired token returns null instead of a 401 response' },
            { type: 'warn', text: 'Untested: tampered signature (invalid JWT structure)' },
            { type: 'warn', text: 'Untested: concurrent requests during token refresh (race condition)' },
            { type: 'warn', text: 'Untested: malformed Authorization header format' },
            { type: 'cmd', text: 'claude "Write the expired token test. Use the existing test setup."', delay: 600 },
            { type: 'out', text: 'Reading __tests__/auth/session.test.ts for patterns...' },
            { type: 'success', text: 'Created __tests__/auth/jwt.test.ts (4 new test cases)' },
            { type: 'cmd', text: 'npm test -- --testPathPattern auth/jwt', delay: 400 },
            { type: 'success', text: '4 tests passed. Expired token null return bug confirmed by tests.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: "Look at our auth tests and the actual jwt.ts implementation. What's not tested that could cause a production incident?" },
            { role: 'claude', text: "I've read `src/auth/jwt.ts`, `src/middleware/auth.ts`, and all 3 files in `__tests__/auth/`. Here's what's missing:\n\n**High risk, no test exists:**\n- Expired token: `verifyToken()` returns `null`, middleware sets `req.user = undefined` and calls `next()`. Any route that accesses `req.user` without a null check will throw a 500 in production.\n- Token with wrong audience: passes signature verification but should be rejected. Currently it would pass through.\n\n**Medium risk:**\n- Concurrent refresh: two simultaneous requests to the refresh endpoint can each issue a valid token from the same refresh token. The second refresh token is orphaned.\n- Authorization header with extra whitespace: `Bearer  <token>` (double space) fails the split and returns undefined.\n\nShall I write all four test cases? I'll follow the `describe/it` pattern from `session.test.ts` and use the mock JWT factory already set up in `__tests__/helpers/auth.ts`." },
            { role: 'user', text: 'Yes, write all four.' },
            { role: 'claude', text: "Written to `__tests__/auth/jwt.test.ts`. I ran `npm test -- --testPathPattern auth/jwt` and all 4 pass. The expired-token test also confirmed the bug: `req.user` is `undefined` after an expired token rather than a 401 being returned. That's worth calling out explicitly in your review comment." },
          ],
        },
      },
      {
        title: 'Leave better review comments',
        description:
          'Use Claude to draft the actual review comments. Good review comments explain the risk, point to the specific code path, and suggest a concrete fix. Claude can draft these faster than you can type them, and at a consistently high quality.',
        code: {
          snippet: `# Draft a single targeted review comment
claude "Draft a GitHub PR review comment for this issue:
- File: src/auth/jwt.ts
- Problem: logout() clears the cookie but the JWT stays valid for 30 days
- Impact: stolen tokens remain valid after logout
- Tone: collegial, specific, not condescending
Include the problematic code snippet and a concrete fix suggestion."

# Draft the full review body
claude "Write the full review for PR #247 as a GitHub review body.
3 blocking issues, 2 suggestions. Tone: direct and helpful.
The author is a mid-level developer who appreciates specific examples."

# Post the review directly via gh CLI
gh pr review 247 --request-changes --body "$(cat review-draft.md)"`,
          language: 'bash',
        },
        demo: {
          title: 'Drafting a review comment',
          steps: [
            { type: 'cmd', text: 'claude "Draft a review comment for the JWT logout issue. Collegial tone, include a concrete fix."' },
            { type: 'out', text: 'Drafting review comment...', delay: 500 },
            { type: 'out', text: '' },
            { type: 'out', text: '--- DRAFT REVIEW COMMENT ---' },
            { type: 'out', text: 'The logout implementation clears the cookie correctly, but the JWT' },
            { type: 'out', text: 'itself stays valid until expiry (currently 30 days). If a token is' },
            { type: 'out', text: 'captured in a log or proxy before logout, it can be replayed after.' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Quickest fix: add the JTI to a Redis blocklist on logout and check' },
            { type: 'out', text: 'the blocklist in verifyToken(). The Redis client is already set up' },
            { type: 'out', text: 'in src/lib/redis.ts, so no new infrastructure needed.' },
            { type: 'out', text: '---' },
            { type: 'success', text: 'Comment drafted. Copy to GitHub or pipe directly to gh pr review.' },
          ],
        },
        ideDemo: {
          steps: [
            { role: 'user', text: 'Draft all the review comments for PR #247. Three blocking issues and two suggestions, formatted as a GitHub review body.' },
            { role: 'claude', text: "Here's the full review. Paste this into `gh pr review 247 --request-changes --body \"...\"` or into the GitHub web UI.\n\n---\n**Overall:** Good direction on the JWT migration, and the happy-path test coverage is solid. Three issues need to be addressed before merge.\n\n**Blocking: JWT invalidation gap**\n`src/auth/session.ts` clears the cookie on logout but the JWT stays valid for 30 days. Tokens captured in logs or proxies remain usable after logout. Fix: add the JTI claim to a Redis blocklist in `logout()` and check it in `verifyToken()`. The Redis client is already available at `src/lib/redis.ts`.\n\n**Blocking: Missing startup validation**\n`src/auth/jwt.ts` line 12 reads `process.env.JWT_SECRET` but never asserts it's defined. A missing env var in production gives a misleading runtime error on the first auth request. Add: `if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is required')` at module load.\n\n**Blocking: Incomplete middleware migration**\n`src/api/payments/route.ts` and `src/api/admin/route.ts` still import `withSession`. They'll silently bypass the JWT auth check after deploy. Both need to be updated to `withJWT`.\n\n**Suggestion: Token lifetime**\n30 days is long for an access token. Short-lived tokens (15 min) with a refresh token reduce the blast radius of any token leak significantly.\n\n**Suggestion: Distinguish error types**\n`verifyToken()` returns `null` for both expired and invalid tokens. Returning different values lets you send a `401 WWW-Authenticate: Bearer error=\"invalid_token\"` for expired tokens, which clients can use to trigger a silent refresh.\n---\n\nWant me to post this directly via `gh pr review`?" },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Back to all tutorials',
      href: '/tutorials',
    },
  },

  'meme-generator': {
    title: 'Make a Meme Generator',
    slug: 'meme-generator',
    duration: '15 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'terminal'],
    description:
      'Describe the meme you want. Claude builds a page that creates memes with custom text on any image.',
    intro:
      'You are going to build a real, working meme generator. Upload any image, slap some text on it, download the result. No coding required. Claude will write all the Canvas API magic for you. By the end you will have a tool you can actually use, and a story to tell at dinner.',
    steps: [
      {
        title: 'Tell Claude what you want',
        description:
          'Describe the meme generator you want to build. Be specific: you want to upload an image, add text at the top and bottom, and download the result. Claude will plan the whole thing before writing a single line.',
        code: {
          snippet: `Build me a meme generator as a single HTML file.
It should:
- Let me upload any image from my computer
- Add bold white text at the top and bottom (classic meme style)
- Show a live preview as I type
- Have a Download button that saves the final meme as a PNG
- Work entirely in the browser, no server needed`,
          language: 'text',
        },
        demo: {
          title: 'Describing your meme generator',
          steps: [
            { type: 'cmd', text: 'claude' },
            { type: 'success', text: 'Claude Code ready' },
            { type: 'cmd', text: '"Build me a meme generator as a single HTML file..."', delay: 600 },
            { type: 'out', text: 'Planning meme generator...', delay: 400 },
            { type: 'out', text: 'Components: file upload, Canvas renderer, text overlay, download' },
            { type: 'out', text: 'Approach: HTML5 Canvas API, no dependencies needed' },
            { type: 'warn', text: 'Starting to build. This will take about 30 seconds.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Build me a meme generator as a single HTML file. Let me upload an image, add bold white text at the top and bottom with a black outline, see a live preview as I type, and download the result as a PNG. No server needed, pure browser.' },
            { role: 'claude', text: 'Love this project. Here is my plan before I write anything:\n\n1. File input to load an image onto an HTML Canvas\n2. Two text fields: top text and bottom text\n3. Canvas re-renders live as you type (white text, black stroke, Impact font)\n4. A Download button that calls canvas.toDataURL() and triggers a save\n\nAll of this runs 100% in the browser using the Canvas API. No libraries, no server, one file.\n\nShall I build it?' },
            { role: 'user', text: 'Yes, build it!' },
          ],
        },
      },
      {
        title: 'Watch it get built',
        description:
          'Claude writes the HTML, CSS, and Canvas API code all at once. Watch it create the file and explain what each piece does. The Canvas API is what lets you draw text on top of images in the browser.',
        demo: {
          title: 'Claude builds the meme generator',
          steps: [
            { type: 'out', text: 'Creating meme-generator.html...', delay: 300 },
            { type: 'out', text: 'Writing Canvas setup: 800x600 default size' },
            { type: 'out', text: 'Adding file reader: FileReader API for local images' },
            { type: 'out', text: 'Writing text renderer: Impact font, white fill, black stroke' },
            { type: 'out', text: 'Adding live preview: re-renders on every keystroke' },
            { type: 'out', text: 'Wiring download button: canvas.toDataURL("image/png")' },
            { type: 'success', text: 'Created meme-generator.html (187 lines)' },
            { type: 'warn', text: 'Open meme-generator.html in your browser to try it.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'claude', text: 'Here is your complete meme-generator.html. Save this file to your desktop and open it in any browser.\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Meme Generator</title>\n  <style>\n    body { font-family: sans-serif; max-width: 860px; margin: 2rem auto; padding: 1rem; background: #111; color: #fff; }\n    canvas { border: 2px solid #333; display: block; margin: 1rem 0; max-width: 100%; }\n    input[type=text] { width: 100%; padding: .5rem; margin: .25rem 0; font-size: 1rem; background: #222; color: #fff; border: 1px solid #444; border-radius: 4px; }\n    button { padding: .6rem 1.2rem; background: #e63; color: #fff; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <h1>Meme Generator</h1>\n  <input type="file" id="imgInput" accept="image/*">\n  <input type="text" id="topText" placeholder="TOP TEXT">\n  <input type="text" id="bottomText" placeholder="BOTTOM TEXT">\n  <canvas id="canvas" width="800" height="500"></canvas>\n  <button onclick="download()">Download Meme</button>\n  <script>\n    const canvas = document.getElementById("canvas");\n    const ctx = canvas.getContext("2d");\n    let img = null;\n    document.getElementById("imgInput").addEventListener("change", e => {\n      const reader = new FileReader();\n      reader.onload = ev => {\n        const image = new Image();\n        image.onload = () => { img = image; canvas.width = image.width; canvas.height = image.height; render(); };\n        image.src = ev.target.result;\n      };\n      reader.readAsDataURL(e.target.files[0]);\n    });\n    ["topText","bottomText"].forEach(id => document.getElementById(id).addEventListener("input", render));\n    function render() {\n      if (!img) return;\n      ctx.drawImage(img, 0, 0);\n      const fs = Math.floor(canvas.height / 10);\n      ctx.font = `bold ${fs}px Impact, Arial Black, sans-serif`;\n      ctx.fillStyle = "white"; ctx.strokeStyle = "black"; ctx.lineWidth = fs / 8; ctx.textAlign = "center";\n      const top = document.getElementById("topText").value.toUpperCase();\n      const bot = document.getElementById("bottomText").value.toUpperCase();\n      if (top) { ctx.strokeText(top, canvas.width/2, fs*1.1); ctx.fillText(top, canvas.width/2, fs*1.1); }\n      if (bot) { ctx.strokeText(bot, canvas.width/2, canvas.height - fs*.3); ctx.fillText(bot, canvas.width/2, canvas.height - fs*.3); }\n    }\n    function download() {\n      if (!img) return alert("Upload an image first!");\n      const a = document.createElement("a"); a.download = "meme.png"; a.href = canvas.toDataURL(); a.click();\n    }\n  <\/script>\n</body>\n</html>\n```\n\nSave as `meme-generator.html` and open in your browser. Upload a photo, type your text, hit Download.' },
          ],
        },
      },
      {
        title: 'Try it out',
        description:
          'Open the file in your browser. Upload any image from your computer, type something in the top and bottom text fields, and watch the preview update live. Then hit Download to save your masterpiece.',
        demo: {
          title: 'Opening your meme generator',
          steps: [
            { type: 'cmd', text: 'open meme-generator.html' },
            { type: 'out', text: 'Opening in browser...', delay: 400 },
            { type: 'success', text: 'Browser opened meme-generator.html' },
            { type: 'out', text: '' },
            { type: 'out', text: 'What to do next:' },
            { type: 'out', text: '  1. Click "Choose File" and pick any image' },
            { type: 'out', text: '  2. Type your TOP TEXT and BOTTOM TEXT' },
            { type: 'out', text: '  3. See the meme update live in the preview' },
            { type: 'out', text: '  4. Click Download to save your meme as PNG' },
            { type: 'warn', text: 'Try it: upload a photo of your cat and caption it.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I saved the file and opened it. The canvas is blank and nothing shows up when I type.' },
            { role: 'claude', text: 'You need to upload an image first. The canvas only renders once an image is loaded.\n\nSteps:\n1. Click the file input at the top\n2. Choose any image from your computer (JPG, PNG, WebP all work)\n3. Once the image appears on the canvas, start typing in the text fields\n\nThe preview updates live as you type. If you are on Safari and it still looks blank, try Chrome or Firefox.' },
            { role: 'user', text: 'Works! I uploaded a photo and the text appeared instantly. This is amazing.' },
            { role: 'claude', text: 'That is the Canvas API doing its thing. Every time you type a character, it redraws the entire canvas: image first, then text on top. The white fill and black stroke is the classic meme look (Impact font, outlined text).\n\nWant to make it better?' },
          ],
        },
      },
      {
        title: 'Make it better',
        description:
          'The basic version works. Now let\'s make it great. Ask Claude to add more features: a font size slider, a color picker for text, built-in meme templates, or the ability to drag text anywhere on the image.',
        code: {
          snippet: `Add these features to my meme generator:
1. A font size slider (20px to 120px)
2. A text color picker (default white)
3. Three preset meme templates I can click to load
4. Drag-and-drop to reposition text on the canvas`,
          language: 'text',
        },
        demo: {
          title: 'Adding features',
          steps: [
            { type: 'cmd', text: '"Add a font size slider, color picker, 3 meme templates..."', delay: 200 },
            { type: 'out', text: 'Reading meme-generator.html...', delay: 500 },
            { type: 'out', text: 'Adding font size slider: range input 20-120px' },
            { type: 'out', text: 'Adding color picker: input[type=color] for text fill' },
            { type: 'out', text: 'Adding template buttons: preset images with captions' },
            { type: 'out', text: 'Adding drag support: mousedown, mousemove, mouseup events' },
            { type: 'success', text: 'Updated meme-generator.html with 4 new features' },
            { type: 'warn', text: 'Reload the page in your browser to see the updates.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Can you add a font size slider (20 to 120px) and a text color picker to my meme generator?' },
            { role: 'claude', text: 'Add these controls after your bottom text input:\n\n```html\n<label>Font Size: <span id="sizeVal">60</span>px\n  <input type="range" id="fontSize" min="20" max="120" value="60"\n    oninput="document.getElementById(\'sizeVal\').textContent=this.value;render()">\n</label>\n<label>Text Color:\n  <input type="color" id="textColor" value="#ffffff" oninput="render()">\n</label>\n```\n\nThen in your render() function, replace the hardcoded font size and fill color lines with:\n\n```javascript\nconst fs = parseInt(document.getElementById("fontSize").value);\nctx.fillStyle = document.getElementById("textColor").value;\n```\n\nNow the slider and color picker control the text in real time.' },
            { role: 'user', text: 'Perfect. Can you also add a few built-in meme templates?' },
            { role: 'claude', text: 'Add template buttons above the canvas:\n\n```html\n<div style="display:flex;gap:.5rem;margin:.5rem 0;flex-wrap:wrap">\n  <button onclick="loadTemplate(\'https://i.imgflip.com/30b1gx.jpg\',\'ONE DOES NOT SIMPLY\',\'WALK INTO MORDOR\')">One Does Not Simply</button>\n  <button onclick="loadTemplate(\'https://i.imgflip.com/1bij.jpg\',\'NOT SURE IF\',\'OR JUST BEING DRAMATIC\')">Not Sure If</button>\n  <button onclick="loadTemplate(\'https://i.imgflip.com/zow0h.jpg\',\'CHANGE MY MIND\',\'\')">Change My Mind</button>\n</div>\n```\n\nAnd add this function to your script:\n\n```javascript\nfunction loadTemplate(url, top, bottom) {\n  document.getElementById("topText").value = top;\n  document.getElementById("bottomText").value = bottom;\n  const image = new Image();\n  image.crossOrigin = "anonymous";\n  image.onload = () => { img = image; canvas.width = image.width; canvas.height = image.height; render(); };\n  image.src = url;\n}\n```\n\nClick any button and it loads the image with pre-filled captions ready to customise.' },
          ],
        },
      },
      {
        title: 'Save your favorites',
        description:
          'The Download button saves one meme at a time. But what if you want a gallery? Ask Claude to add a "Save to Gallery" feature that keeps your creations in the same page so you can browse and re-download them anytime.',
        code: {
          snippet: `Add a meme gallery below the canvas.
When I click "Save to Gallery", the current meme gets
added to a grid of thumbnail previews below.
Clicking a thumbnail downloads it again.
Keep the gallery in memory (no server needed).`,
          language: 'text',
        },
        demo: {
          title: 'Adding the gallery',
          steps: [
            { type: 'cmd', text: '"Add a meme gallery below the canvas..."', delay: 200 },
            { type: 'out', text: 'Adding gallery array: stores canvas.toDataURL() snapshots', delay: 500 },
            { type: 'out', text: 'Adding Save to Gallery button: captures current canvas state' },
            { type: 'out', text: 'Rendering thumbnails: img grid with click-to-download' },
            { type: 'success', text: 'Gallery feature added. 0 memes saved (go make some!)' },
            { type: 'warn', text: 'Gallery resets on refresh. Want localStorage? Just ask.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Can you add a "Save to Gallery" button that keeps all my memes on the page so I can download them later?' },
            { role: 'claude', text: 'Here are the two pieces you need.\n\nAdd a gallery section to the HTML:\n\n```html\n<button onclick="saveToGallery()">Save to Gallery</button>\n<div id="gallery" style="display:flex;flex-wrap:wrap;gap:1rem;margin-top:1.5rem"></div>\n```\n\nAdd this function to your script:\n\n```javascript\nconst savedMemes = [];\n\nfunction saveToGallery() {\n  if (!img) return alert("Upload an image first!");\n  const dataUrl = canvas.toDataURL("image/png");\n  savedMemes.push(dataUrl);\n  const thumb = document.createElement("img");\n  thumb.src = dataUrl;\n  thumb.style = "width:160px;height:auto;cursor:pointer;border:2px solid #333;border-radius:4px";\n  thumb.title = "Click to download";\n  thumb.onclick = () => { const a = document.createElement("a"); a.download = `meme-${savedMemes.length}.png`; a.href = dataUrl; a.click(); };\n  document.getElementById("gallery").appendChild(thumb);\n}\n```\n\nEach time you click Save to Gallery, a thumbnail appears below. Click any thumbnail to re-download it.' },
            { role: 'user', text: 'Can you make the gallery persist across page refreshes with localStorage?' },
            { role: 'claude', text: 'Replace the savedMemes array and saveToGallery function with this version:\n\n```javascript\nlet savedMemes = JSON.parse(localStorage.getItem("memeGallery") || "[]");\n\nfunction renderGallery() {\n  const container = document.getElementById("gallery");\n  container.innerHTML = "";\n  savedMemes.forEach((dataUrl, i) => {\n    const thumb = document.createElement("img");\n    thumb.src = dataUrl;\n    thumb.style = "width:160px;height:auto;cursor:pointer;border:2px solid #333;border-radius:4px";\n    thumb.title = "Click to download";\n    thumb.onclick = () => { const a = document.createElement("a"); a.download = `meme-${i+1}.png`; a.href = dataUrl; a.click(); };\n    container.appendChild(thumb);\n  });\n}\n\nfunction saveToGallery() {\n  if (!img) return alert("Upload an image first!");\n  savedMemes.push(canvas.toDataURL("image/png"));\n  localStorage.setItem("memeGallery", JSON.stringify(savedMemes));\n  renderGallery();\n}\n\nrenderGallery();\n```\n\nNow your gallery survives page refreshes. Saved memes load automatically when you reopen the file.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Next: Build a Spotify Playlist Analyzer',
      href: '/tutorials/playlist-analyzer',
    },
  },

  'playlist-analyzer': {
    title: 'Build a Spotify Playlist Analyzer',
    slug: 'playlist-analyzer',
    duration: '10 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'terminal'],
    description:
      'Paste your playlist. Get stats on mood, energy, tempo patterns, and a vibe summary you can share.',
    intro:
      'You know your playlist has a vibe. You feel it. But what IS it? In this tutorial, you will paste a list of songs and Claude will analyze the mood, energy, and patterns, then build you a visual breakdown and a shareable playlist personality card. No Spotify API needed. No code. Just music.',
    steps: [
      {
        title: 'Grab your playlist',
        description:
          'Go to Spotify and copy a playlist link, or just list some songs with their artists. Claude works from either. The more songs you give it, the richer the analysis. A good sweet spot is 10 to 30 songs.',
        demo: {
          title: 'Gather your songs',
          steps: [
            { type: 'cmd', text: 'claude' },
            { type: 'success', text: 'Claude Code ready' },
            { type: 'cmd', text: '"Analyze my playlist: Blinding Lights - The Weeknd, As It Was - Harry Styles, Levitating - Dua Lipa, Golden Hour - JVKE, Unholy - Sam Smith, Anti-Hero - Taylor Swift, Bad Guy - Billie Eilish, Watermelon Sugar - Harry Styles, Stay - The Kid LAROI, Peaches - Justin Bieber"', delay: 600 },
            { type: 'out', text: 'Analyzing 10 tracks...', delay: 800 },
            { type: 'out', text: 'Mood mapping: pop-forward, emotional range mixed' },
            { type: 'out', text: 'Energy distribution: high 60%, mid 30%, low 10%' },
            { type: 'success', text: 'Analysis complete. Building visual breakdown...' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to analyze my Spotify playlist. Can I just give you a list of songs and artists?' },
            { role: 'claude', text: 'Absolutely. Just paste your song list (name + artist is enough) and I will analyze the vibe, mood, energy levels, and tempo patterns across your whole playlist.\n\nNote: I work from my knowledge of these tracks, not live Spotify data, so well-known songs will get the richest analysis. Go ahead and paste your list.' },
          ],
        },
      },
      {
        title: 'Ask Claude to analyze',
        description:
          'Paste your playlist and ask Claude for a full breakdown. Be specific: mood, energy, tempo, emotional arc. The more specific your ask, the better the output. You can copy the prompt below.',
        code: {
          snippet: `Analyze this playlist and give me:
1. Overall vibe / mood (2-3 words)
2. Energy level breakdown (high / mid / low percentages)
3. Tempo feel (uptempo, midtempo, downtempo mix)
4. Emotional arc (does it rise, fall, or stay consistent?)
5. Any surprising patterns you notice

Playlist:
Blinding Lights - The Weeknd
As It Was - Harry Styles
Levitating - Dua Lipa
Golden Hour - JVKE
Unholy - Sam Smith
Anti-Hero - Taylor Swift
Bad Guy - Billie Eilish
Watermelon Sugar - Harry Styles
Stay - The Kid LAROI
Peaches - Justin Bieber`,
          language: 'text',
        },
        demo: {
          title: 'Claude reads your playlist',
          steps: [
            { type: 'out', text: 'Reading playlist...', delay: 400 },
            { type: 'out', text: 'Cross-referencing 10 tracks with known audio profiles' },
            { type: 'out', text: '' },
            { type: 'out', text: 'Overall vibe: feel-good confidence' },
            { type: 'out', text: 'Energy: high 60% / mid 30% / chill 10%' },
            { type: 'out', text: 'Tempo: mostly uptempo with a few midtempo breathers' },
            { type: 'out', text: 'Emotional arc: peaks early, stays elevated, softens at end' },
            { type: 'out', text: 'Pattern spotted: 4 of 10 tracks lean into nostalgic synthpop' },
            { type: 'success', text: 'Analysis ready. Now building your HTML visual...' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Here is my playlist:\nBlinding Lights - The Weeknd\nAs It Was - Harry Styles\nLevitating - Dua Lipa\nGolden Hour - JVKE\nUnholy - Sam Smith\nAnti-Hero - Taylor Swift\nBad Guy - Billie Eilish\nWatermelon Sugar - Harry Styles\nStay - The Kid LAROI\nPeaches - Justin Bieber\n\nGive me mood, energy breakdown, tempo feel, emotional arc, and any patterns you notice.' },
            { role: 'claude', text: 'Here is your playlist analysis:\n\nOverall vibe: feel-good confidence with an emotional undercurrent.\n\nEnergy breakdown:\n- High energy: 60% (Blinding Lights, Levitating, Bad Guy, Stay)\n- Mid energy: 30% (Anti-Hero, Unholy, Watermelon Sugar)\n- Low/chill: 10% (Golden Hour)\n\nTempo feel: Mostly uptempo. This is a playlist that moves.\n\nEmotional arc: Peaks hard early with The Weeknd, maintains confidence through the middle, and softens slightly toward the end with Peaches and Golden Hour.\n\nPattern spotted: 4 of 10 tracks lean heavily into 80s-influenced synthpop production (Blinding Lights, Levitating, As It Was, Watermelon Sugar). Your playlist has a nostalgia thread running through it even when the lyrics are present-tense.\n\nReady to build your visual breakdown?' },
          ],
        },
      },
      {
        title: 'Get a visual breakdown',
        description:
          'Now ask Claude to turn that analysis into an HTML page with simple visual charts. It will use pure HTML and CSS, no complex libraries, so you can open it in any browser instantly.',
        code: {
          snippet: `Now build me an HTML page with:
- A bar chart showing energy distribution (high/mid/low)
- A mood color palette (colors that match the vibe)
- A list of the detected patterns
- Clean, dark design with a music feel

Use only HTML and CSS. No external libraries. I want to open it in my browser right now.`,
          language: 'text',
        },
        demo: {
          title: 'Claude builds your chart page',
          steps: [
            { type: 'cmd', text: 'claude "Build me an HTML visual breakdown of this analysis. Dark theme, bar charts for energy, mood color swatches, no external libraries."' },
            { type: 'out', text: 'Building HTML page...', delay: 600 },
            { type: 'out', text: 'Creating energy distribution bar chart with CSS' },
            { type: 'out', text: 'Generating mood color palette: #1a1a2e, #e94560, #f5a623' },
            { type: 'out', text: 'Adding pattern cards and arc visualization' },
            { type: 'success', text: 'Created playlist-analysis.html' },
            { type: 'warn', text: 'Open in browser: open playlist-analysis.html' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Build me an HTML page with a visual breakdown. Dark theme, bar chart for energy distribution, mood color palette, detected patterns listed. Pure HTML and CSS only, no libraries.' },
            { role: 'claude', text: 'Here is your HTML page. Copy all of this and save it as `playlist-analysis.html`, then open it in your browser.\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Playlist Analysis</title>\n  <style>\n    body { background: #0d0d0d; color: #e0e0e0; font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }\n    h1 { font-size: 1.5rem; color: #fff; }\n    .vibe { font-size: 2rem; font-weight: bold; color: #e94560; margin: 8px 0; }\n    .bar-wrap { margin: 24px 0; }\n    .bar-label { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px; }\n    .bar { height: 24px; border-radius: 4px; margin-bottom: 8px; }\n    .bar.high { width: 60%; background: #e94560; }\n    .bar.mid { width: 30%; background: #f5a623; }\n    .bar.low { width: 10%; background: #4ecdc4; }\n    .palette { display: flex; gap: 8px; margin: 24px 0; }\n    .swatch { width: 48px; height: 48px; border-radius: 8px; }\n    .patterns li { margin: 6px 0; font-size: 0.9rem; }\n  </style>\n</head>\n<body>\n  <h1>Your Playlist Vibe</h1>\n  <div class="vibe">feel-good confidence</div>\n  <div class="bar-wrap">\n    <h2>Energy Distribution</h2>\n    <div class="bar-label"><span>High</span><span>60%</span></div>\n    <div class="bar high"></div>\n    <div class="bar-label"><span>Mid</span><span>30%</span></div>\n    <div class="bar mid"></div>\n    <div class="bar-label"><span>Chill</span><span>10%</span></div>\n    <div class="bar low"></div>\n  </div>\n  <h2>Mood Palette</h2>\n  <div class="palette">\n    <div class="swatch" style="background:#e94560"></div>\n    <div class="swatch" style="background:#f5a623"></div>\n    <div class="swatch" style="background:#4ecdc4"></div>\n    <div class="swatch" style="background:#1a1a2e"></div>\n  </div>\n  <h2>Patterns</h2>\n  <ul class="patterns">\n    <li>4 of 10 tracks lean into 80s-influenced synthpop</li>\n    <li>Nostalgic thread runs through present-tense lyrics</li>\n    <li>Emotional arc peaks early, stays high, softens at end</li>\n  </ul>\n</body>\n</html>\n```\n\nSave it, open it in Chrome, and you will see your visual breakdown.' },
          ],
        },
      },
      {
        title: 'Generate your vibe summary',
        description:
          'This is the fun part. Ask Claude for a shareable "playlist personality" card with a punchy headline, your stats, and a one-liner description of your musical taste. This is the bit you screenshot and send to your friends.',
        code: {
          snippet: `Now give me a "Playlist Personality" card I can screenshot and share:
- A bold title like "The Nostalgic Hypeman"
- 3 stat badges (e.g. 60% High Energy, 40% Synthpop Vibes)
- A one-liner that captures my taste in a roast-friendly way
- Make it look great in a dark card format, still HTML/CSS only`,
          language: 'text',
        },
        demo: {
          title: 'Your shareable personality card',
          steps: [
            { type: 'cmd', text: 'claude "Generate a shareable playlist personality card. Bold title, 3 stat badges, a roast-friendly one-liner. Dark card, HTML/CSS only."' },
            { type: 'out', text: 'Generating personality card...', delay: 500 },
            { type: 'out', text: 'Title: "The Nostalgic Hypeman"' },
            { type: 'out', text: 'Stat 1: 60% High Energy' },
            { type: 'out', text: 'Stat 2: 40% Synthpop Soul' },
            { type: 'out', text: 'Stat 3: 100% Main Character Energy' },
            { type: 'out', text: 'One-liner: "You cry to 80s beats while pretending you\'re fine."' },
            { type: 'success', text: 'Card added to playlist-analysis.html' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Add a shareable Playlist Personality card to the HTML. Bold title, 3 stat badges, and a roast-friendly one-liner about my taste. Keep it dark, HTML/CSS only.' },
            { role: 'claude', text: 'Updated. Here is the personality card section to add just before `</body>`:\n\n```html\n<div style="border: 1px solid #333; border-radius: 12px; padding: 24px; margin-top: 32px; text-align: center;">\n  <div style="font-size: 0.75rem; letter-spacing: 0.1em; color: #888; text-transform: uppercase; margin-bottom: 8px;">Playlist Personality</div>\n  <div style="font-size: 2rem; font-weight: 900; color: #fff; line-height: 1.1;">The Nostalgic<br>Hypeman</div>\n  <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0; flex-wrap: wrap;">\n    <span style="background: #e94560; border-radius: 20px; padding: 6px 14px; font-size: 0.8rem; font-weight: 600;">60% High Energy</span>\n    <span style="background: #7b2fd4; border-radius: 20px; padding: 6px 14px; font-size: 0.8rem; font-weight: 600;">40% Synthpop Soul</span>\n    <span style="background: #f5a623; color: #000; border-radius: 20px; padding: 6px 14px; font-size: 0.8rem; font-weight: 600;">100% Main Character</span>\n  </div>\n  <div style="color: #aaa; font-style: italic; font-size: 0.9rem;">"You cry to 80s beats while pretending you\'re absolutely fine."</div>\n</div>\n```\n\nScreenshot that section and send it to your group chat.' },
          ],
        },
      },
      {
        title: 'Get recommendations',
        description:
          'Finish strong. Ask Claude for songs that would fit your playlist\'s vibe perfectly. This is where it gets genuinely useful: you will walk away with a real list of tracks to add.',
        code: {
          snippet: `Based on this playlist's vibe (feel-good confidence, synthpop-leaning, high energy, nostalgic undertone), recommend 5 songs I might be missing that would fit perfectly. Tell me why each one fits.`,
          language: 'text',
        },
        demo: {
          title: 'Your vibe-matched recommendations',
          steps: [
            { type: 'cmd', text: 'claude "Recommend 5 songs that fit this playlist\'s vibe. Explain why each fits."' },
            { type: 'out', text: 'Matching recommendations to vibe profile...', delay: 600 },
            { type: 'out', text: '' },
            { type: 'out', text: '1. Midnight Rain - Taylor Swift' },
            { type: 'out', text: '   Synthpop production, nostalgic tone, fits the arc perfectly' },
            { type: 'out', text: '' },
            { type: 'out', text: '2. Don\'t Start Now - Dua Lipa' },
            { type: 'out', text: '   Disco-influenced uptempo, same confidence energy' },
            { type: 'out', text: '' },
            { type: 'out', text: '3. Save Your Tears - The Weeknd' },
            { type: 'out', text: '   80s synthwave, bridges your existing Weeknd track' },
            { type: 'out', text: '' },
            { type: 'out', text: '4. Heat Waves - Glass Animals' },
            { type: 'out', text: '   Indie-pop warmth, great midtempo break for the flow' },
            { type: 'out', text: '' },
            { type: 'out', text: '5. Electricity - Silk City ft. Dua Lipa' },
            { type: 'out', text: '   Pure euphoric energy, completes the vibe loop' },
            { type: 'success', text: 'Done. Your playlist just got 5 tracks better.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'Based on the vibe you just analyzed (feel-good confidence, synthpop-leaning, high energy, nostalgic undertone), recommend 5 songs I might be missing. Tell me why each one fits.' },
            { role: 'claude', text: 'Here are 5 tracks that would slot right into your playlist:\n\n1. Midnight Rain by Taylor Swift: The synthpop production and nostalgic vs. present-day tension matches your playlist\'s emotional thread. It would sit perfectly after Anti-Hero.\n\n2. Don\'t Start Now by Dua Lipa: Disco-influenced uptempo energy with the same confident, unbothered tone as Levitating. Natural companion.\n\n3. Save Your Tears by The Weeknd: 80s synthwave, emotionally ambiguous lyrics, bridges your existing Weeknd track without repeating it.\n\n4. Heat Waves by Glass Animals: Warm indie-pop. It gives your playlist a midtempo breather with real emotional weight, similar to what Golden Hour does but with more drive.\n\n5. Electricity by Silk City feat. Dua Lipa: Pure euphoric house energy. If you want a peak-energy moment at the end of a workout or a night out, this is it.\n\nAdd any of these to Spotify and your playlist\'s vibe becomes even more intentional.' },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Build Your First CLAUDE.md in 5 Minutes',
      href: '/tutorials/your-first-claude-md',
    },
  },

  'quiz-game': {
    title: 'Build a Quiz Game About Anything',
    slug: 'quiz-game',
    duration: '10 min',
    difficulty: 'beginner',
    availableRoutes: ['app', 'terminal'],
    description:
      'Tell Claude a topic. Get a fully playable quiz with scoring, hints, and multiple choice. No coding required. Zero setup. Just vibes.',
    intro:
      "You are going to build a real game. Not a prototype, not a mockup: an actual playable quiz you can open in your browser right now. Pick literally any topic (world history, Taylor Swift albums, Premier League trivia, your favorite TV show, whatever) and Claude will write all the code for you. Ten minutes from now, you will be playing something you built.",
    steps: [
      {
        title: 'Pick your topic',
        description:
          "The best quiz games are about something you actually care about. Think of a topic you know well, or one your friends would enjoy. It can be as broad as \"world geography\" or as specific as \"SpongeBob SquarePants episodes from season 3\". The more specific, the more fun. You are going to tell Claude exactly what you want.",
        demo: {
          title: 'Ideas for quiz topics',
          steps: [
            { type: 'out', text: 'Some ideas to get you started:' },
            { type: 'out', text: '' },
            { type: 'out', text: '  Classic: World capitals, science facts, history dates' },
            { type: 'out', text: '  Pop culture: Marvel movies, Taylor Swift, The Office' },
            { type: 'out', text: '  Niche: Your city, your football club, your pet breed' },
            { type: 'out', text: '  Weird: Obscure 90s cartoons, fast food menu items' },
            { type: 'out', text: '' },
            { type: 'warn', text: 'Pro tip: the weirder the topic, the more shareable the quiz.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I want to build a quiz game. What topics work well?' },
            { role: 'claude', text: "Almost anything works! Here are a few angles:\n\nBroad topics are great for parties: world geography, science trivia, history, movies.\n\nNiche topics are more fun to share: a specific TV show, your city, a sports team, a music artist.\n\nPersonal topics are hilarious: inside jokes for friend groups, office trivia about your team.\n\nWhat do you want to quiz people on? Once you tell me, I will build the whole thing in one go." },
          ],
        },
      },
      {
        title: 'Generate the game',
        description:
          "One prompt. That is all it takes. Describe your quiz topic to Claude and ask for a self-contained HTML quiz game with multiple choice questions, scoring, a hints system, and a results screen. Claude will write everything: the HTML structure, the CSS styling, and the JavaScript logic. You do not need to touch any code.",
        code: {
          snippet: `claude "Build me a self-contained HTML quiz game about The Office (US TV show).
Include:
- 10 multiple choice questions with 4 options each
- A scoring system that tracks correct answers
- A hint button for each question (costs 1 point to use)
- A results screen at the end with a rating based on score
- Fun, colorful styling that fits the Office theme
- A restart button

Put everything in one file called office-quiz.html"`,
          language: 'bash',
        },
        demo: {
          title: 'Claude builds your quiz',
          steps: [
            { type: 'cmd', text: 'claude "Build me an HTML quiz game about The Office..."' },
            { type: 'out', text: 'Reading prompt...', delay: 400 },
            { type: 'out', text: 'Planning: 10 questions, 4 options each, hint system...', delay: 600 },
            { type: 'out', text: 'Writing HTML structure...' },
            { type: 'out', text: 'Writing CSS (Office-themed colors, progress bar)...', delay: 500 },
            { type: 'out', text: 'Writing JavaScript (scoring, hints, results logic)...', delay: 700 },
            { type: 'success', text: 'Created office-quiz.html (487 lines)' },
            { type: 'warn', text: 'Open it in your browser to play!' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: "Build me a self-contained HTML quiz game about The Office (US TV show). Include 10 multiple choice questions with 4 options each, a scoring system, a hint button that costs 1 point, and a fun results screen at the end. Everything in one file called office-quiz.html." },
            { role: 'claude', text: "Here is your complete quiz game. Save this as `office-quiz.html` and open it in any browser. No installation, no server, works completely offline.\n\nThe file includes:\n- 10 The Office trivia questions with 4 options each\n- A score tracker that starts at 10 and goes up for correct answers\n- A hint button per question that reveals a clue (costs 1 point)\n- A progress bar showing how far through the quiz you are\n- A results screen at the end with a rating (\"Dunder Mifflin Employee of the Month\" for top scores)\n- A restart button to play again\n\nThe whole thing is styled with The Office color palette: navy blue, warm white, and muted greys.\n\n[full HTML file ready to copy]" },
          ],
        },
      },
      {
        title: 'Play it yourself',
        description:
          "Open the file in your browser and play through it. Try every feature: answer a question correctly, answer one wrong, use a hint, reach the results screen. This is the most important step because you are about to ask Claude to customize it, and you need to know what is already working.",
        code: {
          snippet: `# On Mac
open office-quiz.html

# On Windows
start office-quiz.html

# Or just drag the file into any browser window`,
          language: 'bash',
        },
        demo: {
          title: 'Opening your quiz in the browser',
          steps: [
            { type: 'cmd', text: 'open office-quiz.html' },
            { type: 'success', text: 'Opened in Chrome', delay: 400 },
            { type: 'out', text: '' },
            { type: 'out', text: 'The Office Quiz' },
            { type: 'out', text: 'Question 1 of 10 | Score: 10' },
            { type: 'out', text: '' },
            { type: 'out', text: 'What is the name of the paper company in The Office?' },
            { type: 'out', text: '  (A) Dunder Mifflin' },
            { type: 'out', text: '  (B) Staples Inc.' },
            { type: 'out', text: '  (C) Paper King' },
            { type: 'out', text: '  (D) Scott Paper Co.' },
            { type: 'success', text: 'It actually works. You built this.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'I saved the file and opened it in Chrome. It works! How do I open it on my phone to show friends?' },
            { role: 'claude', text: "A few easy options:\n\n1. AirDrop the file (iPhone and Mac): Right-click the file, Share, AirDrop to your phone. Open it in Safari.\n\n2. Email it to yourself: The file is tiny, it will attach fine. Open the email on your phone and tap the attachment.\n\n3. WhatsApp or Telegram: Send the HTML file as a document. The other person downloads it and opens it in their browser.\n\n4. Deploy it free (takes 2 minutes): In the next step, I will show you how to put it on the internet with a shareable link.\n\nWhich of these sounds most useful right now?" },
          ],
        },
      },
      {
        title: 'Customize it',
        description:
          "The quiz works. Now make it yours. You can ask Claude to add a countdown timer, difficulty levels, more questions on the same topic, a different visual theme, sound effects (yes, really), or a high score tracker that saves between plays. Each customization is one conversation message.",
        code: {
          snippet: `# Add a countdown timer
claude "Add a 20-second countdown timer to office-quiz.html.
Show it visually with a color that turns red when under 5 seconds.
If time runs out, auto-advance to the next question and mark it wrong."

# Add difficulty levels
claude "Add an Easy/Medium/Hard selector at the start of office-quiz.html.
Easy: 30 seconds per question, hints cost nothing.
Medium: 20 seconds, hints cost 1 point (current behavior).
Hard: 10 seconds, no hints allowed."

# Change the theme
claude "Restyle office-quiz.html to look like the Dunder Mifflin website.
Use their navy blue and grey color scheme. Add the company logo as text at the top."`,
          language: 'bash',
        },
        demo: {
          title: 'Adding a countdown timer',
          steps: [
            { type: 'cmd', text: 'claude "Add a 20-second countdown timer to office-quiz.html"' },
            { type: 'out', text: 'Reading office-quiz.html...', delay: 400 },
            { type: 'out', text: 'Adding timer state variable...' },
            { type: 'out', text: 'Adding setInterval for countdown...' },
            { type: 'out', text: 'Adding visual timer bar with color transitions...' },
            { type: 'out', text: 'Adding auto-advance logic on timeout...' },
            { type: 'success', text: 'Updated office-quiz.html' },
            { type: 'warn', text: 'Refresh your browser. Timer starts immediately.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'The quiz is working great. Can you add: a countdown timer (20 seconds per question), a difficulty selector at the start, and make it save your high score even after you close the browser?' },
            { role: 'claude', text: "Yes to all three. Here is what each one does:\n\nCountdown timer: A progress bar under each question counts down from 20 seconds. It turns orange at 10 seconds and red at 5. If time runs out, the question is marked wrong and the next one loads automatically.\n\nDifficulty selector: A screen appears before the quiz starts. Easy gives you 30 seconds and free hints. Medium is the current setup (20 seconds, hints cost 1 point). Hard gives you 10 seconds and disables hints entirely.\n\nHigh score storage: Using localStorage, your best score is saved in the browser and shown on the results screen. It persists between sessions with no server required.\n\nUpdated file below. Replace your current office-quiz.html with it." },
          ],
        },
      },
      {
        title: 'Share it',
        description:
          "A quiz that nobody else plays is a waste. The simplest option: email the HTML file directly. It is a single file with no server needed, and anyone can open it. For a shareable link you can post anywhere, Vercel and Netlify both deploy static HTML files for free in about two minutes.",
        code: {
          snippet: `# Option 1: Deploy to Vercel (get a shareable link)
npx vercel office-quiz.html

# Option 2: Netlify Drop (no account needed)
# 1. Go to app.netlify.com/drop
# 2. Drag and drop your office-quiz.html file
# 3. Get a link instantly

# Option 3: GitHub Pages (free, permanent)
# 1. Create a repo on github.com
# 2. Upload office-quiz.html as the main file
# 3. Go to Settings > Pages > Deploy from main branch
# 4. Your URL: https://yourusername.github.io/your-repo-name`,
          language: 'bash',
        },
        demo: {
          title: 'Deploying to Vercel',
          steps: [
            { type: 'cmd', text: 'npx vercel office-quiz.html' },
            { type: 'out', text: 'Vercel CLI 37.x', delay: 300 },
            { type: 'out', text: 'Deploying office-quiz.html...', delay: 600 },
            { type: 'success', text: 'Build complete' },
            { type: 'success', text: 'Deployed to: https://office-quiz-abc123.vercel.app' },
            { type: 'warn', text: 'Share that link anywhere. It works on every device.' },
          ],
        },
        appDemo: {
          steps: [
            { role: 'user', text: 'How do I put this quiz online so I can share a link? I do not have any hosting set up.' },
            { role: 'claude', text: "Netlify Drop is the fastest path with zero setup:\n\n1. Go to app.netlify.com/drop in your browser\n2. Drag your office-quiz.html file onto the page\n3. Wait about 10 seconds\n4. Copy the link they give you\n\nThat is it. No account needed (though creating a free account lets you keep the URL forever). The link works on any device, including phones.\n\nIf you want a custom URL like `my-office-quiz.netlify.app`, create a free account, upload the file, and rename the site in settings.\n\nWant to go a step further and give the quiz its own domain name? That would take about 20 more minutes." },
          ],
        },
      },
    ],
    nextLink: {
      label: 'Build a meme generator',
      href: '/tutorials/meme-generator',
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

  const canonicalUrl = `https://claudecodeguide.dev/tutorials/${slug}`;
  const seoTitle = tutorial.title.includes('Claude Code')
    ? tutorial.title
    : `${tutorial.title} | Claude Code Tutorial`;

  return {
    title: seoTitle,
    description: tutorial.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: seoTitle,
      description: tutorial.description,
      type: 'article',
      url: canonicalUrl,
      images: [{ url: '/og-home.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: tutorial.description,
      images: ['/og-home.png'],
    },
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

              {/* Demo : renders appropriate variant based on selected route */}
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
