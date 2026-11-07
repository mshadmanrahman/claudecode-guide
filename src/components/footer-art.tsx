import Image from "next/image";
import { FOOTER_ART } from "@/lib/footer-art-manifest";
import type { FooterScene } from "@/lib/footer-scenes";

/** One landscape closes every page: the peak over the meadow. */
const DEFAULT_SCENE: FooterScene = "meadow";

interface FooterArtProps {
  /** Pin a different scene. */
  scene?: FooterScene;
  children?: React.ReactNode;
}

/** Engraved landscape that closes the page, under the footer links. */
export function FooterArt({ scene = DEFAULT_SCENE, children }: FooterArtProps) {
  const src = FOOTER_ART[scene] ?? FOOTER_ART[DEFAULT_SCENE];
  return (
    <div className="footer-art" data-scene={scene}>
      {src && <Image key={src} src={src} alt="" aria-hidden="true" fill sizes="100vw" quality={90} className="engr-ink" />}
      {children}
    </div>
  );
}
