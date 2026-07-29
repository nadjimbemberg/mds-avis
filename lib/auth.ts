import { cookies } from 'next/headers';

export interface AuthUser {
  id: number;
  email: string;
  username: string;
}

export function getToken(): string | undefined {
  return cookies().get('token')?.value;
}

export function getUser(): AuthUser | null {
  const token = getToken();
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return { id: decoded.id, email: decoded.email, username: decoded.username };
  } catch {
    return null;
  }
}
