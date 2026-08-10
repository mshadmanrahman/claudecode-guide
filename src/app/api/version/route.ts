import { NextResponse } from 'next/server';

// Deploy fingerprint for graph-dev's ship-proof check. Vercel injects
// VERCEL_GIT_COMMIT_SHA at build time, so the value baked into a deployment is
// the commit that produced it. Locally the var is unset and this returns 'unknown'.
export async function GET() {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA ?? 'unknown';

  return NextResponse.json(
    {
      sha,
      shortSha: sha === 'unknown' ? 'unknown' : sha.slice(0, 7),
      env: process.env.VERCEL_ENV ?? 'local',
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
