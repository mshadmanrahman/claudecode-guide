#!/usr/bin/env python3
"""
Generate all blog hero images for claudecodeguide.dev.
Runs codex exec for each post with a unique scene description.
Skips posts that already have an image in the public dir.

Usage:
  python3 gen-blog-heroes.py              # generate all
  python3 gen-blog-heroes.py <slug>       # start from a specific slug
"""
import subprocess
import os
import sys

CODEX = "/Users/connectshadman/.npm-global/bin/codex"
BASE_DIR = "/Users/connectshadman/Documents/VibeCoding"
PUBLIC_DIR = os.path.join(BASE_DIR, "_opensource/claudecode-guide/public")
STYLE_DIR = os.path.join(BASE_DIR, "_scratch/media/social-post-images/style-references")
PORT_DIR = os.path.join(BASE_DIR, "_scratch/media/social-post-images/portrait-references")

S1 = os.path.join(STYLE_DIR, "style-ref-01-floating-devices.webp")
S2 = os.path.join(STYLE_DIR, "style-ref-02-sunday-calendar-coffee.webp")
S3 = os.path.join(STYLE_DIR, "style-ref-03-three-shelf-lamp-metaphor.webp")
S4 = os.path.join(STYLE_DIR, "style-ref-04-laptop-phone-browser-triptych.webp")
P02 = os.path.join(PORT_DIR, "portrait-02-three-quarter-chambray-stone-wall.jpeg")
P04 = os.path.join(PORT_DIR, "portrait-04-front-face-no-cap-black-glasses.jpeg")
P05 = os.path.join(PORT_DIR, "portrait-05-contemplative-no-cap-stone-arches.jpeg")

STYLE_PREFIX = (
    "Generate a 1200x627 pixel PNG watercolor illustration in the style of the provided "
    "reference images. Soft watercolor on warm cream paper, muted earth tones (dusty slate "
    "blue, warm ochre, terracotta, sage green), warm directional lamplight, no hard outlines, "
    "visible paper grain, breathing room, slightly off-center subject. "
    "No neon, no flat vector, no glossy renders, no photorealistic faces in close-up."
)

# (slug, scene_description, [reference_images])
IMAGES = [
    (
        "why-most-people-use-claude-code-wrong",
        "Overhead top-down view of a wooden desk. Terminal screen showing only a blinking cursor "
        "with no output. Cold empty coffee mug. Blank open notebook. Starting blind, nothing loaded.",
        [S1, S2],
    ),
    (
        "claude-md-is-not-optional",
        "Close-up of an architectural blueprint pinned to a drafting desk, hand-labeled CLAUDE.md "
        "in ink. Fine project-structure lines visible. Pen resting diagonally across it. "
        "Warm lamplight from upper right.",
        [S3, S2],
    ),
    (
        "the-cold-start-problem",
        "Pre-dawn desk seen from the side. A single lamp just switched on, cone of warm amber light "
        "on an empty surface. Cold coffee, blank notebook, no context loaded. "
        "Deep blue shadows fill the room.",
        [S2, S3],
    ),
    (
        "claude-code-vs-chatgpt",
        "Two identical ceramic mugs side by side on a desk. Left mug: small ghost-line terminal "
        "window floating above. Right mug: small ghost-line chat bubble floating above. "
        "Neutral lighting, clean bifurcated composition.",
        [S4, S2],
    ),
    (
        "your-first-hour-with-claude-code",
        "Antique glass hourglass on a wooden desk. Sand flowing through. Ghost-line code brackets "
        "and symbols floating upward from the lower chamber. Golden hour light from the left.",
        [S1, S3],
    ),
    (
        "3-prompts-that-changed-everything",
        "Figure at 3/4 angle seated at a desk, leaning toward three illuminated index cards floating "
        "in front of them, each glowing with warm amber light. "
        "Black-frame glasses, no cap, chambray shirt.",
        [S1, S3, P02],
    ),
    (
        "context-beats-cleverness",
        "Antique brass balance scale on a desk. Left pan: heavy stack of papers labeled CONTEXT, "
        "decisively tipping down. Right pan: single glittering star labeled CLEVER, floating up. "
        "Dramatic side-window light. No figure.",
        [S3, S2],
    ),
    (
        "sub-agents-the-feature-nobody-uses",
        "Aerial bird-eye view. One figure at a center desk. Five ghost-line translucent figures "
        "branch outward radially like spokes of a wheel, each at a satellite workspace. "
        "Warm circular pendant light from above.",
        [S1, S3, P04],
    ),
    (
        "pm-shipped-feature-without-code",
        "Figure seen from the side standing at a whiteboard covered in sticky notes and arrows. "
        "Marker in hand. Laptop closed on nearby desk. No terminal or code visible. "
        "Afternoon window light from behind the figure.",
        [S1, S2, P02],
    ),
    (
        "memory-system-that-compounds",
        "Side view of a staircase built from stacked index cards. Bottom steps: old yellowed cards. "
        "Upper steps: crisp white cards with fresh writing. Staircase rises left to right. No figure.",
        [S3, S2],
    ),
    (
        "hooks-set-it-up-once",
        "Close-up of a single vintage pocket-watch gear mechanism under a small glass dome on a side "
        "table. Amber lamp glow from the right. Set-it-and-forget-it feeling.",
        [S2, S3],
    ),
    (
        "claude-code-cost-calculator",
        "Wooden abacus and a neat stack of coins on a desk surface. Accounting ledger open behind. "
        "Warm lamp from the left. Clean, organized, muted terracotta and ochre.",
        [S2, S3],
    ),
    (
        "plan-mode-saves-tokens",
        "Drafting table close-up. Large blueprint paper with a pencil sketch just begun, grid lines "
        "visible. Pencil and clean eraser set to the side. Nothing crossed out yet. Planning before building.",
        [S3, S2],
    ),
    (
        "mcp-servers-explained",
        "Two small floating landmasses connected by a glowing arched bridge. Left island: ghost-line "
        "laptop and terminal. Right island: ghost-line calendar, email, database icons. "
        "Watercolor sky in muted slate and ochre. Wide aerial composition.",
        [S1, S4],
    ),
    (
        "claude-code-overnight",
        "Night scene. Figure slumped asleep in an armchair under a warm blanket. In the far corner "
        "a computer screen glows softly, code scrolling. Crescent moon through window. "
        "Deep indigo room, single amber screen glow.",
        [S2, S3, P05],
    ),
    (
        "5-claude-md-mistakes",
        "Overhead desk view. Five crumpled paper balls on the left half. One clean unfolded sheet "
        "with clear writing on the right half. Trash can at bottom edge. Top-down, warm lamplight.",
        [S2, S3],
    ),
    (
        "claude-code-for-non-engineers",
        "View from outside looking through an open doorway into a warm-lit room. A cozy desk with "
        "a glowing lamp and open laptop visible through the door. Warm light spilling out. "
        "Welcoming, low-barrier framing.",
        [S2, S3],
    ),
    (
        "handoff-protocol-saves-10-minutes",
        "Morning desk close-up. Handwritten note pinned under a smooth river pebble on a wooden desk. "
        "Fresh coffee steaming. Open blank notebook ready for the new day. Early morning golden light.",
        [S2, S3],
    ),
    (
        "skills-vs-prompts",
        "Two items side by side on a warm wooden counter. Left: a laminated recipe card labeled SKILL. "
        "Right: a yellow sticky note with a question mark labeled PROMPT. Kitchen warmth, warm tones.",
        [S3, S2],
    ),
    (
        "cursor-vs-claude-code",
        "Overhead parchment-style map. A single path splits at a fork into two distinct routes with "
        "different trail markers. Classic exploration map aesthetic, earth tones.",
        [S4, S3],
    ),
    (
        "how-to-debug-with-claude-code",
        "Figure leaning over a printed page on a desk at 3/4 angle. Large magnifying glass held over "
        "a single circled line. Black-frame glasses, focused. Lamp casting dramatic light from upper left.",
        [S1, S3, P04],
    ),
    (
        "weekly-status-writes-itself",
        "A fountain pen in motion, drawing a trail on paper as if writing itself, no hand visible, "
        "motion blur suggesting automation. Wall calendar visible in the background.",
        [S2, S3],
    ),
    (
        "team-adoption-what-works",
        "Overhead view of a round wooden table. Three figure silhouettes seated around it, each with "
        "an open laptop. Warm circular pendant lamp directly above. Collaborative, warm, intimate.",
        [S1, S3, P04],
    ),
    (
        "keyboard-shortcuts-youre-missing",
        "Macro close-up. Several keyboard keys floating slightly off the keyboard surface, "
        "rearranging into a new pattern mid-air. Warm backlight.",
        [S1, S3],
    ),
    (
        "the-compound-effect-30-days",
        "Calendar pinned to a pale plaster wall. Days marked with small pencil ticks. A freehand "
        "pencil curve starts flat at day one and sweeps sharply upward by day thirty. "
        "Growth made visible. Warm morning light.",
        [S2, S3],
    ),
    (
        "10-claude-code-features-you-didnt-know-existed",
        "Figure at 3/4 angle pulling open a wide flat wooden drawer. Ten small glowing objects inside: "
        "ghost-line tools and icons. Warm lamp from above left. Wonder and discovery.",
        [S1, S3, P02],
    ),
    (
        "7-claude-md-sections-every-project-needs",
        "Open thick notebook viewed from the side, fanned slightly. Seven colorful ribbon tab "
        "dividers protrude from the pages, each a different earth tone. Organized system. Warm desk lamp.",
        [S2, S3],
    ),
    (
        "5-signs-you-should-upgrade-to-claude-max",
        "Analog gauge dial close-up. Needle pointing near maximum. A hand reaching in from the right "
        "to turn the dial further. Instrument panel aesthetic, warm amber glow.",
        [S3, S2],
    ),
    (
        "8-ways-pms-use-claude-code-without-writing-code",
        "Figure at a standing desk seen from the front. Eight translucent ghost-line document cards "
        "arranged in a wide arc around them. No terminal visible. Black-frame glasses, confident stance.",
        [S1, S3, P04],
    ),
    (
        "6-autonomous-loop-ideas-to-run-overnight",
        "Large clock face dominating the composition. Circular looping arrows orbit around it. "
        "Six small ghost-line icons along the orbital path. Night window behind. "
        "Deep blue with amber clock glow.",
        [S1, S3],
    ),
    (
        "12-slash-commands-that-save-hours-per-week",
        "Weekly calendar page. Large pencil X marks crossing through block after block of scheduled "
        "hours. Twelve forward-slash symbols floating above the page. Time reclaimed.",
        [S3, S2],
    ),
    (
        "4-mcp-servers-every-developer-should-connect",
        "Four softly glowing circular nodes arranged in a diamond. Warm light bridges connect each "
        "node to its neighbors. Aerial perspective. Soft watercolor circuit aesthetic in slate and ochre.",
        [S4, S3],
    ),
    (
        "9-mistakes-killing-your-claude-code-productivity",
        "Top-down map view. Nine short dead-end paths each marked with an X at the terminus. "
        "One clear lit path runs straight through the center, unobstructed. Parchment map tones.",
        [S4, S3],
    ),
    (
        "3-skills-you-can-build-in-under-10-minutes",
        "Three hand tools laid neatly on a wooden workbench. A small stopwatch beside them showing "
        "10 minutes. Craftsmanship aesthetic. Warm bench lamp from the left.",
        [S3, S2],
    ),
    (
        "top-5-claude-code-workflows-for-solo-founders",
        "Figure in a cafe window seat at 3/4 angle. Evening warm light. Laptop and ceramic coffee cup "
        "on the table. Five translucent workflow cards floating in the warm air around them.",
        [S1, S2, P02],
    ),
    (
        "you-dont-need-settings-json-hacks",
        "Two side-by-side panels. Left: simple clean control panel with three clearly labeled dials. "
        "Right: tangled nest of wires and knobs, crossed out with a soft watercolor X. Clean wins.",
        [S4, S3],
    ),
]


def generate(slug, scene, refs):
    outfile = os.path.join(PUBLIC_DIR, f"blog-hero-{slug}.png")
    if os.path.exists(outfile):
        print(f"SKIP  {slug}", flush=True)
        return True

    prompt = f"{STYLE_PREFIX}\n\nScene: {scene}\n\nSave as PNG to: {outfile}"

    cmd = [CODEX, "exec", "--dangerously-bypass-approvals-and-sandbox"]
    for ref in refs:
        cmd += ["-i", ref]

    print(f"START {slug}", flush=True)
    try:
        result = subprocess.run(
            cmd,
            input=prompt,
            text=True,
            cwd=BASE_DIR,
            timeout=300,
        )
        ok = result.returncode == 0
        print(f"{'OK   ' if ok else 'FAIL '} {slug}", flush=True)
        return ok
    except subprocess.TimeoutExpired:
        print(f"TIMEOUT {slug}", flush=True)
        return False


if __name__ == "__main__":
    # Usage:
    #   python3 gen-blog-heroes.py              # all
    #   python3 gen-blog-heroes.py 0 9          # indices 0..8 (first 9)
    #   python3 gen-blog-heroes.py 9 18         # indices 9..17
    start_idx = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    end_idx = int(sys.argv[2]) if len(sys.argv) > 2 else len(IMAGES)
    batch = IMAGES[start_idx:end_idx]
    failed = []

    for i, (slug, scene, refs) in enumerate(batch):
        abs_i = start_idx + i + 1
        print(f"\n[{abs_i}/{len(IMAGES)} batch-idx={i}]", flush=True)
        ok = generate(slug, scene, refs)
        if not ok:
            failed.append(slug)

    print("\n=== BATCH DONE ===", flush=True)
    if failed:
        print(f"FAILED ({len(failed)}):", flush=True)
        for s in failed:
            print(f"  {s}", flush=True)
    else:
        print(f"Batch {start_idx}-{end_idx} complete.", flush=True)
