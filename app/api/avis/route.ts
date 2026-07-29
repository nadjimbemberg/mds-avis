import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api';

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const website = form.get('_website') as string;
  const base = new URL(request.url);

  // Anti-spam honeypot
  if (website) return NextResponse.redirect(new URL('/', base));

  const author = form.get('author') as string;
  const email = form.get('email') as string;
  const rating = parseInt(form.get('rating') as string) || 0;
  const description = form.get('description') as string;
  const token = request.cookies.get('token')?.value;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_URL}/avis`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ author, email, rating, description }),
    });
    const data = await res.json() as { review?: { id: number }; error?: string };

    if (data.error) {
      return NextResponse.redirect(new URL(`/avis/add?error=${encodeURIComponent(data.error)}`, base));
    }

    return NextResponse.redirect(new URL(`/avis/${data.review!.id}?success=1`, base));
  } catch {
    return NextResponse.redirect(new URL('/avis/add?error=Erreur+serveur', base));
  }
}
