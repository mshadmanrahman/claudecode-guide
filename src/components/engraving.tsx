import Image from "next/image";
import type { ReactNode } from "react";
import { BANDS, ENGRAVED } from "@/lib/engraving-manifest";
import type { SceneName } from "@/lib/scenes";

/** A scene without its own engraving yet falls back to the valley. */
export function engravingSrc(scene: SceneName): string {
  return `/engraving/${ENGRAVED.get(scene) ?? ENGRAVED.get("valley")}`;
}

/** The footer keeps the landscape when the panel art for a scene shows a person. */
function bandSrc(scene: SceneName): string {
  const band = BANDS.get(scene);
  return band ? `/engraving/band/${band}` : engravingSrc(scene);
}

interface EngravingBandProps {
  /** Which landscape to show, matched to the page's audience. */
  scene?: SceneName;
}

/**
 * The muted ink landscape above the footer, on every page. It is anchored to the
 * bottom of its spacer, so it ends where the footer starts and fades out there
 * instead of being cut by the footer's solid background. It rises behind the
 * content above, under the nearest `relative isolate` wrapper. Ink and opacity
 * live in globals.css (`.engr-band`), including the dark swap.
 */
export function EngravingBand({ scene = "valley" }: EngravingBandProps) {
  return (
    <div aria-hidden="true" className="relative h-[180px] sm:h-[280px]">
      <div className="engr-band">
        <Image src={bandSrc(scene)} alt="" fill sizes="100vw" quality={75} className="engr-ink" />
      </div>
    </div>
  );
}

interface EngravingPanelProps {
  scene: SceneName;
  /** Size and radius of the frame. The panel fills it. */
  className?: string;
  /** Where the crop sits, e.g. "center bottom". */
  focus?: string;
  sizes?: string;
  priority?: boolean;
  /** UI that floats on the art, such as the hero's demo card. */
  children?: ReactNode;
}

/**
 * A framed, rounded panel of engraving. The art stays inside the frame and never
 * runs behind body text; cards sit on top of it instead.
 */
export function EngravingPanel({
  scene,
  className = "",
  focus = "center bottom",
  sizes = "100vw",
  priority = false,
  children,
}: EngravingPanelProps) {
  return (
    <div className={`engr-panel relative overflow-hidden ${className}`}>
      <Image
        src={engravingSrc(scene)}
        alt=""
        fill
        sizes={sizes}
        quality={90}
        priority={priority}
        className="engr-ink object-cover"
        style={{ objectPosition: focus }}
      />
      {children}
    </div>
  );
}
