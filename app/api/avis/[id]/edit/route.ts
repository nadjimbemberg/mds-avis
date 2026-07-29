import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const form = await request.formData();
  const rating = parseInt(form.get('rating') as string) || undefined;
  const description = form.get('description') as string;
  const token = request.cookies.get('token')?.value;
  const base = new URL(request.url);

  if (!token) return NextResponse.redirect(new URL('/login', base));

  try {
    const res = await fetch(`${API_URL}/avis/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ rating, description }),
    });
    const data = await res.json() as { error?: string };

    if (data.error) {
      return NextResponse.redirect(new URL(`/avis/${params.id}/edit?error=${encodeURIComponent(data.error)}`, base));
    }

    return NextResponse.redirect(new URL(`/avis/${params.id}`, base));
  } catch {
    return NextResponse.redirect(new URL(`/avis/${params.id}/edit?error=Erreur+serveur`, base));
  }
}
