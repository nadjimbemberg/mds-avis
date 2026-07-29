const API_URL = process.env.API_URL || 'http://localhost:3000';

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<Record<string, unknown>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (res.status === 204) return { ok: true };
  return res.json() as Promise<Record<string, unknown>>;
}

export { API_URL };
