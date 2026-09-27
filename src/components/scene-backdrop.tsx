import Image from "next/image";

export type SceneVariant = "full" | "faded";

/**
 * Each scene is a day and night pair in public/scene/, 2048x3072, painted in the
 * same style as the homepage valley. Landing pages pick the one that fits their
 * audience; any page without its own gets the valley.
 */
export type SceneName =
  | "valley"
  | "harbor"
  | "schoolhouse"
  | "swatches"
  | "market"
  | "green"
  | "signposts"
  | "lakeside"
  | "trailhead"
  | "summit"
  | "archipelago"
  | "cabin"
  | "delta"
  | "workshop"
  | "watermills"
  | "steppingstones"
  | "gorge"
  | "overlook"
  | "standingstones"
  | "viaduct";

function sceneSrc(scene: SceneName, time: "day" | "night") {
  return scene === "valley" ? `/scene/scene-${time}.jpg` : `/scene/${scene}-${time}.jpg`;
}

interface SceneBackdropProps {
  /** full: the homepage scene. faded: a quiet wash for doc and blog pages. */
  variant?: SceneVariant;
  /** Which landscape to paint. Defaults to the homepage valley. */
  scene?: SceneName;
  /**
   * absolute (default) fills the nearest positioned ancestor. The (home) layout
   * wrapper is `relative isolate`, so the scene runs behind header, page and footer.
   * fixed pins it to the viewport instead.
   */
  position?: "absolute" | "fixed";
  className?: string;
}

/**
 * Day and night landscape behind page content. The day image shows in light
 * theme and the night image in dark; the swap is pure CSS on the `.dark` class,
 * so there is no hydration flash. Drift and fade respect prefers-reduced-motion
 * (see globals.css, "Signal redesign: shared surfaces").
 */
export function SceneBackdrop({
  variant = "full",
  scene = "valley",
  position = "absolute",
  className,
}: SceneBackdropProps) {
  const classes = [
    "scene",
    `scene--${variant}`,
    position === "fixed" ? "fixed" : "absolute",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div aria-hidden="true" className={classes} data-scene={scene}>
      <div className="scene-drift">
        <Image
          src={sceneSrc(scene, "day")}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="scene-img scene-day"
        />
        <Image
          src={sceneSrc(scene, "night")}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="scene-img scene-night"
        />
      </div>
      <div className="scene-grid" />
    </div>
  );
}
