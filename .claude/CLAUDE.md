# CLAUDE.md - Claude Code Guide

Documentation site at `_opensource/claudecode-guide/`.
Stack: Next.js 16, Fumadocs, Tailwind CSS 4, Vercel.
Live: https://claudecode-guide.vercel.app

## Product and design direction

`PRODUCT.md` and `DESIGN.md` at the project root are the current, code-verified source of truth for audience, voice, and the visual system. Read them before changing tone, copy, or UI.

An earlier "Dub.co-inspired" redesign brief used to live in this file. It never matched what shipped (fonts, dark-mode background, and tone all diverged) and has been removed. Recover it from git history if you ever need it.

## Build Commands
```
npm run dev      # Dev server with Turbopack
npm run build    # Production build
vercel --prod    # Deploy to production
```
