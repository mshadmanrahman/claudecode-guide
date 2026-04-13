import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Newsreader, Space_Grotesk, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const newsreader = Newsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
  display: 'swap',
  style: ['normal'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl = 'https://claudecodeguide.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s | Claude Code Guide',
    default: 'Claude Code Guide : Your Step-by-Step AI Coding Companion',
  },
  description:
    'Learn Claude Code from zero. Step-by-step guide covering setup, daily workflows, CLAUDE.md templates, memory systems, and more. No jargon, no gatekeeping.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Claude Code Guide : Your Step-by-Step AI Coding Companion',
    description:
      'Learn Claude Code from zero. Setup guides, daily workflows, templates, and honest comparisons. Built by a PM who taught hundreds of people to use AI tools.',
    type: 'website',
    siteName: 'Claude Code Guide',
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: 'Claude Code Guide: Tell it what you need. It builds it.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Claude Code Guide',
    description:
      'Your calm, step-by-step guide to Claude Code. From "what is this?" to "I can\'t work without it."',
    images: [`${siteUrl}/api/og`],
  },
  keywords: [
    'claude code',
    'claude code guide',
    'claude code tutorial',
    'claude code setup',
    'claude code beginner',
    'how to use claude code',
    'claude code vs cursor',
    'claude code vs copilot',
    'claude code CLAUDE.md',
    'claude code hooks',
    'claude code skills',
    'claude code agents',
    'claude code workflow',
    'claude code cost',
    'claude pro vs max',
    'ai coding tools',
    'ai coding tutorial',
    'anthropic claude code',
    'claude code for beginners',
    'claude code templates',
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Claude Code Guide',
  description: 'Your step-by-step guide to Claude Code. From setup to daily workflows.',
  url: siteUrl,
  author: {
    '@type': 'Person',
    name: 'Shadman Rahman',
    url: 'https://github.com/mshadmanrahman',
  },
  publisher: {
    '@type': 'Person',
    name: 'Shadman Rahman',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider
          theme={{
            defaultTheme: 'light',
            attribute: 'class',
            enableSystem: true,
          }}
        >
          {children}
        </RootProvider>
        <Analytics />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
