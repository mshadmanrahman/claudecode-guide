import { ImageResponse } from "next/og";
import { allOgPaths, ogCardFor } from "@/lib/og/cards";
import { OG_SIZE } from "@/lib/og/image";
import { ogFonts, renderCard } from "@/lib/og/render";

/** One card per sitemap route, all rendered at build time. */
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allOgPaths().map((path) => ({ slug: path ? path.split("/") : [] }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const pagePath = (slug ?? []).join("/");
  const card = ogCardFor(pagePath);
  if (!card) return new Response("Not found", { status: 404 });

  return new ImageResponse(await renderCard(card, pagePath), {
    ...OG_SIZE,
    fonts: await ogFonts(),
  });
}
