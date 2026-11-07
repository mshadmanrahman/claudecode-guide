/**
 * The one place for the author's profile links. Every page, footer, bio and
 * JSON-LD block reads from here, so changing a handle is a one-line edit.
 */
export const X_HANDLE = "@MShadmanRahman";

export const SOCIAL = {
  x: "https://x.com/MShadmanRahman",
  linkedin: "https://www.linkedin.com/in/shadmanrahman",
  substack: "https://shadmanrahman.substack.com/",
  github: "https://github.com/mshadmanrahman",
  repo: "https://github.com/mshadmanrahman/claudecode-guide",
} as const;

/** Profiles that identify the author, for schema.org `sameAs`. */
export const SAME_AS: ReadonlyArray<string> = [
  SOCIAL.x,
  SOCIAL.linkedin,
  SOCIAL.substack,
  SOCIAL.github,
];
