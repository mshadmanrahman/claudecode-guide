"use client";

import { Star } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function GithubStarCta() {
  return (
    <div className="mt-10 flex items-center justify-center gap-2 text-sm text-fd-muted-foreground">
      <span>Found this useful?</span>
      <a
        href="https://github.com/mshadmanrahman/claudecode-guide"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("github_star_click", { source: "docs_page_footer" })
        }
        className="inline-flex items-center gap-1.5 font-medium text-fd-foreground hover:text-fd-primary transition-colors"
      >
        <Star className="h-3.5 w-3.5" />
        Star claudecode-guide on GitHub
      </a>
    </div>
  );
}
