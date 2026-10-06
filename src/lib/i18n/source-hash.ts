import { createHash } from "node:crypto";

/**
 * Fingerprint of an English source entry. A translation stores the hash of
 * the English it was made from; when the English changes, the hashes stop
 * matching and the translation is stale. Server and build time only.
 */
export function sourceHash(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);
}
