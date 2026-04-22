import { track as vercelTrack } from '@vercel/analytics';

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set',
      eventName: string,
      params?: Record<string, unknown>,
    ) => void;
  }
}

type VercelPropertyValue = string | number | boolean | null;

function sanitizeForVercel(
  params?: Record<string, unknown>,
): Record<string, VercelPropertyValue> | undefined {
  if (!params) return undefined;
  const out: Record<string, VercelPropertyValue> = {};
  for (const [key, value] of Object.entries(params)) {
    if (
      value === null ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      out[key] = value;
    }
  }
  return out;
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return;
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
  try {
    vercelTrack(eventName, sanitizeForVercel(params));
  } catch {
    // Vercel Analytics disabled or blocked; GA4 already fired.
  }
}
