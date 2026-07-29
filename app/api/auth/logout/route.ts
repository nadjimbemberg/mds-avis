import { NextRequest, NextResponse } from 'next/server';
import { API_URL } from '@/lib/api';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (token) {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch { /* le cookie est supprimé même si l'API est injoignable */ }
  }

  const response = NextResponse.redirect(new URL('/login', request.url));
  response.cookies.delete('token');
  return response;
}
