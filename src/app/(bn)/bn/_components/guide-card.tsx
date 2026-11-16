import { existsSync } from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import Link from 'next/link';

/** A card gets the painted scene only when public/<dir>/<slug>.jpg exists, same rule as /tutorials. */
export function cardImage(dir: 'tutorials' | 'for-designers' | 'for-teachers', slug: string): string | undefined {
  const file = path.join(process.cwd(), 'public', dir, `${slug}.jpg`);
  return existsSync(file) ? `/${dir}/${slug}.jpg` : undefined;
}

interface GuideCardProps {
  href: string;
  image?: string;
  title: string;
  duration: string;
  description: string;
}

export function GuideCard({ href, image, title, duration, description }: GuideCardProps) {
  return (
    <li>
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-fd-border bg-[var(--glass)] backdrop-blur-[16px] backdrop-saturate-[1.2] transition-colors hover:border-[var(--acc)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]"
      >
        {image && (
          <span className="relative block aspect-[2/1] overflow-hidden">
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 640px) 370px, 100vw"
              className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03] motion-reduce:transition-none"
            />
          </span>
        )}
        <span className="flex flex-1 flex-col gap-1.5 p-4">
          <span className="font-mono text-xs text-fd-muted-foreground">{duration}</span>
          <span className="font-medium leading-snug text-fd-foreground group-hover:text-[var(--acc)]">{title}</span>
          <span className="line-clamp-2 text-sm leading-relaxed text-fd-muted-foreground">{description}</span>
        </span>
      </Link>
    </li>
  );
}
