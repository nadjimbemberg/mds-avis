import { redirect, notFound } from 'next/navigation';
import StarRating from '@/components/StarRating';
import { apiFetch } from '@/lib/api';
import { getToken, getUser } from '@/lib/auth';
import type { Review } from '@/lib/types';

type Props = { params: { id: string }; searchParams: { error?: string } };

export default async function EditAvisPage({ params, searchParams }: Props) {
  const token = getToken();
  const user = getUser();
  if (!token || !user) redirect(`/login?returnTo=/avis/${params.id}/edit`);

  let avis: Review | null = null;
  try {
    const data = await apiFetch(`/avis/${params.id}`) as unknown as (Review & { error?: string });
    if (data.error) return notFound();
    avis = data;
  } catch {
    return notFound();
  }

  if (avis.userId !== user.id) redirect(`/avis/${params.id}`);

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-white mb-8">Modifier l'avis</h1>

      {searchParams.error && (
        <div className="mb-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {decodeURIComponent(searchParams.error)}
        </div>
      )}

      <form action={`/api/avis/${params.id}/edit`} method="POST" className="space-y-5 bg-gray-800 border border-white/10 rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Note</label>
          <StarRating name="rating" defaultValue={avis.rating} />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1.5">
            Description
          </label>
          <textarea
            id="description" name="description" required rows={5}
            defaultValue={avis.description}
            className="w-full bg-gray-700/50 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 resize-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-white text-gray-900 font-semibold py-2.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            Enregistrer
          </button>
          <a
            href={`/avis/${params.id}`}
            className="flex-1 text-center border border-white/10 text-gray-300 py-2.5 rounded-md hover:border-white/30 transition-colors"
          >
            Annuler
          </a>
        </div>
      </form>
    </div>
  );
}
