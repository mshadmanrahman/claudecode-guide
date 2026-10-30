import Link from 'next/link';
import { Languages } from 'lucide-react';
import { ui, type Locale } from '@/lib/i18n/locale';

interface LanguageSwitchProps {
  /** The locale of the page the pill sits on. */
  locale: Locale;
  /** The same page in the other language. */
  href: string;
  className?: string;
}

/** A pill that opens the same page in the other language, labeled in that language. */
export function LanguageSwitch({ locale, href, className = '' }: LanguageSwitchProps) {
  const other = locale === 'en' ? 'bn' : 'en';
  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      className={`inline-flex items-center gap-1.5 rounded-full border border-fd-border px-3 py-1 text-xs text-fd-muted-foreground transition-colors hover:text-fd-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)] ${className}`}
    >
      <Languages className="h-3.5 w-3.5" aria-hidden="true" />
      {ui(locale).switchLanguage}
    </Link>
  );
}
