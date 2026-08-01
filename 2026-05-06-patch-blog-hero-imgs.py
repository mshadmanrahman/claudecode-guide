#!/usr/bin/env python3
"""
Patch blog-posts.ts to insert <img> hero tags for all blog posts
that now have a matching image in the CCG public/ folder.

Run after gen-blog-heroes.py completes.
"""
import os
import re

PUBLIC_DIR = "/Users/connectshadman/Documents/VibeCoding/_opensource/claudecode-guide/public"
BLOG_TS = "/Users/connectshadman/Documents/VibeCoding/_opensource/claudecode-guide/src/data/blog-posts.ts"

content = open(BLOG_TS).read()
original = content

# Find all slugs that now have a public image
existing_imgs = {
    f.replace("blog-hero-", "").replace(".png", "")
    for f in os.listdir(PUBLIC_DIR)
    if f.startswith("blog-hero-") and f.endswith(".png")
}
print(f"Found {len(existing_imgs)} images in public/")

# Find slugs in blog-posts.ts that don't yet have an <img> tag
slug_re = re.compile(r'slug: "([^"]+)"')
content_blocks = re.split(r'(?=\n  \{)', content)

patched = 0
skipped_no_img = []

for slug in sorted(existing_imgs):
    # Build the img tag
    img_tag = (
        f'<img src="/blog-hero-{slug}.png" '
        f'alt="Watercolor illustration for: {slug.replace("-", " ")}" '
        f'style="width:100%;border-radius:12px;margin-bottom:2rem;" />'
    )

    # Find the content field for this slug
    # Pattern: slug: "SLUG", ... content: `...`
    # We need to insert img_tag at the start of the content template literal
    pattern = re.compile(
        r'(slug: "' + re.escape(slug) + r'".*?content: `)([^`]*?)(</p>)',
        re.DOTALL
    )

    def replacer(m):
        pre, body, end = m.group(1), m.group(2), m.group(3)
        # Only add if img not already present
        if '<img' in body[:200]:
            return m.group(0)
        return pre + img_tag + "\n" + body + end

    new_content, count = re.subn(pattern, replacer, content)
    if new_content != content:
        content = new_content
        patched += 1
        print(f"  PATCHED: {slug}")
    else:
        # Try simpler pattern: find first tag after content: `
        pattern2 = re.compile(
            r'(slug: "' + re.escape(slug) + r'"[^`]*content: `)(<[a-z])',
            re.DOTALL
        )
        new_content, count = re.subn(
            pattern2,
            lambda m: m.group(1) + img_tag + "\n" + m.group(2),
            content
        )
        if new_content != content and new_content.count(img_tag) == 1:
            content = new_content
            patched += 1
            print(f"  PATCHED: {slug}")
        else:
            print(f"  SKIP (already has img or pattern not found): {slug}")

if content != original:
    with open(BLOG_TS, "w") as f:
        f.write(content)
    print(f"\nWrote {BLOG_TS}")
    print(f"Patched {patched} posts.")
else:
    print("\nNo changes made.")
