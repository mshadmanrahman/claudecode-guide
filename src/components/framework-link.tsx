import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FrameworkLinkProps {
  /** The /docs/frameworks page for this audience. */
  href: string;
  /** Who the framework is written for, e.g. "teachers". */
  audience: string;
}

/** One quiet line from a hub to the long-form framework doc behind it. */
export function FrameworkLink({ href, audience }: FrameworkLinkProps) {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-16">
      <p className="text-center text-sm text-fd-muted-foreground">
        Want the method behind these guides?{" "}
        <Link
          href={href}
          className="inline-flex items-center gap-1 rounded-sm font-medium text-fd-foreground underline underline-offset-2 hover:text-[var(--acc)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
        >
          Read the framework for {audience}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </p>
    </section>
  );
}
