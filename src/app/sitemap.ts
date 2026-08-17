import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { pmPilotSource } from "@/lib/source-pm-pilot";
import { blogPosts } from "@/data/blog-posts";
import { CHROME_GUIDES } from "@/lib/chrome-guides";
import { DESIGNER_GUIDES } from "@/lib/designer-guides";
import { HR_GUIDES } from "@/lib/hr-guides";
import { MARKETER_GUIDES } from "@/lib/marketer-guides";
import { MICROSOFT_GUIDES } from "@/lib/microsoft-guides";
import { TEACHER_GUIDES } from "@/lib/teacher-guides";
import { TUTORIALS } from "@/lib/tutorials";

const baseUrl = "https://claudecodeguide.dev";

type Entry = MetadataRoute.Sitemap[number];

/**
 * Slugs come from the same records the route handlers use, so a new guide or
 * tutorial reaches the sitemap the moment it reaches the site. The previous
 * version kept hardcoded copies of every slug list here and they drifted:
 * one HR guide, all 29 PM Pilot pages, and seven standalone routes were
 * missing by 2026-08-17.
 */
const VERTICALS: ReadonlyArray<{ path: string; guides: Record<string, unknown> }> = [
  { path: "for-chrome", guides: CHROME_GUIDES },
  { path: "for-designers", guides: DESIGNER_GUIDES },
  { path: "for-hr", guides: HR_GUIDES },
  { path: "for-marketers", guides: MARKETER_GUIDES },
  { path: "for-microsoft", guides: MICROSOFT_GUIDES },
  { path: "for-teachers", guides: TEACHER_GUIDES },
];

/**
 * Standalone marketing and landing routes, each confirmed against a real
 * page.tsx under src/app.
 */
const STANDALONE: ReadonlyArray<{ path: string; priority: number }> = [
  { path: "", priority: 1 },
  { path: "start", priority: 0.95 },
  { path: "guide", priority: 0.95 },
  { path: "docs", priority: 0.9 },
  { path: "workflow", priority: 0.85 },
  { path: "journey", priority: 0.8 },
  { path: "primitives", priority: 0.8 },
  { path: "capabilities", priority: 0.8 },
  { path: "pm-pilot", priority: 0.8 },
  { path: "bn", priority: 0.8 },
  { path: "roadmap", priority: 0.6 },
];

function docPriority(url: string): number {
  if (url.includes("comparisons")) return 0.95;
  if (url.includes("foundations")) return 0.9;
  return 0.8;
}

/**
 * `lastModified` is deliberately omitted wherever there is no real
 * modification date to report. It used to be `new Date()` on every entry,
 * so all 193 URLs claimed to have changed today, every day, which teaches
 * Google to ignore the field entirely. Blog posts are the one place a real
 * date exists.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const standalonePages: Entry[] = STANDALONE.map(({ path, priority }) => ({
    url: path ? `${baseUrl}/${path}` : baseUrl,
    changeFrequency: "weekly",
    priority,
  }));

  const docPages: Entry[] = source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    changeFrequency: "weekly",
    priority: docPriority(page.url),
  }));

  const pmPilotPages: Entry[] = pmPilotSource.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const verticalPages: Entry[] = VERTICALS.flatMap(({ path, guides }) => [
    {
      url: `${baseUrl}/${path}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...Object.keys(guides).map((slug) => ({
      url: `${baseUrl}/${path}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  ]);

  const tutorialPages: Entry[] = [
    {
      url: `${baseUrl}/tutorials`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...Object.keys(TUTORIALS).map((slug) => ({
      url: `${baseUrl}/tutorials/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  const blogPages: Entry[] = [
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [
    ...standalonePages,
    ...docPages,
    ...verticalPages,
    ...tutorialPages,
    ...blogPages,
    ...pmPilotPages,
  ];
}
