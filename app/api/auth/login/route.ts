import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api';

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = form.get('email') as string;
  const password = form.get('password') as string;
  const returnTo = (form.get('returnTo') as string) || '/';

  const base = new URL(request.url);
  const errorUrl = (msg: string) =>
    new URL(`/login?error=${encodeURIComponent(msg)}&returnTo=${encodeURIComponent(returnTo)}`, base);

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json() as { token?: string; error?: string };

    if (data.error || !data.token) {
      return NextResponse.redirect(errorUrl(data.error ?? 'Identifiants invalides'));
    }

    const dest = returnTo.startsWith('/') ? returnTo : '/';
    const response = NextResponse.redirect(new URL(dest, base));
    response.cookies.set('token', data.token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60,
      path: '/',
    });
    return response;
  } catch {
    return NextResponse.redirect(errorUrl('Impossible de contacter le serveur'));
  }
}
