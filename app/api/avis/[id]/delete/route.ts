import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const token = request.cookies.get('token')?.value;
  const base = new URL(request.url);

  if (!token) return NextResponse.redirect(new URL('/login', base));

  try {
    await fetch(`${API_URL}/avis/${params.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch { /* ignore */ }

  return NextResponse.redirect(new URL('/', base));
}
