import Image from "next/image";
import type { SceneName } from "@/components/scene-backdrop";

interface SceneFooterBandProps {
  /** Which landscape to show. Same day and night pairs as SceneBackdrop. */
  scene?: SceneName;
}

/**
 * The bottom of a landscape, shown above the footer and running on behind it.
 * The top edge fades in from the page; the bottom stays as a faded wash so the
 * footer's glass chips sit on the painting, the way every other page's footer
 * sits on its backdrop. The image layer is anchored to the bottom of the (home)
 * layout (`relative isolate`), so it reaches the page bottom whatever height
 * the footer wraps to. Day and night swap in CSS on the `.dark` class, the same
 * way SceneBackdrop does.
 */
const MASK =
  "linear-gradient(to bottom, transparent 0, rgba(0, 0, 0, 0.35) 15%, rgba(0, 0, 0, 0.8) 30%, #000 42%, #000 62%, rgba(0, 0, 0, 0.55) 82%, rgba(0, 0, 0, 0.45) 100%)";

export function SceneFooterBand({ scene = "delta" }: SceneFooterBandProps) {
  return (
    <>
      {/* Keeps room above the footer so the painting shows in full there. */}
      <div aria-hidden="true" className="h-[220px] sm:h-[340px]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[520px] overflow-hidden sm:h-[680px]"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
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
    </>
  );
}
