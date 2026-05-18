'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';

export function WorkflowTracker() {
  const viewFired = useRef(false);
  const completeFired = useRef(false);

  useEffect(() => {
    trackEvent('workflow_page_view');

    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewFired.current) {
          viewFired.current = true;
          trackEvent('workflow_section_view', { section: 'day_flow' });
          viewObserver.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    const completeObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !completeFired.current) {
          completeFired.current = true;
          trackEvent('workflow_complete', { source: 'scroll' });
          completeObserver.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    const introEl = document.querySelector('[data-workflow-intro]');
    if (introEl) viewObserver.observe(introEl);

    const sentinelEl = document.querySelector('[data-workflow-complete]');
    if (sentinelEl) completeObserver.observe(sentinelEl);

    return () => {
      viewObserver.disconnect();
      completeObserver.disconnect();
    };
  }, []);

  return null;
}
