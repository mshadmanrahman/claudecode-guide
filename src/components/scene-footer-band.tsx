import Image from "next/image";
import type { SceneName } from "@/components/scene-backdrop";

interface SceneFooterBandProps {
  /** Which landscape to show. Same day and night pairs as SceneBackdrop. */
  scene?: SceneName;
}

/**
 * The bottom of a landscape, shown as a band just above the footer. Both
 * edges fade into the page so no seam shows. Day and night swap in CSS on the
 * `.dark` class, the same way SceneBackdrop does.
 */
export function SceneFooterBand({ scene = "delta" }: SceneFooterBandProps) {
  return (
    <div
      aria-hidden="true"
      className="relative h-[320px] overflow-hidden sm:h-[460px]"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0, rgba(0, 0, 0, 0.35) 20%, rgba(0, 0, 0, 0.8) 40%, #000 58%, #000 78%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0, rgba(0, 0, 0, 0.35) 20%, rgba(0, 0, 0, 0.8) 40%, #000 58%, #000 78%, transparent 100%)",
      }}
    >
      <Image
        src={`/scene/${scene}-day.jpg`}
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="scene-img scene-day object-cover"
        style={{ objectPosition: "center bottom" }}
      />
      <Image
        src={`/scene/${scene}-night.jpg`}
        alt=""
        fill
        sizes="100vw"
        quality={85}
        className="scene-img scene-night object-cover"
        style={{ objectPosition: "center bottom" }}
      />
    </div>
  );
}
