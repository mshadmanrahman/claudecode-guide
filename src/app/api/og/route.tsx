import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const STATS = [
  { value: '43+', label: 'Guides & Docs' },
  { value: '4', label: 'Interfaces Covered' },
  { value: '5', label: 'Learning Tracks' },
  { value: '100%', label: 'Free & Open Source' },
];

function HomeOG() {
  return (
    <div
      style={{
        background: '#ffffff',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        padding: '40px 60px',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: '28px',
          left: '60px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: 'monospace',
          color: '#0a0a0a',
        }}
      >
        claudecodeguide.dev
      </div>

      {/* Headline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <div
          style={{
            fontSize: '72px',
            fontWeight: 400,
            color: '#0a0a0a',
            lineHeight: 1.1,
            textAlign: 'center',
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
          }}
        >
          Tell it what you need.
        </div>
        <div
          style={{
            fontSize: '72px',
            fontWeight: 400,
            color: '#0a0a0a',
            lineHeight: 1.1,
            textAlign: 'center',
            fontStyle: 'italic',
            fontFamily: 'Georgia, serif',
          }}
        >
          It builds it.
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: '22px',
          color: '#737373',
          textAlign: 'center',
          marginTop: '24px',
          lineHeight: 1.5,
          maxWidth: '700px',
        }}
      >
        Your calm, step-by-step guide to Claude.
        Build apps, organize notes, analyze data. All in plain English.
      </div>

      {/* Stats bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          marginTop: '40px',
        }}
      >
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {i > 0 && (
              <div style={{ width: '1px', height: '36px', background: '#e5e5e5' }} />
            )}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '36px', fontWeight: 700, color: '#0a0a0a' }}>
                {stat.value}
              </span>
              <span style={{ fontSize: '14px', color: '#a3a3a3', fontWeight: 500 }}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PageOG({ title, description }: { title: string; description: string }) {
  return (
    <div
      style={{
        background: '#ffffff',
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
          fontSize: '18px',
          fontWeight: 700,
          fontFamily: 'monospace',
          color: '#0a0a0a',
          marginBottom: '40px',
        }}
      >
        claudecodeguide.dev
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: title.length > 40 ? '48px' : '56px',
          fontWeight: 400,
          color: '#0a0a0a',
          lineHeight: 1.15,
          marginBottom: '24px',
          maxWidth: '900px',
          fontStyle: 'italic',
          fontFamily: 'Georgia, serif',
        }}
      >
        {title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: '22px',
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
          bottom: '50px',
          left: '80px',
          right: '80px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #e5e5e5',
          paddingTop: '20px',
        }}
      >
        <div style={{ fontSize: '16px', color: '#a3a3a3' }}>
          Free & Open Source
        </div>
        <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#a3a3a3' }}>
          <span>43+ Guides</span>
          <span>5 Learning Tracks</span>
        </div>
      </div>
    </div>
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');
  const description = searchParams.get('description') ?? 'Your calm, step-by-step guide to Claude Code.';
  const isHome = !title || title === 'Claude Code Guide';

  return new ImageResponse(
    isHome ? <HomeOG /> : <PageOG title={title} description={description} />,
    { width: 1200, height: 630 },
  );
}
