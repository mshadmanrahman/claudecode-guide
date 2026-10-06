import type { Tutorial } from "@/lib/tutorials";
import type { Translation } from "@/lib/i18n/bn/tutorials";

export const BN_TUTORIALS_G6: Partial<Record<string, Translation<Tutorial>>> = {
  "nextjs-with-claude": {
    sourceHash: "58baf349a76c7fe3",
    translatedAt: "2026-10-06",
    content: {
      title: "Claude Code দিয়ে একটা Next.js project শুরু করুন",
      slug: "nextjs-with-claude",
      duration: "২০ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["terminal", "ide"],
      description:
        "Claude Code-কে development partner হিসেবে নিয়ে একটা production-ready Next.js 16 App Router project scaffold, configure, build, test আর deploy করুন।",
      intro:
        "Claude Code এমন কোনো code generator নয় যেখান থেকে copy-paste করে নেবেন। এটা একজন development partner, যে আপনার project পড়ে, context বোঝে, আর প্রথম file থেকে শেষ commit পর্যন্ত আপনার convention একই রাখে। এই tutorial-এ পুরো একটা Next.js workflow দেখবেন: একটা prompt দিয়ে scaffold, ঠিকঠাক একটা CLAUDE.md configure করা, data fetching সহ একটা আসল feature বানানো, TypeScript strict mode আর test পাকা করা, তারপর Vercel-এ ship করা। শেষে আপনার হাতে থাকবে একটা live project, আর এরপরের প্রতিটি Next.js project-এর জন্য বারবার ব্যবহার করার মতো একটা process।",
      steps: [
        {
          title: "একটা prompt দিয়ে scaffold করুন",
          description:
            "একটা prompt-এই পুরো project তৈরি হয়ে যায়। App Router, TypeScript strict mode, Tailwind CSS 4, আর আপনার পছন্দের src layout বলে দিন। Claude scaffold করবে, dependency install করবে, আর dev server চালু হচ্ছে কি না confirm করবে।",
          code: {
            snippet: `claude "'dashboard-app' নামে একটা Next.js 16 project বানান, এগুলো সহ:
- App Router (Pages Router না)
- TypeScript, strict mode-এ
- Tailwind CSS 4
- src/ directory layout
- ESLint আর Prettier configure করা
- app/page.tsx-এ একটা basic home page, যেখানে শুধু Hello লেখা থাকবে

বানানো হয়ে গেলে npm run dev চালিয়ে দেখুন চালু হয় কি না।"`,
            language: "bash",
          },
          demo: {
            title: "Claude আপনার Next.js project scaffold করছে",
            steps: [
              {
                type: "cmd",
                text: 'claude "dashboard-app নামে একটা Next.js 16 project বানান..."',
              },
              {
                type: "out",
                text: "Running: npx create-next-app@latest dashboard-app ...",
                delay: 400,
              },
              { type: "out", text: "  TypeScript: yes (strict mode)" },
              { type: "out", text: "  Tailwind CSS: yes (v4)" },
              { type: "out", text: "  App Router: yes" },
              { type: "out", text: "  src/ directory: yes" },
              { type: "out", text: "Installing dependencies..." },
              { type: "success", text: "Created dashboard-app/" },
              {
                type: "success",
                text: "Configured tsconfig.json with strict: true",
              },
              {
                type: "success",
                text: "Added prettier.config.ts with Tailwind plugin",
              },
              { type: "cmd", text: "npm run dev", delay: 600 },
              { type: "success", text: "Ready on http://localhost:3000" },
              {
                type: "warn",
                text: "Scaffold confirm হয়েছে। এবার CLAUDE.md setup।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "dashboard-app নামে একটা Next.js 16 App Router project বানান। TypeScript strict mode, Tailwind CSS 4, src/ layout। শুরুতে একটা minimal home page রাখুন। Dev চালিয়ে confirm করুন যে চালু হচ্ছে।",
              },
              {
                role: "claude",
                text: "আপনার setting দিয়ে এখন `create-next-app` চালাচ্ছি।\n\nযা ব্যবহার করছি:\n- App Router (Pages নয়)\n- tsconfig-এ `strict: true`\n- নতুন CSS-based config সহ Tailwind v4\n- `src/app/` directory structure\n\nTailwind class sort plugin সহ Prettier-ও যোগ করব, কারণ এই setup-এর সঙ্গে এটা ভালো মেলে।",
              },
              {
                role: "claude",
                text: "হয়ে গেছে। `localhost:3000`-এ dev server চালু, confirm করেছি।\n\nProject structure:\n```\nsrc/\n  app/\n    layout.tsx\n    page.tsx\n    globals.css\n  components/   (এখন খালি, আপনার component-এর জন্য ready)\n```\n\nএরপর: CLAUDE.md setup করুন, যাতে এই project-এ আপনার convention আমি জানি।",
              },
            ],
          },
        },
        {
          title: "আপনার CLAUDE.md setup করুন",
          description:
            "Project-এর CLAUDE.md Claude-কে আপনার convention জানিয়ে দেয়, তাই যে file-এই হাত দিক, Claude সব জায়গায় একইভাবে সেগুলো মেনে চলে। এতে রাখুন build command, naming convention, component pattern আর import style। Codebase পরিষ্কার রাখতে এর চেয়ে বেশি কাজে দেয় এমন আর কিছু নেই।",
          code: {
            snippet: `cat > CLAUDE.md << 'EOF'
# CLAUDE.md - dashboard-app

## Stack
Next.js 16 (App Router), TypeScript (strict), Tailwind CSS 4, Vercel

## Commands
npm run dev      # Turbopack সহ dev server
npm run build    # Production build
npm run lint     # ESLint
npm run test     # Vitest (যোগ করার পর)

## File-এর নাম
- Component: PascalCase file, যেমন UserCard.tsx
- Utility: camelCase file, যেমন formatDate.ts
- Route segment: hyphen দিয়ে lowercase, যেমন app/user-settings/page.tsx

## Component pattern
- Default হিসেবে Server Component
- 'use client' শুধু তখনই, যখন interactivity বা browser API লাগবে
- Props interface-এর নাম [ComponentName]Props, component-এর ঠিক ওপরে define করা
- Shared component-এ কোনো default export নয় (শুধু named export)
- React.FC type annotation নয়

## Import style
- @/ alias দিয়ে absolute import (tsconfig-এ configure করা)
- Group: 1) React/Next, 2) third-party, 3) internal (@/), 4) relative
- কোনো barrel file নয় (index.ts re-export): সরাসরি source file থেকে import করুন

## TypeScript-এর নিয়ম
- any নয়। unknown ব্যবহার করুন, type guard দিয়ে narrow করুন।
- সহজ local variable-এর type infer হতে দিন। সব exported function-এ explicit type দিন।
- Object shape-এর জন্য interface, union আর mapped type-এর জন্য type।

## Styling
- শুধু Tailwind utility class। CSS module নয়, inline style নয়।
- Class variant clsx বা cn helper দিয়ে।
- Dark mode dark: prefix দিয়ে (class strategy)।

## যা করবেন না
- Pages Router-এর pattern ব্যবহার করবেন না (getServerSideProps, _app.tsx, ইত্যাদি)
- Production code-এ console.log যোগ করবেন না
- আগে না জানিয়ে নতুন dependency যোগ করবেন না
EOF`,
            language: "bash",
          },
          demo: {
            title: "CLAUDE.md লেখা হয়ে গেছে, এখন active",
            steps: [
              { type: "cmd", text: "cat > CLAUDE.md << 'EOF'" },
              { type: "out", text: "(writing conventions...)", delay: 300 },
              { type: "success", text: "Created CLAUDE.md (48 lines)" },
              { type: "out", text: "" },
              { type: "out", text: "যে convention-গুলো ঠিক হয়ে গেল:" },
              {
                type: "out",
                text: "  File-এর নাম: component PascalCase, util camelCase",
              },
              { type: "out", text: "  Component: default হিসেবে Server Component" },
              { type: "out", text: "  Import: @/ alias, কোনো barrel file নয়" },
              { type: "out", text: "  TypeScript: strict, any নয়" },
              {
                type: "warn",
                text: "প্রতিটি session-এর শুরুতে Claude এটা পড়ে নেয়।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এই project-এর জন্য একটা CLAUDE.md বানিয়ে দিন। Convention: default হিসেবে Server Component, শুধু named export, component file PascalCase, কোনো barrel file না, @/ import, strict TypeScript, styling শুধু Tailwind দিয়ে।",
              },
              {
                role: "claude",
                text: "Project root-এ এখন `CLAUDE.md` লিখছি।\n\nএতে রাখব:\n- আপনার package.json থেকে build/test/lint command\n- আপনার বলে দেওয়া naming আর component convention\n- Import-এর group order\n- আপনার tsconfig থেকে নেওয়া TypeScript-এর নিয়ম\n- সাধারণ ভুল ঠেকাতে পরিষ্কার একটা \"যা করবেন না\" list\n\nএই project যে App Router ব্যবহার করে, সেটাও লিখে রাখব, যাতে Pages Router-এর কোনো pattern আমি এড়িয়ে চলি।",
              },
              {
                role: "claude",
                text: "হয়ে গেছে। `CLAUDE.md` save হয়েছে, এই session-এ active।\n\nমূল যা লিখে রেখেছি: default হিসেবে Server Component, named export, `@/` absolute import, কোনো barrel file নয়, কোনো `any` নয়। এখন থেকে যে file-এই হাত দিই, এগুলো মানা হবে।",
              },
            ],
          },
        },
        {
          title: "আপনার প্রথম feature বানান",
          description:
            "এমন একটা dashboard page বানান যেটা server-side-এ data fetch করে। এতে App Router-এর মূল pattern-টা পুরোটাই চলে আসে: async Server Component, Suspense দিয়ে loading state, আর typed props সহ বারবার ব্যবহার করা যায় এমন একটা card component।",
          code: {
            snippet: `claude "app/dashboard/page.tsx-এ একটা dashboard page বানান, যেটা:
1. async Server Component হবে ('use client' থাকবে না)
2. lib/data.ts-এর একটা mock async function থেকে user stats fetch করবে
3. Stats-গুলো StatCard component-এর grid-এ দেখাবে
4. Loading skeleton সহ একটা Suspense boundary থাকবে
5. সব component-এ named export ব্যবহার করবে
6. সবকিছু TypeScript interface দিয়ে ঠিকঠাক type করা থাকবে"`,
            language: "bash",
          },
          demo: {
            title: "Claude dashboard feature বানাচ্ছে",
            steps: [
              {
                type: "cmd",
                text: 'claude "async data fetching সহ একটা dashboard page বানান..."',
              },
              { type: "out", text: "Reading CLAUDE.md...", delay: 400 },
              {
                type: "out",
                text: "Context: default হিসেবে Server Component, named export",
              },
              { type: "out", text: "" },
              { type: "out", text: "Creating files:" },
              {
                type: "success",
                text: "Created src/lib/data.ts (mock async fetch with type)",
              },
              {
                type: "success",
                text: "Created src/components/StatCard.tsx (named export, typed props)",
              },
              {
                type: "success",
                text: "Created src/components/StatCardSkeleton.tsx (loading state)",
              },
              {
                type: "success",
                text: "Created src/app/dashboard/loading.tsx (Suspense fallback)",
              },
              {
                type: "success",
                text: "Created src/app/dashboard/page.tsx (async Server Component)",
              },
              {
                type: "warn",
                text: "কোনো client component লাগেনি। পুরোটাই server rendering।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "app/dashboard/page.tsx-এ একটা dashboard page বানান। Async Server Component, lib/data.ts-এর একটা mock function থেকে user stats fetch করবে, StatCard grid-এ stats দেখাবে, loading skeleton সহ Suspense, সবকিছু TypeScript-এ typed।",
              },
              {
                role: "claude",
                text: "এখন বানাচ্ছি। আপনার CLAUDE.md-এর convention মেনে:\n\n- `page.tsx` হবে একটা `async` Server Component (`use client` নয়)\n- `StatCard` হবে `src/components/StatCard.tsx`-এ named export\n- `lib/data.ts` একটা typed `getUserStats()` async function export করবে\n- Loading state `app/dashboard/loading.tsx` দিয়ে (Next.js-এর file convention)\n- প্রতিটি component-এর ওপরে interface দিয়ে সব props typed\n\nকোনো barrel file নয়, সব জায়গায় `@/` import।",
              },
              {
                role: "claude",
                text: "হয়ে গেছে। পাঁচটা file বানিয়েছি।\n\nData flow:\n1. `page.tsx` একদম ওপরে `await getUserStats()` call করে\n2. Fetch চলার সময় Next.js suspend করে আর `loading.tsx` দেখায়\n3. Resolve হলে `StatCard` grid render করে\n\n`npm run dev` চালিয়ে `/dashboard`-এ যান। Mock function-এ 1.2s delay রাখা আছে, যাতে skeleton কাজ করছে সেটা দেখতে পান।",
              },
            ],
          },
        },
        {
          title: "Test আর type যোগ করুন",
          description:
            "Claude component আর utility function-গুলোর জন্য Vitest test লেখে, TypeScript strict mode শূন্য error-এ pass করছে কি না দেখে, আর কোথাও type-এ ফাঁক পেলে জানিয়ে দেয়। Test ছাড়া কোনো code ship হয় না।",
          code: {
            snippet: `claude "এই project-এ test যোগ করুন:
1. Vitest আর @testing-library/react install করুন
2. lib/data.test.ts-এ getUserStats()-এর unit test লিখুন
3. StatCard.test.tsx-এ StatCard-এর component test লিখুন
4. Test চালান, কিছু fail করলে ঠিক করুন
5. তারপর npx tsc --noEmit চালান, TypeScript error থাকলে ঠিক করুন"`,
            language: "bash",
          },
          demo: {
            title: "Test লেখা হলো, TypeScript verify হলো",
            steps: [
              {
                type: "cmd",
                text: 'claude "Vitest test যোগ করুন, TypeScript verify করুন..."',
              },
              {
                type: "out",
                text: "Installing: vitest @testing-library/react @vitejs/plugin-react",
                delay: 400,
              },
              { type: "success", text: "Added vitest.config.ts" },
              { type: "success", text: "Created src/lib/data.test.ts (4 tests)" },
              {
                type: "success",
                text: "Created src/components/StatCard.test.tsx (3 tests)",
              },
              { type: "cmd", text: "npm run test", delay: 400 },
              { type: "success", text: "PASS  src/lib/data.test.ts (4 tests)" },
              {
                type: "success",
                text: "PASS  src/components/StatCard.test.tsx (3 tests)",
              },
              { type: "cmd", text: "npx tsc --noEmit", delay: 300 },
              { type: "success", text: "TypeScript: 0 errors" },
              {
                type: "warn",
                text: "সব test green। Strict mode clean। Deploy-এর জন্য ready।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Vitest আর Testing Library যোগ করুন। getUserStats আর StatCard-এর test লিখুন। চালান। তারপর tsc --noEmit চালিয়ে TypeScript error থাকলে ঠিক করুন।",
              },
              {
                role: "claude",
                text: "Testing dependency install করছি, Vitest configure করছি।\n\nTest plan:\n- `data.test.ts`: return shape test, async delay resolve হয় কি না test, data-র edge case test\n- `StatCard.test.tsx`: required props দিয়ে render হয় কি না, optional props না থাকলে ঠিকমতো চলে কি না, প্রতিটি variant-এ ঠিক Tailwind class বসে কি না\n\nআগে test লিখব, তারপর চালাব, কিছু fail করলে ঠিক করব, তারপর TypeScript-এ যাব।",
              },
              {
                role: "claude",
                text: '৭টা test pass করছে। TypeScript error ০।\n\nএকটা জিনিস ঠিক করেছি: `StatCardSkeleton`-এর `className` prop-এ একটা implicit `any` ছিল। ওটা `""` default সহ `string | undefined` করে দিয়েছি। Strict mode clean।\n\nTest coverage: `lib/data.ts` ১০০%, `StatCard.tsx` ৮৭% (loading state-এর path skeleton test-এ cover হয়েছে)।',
              },
            ],
          },
        },
        {
          title: "Vercel-এ deploy করুন",
          description:
            "একটা command-এই project live হয়ে যায়। Vercel নিজে থেকেই Next.js চিনে নেয়, ঠিক setting দিয়ে build করে, আর আপনাকে একটা production URL দেয়। Standard Next.js 16 App Router project-এর জন্য কোনো configuration file লাগে না।",
          code: {
            snippet: `# আগে আপনার কাজ commit করুন
git add -A && git commit -m "feat: initial dashboard with tests"

# Production-এ deploy করুন
vercel --prod`,
            language: "bash",
          },
          demo: {
            title: "Production-এ deploy হয়ে গেছে",
            steps: [
              {
                type: "cmd",
                text: 'git add -A && git commit -m "feat: initial dashboard with tests"',
              },
              {
                type: "success",
                text: "[main abc1234] feat: initial dashboard with tests",
              },
              { type: "out", text: " 8 files changed, 312 insertions(+)" },
              { type: "cmd", text: "vercel --prod", delay: 400 },
              {
                type: "out",
                text: "Detected Next.js 16 (App Router)",
                delay: 500,
              },
              { type: "out", text: "Building..." },
              { type: "out", text: "Build completed in 18s" },
              {
                type: "success",
                text: "Deployed to https://dashboard-app-abc.vercel.app",
              },
              { type: "warn", text: "আপনার app এখন live। URL-টা share করুন।" },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "সবকিছু commit করে Vercel production-এ deploy করে দিন।",
              },
              {
                role: "claude",
                text: "Deploy-এর ধাপগুলো চালাচ্ছি:\n\n1. সব file stage করতে `git add -A`\n2. Conventional message দিয়ে commit\n3. Deploy করতে `vercel --prod`\n\nVercel নিজে থেকেই Next.js 16 চিনে ঠিক build setting ব্যবহার করবে। Standard App Router project-এ `vercel.json` লাগে না।",
              },
              {
                role: "claude",
                text: "Deploy হয়ে গেছে।\n\nProduction URL: `https://dashboard-app-abc.vercel.app`\n\nBuild summary:\n- ৫টা route pre-render হয়েছে\n- `/dashboard` প্রতিটি request-এ server-side render হয়\n- Build time: 18s\n\nআপনার CLAUDE.md, test আর TypeScript config সব commit করা আছে। এরপর যে developer (বা Claude session) এই project খুলবে, সে পুরো context পেয়ে যাবে।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "Claude Code দিয়ে debug আর refactor করুন",
        href: "/tutorials/debug-and-refactor",
      },
    },
  },

  "debug-and-refactor": {
    sourceHash: "35854526ce01919d",
    translatedAt: "2026-10-06",
    content: {
      title: "Senior dev-এর মতো debug আর refactor করুন",
      slug: "debug-and-refactor",
      duration: "১৫ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["terminal", "ide"],
      description:
        "Senior engineer-রা আসলে যেভাবে Claude Code ব্যবহার করেন, আপনিও সেভাবে করুন। আসল stack trace দিন, test green রেখে component refactor করুন, আর debugging-এর এমন একটা systematic অভ্যাস তৈরি করুন যা project বড় হলেও কাজ করে।",
      intro:
        "Claude Code কোনো জাদুর কাঠি নয়। এটা একজন pair programmer, যে আপনার codebase পড়ে, data flow trace করে, git history দেখে, আর একবারে একটা করে hypothesis দাঁড় করায়। Team-এ সদ্য join করা একজন senior engineer-এর সঙ্গে যেভাবে কাজ করতেন, ঠিক সেভাবে ভেবেচিন্তে এই process কীভাবে চালাবেন, এই tutorial-এ সেটা দেখবেন।",
      steps: [
        {
          title: "আপনার project-এর context setup করুন",
          description:
            "Claude-এর কাজে লাগার মতো output আর গতানুগতিক generic output-এর পার্থক্য প্রায় সব সময় CLAUDE.md-তে। React/TypeScript project-এর জন্য এতে রাখুন build command, test command, মূল pattern, আর যেসব convention বাইরে থেকে দেখে বোঝা যায় না। প্রতিটি request-এ Claude এটা ব্যবহার করবে, আপনাকে বারবার একই কথা বলতে হবে না।",
          code: {
            snippet: `# React/Next.js/TypeScript project-এর CLAUDE.md

## Stack
Next.js 15 (App Router), TypeScript strict, Tailwind CSS, Prisma, Vitest

## Commands
npm run dev          # Dev server
npm run build        # Production build (tsc + next build চালায়)
npm test             # Vitest unit test
npm run test:e2e     # Playwright end-to-end test
npx tsc --noEmit    # শুধু type check

## মূল pattern
- শুধু functional component, prop interface explicit
- কোনো barrel file নয় (source থেকে সরাসরি import করুন)
- Default হিসেবে Server Component, দরকার হলেই শুধু 'use client'
- বাইরে থেকে আসা সব input Zod দিয়ে validate করুন
- প্রতিটি বড় route segment-এ error boundary

## Testing-এর নিয়ম
- Refactor করার পর সব সময় test চালান
- Unit test-এ database layer mock করবেন না (Prisma test DB ব্যবহার করুন)
- Test file পাশাপাশি রাখুন: UserCard.tsx-এর পাশেই UserCard.test.tsx

## যা কখনো করবেন না
- কোনো any type নয়
- Production code-এ কোনো console.log নয়
- Component file থেকে কোনো default export নয়`,
            language: "markdown",
          },
          demo: {
            title: "প্রতিটি request-এর আগে Claude আপনার context পড়ে নেয়",
            steps: [
              { type: "cmd", text: "cat CLAUDE.md" },
              { type: "out", text: "# KAS React App-এর CLAUDE.md", delay: 200 },
              { type: "out", text: "" },
              { type: "out", text: "## Stack" },
              {
                type: "out",
                text: "Next.js 15, TypeScript strict, Tailwind, Prisma, Vitest",
              },
              { type: "out", text: "" },
              { type: "out", text: "## Commands" },
              {
                type: "out",
                text: "npm test   npm run build   npx tsc --noEmit",
              },
              { type: "out", text: "" },
              { type: "out", text: "## Testing-এর নিয়ম" },
              { type: "out", text: "Refactor করার পর সব সময় test চালান।" },
              {
                type: "success",
                text: "Context load হয়েছে। প্রতিটি request-এ Claude এটা ব্যবহার করবে।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এই Next.js TypeScript project-এর জন্য একটা CLAUDE.md বানিয়ে দিন। আমরা Vitest, Prisma আর Tailwind use করি। Refactor-এর পর সব সময় test চালাতে হবে। কোনো any type না। Production-এ কোনো console.log না।",
              },
              {
                role: "claude",
                text: "আপনার project layout দেখতে পাচ্ছি। আপনার আসল setup অনুযায়ী CLAUDE.md-টা এমন হবে:\n\n```markdown\n## Stack\nNext.js 15 (App Router), TypeScript strict, Tailwind CSS, Prisma, Vitest\n\n## Commands\nnpm run dev   npm run build   npm test   npx tsc --noEmit\n\n## Convention\n- Functional component, prop interface explicit\n- Default হিসেবে Server Component, দরকার হলেই শুধু use client\n- কোনো any type নয়, production-এ কোনো console.log নয়\n\n## Testing-এর নিয়ম\n- প্রতিটি refactor-এর পর npm test চালান\n- Test file source-এর পাশেই রাখুন\n```\n\nএটা CLAUDE.md-তে লিখে দেব?",
              },
            ],
          },
        },
        {
          title: "একটা আসল error debug করুন",
          description:
            "Bug-এর বর্ণনা লিখে বোঝানো বন্ধ করুন। হুবহু stack trace paste করুন। Claude আসল file-গুলো ধরে trace করবে, recent git change দেখবে, আর fix suggest করার আগে root cause বলবে। আসল কথা: hypothesis দাঁড় করানোর আগে ওকে code দেখতে দিন।",
          code: {
            snippet: `# Summary নয়, পুরো stack trace paste করুন
claude "এই error-টা fix করে দিন:

TypeError: Cannot read properties of undefined (reading 'userId')
    at getEnrollmentStatus (src/lib/enrollment.ts:47:28)
    at EnrollmentButton (src/components/EnrollmentButton.tsx:23:18)
    at renderWithHooks (react-dom/cjs/react-dom.development.js:14985:18)

Login না করে কেউ /courses/[id]-এ গেলেই এটা হয়।"`,
            language: "bash",
          },
          demo: {
            title: "Claude আন্দাজ না করে bug trace করে",
            steps: [
              {
                type: "cmd",
                text: 'claude "enrollment.ts:47-এর এই TypeError-টা fix করে দিন"',
              },
              { type: "out", text: "Reading CLAUDE.md...", delay: 300 },
              {
                type: "out",
                text: "Reading src/lib/enrollment.ts...",
                delay: 500,
              },
              {
                type: "out",
                text: "Reading src/components/EnrollmentButton.tsx...",
                delay: 400,
              },
              {
                type: "out",
                text: "Checking git log -- src/lib/enrollment.ts...",
                delay: 400,
              },
              { type: "out", text: "" },
              {
                type: "out",
                text: "Root cause: session?.user optional, কিন্তু line 47 সরাসরি",
              },
              {
                type: "out",
                text: "userId access করছে। Pattern-টা এসেছে commit a3f92c1-এ (৩ দিন আগে)।",
              },
              { type: "out", text: "" },
              {
                type: "out",
                text: "Fix: session null হলে early return দিয়ে guard করা।",
              },
              {
                type: "success",
                text: "Updated enrollment.ts:47 with null check",
              },
              { type: "success", text: "Running npm test..." },
              { type: "success", text: "14 passed, 0 failed" },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এটা fix করে দিন:\n\nTypeError: Cannot read properties of undefined (reading 'userId')\n    at getEnrollmentStatus (src/lib/enrollment.ts:47:28)\n    at EnrollmentButton (src/components/EnrollmentButton.tsx:23:18)\n\nLogin না করে /courses/[id]-এ গেলে এটা হয়।",
              },
              {
                role: "claude",
                text: "enrollment.ts আর EnrollmentButton.tsx এখন পড়ছি।\n\nRoot cause: `getEnrollmentStatus` line 47-এ `session` আছে কি না check না করেই `session.user.userId` call করছে। Function-টা ধরে নিচ্ছে user logged in, কিন্তু এই route-এ logged in না থাকা user-রাও যেতে পারে।\n\nGit history দেখেছি: ৩ দিন আগে একটা refactor-এ session access function-এর ভেতরে সরানো হয়েছিল, তখনই এই line বদলেছে। আগে caller নিজেই guard করত।\n\nFix:\n\n```typescript\n// আগে\nconst { userId } = session.user;\n\n// পরে\nif (!session?.user) return null;\nconst { userId } = session.user;\n```\n\nApply করে দিয়েছি। এখন আপনার test চালাব?",
              },
            ],
          },
        },
        {
          title: "নিশ্চিন্তে refactor করুন",
          description:
            'Claude-কে বলুন কী বদলাতে চান, বলে দিন test green থাকতেই হবে, তারপর ওকে কাজ করতে দিন। CLAUDE.md-এর "refactor করার পর সব সময় test চালান" নিয়মের কারণে Claude নিজেই পুরো test suite চালায়, আর কিছু ভাঙলে জানায়। আপনি review করবেন diff, পুরো process নয়।',
          code: {
            snippet: `# ভালো refactoring prompt: scope + constraint
claude "UserCard component থেকে avatar-এর logic বের করে
আলাদা একটা AvatarWithFallback component বানান। আগের সব
test pass করতে হবে। বাইরের props interface একদম বদলাবেন না।"`,
            language: "bash",
          },
          demo: {
            title: "Test-কে safety net রেখে refactor",
            steps: [
              {
                type: "cmd",
                text: 'claude "UserCard refactor করুন: avatar-টা AvatarWithFallback-এ বের করে আনুন"',
              },
              {
                type: "out",
                text: "Reading src/components/UserCard.tsx...",
                delay: 300,
              },
              {
                type: "out",
                text: "Reading src/components/UserCard.test.tsx...",
                delay: 300,
              },
              { type: "out", text: "" },
              { type: "out", text: "Plan:" },
              {
                type: "out",
                text: "  1. Avatar-এর JSX বের করে AvatarWithFallback.tsx-এ রাখব",
              },
              {
                type: "out",
                text: "  2. UserCard-এ AvatarWithFallback import করব",
              },
              {
                type: "out",
                text: "  3. UserCard-এর props interface যেমন আছে তেমন রাখব",
              },
              { type: "out", text: "  4. Verify করতে test চালাব" },
              {
                type: "success",
                text: "Created src/components/AvatarWithFallback.tsx",
              },
              { type: "success", text: "Updated src/components/UserCard.tsx" },
              { type: "out", text: "Running npm test...", delay: 400 },
              {
                type: "success",
                text: "22 passed, 0 failed. Refactor শেষ।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "UserCard.tsx refactor করে দিন। Avatar-এর logic বের করে আলাদা একটা AvatarWithFallback component বানান। আগের সব test pass করতে হবে। বাইরের props interface বদলাবেন না।",
              },
              {
                role: "claude",
                text: "UserCard.tsx আর UserCard.test.tsx পড়ছি।\n\nAvatar-এর অংশটা line 34-58 জুড়ে: image load, error হলে initials দেখানোর fallback, আর size variant-গুলো। এটা আমি নিজস্ব props interface সহ `AvatarWithFallback.tsx`-এ বের করে আনব।\n\nUserCard এটা import করবে, আর এখন inline-এ যে value-গুলো হিসাব করে, সেগুলোই pass করবে। External API একই থাকবে।\n\nএখন file বানাচ্ছি।",
              },
              {
                role: "claude",
                text: "হয়ে গেছে। `AvatarWithFallback.tsx` বানিয়েছি, `UserCard.tsx` update করেছি।\n\nএখন test চালাচ্ছি (CLAUDE.md-এর নিয়ম অনুযায়ী)।\n\n22 passed, 0 failed।\n\nDiff পরিষ্কার। UserCard.tsx-এ বদল শুধু import আর বের করে আনা JSX block। Props interface-এ হাত দেওয়া হয়নি।",
              },
            ],
          },
        },
        {
          title: "Systematic উপায়",
          description:
            "Senior engineer-রা আন্দাজে কিছু করেন না। তাঁরা symptom থেকে উল্টো দিকে data flow trace করেন, সম্প্রতি কী বদলেছে দেখেন, আর একবারে একটা hypothesis নিয়ে এগোন। Claude-কেও ঠিক এটাই করতে বলতে পারেন। Prompt-এ পরিষ্কার করে বলে দিন, তাহলে কোনো code-এ হাত দেওয়ার আগে ও কীভাবে ভাবছে সেটা দেখাবে।",
          code: {
            snippet: `# Fix করার আগে Claude-কে trace করতে বলুন
claude "User একটা lesson শেষ করার পর CourseProgress component
stale data দেখাচ্ছে। এখনই কোনো fix suggest করবেন না।

আগে API call থেকে UI render পর্যন্ত data flow trace করুন।
এই path-এ recent কোনো change হয়েছে কি না git history দেখুন।
সবচেয়ে likely কারণটা বের করুন। তারপর আমার confirmation-এর জন্য অপেক্ষা করুন।"`,
            language: "bash",
          },
          demo: {
            title: "আগে trace, পরে fix",
            steps: [
              {
                type: "cmd",
                text: 'claude "CourseProgress-এ stale data। আগে data flow trace করুন।"',
              },
              {
                type: "out",
                text: "Reading src/components/CourseProgress.tsx...",
                delay: 300,
              },
              {
                type: "out",
                text: "Reading src/hooks/useCourseProgress.ts...",
                delay: 300,
              },
              {
                type: "out",
                text: "Reading src/lib/api/progress.ts...",
                delay: 300,
              },
              {
                type: "out",
                text: "Checking git log -- src/lib/api/progress.ts...",
                delay: 400,
              },
              { type: "out", text: "" },
              { type: "out", text: "Data flow:" },
              {
                type: "out",
                text: "  API call -> useCourseProgress -> CourseProgress render",
              },
              { type: "out", text: "" },
              {
                type: "out",
                text: "Recent change (২ দিন আগে): useCourseProgress.ts-এর",
              },
              {
                type: "out",
                text: "React Query config-এ staleTime: Infinity যোগ করা হয়েছে",
              },
              { type: "out", text: "" },
              {
                type: "warn",
                text: "সবচেয়ে likely কারণ: mutation-এর পর staleTime refetch আটকে দিচ্ছে।",
              },
              {
                type: "warn",
                text: "Fix apply করার আগে আপনার confirmation-এর অপেক্ষায় আছি।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "Lesson শেষ করার পর CourseProgress stale data দেখাচ্ছে। এখনই fix suggest করবেন না। API থেকে render পর্যন্ত data flow trace করুন। এই path-এ recent change আছে কি না git history দেখুন। সবচেয়ে likely কারণটা বলুন।",
              },
              {
                role: "claude",
                text: "Trace করছি। CourseProgress.tsx, useCourseProgress.ts আর API layer পড়ছি।\n\nData flow: lesson completion mutation fire হয়, React Query-র invalidateQueries call হয়, useCourseProgress আবার fetch করে, CourseProgress আবার render হয়।\n\nuseCourseProgress.ts-এর git history: ২ দিন আগে একটা commit query config-এ `staleTime: Infinity` যোগ করেছে। এর ফলে React Query কখনোই data-কে stale ধরে না, তাই mutation invalidation-এর পরেও cache আর refetch করে না।\n\nসবচেয়ে likely কারণ: আপনার mutation যে refetch trigger করে, `staleTime: Infinity` সেটা আটকে দিচ্ছে। Invalidation fire হচ্ছে, কিন্তু query সেটা ignore করছে।\n\nFix apply করে দেব?",
              },
            ],
          },
        },
        {
          title: "শেখাটা ধরে রাখুন",
          description:
            "Debugging session শেষে সবচেয়ে ভালো কাজ হলো, যা শিখলেন তা CLAUDE.md-তে যোগ করা। প্রতিটি project-এ এমন কিছু pattern থাকে যেখানে মানুষ বারবার আটকে যায়। একবার লিখে রাখুন, তাহলে এই codebase-এ পরের প্রতিটি request-এ Claude নিজে থেকেই সেই ভুলগুলো এড়িয়ে চলবে।",
          code: {
            snippet: `# প্রতিটি session-এর পর CLAUDE.md-তে যোগ করুন

## Known Gotchas
- React Query: mutation-এর ওপর নির্ভর করা query-তে কখনো staleTime: Infinity
  set করবেন না। staleTime: 0 দিন, অথবা বাদ দিন (React Query-র default-ই যথেষ্ট)।
- Page (auth) route group-এ না থাকলেও public route-এ session?.user undefined
  হতে পারে। userId access করার আগে সব সময় guard দিন।
- AvatarWithFallback-এ width/height prop explicit দিতে হয়।
  শুধু CSS দিয়ে parent থেকে size নেয় না।

## Debugging-এর preference
- Fix suggest করার আগে data flow trace করুন
- Affected file-এ recent change দেখতে git log check করুন
- প্রতিটি refactor-এর পর npm test চালান
- Code বদলানোর আগে root cause আর এক লাইনের explanation দেখান`,
            language: "markdown",
          },
          demo: {
            title: "CLAUDE.md হয়ে ওঠে team-এর জমানো অভিজ্ঞতা",
            steps: [
              { type: "cmd", text: "# প্রতিটা debugging session-এর পর:" },
              {
                type: "cmd",
                text: 'claude "staleTime নিয়ে যা শিখলাম, CLAUDE.md-তে যোগ করে দিন"',
              },
              { type: "out", text: "Appending to CLAUDE.md...", delay: 400 },
              { type: "success", text: "Added: ## Known Gotchas section" },
              { type: "success", text: "Added: React Query staleTime warning" },
              { type: "success", text: "Added: session?.user guard reminder" },
              { type: "out", text: "" },
              {
                type: "warn",
                text: "পরের বার এই repo-তে React Query-র কোনো query দেখলে,",
              },
              { type: "warn", text: "Claude আগে থেকেই আপনার staleTime-এর নিয়ম জানবে।" },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এইমাত্র যা শিখলাম CLAUDE.md-তে যোগ করে দিন: staleTime-এর সমস্যা, session?.user guard pattern, আর একটা preference যে fix suggest করার আগে সব সময় data flow trace করতে হবে।",
              },
              {
                role: "claude",
                text: "CLAUDE.md-তে যোগ করেছি:\n\n```markdown\n## Known Gotchas\n- React Query: mutation-এর ওপর নির্ভর করা query-তে কখনো staleTime: Infinity set করবেন না\n- Public route-এ session?.user undefined হতে পারে: userId access করার আগে সব সময় guard দিন\n\n## Debugging-এর preference\n- আগে data flow trace, পরে fix suggest\n- Hypothesis দাঁড় করানোর আগে affected file-এর git log দেখুন\n- প্রতিটি refactor-এর পর npm test চালান\n```\n\nএই project-এর পরের সব session-এ এটা এখন active context।",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "পরের ধাপ: PR Review Workflow",
        href: "/tutorials/pr-review-workflow",
      },
    },
  },

  "pr-review-workflow": {
    sourceHash: "b419b22803a635c2",
    translatedAt: "2026-10-06",
    content: {
      title: "যে PR review সত্যিই bug ধরে",
      slug: "pr-review-workflow",
      duration: "১৫ মিনিট",
      difficulty: "intermediate",
      availableRoutes: ["terminal", "ide"],
      description:
        "ভালো করে না দেখেই PR approve করা বন্ধ করুন। Claude দিয়ে আসল bug ধরুন, কোন code path-এর test নেই খুঁজে বের করুন, আর এমন review comment লিখুন যা সত্যিই কাজে আসে।",
      intro:
        "বেশিরভাগ PR review জরুরি bug-গুলোই miss করে। Reviewer-রা চোখ বুলিয়ে style-এর সমস্যা আর সহজে চোখে পড়া ভুল খোঁজেন, কিন্তু সূক্ষ্ম logic error, handle না করা edge case, আর যে code path-এর কোনো test নেই, সেগুলো এড়িয়ে যায়। এই tutorial-এ দেখবেন Claude-কে কীভাবে দ্বিতীয় reviewer হিসেবে ব্যবহার করবেন, যে diff পড়ে, context বোঝে, আর মানুষ সাধারণত যা miss করে সেগুলো ধরিয়ে দেয়।",
      steps: [
        {
          title: "PR-টা local-এ নিয়ে আসুন",
          description:
            "gh CLI দিয়ে PR branch local-এ check out করুন। এতে Claude শুধু diff নয়, পুরো file-এর context পায়। আপনি চান Claude আসল code পড়ুক, কাটছাঁট করা কোনো patch নয়।",
          code: {
            snippet: `# Open PR-গুলোর list দেখুন, একটা বেছে নিন
gh pr list

# Number দিয়ে নির্দিষ্ট একটা PR check out করুন
gh pr checkout 247

# অথবা branch-এর নাম দিয়ে check out করুন
gh pr checkout feature/user-auth-refactor

# শুরু করার আগে PR description আর file list দেখে নিন
gh pr view
gh pr diff 247 --name-only`,
            language: "bash",
          },
          demo: {
            title: "PR branch check out করুন",
            steps: [
              { type: "cmd", text: "gh pr list" },
              {
                type: "out",
                text: "#247  Refactor user authentication flow   feature/user-auth-refactor  OPEN",
              },
              {
                type: "out",
                text: "#251  Add payment webhook handler          feature/stripe-webhooks      OPEN",
              },
              {
                type: "out",
                text: "#253  Fix dashboard loading state           fix/dashboard-skeleton       OPEN",
              },
              { type: "cmd", text: "gh pr checkout 247", delay: 600 },
              { type: "out", text: "remote: Enumerating objects: 18, done." },
              {
                type: "out",
                text: "Switched to branch 'feature/user-auth-refactor'",
              },
              {
                type: "success",
                text: "Branch check out হয়েছে। এখন আপনি PR branch-এ, পুরো file context সহ।",
              },
              {
                type: "warn",
                text: "Tip: Claude-কে review করতে বলার আগে `gh pr view` চালিয়ে description পড়ে নিন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমি PR #247 (feature/user-auth-refactor) check out করেছি। Review শুরু করার আগে কী কী context জোগাড় করা উচিত?",
              },
              {
                role: "claude",
                text: "আগে context জোগাড় করার চিন্তাটা ঠিক। আমার suggestion:\n\n1. PR description: `gh pr view 247` চালিয়ে PR-এর উদ্দেশ্য পড়ুন\n2. File list: কী কী বদলেছে দেখতে `gh pr diff 247 --name-only`\n3. Commit history: change-গুলো কোন ক্রমে এসেছে বুঝতে `git log main..HEAD --oneline`\n\nএগুলো দেখতে পেলে বুঝব কোথায় focus করতে হবে: auth logic, token handling, session management, নাকি অন্য কিছু। কোন file-গুলো বদলেছে?",
              },
            ],
          },
        },
        {
          title: "Claude-কে review করতে বলুন",
          description:
            "Branch check out হয়ে গেলে Claude-কে PR review করতে বলুন। Diff দিন, সঙ্গে PR দিয়ে কী করার চেষ্টা হচ্ছে সেই context-ও দিন। Prompt যত নির্দিষ্ট হবে, review তত কাজের হবে।",
          code: {
            snippet: `# পুরো diff নিয়ে Claude-কে pipe করে দিন
gh pr diff 247 | claude "এই PR diff-টা review করুন। Focus করুন correctness,
security issue, missing error handling আর edge case-এ।
PR description-এ লেখা: session cookie-র বদলে JWT token ব্যবহার করতে
user authentication refactor করা হয়েছে।"

# অথবা Claude session-এর ভেতরে interactive ভাবে কাজ করুন
claude
# তারপর diff paste করে জিজ্ঞেস করুন:
# Author বলছেন এটা auth-কে session থেকে JWT-তে নিয়ে যাচ্ছে।
# এই change-এ সবচেয়ে বড় risk কোনগুলো?`,
            language: "bash",
          },
          demo: {
            title: "Claude PR পড়ছে",
            steps: [
              {
                type: "cmd",
                text: 'gh pr diff 247 | claude "এই PR review করুন। Security আর correctness-এ focus করুন। Refactor: session থেকে JWT।"',
              },
              {
                type: "out",
                text: "Reading diff... (18 files, +847 -312 lines)",
                delay: 800,
              },
              {
                type: "out",
                text: "Analyzing: src/auth/jwt.ts, src/middleware/auth.ts, src/api/login.ts...",
              },
              {
                type: "warn",
                text: "ISSUE: startup-এ defined কি না check না করেই process.env থেকে JWT secret পড়া হচ্ছে",
              },
              {
                type: "warn",
                text: "ISSUE: Token expiry ৩০ দিন, কোনো refresh token logic নেই",
              },
              {
                type: "warn",
                text: "ISSUE: logout() cookie মুছে দেয়, কিন্তু expiry পর্যন্ত JWT valid থাকে",
              },
              { type: "out", text: "" },
              {
                type: "out",
                text: "আরও দেখা গেছে: ৪টা API route update হয়েছে, কিন্তু ২টা এখনও পুরনো session middleware ব্যবহার করছে",
              },
              {
                type: "success",
                text: "পুরো review শেষ। ৩টা blocking issue, ৪টা suggestion।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "এই PR-টা review করুন। এটা auth-কে session cookie থেকে JWT-তে নিয়ে যাচ্ছে। সবচেয়ে বড় risk কোনগুলো?\n\n[gh pr diff 247-এর output paste করা]",
              },
              {
                role: "claude",
                text: "Diff পড়েছি। তিনটা জিনিস blocking issue হিসেবে চোখে পড়ছে:\n\n**১. JWT invalidation-এ ফাঁক (critical)**\n`src/auth/session.ts`-এর `logout()` cookie মুছে দেয়, কিন্তু JWT নিজে expiry পর্যন্ত valid থাকে। Logout-এর পর কোনো token চুরি হলে সেটা আরও ৩০ দিন কাজ করবে। হয় একটা token blocklist লাগবে, নয়তো refresh token সহ অল্প সময়ের access token।\n\n**২. Startup validation নেই**\n`src/auth/jwt.ts`-এর line 12 `process.env.JWT_SECRET` পড়ে, কিন্তু সেটা define করা আছে কি না কখনো check করে না। Production-এ এটা না থাকলে startup-এ পরিষ্কার একটা failure-এর বদলে, auth-এ যাওয়া প্রথম request-টাই unhandled error throw করবে।\n\n**৩. Migration শেষ হয়নি**\n`src/api/payments/route.ts` আর `src/api/admin/route.ts` এখনও পুরনো middleware থেকে `withSession` import করছে। Production-এ এগুলো চুপচাপ JWT auth check এড়িয়ে যাবে।\n\nএগুলোর জন্য review comment draft করে দেব?",
              },
            ],
          },
        },
        {
          title: "সন্দেহজনক code-এর আরও গভীরে যান",
          description:
            "Claude কিছু flag করলে সেখানে follow up করুন। ওকে নির্দিষ্ট file-টা পড়তে বলুন, data flow trace করতে বলুন, আর ঠিক কী ভুল হতে পারে তা বুঝিয়ে বলতে বলুন। আসল bug-গুলো এখানেই বেরিয়ে আসে।",
          code: {
            snippet: `# Token expire হলে কী হয়, trace করুন
claude "src/auth/jwt.ts আর src/middleware/auth.ts একসঙ্গে পড়ুন।
JWT token expire হয়ে গেলে কী হয় trace করুন: middleware কি 401 return করে,
চুপচাপ এগিয়ে যায়, নাকি redirect করে? আমাকে code path-টা দেখান।"

# পুরো codebase জুড়ে একটা pattern check করুন
claude "API route-গুলোতে আমরা যেখানে যেখানে authentication check করি, সব খুঁজে বের করুন।
সবগুলো কি নতুন JWT middleware ব্যবহার করছে, নাকি কিছু এখনও session-এ আছে?"

# Deploy হলে কী প্রভাব পড়বে ভেবে দেখুন
claude "এই PR deploy হলে যারা এখন logged in আছেন, তাদের কী হবে?
তাদের পুরনো session cookie আর valid থাকবে না। Transition-টা কীভাবে হবে?"`,
            language: "bash",
          },
          demo: {
            title: "নির্দিষ্ট একটা issue-র গভীরে যাওয়া",
            steps: [
              {
                type: "cmd",
                text: 'claude "src/auth/jwt.ts পড়ুন। Token expire হলে কী হয়?"',
              },
              { type: "out", text: "Reading src/auth/jwt.ts...", delay: 500 },
              {
                type: "out",
                text: "Line 34: verifyToken() JsonWebTokenError আর TokenExpiredError দুটোই catch করে",
              },
              {
                type: "out",
                text: "Line 41: দুটো error-এই null return করে (expired আর invalid-এর মধ্যে কোনো পার্থক্য নেই)",
              },
              {
                type: "out",
                text: "Line 52: Middleware null check করে, তারপর req.user = undefined রেখে next() call করে",
              },
              {
                type: "warn",
                text: "PROBLEM: Expired token-কে unauthenticated-এর মতোই ধরা হচ্ছে। কোনো 401 return হয় না।",
              },
              {
                type: "warn",
                text: "PROBLEM: req.user = undefined। যে route null check করে না, সেগুলো crash করবে।",
              },
              { type: "out", text: "" },
              {
                type: "out",
                text: "Checking downstream consumers of req.user...",
                delay: 600,
              },
              {
                type: "warn",
                text: "src/api/profile/route.ts line 8: null check ছাড়াই req.user.id access করা হচ্ছে",
              },
              {
                type: "success",
                text: "Root cause trace হয়েছে। Staging-এ যে 500 error দেখা যাচ্ছিল, এটাই তার কারণ।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: 'আপনি logout-এর issue-টা flag করেছেন। পুরো data flow trace করুন: user "logout"-এ click করা থেকে JWT invalid হওয়া পর্যন্ত আসলে কী কী হয়? আসল file-গুলো পড়ে দেখুন।',
              },
              {
                role: "claude",
                text: "`src/auth/session.ts`, `src/api/auth/logout/route.ts` আর `src/middleware/auth.ts` পড়েছি। আসল flow-টা এই:\n\n1. User logout-এ click করেন\n2. `POST /api/auth/logout` `clearAuthCookie()` call করে, cookie expired করে দেয়, 200 return করে\n3. Browser cookie মুছে ফেলে\n4. JWT কোথাও invalidate হয় না। কোনো blocklist নেই, token revocation নেই, deny list নেই।\n5. কোনো attacker-এর কাছে JWT string থাকলে (log, proxy বা hack হওয়া কোনো machine থেকে), cookie ছাড়াই সে সেটা সরাসরি `Authorization: Bearer` header-এ ব্যবহার করতে পারবে।\n6. Issue হওয়ার সময় থেকে ৩০ দিন সেই token কাজ করবে।\n\nFix-এর option: (a) refresh token flow সহ অল্প সময়ের access token (১৫ মিনিট), (b) Redis-backed একটা blocklist, logout হলে যেখানে token যোগ হবে, অথবা (c) JWT payload-এর ভেতরে একটা session ID, প্রতিটি request-এ যেটা DB-র সঙ্গে মিলিয়ে দেখা হবে।\n\n`src/lib/redis.ts`-এ আপনার Redis instance আগে থেকেই আছে, তাই option (b) সবচেয়ে দ্রুত হবে। Implementation-এর একটা draft করে দেব?",
              },
            ],
          },
        },
        {
          title: "যে test নেই, সেগুলো লিখুন",
          description:
            "কোন code path-এর test coverage নেই, Claude সেটা খুঁজে বের করে test লিখে দিতে পারে। হাতে হাতে ফাঁক খোঁজার চেয়ে এটা দ্রুত, আর এতে এমন test তৈরি হয় যা শুধু সব ঠিকঠাক চলার case নয়, জিনিস আসলে যেভাবে ভাঙে সেটাও ধরে।",
          code: {
            snippet: `# আগে Claude-কে বলুন কোন path-এর test নেই খুঁজে বের করতে
claude "src/auth/jwt.ts আর __tests__/auth/-এর existing test-গুলো দেখুন।
কোন কোন code path-এর test coverage নেই? List করে দিন।"

# তারপর Claude-কে test লিখতে বলুন
claude "src/auth/jwt.ts-এর expired token case-এর জন্য vitest test লিখুন।
Cover করুন: token expired, invalid signature, missing token, ভুল audience-এর token।
Pattern হিসেবে __tests__/auth/session.test.ts-এর existing test setup ব্যবহার করুন।"

# নতুন test চালিয়ে দেখুন আসল bug-গুলো ধরছে কি না
npm test -- --testPathPattern auth/jwt`,
            language: "bash",
          },
          demo: {
            title: "Coverage-এর ফাঁক খোঁজা আর পূরণ করা",
            steps: [
              {
                type: "cmd",
                text: 'claude "__tests__/auth/-এ কোন জিনিসের test থাকা উচিত, কিন্তু নেই?"',
              },
              {
                type: "out",
                text: "Reading __tests__/auth/... 3 test files found",
                delay: 500,
              },
              { type: "out", text: "Comparing to src/auth/jwt.ts coverage..." },
              {
                type: "warn",
                text: "Test নেই: expired token 401 response-এর বদলে null return করে",
              },
              {
                type: "warn",
                text: "Test নেই: tampered signature (invalid JWT structure)",
              },
              {
                type: "warn",
                text: "Test নেই: token refresh-এর সময় একসঙ্গে আসা request (race condition)",
              },
              {
                type: "warn",
                text: "Test নেই: ভুল format-এর Authorization header",
              },
              {
                type: "cmd",
                text: 'claude "Expired token-এর test-টা লিখুন। Existing test setup ব্যবহার করুন।"',
                delay: 600,
              },
              {
                type: "out",
                text: "Reading __tests__/auth/session.test.ts for patterns...",
              },
              {
                type: "success",
                text: "Created __tests__/auth/jwt.test.ts (4 new test cases)",
              },
              {
                type: "cmd",
                text: "npm test -- --testPathPattern auth/jwt",
                delay: 400,
              },
              {
                type: "success",
                text: "4 tests passed. Expired token-এ null return-এর bug test-এ confirm হয়েছে।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "আমাদের auth test আর আসল jwt.ts implementation দেখুন। কোন জিনিসের test নেই যেটা production-এ incident ঘটাতে পারে?",
              },
              {
                role: "claude",
                text: "`src/auth/jwt.ts`, `src/middleware/auth.ts` আর `__tests__/auth/`-এর তিনটা file-ই পড়েছি। যা missing:\n\n**High risk, কোনো test নেই:**\n- Expired token: `verifyToken()` `null` return করে, middleware `req.user = undefined` set করে `next()` call করে। যে route null check ছাড়া `req.user` access করে, production-এ সেটা 500 throw করবে।\n- ভুল audience-এর token: signature verification pass করে, কিন্তু reject হওয়া উচিত। এখন এটা ঢুকে যাবে।\n\n**Medium risk:**\n- একসঙ্গে refresh: refresh endpoint-এ একই সময়ে দুটো request গেলে, একই refresh token থেকে দুটোই valid token issue করতে পারে। দ্বিতীয় refresh token-টা orphan হয়ে পড়ে থাকে।\n- বাড়তি whitespace সহ Authorization header: `Bearer  <token>` (দুটো space) দিলে split fail করে, undefined return হয়।\n\nচারটা test case-ই লিখে দেব? `session.test.ts`-এর `describe/it` pattern মানব, আর `__tests__/helpers/auth.ts`-এ আগে থেকে setup করা mock JWT factory ব্যবহার করব।",
              },
              { role: "user", text: "হ্যাঁ, চারটাই লিখে দিন।" },
              {
                role: "claude",
                text: "`__tests__/auth/jwt.test.ts`-এ লিখেছি। `npm test -- --testPathPattern auth/jwt` চালিয়েছি, চারটাই pass করছে। Expired-token test-এ bug-টাও confirm হয়েছে: expired token-এর পর 401 return না করে `req.user` `undefined` থাকছে। আপনার review comment-এ এটা আলাদা করে উল্লেখ করা উচিত।",
              },
            ],
          },
        },
        {
          title: "আরও কাজের review comment দিন",
          description:
            "আসল review comment-গুলো draft করতে Claude ব্যবহার করুন। ভালো review comment risk-টা বুঝিয়ে বলে, নির্দিষ্ট code path দেখিয়ে দেয়, আর একটা concrete fix suggest করে। আপনি type করার আগেই Claude এগুলো draft করে ফেলতে পারে, আর quality-ও প্রতিবার একই রকম ভালো থাকে।",
          code: {
            snippet: `# নির্দিষ্ট একটা issue-র জন্য একটা review comment draft করুন
claude "এই issue-টার জন্য একটা GitHub PR review comment draft করে দিন:
- File: src/auth/jwt.ts
- সমস্যা: logout() cookie মুছে দেয়, কিন্তু JWT ৩০ দিন valid থাকে
- Impact: চুরি হওয়া token logout-এর পরেও valid থাকে
- Tone: সহকর্মীর মতো, নির্দিষ্ট, কাউকে ছোট না করে
সমস্যার code snippet আর একটা concrete fix suggestion দিন।"

# পুরো review body draft করুন
claude "PR #247-এর পুরো review-টা GitHub review body হিসেবে লিখে দিন।
তিনটা blocking issue, দুইটা suggestion। Tone: সরাসরি আর helpful।
Author একজন mid-level developer, নির্দিষ্ট example পেলে উনি খুশি হন।"

# gh CLI দিয়ে সরাসরি review post করুন
gh pr review 247 --request-changes --body "$(cat review-draft.md)"`,
            language: "bash",
          },
          demo: {
            title: "একটা review comment draft করা",
            steps: [
              {
                type: "cmd",
                text: 'claude "JWT logout issue-র জন্য একটা review comment draft করুন। Tone friendly রাখুন, একটা concrete fix দিন।"',
              },
              { type: "out", text: "Drafting review comment...", delay: 500 },
              { type: "out", text: "" },
              { type: "out", text: "--- DRAFT REVIEW COMMENT ---" },
              {
                type: "out",
                text: "Logout implementation cookie ঠিকমতোই মুছে দেয়, কিন্তু JWT নিজে",
              },
              {
                type: "out",
                text: "expiry পর্যন্ত valid থাকে (এখন ৩০ দিন)। Logout-এর আগে কোনো token",
              },
              {
                type: "out",
                text: "log বা proxy-তে ধরা পড়লে, logout-এর পরেও সেটা আবার ব্যবহার করা যাবে।",
              },
              { type: "out", text: "" },
              {
                type: "out",
                text: "সবচেয়ে দ্রুত fix: logout-এর সময় JTI-টা Redis blocklist-এ যোগ করুন, আর",
              },
              {
                type: "out",
                text: "verifyToken()-এ blocklist check করুন। Redis client আগে থেকেই",
              },
              {
                type: "out",
                text: "src/lib/redis.ts-এ setup করা আছে, তাই নতুন কোনো infrastructure লাগবে না।",
              },
              { type: "out", text: "---" },
              {
                type: "success",
                text: "Comment draft হয়ে গেছে। GitHub-এ copy করুন, অথবা সরাসরি gh pr review-এ pipe করুন।",
              },
            ],
          },
          ideDemo: {
            steps: [
              {
                role: "user",
                text: "PR #247-এর সব review comment draft করে দিন। তিনটা blocking issue আর দুইটা suggestion, GitHub review body-র format-এ।",
              },
              {
                role: "claude",
                text: "পুরো review-টা এই। এটা `gh pr review 247 --request-changes --body \"...\"`-এ paste করুন, অথবা GitHub web UI-তে।\n\n---\n**সব মিলিয়ে:** JWT migration-এর দিকটা ঠিক আছে, আর happy-path-এর test coverage-ও ভালো। Merge-এর আগে তিনটা issue ঠিক করতে হবে।\n\n**Blocking: JWT invalidation-এ ফাঁক**\n`src/auth/session.ts` logout-এ cookie মুছে দেয়, কিন্তু JWT ৩০ দিন valid থাকে। Log বা proxy-তে ধরা পড়া token logout-এর পরেও ব্যবহার করা যায়। Fix: `logout()`-এ JTI claim-টা একটা Redis blocklist-এ যোগ করুন, আর `verifyToken()`-এ সেটা check করুন। Redis client আগে থেকেই `src/lib/redis.ts`-এ আছে।\n\n**Blocking: Startup validation নেই**\n`src/auth/jwt.ts`-এর line 12 `process.env.JWT_SECRET` পড়ে, কিন্তু সেটা define করা আছে কি না কখনো assert করে না। Production-এ env var না থাকলে প্রথম auth request-এ একটা confusing runtime error আসে। Module load-এর সময় এটা যোগ করুন: `if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is required')`\n\n**Blocking: Middleware migration শেষ হয়নি**\n`src/api/payments/route.ts` আর `src/api/admin/route.ts` এখনও `withSession` import করছে। Deploy-এর পর এগুলো চুপচাপ JWT auth check এড়িয়ে যাবে। দুটোকেই `withJWT`-এ update করতে হবে।\n\n**Suggestion: Token-এর lifetime**\nAccess token-এর জন্য ৩০ দিন অনেক লম্বা সময়। Refresh token সহ অল্প সময়ের token (১৫ মিনিট) রাখলে কোনো token leak হলে ক্ষতি অনেক কম হয়।\n\n**Suggestion: Error type আলাদা করুন**\n`verifyToken()` expired আর invalid, দুই ধরনের token-এর জন্যই `null` return করে। আলাদা value return করলে expired token-এর জন্য `401 WWW-Authenticate: Bearer error=\"invalid_token\"` পাঠাতে পারবেন, যেটা দেখে client নিজে থেকেই চুপচাপ refresh trigger করতে পারে।\n---\n\nএটা সরাসরি `gh pr review` দিয়ে post করে দেব?",
              },
            ],
          },
        },
      ],
      nextLink: {
        label: "সব tutorial-এ ফিরে যান",
        href: "/tutorials",
      },
    },
  },
};
