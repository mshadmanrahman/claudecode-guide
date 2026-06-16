import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { blogPosts } from "@/data/blog-posts";

export const dynamic = "force-dynamic";

const FOR_CHROME_SLUGS = [
  "get-started-with-claude-in-your-browser",
  "install-a-claude-chrome-extension",
  "summarize-any-webpage-with-claude",
  "write-better-emails-in-gmail-with-claude",
  "use-claude-with-google-docs",
  "research-any-topic-with-claude",
];

const FOR_TEACHERS_SLUGS = [
  "write-lesson-plans-with-claude",
  "create-quiz-questions-with-claude",
  "write-grading-rubrics-with-claude",
  "give-student-feedback-with-claude",
  "write-parent-emails-with-claude",
  "differentiate-instruction-with-claude",
];

const FOR_MARKETERS_SLUGS = [
  "give-claude-your-brand-voice",
  "write-social-media-posts-with-claude",
  "write-blog-posts-with-claude",
  "write-email-campaigns-with-claude",
  "write-ad-copy-with-claude",
  "repurpose-content-with-claude",
  "do-market-research-with-claude",
];

const FOR_MICROSOFT_SLUGS = [
  "write-faster-in-word-with-claude",
  "edit-and-improve-word-documents-with-claude",
  "create-excel-formulas-with-claude",
  "analyze-data-in-excel-with-claude",
  "create-presentations-with-claude-for-powerpoint",
  "improve-powerpoint-slides-with-claude",
  "draft-outlook-emails-with-claude",
];

const FOR_DESIGNERS_SLUGS = [
  "set-up-claude",
  "decode-a-brief",
  "write-a-sharper-brief",
  "evaluate-your-designs",
  "heuristic-evaluation",
  "figma-for-ai-handoff",
  "build-your-first-flow",
  "get-started-with-claude-design",
  "research-synthesis",
  "automate-design-tasks",
  "git-for-designers",
];

const TUTORIAL_SLUGS = [
  "your-first-claude-md",
  "ship-a-landing-page",
  "your-first-skill",
  "meeting-to-jira",
  "product-discovery-ost",
  "stakeholder-map",
  "newsletter-automator",
  "weekly-status",
  "performance-review",
  "decision-memo",
  "competitive-analysis",
  "research-briefing",
  "slide-deck-outline",
  "job-application-assistant",
  "personal-finance-manager",
  "computer-use",
  "coming-from-chatgpt",
  "debug-and-refactor",
  "nextjs-with-claude",
  "pr-review-workflow",
  "meme-generator",
  "playlist-analyzer",
  "quiz-game",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://claudecodeguide.dev";

  const docPages = source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page.url.includes("comparisons")
      ? 0.95
      : page.url.includes("foundations")
        ? 0.9
        : 0.8,
  }));

  const blogListingPage = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  };

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const tutorialListingPage = {
    url: `${baseUrl}/tutorials`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  };

  const tutorialPages = TUTORIAL_SLUGS.map((slug) => ({
    url: `${baseUrl}/tutorials/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pm-pilot`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...docPages,
    {
      url: `${baseUrl}/for-chrome`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...FOR_CHROME_SLUGS.map((slug) => ({
      url: `${baseUrl}/for-chrome/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${baseUrl}/for-teachers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...FOR_TEACHERS_SLUGS.map((slug) => ({
      url: `${baseUrl}/for-teachers/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${baseUrl}/for-marketers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...FOR_MARKETERS_SLUGS.map((slug) => ({
      url: `${baseUrl}/for-marketers/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${baseUrl}/for-microsoft`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...FOR_MICROSOFT_SLUGS.map((slug) => ({
      url: `${baseUrl}/for-microsoft/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    {
      url: `${baseUrl}/for-designers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    },
    ...FOR_DESIGNERS_SLUGS.map((slug) => ({
      url: `${baseUrl}/for-designers/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    blogListingPage,
    ...blogPages,
    tutorialListingPage,
    ...tutorialPages,
  ];
}
