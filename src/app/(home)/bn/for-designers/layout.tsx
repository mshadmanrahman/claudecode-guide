import type { ReactNode } from 'react';
import { SceneBackdrop } from '@/components/scene-backdrop';
import { SceneFooterBand } from '@/components/scene-footer-band';

export default function BnForDesignersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SceneBackdrop variant="faded" scene="swatches" />
      {children}
      <SceneFooterBand scene="swatches" />
    </>
  );
}
