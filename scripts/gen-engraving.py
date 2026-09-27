#!/usr/bin/env python3
"""Generate a copperplate-engraving style landscape as compact SVG path data.

Emits three depth layers (far ridge, mid hills, near field) so the hero can
parallax them independently. Everything is stroked line work, no fills, so the
whole drawing inherits currentColor and works in both themes.

Deterministic: seeded, so re-running produces the identical file.
"""

import math
import os
import random

W, H = 2800, 900
SEED = 20260922

rng = random.Random(SEED)


def fbm(x, phases, amps, freqs):
    """Sum of sines. Cheap 1D value noise for terrain profiles."""
    return sum(a * math.sin(x * f + p) for a, f, p in zip(amps, freqs, phases))


def make_profile(base, amps, freqs, seed):
    r = random.Random(seed)
    phases = [r.uniform(0, math.tau) for _ in amps]

    def f(x):
        return base + fbm(x, phases, amps, freqs)

    return f


def n(v):
    """Integers only. At 1600x900 the hatching does not need sub-pixel."""
    return str(int(round(v)))


def pair(a, b):
    """Join two numbers the way SVG allows: the sign doubles as a separator."""
    sa, sb = n(a), n(b)
    return sa + sb if sb.startswith("-") else sa + " " + sb


class Pen:
    """Accumulates strokes into one compact path `d` string, relative where
    that is shorter."""

    def __init__(self):
        self.parts = []

    def stroke(self, x1, y1, x2, y2):
        dx, dy = int(round(x2)) - int(round(x1)), int(round(y2)) - int(round(y1))
        if dx == 0 and dy == 0:
            return
        self.parts.append(f"M{pair(x1, y1)}l{pair(dx, dy)}")

    def poly(self, pts):
        if len(pts) < 2:
            return
        px, py = int(round(pts[0][0])), int(round(pts[0][1]))
        d = f"M{pair(px, py)}"
        moved = False
        for x, y in pts[1:]:
            ix, iy = int(round(x)), int(round(y))
            dx, dy = ix - px, iy - py
            if dx == 0 and dy == 0:
                continue
            d += "l" + pair(dx, dy)
            px, py = ix, iy
            moved = True
        if moved:
            self.parts.append(d)

    def curve(self, f, x0, x1, step=14):
        pts = []
        x = x0
        while x < x1:
            pts.append((x, f(x)))
            x += step
        pts.append((x1, f(x1)))
        self.poly(pts)

    @property
    def d(self):
        return "".join(self.parts)

    def __len__(self):
        return len(self.parts)


def hatch_field(pen, top, bottom_fn, x0, x1, spacing, seed,
                min_len=6, max_len=26, tilt=0.0, density=1.0, jitter=2.0,
                row_step=(3.2, 6.4)):
    """Fill the band between a terrain profile and a lower bound with short
    slope-following strokes, the way an engraver lays tone."""
    r = random.Random(seed)
    rows = []
    x = x0
    while x < x1:
        rows.append(x)
        x += spacing

    for x in rows:
        surface = top(x)
        floor = bottom_fn(x)
        if floor <= surface:
            continue
        # slope of the terrain here, so strokes lie along the land
        slope = (top(x + 4) - top(x - 4)) / 8.0
        ang = math.atan(slope) + tilt

        y = surface + r.uniform(1, 5)
        while y < floor:
            # tone falls off toward the horizon and varies across the field
            depth = (y - surface) / max(1.0, floor - surface)
            tone = (0.35 + 0.65 * depth) * density
            if r.random() < tone:
                ln = r.uniform(min_len, max_len) * (0.45 + 0.75 * depth)
                jx = r.uniform(-jitter, jitter)
                jy = r.uniform(-jitter * 0.4, jitter * 0.4)
                x1p = x + jx + math.cos(ang) * ln
                y1p = y + jy + math.sin(ang) * ln
                pen.stroke(x + jx, y + jy, x1p, y1p)
            y += r.uniform(*row_step)


def field_boundary(pen, top, x0, x1, drop, seed, dash=True):
    """The hedgerow lines that split an engraved valley into fields."""
    r = random.Random(seed)
    pts = []
    x = x0
    while x <= x1:
        t = (x - x0) / max(1.0, x1 - x0)
        pts.append((x, top(x) + drop * math.sin(t * math.pi) + r.uniform(-1.5, 1.5)))
        x += 10
    if not dash:
        pen.poly(pts)
        return
    # broken line: engravers rarely draw an unbroken boundary
    i = 0
    while i < len(pts) - 1:
        run = r.randint(2, 5)
        seg = pts[i:i + run + 1]
        if len(seg) > 1:
            pen.poly(seg)
        i += run + r.randint(1, 2)


def tree(pen, x, ground, h, seed, lean=0.0):
    """A hatched canopy over a short trunk. Small ones read as scrub, big ones
    as the lone oaks in the reference."""
    r = random.Random(seed)
    trunk_h = h * 0.42
    top_y = ground - trunk_h
    # trunk, two strokes so it has weight
    pen.stroke(x, ground, x + lean * trunk_h * 0.3, top_y)
    pen.stroke(x + 1.2, ground, x + 1.2 + lean * trunk_h * 0.3, top_y + 1)

    cx = x + lean * trunk_h * 0.3
    cy = top_y - h * 0.26
    rx, ry = h * 0.38, h * 0.30

    # canopy silhouette, deliberately lumpy
    lobes = r.randint(7, 10)
    pts = []
    for i in range(lobes + 1):
        a = math.pi * 2 * i / lobes
        rr = r.uniform(0.78, 1.14)
        pts.append((cx + math.cos(a) * rx * rr, cy + math.sin(a) * ry * rr))
    pen.poly(pts)

    # interior hatching, radiating from the trunk join
    strokes = int(h * 1.5)
    for _ in range(strokes):
        a = r.uniform(0, math.tau)
        rad = math.sqrt(r.random())
        px = cx + math.cos(a) * rx * rad * 0.92
        py = cy + math.sin(a) * ry * rad * 0.92
        ln = r.uniform(2.5, 6.0)
        aa = math.atan2(py - cy, px - cx) + r.uniform(-0.5, 0.5)
        pen.stroke(px, py, px + math.cos(aa) * ln, py + math.sin(aa) * ln)


def sky_hatch(pen, horizon_fn, x0, x1, top_y, seed, spacing=17):
    """Long horizontal lines above the horizon, thinning upward. This is what
    makes an engraving read as sky rather than empty paper."""
    r = random.Random(seed)
    y = top_y
    while y < horizon_fn(W / 2):
        t = (y - top_y) / max(1.0, horizon_fn(W / 2) - top_y)
        # denser near the horizon
        if r.random() < 0.25 + 0.7 * t:
            x = x0 + r.uniform(0, 90)
            while x < x1:
                ln = r.uniform(40, 190) * (0.4 + t)
                if x + ln > x1:
                    ln = x1 - x
                if ln > 8:
                    yy = y + r.uniform(-1.2, 1.2)
                    pen.poly([(x, yy), (x + ln * 0.5, yy + r.uniform(-1.0, 1.0)), (x + ln, yy)])
                x += ln + r.uniform(30, 150)
        y += spacing * r.uniform(0.75, 1.25)


# ── Terrain ───────────────────────────────────────────────────────────────
# Three receding ridges. Far sits highest on the page, near is the foreground.

far_ridge = make_profile(506, [16, 8, 4], [0.0017, 0.0041, 0.0081], SEED + 1)
mid_ridge = make_profile(566, [30, 15, 7], [0.0013, 0.0030, 0.0065], SEED + 2)
near_ridge = make_profile(646, [46, 22, 10], [0.0009, 0.0023, 0.0053], SEED + 3)

layers = {}

# ── Far layer: the softest ridge and the sky tone ─────────────────────────
far = Pen()
# Haze band hugging the horizon only. Anything higher lands behind the
# headline and the standfirst, which must stay on clean paper.
sky_hatch(far, far_ridge, -60, W + 60, 455, SEED + 10, spacing=11)
far.curve(far_ridge, -60, W + 60, step=12)
hatch_field(far, far_ridge, lambda x: mid_ridge(x) - 6, -60, W + 60,
            spacing=14.0, seed=SEED + 11, min_len=3, max_len=9,
            density=0.40, jitter=1.2, row_step=(5.0, 9.0))
# a distant treeline on the right shoulder, the way the reference has one
for i in range(44):
    tx = 1880 + i * 21 + rng.uniform(-7, 7)
    tree(far, tx, far_ridge(tx) + 3, rng.uniform(13, 22), SEED + 200 + i,
         lean=rng.uniform(-0.15, 0.15))
layers["far"] = far

# ── Mid layer: the main valley, field boundaries, scattered trees ──────────
mid = Pen()
mid.curve(mid_ridge, -60, W + 60, step=11)
hatch_field(mid, mid_ridge, lambda x: near_ridge(x) - 4, -60, W + 60,
            spacing=12.5, seed=SEED + 21, min_len=6, max_len=18,
            density=0.58, jitter=1.6, row_step=(5.5, 10.0))
field_boundary(mid, mid_ridge, 180, 1180, 66, SEED + 22)
field_boundary(mid, mid_ridge, 900, 1980, 44, SEED + 23)
field_boundary(mid, mid_ridge, 1640, 2740, 74, SEED + 24)
for i, tx in enumerate([300, 520, 780, 980, 1240, 1500, 1760, 2050, 2320, 2560]):
    j = rng.uniform(-18, 18)
    tree(mid, tx + j, mid_ridge(tx + j) + 6, rng.uniform(26, 40),
         SEED + 300 + i, lean=rng.uniform(-0.2, 0.2))
layers["mid"] = mid

# ── Near layer: foreground field, long raking strokes, the big trees ───────
near = Pen()
near.curve(near_ridge, -60, W + 60, step=10)
hatch_field(near, near_ridge, lambda x: H + 60, -60, W + 60,
            spacing=14.0, seed=SEED + 31, min_len=16, max_len=46,
            density=0.62, tilt=0.16, jitter=2.6, row_step=(9.0, 16.0))
field_boundary(near, near_ridge, -40, 1080, 120, SEED + 32)
field_boundary(near, near_ridge, 1700, 2860, 140, SEED + 33)
for i, tx in enumerate([240, 760, 1180, 1650, 2140, 2520]):
    j = rng.uniform(-24, 24)
    tree(near, tx + j, near_ridge(tx + j) + 14, rng.uniform(58, 86),
         SEED + 400 + i, lean=rng.uniform(-0.22, 0.22))
layers["near"] = near

for k, p in layers.items():
    print(f"{k}: {len(p)} strokes, {len(p.d)} chars")
print("total chars:", sum(len(p.d) for p in layers.values()))

# ── Emit the component ────────────────────────────────────────────────────
# Opacity rises with proximity, which is how an engraver separates depth.
LAYER_META = [("far", 0.22), ("mid", 0.34), ("near", 0.48)]

HEAD = '''/**
 * A copperplate-engraving landscape, drawn as vector line work so it stays
 * crisp at any pixel ratio and inherits the theme's foreground colour.
 *
 * Three depth layers drift at different speeds. That is the only motion:
 * compositor-driven transforms, no canvas, no per-frame JavaScript. The paths
 * are generated from a seed, so this file is reproducible. Do not hand-edit
 * the path data; change scripts/gen-engraving.py and re-run it.
 */
export function EngravedLandscape() {
  return (
    <div
      aria-hidden="true"
      className="engraved-mask pointer-events-none absolute inset-x-0 bottom-0 h-[28%] overflow-hidden sm:h-[34%]"
    >
      <svg
        viewBox="0 430 2800 470"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full text-fd-foreground"
      >
'''

TAIL = '''      </svg>
    </div>
  );
}
'''

body = ""
for key, op in LAYER_META:
    body += f'        <g className="engrave-{key}">\n'
    body += f'          <path\n'
    body += f'            d="{layers[key].d}"\n'
    body += '            fill="none"\n'
    body += '            stroke="currentColor"\n'
    body += '            strokeWidth={1}\n'
    body += '            strokeLinecap="round"\n'
    body += f'            strokeOpacity={{{op}}}\n'
    body += '            vectorEffect="non-scaling-stroke"\n'
    body += '          />\n'
    body += '        </g>\n'

DEST = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..",
                    "src", "components", "home", "engraved-landscape.tsx")
with open(os.path.normpath(DEST), "w") as fh:
    fh.write(HEAD + body + TAIL)
print("wrote", os.path.normpath(DEST))
