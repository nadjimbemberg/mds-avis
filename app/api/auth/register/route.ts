import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api';

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const username = form.get('username') as string;
  const email = form.get('email') as string;
  const password = form.get('password') as string;
  const confirmPassword = form.get('confirmPassword') as string;

  const base = new URL(request.url);
  const errorUrl = (msg: string) =>
    new URL(`/register?error=${encodeURIComponent(msg)}&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}`, base);

  if (password !== confirmPassword) {
    return NextResponse.redirect(errorUrl('Les mots de passe ne correspondent pas'));
  }

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json() as { error?: string };

    if (data.error) return NextResponse.redirect(errorUrl(data.error));

    return NextResponse.redirect(new URL('/login?success=1', base));
  } catch {
    return NextResponse.redirect(errorUrl('Impossible de contacter le serveur'));
  }
}
