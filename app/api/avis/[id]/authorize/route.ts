import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.cookies.get('token')?.value;
  const base = new URL(request.url);

  if (!token) return NextResponse.redirect(new URL('/login?returnTo=/admin', base));

  try {
    const res = await fetch(`${API_URL}/authorize/avis/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });
    const data = await res.json() as { error?: string };

    if (data.error) {
      return NextResponse.redirect(new URL(`/admin?error=${encodeURIComponent(data.error)}`, base));
    }
  } catch { /* ignore */ }

  return NextResponse.redirect(new URL('/admin', base));
}
