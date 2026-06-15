#!/usr/bin/env python3
"""
Run with your OpenAI key:
  OPENAI_API_KEY=sk-... python3 generate-framework-images.py

Or with 1Password:
  op run --env-file=<(echo "OPENAI_API_KEY=op://Personal/OpenAI/api_key") -- python3 generate-framework-images.py
"""

import os, base64, requests, sys
from pathlib import Path

try:
    import openai
except ImportError:
    print("pip install openai requests")
    sys.exit(1)

client = openai.OpenAI()

BASE = Path(__file__).parent / "public"

IMAGES = [
    (
        "for-designers",
        "Blueprint-style technical illustration on a white background with a subtle isometric dot grid. "
        "Line art in navy blue (#1a3a6b) ink weight style. The scene shows a designer's workflow: a Figma-style "
        "component canvas on the left with wireframe boxes and spacing guides, connecting via dotted flow arrows "
        "to a terminal window in the center showing Claude Code conversation text, leading to a polished UI mockup "
        "on the right with clean card components. Annotation callouts in blueprint style. "
        "No color fills, pure line art. Clean, professional, editorial. Wide landscape format.",
    ),
    (
        "for-pms",
        "Blueprint-style technical illustration on a white background with a subtle isometric dot grid. "
        "Line art in navy blue (#1a3a6b) ink weight style. The scene shows a product manager's workflow: "
        "a roadmap timeline with milestone markers and swim lanes on the left, connected by arrows to a "
        "terminal window in the center generating a brief document, leading to a prioritized backlog list "
        "with story cards on the right. Small dashboard metrics chart in the corner. "
        "Annotation callouts in blueprint style. No color fills, pure line art. Clean, professional, editorial. "
        "Wide landscape format.",
    ),
    (
        "for-teachers",
        "Blueprint-style technical illustration on a white background with a subtle isometric dot grid. "
        "Line art in navy blue (#1a3a6b) ink weight style. The scene shows a teacher's workflow: "
        "a lesson plan document with structured sections and learning objectives on the left, connected "
        "by dotted arrows to a terminal window in the center generating content, leading to differentiated "
        "student materials with different complexity levels on the right. A small feedback loop diagram "
        "in the corner. Annotation callouts in blueprint style. No color fills, pure line art. "
        "Clean, professional, editorial. Wide landscape format.",
    ),
    (
        "for-marketers",
        "Blueprint-style technical illustration on a white background with a subtle isometric dot grid. "
        "Line art in navy blue (#1a3a6b) ink weight style. The scene shows a marketer's workflow: "
        "a content calendar grid with campaign timeline and channel icons on the left, connected by arrows "
        "to a terminal window in the center generating copy, leading to published content pieces in a "
        "distribution map on the right. A brand voice reference card in the corner. "
        "Annotation callouts in blueprint style. No color fills, pure line art. "
        "Clean, professional, editorial. Wide landscape format.",
    ),
    (
        "for-chrome",
        "Blueprint-style technical illustration on a white background with a subtle isometric dot grid. "
        "Line art in navy blue (#1a3a6b) ink weight style. The scene shows a browser-based workflow: "
        "multiple browser tab outlines stacked on the left showing web research, connected by extraction "
        "arrows to a terminal window in the center, leading to a structured output document on the right "
        "with highlights, summaries, and action items. A web annotation layer overlay in blueprint callout style. "
        "No color fills, pure line art. Clean, professional, editorial. Wide landscape format.",
    ),
    (
        "for-microsoft",
        "Blueprint-style technical illustration on a white background with a subtle isometric dot grid. "
        "Line art in navy blue (#1a3a6b) ink weight style. The scene shows a Microsoft 365 workflow: "
        "four labeled application boxes (Word, Excel, Teams, Outlook) arranged in a square on the left "
        "connected by data flow arrows, a central terminal window processing and transforming content, "
        "leading to clean output documents on the right. A translation layer labeled with blueprint "
        "annotation callouts. No color fills, pure line art. Clean, professional, editorial. Wide landscape format.",
    ),
]


def generate(slug: str, prompt: str) -> None:
    out = BASE / slug / "hero.png"
    out.parent.mkdir(parents=True, exist_ok=True)

    print(f"Generating {slug}...")
    try:
        resp = client.images.generate(
            model="gpt-image-1",
            prompt=prompt,
            size="1792x1024",
            n=1,
        )
        img_data = base64.b64decode(resp.data[0].b64_json)
    except Exception as e:
        print(f"  gpt-image-1 failed ({e}), trying dall-e-3...")
        resp = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1792x1024",
            quality="standard",
            response_format="url",
            n=1,
        )
        img_data = requests.get(resp.data[0].url, timeout=30).content

    out.write_bytes(img_data)
    print(f"  Saved {out} ({len(img_data):,} bytes)")


for slug, prompt in IMAGES:
    try:
        generate(slug, prompt)
    except Exception as err:
        print(f"  ERROR on {slug}: {err}")

print("\nDone. Run: git add public/for-*/hero.png && git commit -m 'feat: framework hero images'")
