'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

interface TutorialTrackerProps {
  slug: string;
  title: string;
}

/**
 * Zero-UI component. Mounts IntersectionObservers to fire GA4 events:
 * - tutorial_start: when the intro block scrolls into view (user engaged)
 * - tutorial_complete: when the bottom sentinel scrolls into view (user finished)
 *
 * Relies on data attributes placed in the tutorial page:
 * - data-tutorial-intro  → on the intro/first-content block
 * - data-tutorial-complete-sentinel → on the footer/completion area
 */
export function TutorialTracker({ slug, title }: TutorialTrackerProps) {
  const startFired = useRef(false);
  const completeFired = useRef(false);

  useEffect(() => {
    const sharedParams = { tutorial_slug: slug, tutorial_title: title };

    const startObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startFired.current) {
          startFired.current = true;
          trackEvent('tutorial_start', sharedParams);
          startObserver.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    const completeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !completeFired.current) {
          completeFired.current = true;
          trackEvent('tutorial_complete', { ...sharedParams, source: 'scroll' });
          completeObserver.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    const introEl = document.querySelector('[data-tutorial-intro]');
    if (introEl) startObserver.observe(introEl);

    const sentinelEl = document.querySelector('[data-tutorial-complete-sentinel]');
    if (sentinelEl) completeObserver.observe(sentinelEl);

    return () => {
      startObserver.disconnect();
      completeObserver.disconnect();
    };
  }, [slug, title]);

  return null;
}
