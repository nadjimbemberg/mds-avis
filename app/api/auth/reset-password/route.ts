import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api';

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const token = form.get('token') as string;
  const newPassword = form.get('newPassword') as string;
  const confirmPassword = form.get('confirmPassword') as string;
  const base = new URL(request.url);

  const errorUrl = (msg: string) =>
    new URL(`/password-reset?token=${encodeURIComponent(token)}&error=${encodeURIComponent(msg)}`, base);

  if (newPassword !== confirmPassword) {
    return NextResponse.redirect(errorUrl('Les mots de passe ne correspondent pas'));
  }

  try {
    const res = await fetch(`${API_URL}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });
    const data = await res.json() as { error?: string };

    if (data.error) return NextResponse.redirect(errorUrl(data.error));

    return NextResponse.redirect(new URL('/login?success=reset', base));
  } catch {
    return NextResponse.redirect(errorUrl('Erreur serveur'));
  }
}
