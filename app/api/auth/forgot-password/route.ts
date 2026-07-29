import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api';

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const email = form.get('email') as string;
  const base = new URL(request.url);

  try {
    const res = await fetch(`${API_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json() as { message?: string; error?: string };

    if (data.error) {
      return NextResponse.redirect(new URL(`/password-forgot?error=${encodeURIComponent(data.error)}`, base));
    }

    const msg = data.message ?? 'Email envoyé si le compte existe.';
    return NextResponse.redirect(new URL(`/password-forgot?success=${encodeURIComponent(msg)}`, base));
  } catch {
    return NextResponse.redirect(new URL('/password-forgot?error=Erreur+serveur', base));
  }
}
