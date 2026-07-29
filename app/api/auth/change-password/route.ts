import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api';

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const currentPassword = form.get('currentPassword') as string;
  const newPassword = form.get('newPassword') as string;
  const token = request.cookies.get('token')?.value;
  const base = new URL(request.url);

  if (!token) return NextResponse.redirect(new URL('/login', base));

  try {
    const res = await fetch(`${API_URL}/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ oldPassword: currentPassword, newPassword }),
    });
    const data = await res.json() as { error?: string };

    if (data.error) {
      return NextResponse.redirect(new URL(`/profile?error=${encodeURIComponent(data.error)}`, base));
    }

    return NextResponse.redirect(new URL('/profile?success=Mot+de+passe+mis+à+jour', base));
  } catch {
    return NextResponse.redirect(new URL('/profile?error=Erreur+serveur', base));
  }
}
