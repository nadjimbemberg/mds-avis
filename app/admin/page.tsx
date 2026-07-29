import { redirect } from 'next/navigation';
import { getToken, getUser } from '@/lib/auth';
import { apiFetch } from '@/lib/api';
import type { ReviewsResponse } from '@/lib/types';

type Props = { searchParams: { error?: string } };

export default async function AdminPage({ searchParams }: Props) {
  const token = getToken();
  const user = getUser();
  if (!token || !user) redirect('/login?returnTo=/admin');
  if (user.role !== 'admin') redirect('/?error=Réservé+aux+administrateurs');

  let pending: ReviewsResponse['data'] = [];
  try {
    const data = await apiFetch('/avis?authorized=false&limit=50') as unknown as ReviewsResponse;
    pending = data.data ?? [];
  } catch { /* ignore */ }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-white mb-2">Administration</h1>
      <p className="text-gray-400 text-sm mb-8">{pending.length} avis en attente de validation</p>

      {searchParams.error && (
        <div className="mb-6 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {decodeURIComponent(searchParams.error)}
        </div>
      )}

      {pending.length === 0 ? (
        <div className="text-center py-24 text-gray-500">Aucun avis en attente.</div>
      ) : (
        <div className="space-y-4">
          {pending.map((a) => (
            <div key={a.id} className="bg-gray-800 border border-white/10 rounded-xl p-5 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                  <span className="font-semibold text-white">{a.author}</span>
                  <span className="text-yellow-400">{'★'.repeat(a.rating)}{'☆'.repeat(5 - a.rating)}</span>
                </div>
                <p className="text-gray-300 text-sm break-words">{a.description}</p>
                <p className="text-gray-500 text-xs mt-2">
                  {new Date(a.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <form action={`/api/avis/${a.id}/authorize`} method="POST" className="shrink-0">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white text-sm font-medium px-4 py-2.5 sm:py-2 rounded-md transition-colors"
                >
                  Valider
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
