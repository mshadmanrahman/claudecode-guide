import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { EmailCapture } from "@/components/email-capture";
import { SUBSTACK_NAME, SUBSTACK_URL, type SubstackPost } from "@/lib/substack";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--acc)]";

function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function FieldNotes({ posts }: { posts: SubstackPost[] }) {
  return (
    <section
      aria-labelledby="home-field-notes"
      className="mx-auto mt-16 flex max-w-[1440px] flex-col gap-[22px] px-4 md:px-16"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="glass flex max-w-full flex-col gap-1.5 rounded-[10px] px-5 py-3.5">
          <h2 id="home-field-notes" className="m-0 text-[28px] font-semibold tracking-[-0.035em] md:text-4xl">
            Latest from {SUBSTACK_NAME}
          </h2>
          <p className="m-0 text-[15px] leading-normal text-[var(--muted)]">
            My Substack, where I publish most weeks: product work, AI in practice, and what broke along the way.
          </p>
        </div>
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`glass flex h-11 items-center gap-1.5 rounded-lg px-4 text-[15px] font-medium transition-colors hover:bg-[var(--chip)] ${focusRing}`}
        >
          All posts <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {posts.length > 0 ? (
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.link}>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass hm-card flex h-full flex-col overflow-hidden rounded-xl ${focusRing}`}
              >
                {post.image ? (
                  <Image
                    src={post.image}
                    alt=""
                    width={600}
                    height={400}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[3/2] w-full object-cover"
                  />
                ) : null}
                <span className="flex flex-1 flex-col gap-2 px-5 py-4">
                  <span className="font-mono text-xs text-[var(--muted)]">{formatDate(post.date)}</span>
                  <span className="text-[17px] font-semibold leading-snug tracking-[-0.015em]">{post.title}</span>
                  {post.description ? (
                    <span className="line-clamp-3 text-[14.5px] leading-normal text-[var(--muted)]">
                      {post.description}
                    </span>
                  ) : null}
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mx-auto w-full max-w-2xl">
        <EmailCapture placement="homepage-field-notes" />
      </div>
    </section>
  );
}
