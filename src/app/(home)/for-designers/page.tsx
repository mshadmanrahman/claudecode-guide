import { DesignerHero } from '@/components/for-designers/hero';
import { DesignerWorksWith } from '@/components/for-designers/works-with';
import { DesignerBeforeAfter } from '@/components/for-designers/before-after';
import { DesignerGuideCards } from '@/components/for-designers/guide-cards';
import { DesignerGettingStarted } from '@/components/for-designers/getting-started';
import { DesignerWhyExists } from '@/components/for-designers/why-exists';
import { EmailCapture } from '@/components/email-capture';

export default function ForDesignersPage() {
  return (
    <main className="overflow-x-clip">
      <DesignerHero />
      <DesignerWorksWith />
      <div className="border-b border-fd-border" />
      <DesignerBeforeAfter />
      <div className="border-b border-fd-border" />
      <DesignerGuideCards />
      <div className="border-b border-fd-border" />
      <DesignerGettingStarted />
      <div className="border-b border-fd-border" />
      <DesignerWhyExists />
      <div className="border-b border-fd-border" />
      <div className="mx-auto max-w-3xl px-6 py-24">
        <EmailCapture placement="for-designers-footer" />
      </div>
    </main>
  );
}
