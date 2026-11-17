export interface YouTubeVideo {
  id: string;
  title: string;
  /** One line on what the viewer learns. */
  summary: string;
  /** ISO time a scheduled video goes public. It stays hidden until then. Omit once public. */
  publishAt?: string;
  /** Guide page that goes deeper on the same topic. */
  guide: { href: string; label: string };
  /** utm_campaign for links out to YouTube. */
  campaign: string;
}

/** Long-form videos on the channel, in display order. */
export const youtubeVideos: ReadonlyArray<YouTubeVideo> = [
  {
    id: 'CmWCwDFU3CA',
    title: 'Claude Chat vs Cowork vs Code Tab: What Changed & When to Use Each',
    summary: 'How Anthropic merged Cowork into Chat, why Code stays separate, and when to use each tab.',
    guide: { href: '/docs/comparisons/vs-claude-web', label: 'Claude vs Claude Code' },
    campaign: 'claude-chat-cowork-code',
  },
  {
    id: '7HWB0ytfksY',
    title: 'Claude Fable 5.2 & 5.5 Models Explained (When to Use Each)',
    summary: 'Which Claude model to pick for which job, and what each one costs.',
    guide: { href: '/docs/foundations/model-selection', label: 'Which model should I use?' },
    campaign: 'claude-fable-5-2',
  },
  {
    id: '2Vp1S67zUGE',
    title: 'I Explained It Clearly. The AI Still Built the Wrong Thing.',
    summary: 'Why a clear request still gets the wrong build, and how to plan first.',
    guide: { href: '/docs/foundations/plan-mode', label: 'Plan mode' },
    campaign: 'when-ai-gets-it-wrong',
  },
  {
    id: '-yRDIfQDoKM',
    title: 'The AI Sounded Sure. It Made the Answer Up.',
    summary: 'How to spot a confident made-up answer and ask for proof.',
    guide: { href: '/docs/workflows/stop-claude-from-agreeing-with-everything', label: 'Stop Claude agreeing with everything' },
    campaign: 'when-ai-gets-it-wrong',
  },
  {
    id: 'OvBodrZUiW4',
    title: 'Why Everything AI Writes for You Sounds Like a Robot',
    summary: 'Why AI drafts sound generic, and the loop that makes them sound like you.',
    publishAt: '2026-11-19T16:00:00Z',
    guide: { href: '/docs/frameworks/5c-loop', label: 'The 5C loop' },
    campaign: 'when-ai-gets-it-wrong',
  },
  {
    id: 'w_zJ0F0izZg',
    title: "The AI Can't Make Sense of Your Spreadsheet",
    summary: 'Why AI misreads your spreadsheet, and how to hand it data it can use.',
    publishAt: '2026-11-17T16:00:00Z',
    guide: { href: '/tutorials/personal-finance-manager', label: 'Personal finance manager tutorial' },
    campaign: 'when-ai-gets-it-wrong',
  },
  {
    id: 'gbmHKFtco8Y',
    title: 'You Asked a Simple Question. The AI Wrote an Essay.',
    summary: 'How to get the short answer you asked for.',
    publishAt: '2026-11-26T16:00:00Z',
    guide: { href: '/docs/foundations/prompting', label: 'Prompting basics' },
    campaign: 'when-ai-gets-it-wrong',
  },
  {
    id: 'yYepsIZHbrk',
    title: 'You Asked the AI to Fix One Thing. It Broke Two Others.',
    summary: 'Why one fix breaks other things, and how to keep changes small.',
    publishAt: '2026-12-03T16:00:00Z',
    guide: { href: '/docs/foundations/shortcuts', label: 'Rewind a bad change' },
    campaign: 'when-ai-gets-it-wrong',
  },
];

export function getPublicVideos(now: Date = new Date()): YouTubeVideo[] {
  return youtubeVideos
    .filter((v) => !v.publishAt || new Date(v.publishAt).getTime() <= now.getTime());
}

export function getVideoById(id: string): YouTubeVideo | undefined {
  return youtubeVideos.find((v) => v.id === id);
}

export function youtubeWatchUrl(video: YouTubeVideo, medium: string): string {
  return `https://www.youtube.com/watch?v=${video.id}&utm_source=claudecodeguide&utm_medium=${medium}&utm_campaign=${video.campaign}`;
}
