import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface DeprecationBannerProps {
  message: string;
  linkText: string;
  linkHref: string;
}

export function DeprecationBanner({ message, linkText, linkHref }: DeprecationBannerProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6">
      <div className="rounded-xl border border-fd-primary/20 bg-fd-primary/5 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-fd-primary" />
          <div className="min-w-0">
            <p className="text-sm text-fd-foreground">{message}</p>
            <Link
              href={linkHref}
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-fd-primary hover:underline"
            >
              {linkText}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
