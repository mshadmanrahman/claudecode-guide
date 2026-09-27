export const SUBSTACK_URL = "https://shadmanrahman.substack.com/";
export const SUBSTACK_NAME = "Product Field Notes";

const FEED_URL = `${SUBSTACK_URL}feed`;

export interface SubstackPost {
  title: string;
  description: string;
  link: string;
  date: string;
  image: string | null;
}

function field(item: string, tag: string): string {
  const match = item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return match ? match[1].trim() : "";
}

/** Latest posts from the RSS feed, refreshed every 6 hours. Returns [] if the feed is unreachable. */
export async function getLatestPosts(limit = 3): Promise<SubstackPost[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 21600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.split("<item>").slice(1, limit + 1);
    return items
      .map((item) => ({
        title: field(item, "title"),
        description: field(item, "description"),
        link: field(item, "link"),
        date: field(item, "pubDate"),
        image: item.match(/<enclosure url="([^"]+)"/)?.[1] ?? null,
      }))
      .filter((post) => post.title && post.link.startsWith(SUBSTACK_URL));
  } catch {
    return [];
  }
}
