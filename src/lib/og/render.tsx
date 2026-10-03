import { readFile } from "node:fs/promises";
import path from "node:path";
import type { OgCard } from "@/lib/og/cards";

/** Tokens from DESIGN.md (light theme), the same values globals.css ships. */
const C = {
  paper: "#fafaf8",
  ink: "#0f1115",
  muted: "#454b5a",
  accent: "#4f3fd0",
  line: "rgba(15, 17, 21, 0.12)",
  glass: "rgba(250, 250, 248, 0.9)",
  glassStrong: "rgba(255, 255, 255, 0.86)",
  codeWash: "rgba(15, 17, 21, 0.05)",
  red: "#ff5f57",
  yellow: "#febc2e",
  green: "#28c840",
} as const;

const OG_DIR = path.join(process.cwd(), "src", "lib", "og");

/** The site's own Geist files, copied from the `geist` package the layout imports. */
export async function ogFonts() {
  const read = (file: string) => readFile(path.join(OG_DIR, "fonts", file));
  const [regular, semibold, mono, monoMedium] = await Promise.all([
    read("Geist-Regular.ttf"),
    read("Geist-SemiBold.ttf"),
    read("GeistMono-Regular.ttf"),
    read("GeistMono-Medium.ttf"),
  ]);
  return [
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
    { name: "Geist Mono", data: monoMedium, weight: 500 as const, style: "normal" as const },
  ];
}

/**
 * The page's day scene, pre-cropped to 1200x630 JPEG from public/scene (the
 * card renderer cannot decode WebP and the source files are 2048x3072).
 */
async function sceneDataUrl(scene: OgCard["scene"]): Promise<string> {
  const buf = await readFile(path.join(OG_DIR, "scenes", `${scene}.jpg`));
  return `data:image/jpeg;base64,${buf.toString("base64")}`;
}

/** Cut at a word boundary and add an ellipsis. */
function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,.:;]+$/, "")}…`;
}

/**
 * Title size by length, so three lines always fit the 644px column. The
 * budget is roughly 2970 / size characters at Geist semibold.
 */
function titleSize(title: string): number {
  for (const size of [76, 68, 60, 54, 48, 44, 40]) {
    if (title.length <= 2970 / size) return size;
  }
  return 38;
}

/** The header wordmark glyph: a rounded square with the valley line. */
function Logo() {
  return (
    <svg width="34" height="34" viewBox="0 0 22 22" fill="none">
      <rect x="1" y="1" width="20" height="20" rx="5" stroke={C.ink} strokeOpacity="0.5" />
      <path d="M5 15 L9 9 L12 13 L14 10 L17 15" stroke={C.ink} strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function Terminal() {
  return (
    <div
      style={{
        position: "absolute",
        right: 44,
        bottom: 44,
        width: 316,
        display: "flex",
        flexDirection: "column",
        background: C.glassStrong,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", gap: 8, padding: "12px 14px", background: C.codeWash }}>
        <div style={{ width: 12, height: 12, borderRadius: 6, background: C.red }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, background: C.yellow }} />
        <div style={{ width: 12, height: 12, borderRadius: 6, background: C.green }} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "16px 18px 18px",
          fontFamily: "Geist Mono",
          fontSize: 22,
          color: C.ink,
        }}
      >
        <div style={{ display: "flex", color: C.muted }}>$</div>
        <div style={{ display: "flex", fontWeight: 500, marginLeft: 12 }}>claude</div>
        <div style={{ display: "flex", width: 12, height: 24, background: C.ink, marginLeft: 8 }} />
      </div>
    </div>
  );
}

export async function renderCard(card: OgCard, pagePath: string) {
  const scene = await sceneDataUrl(card.scene);
  const title = clip(card.title, 92);
  const size = titleSize(title);
  const description = card.description ? clip(card.description, 108) : null;
  const url = clip(`claudecodeguide.dev${pagePath ? `/${pagePath}` : ""}`, 56);

  return (
    <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", background: C.paper }}>
      <img alt="" src={scene} width={1200} height={630} style={{ position: "absolute", left: 0, top: 0 }} />

      <div
        style={{
          position: "absolute",
          left: 44,
          top: 44,
          bottom: 44,
          width: 740,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "40px 48px 38px",
          background: C.glass,
          border: `1px solid ${C.line}`,
          borderRadius: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Logo />
          <div style={{ display: "flex", fontFamily: "Geist", fontWeight: 600, fontSize: 27, letterSpacing: -0.5, color: C.ink }}>
            Claude Code Guide
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Geist Mono", fontSize: 21, color: C.muted }}>
            {card.section.map((part, i) => (
              <div key={part} style={{ display: "flex", alignItems: "center" }}>
                {i > 0 && <div style={{ display: "flex", margin: "0 12px", opacity: 0.6 }}>/</div>}
                <div style={{ display: "flex", color: i === card.section.length - 1 ? C.accent : C.muted }}>{part}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "block",
              marginTop: 18,
              fontFamily: "Geist",
              fontWeight: 600,
              fontSize: size,
              lineHeight: 1.06,
              letterSpacing: -0.04 * size,
              color: C.ink,
              lineClamp: 3,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                display: "flex",
                marginTop: 20,
                fontFamily: "Geist",
                fontSize: 24,
                lineHeight: 1.4,
                color: C.muted,
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 19, color: C.muted }}>{url}</div>
      </div>

      <Terminal />
    </div>
  );
}
