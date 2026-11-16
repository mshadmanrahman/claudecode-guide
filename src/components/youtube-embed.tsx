'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import { getVideoById, youtubeWatchUrl } from '@/data/youtube-videos';

interface YouTubeEmbedProps {
  id: string;
  /** utm_medium for the "Watch on YouTube" link. */
  medium?: string;
}

/**
 * Thumbnail first; the YouTube iframe loads only after a click,
 * so a page with a video costs one image until someone wants to watch.
 */
export function YouTubeEmbed({ id, medium = 'docs' }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);
  const video = getVideoById(id);
  const title = video?.title ?? 'YouTube video';

  return (
    <figure className="not-prose my-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-fd-border bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
            aria-label={`Play video: ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/75 text-white">
              <Play className="h-6 w-6 translate-x-0.5" aria-hidden />
            </span>
          </button>
        )}
      </div>
      {video && (
        <figcaption className="mt-2 text-sm text-fd-muted-foreground">
          {video.title} ·{' '}
          <a
            href={youtubeWatchUrl(video, medium)}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-fd-foreground"
          >
            Watch on YouTube
          </a>
        </figcaption>
      )}
    </figure>
  );
}
