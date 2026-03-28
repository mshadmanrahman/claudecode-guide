# CLAUDE.md - Claude Code Guide

Documentation site at `_opensource/claudecode-guide/`.
Stack: Next.js 16, Fumadocs, Tailwind CSS 4, Vercel.
Live: https://claudecode-guide.vercel.app

## Design Direction (Dub.co inspired)

Target aesthetic: **Dub.co's clean neutral palette + warm storytelling sections**
Keep: Newsreader (display) + Space Grotesk (body) + Geist Mono (code)
Replace: Warm neobrutalism → clean neutral minimalism with soft shadows

### Color System (from Dub's themes.css)
- Light: pure white bg (#fff), neutral-50 surfaces (#fafafa), neutral-200 borders (#e5e5e5)
- Dark: true black bg (#000), neutral-900 surfaces (#171717), neutral-700 borders (#525252)
- Primary: black text on white (no amber accent)
- Semantic: blue info, green success, orange attention, red error

### Key Visual Patterns to Implement
1. **Cascading product mockup cards** (like Dub's "It starts with a link" section)
   - Show terminal screenshots of Claude Code in action
   - Cards stack/cascade with slight offsets
   - Each card is a real UI mockup, not placeholder text
2. **Storytelling text sections** (like Dub's "Marketing isn't just about clicks")
   - Large display text, center-aligned
   - Inline emoji/icons within the text
   - Small floating UI cards with avatars on the sides
   - Text fades from bold to muted as it descends
3. **Scroll-triggered animations**: slide-up-fade on scroll entry
4. **Feature grid**: left-text + right-visual layout, bordered sections
5. **Logo/trust bar**: "Built with" or "Works with" row

### Fonts
- Newsreader: display headings (user's signature, NOT Dub's Satoshi)
- Space Grotesk: body text (user's signature, NOT Dub's Inter)
- Geist Mono: code, terminal, technical elements

### Icons
- Lucide React (outline style, matching Dub)

### Audience
- ABSOLUTE novices who just know "we need to do AI"
- Tone: warm, calming, guided, light puns
- "You're scared? We got you!" energy
- No jargon on landing page

## Build Commands
```
npm run dev      # Dev server with Turbopack
npm run build    # Production build
vercel --prod    # Deploy to production
```
