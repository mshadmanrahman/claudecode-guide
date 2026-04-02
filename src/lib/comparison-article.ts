export interface ComparisonRelatedLink {
  title: string;
  href: string;
  description?: string;
}

export interface ComparisonArticleMetadata {
  targetKeyword?: string;
  comparisonEntities: string[];
  relatedLinks: ComparisonRelatedLink[];
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function toStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
}

function toRelatedLinks(value: unknown): ComparisonRelatedLink[] {
  if (!Array.isArray(value)) return [];

  const links: ComparisonRelatedLink[] = [];

  for (const item of value) {
    const record = asRecord(item);
    if (!record) continue;

    const title = typeof record.title === 'string' ? record.title.trim() : '';
    const href = typeof record.href === 'string' ? record.href.trim() : '';
    const description =
      typeof record.description === 'string' ? record.description.trim() : undefined;

    if (!title || !href || !href.startsWith('/')) continue;

    links.push({
      title,
      href,
      description: description || undefined,
    });
  }

  return links;
}

export function getComparisonArticleMetadata(rawData: unknown): ComparisonArticleMetadata {
  const data = asRecord(rawData);
  if (!data) {
    return {
      comparisonEntities: [],
      relatedLinks: [],
    };
  }

  const targetKeyword =
    typeof data.targetKeyword === 'string' && data.targetKeyword.trim().length > 0
      ? data.targetKeyword.trim()
      : undefined;

  return {
    targetKeyword,
    comparisonEntities: toStringList(data.comparisonEntities),
    relatedLinks: toRelatedLinks(data.relatedLinks),
  };
}
