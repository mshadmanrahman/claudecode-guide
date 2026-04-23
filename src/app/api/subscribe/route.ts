import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const res = await fetch('https://shadmanrahman.substack.com/api/v1/free', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_url: 'https://claudecodeguide.dev',
        first_referrer: 'https://claudecodeguide.dev',
        current_url: 'https://claudecodeguide.dev',
        current_referrer: 'https://claudecodeguide.dev',
      }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    }

    const upstreamBody = await res.text().catch(() => '');
    console.error('subscribe: substack non-ok', {
      status: res.status,
      body: upstreamBody.slice(0, 500),
    });
    return NextResponse.json(
      { error: 'Subscription service returned an error', upstreamStatus: res.status },
      { status: 502 },
    );
  } catch (error) {
    console.error('subscribe: exception', error);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
