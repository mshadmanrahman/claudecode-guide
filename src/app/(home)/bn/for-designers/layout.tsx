import type { ReactNode } from 'react';
import { SceneBackdrop } from '@/components/scene-backdrop';

export default function BnForDesignersLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SceneBackdrop variant="faded" scene="swatches" />
      {children}
    </>
  );
}
