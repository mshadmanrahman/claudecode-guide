'use client';

import { useEffect, useMemo, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';
import { ArrowRight } from 'lucide-react';

export type AffiliateCTAPlacement = 'inline' | 'mid-banner' | 'end-card';

interface AffiliateCTAProps {
  pageSlug: string;
  variantId: string;
  placement: AffiliateCTAPlacement;
  title: string;
  description: string;
  ctaLabel: string;
  destination: string;
}

function normalizeEventPayload({
  pageSlug,
  variantId,
  placement,
  destination,
}: Pick<AffiliateCTAProps, 'pageSlug' | 'variantId' | 'placement' | 'destination'>) {
  return {
    pageSlug,
    ctaVariantId: variantId,
    placement,
    destination,
  };
}

export function AffiliateCTA(props: AffiliateCTAProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasTrackedView = useRef(false);
  const payload = useMemo(
    () =>
      normalizeEventPayload({
        pageSlug: props.pageSlug,
        variantId: props.variantId,
        placement: props.placement,
        destination: props.destination,
      }),
    [props.pageSlug, props.variantId, props.placement, props.destination],
  );

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            hasTrackedView.current = true;
            trackEvent('affiliate_cta_view', payload);
          }
        });
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [payload]);

  const onClick = () => {
    trackEvent('affiliate_cta_click', payload);
  };

  const isExternal = /^https?:\/\//.test(props.destination);

  const containerClassName =
    props.placement === 'inline'
      ? 'rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-4 py-4 sm:px-5'
      : props.placement === 'mid-banner'
        ? 'rounded-2xl border border-indigo-500/25 bg-indigo-500/10 px-5 py-5 sm:px-6'
        : 'rounded-2xl border border-fd-border bg-fd-card px-5 py-6 sm:px-6';

  const descriptionClassName =
    props.placement === 'mid-banner'
      ? 'text-sm leading-relaxed text-fd-foreground/85'
      : 'text-sm leading-relaxed text-fd-muted-foreground';

  return (
    <section ref={sectionRef} className={containerClassName}>
      <p className="font-display text-lg font-normal tracking-tight text-fd-foreground">
        {props.title}
      </p>
      <p className={`mt-2 ${descriptionClassName}`}>{props.description}</p>
      <a
        href={props.destination}
        onClick={onClick}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {props.ctaLabel}
        <ArrowRight className="h-4 w-4" />
      </a>
    </section>
  );
}
