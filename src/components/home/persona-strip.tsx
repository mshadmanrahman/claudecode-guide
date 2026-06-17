import Link from "next/link";
import {
  Paintbrush,
  Globe,
  FileText,
  BookOpen,
  Megaphone,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

const PERSONAS = [
  { label: "For Designers", href: "/for-designers", icon: Paintbrush },
  { label: "For Chrome", href: "/for-chrome", icon: Globe },
  { label: "For Office", href: "/for-microsoft", icon: FileText },
  { label: "For Teachers", href: "/for-teachers", icon: BookOpen },
  { label: "For Marketers", href: "/for-marketers", icon: Megaphone },
  { label: "For HR", href: "/for-hr", icon: Users },
  { label: "PM Pilot", href: "/pm-pilot", icon: BriefcaseBusiness },
];

export function PersonaStrip() {
  return (
    <div className="sticky top-14 z-40 border-b border-fd-border bg-fd-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-10 max-w-5xl items-center gap-1 overflow-x-auto px-4 scrollbar-none">
        <span className="shrink-0 text-[11px] font-medium text-fd-muted-foreground mr-2 hidden sm:block">
          Guides for:
        </span>
        {PERSONAS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-card px-3 py-1 text-xs text-fd-muted-foreground transition-colors hover:border-fd-muted-foreground/40 hover:text-fd-foreground whitespace-nowrap"
          >
            <Icon className="h-3 w-3" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
