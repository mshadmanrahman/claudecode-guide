import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { blogPosts } from '@/data/blog-posts';

const TUTORIAL_SLUGS = [
  'your-first-claude-md',
  'ship-a-landing-page',
  'your-first-skill',
  'meeting-to-jira',
  'weekly-status',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://claudecodeguide.dev';

  const docPages = source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.url.includes('foundations') ? 0.9 : 0.8,
  }));

  const blogListingPage = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  };

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const tutorialListingPage = {
    url: `${baseUrl}/tutorials`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  };

  const tutorialPages = TUTORIAL_SLUGS.map((slug) => ({
    url: `${baseUrl}/tutorials/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...docPages,
    blogListingPage,
    ...blogPages,
    tutorialListingPage,
    ...tutorialPages,
  ];
}
