import type { Metadata } from 'next';
import { DesignerHero } from '@/components/for-designers/hero';
import { DesignerBeforeAfter } from '@/components/for-designers/before-after';
import { DesignerProcessMap } from '@/components/for-designers/design-process';
import { DesignerGuideCards } from '@/components/for-designers/guide-cards';
import { DesignerGettingStarted } from '@/components/for-designers/getting-started';
import { DesignerWhyExists } from '@/components/for-designers/why-exists';
import { PersonaWorkflowStrip } from '@/components/persona-workflow-strip';
import { StaleNotice } from '@/components/stale-notice';
import { DESIGNERS_HUB } from '@/lib/hubs/designers';
import { BN_DESIGNERS_HUB } from '@/lib/i18n/bn/hubs/designers';
import { BN_DESIGNER_GUIDES } from '@/lib/i18n/bn/designer-guides';
import { sourceHash } from '@/lib/i18n/source-hash';
import { ogImage } from '@/lib/og/image';

const url = 'https://claudecodeguide.dev/bn/for-designers';
const title = 'ডিজাইনারদের জন্য Claude: UX আর UI কাজের guide';
const description =
  'UX আর UI ডিজাইনারদের জন্য Claude-এর practical guide: brief বোঝা, heuristic evaluation, research synthesis আর prototype বানানো।';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: url,
    languages: { en: 'https://claudecodeguide.dev/for-designers', bn: url },
  },
  openGraph: {
    title,
    description,
    type: 'website',
    url,
    locale: 'bn_BD',
    images: [ogImage('for-designers', 'Claude for Designers: Practical Guides for UX and UI Work')],
  },
};

const guides = Object.fromEntries(
  Object.entries(BN_DESIGNER_GUIDES).flatMap(([slug, t]) =>
    t ? [[slug, { title: t.content.title, description: t.content.description, duration: t.content.duration }]] : [],
  ),
);

export default function BnForDesignersPage() {
  const copy = BN_DESIGNERS_HUB.content;
  const stale = BN_DESIGNERS_HUB.sourceHash !== sourceHash(DESIGNERS_HUB);
  return (
    <main lang="bn" className="overflow-x-clip">
      {stale && <StaleNotice englishHref="/for-designers" />}
      <DesignerHero locale="bn" copy={copy} />
      <DesignerBeforeAfter locale="bn" copy={copy.beforeAfter} />
      <DesignerProcessMap copy={copy.process} />
      <PersonaWorkflowStrip persona="designers" locale="bn" copy={copy.strip} />
      <div id="guides">
        <DesignerGuideCards locale="bn" copy={copy.cards} guides={guides} />
      </div>
      <DesignerGettingStarted locale="bn" copy={copy.gettingStarted} />
      <DesignerWhyExists copy={copy.why} />
    </main>
  );
}
