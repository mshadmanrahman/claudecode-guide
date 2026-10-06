import type { Tutorial } from "@/lib/tutorials";
import type { Translation } from "@/lib/i18n/bn/tutorials";

export const BN_TUTORIALS_G1: Partial<Record<string, Translation<Tutorial>>> = {
  "your-first-claude-md": {
    sourceHash: "092f089e7c3c68a6",
    translatedAt: "2026-10-06",
    content: {
      title: "৫ মিনিটে আপনার প্রথম CLAUDE.md বানান",
      slug: "your-first-claude-md",
      duration: "৫ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "terminal", "ide"],
      description:
        "Claude Code-এ আপনি সবচেয়ে জরুরি যে কাজটা করতে পারেন। এমন একটা file বানান, যেটা Claude-কে generic থেকে একদম আপনার মতো করে তোলে।",
      intro:
        "CLAUDE.md file হলো Claude-এর জন্য একটা briefing doc। এতে Claude জানতে পারে আপনি কে, আপনার project কী, আর আপনি কীভাবে কাজ করতে পছন্দ করেন। এটা না থাকলে Claude প্রতিটা conversation একদম শুরু থেকে শুরু করে। থাকলে Claude আগে থেকেই পুরো ব্যাপারটা জানে। চলুন একটা বানাই।",
      steps: [
        {
          title: "শুরুর জায়গায় চলে যান",
          description:
            "আপনি যে project-এ কাজ করছেন, সেটা বেছে নিন। side project, অফিসের repo, যেকোনোটা। আমাদের শুধু Claude-কে ঠিক জায়গায় নিয়ে যেতে হবে।",
          code: {
            snippet: "cd ~/my-project",
            language: "bash",
          },
          demo: {
            title: "আপনার project-এ যান",
            steps: [
              { type: "cmd", text: "cd ~/my-project" },
              { type: "cmd", text: "ls", delay: 400 },
              {
                type: "out",
                text: "README.md  src/  package.json  tsconfig.json",
              },
              { type: "success", text: "ঢুকে পড়েছেন। চলুন শুরু করি।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "এই project-এ কী কী আছে?" },
              { kind: "thinking", verb: "Exploring", ms: 800 },
              { kind: "tool", name: "Bash", arg: "ls", result: "README.md  src/  package.json  tsconfig.json" },
              { kind: "tool", name: "Read", arg: "package.json", result: "Read 34 lines" },
              {
                kind: "say",
                text: "TypeScript, Tailwind আর Prisma দিয়ে বানানো একটা Next.js 16 app।\nএখনও কোনো CLAUDE.md নেই, তাই প্রতিটা session কোনো context ছাড়াই শুরু হয়।\n/init চালান, যা পাই তা থেকে আমি একটা লিখে দেব।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি আমার project-এর জন্য একটা CLAUDE.md file setup করতে চাই। এটা TypeScript দিয়ে বানানো একটা Next.js app। কোথা থেকে শুরু করব?",
              },
              {
                role: "claude",
                text: "শুরু করার জন্য একদম ঠিক জায়গা। CLAUDE.md থাকে আপনার project root-এ, আর আপনার codebase নিয়ে আমি কীভাবে কাজ করব, সেটা ঠিকঠাক বলে দেয়।\n\nআরেকটু বলুন:\n1. project-টা কী করে?\n2. আপনার team কোনো নির্দিষ্ট pattern বা convention মেনে চলে?\n3. কোন কাজ আমি সব সময় করব, আর কোনটা কখনো করব না?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমি এই project-এর জন্য একটা CLAUDE.md setup করতে চাই। আমার file-গুলো দেখে একটা বানিয়ে দিতে পারবেন?",
              },
              {
                role: "claude",
                text: "আপনার project structure দেখতে পাচ্ছি। Next.js 16, TypeScript, Tailwind, আর database layer-এর জন্য Prisma।\n\nযা দেখছি সেটা থেকে একটা CLAUDE.md বানাচ্ছি। আপনার key file-গুলো পড়তে একটু সময় দিন।",
              },
            ],
          },
        },
        {
          title: "আপনার CLAUDE.md বানিয়ে নিন",
          description:
            "terminal-এ একটা command-ই সব করে দেয়। app বা IDE-তে আপনি project-এর কথা বলবেন, আর Claude আপনার জন্য লিখে দেবে।",
          code: {
            snippet: "claude /init",
            language: "bash",
          },
          demo: {
            title: "Claude আপনার project scan করছে",
            steps: [
              { type: "cmd", text: "claude /init" },
              { type: "out", text: "Scanning project structure...", delay: 600 },
              {
                type: "out",
                text: "Detected: Next.js 16, TypeScript, Tailwind CSS",
              },
              { type: "out", text: "Found: 23 source files, 4 config files" },
              { type: "out", text: "Analyzing package.json dependencies..." },
              { type: "success", text: "Created CLAUDE.md with project context" },
              {
                type: "success",
                text: "Added build commands: npm run dev, npm run build",
              },
              { type: "success", text: "Added testing setup: vitest detected" },
              {
                type: "warn",
                text: "Tip: CLAUDE.md খুলে আপনার নিজের preference-গুলো যোগ করুন",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "/init" },
              { kind: "thinking", verb: "Analyzing", ms: 900 },
              { kind: "tool", name: "Glob", arg: "**/*.{ts,tsx}", result: "Found 23 files" },
              { kind: "tool", name: "Read", arg: "package.json", result: "Read 34 lines" },
              {
                kind: "tool",
                name: "Write",
                arg: "CLAUDE.md",
                result: "Wrote 13 lines to CLAUDE.md",
                lines: [
                  "# CLAUDE.md",
                  "",
                  "## Stack",
                  "Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma",
                  "",
                  "## Commands",
                  "npm run dev    # start dev server",
                  "npm run build  # production build",
                  "npm test       # vitest",
                  "",
                  "## Project Structure",
                  "src/app/         # App Router pages",
                  "src/components/  # shared components",
                ],
              },
              { kind: "say", text: "CLAUDE.md বানানো হয়ে গেছে। প্রতিটা session-এর শুরুতে আমি এটা পড়ি।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমার project একটা Next.js SaaS app, TypeScript আর Tailwind দিয়ে বানানো। DB-র জন্য Prisma, test-এর জন্য vitest, আর আমরা functional component পছন্দ করি। কখনো `any` type use করবেন না।",
              },
              {
                role: "claude",
                text: "এই নিন আপনার CLAUDE.md:\n\n---\n# CLAUDE.md\n\n## Stack\nNext.js (App Router), TypeScript (strict), Tailwind CSS, Prisma\n\n## Testing\nVitest : `npm test` দিয়ে চালান\n\n## Conventions\n- শুধু functional component\n- কোনো `any` type নয় : `unknown` use করে narrow করুন\n- spread operator দিয়ে immutable update\n---\n\nএটা `CLAUDE.md` নামে আপনার project root-এ save করুন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "যা দেখতে পাচ্ছেন সেটা থেকে এই project-এর জন্য একটা CLAUDE.md বানিয়ে দিন।",
              },
              {
                role: "claude",
                text: "আপনার package.json, tsconfig.json আর কয়েকটা component file পড়েছি। আপনার codebase-এ আসলে যা আছে, সেটা মিলিয়ে এই CLAUDE.md:\n\n---\n# CLAUDE.md\n\n## Stack\nNext.js 16 (App Router), TypeScript strict mode, Tailwind CSS v4, Prisma ORM\n\n## Commands\n`npm run dev` · `npm run build` · `npm test` (vitest)\n\n## যা খেয়াল করেছি\n- সব component functional, explicit prop type সহ\n- কোনো barrel file নেই : সরাসরি source থেকে import করুন\n- Prisma schema-তে soft delete use হয় (`deletedAt` pattern)\n---\n\nএটা কি `CLAUDE.md`-তে লিখে দেব?",
              },
            ],
          },
        },
        {
          title: "বানানো CLAUDE.md-টা খুলে দেখুন",
          description:
            "Claude কী বানিয়েছে, একবার দেখে নিন। এতে আপনার project-এর নাম, Claude যে tech stack detect করেছে, build command আর কিছু basic context থাকার কথা। এটাই আপনার শুরুর point।",
          code: {
            snippet: "cat CLAUDE.md",
            language: "bash",
          },
          demo: {
            title: "আপনার CLAUDE.md দেখতে কেমন",
            steps: [
              { type: "cmd", text: "cat CLAUDE.md" },
              { type: "out", text: "# CLAUDE.md", delay: 300 },
              { type: "out", text: "" },
              { type: "out", text: "## Project: my-project" },
              {
                type: "out",
                text: "Stack: Next.js 16, TypeScript, Tailwind CSS",
              },
              { type: "out", text: "" },
              { type: "out", text: "## Build Commands" },
              { type: "out", text: "npm run dev    # Start dev server" },
              { type: "out", text: "npm run build  # Production build" },
              { type: "out", text: "npm run test   # Run tests with vitest" },
              { type: "out", text: "" },
              { type: "out", text: "## Project Structure" },
              { type: "out", text: "src/app/       # App router pages" },
              { type: "out", text: "src/components # Shared components" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "CLAUDE.md-তে কী আছে দেখান" },
              { kind: "tool", name: "Read", arg: "CLAUDE.md", result: "Read 13 lines" },
              {
                kind: "say",
                text: "এখন পর্যন্ত তিনটা section:\n- Stack: Next.js 16, TypeScript, Tailwind CSS v4, Prisma\n- Commands: npm run dev, npm run build, npm test\n- Structure: page-এর জন্য src/app, shared UI-এর জন্য src/components\n\nআপনি কীভাবে কাজ করতে পছন্দ করেন, সেটা নিয়ে এখনও কিছু নেই। পরের ধাপে সেটা যোগ করুন।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "claude",
                text: "আপনার CLAUDE.md-তে যা থাকা উচিত:\n\n```\n# CLAUDE.md\n\n## Stack\nNext.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma\n\n## Commands\nnpm run dev · npm run build · npm test\n\n## Project Structure\nsrc/app/       : App router pages\nsrc/components : Shared components\n```\n\nএটা copy করে আপনার project root-এ `CLAUDE.md` নামে save করুন, তারপর আমরা আপনার নিজের preference-গুলো যোগ করব।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "claude",
                text: "হয়ে গেছে। আপনার project root-এ `CLAUDE.md` লিখে দিয়েছি।\n\nএতে আপনার আসল file structure, Prisma schema-র details আর যে vitest config পেয়েছি, সব রেখেছি। এখনই editor-এ খুলে দেখতে পারেন, আর পরের ধাপে আপনার preference যোগ করতে আমি help করব।",
              },
            ],
          },
        },
        {
          title: "আপনার communication preference যোগ করুন",
          description:
            "ভালো CLAUDE.md আর দারুণ CLAUDE.md-এর পার্থক্য এখানেই। আপনি কীভাবে কাজ করতে পছন্দ করেন, Claude-কে বলে দিন। আপনি কি senior dev, যিনি short answer চান? নাকি beginner, যিনি explanation চান? এর জন্য একটা section যোগ করুন।",
          code: {
            snippet: `# এটা আপনার CLAUDE.md-এর একদম নিচে যোগ করুন

## Communication Preferences
- ছোট করে বলুন। কোনো intro নয়।
- code চাইলে আগে code দিন, explanation পরে।
- TypeScript use করুন। কখনো JavaScript-এর বিকল্প suggest করবেন না।
- bug fix করার সময় fix-এর আগে root cause দেখান।
- "আমি কি ... করে দেব?" জিজ্ঞেস করবেন না। সরাসরি করে ফেলুন।`,
            language: "markdown",
          },
          demo: {
            title: "আপনার নিজের মতো CLAUDE.md",
            steps: [
              {
                type: "cmd",
                text: 'echo "## Communication Preferences" >> CLAUDE.md',
              },
              {
                type: "success",
                text: "Added communication preferences section",
              },
              {
                type: "out",
                text: "আপনার CLAUDE.md এখন 24 লাইনের, পুরোটাই context।",
              },
              {
                type: "warn",
                text: "Claude-এর সঙ্গে প্রতিটা conversation এখন এখান থেকেই শুরু হয়।",
              },
            ],
          },
          cliDemo: {
            steps: [
              {
                kind: "prompt",
                text: "CLAUDE.md-তে যোগ করুন: short answer, আগে code, শুধু TypeScript, fix-এর আগে root cause, জিজ্ঞেস না করে করে ফেলবেন",
              },
              { kind: "thinking", verb: "Editing", ms: 800 },
              {
                kind: "tool",
                name: "Update",
                arg: "CLAUDE.md",
                result: "Updated CLAUDE.md with 7 additions",
                lines: [
                  "",
                  "## আমার সঙ্গে যেভাবে কাজ করবেন",
                  "- short answer: কোনো intro নয়",
                  "- আগে code, পরে explanation",
                  "- শুধু TypeScript, JavaScript-এর বিকল্প নয়",
                  "- Bug fix: আগে root cause, তারপর fix",
                  "- \"আমি কি ... করে দেব?\" জিজ্ঞেস নয়: সরাসরি করুন",
                ],
              },
              { kind: "say", text: "Save হয়েছে। CLAUDE.md এখন 20 লাইনের, আর প্রতিটা session এখান থেকেই শুরু হয়।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এইমাত্র যে CLAUDE.md লিখলেন, তাতে এটা যোগ করুন:\n\nছোট করে বলবেন। আগে code, পরে explanation। সব সময় TypeScript। bug fix করার আগে root cause দেখাবেন। জিজ্ঞেস করবেন না, সরাসরি করে ফেলবেন।",
              },
              {
                role: "claude",
                text: 'আপনার communication preference দিয়ে CLAUDE.md update করেছি:\n\n```\n## আমার সঙ্গে যেভাবে কাজ করবেন\n- short answer : কোনো intro নয়\n- আগে code, পরে explanation\n- শুধু TypeScript, JS-এর বিকল্প নয়\n- Bug fix: root cause → fix (এই order-এ)\n- "আমি কি ... করে দেব?" নয় : সরাসরি কাজ\n```\n\nএটা copy করে আপনার CLAUDE.md-এর শেষে যোগ করুন। ব্যস, আপনার CLAUDE.md তৈরি।',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এইমাত্র যে CLAUDE.md বানালেন, তাতে একটা section যোগ করুন: short answer, আগে code, শুধু TypeScript, bug fix-এর আগে root cause দেখাবেন, জিজ্ঞেস না করে করে ফেলবেন।",
              },
              {
                role: "claude",
                text: "`CLAUDE.md`-তে `## আমার সঙ্গে যেভাবে কাজ করবেন` section যোগ করেছি। File save হয়ে গেছে আর এখনই active। এই session-এর বাকি সময় আমি এই preference-গুলো মেনে চলব।",
              },
            ],
          },
        },
        {
          title: "Test করে পার্থক্যটা দেখুন",
          description:
            "এখন Claude Code চালু করে একটা prompt দিন। খেয়াল করুন, Claude আগে থেকেই আপনার stack, build command আর preference জানে। নিজের কথা আর বারবার বুঝিয়ে বলতে হবে না।",
          code: {
            snippet: 'claude "header-এ একটা dark mode toggle যোগ করুন"',
            language: "bash",
          },
          demo: {
            title: "Claude এখন আপনার project চেনে",
            steps: [
              {
                type: "cmd",
                text: 'claude "header-এ একটা dark mode toggle যোগ করুন"',
              },
              { type: "out", text: "Reading CLAUDE.md...", delay: 400 },
              {
                type: "out",
                text: "Context: Next.js 16, Tailwind CSS, App Router",
              },
              {
                type: "out",
                text: "Preference: TypeScript only, concise responses",
              },
              { type: "out", text: "" },
              {
                type: "out",
                text: "Adding dark mode toggle to src/components/header.tsx...",
              },
              {
                type: "success",
                text: "Created ThemeToggle component with next-themes",
              },
              { type: "success", text: "Updated header.tsx with toggle button" },
              {
                type: "success",
                text: "Config বদলানোর দরকার নেই। Tailwind dark mode আগে থেকেই চালু।",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "header-এ একটা dark mode toggle যোগ করুন" },
              { kind: "thinking", ms: 800 },
              { kind: "tool", name: "Read", arg: "src/components/header.tsx", result: "Read 42 lines" },
              {
                kind: "tool",
                name: "Write",
                arg: "src/components/theme-toggle.tsx",
                result: "Wrote 12 lines to src/components/theme-toggle.tsx",
                lines: [
                  "'use client';",
                  "import { useTheme } from 'next-themes';",
                  "import { Sun, Moon } from 'lucide-react';",
                  "",
                  "export function ThemeToggle() {",
                  "  const { theme, setTheme } = useTheme();",
                  "  return (",
                  "    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>",
                  "      {theme === 'dark' ? <Sun /> : <Moon />}",
                  "    </button>",
                  "  );",
                  "}",
                ],
              },
              {
                kind: "tool",
                name: "Update",
                arg: "src/components/header.tsx",
                result: "Updated src/components/header.tsx with 2 additions",
                lines: [
                  "import { ThemeToggle } from './theme-toggle';",
                  "        <ThemeToggle />",
                ],
              },
              {
                kind: "say",
                text: "next-themes দিয়ে ThemeToggle যোগ করেছি, আপনি যেমন বলেছেন, TypeScript-এ।\nTailwind dark mode আগে থেকেই চালু ছিল, তাই config-এ কোনো change লাগেনি।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "header-এ একটা dark mode toggle যোগ করুন। আমার stack হলো Next.js 16, Tailwind, TypeScript।",
              },
              {
                role: "claude",
                text: "এই নিন `next-themes` দিয়ে বানানো একটা `ThemeToggle` component:\n\n```tsx\n'use client';\nimport { useTheme } from 'next-themes';\nimport { Sun, Moon } from 'lucide-react';\n\nexport function ThemeToggle() {\n  const { theme, setTheme } = useTheme();\n  return (\n    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>\n      {theme === 'dark' ? <Sun /> : <Moon />}\n    </button>\n  );\n}\n```\n\nআপনার header-এ `<ThemeToggle />` যোগ করুন। Tailwind dark mode আগে থেকেই configure করা থাকার কথা।",
              },
            ],
          },
          ideDemo: {
            steps: [
              { role: "user", text: "header-এ একটা dark mode toggle যোগ করুন।" },
              {
                role: "claude",
                text: "`src/components/header.tsx`-এ আপনার header দেখতে পাচ্ছি। toggle-টা সরাসরি যোগ করে দিচ্ছি।\n\n`ThemeToggle` component বানাচ্ছি, `next-themes` install করছি, আর আপনার header update করছি। এক সেকেন্ড।",
              },
              {
                role: "claude",
                text: 'হয়ে গেছে। 3টা file update করেছি:\n• `src/components/theme-toggle.tsx` : নতুন component\n• `src/components/header.tsx` : nav bar-এ toggle যোগ হয়েছে\n• `src/app/layout.tsx` : `ThemeProvider` দিয়ে wrap করা হয়েছে\n\nআপনার `tailwind.config.ts`-এ আগে থেকেই `darkMode: "class"` ছিল, তাই সেখানে কিছু বদলাতে হয়নি।',
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "CLAUDE.md-এর পুরো guide পড়ুন",
        href: "/docs/foundations/claude-md",
      },
    },
  },

  "your-first-skill": {
    sourceHash: "fdc590a1fa193f7b",
    translatedAt: "2026-10-06",
    content: {
      title: "১০ মিনিটে আপনার প্রথম Skill বানান",
      slug: "your-first-skill",
      duration: "১০ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "terminal", "ide"],
      description:
        "প্রতি সপ্তাহে যে কাজটা করেন, সেটাকে একটা command বানিয়ে ফেলুন। Copy, paste, ব্যস।",
      intro:
        "Skill হলো markdown file, যেটা Claude-কে নির্দিষ্ট কোনো কাজ কীভাবে করতে হয় শেখায়। একই instruction বারবার type করার বদলে আপনি একবার লিখবেন, আর Claude প্রতিবার সেটা মেনে চলবে। ভাবুন, নিজের জন্য একটা custom command বানাচ্ছেন। চলুন একটা code review skill বানাই।",
      steps: [
        {
          title: "skills directory বানান",
          description:
            "Skill থাকে আপনার project-এর .claude/skills folder-এর ভেতরে। প্রতিটা skill-এর নিজের একটা folder থাকে, skill-এর নামেই, আর তার ভেতরে একটা SKILL.md file। আপনার প্রথম skill-এর জন্য folder-টা বানান।",
          code: {
            snippet: "mkdir -p .claude/skills/code-review",
            language: "bash",
          },
          demo: {
            title: "Skill setup করা",
            steps: [
              { type: "cmd", text: "mkdir -p .claude/skills/code-review" },
              { type: "cmd", text: "ls .claude/skills/", delay: 400 },
              { type: "out", text: "code-review/" },
              { type: "success", text: "Skills directory তৈরি।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "একটা reusable code review skill-এর জন্য জায়গা setup করে দিন" },
              { kind: "tool", name: "Bash", arg: "mkdir -p .claude/skills/code-review", result: "(No content)" },
              { kind: "tool", name: "Bash", arg: "ls .claude/skills/", result: "code-review" },
              {
                kind: "say",
                text: ".claude/skills/code-review বানিয়েছি। প্রতিটা skill-এর নিজের folder থাকে, ভেতরে একটা SKILL.md\nfile, যেটা এই project-এর প্রতিটা session-এ কাজ করে।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমি Claude-এর জন্য একটা reusable code review skill বানাতে চাই। app-এ এটা কীভাবে setup করব?",
              },
              {
                role: "claude",
                text: "Claude app-এ skill মানে আসলে save করা prompt, মানে এমন instruction যা একবার লিখে প্রতিটা session-এ আবার use করেন।\n\nCode review-এর জন্য আপনি এমন একটা prompt লিখবেন, যেটা ঠিক করে দেয়:\n1. কী খুঁজতে হবে (security, performance, readability)\n2. output কীভাবে format হবে (severity rating, file path, fix)\n3. আপনার team-এর নিজস্ব rule\n\nশুরু করবেন? যে code review করাতে চান সেটা paste করুন, structured review দেখতে কেমন হয় আমি দেখাব। তারপর instruction-গুলোকে একটা reusable prompt বানাব, যেটা আপনি save করে রাখতে পারবেন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "code review-এর জন্য একটা reusable skill বানাতে চাই। এটা কোথায় রাখব?",
              },
              {
                role: "claude",
                text: "VS Code/Cursor-এ আপনার project root-এ `.claude/skills/code-review/SKILL.md` file বানান। আমি এখনই বানিয়ে দিতে পারি, শুধু confirm করুন, আমি skill definition লিখে দেব।",
              },
            ],
          },
        },
        {
          title: "একটা code review skill বানান",
          description:
            "একটা markdown file বানান, যেটা Claude-কে ঠিকঠাক বলে দেবে কীভাবে code review করতে হবে। আসল কাজটা এখানেই হয়। rule, format, tone, সবকিছু আপনিই ঠিক করেন।",
          code: {
            snippet: `cat > .claude/skills/code-review/SKILL.md << 'EOF'
---
name: code-review
description: security, performance, error handling আর naming-এর দিক থেকে code change review করে। code বা recent change review করতে বললে এটা use করুন।
---

# Code Review Skill

code review করতে বললে এই process মেনে চলুন:

## Steps
1. change হওয়া file-গুলো পড়ুন (git diff থাকলে সেটা use করুন)
2. এই issue-গুলো check করুন:
   - Security vulnerability (SQL injection, XSS, exposed secret)
   - Performance সমস্যা (N+1 query, missing index, memory leak)
   - Error handling না থাকা
   - অস্পষ্ট naming বা দরকারের চেয়ে জটিল logic
3. প্রতিটা issue rate করুন: CRITICAL, HIGH, MEDIUM, বা LOW

## Output Format
প্রতিটা issue-এর জন্য:
- **File**: path/to/file.ts
- **Line**: 42
- **Severity**: HIGH
- **Issue**: সমস্যাটা কী
- **Fix**: suggest করা solution

## Rules
- সরাসরি বলুন। ঘুরিয়ে-পেঁচিয়ে নয়।
- code ভালো হলে ছোট করে সেটা বলে এগিয়ে যান।
- সব সময় আগে hardcoded secret check করুন।
- অস্পষ্ট advice নয়, নির্দিষ্ট fix suggest করুন।
EOF`,
            language: "bash",
          },
          demo: {
            title: "আপনার skill লেখা",
            steps: [
              {
                type: "cmd",
                text: "cat > .claude/skills/code-review/SKILL.md << 'EOF'",
              },
              { type: "out", text: "# Code Review Skill", delay: 300 },
              { type: "out", text: "...(skill definition লেখা হচ্ছে)..." },
              { type: "out", text: "EOF" },
              { type: "success", text: "Created .claude/skills/code-review/SKILL.md" },
              { type: "out", text: "" },
              {
                type: "warn",
                text: "36 লাইনের instruction। এটাই আপনার পুরো skill।",
              },
            ],
          },
          cliDemo: {
            steps: [
              {
                kind: "prompt",
                text: "একটা code review skill লিখে দিন: security, performance, error handling, naming। CRITICAL থেকে LOW পর্যন্ত rate করবেন",
              },
              { kind: "thinking", verb: "Writing", ms: 900 },
              {
                kind: "tool",
                name: "Write",
                arg: ".claude/skills/code-review/SKILL.md",
                result: "Wrote 17 lines to .claude/skills/code-review/SKILL.md",
                lines: [
                  "---",
                  "name: code-review",
                  "description: security, performance, error handling আর naming-এর দিক থেকে code change review করে। code বা recent change review করতে বললে এটা use করুন।",
                  "---",
                  "",
                  "# Code Review Skill",
                  "",
                  "code review করতে বললে এই process মেনে চলুন:",
                  "",
                  "## Steps",
                  "1. change হওয়া file-গুলো পড়ুন (git diff থাকলে সেটা use করুন)",
                  "2. security, performance, error handling, naming check করুন",
                  "3. প্রতিটা issue rate করুন: CRITICAL, HIGH, MEDIUM, বা LOW",
                  "",
                  "## Output Format",
                  "প্রতিটা issue-এর জন্য: file:line, severity, issue, fix",
                  "code ভালো হলে ছোট করে সেটা বলুন।",
                ],
              },
              { kind: "say", text: "Save হয়েছে। আপনার change review করতে বললেই আমি এটা মেনে চলব।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "যখনই code review চাইব, আপনি এই instruction-গুলো মেনে চলবেন:\n\nCheck করবেন: security vulnerability, performance issue, error handling না থাকা, অস্পষ্ট naming।\nপ্রতিটা issue rate করবেন: CRITICAL, HIGH, MEDIUM, বা LOW।\nFormat: file path, line number, severity, issue, fix suggestion।\nসরাসরি বলবেন। code ভালো হলে ছোট করে বলে দেবেন।",
              },
              {
                role: "claude",
                text: "বুঝেছি। এই conversation-এ যখনই code review চাইবেন, আমি এই format মেনে চলব।\n\nভবিষ্যতের session-গুলোতেও এটা রাখতে চাইলে instruction-গুলো আপনার \"code review prompt\" হিসেবে কোথাও save করে রাখুন (একটা note বা doc-এ), আর review লাগলে নতুন conversation-এর শুরুতে paste করে দিন।\n\nTest করে দেখবেন? কিছু code paste করুন, আপনার format-এ review চালিয়ে দেখাই।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "`.claude/skills/code-review/SKILL.md` বানিয়ে দিন, এমন একটা skill যেটা security issue, performance সমস্যা আর error handling না থাকা check করবে। প্রতিটা issue CRITICAL/HIGH/MEDIUM/LOW rate করবে, সঙ্গে file, line আর fix।",
              },
              {
                role: "claude",
                text: '`.claude/skills/code-review/SKILL.md` বানাচ্ছি...\n\nহয়ে গেছে। Skill save হয়েছে। এখন থেকে যখনই আমাকে "recent change review করুন" বলবেন বা `/code-review` চালাবেন, আমি ঠিক আপনার format মেনে চলব।\n\nআপনার current diff-এ test করে দেখবেন?',
              },
            ],
          },
        },
        {
          title: "একটা আসল review দিয়ে test করুন",
          description:
            "এবার skill-টা use করুন। Claude-কে আপনার recent change review করতে বলুন, আর দেখুন সেটা ঠিক আপনার format মেনে চলে কি না।",
          code: {
            snippet: 'claude "আমার recent change-গুলো review করুন"',
            language: "bash",
          },
          demo: {
            title: "Skill কাজ করছে",
            steps: [
              { type: "cmd", text: 'claude "আমার recent change-গুলো review করুন"' },
              { type: "out", text: "Loading skill: code-review.md", delay: 400 },
              { type: "out", text: "Running git diff HEAD~1...", delay: 300 },
              { type: "out", text: "Reviewing 4 changed files..." },
              { type: "out", text: "" },
              { type: "error", text: "CRITICAL: src/api/auth.ts:15" },
              { type: "out", text: "  Issue: source-এ API key hardcode করা" },
              { type: "out", text: "  Fix: environment variable-এ সরিয়ে নিন" },
              { type: "out", text: "" },
              { type: "warn", text: "HIGH: src/db/queries.ts:42" },
              { type: "out", text: "  Issue: user listing-এ N+1 query" },
              { type: "out", text: "  Fix: JOIN বা batch loading use করুন" },
              { type: "out", text: "" },
              { type: "success", text: "2টা issue পাওয়া গেছে। 1টা critical, 1টা high।" },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "আমার recent change-গুলো review করুন" },
              { kind: "tool", name: "Read", arg: ".claude/skills/code-review/SKILL.md", result: "Read 17 lines" },
              { kind: "tool", name: "Bash", arg: "git diff HEAD~1 --stat", result: "4 files changed, 61 insertions(+), 9 deletions(-)" },
              { kind: "thinking", verb: "Reviewing", ms: 900 },
              {
                kind: "say",
                text: "CRITICAL  src/api/auth.ts:15\nsource-এ API key hardcode করা। এটা environment variable-এ সরিয়ে নিন।\n\nHIGH  src/db/queries.ts:42\nuser listing-এ N+1 query। JOIN বা batch loading use করুন।\n\n2টা issue: 1টা critical, 1টা high।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: 'এই code-টা review করুন:\n\nconst API_KEY = "[redacted]";\nasync function getUsers() {\n  const users = await db.query("SELECT * FROM users");\n  return users.map(u => db.query(`SELECT * FROM orders WHERE user_id = ${u.id}`));\n}',
              },
              {
                role: "claude",
                text: "**File**: api.js\n**Line**: 1\n**Severity**: CRITICAL\n**Issue**: source-এ API key hardcode করা, version control-এ এটা সবার সামনে চলে যাবে\n**Fix**: `process.env.API_KEY` use করুন আর key-টা `.env` file-এ রাখুন\n\n---\n\n**File**: api.js\n**Lines**: 3–5\n**Severity**: HIGH\n**Issue**: N+1 query। প্রতিটা user-এর order আলাদা করে আনছে, ফলে প্রতি user-এ একটা করে DB call হচ্ছে\n**Fix**: JOIN বা batch query use করুন: `SELECT * FROM orders WHERE user_id IN (...user_ids)`\n\n2টা issue। 1টা critical (security), 1টা high (performance)। push করার আগে CRITICAL-টা fix করুন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              { role: "user", text: "আমার recent change-গুলো review করুন।" },
              {
                role: "claude",
                text: "কী change হয়েছে দেখতে `git diff HEAD~1` চালাচ্ছি...\n\n**src/api/auth.ts:15** : CRITICAL\nAPI key `sk-live-abc123` hardcode করা। এখনই `process.env.API_KEY`-তে সরিয়ে নিন।\n\n**src/db/queries.ts:42** : HIGH\n`getUsersWithOrders()`-এ N+1 query। JOIN বা `whereIn` batch use করুন। এখনকার code প্রতি user-এ একটা করে DB call করে।\n\n2টা issue পাওয়া গেছে। দুটোই fix করে দেব?",
              },
            ],
          },
        },
        {
          title: "Skill কীভাবে কাজ করে দেখুন",
          description:
            "খেয়াল করুন, Claude ঠিক আপনার format মেনেছে: severity rating, file path আর নির্দিষ্ট fix। এটা হঠাৎ করে হয়নি। আপনার skill definition-ই output-টা ঠিক করে দিচ্ছে।",
          demo: {
            title: "এইমাত্র কী হলো",
            steps: [
              {
                type: "out",
                text: 'Skill ছাড়া: "এই নিন কিছু suggestion..."',
                delay: 400,
              },
              {
                type: "out",
                text: "  generic advice, একেক সময় একেক format, কিছু জিনিস বাদ পড়ে যায়",
              },
              { type: "out", text: "" },
              {
                type: "success",
                text: "Skill সহ: structured review, severity rating, একদম নির্দিষ্ট fix",
              },
              {
                type: "out",
                text: "  প্রতিবার একই format। security check কখনো বাদ পড়ে না।",
              },
              { type: "out", text: "" },
              {
                type: "warn",
                text: "Skill Claude-কে শুধু helpful থেকে reliable বানায়।",
              },
            ],
          },
          cliDemo: {
            steps: [
              { kind: "prompt", text: "skill use করলে কী আলাদা হয়?" },
              { kind: "thinking", ms: 1000 },
              {
                kind: "say",
                text: "Skill ছাড়া আপনি general advice পান, প্রতিবার একেক shape-এ,\nআর আপনার দরকারি check-ও আমি বাদ দিয়ে ফেলতে পারি।\nSkill থাকলে প্রতিটা review-তে থাকে severity, file:line আর একটা concrete fix,\nআর security check সব সময় চলে।\n\nSkill helpful-কে reliable বানায়।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এই instruction-গুলো আগে দিয়ে দিলে output এত ভালো হয় কেন?",
              },
              {
                role: "claude",
                text: "Instruction ছাড়া আমি \"helpful\" হওয়ার চেষ্টা করি, যার মানে প্রায়ই লম্বা, diplomatic, আর একেক সময় একেক রকম উত্তর।\n\nআপনার format থাকলে আমি শুধু আপনার কাছে যা আসলে জরুরি, সেটাতেই থাকি: severity, location আর একটা concrete fix। বাড়তি কথা নেই, ঘুরিয়ে বলা নেই।\n\nআপনি যে instruction লিখেছেন, সেটা আসলে output-এর একটা spec। spec যত নির্দিষ্ট, result তত predictable আর useful। skill-এর পুরো point এটাই। এটা Claude-কে শুধু helpful না রেখে reliable বানায়।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "skill দিয়ে আর skill ছাড়া জিজ্ঞেস করার মধ্যে পার্থক্য কী?",
              },
              {
                role: "claude",
                text: "Skill ছাড়া আমি একটা general opinion দিই। Skill থাকলে আমি ঠিক আপনার format মানি : severity rating, file path, line number, নির্দিষ্ট fix।\n\nSkill একটা contract: আপনার project-এ \"code review\" মানে কী, সেটা ঠিক করে দেয়। আমি অস্পষ্ট suggestion-এর দিকে সরে যেতে বা আপনার team-এর rule বাদ দিতে পারি না। অনেক review জুড়ে এটা useful হয় এই consistency-র জন্যই।",
              },
            ],
          },
        },
        {
          title: "আপনার team-এর জন্য customize করুন",
          description:
            "এবার এটাকে নিজের মতো করে নিন। আপনার team-এর নিজস্ব rule, coding standard, বা review-এ সব সময় যা চোখ এড়িয়ে যায়, সেগুলো যোগ করুন। আপনার কাজের সঙ্গে সঙ্গে skill-টাও বড় হতে থাকে।",
          code: {
            snippet: `# এগুলো আপনার code-review.md-তে যোগ করুন:

## Team-Specific Rules
- সব API route-এ rate limiting থাকতে হবে
- Database query-তে repository pattern use করতে হবে
- React component-এ error boundary থাকতে হবে
- কোনো inline style নয়, শুধু Tailwind class
- সব public function-এ JSDoc comment লাগবে`,
            language: "markdown",
          },
          demo: {
            title: "আপনার team-এর rule, এখন automatic",
            steps: [
              {
                type: "cmd",
                text: 'echo "## Team-Specific Rules" >> .claude/skills/code-review/SKILL.md',
              },
              {
                type: "success",
                text: "Added 5 team-specific rules",
                delay: 300,
              },
              { type: "out", text: "" },
              { type: "out", text: "পরের review-তে check হবে:" },
              {
                type: "out",
                text: "  Rate limiting, repo pattern, error boundary...",
              },
              { type: "out", text: "  Tailwind usage, JSDoc comment..." },
              { type: "out", text: "" },
              {
                type: "warn",
                text: "আপনার code review এখন অনেক বেশি খুঁটিয়ে হবে।",
              },
            ],
          },
          cliDemo: {
            steps: [
              {
                kind: "prompt",
                text: "team rule যোগ করুন: API route-এ rate limiting, repository pattern, error boundary, শুধু Tailwind, JSDoc",
              },
              {
                kind: "tool",
                name: "Update",
                arg: ".claude/skills/code-review/SKILL.md",
                result: "Updated .claude/skills/code-review/SKILL.md with 7 additions",
                lines: [
                  "",
                  "## Team-Specific Rules",
                  "- সব API route-এ rate limiting থাকতে হবে",
                  "- Database query-তে repository pattern use করতে হবে",
                  "- React component-এ error boundary থাকতে হবে",
                  "- কোনো inline style নয়, শুধু Tailwind class",
                  "- সব public function-এ JSDoc comment লাগবে",
                ],
              },
              { kind: "say", text: "যোগ করেছি। পরের review-তে পাঁচটা rule-ই check হবে।" },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "আমার code review instruction-এ এই rule-গুলো যোগ করুন:\n- সব API route-এ rate limiting থাকতে হবে\n- Database query-তে repository pattern use করতে হবে\n- React component-এ error boundary থাকতে হবে\n- কোনো inline style নয়, শুধু Tailwind class\n- সব public function-এ JSDoc লাগবে",
              },
              {
                role: "claude",
                text: "Update করেছি। এখন থেকে এই conversation-এর প্রতিটা code review-তে এগুলোও check হবে:\n\n✓ API route-এ rate limiting\n✓ DB query-তে repository pattern\n✓ React component-এ error boundary\n✓ শুধু Tailwind (কোনো inline style থাকলে flag করব)\n✓ public function-এ JSDoc\n\nএটা permanent করতে চাইলে, প্রতিটা session-এর শুরুতে যে saved prompt use করবেন, তাতে এগুলো যোগ করে নিন। save করার জন্য পুরো updated prompt-টা দিয়ে দেব?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "code review skill-এ এই team rule-গুলো যোগ করুন: সব API route-এ rate limiting, DB query-তে repository pattern, React component-এ error boundary, কোনো inline style নয়, public function-এ JSDoc।",
              },
              {
                role: "claude",
                text: "`.claude/skills/code-review/SKILL.md`-এ `## Team Rules` section যোগ করেছি, পাঁচটা rule-ই আছে।\n\nপরের বার review চালালে আমি সবগুলো check করব। File update হয়ে save হয়ে গেছে। এই project-এর প্রতিটা Claude Code session-এ এটা কাজ করবে।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "skill আর custom command নিয়ে আরও পড়ুন",
        href: "/docs/patterns/skills",
      },
    },
  },

  "computer-use": {
    sourceHash: "3c0f957d6ad2c50f",
    translatedAt: "2026-10-06",
    content: {
      title: "৫ মিনিটে Claude-কে আপনার screen দেখতে দিন",
      slug: "computer-use",
      duration: "৫ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "terminal", "ide"],
      description:
        'Claude Code এখন আপনার screen দেখতে পারে, button-এ click করতে পারে, app-এর ভেতরে navigate করতে পারে। কোনো setup লাগে না। এই feature দেখেই non-coder-রা বলে ওঠেন "দাঁড়ান, কী?!"',
      intro:
        'মার্চ ২০২৬-এ Anthropic Claude Code-এর জন্য Computer Use ship করেছে। মানে Claude সত্যি সত্যি আপনার screen-এ কী আছে দেখতে পারে, mouse নাড়াতে পারে, click করতে পারে, form-এ type করতে পারে, আর app-এর মধ্যে navigate করতে পারে। বাড়তি কিছু install করতে হয় না। শুধু বলবেন "আমার screen-টা দেখুন", আর Claude দেখবে। non-technical user-দের জন্য এটা অনেক কিছু বদলে দেয়, কারণ আপনি কোনো কিছু দেখিয়ে বলতে পারেন "এটা ঠিক করে দিন।"',
      steps: [
        {
          title: "Computer Use চালু আছে কি না দেখে নিন",
          description:
            "Computer Use পাওয়া যায় Claude Pro আর Max plan-এ। এটা desktop app, terminal আর IDE extension-এ কাজ করে। বাড়তি কিছু install করতে হয় না।",
          demo: {
            title: "আপনার setup check করুন",
            steps: [
              { type: "cmd", text: "claude" },
              { type: "success", text: "Claude Code v4.6 ready" },
              {
                type: "cmd",
                text: '"আপনি কি এখন আমার screen দেখতে পাচ্ছেন?"',
                delay: 400,
              },
              { type: "out", text: "Let me check... Activating computer use..." },
              {
                type: "success",
                text: "✓ আপনার screen দেখতে পাচ্ছি। আপনি macOS desktop-এ আছেন, Chrome আর VS Code খোলা।",
              },
              {
                type: "warn",
                text: "→ ব্যস। কোনো setup নেই, কোনো config নেই। এমনিই কাজ করে।",
              },
            ],
          },
          appDemo: {
            steps: [
              { role: "user", text: "আপনি কি আমার screen দেখতে পাচ্ছেন?" },
              {
                role: "claude",
                text: "হ্যাঁ! এই মুহূর্তে আপনার screen দেখতে পাচ্ছি। আপনি desktop-এ আছেন, একটা browser খোলা, তাতে Gmail, আর আরেকটা tab-এ একটা Notion page।\n\nআমি পারি:\n- কোনো কিছুতে click করতে\n- field-এ type করতে\n- page scroll করতে\n- reference-এর জন্য screenshot নিতে\n\nকী নিয়ে help লাগবে?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আপনি কি আমার screen দেখতে পাচ্ছেন? visual একটা জিনিস নিয়ে help লাগবে।",
              },
              {
                role: "claude",
                text: "হ্যাঁ, আপনার screen দেখতে পাচ্ছি। VS Code-এ একটা React component খোলা, আর browser preview-তে layout ভাঙা মনে হচ্ছে - sidebar main content-এর ওপর চলে এসেছে।\n\nযে CSS সমস্যাটা দেখছি, সেটা fix করে দেব?",
              },
            ],
          },
        },
        {
          title: "Claude-কে visual কোনো কাজ করতে বলুন",
          description:
            "আসল সুবিধাটা এখানে: screen-এর কোনো কিছু Claude-কে দেখিয়ে দিন, আর সেটা নিয়ে কাজ করতে বলুন। form পূরণ, app-এ navigate, visual bug debug।",
          demo: {
            title: "Claude আপনার হয়ে form পূরণ করছে",
            steps: [
              {
                type: "cmd",
                text: '"আমার browser-এ একটা Jira ticket খোলা আছে। ওটা পড়ে একটা summary বানিয়ে দিতে পারবেন?"',
              },
              { type: "out", text: "Looking at your screen..." },
              {
                type: "out",
                text: 'JIRA-1234 দেখতে পাচ্ছি: "User authentication fails on mobile Safari"',
                delay: 400,
              },
              {
                type: "out",
                text: "Reading the description and comments...",
                delay: 300,
              },
              { type: "success", text: "✓ এই নিন summary:", delay: 500 },
              {
                type: "out",
                text: "  Bug: 30 মিনিট idle থাকলে mobile Safari auth cookie হারিয়ে ফেলে",
              },
              { type: "out", text: "  Impact: দিনে ~2,400 mobile user affected" },
              { type: "out", text: "  Root cause: SameSite=Strict + Safari ITP" },
              {
                type: "out",
                text: "  Fix: secure flag সহ SameSite=Lax-এ switch করুন",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "Google Sheets-এ একটা spreadsheet খোলা আছে। A থেকে D column-এর data পড়ে top 3 spender কারা, বলতে পারবেন?",
              },
              {
                role: "claude",
                text: "আপনার screen দেখছি...\n\nexpense data সহ একটা Google Sheet দেখতে পাচ্ছি। A-D column থেকে top 3 spender:\n\n1. **Marketing Dept** - $24,500 (Q1 campaign)\n2. **Engineering** - $18,200 (cloud infrastructure)\n3. **Sales** - $12,800 (travel + event)\n\nমোট খরচের 35% Marketing-এর। একটা chart বানিয়ে দেব, নাকি অস্বাভাবিক কোনো line item আছে কি না খুঁজে দেখব?",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "ডান দিকের browser preview-টা দেখুন। mobile-এ button-টা কেটে যাচ্ছে। fix করে দিতে পারবেন?",
              },
              {
                role: "claude",
                text: 'সমস্যাটা দেখতে পাচ্ছি - mobile viewport-এ "Submit" button-টা container ছাড়িয়ে বেরিয়ে যাচ্ছে। কারণ button-এ একটা fixed width দেওয়া, যেটা padding হিসাবে ধরে না।\n\nআপনার component-এ fix করছি...\n\n```tsx\n// আগে: w-[200px] দিলে overflow হয়\n// পরে: w-full sm:w-auto\n<button className="w-full sm:w-auto px-6 py-3">\n```\n\nএখন mobile-এ button পুরো width নেবে আর desktop-এ নিজের মাপে থাকবে। আপনার preview দেখুন - update হয়ে যাওয়ার কথা।',
              },
            ],
          },
        },
        {
          title: "এক app থেকে আরেক app-এ যান",
          description:
            "Claude app বদলাতে পারে, নতুন tab খুলতে পারে, আর একাধিক window জুড়ে কাজ করতে পারে। যে workflow কয়েকটা tool জুড়ে চলে, তার জন্য দারুণ।",
          demo: {
            title: "Cross-app workflow",
            steps: [
              {
                type: "cmd",
                text: '"Chrome খুলুন, আমাদের Figma file-এ যান, নতুন design-এর screenshot নিন, তারপর এখানে ফিরে এসে implement করুন"',
              },
              { type: "out", text: "Opening Chrome..." },
              {
                type: "out",
                text: "Navigating to figma.com/file/abc123...",
                delay: 500,
              },
              {
                type: "out",
                text: "Taking screenshot of the header component...",
                delay: 400,
              },
              { type: "success", text: "✓ Got the design reference", delay: 300 },
              { type: "out", text: "Switching back to the terminal..." },
              {
                type: "out",
                text: "Implementing the header based on the Figma design...",
              },
              {
                type: "success",
                text: "✓ Created src/components/Header.tsx matching the design",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "কালকের calendar-টা দেখুন, তারপর 2pm-এর meeting-টা decline করে একটা email draft করে দিন। ওটা আমার 1:1-এর সঙ্গে clash করছে।",
              },
              {
                role: "claude",
                text: 'আপনার screen দেখছি... Google Calendar খোলা আছে দেখতে পাচ্ছি।\n\nকালকের schedule:\n- 10am: Sprint Planning\n- 1pm: Sarah-র সঙ্গে 1:1 (recurring)\n- 2pm: "Q2 Budget Review" (নতুন invite)\n- 4pm: Design Review\n\nঠিকই বলেছেন, 2pm-এর meeting আপনার 1:1 শেষ করার সময়ের সঙ্গে clash করছে। এই নিন decline-এর একটা draft:\n\n---\n**To:** finance-team@company.com\n**Subject:** Re: Q2 Budget Review\n\nHi team, কাল 2pm-এ আমার আরেকটা meeting আছে। বৃহস্পতিবার কোনো slot পাওয়া যাবে? এর মধ্যে doc-টা আমি async review করে রাখব।\n\n---\n\nCalendar event-এ "Decline" click করে এটা Gmail-এ paste করে দেব?',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমার browser-এর Figma design আর preview-তে যা render হচ্ছে, দুটো মিলিয়ে দেখুন। কী কী আলাদা?",
              },
              {
                role: "claude",
                text: "দুটোই দেখতে পাচ্ছি - বাঁয়ে Figma design, ডানে আপনার browser preview।\n\n**যে পার্থক্যগুলো পেলাম:**\n1. **Font size**: Figma-তে body text 18px, আপনার preview-তে 16px\n2. **Spacing**: Figma-তে card gap 24px, আপনার code-এ 16px\n3. **Border radius**: Figma-র card-এ 12px radius, আপনারটায় 8px\n4. **Color**: Figma-তে CTA button `#2563EB`, কিন্তু আপনি use করছেন `#3B82F6` (হালকা shade)\n\nচারটাই fix করে দেব? এখনই Tailwind class update করে দিতে পারি।",
              },
            ],
          },
        },
        {
          title: "রোজকার কাজে use করুন",
          description:
            'আগে যে কাজে আপনাকে screen-এ কী দেখছেন সেটা বুঝিয়ে বলতে হতো, সেখানেই Computer Use সবচেয়ে কাজে আসে। এখন শুধু বলবেন "এটা দেখুন", আর Claude সঙ্গে সঙ্গে বুঝে যায়।',
          demo: {
            title: "Real-world কিছু উদাহরণ",
            steps: [
              {
                type: "out",
                text: "── মানুষ আসলে Computer Use দিয়ে যা করে ──",
              },
              {
                type: "success",
                text: '"screen-এর এই error message-টা পড়ে fix করে দিন"',
              },
              {
                type: "success",
                text: '"আমার saved info দিয়ে এই form-টা পূরণ করে দিন"',
                delay: 300,
              },
              {
                type: "success",
                text: '"এই দুটো browser tab পাশাপাশি রেখে compare করুন"',
                delay: 300,
              },
              {
                type: "success",
                text: '"এই bug-এর screenshot নিয়ে একটা issue file করে দিন"',
                delay: 300,
              },
              {
                type: "success",
                text: '"এই dashboard-এর chart পড়ে trend-গুলোর summary দিন"',
                delay: 300,
              },
              {
                type: "success",
                text: '"Settings > Privacy-তে গিয়ে tracking বন্ধ করে দিন"',
                delay: 300,
              },
              {
                type: "warn",
                text: "→ screen-এ আপনি যা দেখতে পান, Claude-ও তা দেখতে পায়।",
              },
            ],
          },
          appDemo: {
            steps: [
              {
                role: "user",
                text: "computer use দিয়ে কী কী মজার কাজ করা যায়?",
              },
              {
                role: "claude",
                text: 'মানুষ সবচেয়ে বেশি পছন্দ করে এই কাজগুলো:\n\n**Visual debugging**\n"আমার app-টা দেখে বলুন কী সমস্যা" - Claude ভাঙা layout দেখে, error পড়ে, তারপর code fix করে দেয়।\n\n**Form পূরণ**\n"গত সপ্তাহের receipt দিয়ে এই expense report পূরণ করে দিন" - Claude আপনার data পড়ে field-গুলো পূরণ করে দেয়।\n\n**Cross-app workflow**\n"এই Slack message পড়ে একটা Jira ticket বানান, আর sprint-এর সঙ্গে link করে দিন" - Claude এক app থেকে আরেক app-এ যায়।\n\n**Design-to-code**\n"আমার code-কে এই Figma design-এর সঙ্গে মিলিয়ে দিন" - Claude pixel ধরে compare করে পার্থক্যগুলো fix করে।\n\n**Dashboard analysis**\n"এই chart-গুলো পড়ে বলুন কোন দিকে trend যাচ্ছে" - Claude graph, table আর dashboard পড়তে পারে।\n\nসবচেয়ে ভালো দিক: আপনি কী দেখছেন, সেটা আর বুঝিয়ে বলতে হয় না। শুধু বলুন "আমার screen-টা দেখুন", Claude পুরো ছবিটা বুঝে নেয়।',
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমার IDE-তে computer use দিয়ে সবচেয়ে useful কাজ কোনটা?",
              },
              {
                role: "claude",
                text: 'সবচেয়ে কাজের feature: **visual debugging**।\n\nbug-টা কথায় বর্ণনা না করে শুধু বলুন "preview-টা দেখুন", আর আমি পারব:\n\n1. **ভাঙা layout দেখে** ঠিক কোন CSS property-র কারণে হচ্ছে, সেটা বের করতে\n2. **Design-এর সঙ্গে compare করতে**, যদি পাশে Figma খোলা থাকে\n3. React/Next.js-এর **error overlay পড়ে** আপনার code-এ trace করতে\n4. বিভিন্ন viewport size দেখে **responsive view check করতে**\n5. render হওয়া page-এ চোখে পড়ে এমন **accessibility issue ধরতে**\n\nWorkflow: preview খুলুন, সমস্যাটা দেখিয়ে দিন, আমি code fix করি। "screen ছোট হলে button-টা বাঁ দিকের জিনিসটার ওপর একটু চলে আসে" টাইপের বর্ণনা আর লাগবে না।\n\nশুধু: "এটা দেখুন। ঠিক করে দিন।"',
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "আপনার প্রথম custom skill বানান",
        href: "/tutorials/your-first-skill",
      },
    },
  },

  "research-briefing": {
    sourceHash: "838591ef5af47703",
    translatedAt: "2026-10-06",
    content: {
      title: "৫টা article থেকে একটা Research Briefing Doc বানান",
      slug: "research-briefing",
      duration: "১৫ মিনিট",
      difficulty: "beginner",
      availableRoutes: ["app", "ide"],
      description:
        "আপনার source-গুলো paste করুন (link, PDF, copy করা text), আর পেয়ে যান key insight, tension আর implication সহ একটা structured briefing doc।",
      intro:
        'পাঁচটা article পড়ে সেগুলো মিলিয়ে একটা গোছানো brief বানাতে আগে দুই ঘণ্টা লাগত। চোখ বুলানো, note নেওয়া, "এর মানে আমাদের জন্য কী" নিয়ে ভাবা। Claude কয়েক মিনিটেই synthesis করে দিতে পারে। আপনার সময় যাবে সেই চিন্তায়, যেটা শুধু আপনিই করতে পারেন।',
      steps: [
        {
          title: "আপনার research question ঠিক করুন",
          description:
            'কিছু paste করার আগে Claude-কে বলুন আপনি কোন প্রশ্নের উত্তর খুঁজছেন। "এই link-গুলোর summary দিন" বলার চেয়ে focused একটা research question অনেক ধারালো brief দেয়।',
          appDemo: {
            steps: [
              {
                role: "user",
                text: "AI কীভাবে product management role বদলে দিচ্ছে, সেটা নিয়ে একটা research briefing লাগবে। সামনের সপ্তাহে leadership team-এর সামনে present করব। আমাদের PM team-এর জন্য AI tooling-এ invest করার case বানাতে চাই।",
              },
              {
                role: "claude",
                text: "ভালো framing। নির্দিষ্ট প্রশ্ন, নির্দিষ্ট audience, নির্দিষ্ট goal। brief-টা কেমন হবে, এটা অনেকটাই ঠিক করে দেয়।\n\nInvestment decision নিতে যাওয়া leadership audience-এর জন্য output সাজাব এভাবে:\n1. আসলে কী বদলাচ্ছে (evidence-based, hype নয়)\n2. early adopter-রা কী করছে আর কী result পাচ্ছে\n3. কিছু না করার risk\n4. Practical implication / investment দেখতে কেমন হবে\n\nরেডি হলে আপনার source-গুলো paste করুন। link, copy করা text, বা দুটোই।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "PM role-এ AI-এর impact নিয়ে একটা research brief বানাচ্ছি। Audience: leadership, PM AI tooling-এ investment-এর case।",
              },
              {
                role: "claude",
                text: "বুঝেছি। brief-টা leadership-এর investment decision-এর জন্য সাজাব। Evidence, early adopter signal, কিছু না করার risk, আর একটা practical recommendation। source-গুলো paste করুন।",
              },
            ],
          },
        },
        {
          title: "আপনার source-গুলো paste করুন",
          description:
            "article-এর text paste করুন, Claude-এর reference-এর জন্য URL copy করুন, বা যে article পড়েছেন সেটা নিজের ভাষায় বলুন। format নিয়ে চিন্তা করবেন না, দরকারি অংশ Claude নিজেই বের করে নেবে।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: 'এই আমার source-গুলো:\n\n1. AI-native PM নিয়ে একটা product management newsletter-এর লেখা : বলছে, যে PM-রা AI use করেন তারা research আর synthesis-এর কাজে 2–3x বেশি productive, কিন্তু "judgment"-এর কাজ (prioritisation, stakeholder management) বদলায়নি।\n\n2. Knowledge work-এ generative AI নিয়ে একটা consulting firm-এর report : knowledge work-এর 40% কাজ আংশিকভাবে automate করা যায়; synthesis আর summarisation-এ impact সবচেয়ে বেশি।\n\n3. "10x PM" নিয়ে একটা venture capital essay : যে PM-রা AI tool use করেন, তারা আরও দ্রুত discovery cycle চালাচ্ছেন আর একজনে বেশি surface area সামলাচ্ছেন।\n\n4. একটা SaaS company-র Head of Product-এর LinkedIn post : তারা PM-দের জন্য AI tooling চালু করেছেন, research আর reporting-এ সময় 30% কমেছে, সেই সময় তারা আরও বেশি customer interview-তে দিয়েছেন।\n\n5. AI আর professional skill নিয়ে একটা business journal-এর লেখা : যে knowledge worker-রা AI কাজে লাগান, তারা শেখার দিক থেকে এগিয়ে থাকেন; যারা লাগান না, 3–5 বছরে তাদের skill কমে যেতে থাকে।',
              },
              {
                role: "claude",
                text: "ভালো source। practitioner, consulting আর academic, সব দিক থেকে strong signal। পড়ছি...\n\nSynthesis করার আগে একটা জিনিস চোখে পড়ল: আপনার source-গুলোর মধ্যে একটা interesting tension আছে। newsletter আর VC essay PM-দের জন্য AI নিয়ে খুব optimistic; business journal-এর লেখাটা skill কমে যাওয়ার একটা risk তুলে ধরে, যেটা চোখ বন্ধ করে adopt করার বিপক্ষে যায়। leadership audience-এর জন্য এই tension আসলে কাজের। শুধু পক্ষে বলার চেয়ে এতে argument-টা বেশি credible হয়। brief-এ আমি এটা আলাদা করে তুলে ধরব।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: 'Source: (1) PM newsletter : AI PM-রা synthesis-এ 2-3x বেশি productive, judgment-এ কোনো পরিবর্তন নেই। (2) Consulting report : knowledge কাজের 40% automate করা যায়, synthesis-এ impact সবচেয়ে বেশি। (3) VC essay : "10x PM", দ্রুত discovery cycle। (4) SaaS Head of Product : research/reporting-এ 30% সময় বাঁচে, সেটা customer interview-তে দিয়েছে। (5) Business journal : AI adopter-রা শেখায় এগিয়ে থাকে, non-adopter-দের 3-5 বছরে skill কমে যায়।',
              },
              {
                role: "claude",
                text: "ভালো set। practitioner, consulting আর academic, সব দিক আছে। একটা কাজের tension আছে: বেশিরভাগ source productivity নিয়ে optimistic, কিন্তু business journal skill কমে যাওয়ার একটা risk তুলে ধরে, যেটা case-টাকে আরও balanced আর credible করে। brief-এ এটা তুলে ধরব। এখন synthesis করছি।",
              },
            ],
          },
        },
        {
          title: "প্রতিটা source থেকে key insight বের করুন",
          description:
            "Claude প্রতিটা source পড়ে আপনার research question-এর জন্য সবচেয়ে relevant finding-গুলো বের করে, বাড়তি জিনিস বাদ দিয়ে আসল signal রাখে।",
          appDemo: {
            steps: [
              { role: "user", text: "প্রতিটা source থেকে key insight বের করে দিন।" },
              {
                role: "claude",
                text: '**Source ধরে ধরে Insight**\n\n**1. PM newsletter**\n→ Key insight: AI execution-এর কাজ (research, synthesis, লেখা) বাড়িয়ে দেয়, কিন্তু judgment নয়। AI use করা PM-রা "করার" কাজে দ্রুত, কিন্তু "decide করায়" যে বেশি ভালো, তা নয়। expectation ঠিক করার জন্য এই পার্থক্যটা খুব জরুরি।\n\n**2. Consulting report**\n→ Key insight: 40% automation-এর figure অনেকেই quote করেন, কিন্তু আসল কথা হলো "আংশিকভাবে automate"। synthesis-এ impact সবচেয়ে বেশি, কারণ মাথা খাটানোর load বেশি আর output তুলনামূলক structured। ROI মাপা যায়।\n\n**3. VC essay**\n→ Key insight: একজন PM কতটা surface area সামলান, সেই ratio বদলাচ্ছে। AI ব্যবহার করা PM-রা একজনে আরও বড় product scope সামলাচ্ছেন। এর implication শুধু productivity-তে নয়, hiring আর org design-এও।\n\n**4. SaaS Head of Product**\n→ Key insight: আসল লাভ বাঁচানো সময়টা নয়। লাভ হলো সময়টা কোথায় গেল। research/reporting-এ যে সময় বাঁচল, তা তারা আরও বেশি customer contact-এ দিয়েছেন। output-এর quality বেড়েছে, কারণ বাঁচানো সময় কোথায় যাবে, সেটা আগে থেকেই ঠিক করা ছিল।\n\n**5. Business journal**\n→ Key insight: skill কমে যাওয়ার ব্যাপারটা সত্যি। যে PM-রা চিন্তার কাজ AI-কে দিয়ে দেন কিন্তু নিজে underlying thinking-এ engaged থাকেন না, সময়ের সঙ্গে তাদের craft কমে যায়। risk-টা AI-এর PM-কে replace করা নয়; risk হলো PM-রা ধারালো না থেকে AI-এর ওপর নির্ভরশীল হয়ে পড়া।',
              },
            ],
          },
          ideDemo: {
            steps: [
              { role: "user", text: "প্রতিটা source-এর key insight বের করুন।" },
              {
                role: "claude",
                text: "1. **PM newsletter**: AI execution বাড়ায়, judgment নয়। দ্রুত করা, ভালো decide করা নয়।\n2. **Consulting report**: synthesis-এ impact সবচেয়ে বেশি। ROI মাপা যায়।\n3. **VC essay**: PM-to-surface-area ratio বদলাচ্ছে। শুধু productivity নয়, org design-এও implication।\n4. **SaaS Head of Product**: লাভ সময় বাঁচানো নয়। লাভ হলো বাঁচানো সময় কোথায় গেল (আরও customer contact)।\n5. **Business journal**: engaged না থেকে চিন্তার কাজ outsource করলে skill কমে যাওয়ার risk। risk replacement নয়; risk হলো dependency।",
              },
            ],
          },
        },
        {
          title: "সব source মিলিয়ে synthesis করুন",
          description:
            "আলাদা আলাদা insight কাজের; আরও কাজের হলো সব মিলিয়ে সেগুলোর মানে কী। Claude-কে synthesis করতে বলুন, আর consensus, tension আর implication খুঁজে বের করতে বলুন।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এবার পাঁচটা source মিলিয়ে synthesis করুন। consensus কী, tension কোথায়, আর আমাদের জন্য এর মানে কী?",
              },
              {
                role: "claude",
                text: "**Synthesis**\n\n**যেখানে source-গুলো একমত**\n• research, synthesis আর reporting-এ AI চোখে পড়ার মতো সময় বাঁচায় (2–3x productivity gain সব জায়গায় প্রায় একই)\n• সময় বাঁচানোটা সত্যি, কিন্তু কাজে আসে শুধু তখনই, যখন সেই সময় ভেবেচিন্তে অন্য কাজে দেওয়া হয়\n• judgment-এর কাজ (prioritisation, stakeholder management, strategy) মানুষের হাতেই থাকে\n\n**যেখানে source-গুলো একমত নয় বা tension তৈরি করে**\n• VC essay আর consulting report output gain-এ focus করে; business journal লম্বা সময়ে skill কমে যাওয়ার প্রশ্ন তোলে। দুটোই একসঙ্গে সত্যি হতে পারে। short-term-এ লাভ, ঠিকমতো সামলানো না হলে long-term-এ risk।\n• \"customer interview-তে সময় দিন\" (SaaS Head of Product) আর \"নিজের চিন্তা outsource করবেন না\" (business journal) আসলে একই কথা: AI সবচেয়ে ভালো কাজ করে যখন এটা মানুষকে আরও বেশি মানুষের কাজের জন্য সময় করে দেয়, কম নয়\n\n**আপনার team-এর জন্য implication**\n• investment-এর case evidence দিয়ে backed: কম value-র কাজে 30–40% সময় বাঁচে, আর সেই সময় কোথায় যাবে তা মাপা যায়\n• risk হলো invest না করা, আর দেখা যে AI ব্যবহার করা competitor-রা দ্রুত discovery cycle চালাচ্ছে, যখন আপনার PM-রা report বানাতে সময় দিচ্ছেন\n• leadership-এর জন্য ঠিক framing: এটা AI দিয়ে judgment replace করার ব্যাপার নয়। এটা আপনার PM-দের সময় সেই কাজের জন্য বাঁচিয়ে রাখা, যেটা শুধু তারাই করতে পারেন",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Synthesis করুন। Consensus, tension, implication।",
              },
              {
                role: "claude",
                text: "**Consensus**: synthesis/research/reporting-এ AI 2-3x সময় বাঁচায়। লাভ সত্যি, আর বাঁচানো সময় অন্য কাজে দিলে সেটা আসলেই কাজে লাগে।\n\n**Tension**: VC essay/consulting report output gain-এ focus করে; business journal skill কমে যাওয়ার risk সামনে আনে। দুটোই সত্যি। short-term-এ জয়, খারাপভাবে সামলালে long-term-এ risk।\n\n**যে insight সব মিলিয়ে দেয়**: AI সবচেয়ে ভালো কাজ করে যখন এটা মানুষকে আরও বেশি মানুষের কাজের জন্য সময় করে দেয় (SaaS team-এর customer interview-তে সময় দেওয়া = business journal-এর \"নিজের চিন্তা outsource করবেন না\")।\n\n**Implication**: investment-এর case শক্ত। কিছু না করার risk হলো competitor-দের দ্রুত discovery cycle চালাতে দেখা। Framing: judgment-এর কাজের জন্য PM-এর সময় বাঁচিয়ে রাখা, PM headcount কমানো নয়।",
              },
            ],
          },
        },
        {
          title: "Briefing doc হিসেবে format করুন",
          description:
            "সবকিছু একটা পরিষ্কার document-এ গুছিয়ে নিন, যেটা leadership-এর সঙ্গে share করার জন্য ready।",
          appDemo: {
            steps: [
              {
                role: "user",
                text: "এটাকে leadership-এর সঙ্গে share করার মতো একটা briefing doc হিসেবে format করে দিন। এক page, tight।",
              },
              {
                role: "claude",
                text: "# Research Briefing: Product Management-এ AI\n_যাদের জন্য: [Leadership team] | তারিখ: [Date]_\n\n## প্রশ্ন\nAI কীভাবে product management বদলে দিচ্ছে, আর আমাদের PM team-এর জন্য কি AI tooling-এ invest করা উচিত?\n\n## Evidence যা দেখাচ্ছে\nপাঁচটা practitioner আর research source জুড়ে signal একই রকম: AI tool research, synthesis আর reporting-এর সময় 30–40% কমায়। সবচেয়ে বেশি impact synthesis-এ, মানে raw input থেকে structured output বানানোয়।\n\nআরও জরুরি finding: যে team-গুলো সবচেয়ে বেশি লাভ পাচ্ছে, তারা শুধু সময় বাঁচাচ্ছে না। সেই সময় তারা বেশি value-র কাজে দিচ্ছে, বিশেষ করে আরও বেশি customer contact আর strategic thinking-এ।\n\n## যে Tension-টা বলা দরকার\nBusiness journal-এর লেখাটা একটা real risk সামনে আনে: যে PM-রা engaged না থেকে চিন্তার কাজ AI-কে দিয়ে দেন, সময়ের সঙ্গে তাদের craft কমে যায়। তাই সবকিছু AI-কে ছেড়ে না দিয়ে ভেবেচিন্তে adopt করা দরকার (AI-assisted synthesis, human-led judgment)।\n\n## আমাদের জন্য এর মানে\n- **Opportunity**: কম value-র কাজে 30–40% সময় বাঁচে, যা discovery আর customer interview-তে দেওয়া যায়\n- **Competitive risk**: যে team-গুলো এখনই adopt করছে, তারা দ্রুত discovery cycle বানাচ্ছে আর প্রতি PM-এ বেশি surface area সামলাচ্ছে\n- **কিছু না করার downside risk**: 12–24 মাসে skill আর speed-এর gap বাড়তে থাকবে\n\n## Recommendation\nPM-দের জন্য AI tooling-এ invest করুন, একটা পরিষ্কার reinvestment mandate সহ: বাঁচানো সময় যাবে customer contact-এ, capacity কমানোয় নয়।\n\n_Sources: PM newsletter, knowledge work-এ GenAI নিয়ে consulting report, VC essay, SaaS Head of Product-এর post, business journal-এর লেখা_",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "leadership-এর জন্য এক page-এর একটা tight briefing doc বানিয়ে দিন।",
              },
              {
                role: "claude",
                text: "# Product Management-এ AI : Research Briefing\n\n**প্রশ্ন**: আমাদের PM team-এর জন্য কি AI tooling-এ invest করা উচিত?\n\n**5টা source যা বলছে**: research/synthesis/reporting-এ 30–40% সময় বাঁচে। judgment-এর কাজ বদলায়নি। যে team-গুলো বাঁচানো সময় customer contact-এ দেয়, তারা সবচেয়ে বেশি লাভ পায় (SaaS Head of Product)। adoption passive হলে skill কমে যাওয়ার real risk আছে (business journal)।\n\n**Synthesis**: AI সবচেয়ে ভালো কাজ করে যখন এটা PM-দের আরও বেশি মানুষের কাজের জন্য সময় করে দেয়, কম নয়। কিছু না করার competitive risk হলো discovery-speed-এর gap বাড়তে থাকা।\n\n**Recommendation**: Invest করুন। একটা reinvestment mandate ঠিক করুন: বাঁচানো সময় → customer interview, headcount কমানো নয়।\n\n_Sources: PM newsletter, consulting report, VC essay, SaaS Head of Product, business journal_",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "৩০ মিনিটে একটা competitive analysis চালান",
        href: "/tutorials/competitive-analysis",
      },
    },
  },
};
