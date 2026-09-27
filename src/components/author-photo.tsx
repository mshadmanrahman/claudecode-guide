import Image from "next/image";

interface AuthorPhotoProps {
  /** avatar: square headshot for bylines. portrait: half-body photo for the bio. */
  variant?: "avatar" | "portrait";
  /** Rendered width in CSS pixels. Height follows the source aspect ratio. */
  size?: number;
  className?: string;
  priority?: boolean;
}

/** Intrinsic pixel sizes of the files in public/. */
const AVATAR = { src: "/shadman.jpg", width: 640, height: 640 } as const;
const PORTRAIT = { src: "/shadman-portrait.jpg", width: 900, height: 1125 } as const;

export function AuthorPhoto({ variant = "avatar", size, className = "", priority }: AuthorPhotoProps) {
  const photo = variant === "portrait" ? PORTRAIT : AVATAR;
  const display = size ?? (variant === "portrait" ? 280 : 40);
  const shape = variant === "portrait" ? "rounded-xl" : "rounded-full";
  return (
    <Image
      src={photo.src}
      alt="Shadman Rahman"
      width={photo.width}
      height={photo.height}
      sizes={`${display}px`}
      priority={priority}
      style={{ width: display, height: "auto" }}
      className={`${shape} border border-[var(--line)] object-cover ${className}`}
    />
  );
}
