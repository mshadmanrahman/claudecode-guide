import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Claude Code Guide';
  const description = searchParams.get('description') ?? 'Your calm, step-by-step guide to Claude Code.';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#a3a3a3',
            fontFamily: 'monospace',
            marginBottom: '40px',
          }}
        >
          <span style={{ color: '#fafafa' }}>claude.code</span>
          <span style={{ color: '#fafafa' }}>.guide</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 30 ? '52px' : '64px',
            fontWeight: 400,
            color: '#fafafa',
            lineHeight: 1.15,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '24px',
            color: '#737373',
            lineHeight: 1.5,
            maxWidth: '700px',
          }}
        >
          {description}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '80px',
            right: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '18px', color: '#525252' }}>
            claudecodeguide.dev
          </div>
          <div style={{ fontSize: '18px', color: '#525252' }}>
            By Shadman Rahman
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
