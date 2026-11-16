"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type Destination = "substack" | "linkedin" | "github";

function destinationFor(url: URL): Destination | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host === "substack.com" || host.endsWith(".substack.com")) return "substack";
  if (host === "linkedin.com" || host.endsWith(".linkedin.com")) {
    // Share buttons post to LinkedIn; they are not profile visits.
    return /\/(sharing|shareArticle)/.test(url.pathname) ? null : "linkedin";
  }
  if (host === "github.com") return "github";
  return null;
}

/**
 * Fires a GA4 `profile_click` event, with a `destination` param, when a reader
 * follows any outbound link to Substack, LinkedIn or GitHub. One delegated
 * listener covers every link on every page.
 */
export function ProfileClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      const destination = destinationFor(url);
      if (!destination) return;
      trackEvent("profile_click", { destination, link_url: url.href });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
