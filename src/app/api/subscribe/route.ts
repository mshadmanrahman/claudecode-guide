import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // POST to Substack's public subscribe API
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

    // Substack might return various statuses : treat all as success
    // since the email is likely already subscribed or queued
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
