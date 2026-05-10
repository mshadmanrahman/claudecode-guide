'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

interface PersonaGuideTrackerProps {
  slug: string;
  title: string;
  section: string;
}

export function PersonaGuideTracker({ slug, title, section }: PersonaGuideTrackerProps) {
  const viewFired = useRef(false);
  const completeFired = useRef(false);

  useEffect(() => {
    const params = { guide_slug: slug, guide_title: title, section };

    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewFired.current) {
          viewFired.current = true;
          trackEvent('persona_guide_view', params);
          viewObserver.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    const completeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !completeFired.current) {
          completeFired.current = true;
          trackEvent('persona_guide_complete', { ...params, source: 'scroll' });
          completeObserver.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    const introEl = document.querySelector('[data-persona-guide-intro]');
    if (introEl) viewObserver.observe(introEl);

    const sentinelEl = document.querySelector('[data-persona-guide-sentinel]');
    if (sentinelEl) completeObserver.observe(sentinelEl);

    return () => {
      viewObserver.disconnect();
      completeObserver.disconnect();
    };
  }, [slug, title, section]);

  return null;
}
