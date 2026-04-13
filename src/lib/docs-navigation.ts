import { source } from '@/lib/source';

export interface DocPageInfo {
  title: string;
  slug: string;
  url: string;
  section: string;
}

/**
 * Extracts a plain string from a ReactNode page tree name.
 * Fumadocs uses ReactNode for names; we need strings for navigation.
 */
function nameToString(name: unknown): string {
  if (typeof name === 'string') return name;
  if (name == null) return '';
  return String(name);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any: Fumadocs Node types use ReactNode; we extract strings
type TreeNode = any;

/**
 * Flattens the Fumadocs page tree into a linear array of pages,
 * preserving the order from meta.json files. This drives the
 * prev/next navigation and section progress in the Chapter Book layout.
 *
 * Fumadocs splits the tree: separators live in `tree.children`,
 * while actual pages live in `tree.fallback.children` as folders.
 * We merge them by using separators for section names and looking up
 * matching folders in the fallback tree for pages.
 */
export function getFlatPageList(): DocPageInfo[] {
  const pages: DocPageInfo[] = [];
  const tree = source.pageTree;
  if (!tree) return pages;

  // Build a folder lookup from the fallback tree
  const fallbackFolders = new Map<string, TreeNode>();
  if (tree.fallback && Array.isArray(tree.fallback.children)) {
    for (const node of tree.fallback.children) {
      if (node.type === 'folder' && node.name) {
        fallbackFolders.set(nameToString(node.name), node);
      }
    }
  }

  // Walk a folder's children to extract pages
  function walkFolder(nodes: TreeNode[], sectionName: string) {
    for (const node of nodes) {
      if (node.type === 'page' && node.url) {
        pages.push({
          title: nameToString(node.name),
          slug: node.url.replace('/docs/', '').replace(/^\//, ''),
          url: node.url,
          section: sectionName,
        });
      } else if (node.type === 'folder') {
        // Nested folder - include index page if present
        if (node.index && node.index.url) {
          pages.push({
            title: nameToString(node.index.name) || nameToString(node.name),
            slug: node.index.url.replace('/docs/', '').replace(/^\//, ''),
            url: node.index.url,
            section: sectionName,
          });
        }
        if (Array.isArray(node.children)) {
          walkFolder(node.children, sectionName);
        }
      }
    }
  }

  // Main tree children are separators; match them to fallback folders
  if (Array.isArray(tree.children)) {
    for (const node of tree.children) {
      if (node.type === 'separator') {
        const sectionName = nameToString(node.name).replace(/^---/, '').replace(/---$/, '').trim();
        const folder = fallbackFolders.get(sectionName);
        if (folder && Array.isArray(folder.children)) {
          walkFolder(folder.children, sectionName);
        }
      } else if (node.type === 'page' && node.url) {
        // Direct page in main tree (not in a folder)
        pages.push({
          title: nameToString(node.name),
          slug: node.url.replace('/docs/', '').replace(/^\//, ''),
          url: node.url,
          section: '',
        });
      }
    }
  }

  // If no separators matched (different tree structure), fall back to walking everything
  if (pages.length === 0) {
    const allNodes = [
      ...(Array.isArray(tree.children) ? tree.children : []),
      ...(tree.fallback && Array.isArray(tree.fallback.children) ? tree.fallback.children : []),
    ];
    walkFolder(allNodes, '');
  }

  return pages;
}

export function getPageNavigation(currentSlug: string) {
  const pages = getFlatPageList();
  const currentIndex = pages.findIndex((p) => p.slug === currentSlug);

  if (currentIndex === -1) {
    return { prev: null, next: null, current: null, sectionPages: [], allPages: pages };
  }

  const current = pages[currentIndex];
  const prev = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const next = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;
  const sectionPages = pages.filter((p) => p.section === current.section);

  return { prev, next, current, sectionPages, allPages: pages };
}

export function getSections(): { name: string; pages: DocPageInfo[] }[] {
  const pages = getFlatPageList();
  const sectionMap = new Map<string, DocPageInfo[]>();

  for (const page of pages) {
    const section = page.section || 'Other';
    if (!sectionMap.has(section)) {
      sectionMap.set(section, []);
    }
    sectionMap.get(section)!.push(page);
  }

  return Array.from(sectionMap.entries()).map(([name, sectionPages]) => ({
    name,
    pages: sectionPages,
  }));
}
