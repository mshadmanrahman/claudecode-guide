import Image from "next/image";

export type SceneVariant = "full" | "faded";

interface SceneBackdropProps {
  /** full: the homepage scene. faded: a quiet wash for doc and blog pages. */
  variant?: SceneVariant;
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
    <div aria-hidden="true" className={classes}>
      <div className="scene-drift">
        <Image
          src="/scene/scene-day.jpg"
          alt=""
          fill
          sizes="100vw"
          className="scene-img scene-day"
        />
        <Image
          src="/scene/scene-night.jpg"
          alt=""
          fill
          sizes="100vw"
          className="scene-img scene-night"
        />
      </div>
      <div className="scene-grid" />
    </div>
  );
}
